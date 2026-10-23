import { Invoice } from '../types';
import { INITIAL_INVOICES } from '../data/mockData';
import { downloadCsvFile } from '../utils/csv';
import { formatDateID, formatCurrencyIDR } from '../utils/formatters';

/**
 * Finance Service - Manages tuition fee billing, cash teller, and online payments
 * In production:
 * - Invoices are stored in PostgreSQL via Prisma ORM
 * - Transactions initiate via NestJS server to Midtrans Snap API using Server Key
 * - Status is settled via verified Midtrans Webhook (SHA-512 signature check)
 */
class FinanceService {
  private storageKey = 'edutera_invoices';

  getInvoices(): Invoice[] {
    const saved = localStorage.getItem(this.storageKey);
    return saved ? JSON.parse(saved) : INITIAL_INVOICES;
  }

  saveInvoices(invoices: Invoice[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(invoices));
  }

  createInvoice(invData: Omit<Invoice, 'id' | 'invoice_no'>): { success: boolean; invoice?: Invoice; error?: string } {
    if (!invData.amount || invData.amount <= 0) {
      return { success: false, error: 'Nominal tagihan harus berupa angka positif lebih dari Rp 0.' };
    }
    if (!invData.title.trim()) {
      return { success: false, error: 'Judul rincian tagihan wajib diisi.' };
    }

    const invoices = this.getInvoices();
    const newInvoice: Invoice = {
      ...invData,
      id: `inv_${Date.now()}`,
      invoice_no: `INV-2026-${Math.floor(100000000 + Math.random() * 900000000)}`,
      amount_paid: 0,
      status: 'upcoming'
    };

    const updated = [newInvoice, ...invoices];
    this.saveInvoices(updated);
    return { success: true, invoice: newInvoice };
  }

  simulateSettleInvoice(invoiceId: string, paymentMethod: string): Invoice | null {
    const invoices = this.getInvoices();
    const invoice = invoices.find(i => i.id === invoiceId);
    if (!invoice) return null;

    const now = new Date();
    const paidAtISO = now.toISOString();

    invoice.status = 'paid';
    invoice.amount_paid = invoice.amount;
    invoice.payment_method = paymentMethod;
    invoice.paid_at = paidAtISO;

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
