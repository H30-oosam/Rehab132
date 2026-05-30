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

// === MOCK DATA FOR THE NEW OUTSTANDING MARKETING & LEARNING SYSTEM ===

import { Course, StudentEnrollment, AutoRule, AutoLog, CheckoutPage, ConsultationBooking } from "../types";

export const initialCourses: Course[] = [
  {
    id: "co_1",
    title: "الماستر كلاس المتكامل في التسويق العقاري الرقمي بمصر",
    description: "الباقة الاحترافية الشاملة لتعليم مهارات استهداف عملاء التجمع التجمع الخامس والشيخ زايد والساحل الشمالي وصناعة الإعلانات الأكثر ربحاً.",
    duration: "45 ساعة تدريبية",
    lessonsCount: 38,
    price: 3500,
    category: "تسويق عقاري",
    status: "نشط",
    studentsEnrolled: 84
  },
  {
    id: "co_2",
    title: "فنون صناعة الريلز الفيروسية وإدارة حسابات السوشيال ميديا",
    description: "الباقة المطلقة لاحتراف خوارزميات تيك توك وإنستجرام وتصوير المنتجات وكتابة الاسكربتات الإقناعية للمشاريع الناشئة.",
    duration: "24 ساعة تدريبية",
    lessonsCount: 22,
    price: 1800,
    category: "سوشيال ميديا",
    status: "نشط",
    studentsEnrolled: 156
  },
  {
    id: "co_3",
    title: "استراتيجية الإعلانات الممولة المتقدمة على ميتا (Meta Ads Champion)",
    description: "كيف تطلق حملة تسويقية ناجحة بميزانية محدودة على فيسبوك وتتجنب حظر الحسابات الإعلانية وتحقق عائد استثماري خيالي.",
    duration: "18 ساعة تدريبية",
    lessonsCount: 15,
    price: 2200,
    category: "سوشيال ميديا",
    status: "نشط",
    studentsEnrolled: 92
  },
  {
    id: "co_4",
    title: "أسرار سيلز وعقود كبار العملاء وإغلاق الصفقات التسويقية",
    description: "تكتيكات الإقناع الهاتفي، وكيف تسعّر خدماتك كفريلانسر أو كشركة تسويق وتصيغ العروض المالية الجذابة متخطياً اعتراضات العملاء.",
    duration: "12 ساعة تدريبية",
    lessonsCount: 10,
    price: 2500,
    category: "سيلز ومبيعات",
    status: "مسودة",
    studentsEnrolled: 0
  }
];

export const initialStudents: StudentEnrollment[] = [
  {
    id: "st_1",
    studentName: "ممدوح الشافعي - عقارات القاهرة",
    studentPhone: "01034567891",
    studentEmail: "mamdouh.realestate@gmail.com",
    courseId: "co_1",
    courseTitle: "الماستر كلاس المتكامل في التسويق العقاري الرقمي بمصر",
    progress: 75,
    joinDate: "2026-05-10",
    lastActive: "2026-05-30",
    status: "نشط"
  },
  {
    id: "st_2",
    studentName: "أمل عرفة - براند عباية نوبل",
    studentPhone: "01234994821",
    studentEmail: "amal.boutique@outlook.com",
    courseId: "co_2",
    courseTitle: "فنون صناعة الريلز الفيروسية وإدارة حسابات السوشيال ميديا",
    progress: 100,
    joinDate: "2026-05-02",
    lastActive: "2026-05-28",
    status: "مكتمل"
  },
  {
    id: "st_3",
    studentName: "خالد مرسي - كافيه سبيس",
    studentPhone: "01123445566",
    studentEmail: "khaled_morsi@outlook.com",
    courseId: "co_3",
    courseTitle: "استراتيجية الإعلانات الممولة المتقدمة على ميتا (Meta Ads Champion)",
    progress: 25,
    joinDate: "2026-05-24",
    lastActive: "2026-05-30",
    status: "نشط"
  },
  {
    id: "st_4",
    studentName: "نهال صبري - مسؤولة محتوى عقاري",
    studentPhone: "01548819283",
    studentEmail: "nihal_sabry@gmail.com",
    courseId: "co_1",
    courseTitle: "الماستر كلاس المتكامل في التسويق العقاري الرقمي بمصر",
    progress: 10,
    joinDate: "2026-05-29",
    lastActive: "2026-05-29",
    status: "نشط"
  },
  {
    id: "st_5",
    studentName: "سامح الدقاق - تاجر ملابس",
    studentPhone: "01088772211",
    studentEmail: "sameh_fashion@yahoo.com",
    courseId: "co_2",
    courseTitle: "فنون صناعة الريلز الفيروسية وإدارة حسابات السوشيال ميديا",
    progress: 60,
    joinDate: "2026-05-15",
    lastActive: "2026-05-25",
    status: "نشط"
  },
  {
    id: "st_6",
    studentName: "رامي جلال - مستشار مالي",
    studentPhone: "01288339944",
    studentEmail: "rami.galal@consult.eg",
    courseId: "co_3",
    courseTitle: "استراتيجية الإعلانات الممولة المتقدمة على ميتا (Meta Ads Champion)",
    progress: 95,
    joinDate: "2026-05-01",
    lastActive: "2026-05-18",
    status: "متوقف"
  }
];

