import { Invoice } from '../types';
import { INITIAL_INVOICES } from '../data/mockData';
import { downloadCsvFile } from '../utils/csv';
import { formatDateID, formatCurrencyIDR } from '../utils/formatters';
import { safeGetStorage, safeSetStorage } from '../utils/storage';

export interface CreateInvoiceInput {
  student_id: string;
  student_name: string;
  student_nisn: string;
  class_name: string;
  title: string;
  description?: string;
  amount: number;
  due_date: string;
  category: 'SPP' | 'Uang Gedung' | 'Kegiatan' | 'Ujian' | 'Praktikum';
}

/**
 * Midtrans Production Webhook Payload Specification (NestJS Contract)
 */
export interface MidtransWebhookNotification {
  transaction_time: string;
  transaction_status: 'capture' | 'settlement' | 'pending' | 'deny' | 'cancel' | 'expire' | 'refund';
  transaction_id: string;
  status_message: string;
  status_code: string;
  signature_key: string;
  order_id: string;
  merchant_id: string;
  gross_amount: string;
  fraud_status?: 'accept' | 'challenge' | 'deny';
  payment_type: string;
}

/**
 * Finance Service - Single Source of Truth for invoices and payment processing.
 *
 * PRODUCTION BACKEND ARCHITECTURE (NestJS + PostgreSQL):
 * 1. POST /api/v1/finance/invoices -> Creates invoice with Decimal amount in PostgreSQL.
 * 2. POST /api/v1/payments/midtrans/snap-token -> Server-side call to Midtrans Snap API with Server Key.
 * 3. POST /api/v1/payments/midtrans/webhook -> Verifies SHA512 signature:
 *    crypto.createHash('sha512').update(`${order_id}${status_code}${gross_amount}${SERVER_KEY}`).digest('hex')
 *    Only transitions Invoice to 'PAID' when signature matches and status is 'settlement' or 'capture'.
 */
class FinanceService {
  private storageKey = 'edutera_invoices';

  getInvoices(): Invoice[] {
    return safeGetStorage<Invoice[]>(this.storageKey, INITIAL_INVOICES);
  }

  saveInvoices(invoices: Invoice[]): void {
    safeSetStorage(this.storageKey, invoices);
  }

  createInvoice(input: CreateInvoiceInput): { success: boolean; invoice?: Invoice; error?: string } {
    if (!input.amount || input.amount <= 0) {
      return { success: false, error: 'Nominal tagihan harus berupa angka positif lebih dari Rp 0.' };
    }
    if (!input.title || !input.title.trim()) {
      return { success: false, error: 'Judul rincian tagihan wajib diisi.' };
    }
    if (!input.due_date) {
      return { success: false, error: 'Tanggal jatuh tempo wajib diisi.' };
    }

    const invoices = this.getInvoices();
    const newInvoice: Invoice = {
      id: `inv_${Date.now()}`,
      invoice_no: `INV-2026-${Math.floor(100000000 + Math.random() * 900000000)}`,
      student_id: input.student_id,
      student_name: input.student_name,
      student_nisn: input.student_nisn,
      class_name: input.class_name,
      title: input.title.trim(),
      description: input.description?.trim() || '',
      amount: input.amount,
      amount_paid: 0,
      due_date: input.due_date,
      status: 'upcoming',
      category: input.category
    };

    const updated = [newInvoice, ...invoices];
    this.saveInvoices(updated);
    return { success: true, invoice: newInvoice };
  }

  /**
   * Official Cash Teller Payment (Kasir Sekolah)
   * Recorded by an authorized user (Staff / Bendahara)
   */
  recordCashPayment(invoiceId: string, recordedByUserName: string = 'Kasir Sekolah'): Invoice | null {
    const invoices = this.getInvoices();
    const invoice = invoices.find(i => i.id === invoiceId);
    if (!invoice) return null;

    invoice.status = 'paid';
    invoice.amount_paid = invoice.amount;
    invoice.payment_method = `Tunai Kasir (Dicatat oleh ${recordedByUserName})`;
    invoice.paid_at = new Date().toISOString();

    this.saveInvoices(invoices);
    return invoice;
  }

  /**
   * DEMO ONLY: Simulates payment settlement for UI prototype testing.
   * In production, this method does not exist; settlement happens strictly via verified server webhook.
   */
  simulateDemoPayment(invoiceId: string, paymentMethod: string): Invoice | null {
    const invoices = this.getInvoices();
    const invoice = invoices.find(i => i.id === invoiceId);
    if (!invoice) return null;

    invoice.status = 'paid';
    invoice.amount_paid = invoice.amount;
    invoice.payment_method = `[Demo] ${paymentMethod}`;
    invoice.paid_at = new Date().toISOString();

    this.saveInvoices(invoices);
    return invoice;
  }

  exportInvoicesCsv(invoices: Invoice[]): void {
    const headers = [
      'No Invoice',
      'Nama Siswa',
      'NISN',
      'Kelas',
      'Nama Tagihan',
      'Kategori',
      'Nominal (IDR)',
      'Status',
      'Jatuh Tempo',
      'Metode Bayar',
      'Waktu Bayar'
    ];

    const rows = invoices.map(i => [
      i.invoice_no,
      i.student_name,
      i.student_nisn,
      i.class_name,
      i.title,
      i.category,
      i.amount,
      i.status.toUpperCase(),
      formatDateID(i.due_date),
      i.payment_method || '-',
      i.paid_at ? formatDateID(i.paid_at) : '-'
    ]);

    const timestamp = new Date().toISOString().slice(0, 10);
    downloadCsvFile(`Rekap_Keuangan_SPP_${timestamp}`, headers, rows);
  }
}

export const financeService = new FinanceService();
