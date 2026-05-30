/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Client, LeadStage, Task, Campaign, Payment, Message } from "../types";

export const initialClients: Client[] = [
  {
    id: "c1",
    name: "أحمد الشناوي - العقارية جروب",
    email: "ahmed.shinawy@elakaria.eg",
    phone: "01012345678",
    stage: LeadStage.Lead,
    value: 75000,
    city: "القاهرة الجديدة",
    source: "إعلانات فيسبوك",
    createdAt: "2026-05-25"
  },
  {
    id: "c2",
    name: "سارة فاروق - بوتيك زهرة",
    email: "sara@zahrafashion.com",
    phone: "01234567890",
    stage: LeadStage.Contacted,
    value: 12000,
    city: "مصر الجديدة",
    source: "توصية صديق",
    createdAt: "2026-05-26"
  },
  {
    id: "c3",
    name: "كريم ممدوح - محلات برجر هاوس",
    email: "karim@burgerhouse.eg",
    phone: "01187654321",
    stage: LeadStage.Proposal,
    value: 35000,
    city: "الدقي - الجيزة",
    source: "البحث العضوي SEO",
    createdAt: "2026-05-27"
  },
  {
    id: "c4",
    name: "منى الجبالي - عيادات دنتال كير",
    email: "info@dentalcare.eg",
    phone: "01511223344",
    stage: LeadStage.Closed,
    value: 48000,
    city: "الشيخ زايد",
    source: "تيك توك",
    createdAt: "2026-05-24"
  },
  {
    id: "c5",
    name: "يوسف غالي - أكاديمية اللغات",
    email: "youssef@languageacademy.edu.eg",
    phone: "01099887766",
    stage: LeadStage.Closed,
    value: 29000,
    city: "الإسكندرية",
    source: "إعلانات جوجل",
    createdAt: "2026-05-20"
  },
  {
    id: "c6",
    name: "نادين علام - مصنع الأثاث الراقي",
    email: "nadine@raqi-furniture.com",
    phone: "01288776655",
    stage: LeadStage.Lead,
    value: 120000,
    city: "دمياط / القاهرة",
    source: "إنستغرام",
    createdAt: "2026-05-28"
  },
  {
    id: "c7",
    name: "محمد عبد الهادي - سوبر ماركت الهدى",
    email: "m.abdelhady@elhoda.com",
    phone: "01144556677",
    stage: LeadStage.Contacted,
    value: 15000,
    city: "المنصورة",
    source: "إعلانات فيسبوك",
    createdAt: "2026-05-29"
  }
];

export const initialMessages: Message[] = [
  {
    id: "m1",
    clientId: "c1",
    sender: "client",
    text: "مرحباً شركة رحاب، كنت أستفسر عن أسعار باقات إدارة صفحات السوشيال ميديا العقارية لشهر يونيو؟",
    timestamp: "10:30 ص",
    isRead: false
  },
  {
    id: "m2",
    clientId: "c1",
    sender: "user",
    text: "أهلاً بك أستاذ أحمد. لدينا عروض خاصة للتسويق العقاري تشمل وتتضمن تصوير احترافي وإعلانات ممولة مستهدفة. سأقوم بإرسال البروشور كاملاً لك الآن.",
    timestamp: "10:35 ص",
    isRead: true
  },
  {
    id: "m3",
    clientId: "c1",
    sender: "client",
    text: "ممتاز جداً، يرجى إرساله وتوضيح ميزانية الإعلانات المقترحة لمدينة القاهرة الجديدة والتجمع الخامس.",
    timestamp: "10:42 ص",
    isRead: false
  },
  {
    id: "m4",
    clientId: "c2",
    sender: "client",
    text: "هل تشمل الباقة تصاميم فوتوشوب وريلز شهرياً؟",
    timestamp: "أمس",
    isRead: true
  },
  {
    id: "m5",
    clientId: "c2",
    sender: "user",
    text: "نعم يا فندم، باقة زهرة الفضية تشمل 12 تصميم و 4 مقاطع ريلز مع كتابة محتوى بالكامل وتعديل الصور وإدارة كاملة للحساب.",
    timestamp: "أمس",
    isRead: true
  },
  {
    id: "m6",
    clientId: "c3",
    sender: "client",
    text: "تم الاطلاع على مسودة العقد التسويقي وبانتظار تحديد موعد للزيارة وتوقيع العقد في فرع الدقي.",
    timestamp: "28 مايو",
    isRead: true
  }
];