export const initialAutoRules: AutoRule[] = [
  {
    id: "ar_1",
    title: "رسالة ترحيبية فورية بالشركاء على واتساب وتأكيد العهدة",
    triggerEvent: "عند تسجيل العميل",
    channel: "WhatsApp",
    messageTemplate: "أهلاً بك يا فندم في عائلة شركاء نجاح شركة رحاب للتسويق المتميزة 🌸. تم تسجيل بياناتكم الموقرة بنجاح برقم العهدة {{clientId}}، وسيتواصل معكم الأستاذ هاني صبري في غضون ساعة لتأكيد خطة يونيو التسويقية المخصصة لمؤسستكم العريقة. يسعدنا جداً البدء معكم!",
    active: true
  },
  {
    id: "ar_2",
    title: "تأكيد فوري لحجز جلسات الاستشارات الاستراتيجية مع المدير العام",
    triggerEvent: "عند حجز الاستشارة",
    channel: "Both",
    messageTemplate: "نهنئكم بحجز جلستكم الاستشارية الخاصة والمطولة مع المدير العام لشركة رحاب للتسويق الرقمي 💡.\nموعدكم المقرر: يوم {{date}} في تمام الساعة {{time}} بتوقيت القاهرة.\nسيتم تزويدكم برابط قاعة الاجتماعات Zoom فوراً قبل اللقاء بـ ٣٠ دقيقة. نتطلع لخدمتكم وإعداد خارطة طريق ملهمة لمشروعكم.",
    active: true
  },
  {
    id: "ar_3",
    title: "سعادة العميل: إشعار فوري باستلام السداد وتحصيل الفاتورة",
    triggerEvent: "عند سداد فاتورة",
    channel: "Email",
    messageTemplate: "عزيزنا العميل الموقر {{clientName}}، تم تأكيد واستلام دفعتكم المالية بنجاح بقيمة {{amount}} ج.م والمخصصة لخدمة [{{service}}].\nلقد قمنا بإصدار الفاتورة الرسمية #INV-{{id}} ودمجها بحساباتكم.\nشكراً لتعاونكم وثقتكم المستمرة بدعم فريق عمل رحاب للتسويق.",
    active: true
  },
  {
    id: "ar_4",
    title: "تهنئة آلية حماسية للطالب عند اجتياز نصف الكورس التدريبي",
    triggerEvent: "عند تقدم الطالب في الكورس",
    channel: "WhatsApp",
    messageTemplate: "يا بطل! 🎉 لقد اجتزت للتو 50% من الكورس التدريبي [{{courseTitle}}]. تهانينا الحارة لالتزامك وسعيك لتكون الأقوى في مبيعات السوشيال ميديا بمصر.\nاستمر في التعلم، فنحن نوفر لك دعماً وتوجيهاً على مدار الساعة حتى حصولك على الشهادة المعتمدة من شركة رحاب للتسويق الرقمي واجتياز التحديات بنجاح!",
    active: true
  }
];

