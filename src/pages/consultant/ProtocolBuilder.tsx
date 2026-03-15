import { useState } from 'react';
import { Save, FileText, Activity, Plus } from 'lucide-react';

export function ProtocolBuilder() {
  const [sessions, setSessions] = useState(12);
  const [duration, setDuration] = useState(4);
  const [exercises, setExercises] = useState([
    { id: 1, name: 'تمارين إطالة', duration: '15 دقيقة', notes: 'التركيز على أسفل الظهر' }
  ]);

  const addExercise = () => {
    setExercises([...exercises, { id: Date.now(), name: '', duration: '', notes: '' }]);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">بناء بروتوكول علاجي</h1>
          <p className="mt-1 text-sm text-gray-500">مريض: أحمد محمد - تشخيص: انزلاق غضروفي L4-L5</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-brand-600 text-white rounded-md hover:bg-brand-700">
          <Save className="w-4 h-4" />
          حفظ وإرسال للأخصائي
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Protocol Settings */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
              <Activity className="w-5 h-5 text-brand-500" />
              إعدادات البروتوكول
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">عدد الجلسات الكلي</label>
                <input 
                  type="number" 
                  value={sessions}
                  onChange={(e) => setSessions(Number(e.target.value))}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-brand-500 focus:border-brand-500 sm:text-sm py-2 px-3 border"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">المدة الزمنية (أسابيع)</label>
                <input 
                  type="number" 
                  value={duration}
                  onChange={(e) => setDuration(Number(e.target.value))}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-brand-500 focus:border-brand-500 sm:text-sm py-2 px-3 border"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">تعليمات خاصة للأخصائي</label>
                <textarea 
                  rows={4}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-brand-500 focus:border-brand-500 sm:text-sm py-2 px-3 border"
                  placeholder="مثال: تجنب الحركات الدورانية العنيفة..."
                />
              </div>
            </div>
          </div>
        </div>

        {/* Exercises List */}
        <div className="lg:col-span-2">
          <div className="bg-white shadow rounded-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900 flex items-center gap-2">
                <FileText className="w-5 h-5 text-brand-500" />
                البرنامج العلاجي والتمارين
              </h3>
              <button 
                onClick={addExercise}
                className="flex items-center gap-1 text-sm text-brand-600 hover:text-brand-900"
              >
                <Plus className="w-4 h-4" />
                إضافة تمرين
              </button>
            </div>

            <div className="space-y-4">
              {exercises.map((exercise, index) => (
                <div key={exercise.id} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                  <div className="flex justify-between items-center mb-3">
                    <span className="font-medium text-gray-700">تمرين #{index + 1}</span>
                    <button className="text-red-500 hover:text-red-700 text-sm">حذف</button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-500">اسم التمرين / الجهاز</label>
                      <input 
                        type="text" 
                        defaultValue={exercise.name}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-brand-500 focus:border-brand-500 sm:text-sm py-1.5 px-3 border bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-500">المدة / التكرار</label>
                      <input 
                        type="text" 
                        defaultValue={exercise.duration}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-brand-500 focus:border-brand-500 sm:text-sm py-1.5 px-3 border bg-white"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-xs font-medium text-gray-500">ملاحظات</label>
                      <input 
                        type="text" 
                        defaultValue={exercise.notes}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-brand-500 focus:border-brand-500 sm:text-sm py-1.5 px-3 border bg-white"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