export const initialTasks: Task[] = [
  {
    id: "t1",
    title: "متابعة العقد مع أحمد الشناوي",
    dueDate: "2026-06-01",
    completed: false,
    priority: "high"
  },
  {
    id: "t2",
    title: "إعداد التقرير الشهري لعيادات دنتال كير",
    dueDate: "2026-05-31",
    completed: true,
    priority: "medium"
  },
  {
    id: "t3",
    title: "إرسال المقترح المالي لمحلات برجر هاوس",
    dueDate: "2026-05-29",
    completed: true,
    priority: "high"
  },
  {
    id: "t4",
    title: "مكالمة استكشافية مع مصنع الأثاث الراقي",
    dueDate: "2026-06-03",
    completed: false,
    priority: "medium"
  },
  {
    id: "t5",
    title: "تصميم روت ماب الحملة لـ بوتيك زهرة",
    dueDate: "2026-06-02",
    completed: false,
    priority: "low"
  }
];

export const initialCampaigns: Campaign[] = [
  {
    id: "ca1",
    name: "حملة التسويق العقاري - صيف 2026",
    channel: "فيسبوك وانستجرام",
    status: "نشط",
    budget: 50000,
    spent: 23500,
    leadsCount: 142,
    conversionRate: 15.4
  },
  {
    id: "ca2",
    name: "مهرجان الفاشون - بوتيك زهرة",
    channel: "تيك توك وإنستجرام",
    status: "نشط",
    budget: 15000,
    spent: 9800,
    leadsCount: 88,
    conversionRate: 22.1
  },
  {
    id: "ca3",
    name: "إعلانات جوجل سيرش - عيادات الأسنان",
    channel: "جوجل سيرش",
    status: "نشط",
    budget: 25000,
    spent: 18000,
    leadsCount: 64,
    conversionRate: 18.7
  },
  {
    id: "ca4",
    name: "حملة العيد لأكاديمية اللغات",
    channel: "سوشيال ميديا متكاملة",
    status: "مكتمل",
    budget: 30000,
    spent: 30000,
    leadsCount: 110,
    conversionRate: 25.0
  }
];

export const initialPayments: Payment[] = [
  {
    id: "p1",
    clientName: "منى الجبالي - عيادات دنتال كير",
    amount: 15000,
    date: "2026-05-22",
    status: "مدفوع",
    service: "إيجار تمويلي وإدارة حملة جوجل الشهرية"
  },
  {
    id: "p2",
    clientName: "يوسف غالي - أكاديمية اللغات",
    amount: 14500,
    date: "2026-05-24",
    status: "مدفوع",
    service: "إعداد خطة التسويق المتكاملة وتدريب الفريق"
  },
  {
    id: "p3",
    clientName: "سارة فاروق - بوتيك زهرة",
    amount: 6000,
    date: "2026-05-28",
    status: "معلق",
    service: "مقدم باقة السوشيال ميديا الفضية"
  },
  {
    id: "p4",
    clientName: "كريم ممدوح - محلات برجر هاوس",
    amount: 17500,
    date: "2026-05-25",
    status: "مدفوع",
    service: "تطوير موقع الويب التعريفي وجدولة المنيو"
  },
  {
    id: "p5",
    clientName: "أحمد الشناوي - العقارية جروب",
    amount: 37500,
    date: "2026-05-20",
    status: "متأخر",
    service: "تأسيس الهوية البصرية وإطلاق حملة العقارات"
  }
];
