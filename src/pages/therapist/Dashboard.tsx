import { Calendar, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { useStore } from '../../store/useStore';

export function TherapistDashboard() {
  const { currentUser } = useStore();

  const pendingProtocols = [
    { id: 1, patient: 'أحمد محمد', consultant: 'د. أحمد', diagnosis: 'انزلاق غضروفي L4-L5', sessions: 12, date: '2026-03-15' },
    { id: 2, patient: 'سارة محمود', consultant: 'د. أحمد', diagnosis: 'خشونة الركبة', sessions: 8, date: '2026-03-16' },
  ];

  const todaySessions = [
    { id: 101, patient: 'محمود علي', time: '10:00 ص', protocol: 'تأهيل بعد جراحة الرباط الصليبي', sessionNumber: 3, totalSessions: 12, status: 'completed' },
    { id: 102, patient: 'أحمد محمد', time: '11:00 ص', protocol: 'انزلاق غضروفي', sessionNumber: 1, totalSessions: 12, status: 'in_progress' },
    { id: 103, patient: 'سارة محمود', time: '12:30 م', protocol: 'خشونة الركبة', sessionNumber: 5, totalSessions: 8, status: 'scheduled' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">لوحة تحكم الأخصائي</h1>
        <p className="mt-1 text-sm text-gray-500">مرحباً {currentUser?.full_name}، جدولك اليوم</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pending Protocols */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 border-b border-gray-200 sm:px-6 flex justify-between items-center">
            <h3 className="text-lg leading-6 font-medium text-gray-900 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-orange-500" />
              بروتوكولات معلقة (جديدة)
            </h3>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
              {pendingProtocols.length}
            </span>
          </div>
          <ul className="divide-y divide-gray-200">
            {pendingProtocols.map((protocol) => (
              <li key={protocol.id} className="p-4 hover:bg-gray-50">
                <div className="flex justify-between">
                  <div>
                    <p className="text-sm font-medium text-brand-600">{protocol.patient}</p>
                    <p className="text-sm text-gray-500 mt-1">التشخيص: {protocol.diagnosis}</p>
                    <p className="text-xs text-gray-400 mt-1">محول من: {protocol.consultant} • {protocol.sessions} جلسة</p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <button className="px-3 py-1 bg-brand-600 text-white text-xs font-medium rounded hover:bg-brand-700">
                      قبول الحالة
                    </button>
                    <button className="px-3 py-1 bg-white border border-gray-300 text-gray-700 text-xs font-medium rounded hover:bg-gray-50">
                      رفض (الجدول ممتلئ)
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Today's Schedule */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 border-b border-gray-200 sm:px-6 flex justify-between items-center">
            <h3 className="text-lg leading-6 font-medium text-gray-900 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-brand-500" />
              جلسات اليوم
            </h3>
          </div>
          <ul className="divide-y divide-gray-200">
            {todaySessions.map((session) => (
              <li key={session.id} className="p-4 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex flex-col items-center justify-center bg-brand-50 text-brand-700 rounded-lg p-2 min-w-[4rem]">
                      <Clock className="w-4 h-4 mb-1" />
                      <span className="text-xs font-bold">{session.time}</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{session.patient}</p>
                      <p className="text-xs text-gray-500 mt-1">{session.protocol}</p>
                      <p className="text-xs text-brand-600 mt-1 font-medium">
                        الجلسة {session.sessionNumber} من {session.totalSessions}
                      </p>
                    </div>
                  </div>
                  <div>
                    {session.status === 'completed' ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        <CheckCircle className="w-3 h-3" /> مكتملة
                      </span>
                    ) : session.status === 'in_progress' ? (
                      <button className="px-3 py-1.5 bg-blue-600 text-white text-xs font-medium rounded-md hover:bg-blue-700">
                        تسجيل الجلسة
                      </button>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        مجدولة
                      </span>
                    )}
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
