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
