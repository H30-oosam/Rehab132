/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export enum LeadStage {
  Lead = "عميل محتمل",
  Contacted = "تم التواصل",
  Proposal = "تقديم عرض",
  Closed = "تم التعاقد"
}

export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  stage: LeadStage;
  value: number; // in EGP
  city: string;
  source: string;
  createdAt: string;
}

export interface Message {
  id: string;
  clientId: string;
  sender: "client" | "user";
  text: string;
  timestamp: string;
  isRead: boolean;
}

export interface Task {
  id: string;
  title: string;
  dueDate: string;
  completed: boolean;
  priority: "high" | "medium" | "low";
}

export interface Campaign {
  id: string;
  name: string;
  channel: string;
  status: "نشط" | "مكتمل" | "مسودة";
  budget: number; // in EGP
  spent: number; // in EGP
  leadsCount: number;
  conversionRate: number;
}

export interface Payment {
  id: string;
  clientName: string;
  amount: number; // in EGP
  date: string;
  status: "مدفوع" | "معلق" | "متأخر";
  service: string;
}

// === NEW ACADEMY & COURSE TYPES ===
export interface Course {
  id: string;
  title: string;
  description: string;
  duration: string; // e.g., "12 ساعة"
  lessonsCount: number;
  price: number; // EGP
  category: string; // "تسويق عقاري" | "سوشيال ميديا" | "سيلز ومبيعات"
  status: "نشط" | "مسودة";
  studentsEnrolled: number;
}

export interface StudentEnrollment {
  id: string;
  studentName: string;
  studentPhone: string;
  studentEmail: string;
  courseId: string;
  courseTitle: string;
  progress: number; // % completed (0-100)
  joinDate: string;
  lastActive: string;
  status: "نشط" | "مكتمل" | "متوقف";
}

// === NEW AUTOMATION TYPES ===
export interface AutoRule {
  id: string;
  title: string;
  triggerEvent: string; // "عند تسجيل العميل" | "عند حجز الاستشارة" | "عند سداد فاتورة" | "عند تقدم الطالب في الكورس"
  channel: "WhatsApp" | "Email" | "Both";
  messageTemplate: string;
  active: boolean;
}

export interface AutoLog {
  id: string;
  ruleTitle: string;
  recipientName: string;
  recipientContact: string;
  channel: "WhatsApp" | "Email";
  sentAt: string;
  status: "تم الإرسال" | "قيد الانتظار" | "فشل";
  previewText: string;
}

// === NEW SALES FUNNEL / CHECKOUT TYPES ===
export interface CheckoutPage {
  id: string;
  title: string;
  productName: string;
  price: number;
  currency: string;
  description: string;
  benefits: string[]; // List of points
  ctaText: string;
  themeColor: string; // CSS hex or class
  customFields: string[]; // ["اسمك بالكامل", "الهاتف", "البريد الإلكتروني"]
  couponCode?: string;
  discountPrice?: number;
}

// === NEW CONSULTATION BOOKING TYPES ===
export interface ConsultationBooking {
  id: string;
  clientName: string;
  clientPhone: string;
  clientEmail: string;
  bookingDate: string; // YYYY-MM-DD
  bookingTime: string; // HH:MM
  consultType: "استشارة مجانية" | "جلسة تسويق عقاري مدفوعة" | "جلسة تحليل حملات ممولة" | "جلسة عصف ذهني وإطلاق براند";
  status: "مؤكدة" | "بانتظار التأكيد" | "ملغاة" | "مكتملة";
  notes?: string;
}
