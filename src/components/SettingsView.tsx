/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { 
  Building, 
  MapPin, 
  Globe, 
  Settings, 
  Save, 
  Sparkles, 
  Users, 
  HelpCircle,
  ShieldAlert,
  Sliders,
  DollarSign,
  PhoneCall
} from "lucide-react";
import React, { useState } from "react";

interface SettingsViewProps {
  companyName: string;
  setCompanyName: (name: string) => void;
  clientsCount: number;
  campaignsCount: number;
}

export default function SettingsView({ companyName, setCompanyName, clientsCount, campaignsCount }: SettingsViewProps) {
  const [phone, setPhone] = useState("01012345678");
  const [address, setAddress] = useState("التجمع الخامس - القاهرة الجديدة، مصر");
  const [website, setWebsite] = useState("www.rehab-marketing.eg");
  const [taxId, setTaxId] = useState("488-991-382");
  const [commission, setCommission] = useState("١٤%");

  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
    }, 3000);
  };

  // Team members list representing Rehab Marketing core structure
  const teamMembers = [
    { name: "هاني صبري", role: "مدير الحسابات والعملاء Key Accounts", avatar: "هـ" },
    { name: "رانية محمود", role: "مديرة كتابة المحتوى والتصاميم", avatar: "ر" },
    { name: "أدهم هلال", role: "خبير ومحلل الإعلانات الممولة Media Buyer", avatar: "أ" },
    { name: "مريم جلال", role: "أخصائية تحسين محركات البحث SEO Champion", avatar: "م" }
  ];

  return (
    <div id="settings-view-container" className="grid grid-cols-1 lg:grid-cols-3 gap-6 text-right">
      
      {/* Settings inputs column (Spans 2 columns) */}
      <div className="bg-white rounded-lg border border-gray-255 p-6 lg:col-span-2 shadow-sm">
        <h2 className="text-base font-bold text-indigo-950 flex items-center gap-2 mb-2">
          <Settings className="w-5 h-5 text-[#1a237e]" />
          الملف الإداري الرسمي والبراندينج
        </h2>
        <p className="text-xs text-gray-500 mb-6">قم بتعديل البيانات الرسمية وعلامة البراند لشركة رحاب للتسويق لتنعكس مباشرة في ترويسات الفواتير.</p>

        {saveSuccess && (
          <div className="bg-green-100 border border-green-200 text-green-700 text-xs px-4 py-3 rounded mb-6 flex items-center gap-2 font-bold animate-fade-in">
            <Sparkles className="w-4 h-4 shrink-0" />
            تم حفظ ونشر كافة التعديلات وعلامة براند رحاب بنجاح في النظام!
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-[11px] font-bold text-gray-600 block mb-1.5">اسم الشركة في الترويسات والترقيات *</label>
              <input 
                type="text" 
                required
                value={companyName}
                onChange={e => setCompanyName(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded px-3 py-2.5 text-xs text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#1a237e] text-right font-sans font-bold"
              />
            </div>
            <div>
              <label className="text-[11px] font-bold text-gray-600 block mb-1.5">رقم تليفون التواصل الإداري *</label>
              <input 
                type="text" 
                required
                value={phone}
                onChange={e => setPhone(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded px-3 py-2.5 text-xs text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#1a237e] text-right font-mono"
              />
            </div>
          </div>

          <div>
            <label className="text-[11px] font-bold text-gray-600 block mb-1.5">العنوان والمقر الإداري بمصر *</label>
            <input 
              type="text" 
              required
              value={address}
              onChange={e => setAddress(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded px-3 py-2.5 text-xs text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#1a237e] text-right font-semibold"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-[11px] font-bold text-gray-600 block mb-1.5">الموقع الإلكتروني الرسمي</label>
              <input 
                type="text" 
                value={website}
                onChange={e => setWebsite(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded px-3 py-2.5 text-xs text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#1a237e] text-right font-mono"
              />
            </div>
            <div>
              <label className="text-[11px] font-bold text-gray-600 block mb-1.5">رقم البطاقة والملف الضريبي الموحد *</label>
              <input 
                type="text" 
                required
                value={taxId}
                onChange={e => setTaxId(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded px-3 py-2.5 text-xs text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#1a237e] text-right font-mono"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-gray-150 flex items-center justify-between">
            <div className="text-[11px] text-gray-400 flex items-center gap-1 font-bold">
              <ShieldAlert className="w-3.5 h-3.5 text-amber-500" />
              أنت تعدل كمسؤول ذو صلاحيات كاملة بنظام رحاب.
            </div>

            <button 
              id="save-settings-btn"
              type="submit"
              className="bg-[#1a237e] hover:bg-indigo-900 text-white font-bold text-xs px-5 py-2.5 rounded transition-all shadow-sm cursor-pointer flex items-center gap-1.5"
            >
              <Save className="w-4 h-4" />
              حفظ وتطبيق الخيارات
            </button>
          </div>
        </form>
      </div>

      {/* Info statistics column */}
      <div className="space-y-6">
        
        {/* Core numbers status summary */}
        <div className="bg-white rounded-lg border border-gray-250 p-5 shadow-sm">
          <h3 className="font-bold text-sm text-indigo-950 mb-4 flex items-center gap-2">
            <Sliders className="w-4.5 h-4.5 text-[#1a237e]" />
            بيانات التشغيل الكلية
          </h3>

          <div className="space-y-3 font-semibold text-xs text-gray-700">
            <div className="flex justify-between items-center bg-gray-50/70 p-3 rounded border border-gray-200">
              <span className="text-gray-500">إجمالي الصفقات والعملاء</span>
              <strong className="text-gray-900 font-sans">{clientsCount} عميل</strong>
            </div>
            <div className="flex justify-between items-center bg-gray-50/70 p-3 rounded border border-gray-200">
              <span className="text-gray-500">حملات تسويقية جارية</span>
              <strong className="text-gray-900 font-sans">{campaignsCount} حملة نشطة</strong>
            </div>
            <div className="flex justify-between items-center bg-gray-50/70 p-3 rounded border border-gray-200">
              <span className="text-gray-500">العمولات وقيمة المضافة</span>
              <strong className="text-emerald-600 font-sans">{commission} متضمنة</strong>
            </div>
          </div>
        </div>

        {/* Rehab marketing specialist team members */}
        <div className="bg-white rounded-lg border border-gray-250 p-5 shadow-sm">
          <h3 className="font-bold text-sm text-indigo-950 mb-4 flex items-center gap-2">
            <Users className="w-4.5 h-4.5 text-[#1a237e]" />
            طاقم عمل شركة رحاب للتسويق
          </h3>

          <div className="space-y-3">
            {teamMembers.map((member, i) => (
              <div key={i} className="flex items-center gap-3 bg-gray-50/50 p-2.5 rounded border border-gray-200">
                <div className="w-8 h-8 rounded bg-indigo-50 border border-indigo-200 text-[#1a237e] flex items-center justify-center font-bold text-sm shrink-0">
                  {member.avatar}
                </div>
                <div>
                  <h5 className="font-bold text-xs text-gray-900">{member.name}</h5>
                  <p className="text-[10px] text-gray-500 mt-0.5 font-semibold">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
