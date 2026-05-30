/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { 
  Calendar as CalendarIcon, 
  Clock, 
  User, 
  MapPin, 
  Plus, 
  X, 
  CheckSquare, 
  Video, 
  PhoneCall, 
  AlertTriangle, 
  CheckCircle2, 
  Sparkles,
  Search,
  Check
} from "lucide-react";
import { ConsultationBooking } from "../types";

interface ConsultationsViewProps {
  consultations: ConsultationBooking[];
  setConsultations: React.Dispatch<React.SetStateAction<ConsultationBooking[]>>;
  triggerNotificationSim: (clientName: string, eventType: string, courseTitle: string) => void;
}

export default function ConsultationsView({ 
  consultations, 
  setConsultations,
  triggerNotificationSim
}: ConsultationsViewProps) {
  
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddOpen, setIsAddOpen] = useState(false);

  // Form states - Booking
  const [bName, setBName] = useState("");
  const [bPhone, setBPhone] = useState("");
  const [bEmail, setBEmail] = useState("");
  const [bDate, setBDate] = useState("2026-06-01");
  const [bTime, setBTime] = useState("12:00 م");
  const [bType, setBType] = useState<"استشارة مجانية" | "جلسة تسويق عقاري مدفوعة" | "جلسة تحليل حملات ممولة" | "جلسة عصف ذهني وإطلاق براند">("استشارة مجانية");
  const [bNotes, setBNotes] = useState("");

  const [dateFilterSelected, setDateFilterSelected] = useState<string>("all");

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bName.trim() || !bPhone.trim()) return;

    const newBooking: ConsultationBooking = {
      id: "cb_" + Date.now(),
      clientName: bName,
      clientPhone: bPhone,
      clientEmail: bEmail || "client@consult.eg",
      bookingDate: bDate,
      bookingTime: bTime,
      consultType: bType,
      status: "مؤكدة",
      notes: bNotes
    };

    setConsultations(prev => [newBooking, ...prev]);
    setIsAddOpen(false);

    // Reset Form Fields
    setBName("");
    setBPhone("");
    setBEmail("");
    setBNotes("");

    // Simulate real-time WhatsApp & Email confirmation notification dispatch!
    triggerNotificationSim(bName, "عند حجز الاستشارة", `${bType} (موعد: ${bDate} في ${bTime})`);
  };

  const handleToggleStatus = (id: string, newStatus: "مؤكدة" | "بانتظار التأكيد" | "ملغاة" | "مكتملة") => {
    setConsultations(prev => prev.map(c => {
      if (c.id === id) {
        return { ...c, status: newStatus };
      }
      return c;
    }));
  };

  const handleDaySelectFast = (dateString: string) => {
    setDateFilterSelected(dateString);
  };

  // Build a list of upcoming 7 days to display in calendar slot grid
  const upcoming7Days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i);
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    const dateStr = `${yyyy}-${mm}-${dd}`;
    const weekdayStr = d.toLocaleDateString("ar-EG", { weekday: "short" });
    const dayNumStr = d.toLocaleDateString("ar-EG", { day: "numeric" });
    return { dateStr, weekdayStr, dayNumStr };
  });

  // Calculate statistics
  const totalUpcoming = consultations.filter(c => c.status === "مؤكدة" || c.status === "بانتظار التأكيد").length;
  const totalCompleted = consultations.filter(c => c.status === "مكتملة").length;
  const totalPendingConfirmation = consultations.filter(c => c.status === "بانتظار التأكيد").length;

  // Filter listings
  const filteredConsultations = consultations.filter(c => {
    const matchStatus = filterStatus === "all" || c.status === filterStatus;
    const matchDate = dateFilterSelected === "all" || c.bookingDate === dateFilterSelected;
    const matchSearch = c.clientName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        c.consultType.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        c.clientPhone.includes(searchTerm);
    return matchStatus && matchDate && matchSearch;
  });

  return (
    <div id="consultation-view-wrapper" className="space-y-6 text-right font-sans">
      
      {/* Quick Summary Numbers */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 select-none animate-fade-in">
        <div className="bg-white p-4.5 rounded-lg border border-gray-250 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 h-[3px] w-full bg-[#1a237e]"></div>
          <span className="text-gray-500 text-xs block mb-1 font-semibold">إجمالي الجلسات القادمة</span>
          <span className="text-2xl font-bold text-indigo-950 font-sans block">{totalUpcoming} جلسة</span>
          <span className="text-[10px] text-indigo-500 block font-bold mt-1">تنسيق مبيعات رحاب للتشغيل</span>
        </div>
        <div className="bg-white p-4.5 rounded-lg border border-gray-250 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 h-[3px] w-full bg-emerald-500"></div>
          <span className="text-gray-500 text-xs block mb-1 font-semibold">استشارات منجزة بالكامل</span>
          <span className="text-2xl font-bold text-emerald-600 font-sans block">{totalCompleted} عميل</span>
          <span className="text-[10px] text-green-700 block font-bold mt-1">تم توجيههم بالكامل بنجاح</span>
        </div>
        <div className="bg-white p-4.5 rounded-lg border border-gray-250 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 h-[3px] w-full bg-amber-500"></div>
          <span className="text-gray-500 text-xs block mb-1 font-semibold">بانتظار التنسيق المالي</span>
          <span className="text-2xl font-bold text-amber-600 font-sans block">{totalPendingConfirmation} مستند</span>
          <span className="text-[10px] text-gray-400 block mt-1">متطلب تواصل جاري لتأكيد الحجز</span>
        </div>
        <div className="bg-white p-4.5 rounded-lg border border-gray-250 shadow-sm flex items-center justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 h-[3px] w-full bg-purple-500"></div>
          <div>
            <span className="text-gray-500 text-xs block mb-1 font-semibold">معدل تواصل الحضور</span>
            <span className="text-2xl font-bold text-purple-600 font-sans block">٩٨.٤%</span>
          </div>
          <span className="text-[9px] bg-purple-100 text-purple-800 font-bold px-2 py-0.5 rounded-full">ممتاز</span>
        </div>
      </div>

      {/* Date Slot Selection Calendar strip */}
      <div className="bg-white p-4 rounded-lg border border-gray-250 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-3 select-none">
          <span className="text-xs text-indigo-950 font-bold flex items-center gap-1">
            <CalendarIcon className="w-4 h-4 text-[#1a237e]" />
            جدول ومواعيد جلسات الأسبوع الجاري:
          </span>
          <button 
            onClick={() => setDateFilterSelected("all")}
            className={`text-[10px] font-bold px-3 py-1 rounded transition-colors ${
              dateFilterSelected === "all" ? "bg-[#1a237e] text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            عرض كافة الأيام والأوقات
          </button>
        </div>

        {/* Days grid strip */}
        <div className="grid grid-cols-7 gap-2">
          {upcoming7Days.map((day) => {
            const isSelected = dateFilterSelected === day.dateStr;
            // Count number of appointments on that day to highlight with dot!
            const countOnDay = consultations.filter(c => c.bookingDate === day.dateStr).length;

            return (
              <button
                id={`calendar-day-btn-${day.dateStr}`}
                key={day.dateStr}
                onClick={() => handleDaySelectFast(day.dateStr)}
                className={`py-2 px-1 text-center rounded-lg border font-sans cursor-pointer transition-all flex flex-col items-center justify-between ${
                  isSelected 
                    ? "bg-indigo-50 border-[#1a237e] text-[#1a237e] ring-1 ring-indigo-200" 
                    : "bg-gray-50/50 border-gray-150 hover:bg-white text-gray-700"
                }`}
              >
                <span className="text-[10px] text-gray-400 font-bold">{day.weekdayStr}</span>
                <span className="text-base font-extrabold block my-0.5">{day.dayNumStr}</span>
                {countOnDay > 0 ? (
                  <span className="w-1.5 h-1.5 bg-[#1a237e] rounded-full mt-0.5 animate-pulse"></span>
                ) : (
                  <span className="w-1.5 h-1.5 opacity-0"></span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Workspace split */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Bookings Table List (Spans 2 columns) */}
        <div className="bg-white rounded-lg border border-gray-250 p-5 shadow-sm lg:col-span-2 flex flex-col justify-between">
          <div>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-4">
              <div>
                <h3 className="font-bold text-sm text-[#1a237e] flex items-center gap-1.5">
                  <CheckSquare className="w-4.5 h-4.5 text-[#1a237e]" />
                  شؤون وتعديل الاستشارات الجارية 
                </h3>
                <p className="text-xs text-gray-500 mt-0.5">تابع حالات اللقاء والاتصالات، وحدث مؤشرات التأكيد يدوياً.</p>
              </div>

              <div className="flex gap-1">
                <button 
                  onClick={() => setIsAddOpen(true)}
                  className="bg-[#1a237e] hover:bg-indigo-900 text-white font-bold text-xs py-1.5 px-4 rounded transition-all flex items-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" />
                  حجز جلسة لعميل
                </button>
              </div>
            </div>

            {/* Filters controls */}
            <div className="flex flex-col md:flex-row gap-3 mb-4">
              <div className="flex gap-1.5 select-none overflow-x-auto pb-1 flex-1">
                <button 
                  onClick={() => setFilterStatus("all")}
                  className={`text-[10.5px] font-bold px-2.5 py-1 rounded-md transition-colors ${
                    filterStatus === "all" ? "bg-indigo-900 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  الكل ({consultations.length})
                </button>
                <button 
                  onClick={() => setFilterStatus("مؤكدة")}
                  className={`text-[10.5px] font-bold px-2.5 py-1 rounded-md transition-colors ${
                    filterStatus === "مؤكدة" ? "bg-indigo-900 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  مؤكدة
                </button>
                <button 
                  onClick={() => setFilterStatus("بانتظار التأكيد")}
                  className={`text-[10.5px] font-bold px-2.5 py-1 rounded-md transition-colors ${
                    filterStatus === "بانتظار التأكيد" ? "bg-indigo-900 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  بانتظار التأكيد
                </button>
                <button 
                  onClick={() => setFilterStatus("مكتملة")}
                  className={`text-[10.5px] font-bold px-2.5 py-1 rounded-md transition-colors ${
                    filterStatus === "مكتملة" ? "bg-indigo-900 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  مكتملة
                </button>
              </div>

              {/* Quick Search */}
              <div className="relative w-full md:w-56 shrink-0">
                <Search className="w-3.5 h-3.5 text-gray-400 absolute right-3 top-2.5" />
                <input 
                  type="text" 
                  placeholder="ابحث باسم العميل..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 text-[11px] py-1.5 px-3 pr-8 rounded focus:outline-none focus:border-[#1a237e] transition-all text-right"
                />
              </div>
            </div>

            {/* Render List */}
            <div className="space-y-3.5 max-h-[460px] overflow-y-auto pr-1">
              {filteredConsultations.length === 0 ? (
                <div className="text-center py-12 text-gray-400 text-xs bg-gray-55/30 border border-dashed rounded-lg">
                  لم يتم العثور على أي جلسات لقاء تطابق التصفية المطلوبة.
                </div>
              ) : (
                filteredConsultations.map((booking) => (
                  <div key={booking.id} className="p-4 bg-slate-50/50 hover:bg-white border hover:border-indigo-300 rounded-lg transition-all space-y-3 relative">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-2.5">
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-xs text-indigo-950 font-sans">{booking.clientName}</h4>
                          <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${
                            booking.consultType.includes("مدفوعة") 
                              ? "bg-amber-100 text-amber-800" 
                              : "bg-indigo-100 text-[#1a237e]"
                          }`}>
                            {booking.consultType}
                          </span>
                        </div>
                        <p className="text-[10px] text-gray-400 mt-0.5 font-mono">
                          هاتف: {booking.clientPhone} • {booking.clientEmail}
                        </p>
                      </div>

                      <div className="flex flex-wrap items-center gap-2.5">
                        <span className="text-[10.5px] font-mono text-[#1a237e] font-bold bg-indigo-50 border border-indigo-100/50 px-2.5 py-1 rounded flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-indigo-600" />
                          {booking.bookingDate} في {booking.bookingTime}
                        </span>

                        <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded ${
                          booking.status === "مؤكدة" 
                            ? "bg-emerald-100 text-emerald-800" 
                            : booking.status === "بانتظار التأكيد"
                              ? "bg-amber-100 text-amber-800"
                              : booking.status === "مكتملة"
                                ? "bg-[#1a237e] text-white"
                                : "bg-red-100 text-red-800"
                        }`}>
                          {booking.status}
                        </span>
                      </div>
                    </div>

                    {booking.notes && (
                      <p className="text-[10.5px] text-gray-500 font-semibold leading-relaxed p-2 bg-white rounded border border-gray-150">
                        {booking.notes}
                      </p>
                    )}

                    {/* Actions panel */}
                    <div className="pt-2 border-t border-gray-150 flex justify-between items-center text-[10px] text-gray-400">
                      <span>بوابة الاتصال: <strong className="text-gray-600">اجتماع زووم (زوووم كول)</strong></span>
                      <div className="flex gap-2">
                        {booking.status !== "مكتملة" && (
                          <button
                            id={`complete-consult-${booking.id}`}
                            onClick={() => handleToggleStatus(booking.id, "مكتملة")}
                            className="bg-white hover:bg-emerald-50 text-emerald-600 border border-emerald-200 px-2 py-1 rounded font-bold cursor-pointer transition-all inline-flex items-center gap-0.5"
                          >
                            <Check className="w-3 h-3" />
                            تحديد كمكتملة
                          </button>
                        )}
                        {booking.status !== "ملغاة" && (
                          <button
                            id={`cancel-consult-${booking.id}`}
                            onClick={() => handleToggleStatus(booking.id, "ملغاة")}
                            className="bg-white hover:bg-rose-50 text-rose-600 border border-red-200 px-2 py-1 rounded font-bold cursor-pointer transition-all inline-flex items-center"
                          >
                            إلغاء الجلسة
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Consulting tips and details (Spans 1 column) */}
        <div className="space-y-6 select-none font-sans">
          
          <div className="bg-white p-5 rounded-lg border border-gray-250 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 h-[3px] w-full bg-[#1a237e]"></div>
            <h3 className="font-bold text-sm text-indigo-950 mb-3 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-500" />
              توصيات الجلسات الناجحة اليوم
            </h3>

            <div className="space-y-3 text-xs leading-relaxed font-semibold text-gray-700">
              <div className="p-3 bg-indigo-50/50 border border-indigo-100 rounded-lg">
                <p className="font-bold text-[#1a237e] text-xs">مستهدف عقاري متميز بالتجمع:</p>
                <p className="mt-1 font-normal text-gray-500">مراجعة ميزانيات صيف ٢٠٢٦ مع أحمد الشناوي لبناء عهدة سيلز تفوق التوقعات والتركيز على قنوات كبار المستثمرين بالوطن العربي.</p>
              </div>

              <div className="p-3 bg-emerald-50/40 border border-emerald-100 rounded-lg">
                <p className="font-bold text-emerald-800 text-xs">تحسين الريلز والإنستغرام:</p>
                <p className="mt-1 font-normal text-gray-500">تقديم تصاميم عينات مجانية لـ بوتيك زهرة قبل عقد يوم الأربعاء لضمهم للعقد السنوي للإنتاج الفول اتش دي.</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-5 rounded-lg border border-gray-250 shadow-sm text-xs font-semibold text-gray-700">
            <h4 className="font-bold text-indigo-950 mb-3 text-right">مؤشرات الأداء لقاعة زووم</h4>
            <div className="space-y-2">
              <div className="flex justify-between items-center bg-gray-50 p-2.5 rounded">
                <span className="text-gray-500">التزامن مع تقويم جوجل</span>
                <span className="text-indigo-950 font-bold font-sans">مفعل وآمن 🛡️</span>
              </div>
              <div className="flex justify-between items-center bg-gray-50 p-2.5 rounded">
                <span className="text-gray-500">إجمالي الساعات المحجوزة</span>
                <span className="text-indigo-950 font-bold font-sans">١٢ ساعة للأيام المقابلة</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Form modal */}
      {isAddOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 transition-all">
          <div className="bg-white border border-gray-200 rounded-lg w-full max-w-md overflow-hidden shadow-2xl">
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <h3 className="font-bold text-indigo-900 text-sm flex items-center gap-2">
                <CalendarIcon className="w-5 h-5 text-[#1a237e]" />
                تسجيل وحجز جلسة استشارية جديدة
              </h3>
              <button 
                onClick={() => setIsAddOpen(false)} 
                className="p-1 text-gray-400 hover:text-gray-750 hover:bg-gray-100 rounded cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleBooking} className="p-6 space-y-4 text-right">
              <div>
                <label className="text-[11px] font-bold text-gray-600 block mb-1.5">اسم العميل بالكامل *</label>
                <input 
                  type="text" 
                  required
                  placeholder="مثال: المستثمر سمير رائف"
                  value={bName}
                  onChange={e => setBName(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded px-3 py-2 text-xs text-gray-900 focus:outline-none focus:border-[#1a237e]"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] font-bold text-gray-600 block mb-1.5">رقم هاتف الواتساب المعتمد *</label>
                  <input 
                    type="tel" 
                    required
                    placeholder="01012345678"
                    value={bPhone}
                    onChange={e => setBPhone(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded px-3 py-2 text-xs text-gray-900 focus:outline-none focus:border-[#1a237e] font-mono text-right"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-gray-600 block mb-1.5">البريد الإلكتروني للعميل</label>
                  <input 
                    type="email" 
                    placeholder="client@mail.eg"
                    value={bEmail}
                    onChange={e => setBEmail(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded px-3 py-2 text-xs text-gray-900 focus:outline-none focus:border-[#1a237e] font-mono text-right"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] font-bold text-gray-600 block mb-1.5">تاريخ اللقاء أو الحجز *</label>
                  <input 
                    type="date" 
                    required
                    value={bDate}
                    onChange={e => setBDate(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded px-3 py-2 text-xs text-gray-900 focus:outline-none focus:border-[#1a237e] font-mono text-center"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-gray-600 block mb-1.5">الساعة المطلوبة للتنسيق *</label>
                  <select 
                    value={bTime}
                    onChange={e => setBTime(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded px-3 py-2 text-xs text-gray-850 focus:outline-none focus:border-[#1a237e] text-center"
                  >
                    <option value="11:30 ص">11:30 صباحاً</option>
                    <option value="12:00 م">12:00 ظهراً</option>
                    <option value="01:30 م">01:30 بعد الظهر</option>
                    <option value="02:30 م">02:30 بعد الظهر</option>
                    <option value="04:30 م">04:30 مساءً</option>
                    <option value="05:30 م">05:30 مساءً</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold text-gray-600 block mb-1.5">نوع ونمط الجلسة الاستشارية *</label>
                <select 
                  value={bType}
                  onChange={e => setBType(e.target.value as any)}
                  className="w-full bg-gray-50 border border-gray-200 rounded px-3 py-2 text-xs text-gray-850 focus:outline-none focus:border-[#1a237e] text-right"
                >
                  <option value="استشارة مجانية">استشارة تسويق أولية مجانية (٣٠ دقيقة)</option>
                  <option value="جلسة تسويق عقاري مدفوعة">جلسة تسويق عقاري استرتيجية مطولة (ساعتين - مدفوعة)</option>
                  <option value="جلسة تحليل حملات ممولة">جلسة معاينة وتدقيق أرقام الحملات الممولة (ساعة ونصف)</option>
                  <option value="جلسة عصف ذهني وإطلاق براند">جلسة عصف ذهني وبناء علامات تجارية موحدة (٣ ساعات)</option>
                </select>
              </div>

              <div>
                <label className="text-[11px] font-bold text-gray-600 block mb-1.5">أهداف وملاحظات اللقاء الخاصة بالتشغيل</label>
                <textarea 
                  placeholder="ملاحظات العصف الذهني أو طلبات العميل المسبقة..."
                  value={bNotes}
                  onChange={e => setBNotes(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded px-3 py-2 text-xs text-gray-900 focus:outline-none focus:border-[#1a237e] h-16 text-right"
                />
              </div>

              <div className="pt-4 border-t border-gray-200 flex gap-2">
                <button 
                  type="submit"
                  className="bg-[#1a237e] text-white font-bold text-xs px-4 py-2.5 rounded transition-all cursor-pointer flex-1"
                >
                  احجز وأطلق إشعار واتساب التلقائي 🌸
                </button>
                <button 
                  type="button" 
                  onClick={() => setIsAddOpen(false)}
                  className="bg-gray-100 text-gray-700 font-bold text-xs px-4 py-2.5 rounded border border-gray-205"
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
