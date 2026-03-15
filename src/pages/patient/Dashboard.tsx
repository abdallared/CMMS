import { Activity, Calendar, FileText, Clock, CheckCircle } from 'lucide-react';
import { useStore } from '../../store/useStore';

export function PatientDashboard() {
  const { currentUser } = useStore();

  const upcomingAppointments = [
    { id: 1, doctor: 'د. محمد (أخصائي)', type: 'جلسة علاج طبيعي', date: '2026-03-16', time: '10:00 ص', status: 'مؤكد' },
    { id: 2, doctor: 'د. أحمد (استشاري)', type: 'مراجعة', date: '2026-03-30', time: '12:00 م', status: 'مجدول' },
  ];

  const protocolProgress = {
    diagnosis: 'انزلاق غضروفي L4-L5',
    totalSessions: 12,
    completedSessions: 4,
    startDate: '2026-03-01',
    therapist: 'د. محمد',
  };

  const progressPercentage = Math.round((protocolProgress.completedSessions / protocolProgress.totalSessions) * 100);

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">مرحباً، {currentUser?.full_name}</h1>
        <p className="mt-1 text-sm text-gray-500">تابع مواعيدك وتقدمك العلاجي من هنا</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Progress Card */}
        <div className="lg:col-span-2 bg-white shadow rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-medium text-gray-900 flex items-center gap-2">
              <Activity className="w-5 h-5 text-brand-500" />
              التقدم العلاجي الحالي
            </h3>
            <span className="px-3 py-1 bg-brand-50 text-brand-700 text-sm font-medium rounded-full">
              {protocolProgress.diagnosis}
            </span>
          </div>

          <div className="mb-6">
            <div className="flex justify-between text-sm font-medium text-gray-900 mb-2">
              <span>نسبة الإنجاز</span>
              <span>{progressPercentage}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className="bg-brand-600 h-2.5 rounded-full transition-all duration-500" 
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-xs text-gray-500 mt-2">
              <span>تم إنجاز {protocolProgress.completedSessions} جلسات</span>
              <span>المتبقي {protocolProgress.totalSessions - protocolProgress.completedSessions} جلسات</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 border-t pt-4">
            <div>
              <p className="text-xs text-gray-500 mb-1">الأخصائي المعالج</p>
              <p className="text-sm font-medium text-gray-900">{protocolProgress.therapist}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">تاريخ البدء</p>
              <p className="text-sm font-medium text-gray-900">{protocolProgress.startDate}</p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white shadow rounded-lg p-6 space-y-4">
          <h3 className="text-lg font-medium text-gray-900 mb-4">إجراءات سريعة</h3>
          <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-brand-600 text-white rounded-md hover:bg-brand-700 font-medium">
            <Calendar className="w-5 h-5" />
            حجز موعد جديد
          </button>
          <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 font-medium">
            <FileText className="w-5 h-5" />
            عرض التاريخ المرضي
          </button>
        </div>

        {/* Upcoming Appointments */}
        <div className="lg:col-span-3 bg-white shadow rounded-lg overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900 flex items-center gap-2">
              <Clock className="w-5 h-5 text-brand-500" />
              المواعيد القادمة
            </h3>
          </div>
          <ul className="divide-y divide-gray-200">
            {upcomingAppointments.map((apt) => (
              <li key={apt.id} className="p-6 hover:bg-gray-50">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="bg-brand-50 p-3 rounded-lg text-center min-w-[4.5rem]">
                      <span className="block text-sm font-bold text-brand-700">{apt.date.split('-')[2]}</span>
                      <span className="block text-xs text-brand-500">مارس</span>
                    </div>
                    <div>
                      <h4 className="text-base font-medium text-gray-900">{apt.type}</h4>
                      <p className="text-sm text-gray-500 mt-1">مع {apt.doctor}</p>
                      <div className="flex items-center gap-2 mt-2 text-sm text-gray-500">
                        <Clock className="w-4 h-4" />
                        <span>{apt.time}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 sm:flex-col sm:items-end">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      apt.status === 'مؤكد' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {apt.status}
                    </span>
                    <button className="text-sm text-brand-600 hover:text-brand-900 font-medium">
                      تعديل الموعد
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
