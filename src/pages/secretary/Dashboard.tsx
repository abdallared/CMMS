import { useState } from 'react';
import { Users, Calendar, ArrowUp, ArrowDown, XCircle, Edit } from 'lucide-react';
import { useStore } from '../../store/useStore';

export function SecretaryDashboard() {
  const { appointments } = useStore();
  
  // Mock queue data
  const [queue, setQueue] = useState([
    { id: 1, number: 1, name: 'أحمد محمد', time: '10:00 ص', status: 'waiting', doctor: 'د. أحمد' },
    { id: 2, number: 2, name: 'سارة محمود', time: '10:30 ص', status: 'waiting', doctor: 'د. أحمد' },
    { id: 3, number: 3, name: 'محمود علي', time: '11:00 ص', status: 'waiting', doctor: 'د. أحمد' },
    { id: 4, number: 4, name: 'فاطمة حسن', time: '11:30 ص', status: 'waiting', doctor: 'د. أحمد' },
  ]);

  const moveUp = (index: number) => {
    if (index === 0) return;
    const newQueue = [...queue];
    const temp = newQueue[index];
    newQueue[index] = newQueue[index - 1];
    newQueue[index - 1] = temp;
    
    // Update numbers
    newQueue.forEach((item, i) => item.number = i + 1);
    setQueue(newQueue);
  };

  const moveDown = (index: number) => {
    if (index === queue.length - 1) return;
    const newQueue = [...queue];
    const temp = newQueue[index];
    newQueue[index] = newQueue[index + 1];
    newQueue[index + 1] = temp;
    
    // Update numbers
    newQueue.forEach((item, i) => item.number = i + 1);
    setQueue(newQueue);
  };

  const cancelAppointment = (id: number) => {
    const newQueue = queue.filter(item => item.id !== id);
    newQueue.forEach((item, i) => item.number = i + 1);
    setQueue(newQueue);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">لوحة تحكم السكرتيرة</h1>
          <p className="mt-1 text-sm text-gray-500">إدارة الحجوزات وقائمة الانتظار (Shift Management)</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-50 text-sm font-medium">
            تحديث القائمة
          </button>
          <button className="bg-brand-600 text-white px-4 py-2 rounded-md hover:bg-brand-700 text-sm font-medium flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            حجز جديد
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        <div className="bg-white overflow-hidden shadow rounded-lg p-5">
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-brand-100 rounded-md p-3">
              <Users className="h-6 w-6 text-brand-600" />
            </div>
            <div className="mr-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">إجمالي حجوزات اليوم</dt>
                <dd className="text-lg font-medium text-gray-900">{queue.length + 5}</dd>
              </dl>
            </div>
          </div>
        </div>
        <div className="bg-white overflow-hidden shadow rounded-lg p-5">
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-yellow-100 rounded-md p-3">
              <Users className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="mr-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">في الانتظار</dt>
                <dd className="text-lg font-medium text-gray-900">{queue.length}</dd>
              </dl>
            </div>
          </div>
        </div>
        <div className="bg-white overflow-hidden shadow rounded-lg p-5">
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-green-100 rounded-md p-3">
              <Users className="h-6 w-6 text-green-600" />
            </div>
            <div className="mr-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">تم الكشف</dt>
                <dd className="text-lg font-medium text-gray-900">5</dd>
              </dl>
            </div>
          </div>
        </div>
      </div>

      {/* Queue Management */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">قائمة الانتظار الحالية (Shift Management)</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  رقم الدور
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  اسم المريض
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  الموعد
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  الطبيب
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  الحالة
                </th>
                <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  الإجراءات (تقديم/تأخير)
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {queue.map((item, index) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-brand-100 text-brand-800 font-bold">
                      {item.number}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{item.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{item.time}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{item.doctor}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                      في الانتظار
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-center">
                    <div className="flex justify-center gap-2">
                      <button 
                        onClick={() => moveUp(index)}
                        disabled={index === 0}
                        className={`p-1 rounded-md ${index === 0 ? 'text-gray-300 cursor-not-allowed' : 'text-blue-600 hover:bg-blue-50'}`}
                        title="تقديم الدور"
                      >
                        <ArrowUp className="w-5 h-5" />
                      </button>
                      <button 
                        onClick={() => moveDown(index)}
                        disabled={index === queue.length - 1}
                        className={`p-1 rounded-md ${index === queue.length - 1 ? 'text-gray-300 cursor-not-allowed' : 'text-orange-600 hover:bg-orange-50'}`}
                        title="تأخير الدور"
                      >
                        <ArrowDown className="w-5 h-5" />
                      </button>
                      <div className="w-px h-5 bg-gray-300 mx-1 my-auto"></div>
                      <button className="p-1 text-gray-600 hover:bg-gray-100 rounded-md" title="تعديل">
                        <Edit className="w-5 h-5" />
                      </button>
                      <button 
                        onClick={() => cancelAppointment(item.id)}
                        className="p-1 text-red-600 hover:bg-red-50 rounded-md" 
                        title="إلغاء الحجز"
                      >
                        <XCircle className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {queue.length === 0 && (
            <div className="text-center py-10 text-gray-500">
              لا يوجد مرضى في قائمة الانتظار حالياً
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
