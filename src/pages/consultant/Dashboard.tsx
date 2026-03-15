import { Users, Activity, FileText, CheckCircle } from 'lucide-react';
import { useStore } from '../../store/useStore';

export function ConsultantDashboard() {
  const { appointments } = useStore();
  
  // Mock data for dashboard
  const stats = [
    { name: 'حالات اليوم', value: '12', icon: Users, color: 'text-blue-600', bg: 'bg-blue-100' },
    { name: 'بروتوكولات نشطة', value: '45', icon: Activity, color: 'text-brand-600', bg: 'bg-brand-100' },
    { name: 'مراجعات قادمة', value: '8', icon: FileText, color: 'text-orange-600', bg: 'bg-orange-100' },
    { name: 'حالات تم شفاؤها', value: '128', icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-100' },
  ];

  const todayPatients = [
    { id: 1, name: 'أحمد محمد', time: '10:00 ص', status: 'waiting', type: 'كشف جديد' },
    { id: 2, name: 'سارة محمود', time: '10:30 ص', status: 'in_progress', type: 'مراجعة' },
    { id: 3, name: 'محمود علي', time: '11:00 ص', status: 'scheduled', type: 'كشف جديد' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">لوحة تحكم الاستشاري</h1>
        <p className="mt-1 text-sm text-gray-500">مرحباً بك دكتور، إليك ملخص حالات اليوم</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((item) => (
          <div key={item.name} className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className={`${item.bg} rounded-md p-3`}>
                    <item.icon className={`h-6 w-6 ${item.color}`} aria-hidden="true" />
                  </div>
                </div>
                <div className="mr-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">{item.name}</dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900">{item.value}</div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Today's Patients */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 border-b border-gray-200 sm:px-6 flex justify-between items-center">
          <h3 className="text-lg leading-6 font-medium text-gray-900">حالات اليوم</h3>
          <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-brand-100 text-brand-800">
            {todayPatients.length} مرضى
          </span>
        </div>
        <ul className="divide-y divide-gray-200">
          {todayPatients.map((patient) => (
            <li key={patient.id} className="px-4 py-4 sm:px-6 hover:bg-gray-50 transition-colors cursor-pointer">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-500 font-medium">{patient.name.charAt(0)}</span>
                  </div>
                  <div className="mr-4">
                    <p className="text-sm font-medium text-brand-600 truncate">{patient.name}</p>
                    <p className="text-sm text-gray-500">{patient.type}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-sm text-gray-900">{patient.time}</div>
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                    ${patient.status === 'waiting' ? 'bg-yellow-100 text-yellow-800' : 
                      patient.status === 'in_progress' ? 'bg-blue-100 text-blue-800' : 
                      'bg-gray-100 text-gray-800'}`}>
                    {patient.status === 'waiting' ? 'في الانتظار' : 
                     patient.status === 'in_progress' ? 'جاري الكشف' : 'مجدول'}
                  </span>
                  <button className="text-brand-600 hover:text-brand-900 text-sm font-medium">
                    بدء الكشف
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
