/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { 
  CreditCard, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Plus, 
  Printer, 
  TrendingUp, 
  Sparkles,
  Download,
  Building,
  User,
  X,
  FileSpreadsheet
} from "lucide-react";
import React, { useState } from "react";
import { Payment } from "../types";

interface PaymentsViewProps {
  payments: Payment[];
  setPayments: React.Dispatch<React.SetStateAction<Payment[]>>;
}

export default function PaymentsView({ payments, setPayments }: PaymentsViewProps) {
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<Payment | null>(null);

  // Form states
  const [clientName, setClientName] = useState("");
  const [service, setService] = useState("إدارة حملة التسويق السنوية");
  const [amount, setAmount] = useState("");
  const [status, setStatus] = useState<"مدفوع" | "معلق" | "متأخر">("مدفوع");

  const totalCollected = payments
    .filter(p => p.status === "مدفوع")
    .reduce((sum, p) => sum + p.amount, 0);

  const totalPending = payments
    .filter(p => p.status === "معلق")
    .reduce((sum, p) => sum + p.amount, 0);

  const totalOverdue = payments
    .filter(p => p.status === "متأخر")
    .reduce((sum, p) => sum + p.amount, 0);

  const handleCreatePayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName.trim() || !amount) return;

    const newPayment: Payment = {
      id: "inv_" + Date.now().toString().slice(-6),
      clientName,
      amount: Number(amount),
      date: new Date().toISOString().split('T')[0],
      status,
      service
    };

    setPayments(prev => [newPayment, ...prev]);
    setClientName("");
    setAmount("");
    setIsAddOpen(false);
  };

  const handleToggleStatus = (paymentId: string) => {
    setPayments(prev => prev.map(p => {
      if (p.id === paymentId) {
        const nextStatus = p.status === "معلق" ? "مدفوع" : p.status === "مدفوع" ? "متأخر" : "معلق";
        return { ...p, status: nextStatus };
      }
      return p;
    }));
  };

  const formatEGP = (num: number) => {
    return new Intl.NumberFormat("ar-EG", { style: "currency", currency: "EGP", maximumFractionDigits: 0 }).format(num);
  };

  return (
    <div id="payments-billing-container" className="space-y-6">
      
      {/* Financial Stats Bar Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-5 rounded-lg border border-gray-250 shadow-sm flex items-center justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 h-[3px] w-full bg-emerald-500"></div>
          <div>
            <span className="text-gray-500 text-xs block mb-1 font-semibold">إجمالي المبالغ المحصلة (ج.م)</span>
            <span className="text-2xl font-bold text-emerald-600 font-sans block mt-0.5">{formatEGP(totalCollected)}</span>
            <span className="text-[10px] text-gray-400 block mt-1 font-medium">مدفوعات مؤكدة بحساب الشركة</span>
          </div>
          <div className="w-10 h-10 rounded bg-emerald-50 border border-emerald-150 flex items-center justify-center text-emerald-600 font-bold shrink-0">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-lg border border-gray-250 shadow-sm flex items-center justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 h-[3px] w-full bg-amber-500"></div>
          <div>
            <span className="text-gray-500 text-xs block mb-1 font-semibold">الذمم المعلقة وقيد التحصيل</span>
            <span className="text-2xl font-bold text-amber-650 font-sans block mt-0.5">{formatEGP(totalPending)}</span>
            <span className="text-[10px] text-gray-400 block mt-1 font-medium">باقات ومستندات بانتظار التحويل</span>
          </div>
          <div className="w-10 h-10 rounded bg-amber-50 border border-amber-150 flex items-center justify-center text-amber-600 font-bold shrink-0">
            <Clock className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-lg border border-gray-250 shadow-sm flex items-center justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 h-[3px] w-full bg-rose-500"></div>
          <div>
            <span className="text-gray-500 text-xs block mb-1 font-semibold">الفواتير المستحقة والمتأخرة</span>
            <span className="text-2xl font-bold text-rose-600 font-sans block mt-0.5">{formatEGP(totalOverdue)}</span>
            <span className="text-[10px] text-gray-400 block mt-1 font-medium">تطلب اتصال ومتابعة ومطالبة فورية</span>
          </div>
          <div className="w-10 h-10 rounded bg-rose-50 border border-rose-150 flex items-center justify-center text-rose-600 font-bold shrink-0">
            <AlertCircle className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* invoices / Payments table list */}
      <div className="bg-white rounded-lg border border-gray-250 p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-base font-bold text-indigo-950 flex items-center gap-2">
              <span className="w-1 h-4 rounded-sm bg-[#1a237e] block"></span>
              سجل الفواتير والدفع والتدفق المالي
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">تتبع حالات الفواتير، ومصادر الدفع، وقسائم تحصيل مبيعات السوشيال ميديا وعقود التسويق.</p>
          </div>

          <button 
            id="create-payment-invoice-btn"
            onClick={() => setIsAddOpen(true)}
            className="bg-[#1a237e] hover:bg-indigo-900 text-white text-xs px-4 py-2.5 rounded font-bold flex items-center gap-1.5 transition-all shadow-sm cursor-pointer w-full md:w-auto justify-center"
          >
            <Plus className="w-4 h-4" />
            إنشاء وإصدار فاتورة جديدة
          </button>
        </div>

        <div className="overflow-x-auto select-none">
          <table className="w-full text-right text-xs text-gray-700">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50/55 text-gray-550 font-bold">
                <th className="py-3 px-2 text-right">رقم الفاتورة Serial</th>
                <th className="py-3 px-2 text-right">العميل والمستفيد</th>
                <th className="py-3 px-2 text-right">الخدمة والوصف</th>
                <th className="py-3 px-2 text-right">المبلغ ج.م</th>
                <th className="py-3 px-2 text-right">تاريخ الإصدار</th>
                <th className="py-3 px-2 text-center">حالة الدفع</th>
                <th className="py-3 px-2 text-left">خيارات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-150">
              {payments.map((p) => (
                <tr key={p.id} className="hover:bg-gray-50/50 transition-all">
                  <td className="py-4 px-2 font-mono font-bold text-indigo-650 pr-1 select-all">#INV-{p.id}</td>
                  <td className="py-4 px-2 font-bold text-gray-900">{p.clientName}</td>
                  <td className="py-4 px-2 text-gray-500 text-xs font-sans max-w-xs truncate font-medium">{p.service}</td>
                  <td className="py-4 px-2 font-sans font-bold text-gray-950">{formatEGP(p.amount)}</td>
                  <td className="py-4 px-2 font-mono text-gray-500 text-[11px] font-medium">{p.date}</td>
                  <td className="py-4 px-2 text-center">
                    <button 
                      id={`invoice-status-toggle-${p.id}`}
                      onClick={() => handleToggleStatus(p.id)}
                      className={`px-3 py-1 rounded text-[10px] font-bold cursor-pointer hover:scale-[1.03] transition-all inline-block ${
                        p.status === "مدفوع" 
                          ? "bg-green-100 text-green-700 border border-green-200/50" 
                          : p.status === "معلق" 
                            ? "bg-amber-100 text-amber-700 border border-amber-200/50" 
                            : "bg-rose-100 text-rose-700 border border-rose-200"
                      }`}
                      title="اضغط لتغيير حالة السداد تلقائياً"
                    >
                      {p.status}
                    </button>
                  </td>
                  <td className="py-4 px-2 text-left">
                    <button
                      id={`invoice-view-[${p.id}]-btn`}
                      onClick={() => setSelectedInvoice(p)}
                      className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded text-[10px] font-bold inline-flex items-center gap-1 border border-gray-250 cursor-pointer transition-all shadow-sm"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      عرض وطباعة
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Invoice Details printable Modal */}
      {selectedInvoice && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 transition-all">
          <div className="bg-white border border-gray-200 rounded-lg w-full max-w-2xl overflow-hidden shadow-2xl relative text-right">
            
            {/* Action controls top bar */}
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <span className="text-xs font-bold text-gray-500 font-mono">فاتورة ومطالبة مالية رسمية - شركة رحاب</span>
              <div className="flex items-center gap-2">
                <button 
                  id="print-invoice-action-btn"
                  onClick={() => window.print()}
                  className="bg-[#1a237e] hover:bg-indigo-900 text-white text-xs px-3 py-1.5 rounded font-bold flex items-center gap-1 transition-all cursor-pointer shadow-sm"
                >
                  <Printer className="w-3.5 h-3.5" />
                  طباعة المذكرة المالية
                </button>
                <button 
                  id="close-invoice-prev-btn"
                  onClick={() => setSelectedInvoice(null)}
                  className="bg-gray-100 border border-gray-200 text-gray-600 hover:bg-gray-200 px-3 py-1.5 rounded text-xs font-bold cursor-pointer transition-all"
                >
                  إغلاق
                </button>
              </div>
            </div>

            {/* Printable Invoice body code structure */}
            <div className="p-8 space-y-6 text-gray-750 max-h-[80vh] overflow-y-auto">
              
              {/* Invoice Brand header */}
              <div className="flex flex-col md:flex-row justify-between gap-4 pb-6 border-b border-gray-150">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <div className="w-9 h-9 bg-[#1a237e] text-white rounded flex items-center justify-center font-black text-lg">ر</div>
                    <span className="font-sans font-black text-indigo-950 text-base">شركة رحاب للتسويق المحدودة</span>
                  </div>
                  <p className="text-[10px] text-gray-500 leading-relaxed max-w-xs font-semibold">
                    جمهورية مصر العربية، القاهرة الجديدة - مبنى المكاتب الإدارية، التجمع الخامس.
                  </p>
                  <p className="text-[10px] text-gray-400 font-mono font-medium">تليفون: 01012345678 | البريد الإلكتروني: accounting@rehab.eg</p>
                </div>

                <div className="space-y-1 md:text-left text-right">
                  <h4 className="text-lg font-mono font-bold text-indigo-700">#INV-{selectedInvoice.id}</h4>
                  <p className="text-xs text-gray-500 font-medium">تاريخ الإصدار: <strong>{selectedInvoice.date}</strong></p>
                  <p className="text-xs text-gray-500 font-medium">حالة الفاتورة المعتمدة: 
                    <span className={`mr-1 px-2.5 py-0.5 rounded text-[9px] font-bold inline-block leading-none ${
                      selectedInvoice.status === "مدفوع" ? "bg-green-100 text-green-700 border border-green-200" : "bg-amber-100 text-amber-700 border border-amber-200"
                    }`}>
                      {selectedInvoice.status}
                    </span>
                  </p>
                </div>
              </div>

              {/* Client and accounting terms */}
              <div className="grid grid-cols-2 gap-6 py-2 border-b border-gray-150 pb-6">
                <div>
                  <span className="text-[11px] text-gray-400 font-bold block mb-1.5">مُرسل وموجه إلى العميل / المستفيد:</span>
                  <p className="font-sans font-bold text-gray-900 text-sm">{selectedInvoice.clientName}</p>
                  <p className="text-[10px] text-gray-500 mt-1 font-semibold">الرقم الضريبي الموحد للمؤسسة: 488-991-382</p>
                </div>

                <div>
                  <span className="text-[11px] text-gray-400 font-bold block mb-1.5">تفاصيل ومواعيد الاستحقاق:</span>
                  <p className="text-xs text-gray-700 font-medium">الاستحقاق: <strong className="text-[#1a237e]">فوري عند الاستلام</strong></p>
                  <p className="text-xs text-gray-700 font-medium">طريقة التحويل المعتمدة: <strong className="text-indigo-650">فودافون كاش أو تحويل بنكي CIB</strong></p>
                </div>
              </div>

              {/* Items Table */}
              <div>
                <table className="w-full text-right text-xs">
                  <thead>
                    <tr className="border-b border-gray-250 text-gray-500 font-bold">
                      <th className="pb-2">البند والخدمة المقدمة لشركة العميل</th>
                      <th className="pb-2 text-left">التكلفة والعمولة</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-150 hover:bg-gray-50/50">
                      <td className="py-4">
                        <strong className="text-gray-900 block font-sans text-xs">{selectedInvoice.service}</strong>
                        <span className="text-[10px] text-gray-500 mt-1 block leading-relaxed font-medium">باقة تسويق رقمي متكاملة لشهر كامل تتضمن إعلانات وبوسترات وجدولة المحتوى الرقمي الموجه لطلب زيادة المبيعات.</span>
                      </td>
                      <td className="py-4 text-left font-sans font-bold text-gray-905">{formatEGP(selectedInvoice.amount)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Calculated VAT and final total values */}
              <div className="border-t border-gray-150 pt-4 flex flex-col items-end space-y-2 select-all">
                <div className="flex justify-between w-64 text-xs font-semibold text-gray-500">
                  <span>مجموع الخدمات والمصنف الفرعي:</span>
                  <span className="font-sans text-gray-800">{formatEGP(selectedInvoice.amount)}</span>
                </div>
                <div className="flex justify-between w-64 text-xs font-semibold text-gray-500">
                  <span>ضريبة القيمة المضافة الحكومية (١٤%):</span>
                  <span className="font-sans text-gray-800">{formatEGP(selectedInvoice.amount * 0.14)}</span>
                </div>
                <div className="flex justify-between w-64 text-sm font-bold border-t border-gray-200 pt-2 text-[#1a237e]">
                  <span>المجموع الإجمالي المطلوب سداده:</span>
                  <span className="font-sans">{formatEGP(selectedInvoice.amount * 1.14)}</span>
                </div>
              </div>

              {/* Bank Account Terms and stamp */}
              <div className="bg-gray-50 rounded p-4 text-[10px] text-gray-550 border border-gray-200 flex justify-between items-center">
                <div className="space-y-1 font-medium">
                  <h5 className="font-bold text-gray-700 mb-1">تعليمات التحويل والبنك:</h5>
                  <p>• بنك البنك التجاري الدولي (CIB) - حساب رقم: 4992-1100-3881</p>
                  <p>• أو محفظة فودافون كاش المعتمدة للشركة: 01012345678</p>
                  <p className="mt-1 text-[#b45309] font-bold">يرجى من سيادتكم إرسال سكرين شوت للتحويل لتأكيد باقة السوشيال فوراً.</p>
                </div>
                <div className="w-16 h-16 border-2 border-indigo-500/20 rounded-full flex items-center justify-center font-sans font-bold text-indigo-500/30 text-[9px] rotate-12 shrink-0 border-dashed">
                  ختم السداد
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Pop up modal to Create new invoice */}
      {isAddOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 transition-all text-right">
          <div className="bg-white border border-gray-200 rounded-lg w-full max-w-md overflow-hidden shadow-2xl">
            {/* Header */}
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <h3 className="font-bold text-indigo-900 text-sm flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#1a237e]" />
                إصدار فاتورة تسويقية جديدة
              </h3>
              <button 
                id="close-create-inv-modal"
                onClick={() => setIsAddOpen(false)} 
                className="p-1 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Inputs */}
            <form onSubmit={handleCreatePayment} className="p-6 space-y-4">
              <div>
                <label className="text-[11px] font-bold text-gray-600 block mb-1.5">اسم العميل والمنشأة المدفوع لها *</label>
                <input 
                  type="text" 
                  required
                  placeholder="مثال: أحمد الشناوي - العقارية جروب"
                  value={clientName}
                  onChange={e => setClientName(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded px-3 py-2 text-xs text-gray-905 placeholder-gray-400 focus:outline-none focus:border-[#1a237e] text-right"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-gray-600 block mb-1.5">الخدمة التسويقية المؤداة لها *</label>
                <select 
                  value={service}
                  onChange={e => setService(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded px-3 py-2 text-xs text-gray-800 focus:outline-none focus:border-[#1a237e] text-right"
                >
                  <option value="باقة إدارة صفحات السوشيال ميديا وتصاميم السوشيال الفضية">باقة السوشيال الفضية (6,000 ج.م)</option>
                  <option value="باقة السوشيال الذهبية وتصوير منتجات وريلز احترافية">باقة السوشيال الذهبية (12,000 ج.م)</option>
                  <option value="إدارة حملة إعلانية ممولة متكاملة على ميتا وجوجل">إدارة الحملات الممولة (15,000 ج.م)</option>
                  <option value="تطوير وبرمجة موقع إلكتروني تعريفي مع تهيئة الـ SEO">تطوير المواقع والـ SEO المتكامل (35,000 ج.م)</option>
                  <option value="باقة بناء العلامة واللوجو والتأسيس التسويقي الشامل">الهوية البصرية المتكاملة (25,000 ج.م)</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] font-bold text-gray-600 block mb-1.5">قيمة الفاتورة الأساسية *</label>
                  <input 
                    type="number" 
                    required
                    placeholder="مثال: 15000"
                    value={amount}
                    onChange={e => setAmount(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded px-3 py-2 text-xs text-gray-950 placeholder-gray-400 focus:outline-none focus:border-[#1a237e] font-mono text-right"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-gray-600 block mb-1.5">حالة السداد الأولية</label>
                  <select 
                    value={status}
                    onChange={e => setStatus(e.target.value as any)}
                    className="w-full bg-gray-50 border border-gray-200 rounded px-3 py-2 text-xs text-gray-800 focus:outline-none focus:border-[#1a237e] text-right"
                  >
                    <option value="مدفوع">مدفوع ومحصل</option>
                    <option value="معلق">معلق قيد التحويل</option>
                    <option value="متأخر">متأخر الدفع</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-200 flex gap-2">
                <button 
                  id="invoice-submit-add-btn"
                  type="submit"
                  className="bg-[#1a237e] hover:bg-indigo-900 text-white font-bold text-xs px-4 py-2.5 rounded transition-all cursor-pointer flex-1 shadow-sm"
                >
                  إصدار الفاتورة فوراً
                </button>
                <button 
                  id="invoice-cancel-add-btn"
                  type="button"
                  onClick={() => setIsAddOpen(false)}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-xs px-4 py-2.5 rounded transition-all cursor-pointer border border-gray-255"
                >
                  إلغاء
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
