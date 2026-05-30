/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { 
  Megaphone, 
  TrendingUp, 
  DollarSign, 
  BarChart2, 
  Plus, 
  Check, 
  AlertCircle, 
  Sparkles,
  Play,
  Share2,
  Tv,
  X
} from "lucide-react";
import React, { useState } from "react";
import { Campaign } from "../types";

interface CampaignsViewProps {
  campaigns: Campaign[];
  setCampaigns: React.Dispatch<React.SetStateAction<Campaign[]>>;
}

export default function CampaignsView({ campaigns, setCampaigns }: CampaignsViewProps) {
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [newCampName, setNewCampName] = useState("");
  const [newChannel, setNewChannel] = useState("فيسبوك وانستجرام");
  const [newBudget, setNewBudget] = useState("");
  
  const totalBudget = campaigns.reduce((sum, c) => sum + c.budget, 0);
  const totalSpent = campaigns.reduce((sum, c) => sum + c.spent, 0);
  const totalLeads = campaigns.reduce((sum, c) => sum + c.leadsCount, 0);

  const handleCreateCampaign = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCampName.trim() || !newBudget) return;

    const newCamp: Campaign = {
      id: "camp_" + Date.now(),
      name: newCampName,
      channel: newChannel,
      status: "نشط",
      budget: Number(newBudget),
      spent: 0,
      leadsCount: 0,
      conversionRate: 0
    };

    setCampaigns(prev => [newCamp, ...prev]);
    setNewCampName("");
    setNewBudget("");
    setIsAddOpen(false);
  };

  const handleUpdateStatus = (campId: string, nextStatus: "نشط" | "مكتمل" | "مسودة") => {
    setCampaigns(prev => prev.map(c => c.id === campId ? { ...c, status: nextStatus } : c));
  };

  const formatEGP = (num: number) => {
    return new Intl.NumberFormat("ar-EG", { style: "currency", currency: "EGP", maximumFractionDigits: 0 }).format(num);
  };

  return (
    <div id="campaigns-dashboard-container" className="space-y-6">
      
      {/* Overview Analytics Bar */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-5 rounded-lg border border-gray-250 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 h-[3px] w-full bg-[#1a237e]"></div>
          <span className="text-gray-500 text-xs block mb-1 font-semibold">إجمالي الميزانيات المخصصة</span>
          <span className="text-xl lg:text-2xl font-bold text-indigo-950 font-sans block mt-0.5">{formatEGP(totalBudget)}</span>
          <span className="text-[10px] text-gray-400 block mt-1 font-sans font-medium">بالمشروعات الجارية</span>
        </div>
        <div className="bg-white p-5 rounded-lg border border-gray-250 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 h-[3px] w-full bg-rose-500"></div>
          <span className="text-gray-500 text-xs block mb-1 font-semibold">إجمالي المنفق الفعلي</span>
          <span className="text-xl lg:text-2xl font-bold text-rose-600 font-sans block mt-0.5">{formatEGP(totalSpent)}</span>
          <span className="text-[10px] text-gray-400 block mt-1 font-sans font-medium">بالمعدل المستهلك حتى الآن</span>
        </div>
        <div className="bg-white p-5 rounded-lg border border-gray-250 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 h-[3px] w-full bg-blue-500"></div>
          <span className="text-gray-500 text-xs block mb-1 font-semibold">إجمالي العملاء المتولدين</span>
          <span className="text-xl lg:text-2xl font-bold text-blue-700 font-sans block mt-0.5">{totalLeads} عميل محتمل</span>
          <span className="text-[10px] text-green-700 block mt-1.5 bg-green-100 border border-green-200/50 px-1.5 py-0.5 rounded text-[9px] font-bold">بمعدل نمو منسق</span>
        </div>
        <div className="bg-white p-5 rounded-lg border border-gray-250 shadow-sm flex items-center justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 h-[3px] w-full bg-emerald-500"></div>
          <div>
            <span className="text-gray-500 text-xs block mb-1 font-semibold">متوسط العائد الإعلاني (ROAS)</span>
            <span className="text-2xl font-bold text-emerald-600 block mt-0.5">٤.٨ x</span>
          </div>
          <div className="w-8 h-8 bg-[#1a237e]/10 border border-indigo-150 text-[#1a237e] rounded flex items-center justify-center font-bold">
            <TrendingUp className="w-4.5 h-4.5" />
          </div>
        </div>
      </div>

      {/* Campaign List Area & Action Header */}
      <div className="bg-white rounded-lg border border-gray-250 p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-base font-bold text-indigo-950 flex items-center gap-2">
              <span className="w-1 h-4 rounded-sm bg-[#1a237e] block"></span>
              إدارة حملات شركة رحاب للتسويق
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">جدولة وتنظيم الحملات الإعلانية المدفوعة للعملاء على مختلف المنصات وقنوات التواصل.</p>
          </div>
          
          <button 
            id="launch-campaign-modal-btn"
            onClick={() => setIsAddOpen(true)}
            className="bg-[#1a237e] hover:bg-indigo-900 text-white text-xs px-4 py-2.5 rounded font-bold flex items-center gap-1.5 transition-all shadow-sm cursor-pointer w-full md:w-auto justify-center"
          >
            <Plus className="w-4 h-4" />
            إطلاق ونشر حملة جديدة
          </button>
        </div>

        {/* Campaign cards list Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {campaigns.map((camp) => {
            const progressPercent = camp.budget > 0 ? Math.round((camp.spent / camp.budget) * 105) / 1.05 : 0;
            const progressDisplay = camp.budget > 0 ? Math.round((camp.spent / camp.budget) * 100) : 0;
            return (
              <div 
                key={camp.id} 
                className="bg-white rounded border border-gray-200 p-5 hover:border-indigo-250 transition-all flex flex-col justify-between hover:shadow-sm"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div>
                      <h4 className="font-bold text-sm text-gray-900">{camp.name}</h4>
                      <span className="bg-gray-100 text-[10px] text-gray-600 px-2 py-0.5 rounded mt-2 inline-block font-sans font-semibold">
                        المنصة: {camp.channel}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      {/* Status pills */}
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        camp.status === "نشط" 
                          ? "bg-green-100 text-green-700 border border-green-200/50" 
                          : camp.status === "مكتمل" 
                            ? "bg-blue-105 text-blue-700 border border-blue-200" 
                            : "bg-gray-100 text-gray-500 border border-gray-200"
                      }`}>
                        {camp.status}
                      </span>
                    </div>
                  </div>

                  {/* Pricing specs and spending progress */}
                  <div className="grid grid-cols-2 gap-4 my-4 py-3 border-y border-gray-100 text-xs text-slate-800">
                    <div>
                      <span className="text-gray-400 block mb-0.5 text-[10px] font-bold">الميزانية الكلية</span>
                      <span className="font-sans font-bold text-indigo-950">{formatEGP(camp.budget)}</span>
                    </div>
                    <div>
                      <span className="text-gray-400 block mb-0.5 text-[10px] font-bold">المنفق والمسحوب</span>
                      <span className="font-sans font-bold text-rose-600">{formatEGP(camp.spent)}</span>
                    </div>
                  </div>

                  {/* Budget Spent bar */}
                  <div className="space-y-1.5 mb-4">
                    <div className="flex items-center justify-between text-[10px] text-gray-500 pr-0.5">
                      <span className="font-semibold">معدل الاستهلاك المالي</span>
                      <span className="font-mono font-bold">{progressDisplay}%</span>
                    </div>
                    <div className="w-full bg-gray-100 h-2 rounded overflow-hidden">
                      <div 
                        className="bg-[#1a237e] h-full rounded transition-all duration-300"
                        style={{ width: `${Math.min(progressPercent, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                {/* Leads statistics Inside Campaign */}
                <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                  <div className="flex items-center gap-4 text-xs">
                    <div>
                      <span className="text-[10px] text-gray-400 block font-bold">العملاء المولّدين</span>
                      <span className="font-sans font-bold text-indigo-950">{camp.leadsCount} عميل</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-gray-400 block font-bold">معدل الإتمام (Conversion)</span>
                      <span className="font-sans font-bold text-emerald-600">{camp.conversionRate}%</span>
                    </div>
                  </div>

                  {/* Action Dropdown to change status */}
                  <div className="flex items-center gap-1.5 text-[10px]">
                    <span className="text-gray-500 font-semibold">تعديل الحالة:</span>
                    <select
                      value={camp.status}
                      onChange={(e) => handleUpdateStatus(camp.id, e.target.value as any)}
                      className="bg-gray-50 border border-gray-200 text-[10px] font-bold px-1.5 py-1 rounded text-gray-800 focus:outline-none focus:border-[#1a237e] cursor-pointer"
                    >
                      <option value="نشط">نشط</option>
                      <option value="مكتمل">مكتمل</option>
                      <option value="مسودة">مسودة</option>
                    </select>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Pop-up modal Form to Launch Campaign */}
      {isAddOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 transition-all">
          <div className="bg-white border border-gray-200 rounded-lg w-full max-w-md overflow-hidden shadow-2xl text-right">
            {/* Header */}
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <h3 className="font-bold text-indigo-900 text-sm flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#1a237e]" />
                إطلاق حملة رقمية جديدة لشريك رحاب
              </h3>
              <button 
                id="close-launch-camp-modal"
                onClick={() => setIsAddOpen(false)} 
                className="p-1 text-gray-400 hover:text-gray-750 hover:bg-gray-100 rounded cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Fields */}
            <form onSubmit={handleCreateCampaign} className="p-6 space-y-4">
              <div>
                <label className="text-[11px] font-bold text-gray-600 block mb-1.5">اسم الحملة الإعلانية *</label>
                <input 
                  type="text" 
                  required
                  placeholder="مثال: عقارات الساحل الشمالي - ترويجي"
                  value={newCampName}
                  onChange={e => setNewCampName(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded px-3 py-2 text-xs text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#1a237e] text-right"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-gray-600 block mb-1.5">المنصة التسويقية المقررة *</label>
                <select 
                  value={newChannel}
                  onChange={e => setNewChannel(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded px-3 py-2 text-xs text-gray-800 focus:outline-none focus:border-[#1a237e] text-right"
                >
                  <option value="فيسبوك وانستجرام">إعلانات فيسبوك وانستجرام (ميتا)</option>
                  <option value="تيك توك وإنستجرام">حملة تيك توك التفاعلية</option>
                  <option value="جوجل سيرش SEO">محرك بحث جوجل وجوجل أدز</option>
                  <option value="يوتيوب رييلز">إعلانات يوتيوب فيديو ممول</option>
                  <option value="سوشيال ميديا متكاملة">صفقات سوشيال ميديا شاملة لجميع المنصات</option>
                </select>
              </div>

              <div>
                <label className="text-[11px] font-bold text-gray-600 block mb-1.5">الموازنة/ الميزانية الإجمالية للحملة (ج.م) *</label>
                <input 
                  type="number" 
                  required
                  placeholder="مثال: 20000"
                  value={newBudget}
                  onChange={e => setNewBudget(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded px-3 py-2 text-xs text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#1a237e] font-mono text-right"
                />
              </div>

              <div className="pt-4 border-t border-gray-200 flex gap-2">
                <button 
                  id="camp-submit-add-btn"
                  type="submit"
                  className="bg-[#1a237e] hover:bg-indigo-900 text-white font-bold text-xs px-4 py-2.5 rounded transition-all cursor-pointer flex-1 shadow-sm"
                >
                  إيداع وإطلاق الحملة الآن
                </button>
                <button 
                  id="camp-cancel-add-btn"
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
