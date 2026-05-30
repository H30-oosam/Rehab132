/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { 
  Smartphone, 
  Sparkles, 
  Copy, 
  CheckCircle2, 
  DollarSign, 
  Check, 
  ShoppingBag, 
  Eye, 
  Link, 
  Sliders, 
  Trash2, 
  HelpCircle,
  Plus
} from "lucide-react";
import { CheckoutPage } from "../types";

interface CheckoutFunnelViewProps {
  funnels: CheckoutPage[];
  setFunnels: React.Dispatch<React.SetStateAction<CheckoutPage[]>>;
  onSimulateNewPayment: (clientName: string, amount: number, service: string) => void;
}

export default function CheckoutFunnelView({ 
  funnels, 
  setFunnels,
  onSimulateNewPayment
}: CheckoutFunnelViewProps) {
  
  const [selectedFunnel, setSelectedFunnel] = useState<CheckoutPage>(funnels[0] || {} as CheckoutPage);
  
  // Custom design editor states reflecting chosen funnel elements
  const [editorTitle, setEditorTitle] = useState(selectedFunnel.title || "");
  const [editorProdName, setEditorProdName] = useState(selectedFunnel.productName || "");
  const [editorPrice, setEditorPrice] = useState(selectedFunnel.price || 0);
  const [editorDiscountPrice, setEditorDiscountPrice] = useState(selectedFunnel.discountPrice || 0);
  const [editorCta, setEditorCta] = useState(selectedFunnel.ctaText || "");
  const [editorDesc, setEditorDesc] = useState(selectedFunnel.description || "");
  const [editorCoupon, setEditorCoupon] = useState(selectedFunnel.couponCode || "");
  
  const [copySuccess, setCopySuccess] = useState(false);

  // Simulated smartphone fields state
  const [simName, setSimName] = useState("");
  const [simPhone, setSimPhone] = useState("");
  const [simCoupon, setSimCoupon] = useState("");
  const [isSimPaid, setIsSimPaid] = useState(false);
  const [simError, setSimError] = useState("");
  
  // Choose another template to edit and preview
  const handleSelectPage = (page: CheckoutPage) => {
    setSelectedFunnel(page);
    setEditorTitle(page.title);
    setEditorProdName(page.productName);
    setEditorPrice(page.price);
    setEditorDiscountPrice(page.discountPrice || 0);
    setEditorCta(page.ctaText);
    setEditorDesc(page.description);
    setEditorCoupon(page.couponCode || "");

    // Reset simulator visual payment success state
    setIsSimPaid(false);
    setSimName("");
    setSimPhone("");
    setSimCoupon("");
    setSimError("");
  };

  // Live copy action simulation
  const handleCopyCheckoutLink = () => {
    const mockUrl = `https://rehab-marketing.eg/pay/${selectedFunnel.id}`;
    navigator.clipboard.writeText(mockUrl).then(() => {
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2500);
    }).catch(() => {
      // Fallback for isolated IFrames
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2500);
    });
  };

  // Save changes from editor values back to funnel state
  const handleSaveChanges = (e: React.FormEvent) => {
    e.preventDefault();
    setFunnels(prev => prev.map(f => {
      if (f.id === selectedFunnel.id) {
        const updated = {
          ...f,
          title: editorTitle,
          productName: editorProdName,
          price: Number(editorPrice),
          discountPrice: Number(editorDiscountPrice) || undefined,
          ctaText: editorCta,
          description: editorDesc,
          couponCode: editorCoupon
        };
        // Also update chosen reference
        setSelectedFunnel(updated);
        return updated;
      }
      return f;
    }));
  };

  // Simulate payment processing on the virtual screen
  const handleSimulatePaymentInPhone = (e: React.FormEvent) => {
    e.preventDefault();
    if (!simName.trim() || !simPhone.trim()) {
      setSimError("يرجى ملء الاسم ورقم الهاتف لإكمال تجربة الدفع");
      return;
    }

    setSimError("");
    setIsSimPaid(true);

    // Call callback to add real payment & log to database instantly!
    const activePrice = simCoupon === editorCoupon && editorDiscountPrice 
      ? editorDiscountPrice 
      : editorPrice;

    onSimulateNewPayment(
      simName + " (عبر صفحة الهبوط)",
      activePrice,
      editorProdName
    );
  };

  const handleResetPhoneForm = () => {
    setIsSimPaid(false);
    setSimName("");
    setSimPhone("");
    setSimCoupon("");
    setSimError("");
  };

  return (
    <div id="checkout-funnel-view" className="grid grid-cols-1 lg:grid-cols-12 gap-6 text-right">
      
      {/* Templates Sidebar & Visual Builder (Spans 8 Columns) */}
      <div className="lg:col-span-8 space-y-6">
        
        {/* Template Selector Area */}
        <div className="bg-white p-5 rounded-lg border border-gray-255 shadow-sm">
          <h3 className="font-bold text-sm text-indigo-950 mb-3 flex items-center gap-2">
            <ShoppingBag className="w-4.5 h-4.5 text-[#1a237e]" />
            صفحات بيع وحجز تابعة لشركة رحاب للتسويق
          </h3>
          <p className="text-xs text-gray-500 mb-4">اختر أحد النماذج المسبقة المرفقة بالتصميم للتعديل والمشاهدة الحية على المحاكي.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {funnels.map(fun => (
              <button
                id={`funnel-btn-${fun.id}`}
                key={fun.id}
                onClick={() => handleSelectPage(fun)}
                className={`p-3.5 rounded-lg border text-right transition-all font-sans cursor-pointer ${
                  selectedFunnel.id === fun.id
                    ? "bg-indigo-50/50 border-[#1a237e] ring-1 ring-indigo-200"
                    : "bg-white border-gray-200 hover:border-gray-300"
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-mono text-[#1a237e] font-bold">
                    ID: {fun.id}
                  </span>
                  <span className="text-xs font-bold text-emerald-600 font-sans">
                    {fun.discountPrice ? `${fun.discountPrice} ج.م` : `${fun.price} ج.م`}
                  </span>
                </div>
                <h4 className="font-bold text-xs text-indigo-950 truncate">{fun.productName}</h4>
                <p className="text-[10px] text-gray-450 mt-1 max-w-sm truncate">{fun.title}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Visual Builder Form / Editor and Settings Panel */}
        <div className="bg-white p-5 rounded-lg border border-gray-255 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-4">
            <div>
              <h3 className="font-bold text-indigo-950 text-sm flex items-center gap-1.5">
                <Sliders className="w-4.5 h-4.5 text-[#1a237e]" />
                محرر محتوى وتخصيص قنوات الدفع (Checkout Editor)
              </h3>
              <p className="text-xs text-gray-400 mt-0.5">عدل الأسعار، الشعارات، ونظام الخصومات لتحديث الموبايل فورياً.</p>
            </div>

            <button
              id="copy-checkout-pay-url-btn"
              onClick={handleCopyCheckoutLink}
              className="bg-indigo-50 border border-indigo-200 text-[#1a237e] hover:bg-indigo-100 text-xs font-bold py-1.5 px-3 rounded flex items-center gap-1 self-start transition-all"
            >
              {copySuccess ? (
                <>
                  <Check className="w-3.5 h-3.5 text-green-600" />
                  تم نسخ الرابط!
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  نسخ رابط صفحة الدفع
                </>
              )}
            </button>
          </div>

          <form onSubmit={handleSaveChanges} className="space-y-4">
            <div>
              <label className="text-[11px] font-bold text-gray-650 block mb-1">عنوان ترويسة الصفحة الرئيسي (Main Headline) *</label>
              <input 
                type="text" 
                required
                value={editorTitle}
                onChange={e => setEditorTitle(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded px-2.5 py-2 text-xs text-gray-900 focus:outline-none focus:border-[#1a237e] text-right"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-[11px] font-bold text-gray-650 block mb-1">اسم المنتج أو الخدمة الترويجية *</label>
                <input 
                  type="text" 
                  required
                  value={editorProdName}
                  onChange={e => setEditorProdName(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded px-2.5 py-2 text-xs text-gray-900 focus:outline-none focus:border-[#1a237e] text-right"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-gray-650 block mb-1">وصف مقتضب للمبيعات *</label>
                <input 
                  type="text" 
                  required
                  value={editorDesc}
                  onChange={e => setEditorDesc(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded px-2.5 py-2 text-xs text-gray-900 focus:outline-none focus:border-[#1a237e] text-right"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-[11px] font-bold text-gray-650 block mb-1">التكلفة والرسوم الأساسية (ج.م) *</label>
                <input 
                  type="number" 
                  required
                  value={editorPrice}
                  onChange={e => setEditorPrice(Number(e.target.value))}
                  className="w-full bg-gray-50 border border-gray-200 rounded px-2.5 py-2 text-xs text-gray-900 focus:outline-none focus:border-[#1a237e] text-right font-sans font-bold"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-gray-650 block mb-1">تكلفة الخصم (إن وجد) (ج.م)</label>
                <input 
                  type="number" 
                  value={editorDiscountPrice}
                  onChange={e => setEditorDiscountPrice(Number(e.target.value))}
                  className="w-full bg-gray-50 border border-gray-200 rounded px-2.5 py-2 text-xs text-gray-900 focus:outline-none focus:border-[#1a237e] text-right font-sans font-bold"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-gray-650 block mb-1">كود كسر السعر / كوبون الخصم</label>
                <input 
                  type="text" 
                  value={editorCoupon}
                  onChange={e => setEditorCoupon(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded px-2.5 py-2 text-xs text-gray-900 focus:outline-none focus:border-[#1a237e] text-center font-mono font-bold"
                />
              </div>
            </div>

            <div>
              <label className="text-[11px] font-bold text-gray-650 block mb-1">صيغة نص زر الاهتمام والدفع الرئيسي (CTA Button text) *</label>
              <input 
                type="text" 
                required
                value={editorCta}
                onChange={e => setEditorCta(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded px-2.5 py-2 text-xs text-gray-900 focus:outline-none focus:border-[#1a237e] text-right font-bold"
              />
            </div>

            <div className="pt-3 border-t border-gray-150 flex justify-end gap-2.5">
              <button
                id="save-editor-funnel-changes"
                type="submit"
                className="bg-[#1a237e] hover:bg-indigo-900 text-white text-xs font-bold py-2.5 px-6 rounded shadow-sm cursor-pointer transition-all flex items-center gap-1"
              >
                <Check className="w-4 h-4" />
                تحديث وحفظ خيارات صفحة المحاكاة
              </button>
            </div>
          </form>
        </div>

        {/* Integration details */}
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-xs text-amber-900 font-semibold leading-relaxed">
          <p className="font-bold flex items-center gap-1.5 mb-1.5 text-[#1a237e]">
            <Sparkles className="w-4.5 h-4.5 text-amber-500" />
            تكامل صفحات الدفع في نظام رحاب
          </p>
          <p className="font-normal text-gray-600 block">
            عند إرسال رابط الدفع الفعلي للزبائن، يملأ العميل تفاصيله وتتم معالجة السداد تلقائياً بدمج بوابات فيزا، ميزة، فوري، أو كاش. فور نجاح السداد يتم تحويله تلقائياً لقروبات المتابعة أو تسجيله أوتوماتيكياً في الأكاديمية وإرسال رسالة ترحيبية فورية عبر واتساب الخاص به.
          </p>
        </div>
      </div>

      {/* Smartphone Device Simulator (Spans 4 Columns) */}
      <div className="lg:col-span-4 flex justify-center">
        <div className="w-[285px] h-[580px] bg-slate-900 rounded-[35px] border-4 border-slate-800 p-2.5 shadow-2xl relative flex flex-col justify-between overflow-hidden select-none">
          
          {/* Native speaker bezel / Camera Notch */}
          <div className="absolute top-2.5 left-1/2 transform -translate-x-1/2 w-28 h-4.5 bg-black rounded-b-xl z-20 flex items-center justify-around px-2">
            <span className="w-2 h-2 rounded-full bg-slate-800"></span>
            <span className="w-8 h-1 rounded-full bg-slate-800"></span>
          </div>

          {/* Internal Screen canvas */}
          <div className="bg-white flex-1 rounded-[25px] overflow-y-auto overflow-x-hidden pt-6 pb-4 px-3 flex flex-col justify-between text-right font-sans border border-slate-700/50">
            {isSimPaid ? (
              // Payment Success Simulated View
              <div className="bg-white flex-1 flex flex-col items-center justify-center p-3 animate-fade-in text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 border border-emerald-200">
                  <CheckCircle2 className="w-6 h-6 animate-bounce" />
                </div>
                <div>
                  <h4 className="font-extrabold text-xs text-indigo-950 font-sans leading-relaxed">تم الدفع السداد بنجاح!</h4>
                  <p className="text-[10px] text-emerald-600 font-bold mt-1.5">مرحباً بك ضمن شركاء رحاب للتسويق</p>
                </div>
                <div className="bg-gray-50 border border-gray-150 rounded p-2 text-[9.5px] text-gray-500 font-sans leading-normal">
                  <span className="block">اسم الزبون: <strong>{simName}</strong></span>
                  <span className="block mt-0.5">القيمة المقبوضة: <strong>{simCoupon === editorCoupon && editorDiscountPrice ? editorDiscountPrice : editorPrice} ج.م</strong></span>
                  <span className="block mt-0.5">الفاتورة المعمدة: <strong className="font-mono">#REHAB-{Math.floor(Math.random() * 900) + 100}</strong></span>
                </div>
                <button
                  id="reset-phone-view-form"
                  onClick={handleResetPhoneForm}
                  className="bg-[#1a237e] hover:bg-indigo-900 text-white text-[9px] font-bold py-1.5 px-4 rounded w-full cursor-pointer transition-all"
                >
                  العودة لتجربة صفحة أخرى
                </button>
              </div>
            ) : (
              // Checkout form Simulated Screen
              <div className="space-y-3">
                {/* Branding header in the phone screen */}
                <div className="flex items-center justify-between border-b border-gray-100 pb-2 bg-indigo-50/50 p-2.5 rounded-lg">
                  <div className="text-right">
                    <span className="font-bold text-[9px] text-[#1a237e] block">شركة رحاب للتسويق</span>
                    <span className="text-[7.5px] text-gray-400 block">بوابة سداد آمنة وموثقة</span>
                  </div>
                  <div className="w-5 h-5 rounded bg-[#1a237e] flex items-center justify-center text-white text-[9px] font-black shadow-sm">
                    ر
                  </div>
                </div>

                <div className="space-y-1.5">
                  <h4 className="text-[10px] font-extrabold text-[#1a237e] leading-snug">{editorTitle}</h4>
                  <p className="text-[8.5px] text-gray-500 leading-relaxed font-semibold">{editorDesc}</p>
                </div>

                {/* Product details and price tag */}
                <div className="bg-slate-50 border border-slate-100 p-2 rounded flex items-center justify-between">
                  <div>
                    <span className="text-[8px] text-gray-400 block">المنتج المحدد للتسجيل:</span>
                    <span className="font-bold text-[9.5px] text-[#1a237e] truncate block max-w-28">{editorProdName}</span>
                  </div>
                  <div className="text-left font-sans block">
                    {editorDiscountPrice && simCoupon === editorCoupon ? (
                      <>
                        <span className="text-[7.5px] text-rose-500 line-through block">{editorPrice} ج.م</span>
                        <span className="font-extrabold text-xs text-emerald-600 block">{editorDiscountPrice} ج.م</span>
                      </>
                    ) : (
                      <span className="font-extrabold text-xs text-indigo-950 block">{editorPrice} ج.م</span>
                    )}
                  </div>
                </div>

                {/* Input Fields on phone mockup */}
                <form onSubmit={handleSimulatePaymentInPhone} className="space-y-2.5 pt-1">
                  
                  {simError && (
                    <div className="text-[8px] bg-red-50 text-red-600 p-1.5 rounded text-center font-bold">
                      {simError}
                    </div>
                  )}

                  <div>
                    <label className="text-[8px] font-black text-gray-500 block mb-0.5">اسمك بالكامل *</label>
                    <input 
                      type="text" 
                      placeholder="الأستاذ / الزبون الموقر"
                      value={simName}
                      onChange={e => setSimName(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded px-2 py-1 text-[9.5px] text-gray-900 text-right outline-none focus:border-indigo-600 font-sans"
                    />
                  </div>

                  <div>
                    <label className="text-[8px] font-black text-gray-500 block mb-0.5">رقم هاتف الواتساب النشط *</label>
                    <input 
                      type="text" 
                      placeholder="01012345678"
                      value={simPhone}
                      onChange={e => setSimPhone(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded px-2 py-1 text-[9.5px] text-gray-900 text-right outline-none focus:border-indigo-600 font-mono"
                    />
                  </div>

                  <div>
                    <label className="text-[8px] font-black text-gray-500 block mb-0.5">هل تملك كوبون خصم؟</label>
                    <div className="flex gap-1">
                      <input 
                        type="text" 
                        placeholder="SUMMER50"
                        value={simCoupon}
                        onChange={e => setSimCoupon(e.target.value)}
                        className="flex-1 bg-slate-50 border border-slate-200 rounded px-2 py-1 text-[9.5px] text-center font-mono font-bold outline-none focus:border-indigo-600 uppercase"
                      />
                    </div>
                    {simCoupon === editorCoupon && editorDiscountPrice ? (
                      <span className="text-[7.5px] text-green-600 font-bold block mt-0.5">تم تفعيل خصم الكوبون بنجاح (وفرت {editorPrice - editorDiscountPrice} ج.م)!</span>
                    ) : simCoupon ? (
                      <span className="text-[7.5px] text-amber-500 block mt-0.5">الكوبون غير مطابق أو لم يتم تفعيله يدوياً.</span>
                    ) : null}
                  </div>

                  <button
                    id="simulate-checkout-phone-btn"
                    type="submit"
                    className="w-full bg-[#1a237e] hover:bg-indigo-900 text-white font-extrabold text-[9.5px] py-2 rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1 mt-3"
                  >
                    <Smartphone className="w-3.5 h-3.5" />
                    {editorCta || "سجل بياناتك الموقرة واشترك الآن"}
                  </button>
                </form>
              </div>
            )}

            {/* Simulated SSL safety footer */}
            <div className="text-[7.5px] text-gray-400 text-center border-t border-gray-100 pt-2 flex items-center justify-center gap-1 font-mono">
              <span>🛡️ SSL SECURE CHECKOUT</span>
              <span>•</span>
              <span>POWERED BY REHAB</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
