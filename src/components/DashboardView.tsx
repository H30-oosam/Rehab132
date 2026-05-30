/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { 
  TrendingUp, 
  DollarSign, 
  Percent, 
  Users, 
  CheckSquare, 
  Plus, 
  Calendar, 
  ArrowUpRight,
  ChevronLeft,
  Briefcase
} from "lucide-react";
import { Client, LeadStage, Task } from "../types";
import React, { useState } from "react";

interface DashboardViewProps {
  clients: Client[];
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  onNavigateToTab: (tabId: string) => void;
  openAddClientForm: () => void;
}

export default function DashboardView({ clients, tasks, setTasks, onNavigateToTab, openAddClientForm }: DashboardViewProps) {
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskPriority, setNewTaskPriority] = useState<"high" | "medium" | "low">("medium");

  // Dynamic Metrics
  const totalOpportunities = clients.filter(c => c.stage !== LeadStage.Closed).length;
  
  const pipelineValue = clients
    .filter(c => c.stage !== LeadStage.Closed)
    .reduce((sum, c) => sum + c.value, 0);

  const closedCount = clients.filter(c => c.stage === LeadStage.Closed).length;
  const totalCount = clients.length;
  const conversionRate = totalCount > 0 ? Math.round((closedCount / totalCount) * 1000) / 10 : 0;

  // Funnel Stage Counts
  const leadsCount = clients.filter(c => c.stage === LeadStage.Lead).length;
  const contactedCount = clients.filter(c => c.stage === LeadStage.Contacted).length;
  const proposalCount = clients.filter(c => c.stage === LeadStage.Proposal).length;
  
  const funnelStages = [
    { label: "عملاء محتملون (Leads)", value: leadsCount, percentage: totalCount > 0 ? (leadsCount / totalCount) * 100 : 0, color: "fill-blue-600 bg-blue-600" },
    { label: "تم التواصل (Contacted)", value: contactedCount, percentage: totalCount > 0 ? (contactedCount / totalCount) * 100 : 0, color: "fill-indigo-600 bg-indigo-600" },
    { label: "تقديم العروض (Proposal)", value: proposalCount, percentage: totalCount > 0 ? (proposalCount / totalCount) * 100 : 0, color: "fill-purple-600 bg-purple-600" },
    { label: "تم التعاقد (Closed Won)", value: closedCount, percentage: totalCount > 0 ? (closedCount / totalCount) * 100 : 0, color: "fill-emerald-600 bg-emerald-600" }
  ];

  const handleToggleTask = (taskId: string) => {
    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, completed: !t.completed } : t));
  };

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    const newTask: Task = {
      id: "t_" + Date.now(),
      title: newTaskTitle,
      dueDate: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0], // 2 days from now
      completed: false,
      priority: newTaskPriority
    };

    setTasks(prev => [newTask, ...prev]);
    setNewTaskTitle("");
  };

  // Helper to format money in Egyptian numbers or clean Arabic format
  const formatEGP = (num: number) => {
    return new Intl.NumberFormat("ar-EG", { style: "currency", currency: "EGP", maximumFractionDigits: 0 }).format(num);
  };

  return (
    <div id="dashboard-view-container" className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-indigo-900 to-indigo-850 p-6 rounded-lg text-white flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm">
        <div>
          <h1 className="text-xl font-bold text-white">مرحباً، في لوحة تحكّم شركة رحاب للتسويق</h1>
          <p className="text-indigo-200 text-xs mt-1">النظام يعمل بكفاءة. إليك نظرة سريعة على المبيعات، ومعدلات تحويل العملاء، والحملات النشطة اليوم.</p>
        </div>
        <div className="flex items-center gap-2">
          <button 
            id="register-client-dashboard-btn"
            onClick={openAddClientForm}
            className="bg-[#1a237e] hover:bg-indigo-900 text-white text-xs px-4 py-2 rounded font-bold flex items-center gap-1.5 transition-all outline-none cursor-pointer border border-indigo-700 shadow-sm"
          >
            <Plus className="w-3.5 h-3.5" />
            إضافة عميل جديد
          </button>
          <button 
            id="go-to-contacts-btn"
            onClick={() => onNavigateToTab("contacts")}
            className="bg-indigo-800/60 hover:bg-indigo-800/80 text-white text-xs px-4 py-2 rounded font-bold border border-indigo-700 transition-all flex items-center gap-1 cursor-pointer"
          >
            صفحة الصفقات
            <ChevronLeft className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* KPI Cards Row Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* KPI 1: Active Opportunities */}
        <div className="bg-white p-5 rounded-lg border border-gray-250 shadow-sm hover:border-indigo-300 transition-all relative overflow-hidden group">
          <div className="absolute top-0 right-0 h-[3px] w-full bg-[#1a237e]"></div>
          <div className="flex items-start justify-between">
            <div>
              <span className="text-xs font-semibold text-gray-500 block mb-1">الفرص البيعية والصفقات النشطة</span>
              <span className="text-3xl font-bold text-indigo-950 font-sans">{totalOpportunities}</span>
              <span className="text-[10px] text-green-700 font-bold block mt-1 bg-green-100 border border-green-200/50 px-1.5 py-0.5 rounded inline-block">
                ↑ ١٢% منذ الشهر الماضي
              </span>
            </div>
            <div className="w-9 h-9 rounded bg-indigo-50 border border-indigo-100 flex items-center justify-center text-[#1a237e]">
              <Users className="w-4.5 h-4.5" />
            </div>
          </div>
          {/* Custom SVG Sparkline line */}
          <div className="mt-4 h-11 w-full">
            <svg viewBox="0 0 100 30" className="w-full h-full text-indigo-600 overflow-visible" preserveAspectRatio="none">
              <defs>
                <linearGradient id="blue-gradient-kpi" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#1a237e" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#1a237e" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path 
                d="M0,25 Q15,5 30,15 T60,8 T90,20 T100,2" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2.5" 
                strokeLinecap="round"
              />
              <path 
                d="M0,25 Q15,5 30,15 T60,8 T90,20 T100,2 L100,30 L0,30 Z" 
                fill="url(#blue-gradient-kpi)"
                stroke="none"
              />
            </svg>
          </div>
        </div>

        {/* KPI 2: Pipeline Value */}
        <div className="bg-white p-5 rounded-lg border border-gray-250 shadow-sm hover:border-indigo-300 transition-all relative overflow-hidden">
          <div className="absolute top-0 right-0 h-[3px] w-full bg-[#1a237e]"></div>
          <div className="flex items-start justify-between">
            <div>
              <span className="text-xs font-semibold text-gray-500 block mb-1">حمولة القناة الاستثمارية (Pipeline)</span>
              <span className="text-2xl font-bold text-indigo-950 tracking-tight block mt-0.5">{formatEGP(pipelineValue)}</span>
              <span className="text-[10px] text-green-700 font-bold block mt-1 bg-green-150 border border-green-200 px-1.5 py-0.5 rounded inline-block">
                محققة حالياً
              </span>
            </div>
            <div className="w-9 h-9 rounded bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600">
              <DollarSign className="w-4.5 h-4.5" />
            </div>
          </div>
          {/* Custom SVG Sparkline */}
          <div className="mt-4 h-11 w-full">
            <svg viewBox="0 0 100 30" className="w-full h-full text-[#1a237e] overflow-visible" preserveAspectRatio="none">
              <defs>
                <linearGradient id="indigo-gradient-kpi" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#1a237e" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#1a237e" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path 
                d="M0,22 Q20,10 40,25 T80,5 T100,12" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2.5" 
                strokeLinecap="round"
              />
              <path 
                d="M0,22 Q20,10 40,25 T80,5 T100,12 L100,30 L0,30 Z" 
                fill="url(#indigo-gradient-kpi)"
                stroke="none"
              />
            </svg>
          </div>
        </div>

        {/* KPI 3: Conversion Rate */}
        <div className="bg-white p-5 rounded-lg border border-gray-250 shadow-sm hover:border-indigo-300 transition-all relative overflow-hidden">
          <div className="absolute top-0 right-0 h-[3px] w-full bg-emerald-500"></div>
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <span className="text-xs font-semibold text-gray-500 block mb-1">معدل تحويل الصفقات</span>
              <span className="text-3xl font-bold text-indigo-950 block mt-0.5">{conversionRate}%</span>
              <span className="text-[10px] text-gray-500 block mt-1.5 leading-tight">
                {closedCount} من أصل {totalCount} عملاء تم تحويلهم لتعاقد دائم
              </span>
            </div>
            {/* Circular Progress Gauge */}
            <div className="relative w-14 h-14 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90">
                <circle 
                  cx="28" 
                  cy="28" 
                  r="24" 
                  className="stroke-gray-100" 
                  strokeWidth="4" 
                  fill="transparent" 
                />
                <circle 
                  cx="28" 
                  cy="28" 
                  r="24" 
                  className="stroke-emerald-600" 
                  strokeWidth="4" 
                  fill="transparent" 
                  strokeDasharray={151} 
                  strokeDashoffset={151 - (151 * Math.min(conversionRate, 100)) / 100}
                  strokeLinecap="round"
                />
              </svg>
              <span className="absolute text-[10px] font-sans font-bold text-gray-800">{Math.round(conversionRate)}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Charts & Analytics Block */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        
        {/* Dynamic Marketing Funnel Layout (Spans 3 Columns) */}
        <div className="bg-white p-6 rounded-lg border border-gray-250 shadow-sm lg:col-span-3 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-base font-bold text-indigo-950 flex items-center gap-2">
                <span className="w-1 h-4 rounded-sm bg-[#1a237e] block"></span>
                قمع المبيعات والتسويق الرقمي (Marketing Funnel)
              </h2>
              <span className="text-[10px] text-gray-400 font-mono">تحديث فوري</span>
            </div>
            <p className="text-gray-500 text-xs mb-6">يوضح القمع حركة العملاء تدريجياً من مجرد عميل محتمل إلى التعاقد النهائي وتدفق الأرباح.</p>
          </div>

          {/* Graphical Funnel UI */}
          <div className="space-y-4 my-auto">
            {funnelStages.map((stage, idx) => {
              // Calculate a visual width representing the funnel shape (first is always wide, last is narrow)
              const maxVal = Math.max(...funnelStages.map(s => s.value)) || 1;
              const ratioWidth = stage.value > 0 ? (stage.value / maxVal) : 0.05;

              return (
                <div key={idx} className="flex items-center gap-3">
                  <div className="w-24 text-xs font-bold text-gray-700 truncate text-right">
                    {stage.label.split(' ')[0]}
                  </div>
                  {/* Outer Bar */}
                  <div className="flex-1 bg-gray-100 h-8 rounded overflow-hidden flex items-center">
                    <div 
                      className={`h-full ${stage.color} rounded transition-all duration-500 hover:opacity-90 flex items-center px-3 justify-between`}
                      style={{ width: `${Math.max(ratioWidth * 100, 10)}%` }}
                    >
                      <span className="text-[11px] text-white font-bold leading-none select-none">
                        {stage.value} عملاء
                      </span>
                      {stage.value > 0 && (
                        <span className="text-[10px] text-white/85 font-semibold dir-ltr leading-none">
                          {Math.round((stage.value / totalCount) * 100)}%
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-6 pt-4 border-t border-gray-150 flex items-center justify-between text-xs text-gray-500 bg-gray-50/50 p-3 rounded">
            <span className="font-medium text-gray-700">توصيات المتابعة الذكية:</span>
            <span className="text-[#1a237e] font-semibold">تحسين عروض الأسعار لرفع نسبة الإغلاق بمقدار ١٢%</span>
          </div>
        </div>

        {/* Tasks Checklist with Action (Spans 2 Columns) */}
        <div className="bg-white p-6 rounded-lg border border-gray-250 shadow-sm lg:col-span-2 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-bold text-indigo-950 flex items-center gap-2">
                <CheckSquare className="w-4 h-4 text-[#1a237e]" />
                قائمة مهام المتابعة اليومية
              </h2>
              <span className="bg-gray-100 text-gray-600 text-[10px] px-2 py-0.5 rounded font-mono font-bold">
                {tasks.filter(t => !t.completed).length} معلقة
              </span>
            </div>

            {/* Simple Add Task Form */}
            <form onSubmit={handleAddTask} className="flex gap-2 mb-4">
              <input 
                type="text" 
                value={newTaskTitle}
                onChange={e => setNewTaskTitle(e.target.value)}
                placeholder="أضف مهمة جديدة هنا..."
                className="flex-1 bg-gray-50 border border-gray-200 text-xs px-3 py-2 rounded text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#1a237e] transition-all text-right"
              />
              <select
                value={newTaskPriority}
                onChange={e => setNewTaskPriority(e.target.value as any)}
                className="bg-gray-50 border border-gray-200 text-[10px] px-2 py-2 rounded text-gray-800 focus:outline-none focus:border-[#1a237e] text-right"
              >
                <option value="high font-bold">هام وعاجل</option>
                <option value="medium">متوسط</option>
                <option value="low">منخفض</option>
              </select>
              <button 
                id="add-task-submit-btn"
                type="submit" 
                className="bg-[#1a237e] hover:bg-indigo-900 text-white p-2 rounded transition-all cursor-pointer shadow-sm"
              >
                <Plus className="w-4 h-4" />
              </button>
            </form>

            {/* Interactive Checklist list */}
            <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
              {tasks.length === 0 ? (
                <div className="text-center py-6 text-gray-400 text-xs">
                  لا توجد مهام مسجلة حالياً.
                </div>
              ) : (
                tasks.map((task) => (
                  <div 
                    key={task.id}
                    className={`p-3 rounded border flex items-center justify-between text-xs transition-all ${
                      task.completed 
                        ? "bg-gray-50 border-gray-100 text-gray-400 line-through" 
                        : "bg-white border-gray-200 text-gray-800 hover:bg-gray-50/50"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <input 
                        type="checkbox" 
                        checked={task.completed}
                        onChange={() => handleToggleTask(task.id)}
                        className="w-4 h-4 rounded border-gray-300 text-[#1a237e] focus:ring-[#1a237e] cursor-pointer"
                      />
                      <span>{task.title}</span>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      {/* Priority Tag */}
                      <span className={`text-[9px] px-1.5 py-0.5 rounded font-bold ${
                        task.priority === "high" 
                          ? "bg-red-50 text-red-600 border border-red-100" 
                          : task.priority === "medium" 
                            ? "bg-amber-50 text-amber-700 border border-amber-100" 
                            : "bg-gray-100 text-gray-500"
                      }`}>
                        {task.priority === "high" ? "هام" : task.priority === "medium" ? "متوسط" : "عادي"}
                      </span>
                      <span className="text-[10px] text-gray-500 font-mono flex items-center gap-0.5">
                        <Calendar className="w-3 h-3 text-gray-400" />
                        {task.dueDate}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="text-[10px] text-gray-400 text-center mt-3 pt-2 border-t border-gray-150">
            تاريخ اليوم: {new Date(2026, 4, 30).toLocaleDateString('ar-EG', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </div>
        </div>
      </div>

      {/* Latest 3 Clients Registering List */}
      <div className="bg-white p-6 rounded-lg border border-gray-250 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-bold text-indigo-950 flex items-center gap-2">
            <span className="w-1 h-4 rounded-sm bg-[#1a237e] block"></span>
            أحدث الصفقات والعملاء المسجلين حديثاً
          </h2>
          <button 
            id="view-all-clients-dash-link"
            onClick={() => onNavigateToTab("contacts")}
            className="text-[#1a237e] hover:text-[#0f155c] text-xs font-bold flex items-center gap-1 transition-all cursor-pointer"
          >
            عرض كافة العملاء
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-right text-xs text-gray-800">
            <thead>
              <tr className="bg-gray-50 border-y border-gray-200 text-gray-500 font-bold">
                <th className="p-3 text-right">الاسم والشركة</th>
                <th className="p-3 text-right">الهاتف</th>
                <th className="p-3 text-right">الموقع الجغرافي</th>
                <th className="p-3 text-right">المرحلة الحالية</th>
                <th className="p-3 text-right">قيمة الصفقة</th>
                <th className="p-3 text-right">مصدر العميل</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {clients.slice(0, 3).map((client) => (
                <tr key={client.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="p-3 font-semibold text-gray-900">{client.name}</td>
                  <td className="p-3 font-mono text-gray-600">{client.phone}</td>
                  <td className="p-3">{client.city}</td>
                  <td className="p-3">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
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
                  </td>
                  <td className="p-3 font-sans font-bold text-indigo-950">{formatEGP(client.value)}</td>
                  <td className="p-3 text-xs text-gray-500">{client.source}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
