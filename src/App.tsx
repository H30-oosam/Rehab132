/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import Sidebar from "./components/Sidebar";
import DashboardView from "./components/DashboardView";
import ContactsView from "./components/ContactsView";
import ConversationsView from "./components/ConversationsView";
import CampaignsView from "./components/CampaignsView";
import PaymentsView from "./components/PaymentsView";
import SettingsView from "./components/SettingsView";

// Import the new views for Academy, Automations, Funnel, and Booking
import AcademyView from "./components/AcademyView";
import AutomationsView from "./components/AutomationsView";
import CheckoutFunnelView from "./components/CheckoutFunnelView";
import ConsultationsView from "./components/ConsultationsView";

import { 
  initialClients, 
  initialMessages, 
  initialTasks, 
  initialCampaigns, 
  initialPayments,
  initialCourses,
  initialStudents,
  initialAutoRules,
  initialAutoLogs,
  initialCheckoutPages,
  initialConsultations
} from "./data/mockData";
import { 
  Client, 
  Message, 
  Task, 
  Campaign, 
  Payment,
  Course,
  StudentEnrollment,
  AutoRule,
  AutoLog,
  CheckoutPage,
  ConsultationBooking
} from "./types";

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>("dashboard");
  const [companyName, setCompanyName] = useState<string>("شركة رحاب للتسويق");
  
  // Core Application Data states
  const [clients, setClients] = useState<Client[]>(initialClients);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [campaigns, setCampaigns] = useState<Campaign[]>(initialCampaigns);
  const [payments, setPayments] = useState<Payment[]>(initialPayments);

  // New Application Data states for the expanded suite
  const [courses, setCourses] = useState<Course[]>(initialCourses);
  const [students, setStudents] = useState<StudentEnrollment[]>(initialStudents);
  const [autoRules, setAutoRules] = useState<AutoRule[]>(initialAutoRules);
  const [autoLogs, setAutoLogs] = useState<AutoLog[]>(initialAutoLogs);
  const [checkoutPages, setCheckoutPages] = useState<CheckoutPage[]>(initialCheckoutPages);
  const [consultations, setConsultations] = useState<ConsultationBooking[]>(initialConsultations);

  // Modal Control triggered from dashboard to contacts
  const [isAddClientOpen, setIsAddClientOpen] = useState(false);

  // Simulated WhatsApp & Email automatic notification scheduler dispatcher
  const triggerNotificationSim = (recipientName: string, eventType: string, eventTitle: string) => {
    const matchedRule = autoRules.find(r => r.triggerEvent === eventType && r.active);
    if (!matchedRule) return;

    let text = matchedRule.messageTemplate
      .replace(/\{\{clientName\}\}/g, recipientName)
      .replace(/\{\{clientId\}\}/g, "C-" + Math.floor(Math.random() * 900 + 100))
      .replace(/\{\{courseTitle\}\}/g, eventTitle)
      .replace(/\{\{service\}\}/g, eventTitle)
      .replace(/\{\{amount\}\}/g, "3,500")
      .replace(/\{\{date\}\}/g, new Date().toISOString().split('T')[0])
      .replace(/\{\{time\}\}/g, "12:00 م");

    const channels: Array<"WhatsApp" | "Email"> = [];
    if (matchedRule.channel === "WhatsApp" || matchedRule.channel === "Both") channels.push("WhatsApp");
    if (matchedRule.channel === "Email" || matchedRule.channel === "Both") channels.push("Email");

    const newLogs: AutoLog[] = channels.map((ch, idx) => ({
      id: "lg_sim_" + Date.now() + "_" + idx,
      ruleTitle: matchedRule.title,
      recipientName,
      recipientContact: ch === "WhatsApp" ? "01012345678" : "client@mail.eg",
      channel: ch,
      sentAt: new Date().toISOString().replace("T", " ").substring(0, 19),
      status: "تم الإرسال",
      previewText: text.substring(0, 110) + (text.length > 110 ? "..." : "")
    }));

    setAutoLogs(prev => [...newLogs, ...prev]);
  };

  // Simulated payment logging hook from Checkouts
  const handleSimulateNewPayment = (clientName: string, amount: number, service: string) => {
    const newPayment: Payment = {
      id: "p_" + Date.now(),
      clientName,
      amount,
      date: new Date().toISOString().split('T')[0],
      status: "مدفوع",
      service
    };
    setPayments(prev => [newPayment, ...prev]);

    // Fast-trigger automatic notification for payment receipt template
    triggerNotificationSim(clientName.split(" ")[0], "عند سداد فاتورة", service);
  };


  // Calculates unread chats count beautifully
  const unreadCount = messages ? messages.filter(m => m.sender === "client" && !m.isRead).length : 0;

  // Render view depending on active currentTab state
  const renderActiveView = () => {
    switch (currentTab) {
      case "dashboard":
        return (
          <DashboardView 
            clients={clients}
            tasks={tasks}
            setTasks={setTasks}
            onNavigateToTab={(tabId) => setCurrentTab(tabId)}
            openAddClientForm={() => {
              setCurrentTab("contacts");
              setIsAddClientOpen(true);
            }}
          />
        );
      case "contacts":
        return (
          <ContactsView 
            clients={clients}
            setClients={setClients}
            isAddFormOpen={isAddClientOpen}
            setIsAddFormOpen={setIsAddClientOpen}
          />
        );
      case "conversations":
        return (
          <ConversationsView 
            clients={clients}
            messages={messages}
            setMessages={setMessages}
          />
        );
      case "academy":
        return (
          <AcademyView 
            courses={courses}
            setCourses={setCourses}
            students={students}
            setStudents={setStudents}
            triggerNotificationSim={triggerNotificationSim}
          />
        );
      case "automations":
        return (
          <AutomationsView 
            rules={autoRules}
            setRules={setAutoRules}
            logs={autoLogs}
            setLogs={setAutoLogs}
            clientsListForMock={clients}
          />
        );
      case "checkout_funnel":
        return (
          <CheckoutFunnelView 
            funnels={checkoutPages}
            setFunnels={setCheckoutPages}
            onSimulateNewPayment={handleSimulateNewPayment}
          />
        );
      case "consult_booking":
        return (
          <ConsultationsView 
            consultations={consultations}
            setConsultations={setConsultations}
            triggerNotificationSim={triggerNotificationSim}
          />
        );
      case "campaigns":
        return (
          <CampaignsView 
            campaigns={campaigns}
            setCampaigns={setCampaigns}
          />
        );
      case "payments":
        return (
          <PaymentsView 
            payments={payments}
            setPayments={setPayments}
          />
        );
      case "settings":
        return (
          <SettingsView 
            companyName={companyName}
            setCompanyName={setCompanyName}
            clientsCount={clients.length}
            campaignsCount={campaigns.length}
          />
        );
      default:
        return (
          <div className="text-center py-20 text-slate-400 text-sm">
            نعتذر، لم يتم العثور على الصفحة المطلوبة.
          </div>
        );
    }
  };

  return (
    <div 
      id="rehab-crm-root" 
      dir="rtl" 
      className="min-h-screen bg-[#f0f2f5] text-gray-900 flex flex-col lg:flex-row antialiased font-sans"
    >
      {/* Navigation bar Sidebar */}
      <Sidebar 
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        unreadCount={unreadCount}
        companyName={companyName}
      />

      {/* Main Mainframe Content panel container */}
      <main className="flex-1 overflow-x-hidden focus:outline-none flex flex-col">
        
        {/* Top Navbar Header inside the dashboard screen */}
        <header className="hidden lg:flex items-center justify-between border-b border-gray-200 bg-white px-8 py-4.5 select-none sticky top-0 z-10 shadow-sm">
          <div className="flex items-center gap-3">
            <h2 className="text-indigo-950 font-bold text-sm tracking-wide font-sans">
              لوحة التحكم الذكية والمحاسبة بالجنيه المصري
            </h2>
            <span className="bg-green-100 text-green-700 text-[10px] font-bold px-3 py-1 rounded-full">
              بوابة المسؤولين
            </span>
          </div>

          <div className="flex items-center gap-6 text-xs text-gray-500">
            <span>التوقيت: <strong className="text-indigo-900 font-mono">20:20:00</strong></span>
            <span>•</span>
            <span>الفرع: <strong className="text-indigo-950 font-sans">القاهرة الجديدة - التجمع</strong></span>
          </div>
        </header>

        {/* View Frame */}
        <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6 flex-1 w-full">
          {renderActiveView()}
        </div>
      </main>
    </div>
  );
}
