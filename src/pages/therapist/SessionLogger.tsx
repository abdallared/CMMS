import { useState } from 'react';
import { Save, Activity, CheckCircle, AlertTriangle } from 'lucide-react';

export function SessionLogger() {
  const [painLevel, setPainLevel] = useState(5);
  const [progress, setProgress] = useState('same'); // improved, same, worse
  const [notes, setNotes] = useState('');

  const exercises = [
    { id: 1, name: 'تمارين إطالة أسفل الظهر', duration: '15 دقيقة', completed: true },
    { id: 2, name: 'تقوية عضلات البطن (Core)', duration: '10 دقائق', completed: false },
    { id: 3, name: 'علاج كهربائي (TENS)', duration: '20 دقيقة', completed: false },
  ];

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">تسجيل جلسة علاجية</h1>
          <p className="mt-1 text-sm text-gray-500">مريض: أحمد محمد - الجلسة 1 من 12</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-brand-600 text-white rounded-md hover:bg-brand-700">
          <Save className="w-4 h-4" />
          حفظ وإنهاء الجلسة
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Exercises Checklist */}
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4 border-b pb-2">التمارين المقررة (البروتوكول)</h3>
          <div className="space-y-3">
            {exercises.map((ex) => (
              <div key={ex.id} className="flex items-start gap-3 p-3 border rounded-lg hover:bg-gray-50">
                <div className="flex items-center h-5">
                  <input
                    id={`exercise-${ex.id}`}
                    type="checkbox"
                    defaultChecked={ex.completed}
                    className="focus:ring-brand-500 h-4 w-4 text-brand-600 border-gray-300 rounded"
                  />
                </div>
                <div className="flex-1">
                  <label htmlFor={`exercise-${ex.id}`} className="font-medium text-gray-700 cursor-pointer">
                    {ex.name}
                  </label>
                  <p className="text-xs text-gray-500 mt-1">{ex.duration}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Session Evaluation */}
        <div className="bg-white shadow rounded-lg p-6 space-y-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4 border-b pb-2">تقييم الجلسة</h3>
          
          {/* Pain Level */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 flex justify-between">
              <span>مستوى الألم بعد الجلسة</span>
              <span className="text-brand-600 font-bold">{painLevel} / 10</span>
            </label>
            <input
              type="range"
              min="0"
              max="10"
              value={painLevel}
              onChange={(e) => setPainLevel(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>بدون ألم (0)</span>
              <span>ألم شديد (10)</span>
            </div>
          </div>

          {/* Progress */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">استجابة المريض للجلسة</label>
            <div className="grid grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => setProgress('improved')}
                className={`flex flex-col items-center justify-center p-3 border rounded-lg ${
                  progress === 'improved' ? 'bg-green-50 border-green-500 text-green-700' : 'bg-white text-gray-500'
                }`}
              >
                <CheckCircle className="w-6 h-6 mb-1" />
                <span className="text-xs font-medium">تحسن</span>
              </button>
              <button
                type="button"
                onClick={() => setProgress('same')}
                className={`flex flex-col items-center justify-center p-3 border rounded-lg ${
                  progress === 'same' ? 'bg-blue-50 border-blue-500 text-blue-700' : 'bg-white text-gray-500'
                }`}
              >
                <Activity className="w-6 h-6 mb-1" />
                <span className="text-xs font-medium">نفس الحالة</span>
              </button>
              <button
                type="button"
                onClick={() => setProgress('worse')}
                className={`flex flex-col items-center justify-center p-3 border rounded-lg ${
                  progress === 'worse' ? 'bg-red-50 border-red-500 text-red-700' : 'bg-white text-gray-500'
                }`}
              >
                <AlertTriangle className="w-6 h-6 mb-1" />
                <span className="text-xs font-medium">زيادة الألم</span>
              </button>
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">ملاحظات الأخصائي</label>
            <textarea
              rows={4}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="shadow-sm focus:ring-brand-500 focus:border-brand-500 block w-full sm:text-sm border-gray-300 rounded-md py-2 px-3 border"
              placeholder="سجل أي ملاحظات حول أداء المريض للتمارين، الصعوبات، أو توصيات للجلسة القادمة..."
            />
          </div>
        </div>
      </div>
    </div>
  );
}
