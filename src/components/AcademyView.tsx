/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { 
  BookOpen, 
  GraduationCap, 
  Award, 
  Plus, 
  Sparkles, 
  Users, 
  TrendingUp, 
  X, 
  Activity, 
  Smartphone, 
  Sliders, 
  CheckCircle2, 
  BookOpenCheck,
  Search
} from "lucide-react";
import { Course, StudentEnrollment } from "../types";

interface AcademyViewProps {
  courses: Course[];
  setCourses: React.Dispatch<React.SetStateAction<Course[]>>;
  students: StudentEnrollment[];
  setStudents: React.Dispatch<React.SetStateAction<StudentEnrollment[]>>;
  triggerNotificationSim: (studentName: string, eventType: string, courseTitle: string) => void;
}

export default function AcademyView({ 
  courses, 
  setCourses, 
  students, 
  setStudents, 
  triggerNotificationSim 
}: AcademyViewProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [studentSearch, setStudentSearch] = useState("");

  // Modals
  const [isAddCourseOpen, setIsAddCourseOpen] = useState(false);
  const [isAddStudentOpen, setIsAddStudentOpen] = useState(false);

  // Form states - Course
  const [cTitle, setCTitle] = useState("");
  const [cDesc, setCDesc] = useState("");
  const [cPrice, setCPrice] = useState("");
  const [cLessons, setCLessons] = useState("12");
  const [cDuration, setCDuration] = useState("15 ساعة");
  const [cCategory, setCCategory] = useState("تسويق عقاري");

  // Form states - Student
  const [sName, setSName] = useState("");
  const [sPhone, setSPhone] = useState("");
  const [sEmail, setSEmail] = useState("");
  const [sCourseId, setSCourseId] = useState("");

  // Statistics
  const activeStudentsCount = students.filter(s => s.status === "نشط").length;
  const completedStudentsCount = students.filter(s => s.status === "مكتمل").length;
  const averageProgress = students.length > 0 
    ? Math.round(students.reduce((sum, s) => sum + s.progress, 0) / students.length) 
    : 0;

  const handleCreateCourse = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cTitle.trim() || !cPrice) return;

    const newCourse: Course = {
      id: "co_" + Date.now(),
      title: cTitle,
      description: cDesc || "لا يوجد وصف لهذه الباقة بعد.",
      duration: cDuration,
      lessonsCount: Number(cLessons) || 12,
      price: Number(cPrice),
      category: cCategory || "تسويق عقاري",
      status: "نشط",
      studentsEnrolled: 0
    };

    setCourses(prev => [newCourse, ...prev]);
    setIsAddCourseOpen(false);
    setCTitle("");
    setCDesc("");
    setCPrice("");
  };

  const handleRegisterStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!sName.trim() || !sPhone.trim() || !sCourseId) return;

    const selectedCourseItem = courses.find(c => c.id === sCourseId);
    const courseTitle = selectedCourseItem ? selectedCourseItem.title : "دورة عامة";

    const newStudent: StudentEnrollment = {
      id: "st_" + Date.now(),
      studentName: sName,
      studentPhone: sPhone,
      studentEmail: sEmail || "student@academy.eg",
      courseId: sCourseId,
      courseTitle,
      progress: 0,
      joinDate: new Date().toISOString().split("T")[0],
      lastActive: new Date().toISOString().split("T")[0],
      status: "نشط"
    };

    setStudents(prev => [newStudent, ...prev]);

    // Track increment in Course enrollment counts beautifully
    setCourses(prev => prev.map(c => c.id === sCourseId ? { ...c, studentsEnrolled: c.studentsEnrolled + 1 } : c));

    setIsAddStudentOpen(false);
    setSName("");
    setSPhone("");
    setSEmail("");

    // Simulate reactive notification trigger
    triggerNotificationSim(sName, "عند تسجيل العميل", courseTitle);
  };

  const handleProgressBoost = (studentId: string) => {
    setStudents(prev => prev.map(student => {
      if (student.id === studentId) {
        let nextProg = student.progress + 15;
        let nextStatus = student.status;
        if (nextProg >= 100) {
          nextProg = 100;
          nextStatus = "مكتمل";
        }

        // Trigger dynamic automation simulations at 50% & 100%
        if (student.progress < 50 && nextProg >= 50 && nextProg < 100) {
          triggerNotificationSim(student.studentName, "عند تقدم الطالب في الكورس", student.courseTitle);
        } else if (nextProg === 100) {
          triggerNotificationSim(student.studentName, "عند سداد فاتورة", student.courseTitle); // simulate email finish
        }

        return {
          ...student,
          progress: nextProg,
          status: nextStatus,
          lastActive: new Date().toISOString().split("T")[0]
        };
      }
      return student;
    }));
  };

  const formatEGP = (num: number) => {
    return new Intl.NumberFormat("ar-EG", { style: "currency", currency: "EGP", maximumFractionDigits: 0 }).format(num);
  };

  // Filter lists
  const filteredCourses = courses.filter(c => {
    const matchCat = categoryFilter === "all" || c.category === categoryFilter;
    const matchSearch = c.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        c.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchCat && matchSearch;
  });

  const filteredStudents = students.filter(s => {
    return s.studentName.toLowerCase().includes(studentSearch.toLowerCase()) || 
           s.studentPhone.includes(studentSearch) || 
           s.courseTitle.toLowerCase().includes(studentSearch.toLowerCase());
  });

  return (
    <div id="academy-view-wrapper" className="space-y-6 text-right">
      
      {/* Dynamic Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-5 rounded-lg border border-gray-250 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 h-[3px] w-full bg-[#1a237e]"></div>
          <span className="text-gray-500 text-xs block mb-1 font-semibold">إجمالي الكورسات المنشورة</span>
          <span className="text-xl lg:text-2xl font-bold text-indigo-950 block mt-0.5">{courses.length} كورس وباقة</span>
          <span className="text-[10px] text-gray-400 block mt-1">تنمية مهارات شركاء رحاب</span>
        </div>
        <div className="bg-white p-5 rounded-lg border border-gray-250 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 h-[3px] w-full bg-blue-500"></div>
          <span className="text-gray-500 text-xs block mb-1 font-semibold">الطلاب الدارسين حالياً</span>
          <span className="text-xl lg:text-2xl font-bold text-blue-700 font-sans block mt-0.5">{students.length} طالب</span>
          <span className="text-[10px] text-green-700 block mt-1 font-bold">
            ⚡ {activeStudentsCount} مستمر كنشط
          </span>
        </div>
        <div className="bg-white p-5 rounded-lg border border-gray-250 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 h-[3px] w-full bg-emerald-500"></div>
          <span className="text-gray-500 text-xs block mb-1 font-semibold">نسبة متوسط التقدم الدراسي</span>
          <span className="text-xl lg:text-2xl font-bold text-emerald-600 block mt-0.5">{averageProgress}%</span>
          <div className="w-full bg-gray-100 h-1.5 rounded mt-2.5 overflow-hidden">
            <div className="bg-emerald-500 h-full rounded" style={{ width: `${averageProgress}%` }}></div>
          </div>
        </div>
        <div className="bg-white p-5 rounded-lg border border-gray-250 shadow-sm flex items-center justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 h-[3px] w-full bg-purple-500"></div>
          <div>
            <span className="text-gray-500 text-xs block mb-1 font-semibold">خريجون متكاملون (Completed)</span>
            <span className="text-xl lg:text-2xl font-bold text-purple-600 block mt-0.5">{completedStudentsCount} باحث</span>
          </div>
          <div className="w-9 h-9 bg-purple-50 border border-purple-100 rounded-lg flex items-center justify-center text-purple-600">
            <Award className="w-5 h-5 animate-pulse" />
          </div>
        </div>
      </div>

      {/* Main Grid: Management Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Course Directory System (Spans 5 Columns) */}
        <div className="bg-white rounded-lg border border-gray-250 p-5 shadow-sm lg:col-span-5 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-bold text-indigo-950 text-sm flex items-center gap-2">
                <BookOpen className="w-4.5 h-4.5 text-[#1a237e]" />
                باقات وكورسات الأكاديمية
              </h3>
              <button 
                id="create-new-course-btn"
                onClick={() => setIsAddCourseOpen(true)}
                className="text-xs bg-[#1a237e] text-white hover:bg-indigo-900 px-3 py-1.5 rounded font-bold flex items-center gap-1 transition-all"
              >
                <Plus className="w-3.5 h-3.5" />
                إضافة كورس
              </button>
            </div>
            <p className="text-xs text-gray-500 mb-4">بوابة التحكم بالمحتوى التعليمي وإعداد وتعديل الكورسات التي تساهم في بيع الباقات الترويجية لرحاب.</p>

            {/* Quick Filter Controls */}
            <div className="flex gap-2 mb-4 shrink-0 select-none">
              <button
                onClick={() => setCategoryFilter("all")}
                className={`px-2.5 py-1 rounded text-[10px] font-bold ${
                  categoryFilter === "all" ? "bg-[#1a237e] text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-250"
                }`}
              >
                الكل ({courses.length})
              </button>
              <button
                onClick={() => setCategoryFilter("تسويق عقاري")}
                className={`px-2.5 py-1 rounded text-[10px] font-bold ${
                  categoryFilter === "تسويق عقاري" ? "bg-[#1a237e] text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-250"
                }`}
              >
                عقارات
              </button>
              <button
                onClick={() => setCategoryFilter("سوشيال ميديا")}
                className={`px-2.5 py-1 rounded text-[10px] font-bold ${
                  categoryFilter === "سوشيال ميديا" ? "bg-[#1a237e] text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-250"
                }`}
              >
                سوشيال
              </button>
            </div>

            {/* Course Cards */}
            <div className="space-y-3.5 max-h-[460px] overflow-y-auto pr-1">
              {filteredCourses.length === 0 ? (
                <div className="text-center py-10 bg-gray-55/40 text-gray-400 text-xs rounded border border-dashed">
                  لا توجد باقات تطابق محتوى البحث الحرج.
                </div>
              ) : (
                filteredCourses.map(course => (
                  <div 
                    key={course.id} 
                    className="p-3.5 bg-gray-50/70 border border-gray-200 rounded-lg hover:border-indigo-300 transition-all space-y-2 relative"
                  >
                    <div className="flex items-start justify-between">
                      <span className="text-[9px] bg-indigo-50 text-[#1a237e] px-1.5 py-0.5 rounded font-bold border border-indigo-100/50">
                        {course.category}
                      </span>
                      <span className="text-indigo-900 font-sans font-bold text-xs select-all">
                        {formatEGP(course.price)}
                      </span>
                    </div>

                    <h4 className="font-bold text-xs text-gray-900 block">{course.title}</h4>
                    <p className="text-[10px] text-gray-500 leading-relaxed font-semibold">{course.description}</p>
                    
                    <div className="pt-2 border-t border-gray-150 flex items-center justify-between text-[10px] text-gray-400 font-medium">
                      <span>المدة: <strong>{course.duration}</strong> ({course.lessonsCount} درس)</span>
                      <span className="text-indigo-950 font-bold bg-indigo-50 px-1.5 py-0.5 rounded">
                        👥 {course.studentsEnrolled} مشترك
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Dynamic Students Active progress table (Spans 7 Columns) */}
        <div className="bg-white rounded-lg border border-gray-250 p-5 shadow-sm lg:col-span-7 flex flex-col justify-between">
          <div>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-4">
              <div>
                <h3 className="font-bold text-indigo-950 text-sm flex items-center gap-2">
                  <GraduationCap className="w-5 h-5 text-[#1a237e]" />
                  متابعة الطلاب ومعدل تقدمهم الدراسي آلية 
                </h3>
                <p className="text-xs text-gray-500 mt-0.5">راقب تقدم الطلاب، ودورهم، ونشّط نسبة التدريب، مع تطبيق أوتوماتيكي لإشعارات واتساب.</p>
              </div>

              {/* Action Buttons */}
              <button 
                id="register-student-main-btn"
                onClick={() => setIsAddStudentOpen(true)}
                className="bg-[#1a237e] text-white hover:bg-indigo-900 text-xs font-bold px-3 py-1.5 rounded flex items-center gap-1.5 self-start transition-all"
              >
                <Plus className="w-4 h-4" />
                تسجيل طالب في كورس
              </button>
            </div>

            {/* Student Search and listing table */}
            <div className="relative mb-3.5 w-full">
              <Search className="w-3.5 h-3.5 text-gray-400 absolute right-3 top-3.5" />
              <input 
                type="text"
                placeholder="ابحث عن طالب، دورته، أو هاتفه..."
                value={studentSearch}
                onChange={e => setStudentSearch(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 text-xs py-2 px-3 pr-9 pl-3 rounded-lg focus:outline-none focus:border-[#1a237e] transition-all text-right"
              />
            </div>

            <div className="overflow-x-auto select-none">
              <table className="w-full text-right text-xs">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50/50 text-gray-550 font-bold">
                    <th className="py-2.5 px-2">الطالب</th>
                    <th className="py-2.5 px-2">الكورس والمنهج المعتمد</th>
                    <th className="py-2.5 px-2 text-center">التقدم والنسبة</th>
                    <th className="py-2.5 px-2 text-center">الحالة</th>
                    <th className="py-2.5 px-2 text-left">أفعال</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-150">
                  {filteredStudents.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="text-center py-10 text-gray-400">
                        لا يوجد طلاب ضمن كشوفات البحث المفتوحة.
                      </td>
                    </tr>
                  ) : (
                    filteredStudents.map(student => (
                      <tr key={student.id} className="hover:bg-gray-50/50 transition-colors">
                        <td className="py-3 px-2">
                          <span className="font-bold text-gray-900 block">{student.studentName}</span>
                          <span className="text-[10px] text-gray-400 block font-mono mt-0.5">{student.studentPhone}</span>
                        </td>
                        <td className="py-3 px-2 text-gray-500 max-w-44 truncate text-[11px] font-semibold">
                          {student.courseTitle}
                        </td>
                        <td className="py-3 px-2">
                          <div className="flex flex-col items-center justify-center space-y-1 w-28 mx-auto">
                            <span className="text-[10px] font-mono font-bold text-indigo-950">{student.progress}%</span>
                            <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                              <div 
                                className="bg-[#1a237e] h-full rounded-full transition-all duration-300" 
                                style={{ width: `${student.progress}%` }}
                              />
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-2 text-center">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold inline-block ${
                            student.status === "مكتمل"
                              ? "bg-emerald-100 text-emerald-700 border border-emerald-200/50" 
                              : student.status === "متوقف" 
                                ? "bg-rose-100 text-rose-700" 
                                : "bg-blue-100 text-blue-700"
                          }`}>
                            {student.status}
                          </span>
                        </td>
                        <td className="py-3 px-2 text-left">
                          <button
                            id={`boost-student-[${student.id}]-progress`}
                            disabled={student.progress >= 100}
                            onClick={() => handleProgressBoost(student.id)}
                            className="bg-gray-50 hover:bg-indigo-50 border border-gray-205 text-gray-700 hover:text-[#1a237e] disabled:bg-gray-100 disabled:text-gray-300 px-2 py-1 rounded text-[10px] font-bold cursor-pointer transition-all inline-flex items-center gap-0.5"
                            title="ترقية تقدم الطالب يدوياً ومحاكاة رسائل واتساب"
                          >
                            <Activity className="w-3 h-3" />
                            ترقية وبث
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Course Modal */}
      {isAddCourseOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 transition-all">
          <div className="bg-white border border-gray-200 rounded-lg w-full max-w-md overflow-hidden shadow-2xl">
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <h3 className="font-bold text-indigo-900 text-sm flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#1a237e]" />
                إطلاق كورس تعليمي أو ترويجي جديد
              </h3>
              <button 
                onClick={() => setIsAddCourseOpen(false)} 
                className="p-1 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateCourse} className="p-6 space-y-4 text-right">
              <div>
                <label className="text-[11px] font-bold text-gray-600 block mb-1.5">عنوان الكورس / دبلومة التسويق الرقمي *</label>
                <input 
                  type="text" 
                  required
                  placeholder="مثال: الماستر كلاس المتكامل في عقارات السوشيال"
                  value={cTitle}
                  onChange={e => setCTitle(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded px-3 py-2 text-xs text-gray-900 focus:outline-none focus:border-[#1a237e] text-right"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-gray-600 block mb-1.5">وصف مبسط للباقة وأهداف التطبيق الدارس</label>
                <textarea 
                  placeholder="تعليم حملات ليدز، تصدير قوائم النخبة،..."
                  value={cDesc}
                  onChange={e => setCDesc(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded px-3 py-2 text-xs text-gray-900 focus:outline-none focus:border-[#1a237e] h-16 text-right"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] font-bold text-gray-600 block mb-1.5">التكلفة (ج.م) *</label>
                  <input 
                    type="number" 
                    required
                    placeholder="2500"
                    value={cPrice}
                    onChange={e => setCPrice(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded px-3 py-2 text-xs text-gray-900 focus:outline-none focus:border-[#1a237e] font-sans font-bold text-right"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-gray-600 block mb-1.5">التصنيف والفرع *</label>
                  <select 
                    value={cCategory}
                    onChange={e => setCCategory(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded px-3 py-2 text-xs text-gray-800 focus:outline-none focus:border-[#1a237e] text-right"
                  >
                    <option value="تسويق عقاري">تسويق عقاري</option>
                    <option value="سوشيال ميديا">سوشيال ميديا وعلامات</option>
                    <option value="سيلز ومبيعات">برمجة وسيلز متقدم</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] font-bold text-gray-600 block mb-1.5">عدد الدروس</label>
                  <input 
                    type="number" 
                    value={cLessons}
                    onChange={e => setCLessons(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded px-3 py-2 text-xs text-gray-900 focus:outline-none focus:border-[#1a237e] font-mono text-center"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-gray-600 block mb-1.5">المدة التدريبية الكلية</label>
                  <input 
                    type="text" 
                    value={cDuration}
                    onChange={e => setCDuration(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded px-3 py-2 text-xs text-gray-900 focus:outline-none focus:border-[#1a237e] font-sans text-center"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-gray-200 flex gap-2">
                <button 
                  type="submit"
                  className="bg-[#1a237e] text-white font-bold text-xs px-4 py-2.5 rounded transition-all cursor-pointer flex-1"
                >
                  نشر وإضافة الكورس للأكاديمية
                </button>
                <button 
                  type="button" 
                  onClick={() => setIsAddCourseOpen(false)}
                  className="bg-gray-100 text-gray-700 font-bold text-xs px-4 py-2.5 rounded border border-gray-205"
                >
                  إلغاء
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Student Modal */}
      {isAddStudentOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 transition-all">
          <div className="bg-white border border-gray-200 rounded-lg w-full max-w-sm overflow-hidden shadow-2xl">
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <h3 className="font-bold text-indigo-900 text-sm flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-[#1a237e]" />
                تسجيل طالب ومنتسب مدرسي جديد
              </h3>
              <button 
                onClick={() => setIsAddStudentOpen(false)} 
                className="p-1 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleRegisterStudent} className="p-6 space-y-4 text-right">
              <div>
                <label className="text-[11px] font-bold text-gray-600 block mb-1.5">اسم الطالب الثلاثي بالكامل *</label>
                <input 
                  type="text" 
                  required
                  placeholder="مثال: المهندس عادل الشيمي"
                  value={sName}
                  onChange={e => setSName(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded px-3 py-2 text-xs text-gray-900 focus:outline-none focus:border-[#1a237e]"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-gray-600 block mb-1.5">رقم هاتف المحمول للتواصل وخدمات الواتساب *</label>
                <input 
                  type="tel" 
                  required
                  placeholder="010xxxxxxxx"
                  value={sPhone}
                  onChange={e => setSPhone(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded px-3 py-2 text-xs text-gray-900 focus:outline-none focus:border-[#1a237e] font-mono"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-gray-600 block mb-1.5">البريد الإلكتروني للوجين الدراسي</label>
                <input 
                  type="email" 
                  placeholder="name@gmail.com"
                  value={sEmail}
                  onChange={e => setSEmail(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded px-3 py-2 text-xs text-gray-900 focus:outline-none focus:border-[#1a237e] font-mono"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-gray-600 block mb-1.5">اختر الكورس التسويقي / المنهج المقرر *</label>
                <select 
                  required
                  value={sCourseId}
                  onChange={e => setSCourseId(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded px-3 py-2 text-xs text-gray-800 focus:outline-none focus:border-[#1a237e] text-right"
                >
                  <option value="">-- اختر من الكورسات المفتوحة --</option>
                  {courses.map(c => (
                    <option key={c.id} value={c.id}>{c.title} ( قيمة: {c.price} ج.م )</option>
                  ))}
                </select>
              </div>

              <div className="pt-4 border-t border-gray-200 flex gap-2">
                <button 
                  type="submit"
                  className="bg-[#1a237e] text-white font-bold text-xs px-4 py-2.5 rounded transition-all cursor-pointer flex-1"
                >
                  تسجيل وبث رسائل التأكيد فوراً
                </button>
                <button 
                  type="button" 
                  onClick={() => setIsAddStudentOpen(false)}
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