export const initialAutoLogs: AutoLog[] = [
  {
    id: "lg_1",
    ruleTitle: "رسالة ترحيبية فورية بالشركاء على واتساب وتأكيد العهدة",
    recipientName: "أحمد الشناوي",
    recipientContact: "01012345678",
    channel: "WhatsApp",
    sentAt: "2026-05-30 18:42:15",
    status: "تم الإرسال",
    previewText: "أهلاً بك يا فندم في عائلة شركاء نجاح شركة رحاب للتسويق المتميزة 🌸. تم تسجيل بياناتكم الموقرة بنجاح..."
  },
  {
    id: "lg_2",
    ruleTitle: "تأكيد فوري لحجز جلسات الاستشارات الاستراتيجية مع المدير العام",
    recipientName: "سارة فاروق",
    recipientContact: "sara@zahrafashion.com",
    channel: "Email",
    sentAt: "2026-05-30 19:15:30",
    status: "تم الإرسال",
    previewText: "نهنئكم بحجز جلستكم الاستشارية الخاصة والمطولة مع المدير العام لشركة رحاب  يوم 2026-06-03 الساعة 11:30"
  },
  {
    id: "lg_3",
    ruleTitle: "سعادة العميل: إشعار فوري باستلام السداد وتحصيل الفاتورة",
    recipientName: "كريم ممدوح",
    recipientContact: "karim@burgerhouse.eg",
    channel: "Email",
    sentAt: "2026-05-30 14:02:10",
    status: "تم الإرسال",
    previewText: "عزيزنا العميل الموقر كريم ممدوح، تم تأكيد واستلام دفعتكم المالية بنجاح بقيمة 17500 ج.م والمخصصة لخدمة..."
  },
  {
    id: "lg_4",
    ruleTitle: "تهنئة آلية حماسية للطالب عند اجتياز نصف الكورس التدريبي",
    recipientName: "ممدوح الشافعي",
    recipientContact: "01034567891",
    channel: "WhatsApp",
    sentAt: "2026-05-29 21:30:12",
    status: "تم الإرسال",
    previewText: "يا بطل! 🎉 لقد اجتزت للتو 50% من الكورس التدريبي [الماستر كلاس المتكامل في التسويق العقاري]..."
  }
];

