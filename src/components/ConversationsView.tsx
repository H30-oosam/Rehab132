/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { 
  Send, 
  MessageSquare, 
  Search, 
  CheckCheck, 
  User, 
  Sparkles, 
  FileText, 
  MapPin, 
  PhoneCall,
  Clock
} from "lucide-react";
import React, { useState, useRef, useEffect } from "react";
import { Client, Message } from "../types";

interface ConversationsProps {
  clients: Client[];
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
}

export default function ConversationsView({ clients, messages, setMessages }: ConversationsProps) {
  // Select first client with messages as default or first client from list
  const clientMap = new Map(clients.map(c => [c.id, c]));
  const defaultClientId = clients.length > 0 ? clients[0].id : "";
  const [selectedClientId, setSelectedClientId] = useState<string>(defaultClientId);
  const [chatInput, setChatInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  // Filter clients to show only those who have chats or show all clients as startable conversations
  const [searchTerm, setSearchTerm] = useState("");

  const selectedClient = clientMap.get(selectedClientId);

  // Group latest messages for the sidebar preview
  const getLatestMessageForClient = (clientId: string) => {
    const clientMsgs = messages.filter(m => m.clientId === clientId);
    if (clientMsgs.length === 0) return { text: "لا توجد رسائل سابقة", timestamp: "", isRead: true };
    return clientMsgs[clientMsgs.length - 1];
  };

  // Filter conversations in sidebar
  const filteredClients = clients.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.phone.includes(searchTerm)
  );

  // Active chat's message list
  const activeMessages = messages.filter(m => m.clientId === selectedClientId);

  // Auto-scroll on new message
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, selectedClientId, isTyping]);

  const handleSendMessage = (textToSend: string) => {
    if (!textToSend.trim() || !selectedClientId) return;

    const userMessage: Message = {
      id: "msg_" + Date.now(),
      clientId: selectedClientId,
      sender: "user",
      text: textToSend,
      timestamp: new Date().toLocaleTimeString("ar-EG", { hour: 'numeric', minute: '2-digit' }),
      isRead: true
    };

    setMessages(prev => [...prev, userMessage]);
    setChatInput("");

    // Simulate reactive Client automatic back-and-forth chat conversation!
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      
      let clientReplyText = "شكراً لاهتمامك الموقر. تم استلام رسالتك، وسأقوم بدراسة التفاصيل والتواصل معك قريباً جداً.";
      
      // Customize reply based on sent keywords
      const upperText = textToSend.toLowerCase();
      if (upperText.includes("سعر") || upperText.includes("باقة") || upperText.includes("تكلفة")) {
        clientReplyText = "رائع جداً، هل يمكنكم إرسال تفاصيل الأسعار والعقد لنقوم بالتوقيع والبدء فوراً؟";
      } else if (upperText.includes("لقاء") || upperText.includes("موعد") || upperText.includes("فرع")) {
        clientReplyText = "يناسبني جداً اللقاء في فرعكم الموقر يوم الإثنين القادم. أرجو تأكيد الساعة.";
      } else if (upperText.includes("خصم") || upperText.includes("تخفيض")) {
        clientReplyText = "ممتاز، بانتظار العرض الخاص لحملة يونيو، وسنتفق عليها فوراً.";
      }

      const clientReply: Message = {
        id: "msg_" + (Date.now() + 1),
        clientId: selectedClientId,
        sender: "client",
        text: clientReplyText,
        timestamp: new Date().toLocaleTimeString("ar-EG", { hour: 'numeric', minute: '2-digit' }),
        isRead: false
      };

      setMessages(prev => [...prev, clientReply]);
    }, 1850);
  };

  const handleQuickTemplate = (templateText: string) => {
    handleSendMessage(templateText);
  };

  // Quick answers definitions
  const quickTemplates = [
    { label: "باقات السوشيال ميديا", text: "أهلاً بك يا فندم. يسعدنا تقديم باقات رحاب التسويقية للسوشيال ميديا: باقة (بداية) بقيمة 6,000 ج.م، باقة (الأعمال) بـ 12,000 ج.م، وباقة (بريميوم المتكاملة) بـ 25,000 ج.م شهرياً. أيها تفضل لأعمالك؟" },
    { label: "طلب موعد لقاء", text: "يسعدنا جداً استضافتكم في المقر الإداري لشركة رحاب لشرح خطة التسويق المتكاملة لشركة سيادتكم. ما هو الموعد المناسب لسيادتكم؟" },
    { label: "شكر وتأكيد الدفع", text: "عزيزي العميل، نود إبلاغكم بأنه تم استلام الدفعة المخصصة لحسابكم بنجاح ومباشرة عمل باقة التصميمات فوراً. شكراً لثقتكم بنا." },
    { label: "طلب بيانات الحملة", text: "من فضلك أرسل لنا الهوية البصرية الحالية لشركتك، بالإضافة إلى روابط حساباتكم الحالية لنبدأ مراجعة شاملة للحساب." }
  ];

  return (
    <div id="chats-view-container" className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-10rem)] min-h-[520px]">
      
      {/* Sidebar - Contacts Search & Selection List */}
      <div className="bg-white rounded-lg border border-gray-250 flex flex-col overflow-hidden h-full shadow-sm">
        {/* Search Header */}
        <div className="p-4 border-b border-gray-200 bg-gray-50/85">
          <div className="relative">
            <Search className="w-4 h-4 text-gray-400 absolute right-3 top-3" />
            <input 
              type="text" 
              placeholder="ابحث عن عميل أو رقم هاتف..." 
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full bg-white border border-gray-200 rounded pr-9 pl-3 py-2 text-xs text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#1a237e] transition-all text-right"
            />
          </div>
        </div>

        {/* List of Contacts */}
        <div className="flex-1 overflow-y-auto divide-y divide-gray-100">
          {filteredClients.length === 0 ? (
            <div className="text-center py-12 text-gray-400 text-xs font-medium">
              لا توجد نتائج بحث مطابقة.
            </div>
          ) : (
            filteredClients.map(client => {
              const latestMsg = getLatestMessageForClient(client.id);
              const isSelected = selectedClientId === client.id;
              return (
                <button
                  id={`chat-user-item-${client.id}`}
                  key={client.id}
                  onClick={() => setSelectedClientId(client.id)}
                  className={`w-full p-3.5 flex items-start gap-3 transition-colors text-right relative overflow-hidden ${
                    isSelected 
                      ? "bg-indigo-50/70 border-r-4 border-[#1a237e]" 
                      : "hover:bg-gray-50/70"
                  }`}
                >
                  {/* Avatar */}
                  <div className="w-10 h-10 rounded bg-gray-100 border border-gray-200 flex items-center justify-center shrink-0 text-gray-600 font-bold font-sans text-xs">
                    {client.name.substring(0, 2)}
                  </div>

                  {/* Info Column */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1 mb-1">
                      <span className="font-sans font-bold text-xs text-gray-900 truncate block">
                        {client.name}
                      </span>
                      <span className="text-[10px] text-gray-400 font-mono shrink-0">
                        {latestMsg.timestamp || "سابقاً"}
                      </span>
                    </div>

                    <p className={`text-[11px] truncate ${latestMsg.isRead === false ? "text-indigo-650 font-bold" : "text-gray-500"}`}>
                      {latestMsg.text}
                    </p>

                    <div className="flex items-center justify-between mt-1.5">
                      <span className="text-[10px] text-gray-400 truncate font-semibold">
                        {client.city}
                      </span>
                      {latestMsg.isRead === false && (
                        <span className="w-2 h-2 rounded-full bg-[#1a237e] ring-4 ring-indigo-100"></span>
                      )}
                    </div>
                  </div>
                </button>
              );
            })
          )}
        </div>
      </div>

      {/* Main Chat Conversation Board */}
      <div className="bg-white rounded-lg border border-gray-250 flex flex-col justify-between overflow-hidden h-full lg:col-span-2 shadow-sm">
        {selectedClient ? (
          <>
            {/* Active Contact Header */}
            <div className="p-4 border-b border-gray-200 bg-gray-50/85 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded bg-[#1a237e]/10 border border-[#1a237e]/20 flex items-center justify-center text-[#1a237e] shrink-0 font-sans font-bold text-sm">
                  {selectedClient.name.substring(0, 2)}
                </div>
                <div>
                  <h3 className="font-bold text-sm text-gray-900">{selectedClient.name}</h3>
                  <div className="flex items-center gap-2 text-[10px] text-gray-500 mt-0.5">
                    <span className="flex items-center gap-1 font-semibold">
                      <PhoneCall className="w-3 h-3 text-gray-450" />
                      {selectedClient.phone}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1 font-semibold">
                      <MapPin className="w-3 h-3 text-gray-455" />
                      {selectedClient.city}
                    </span>
                  </div>
                </div>
              </div>

              {/* Status Pill */}
              <div className="bg-indigo-50 border border-indigo-200 px-3 py-1 rounded text-[10px] text-[#1a237e] flex items-center gap-1.5 font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-[#1a237e] animate-pulse"></span>
                {selectedClient.stage}
              </div>
            </div>

            {/* Chat Body Scrollpane */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/30">
              {activeMessages.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-gray-400 space-y-2">
                  <MessageSquare className="w-8 h-8 text-gray-300" />
                  <p className="text-xs">ابدأ إرسال باقة أو رسالة لهذا العميل لفتح المحادثة.</p>
                </div>
              ) : (
                activeMessages.map((msg) => {
                  const isMe = msg.sender === "user";
                  return (
                    <div 
                      key={msg.id} 
                      className={`flex ${isMe ? "justify-start" : "justify-end"}`}
                    >
                      <div className={`max-w-[80%] rounded p-3 text-xs text-right leading-relaxed shadow-sm ${
                        isMe 
                          ? "bg-[#1a237e] text-white rounded-br-none" 
                          : "bg-gray-100 text-gray-800 rounded-bl-none border border-gray-200"
                      }`}>
                        <p>{msg.text}</p>
                        <div className={`flex items-center gap-1 justify-end text-[9px] mt-2 ${isMe ? "text-indigo-250" : "text-gray-400"}`}>
                          <Clock className="w-2.5 h-2.5 opacity-60" />
                          <span>{msg.timestamp}</span>
                          {isMe && <CheckCheck className="w-3 h-3 opacity-80" />}
                        </div>
                      </div>
                    </div>
                  );
                })
              )}

              {/* Typing simulation block */}
              {isTyping && (
                <div className="flex justify-end">
                  <div className="bg-gray-100 border border-gray-250 rounded rounded-bl-none p-3 flex items-center gap-2">
                    <span className="text-[10px] text-gray-500 block font-bold">يكتب رسالة الآن</span>
                    <div className="flex gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#1a237e] animate-bounce" style={{ animationDelay: "0ms" }}></span>
                      <span className="w-1.5 h-1.5 rounded-full bg-[#1a237e] animate-bounce" style={{ animationDelay: "150ms" }}></span>
                      <span className="w-1.5 h-1.5 rounded-full bg-[#1a237e] animate-bounce" style={{ animationDelay: "300ms" }}></span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Quick response Templates Bar */}
            <div className="px-4 py-2 bg-gray-50 border-t border-gray-200 flex items-center gap-2 overflow-x-auto select-none">
              <span className="text-[10px] font-bold text-[#1a237e] shrink-0 flex items-center gap-0.5">
                <Sparkles className="w-3.5 h-3.5" />
                ردود سريعة ذكية:
              </span>
              <div className="flex gap-1.5 pb-1">
                {quickTemplates.map((tpl, i) => (
                  <button
                    key={i}
                    onClick={() => handleQuickTemplate(tpl.text)}
                    className="text-[10px] bg-white hover:bg-gray-100 text-gray-700 font-semibold px-2.5 py-1 rounded border border-gray-200 transition-all cursor-pointer truncate max-w-44 shrink-0 shadow-sm"
                  >
                    {tpl.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Message Input Form */}
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage(chatInput);
              }}
              className="p-3 bg-gray-50 border-t border-gray-200 flex gap-2"
            >
              <input 
                type="text" 
                placeholder="اكتب ردك هنا لشركة رحاب للتسويق..."
                value={chatInput}
                onChange={e => setChatInput(e.target.value)}
                className="flex-1 bg-white border border-gray-200 text-xs px-3.5 py-2.5 rounded text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#1a237e] transition-all text-right"
              />
              <button 
                id="send-message-action-btn"
                type="submit" 
                disabled={!chatInput.trim()}
                className="bg-[#1a237e] hover:bg-indigo-900 disabled:bg-gray-250 disabled:text-gray-400 text-white rounded px-4 py-2.5 transition-all text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-sm"
              >
                <span>إرسال</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-gray-400 space-y-3">
            <MessageSquare className="w-12 h-12 text-gray-300" />
            <p className="text-sm font-semibold">لم تقم بتحديد أي عميل للدردشة بعد من القائمة اليمنى.</p>
          </div>
        )}
      </div>
    </div>
  );
}
