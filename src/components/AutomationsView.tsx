/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { 
  Bot, 
  Zap, 
  MessageSquare, 
  Mail, 
  Sparkles, 
  Plus, 
  X, 
  Send, 
  CheckCircle2, 
  Play, 
  AlertTriangle,
  FileText,
  Clock,
  RefreshCw,
  Search
} from "lucide-react";
import { AutoRule, AutoLog } from "../types";

interface AutomationsViewProps {
  rules: AutoRule[];
  setRules: React.Dispatch<React.SetStateAction<AutoRule[]>>;
  logs: AutoLog[];
  setLogs: React.Dispatch<React.SetStateAction<AutoLog[]>>;
  clientsListForMock: Array<{ id: string; name: string; phone: string; email: string }>;
}

export default function AutomationsView({ 
  rules, 
  setRules, 
  logs, 
  setLogs,
  clientsListForMock
}: AutomationsViewProps) {
  
  // Modals
  const [isAddRuleOpen, setIsAddRuleOpen] = useState(false);
  const [testSuccessAlert, setTestSuccessAlert] = useState<string | null>(null);

  // Form states - Add Automation Rule
  const [ruleTitle, setRuleTitle] = useState("");
  const [ruleTrigger, setRuleTrigger] = useState("عند تسجيل العميل");
  const [ruleChannel, setRuleChannel] = useState<"WhatsApp" | "Email" | "Both">("WhatsApp");
  const [ruleTemplate, setRuleTemplate] = useState("");

  // Test send playground states
  const [testRuleId, setTestRuleId] = useState(rules[0]?.id || "");
  const [testClientId, setTestClientId] = useState(clientsListForMock[0]?.id || "");
  const [isSendingSimulated, setIsSendingSimulated] = useState(false);

  const handleCreateRule = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ruleTitle.trim() || !ruleTemplate.trim()) return;

    const newRule: AutoRule = {
      id: "ar_" + Date.now(),
      title: ruleTitle,
      triggerEvent: ruleTrigger,
      channel: ruleChannel,
      messageTemplate: ruleTemplate,
      active: true
    };

    setRules(prev => [newRule, ...prev]);
    setIsAddRuleOpen(false);
    setRuleTitle("");
    setRuleTemplate("");

    // Push action feedback log
    setTestSuccessAlert(`تم بناء قاعدة الأتمتة المخصصة: "${ruleTitle}" وجدولة تشغيلها فوراً بنجاح!`);
    setTimeout(() => setTestSuccessAlert(null), 4000);
  };

  const handleToggleRule = (id: string) => {
    setRules(prev => prev.map(r => r.id === id ? { ...r, active: !r.active } : r));
  };

  const handleRunPlaygroundTest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!testRuleId || !testClientId) return;

    const selectedRule = rules.find(r => r.id === testRuleId);
    const selectedClient = clientsListForMock.find(c => c.id === testClientId);

    if (!selectedRule || !selectedClient) return;

    setIsSendingSimulated(true);

    setTimeout(() => {
      // Replace template parameters
      let renderedText = selectedRule.messageTemplate
        .replace(/\{\{clientName\}\}/g, selectedClient.name)
        .replace(/\{\{clientId\}\}/g, selectedClient.id)
        .replace(/\{\{service\}\}/g, "مقدم الحملة الإعلانية بالتجمع الخامس")
        .replace(/\{\{amount\}\}/g, "15,000")
        .replace(/\{\{date\}\}/g, "2026-06-03")
        .replace(/\{\{time\}\}/g, "11:30 ص");

      const channelsToSend: Array<"WhatsApp" | "Email"> = [];
      if (selectedRule.channel === "WhatsApp" || selectedRule.channel === "Both") channelsToSend.push("WhatsApp");
      if (selectedRule.channel === "Email" || selectedRule.channel === "Both") channelsToSend.push("Email");

      const newLogs: AutoLog[] = channelsToSend.map((ch, idx) => ({
        id: "lg_" + Date.now() + "_" + idx,
        ruleTitle: selectedRule.title,
        recipientName: selectedClient.name,
        recipientContact: ch === "WhatsApp" ? selectedClient.phone : selectedClient.email,
        channel: ch,
        sentAt: new Date().toISOString().replace("T", " ").substring(0, 19),
        status: "تم الإرسال",
        previewText: renderedText.substring(0, 110) + (renderedText.length > 110 ? "..." : "")
      }));

      setLogs(prev => [...newLogs, ...prev]);
      setIsSendingSimulated(false);
      setTestSuccessAlert(`رائع! تم جدولة وبث رسالة تجربة حية لـ ${selectedClient.name} بنجاح عبر ${selectedRule.channel} محاكياً الواقع!`);
      setTimeout(() => setTestSuccessAlert(null), 5000);
    }, 1200);
  };

  const handleClearLogs = () => {
    setLogs([]);
  };

  return (
    <div id="automations-view-container" className="space-y-6 text-right">
      
      {/* Alert Banner */}
      {testSuccessAlert && (
        <div className="bg-green-100 border border-green-200 text-green-800 text-xs py-3.5 px-4 rounded-lg flex items-center gap-2 font-bold animate-fade-in shadow-sm">
          <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{testSuccessAlert}</span>
        </div>
      )}

      {/* Main Header */}
      <div className="bg-white p-6 rounded-lg border border-gray-250 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-indigo-950 flex items-center gap-2">
            <Bot className="w-5 h-5 text-[#1a237e]" />
            محرك الأتمتة والربط الفوري (WhatsApp & Email Campaign Automation)
          </h2>
          <p className="text-xs text-gray-500 mt-1">
            قم بصياغة قوالب الرسائل لعملائك وطلابك. يتم إرسال الرسائل تلقائياً فور تسجيل عميل، أو حجز جلسة استشارية، أو تحقيق نسبة تقدّم.
          </p>
        </div>
        <button
          id="add-rule-action-btn"
          onClick={() => setIsAddRuleOpen(true)}
          className="bg-[#1a237e] hover:bg-indigo-900 text-white font-bold text-xs py-2 px-4 rounded-md transition-all shrink-0 flex items-center gap-1.5 self-start md:self-auto shadow-sm"
        >
          <Plus className="w-4 h-4" />
          بناء قاعدة أتمتة جديدة
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Rules Engine Column (Spans 2 columns on large screens) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-5 rounded-lg border border-gray-250 shadow-sm">
            <h3 className="font-bold text-indigo-950 text-sm mb-4 flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-amber-500" />
              قواعد الإشعارات والإنذار النشطة
            </h3>

            <div className="space-y-4">
              {rules.map((rule) => (
                <div 
                  key={rule.id}
                  className={`p-4 rounded-lg border transition-all ${
                    rule.active 
                      ? "bg-slate-50 border-gray-250 hover:border-indigo-300" 
                      : "bg-gray-100 border-gray-200 opacity-65"
                  }`}
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-2.5 mb-2">
                    <div>
                      <h4 className="font-bold text-xs text-indigo-950 flex items-center gap-1.5">
                        <span className={`w-2 h-2 rounded-full ${rule.active ? "bg-green-500" : "bg-gray-400"}`}></span>
                        {rule.title}
                      </h4>
                      <p className="text-[10px] text-gray-500 mt-0.5 font-semibold">
                        الحدث المحرك: <span className="text-[#1a237e] font-bold">{rule.triggerEvent}</span>
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        rule.channel === "WhatsApp" 
                          ? "bg-emerald-100 text-emerald-800" 
                          : rule.channel === "Email"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-purple-100 text-purple-800"
                      }`}>
                        {rule.channel === "WhatsApp" ? "واتساب فقط" : rule.channel === "Email" ? "إيميل فقط" : "واتساب + إيميل"}
                      </span>

                      {/* Active Status Toggle Indicator */}
                      <button
                        id={`toggle-rule-${rule.id}`}
                        onClick={() => handleToggleRule(rule.id)}
                        className={`text-[9px] px-2 py-0.5 rounded font-bold cursor-pointer transition-all ${
                          rule.active 
                            ? "bg-indigo-900 text-white" 
                            : "bg-gray-300 text-gray-700 hover:bg-gray-400"
                        }`}
                      >
                        {rule.active ? "إيقاف مؤقت" : "تشغيل القاعدة"}
                      </button>
                    </div>
                  </div>

                  {/* Template preview */}
                  <div className="bg-white border border-gray-200 rounded p-2.5 mt-2">
                    <span className="text-[10px] font-bold text-gray-400 block mb-1">صيغة القالب الفعلي:</span>
                    <p className="text-[11px] text-gray-600 leading-relaxed font-sans whitespace-pre-line font-medium text-right">
                      {rule.messageTemplate}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Real-time sending Logs terminal viewer */}
          <div className="bg-white p-5 rounded-lg border border-gray-250 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-indigo-950 text-sm flex items-center gap-2">
                <FileText className="w-4.5 h-4.5 text-[#1a237e]" />
                سجل بث الرسائل والأتمتة الفوري (Activity Logs)
              </h3>
              <button
                id="clear-logs-btn"
                onClick={handleClearLogs}
                className="text-gray-400 hover:text-rose-600 text-[10px] font-bold flex items-center gap-1 transition-colors"
                title="مسح الكشوفات لتسهيل الرؤية"
              >
                تحديث ومسح السجل ({logs.length})
              </button>
            </div>

            <div className="overflow-y-auto max-h-[300px] space-y-2 pr-1 select-all font-mono">
              {logs.length === 0 ? (
                <div className="text-center py-12 text-gray-400 text-xs bg-gray-50 rounded border border-dashed">
                  لا توجد سجلات بريد إلكتروني أو واتساب مبثوثة حالياً. جرب الأداة التجريبية على اليسار!
                </div>
              ) : (
                logs.map((log) => (
                  <div key={log.id} className="p-3 bg-slate-900 text-slate-100 rounded border border-slate-800 text-[11px] flex flex-col md:flex-row justify-between md:items-start gap-2 text-right">
                    <div className="space-y-1.5 flex-1">
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span className="text-yellow-400 font-bold bg-yellow-400/10 px-1 py-0.5 rounded text-[9px]">
                          [{log.sentAt}]
                        </span>
                        <span className="font-bold text-sky-300">{log.ruleTitle}</span>
                      </div>
                      <p className="text-slate-300 font-sans mt-0.5">
                        المحتوى المرسل: <strong className="text-white">"{log.previewText}"</strong>
                      </p>
                      <p className="text-[10px] text-slate-400 font-sans">
                        مستلم الرسالة: <span className="text-[#38bdf8] font-bold font-mono">{log.recipientName} ({log.recipientContact})</span>
                      </p>
                    </div>

                    <div className="flex items-center gap-2 md:self-center shrink-0">
                      <span className={`text-[9px] px-1.5 py-0.5 rounded font-bold ${
                        log.channel === "WhatsApp" ? "bg-emerald-950 text-emerald-400 border border-emerald-900" : "bg-sky-950 text-sky-400 border border-sky-900"
                      }`}>
                        {log.channel === "WhatsApp" ? "WP" : "MAIL"}
                      </span>
                      <span className="bg-teal-950 text-teal-400 text-[9.5px] px-2 py-0.5 rounded-full font-sans font-bold flex items-center gap-0.5">
                        <CheckCircle2 className="w-3 h-3 text-teal-400 shrink-0" />
                        {log.status}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Playground Test Send Column (Spans 1 column on large screens) */}
        <div className="space-y-6">
          <div className="bg-white p-5 rounded-lg border border-gray-250 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 h-[3px] w-full bg-[#1a237e]"></div>
            <h3 className="font-bold text-indigo-950 text-sm mb-2 flex items-center gap-1.5">
              <Play className="w-4 h-4 text-[#1a237e]" />
              غرفة تجربة البث الفوري المباشر
            </h3>
            <p className="text-xs text-gray-500 mb-4">هل ترغب في محاكاة بث رسالة لأحد كبار عملاء رحاب للتسويق؟ استخدم هذه الأداة لترى النتيجة فوراً.</p>

            <form onSubmit={handleRunPlaygroundTest} className="space-y-4">
              <div>
                <label className="text-[11px] font-bold text-gray-600 block mb-1">اختر قالب الرسالة / قاعدة التشغيل *</label>
                <select
                  value={testRuleId}
                  onChange={e => setTestRuleId(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded px-2.5 py-2 text-xs text-gray-800 focus:outline-none focus:border-[#1a237e] text-right"
                >
                  <option value="">-- اختر القالب --</option>
                  {rules.map(r => (
                    <option key={r.id} value={r.id}>{r.title}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-[11px] font-bold text-gray-600 block mb-1">اختر العميل المستلم للتجربة المباشرة *</label>
                <select
                  value={testClientId}
                  onChange={e => setTestClientId(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded px-2.5 py-2 text-xs text-gray-800 focus:outline-none focus:border-[#1a237e] text-right"
                >
                  <option value="">-- اختر عميل من السي آر إم --</option>
                  {clientsListForMock.map(c => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>

              <div className="bg-indigo-50/50 p-2.5 rounded border border-indigo-100 text-[10px] text-indigo-950 font-sans leading-relaxed">
                <p className="font-bold flex items-center gap-1">
                  <AlertTriangle className="w-3.5 h-3.5 text-indigo-600" />
                  ملاحظة المحاكاة الكلية:
                </p>
                <p className="mt-1 font-medium">سيقوم محرك رحاب المطور باستبدال قيم مثل <code className="bg-indigo-100 p-0.5 rounded font-mono font-bold">{"{{clientName}}"}</code> ببيانات العميل الحقيقية تلقائياً قبل البث الفعلي للأتمتة.</p>
              </div>

              <button
                id="execute-playground-test-btn"
                type="submit"
                disabled={isSendingSimulated || !testRuleId || !testClientId}
                className="w-full bg-[#1a237e] hover:bg-indigo-900 text-white font-bold text-xs py-2.5 rounded transition-all cursor-pointer shadow-sm disabled:bg-gray-150 disabled:text-gray-400 flex items-center justify-center gap-1.5"
              >
                {isSendingSimulated ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    جاري توليد وبث الرسالة...
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    إطلاق بث تجريبي فوري ⚡
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Quick system check */}
          <div className="bg-white p-4.5 rounded-lg border border-gray-250 shadow-sm text-xs font-semibold text-gray-700">
            <h4 className="font-bold text-indigo-950 mb-3 block text-right">مؤشرات تشغيل سيرفر الأتمتة</h4>
            <div className="space-y-2">
              <div className="flex justify-between items-center bg-gray-50 p-2 rounded">
                <span className="text-gray-500">حالة بوابة سرفر التليجرام/الواتساب</span>
                <span className="text-emerald-600 font-bold">متصل (أونلاين)</span>
              </div>
              <div className="flex justify-between items-center bg-gray-50 p-2 rounded">
                <span className="text-gray-500">منفذ بث الإيميل (SMTP)</span>
                <span className="text-emerald-600 font-bold">آمن ومتصل</span>
              </div>
              <div className="flex justify-between items-center bg-gray-50 p-2 rounded">
                <span className="text-gray-500">معدل نجاح تسليم الرسائل</span>
                <span className="text-indigo-950 font-bold">٩٩.٧%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add Automation rule modal */}
      {isAddRuleOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 transition-all">
          <div className="bg-white border border-gray-200 rounded-lg w-full max-w-lg overflow-hidden shadow-2xl">
            <div className="bg-slate-50 px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <h3 className="font-bold text-indigo-900 text-sm flex items-center gap-2">
                <Bot className="w-5 h-5 text-[#1a237e]" />
                بناء قاعدة إطلاق أوتوماتيكي ذكي 
              </h3>
              <button 
                onClick={() => setIsAddRuleOpen(false)} 
                className="p-1 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateRule} className="p-6 space-y-4 text-right">
              <div>
                <label className="text-[11px] font-bold text-gray-600 block mb-1.5">اسم تعريف هذه القاعدة (مثال: رسالة ترحيب واتساب) *</label>
                <input 
                  type="text" 
                  required
                  placeholder="صياغة الاسم المعرف لمساعدتك على مراقبتها"
                  value={ruleTitle}
                  onChange={e => setRuleTitle(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded px-3 py-2 text-xs text-gray-900 focus:outline-none focus:border-[#1a237e]"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] font-bold text-gray-600 block mb-1.5">الحدث المشغّل (Trigger Event) *</label>
                  <select 
                    value={ruleTrigger}
                    onChange={e => setRuleTrigger(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded px-2.5 py-2 text-xs text-gray-850 focus:outline-none focus:border-[#1a237e] text-right"
                  >
                    <option value="عند تسجيل العميل">عند تسجيل عميل محتمل في السي آر إم</option>
                    <option value="عند حجز الاستشارة">عند حجز جلسة استشارية جديدة</option>
                    <option value="عند سداد فاتورة">عند تحصيل سداد فاتورة مالية</option>
                    <option value="عند تقدم الطالب في الكورس">عند رفع معدل تقدم الطالب في الأكاديمية</option>
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-gray-600 block mb-1.5">قناة البث (Dispatch Channel) *</label>
                  <select 
                    value={ruleChannel}
                    onChange={e => setRuleChannel(e.target.value as any)}
                    className="w-full bg-gray-50 border border-gray-200 rounded px-2.5 py-2 text-xs text-gray-850 focus:outline-none focus:border-[#1a237e] text-right"
                  >
                    <option value="WhatsApp">بث واتساب فوري (WhatsApp API)</option>
                    <option value="Email">بث بريد إلكتروني (HTML Template)</option>
                    <option value="Both">بث واتساب + إيميل في آن واحد</option>
                  </select>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-[11px] font-bold text-gray-600 block">صيغة الرسالة وقوالب الماكرو المستهدفة *</label>
                  <span className="text-[9.5px] text-indigo-500 font-mono">
                    متاح الماكرو: {"{{clientName}}"}, {"{{clientId}}"}, {"{{service}}"}, {"{{amount}}"}, {"{{date}}"}, {"{{time}}"}
                  </span>
                </div>
                <textarea 
                  required
                  placeholder="اكتب رسالتك الذكية هنا..."
                  value={ruleTemplate}
                  onChange={e => setRuleTemplate(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded px-3 py-2 text-xs text-gray-900 focus:outline-none focus:border-[#1a237e] h-28 text-right font-sans"
                />
              </div>

              <div className="pt-4 border-t border-gray-200 flex gap-2">
                <button 
                  type="submit"
                  className="bg-[#1a237e] text-white font-bold text-xs px-4 py-2.5 rounded transition-all cursor-pointer flex-1"
                >
                  بناء وحفظ ومزامنة القاعدة فوراً
                </button>
                <button 
                  type="button" 
                  onClick={() => setIsAddRuleOpen(false)}
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