export const initialCheckoutPages: CheckoutPage[] = [
  {
    id: "chk_1",
    title: "صفحة التسجيل والاشتراك الفوري في دبلومة التسويق العقاري الاحترافية",
    productName: "دبلومة التسويق العقاري الشاملة لعام 2026",
    price: 3500,
    currency: "ج.م",
    description: "انضم الآن إلى أقوى برنامج تدريبي وتطبيقي بمصر لتعليم مهارات استيراد الداتا الفعالة واستهداف النخبة واغتنام عملاء التجمع التجمع الخامس وزايد من خلال إعلانات احترافية وممتازة.",
    benefits: [
      "دخول مدى الحياة لكافة المحاضرات وفيديوهات التحديث الأسبوعي.",
      "روابط تحميل داتا القاهرة الجديدة والتجمع جاهزة للتصدير.",
      "لقاء أسبوعي زووم مباشر مع المدير العام لشركة رحاب لمعاينة وتعديل وتصحيح حملاتك الإعلانية.",
      "شهادة خبرة معتمدة قابلة للتوقيع وموثقة لتقديمها للشركات."
    ],
    ctaText: "سجل بياناتك الموقرة واشترك الآن بخصم صيف ٢٠٢٦",
    themeColor: "#1a237e",
    customFields: ["اسمك بالكامل", "الهاتف المحمول النشط", "المدينة المفضلة للعمل", "مجالك التخصصي الحالي (سمير/مطور)"],
    couponCode: "SUMMER50",
    discountPrice: 2900
  },
  {
    id: "chk_2",
    title: "باقة النور السنوية - إدارة وسائل التواصل الاجتماعي المتكاملة لمشروعك",
    productName: "اشتراك باقة النور لإدارة صفحات السوشيال ميديا",
    price: 12050,
    currency: "ج.م / شهرياً",
    description: "الباقة الأكثر مبيعاً وتقديراً لدى شركة رحاب للتسويق. تتكفل بكتابة المحتوى وتصميم الهويات وتصوير ٨ ريلز شهرياً مع إدارة متكاملة للحملة الإعلانية لزيادة الطلبات بنسبة كبرى.",
    benefits: [
      "تصميم ١٥ بوستر جرافيك فوتوشوب فاخر واحترافي مناسب للهوية الخاصة بك.",
      "تصوير ومونتاج ٨ مقاطع فيديو ريلز 4K لتسريع النشر الفيروسي.",
      "إدارة متكاملة للحملات الممولة على فيسبوك وانستجرام وتيك توك مع كشوفات الأسبوعية.",
      "مدير حساب مخصص متواجد للرد على اتصالاتكم وتنسيق الخطة والطلبات الفورية."
    ],
    ctaText: "احجز مقعد مشروعك بالباقة السنوية لشركة رحاب للتسويق",
    themeColor: "#4f46e5",
    customFields: ["اسم صاحب المنشأة الموقر", "اسم البراند أو المشروع", "الموقع الجغرافي للمحل/المكتب", "رقم الهاتف والواتساب لتنسيق موعد التصوير"],
    couponCode: "REHABSTAR",
    discountPrice: 11000
  }
];

export const initialConsultations: ConsultationBooking[] = [
  {
    id: "cb_1",
    clientName: "أحمد الشناوي - العقارية جروب",
    clientPhone: "01012345678",
    clientEmail: "ahmed.shinawy@elakaria.eg",
    bookingDate: "2026-06-01",
    bookingTime: "11:30 ص",
    consultType: "جلسة تسويق عقاري مدفوعة",
    status: "مؤكدة",
    notes: "مناقشة إطلاق وتصميم الحملة الصيفية للمشروع الجديد بالتجمع الخامس واستهداف الخليج."
  },
  {
    id: "cb_2",
    clientName: "سارة فاروق - بوتيك زهرة",
    clientPhone: "01234567890",
    clientEmail: "sara@zahrafashion.com",
    bookingDate: "2026-06-03",
    bookingTime: "01:00 م",
    consultType: "استشارة مجانية",
    status: "بانتظار التأكيد",
    notes: "تحليل الحساب الحالي للبراند وزهرة فاشن ومناقشة تفوق وتوغل التيك توك."
  },
  {
    id: "cb_3",
    clientName: "عاصم التاجي - مصنع سيراميكا رويال",
    clientPhone: "01198273641",
    clientEmail: "assem.taji@royal-ceramica.com",
    bookingDate: "2026-06-05",
    bookingTime: "04:30 م",
    consultType: "جلسة عصف ذهني وإطلاق براند",
    status: "مؤكدة",
    notes: "جلسة إستراتيجية مطولة للبراندينج الكامل وعقود الموشن جرافيك السنوية."
  },
  {
    id: "cb_4",
    clientName: "منى الجبالي - عيادات دنتال كير",
    clientPhone: "01511223344",
    clientEmail: "info@dentalcare.eg",
    bookingDate: "2026-05-28",
    bookingTime: "02:00 م",
    consultType: "جلسة تحليل حملات ممولة",
    status: "مكتملة",
    notes: "مراجعة العائد من إعلانات التيك توك وجوجل أدز وتحسين نسبة الحجز الهاتفي للعيادة."
  }
];

