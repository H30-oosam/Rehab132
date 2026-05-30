/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { 
  LayoutDashboard, 
  Users, 
  MessageSquare, 
  Megaphone, 
  CreditCard, 
  Settings as SettingsIcon,
  Menu,
  X,
  TrendingUp,
  Briefcase,
  GraduationCap,
  Bot,
  Smartphone,
  Calendar
} from "lucide-react";
import { useState } from "react";

interface SidebarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  unreadCount: number;
  companyName: string;
}

export default function Sidebar({ currentTab, setCurrentTab, unreadCount, companyName }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { id: "dashboard", label: "الرئيسية وتحليل الأداء", icon: LayoutDashboard },
    { id: "contacts", label: "العملاء والمبيعات", icon: Users },
    { id: "conversations", label: "المحادثات المباشرة", icon: MessageSquare, badge: unreadCount },
    { id: "academy", label: "الأكاديمية والطلاب", icon: GraduationCap },
    { id: "automations", label: "الأتمتة والرسائل الذكية", icon: Bot },
    { id: "checkout_funnel", label: "صفحات البيع والـ Checkout", icon: Smartphone },
    { id: "consult_booking", label: "حجز الجلسات والاستشارات", icon: Calendar },
    { id: "campaigns", label: "الحملات الإعلانية", icon: Megaphone },
    { id: "payments", label: "المدفوعات والفواتير", icon: CreditCard },
    { id: "settings", label: "إعدادات الشركة", icon: SettingsIcon }
  ];

  return (
    <>
      {/* Mobile Header */}
      <div className="lg:hidden flex items-center justify-between bg-[#1a237e] text-white px-4 py-3 border-b border-indigo-900 sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded bg-white flex items-center justify-center font-bold text-sm text-[#1a237e]">
            ر
          </div>
          <span className="font-sans font-bold text-sm text-white">{companyName}</span>
        </div>
        <button 
          id="mobile-menu-btn"
          onClick={() => setIsOpen(!isOpen)} 
          className="p-1.5 hover:bg-indigo-850 rounded transition-all text-indigo-250 hover:text-white"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar Overlay for Mobile */}
      {isOpen && (
        <div 
          onClick={() => setIsOpen(false)} 
          className="lg:hidden fixed inset-0 bg-black/50 z-40 transition-opacity"
        />
      )}

      {/* Sidebar Container */}
      <aside 
        className={`fixed lg:sticky top-14 lg:top-0 right-0 h-[calc(100vh-3.5rem)] lg:h-screen w-72 bg-[#1a237e] border-l border-indigo-950 text-white flex flex-col justify-between z-45 transition-transform duration-300 lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "translate-x-full lg:translate-x-0"
        }`}
      >
        <div>
          {/* Company Brand Logo Area (Desktop) */}
          <div className="hidden lg:flex items-center gap-3 px-6 py-6 border-b border-indigo-900 bg-indigo-900/60">
            <div className="w-9 h-9 rounded bg-white flex items-center justify-center font-bold text-lg text-[#1a237e] shadow-sm">
              ر
            </div>
            <div className="flex flex-col">
              <span className="font-sans font-bold text-white tracking-tight text-lg">{companyName}</span>
              <span className="text-[10px] text-indigo-200/80 font-mono tracking-wider uppercase mt-0.5">نظام إدارة التسويق والـ CRM</span>
            </div>
          </div>

          {/* Quick Metrics Header inside Sidebar */}
          <div className="px-4 py-3 my-2">
            <div className="bg-indigo-850 rounded p-3 border border-indigo-700/50">
              <div className="flex items-center justify-between text-xs text-indigo-200">
                <span>حالة النظام</span>
                <span className="flex items-center gap-1.5 text-green-400 font-medium font-sans">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>
                  نشط ومتصل
                </span>
              </div>
              <div className="mt-2 text-xs text-indigo-100 flex items-center gap-1">
                <TrendingUp className="w-3.5 h-3.5 text-green-400" />
                <span>العملية الافتراضية:</span>
                <span className="font-sans font-bold text-white">الجنيه المصري (ج.م)</span>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="px-2 space-y-1">
            {menuItems.map((item) => {
              const IconComponent = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  id={`sidebar-tab-${item.id}`}
                  key={item.id}
                  onClick={() => {
                    setCurrentTab(item.id);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-4 py-2.5 rounded text-sm font-medium transition-all duration-150 group relative ${
                    isActive 
                      ? "bg-indigo-800 text-white font-semibold border-r-4 border-white" 
                      : "text-indigo-200 hover:text-white hover:bg-indigo-800/40"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <IconComponent className={`w-4 h-4 transition-transform ${
                      isActive ? "text-white scale-105" : "text-indigo-300 group-hover:text-white"
                    }`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge !== undefined && item.badge > 0 && (
                    <span className="bg-green-400 text-[#1a237e] text-[10px] px-2 py-0.5 rounded-full font-bold shadow-sm">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* User / Agent Footer Info */}
        <div className="p-4 border-t border-indigo-900 bg-indigo-950/40">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-indigo-850 border border-indigo-700 flex items-center justify-center text-white font-bold text-sm">
              <Briefcase className="w-4 h-4 text-green-300" />
            </div>
            <div className="flex flex-col min-w-0 flex-1">
              <span className="text-xs font-semibold text-white truncate block">أ. رحاب / المدير العام</span>
              <span className="text-[10px] text-indigo-200/75 truncate font-mono block">rehab.mktg@admin.com</span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
