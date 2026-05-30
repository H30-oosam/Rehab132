/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { 
  Users, 
  Search, 
  Plus, 
  Sparkles, 
  Trash2, 
  Edit3, 
  MapPin, 
  PhoneCall, 
  Mail, 
  ChevronsLeftRight, 
  Globe, 
  TrendingUp,
  X,
  CreditCard
} from "lucide-react";
import React, { useState } from "react";
import { Client, LeadStage } from "../types";

interface ContactsViewProps {
  clients: Client[];
  setClients: React.Dispatch<React.SetStateAction<Client[]>>;
  isAddFormOpen: boolean;
  setIsAddFormOpen: (open: boolean) => void;
}

export default function ContactsView({ clients, setClients, isAddFormOpen, setIsAddFormOpen }: ContactsViewProps) {
  const [selectedStageFilter, setSelectedStageFilter] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");
  
  // Create New Client States
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [newValue, setNewValue] = useState("");
  const [newCity, setNewCity] = useState("القاهرة الجديدة");
  const [newSource, setNewSource] = useState("إعلانات فيسبوك");
  const [newStage, setNewStage] = useState<LeadStage>(LeadStage.Lead);

  // Search and Filter clients
  const finalFilteredClients = clients.filter(client => {
    const matchesStage = selectedStageFilter === "all" || client.stage === selectedStageFilter;
    const matchesSearch = 
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.phone.includes(searchTerm) ||
      client.city.includes(searchTerm) ||
      client.source.includes(searchTerm);
    return matchesStage && matchesSearch;
  });

  const handleStageChange = (clientId: string, nextStage: LeadStage) => {
    setClients(prev => prev.map(c => c.id === clientId ? { ...c, stage: nextStage } : c));
  };

  const handleDeleteClient = (clientId: string) => {
    if (window.confirm("هل أنت متأكد من رغبتك في حذف هذا العميل نهائياً من قاعدة بيانات رحاب للتسويق؟")) {
      setClients(prev => prev.filter(c => c.id !== clientId));
    }
  };

  const handleCreateClient = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newPhone.trim()) {
      alert("يرجى ملء اسم العميل ورقم هاتفه بشكل صحيح.");
      return;
    }

    const newClient: Client = {
      id: "cli_" + Date.now(),
      name: newName,
      email: newEmail || "info@client.com",
      phone: newPhone,
      stage: newStage,
      value: Number(newValue) || 12000,
      city: newCity,
      source: newSource,
      createdAt: new Date().toISOString().split('T')[0]
    };

    setClients(prev => [newClient, ...prev]);

    // Reset Form & Close
    setNewName("");
    setNewEmail("");
    setNewPhone("");
    setNewValue("");
    setNewCity("القاهرة الجديدة");
    setNewSource("إعلانات فيسبوك");
    setNewStage(LeadStage.Lead);
    setIsAddFormOpen(false);
  };

  const formatEGP = (num: number) => {
    return new Intl.NumberFormat("ar-EG", { style: "currency", currency: "EGP", maximumFractionDigits: 0 }).format(num);
  };

  return (
    <div id="contacts-management-container" className="space-y-6">
      
      {/* Search and Filters Header Menu */}
      <div className="bg-white p-5 rounded-lg border border-gray-250 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-96 select-none">
          <Search className="w-4 h-4 text-gray-400 absolute right-3.5 top-3.5" />
          <input 
            type="text" 
            placeholder="ابحث بالاسم، المدينة، المحافظة، أو الهاتف..." 
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full bg-gray-50 border border-gray-200 rounded pr-10 pl-4 py-2.5 text-xs text-gray-950 placeholder-gray-400 focus:outline-none focus:border-[#1a237e] transition-all text-right animate-none"
          />
        </div>

        {/* Stage Tabs Filtering */}
        <div className="flex flex-wrap gap-1.5 w-full md:w-auto">
          <button 
            onClick={() => setSelectedStageFilter("all")}
            className={`px-3 py-1.5 rounded text-xs font-semibold cursor-pointer transition-all ${
              selectedStageFilter === "all" 
                ? "bg-[#1a237e] text-white font-bold shadow-sm" 
                : "bg-gray-100 text-gray-600 hover:text-gray-900 hover:bg-gray-200"
            }`}
          >
            الكل ({clients.length})
          </button>
          {Object.values(LeadStage).map((stage) => {
            const count = clients.filter(c => c.stage === stage).length;
            return (
              <button 
                key={stage}
                onClick={() => setSelectedStageFilter(stage)}
                className={`px-3 py-1.5 rounded text-xs font-semibold cursor-pointer transition-all ${
                  selectedStageFilter === stage 
                    ? "bg-[#1a237e] text-white font-bold shadow-sm" 
                    : "bg-gray-100 text-gray-600 hover:text-gray-900 hover:bg-gray-200"
                }`}
              >
                {stage} ({count})
              </button>
            );
          })}
        </div>

        <button 
          id="add-new-client-top-btn"
          onClick={() => setIsAddFormOpen(true)}
          className="bg-[#1a237e] hover:bg-indigo-900 text-white text-xs px-4 py-2.5 rounded font-bold flex items-center gap-1.5 transition-all shadow-sm cursor-pointer shrink-0 w-full md:w-auto justify-center"
        >
          <Plus className="w-4 h-4" />
          إضافة صفقة جديدة
        </button>
      </div>

      {/* Main Grid View of Contact Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {finalFilteredClients.length === 0 ? (
          <div className="col-span-full bg-white p-12 rounded-lg border border-gray-250 text-center text-gray-400 text-sm shadow-sm">
            لا توجد صفقات أو عملاء يطابقون خيارات التصفية الحالية.
          </div>
        ) : (
          finalFilteredClients.map((client) => (
            <div 
              key={client.id}
              className="bg-white rounded-lg border border-gray-250 p-5 flex flex-col justify-between hover:border-indigo-300 hover:shadow-md transition-all group relative overflow-hidden"
            >
              {/* Card visual accent by status */}
              <div className={`absolute top-0 right-0 h-1 w-full ${
                client.stage === LeadStage.Lead 
                  ? "bg-blue-600" 
                  : client.stage === LeadStage.Contacted 
                    ? "bg-[#1a237e]" 
                    : client.stage === LeadStage.Proposal 
                      ? "bg-purple-600" 
                      : "bg-emerald-600"
              }`} />

              <div>
                {/* Header Info */}
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div>
                    <h3 className="font-bold text-sm text-gray-900 group-hover:text-[#1a237e] transition-colors">
                      {client.name}
                    </h3>
                    <span className="text-[10px] text-gray-400 font-mono block mt-1">تاريخ التسجيل: {client.createdAt}</span>
                  </div>
                  {/* Status Indicator Badge */}
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    client.stage === LeadStage.Lead 
                      ? "bg-blue-50 text-blue-700 border border-blue-200" 
                      : client.stage === LeadStage.Contacted 
                        ? "bg-indigo-50 text-indigo-700 border border-indigo-200" 
                        : client.stage === LeadStage.Proposal 
                          ? "bg-purple-50 text-purple-700 border border-purple-200" 
                          : "bg-emerald-50 text-emerald-700 border border-emerald-200"
                  }`}>
                    {client.stage}
                  </span>
                </div>

                {/* Contact Coordinates */}
                <div className="space-y-2 py-3 border-y border-gray-100 text-[11px] text-gray-600">
                  <div className="flex items-center gap-2">
                    <PhoneCall className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                    <span className="font-mono text-gray-800">{client.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                    <span className="truncate font-mono text-gray-500">{client.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                    <span>الموقع: <strong className="text-gray-800 font-sans font-semibold">{client.city}</strong></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Globe className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                    <span>المصدر: <span className="bg-gray-100 px-1.5 py-0.5 rounded text-[10px] text-gray-600 font-semibold">{client.source}</span></span>
                  </div>
                </div>
              </div>

              {/* Pricing & State change interaction footer */}
              <div className="mt-4 pt-3 flex items-center justify-between border-t border-gray-50">
                <div>
                  <span className="text-[10px] text-gray-400 block mb-0.5 font-bold">ميزانية الإعلان المقدرة</span>
                  <span className="font-sans font-bold text-indigo-950 text-xs text-right pr-0.5 block">
                    {formatEGP(client.value)}
                  </span>
                </div>

                {/* Interactive State Transfer Actions */}
                <div className="flex items-center gap-1.5">
                  <select 
                    id={`client-[${client.id}]-stage-selector`}
                    value={client.stage}
                    onChange={(e) => handleStageChange(client.id, e.target.value as LeadStage)}
                    className="bg-gray-50 border border-gray-200 text-[10px] font-bold px-2 py-1.5 rounded text-gray-800 focus:outline-none focus:border-[#1a237e] transition-all text-right cursor-pointer"
                  >
                    {Object.values(LeadStage).map((st) => (
                      <option key={st} value={st}>{st}</option>
                    ))}
                  </select>

                  <button 
                    id={`client-[${client.id}]-delete-btn`}
                    onClick={() => handleDeleteClient(client.id)}
                    className="p-1.5 bg-gray-50 hover:bg-red-50 text-gray-400 hover:text-red-600 rounded border border-gray-200 hover:border-red-250 transition-all cursor-pointer"
                    title="حذف هذا العميل"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Pop-up Modals: Create Client Form Drawer */}
      {isAddFormOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 transition-all">
          <div className="bg-white border border-gray-200 rounded-lg w-full max-w-lg overflow-hidden shadow-2xl">
            {/* Header */}
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <h3 className="font-bold text-indigo-900 text-sm flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#1a237e]" />
                إدخال عميل تسويق جديد لشركة رحاب
              </h3>
              <button 
                id="close-add-client-modal"
                onClick={() => setIsAddFormOpen(false)} 
                className="p-1 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content fields */}
            <form onSubmit={handleCreateClient} className="p-6 space-y-4">
              <div>
                <label className="text-[11px] font-bold text-gray-600 block mb-1.5 text-right">اسم العميل ومؤسسته *</label>
                <input 
                  type="text" 
                  required
                  placeholder="مثال: أستاذ حسام - معارض الأثاث"
                  value={newName}
                  onChange={e => setNewName(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded px-3 py-2 text-xs text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#1a237e] text-right"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] font-bold text-gray-600 block mb-1.5 text-right">رقم هاتف المحمول *</label>
                  <input 
                    type="tel" 
                    required
                    placeholder="مثال: 010xxxxxxxx"
                    value={newPhone}
                    onChange={e => setNewPhone(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded px-3 py-2 text-xs text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#1a237e] font-mono text-right"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-gray-600 block mb-1.5 text-right">الموازنة التقديرية (ج.م) *</label>
                  <input 
                    type="number" 
                    placeholder="مثال: 15000"
                    value={newValue}
                    onChange={e => setNewValue(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded px-3 py-2 text-xs text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#1a237e] font-mono text-right"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold text-gray-600 block mb-1.5 text-right">البريد الإلكتروني للعميل</label>
                <input 
                  type="email" 
                  placeholder="name@company.eg"
                  value={newEmail}
                  onChange={e => setNewEmail(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded px-3 py-2 text-xs text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#1a237e] font-mono text-right"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] font-bold text-gray-600 block mb-1.5 text-right">الموقع الجغرافي (مصر)</label>
                  <select 
                    value={newCity}
                    onChange={e => setNewCity(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded px-3 py-2 text-xs text-gray-800 focus:outline-none focus:border-[#1a237e] text-right"
                  >
                    <option value="القاهرة الجديدة / التجمع">القاهرة الجديدة</option>
                    <option value="الشيخ زايد / أكتوبر">الشيخ زايد</option>
                    <option value="مصر الجديدة">مصر الجديدة</option>
                    <option value="الدقي والجيزة">الدقي / الجيزة</option>
                    <option value="الإسكندرية">الإسكندرية</option>
                    <option value="المنصورة">المنصورة</option>
                    <option value="طنطا والغربية">طنطا</option>
                  </select>
                </div>
                <div>
                  <label className="text-[11px] font-bold text-gray-600 block mb-1.5 text-right">قناة المعرفة / المصدر</label>
                  <select 
                    value={newSource}
                    onChange={e => setNewSource(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded px-3 py-2 text-xs text-gray-800 focus:outline-none focus:border-[#1a237e] text-right"
                  >
                    <option value="إعلانات فيسبوك">إعلانات فيسبوك</option>
                    <option value="إنستغرام">إنستغرام</option>
                    <option value="تيك توك">تيك توك</option>
                    <option value="إعلانات جوجل سيرش">إعلانات جوجل</option>
                    <option value="توصية عميل صديق">توصية صديق</option>
                    <option value="البحث العضوي SEO">البحث العضوي SEO</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold text-gray-600 block mb-1.5 text-right">مرحلة القمع الحالية</label>
                <select 
                  value={newStage}
                  onChange={e => setNewStage(e.target.value as LeadStage)}
                  className="w-full bg-gray-50 border border-gray-200 rounded px-3 py-2 text-xs text-gray-800 focus:outline-none focus:border-[#1a237e] text-right"
                >
                  {Object.values(LeadStage).map((st) => (
                    <option key={st} value={st}>{st}</option>
                  ))}
                </select>
              </div>

              <div className="pt-4 border-t border-gray-200 flex gap-2">
                <button 
                  id="add-client-submit-btn"
                  type="submit"
                  className="bg-[#1a237e] hover:bg-indigo-900 text-white font-bold text-xs px-4 py-2.5 rounded transition-all cursor-pointer flex-1"
                >
                  حفظ العهدة والصفقة الآن
                </button>
                <button 
                  id="add-client-cancel-btn"
                  type="button"
                  onClick={() => setIsAddFormOpen(false)}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-xs px-4 py-2.5 rounded transition-all cursor-pointer border border-gray-205"
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
