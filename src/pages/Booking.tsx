import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { useStore } from '../store/useStore';
import { Calendar, Clock, User, Phone, CheckCircle } from 'lucide-react';

export function Booking() {
  const [step, setStep] = useState(1);
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [isNewPatient, setIsNewPatient] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [queueNumber, setQueueNumber] = useState<number | null>(null);
  
  const { users, addAppointment } = useStore();
  const navigate = useNavigate();

  const consultants = users.filter(u => u.role === 'consultant');

  const handleCheckPatient = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock check
    if (phone === '01000000004') {
      setIsNewPatient(false);
      setName('المريض الأول');
      setStep(3); // Skip medical history for existing
    } else {
      setIsNewPatient(true);
      setStep(2); // Go to medical history
    }
  };

  const handleMedicalHistorySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(3);
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!consultants[0]) return;
    
    // Mock booking
    const newQueueNum = Math.floor(Math.random() * 20) + 1;
    addAppointment({
      patient_id: 'new_patient_id',
      doctor_id: consultants[0].id,
      date: selectedDate,
      time: selectedTime,
      status: 'scheduled'
    });
    
    setQueueNumber(newQueueNum);
    setStep(4);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8" dir="rtl">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900">حجز موعد جديد</h2>
          <p className="mt-2 text-gray-600">احجز موعدك مع استشاري العلاج الطبيعي</p>
        </div>

        <div className="bg-white shadow rounded-lg p-6 sm:p-8">
          {/* Step 1: Check Patient */}
          {step === 1 && (
            <form onSubmit={handleCheckPatient} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">رقم الهاتف</label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <Phone className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="focus:ring-brand-500 focus:border-brand-500 block w-full pr-10 sm:text-sm border-gray-300 rounded-md py-3 border"
                    placeholder="أدخل رقم هاتفك"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-brand-600 hover:bg-brand-700"
              >
                متابعة
              </button>
            </form>
          )}

          {/* Step 2: Medical History (New Patient) */}
          {step === 2 && (
            <form onSubmit={handleMedicalHistorySubmit} className="space-y-6">
              <h3 className="text-lg font-medium text-gray-900 border-b pb-2">التاريخ المرضي (مريض جديد)</h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">الاسم الثلاثي</label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="focus:ring-brand-500 focus:border-brand-500 block w-full pr-10 sm:text-sm border-gray-300 rounded-md py-2 border"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">الشكوى الحالية</label>
                <textarea
                  required
                  rows={3}
                  className="mt-1 focus:ring-brand-500 focus:border-brand-500 block w-full sm:text-sm border-gray-300 rounded-md py-2 border px-3"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">أمراض مزمنة (إن وجد)</label>
                <textarea
                  rows={2}
                  className="mt-1 focus:ring-brand-500 focus:border-brand-500 block w-full sm:text-sm border-gray-300 rounded-md py-2 border px-3"
                />
              </div>

              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="w-1/3 flex justify-center py-3 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  رجوع
                </button>
                <button
                  type="submit"
                  className="w-2/3 flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-brand-600 hover:bg-brand-700"
                >
                  التالي
                </button>
              </div>
            </form>
          )}

          {/* Step 3: Select Date & Time */}
          {step === 3 && (
            <form onSubmit={handleBookingSubmit} className="space-y-6">
              <div className="bg-brand-50 p-4 rounded-md mb-6">
                <p className="text-brand-800 font-medium">مرحباً بك، {name}</p>
                <p className="text-sm text-brand-600">يرجى اختيار الموعد المناسب للكشف مع الاستشاري</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">تاريخ الحجز</label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <Calendar className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="date"
                    required
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="focus:ring-brand-500 focus:border-brand-500 block w-full pr-10 sm:text-sm border-gray-300 rounded-md py-2 border"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">الوقت</label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <Clock className="h-5 w-5 text-gray-400" />
                  </div>
                  <select
                    required
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)}
                    className="focus:ring-brand-500 focus:border-brand-500 block w-full pr-10 sm:text-sm border-gray-300 rounded-md py-2 border"
                  >
                    <option value="">اختر الوقت</option>
                    <option value="10:00">10:00 صباحاً</option>
                    <option value="11:00">11:00 صباحاً</option>
                    <option value="12:00">12:00 مساءً</option>
                    <option value="13:00">01:00 مساءً</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setStep(isNewPatient ? 2 : 1)}
                  className="w-1/3 flex justify-center py-3 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  رجوع
                </button>
                <button
                  type="submit"
                  className="w-2/3 flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-brand-600 hover:bg-brand-700"
                >
                  تأكيد الحجز
                </button>
              </div>
            </form>
          )}

          {/* Step 4: Confirmation */}
          {step === 4 && (
            <div className="text-center space-y-6 py-8">
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100">
                <CheckCircle className="h-10 w-10 text-green-600" />
              </div>
              
              <div>
                <h3 className="text-2xl font-bold text-gray-900">تم تأكيد حجزك بنجاح</h3>
                <p className="mt-2 text-gray-600">ننتظرك في الموعد المحدد</p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 inline-block text-right w-full max-w-sm">
                <div className="flex justify-between border-b pb-3 mb-3">
                  <span className="text-gray-500">الاسم</span>
                  <span className="font-medium">{name}</span>
                </div>
                <div className="flex justify-between border-b pb-3 mb-3">
                  <span className="text-gray-500">التاريخ</span>
                  <span className="font-medium">{selectedDate}</span>
                </div>
                <div className="flex justify-between border-b pb-3 mb-3">
                  <span className="text-gray-500">الوقت</span>
                  <span className="font-medium">{selectedTime}</span>
                </div>
                <div className="flex justify-between items-center bg-brand-50 p-3 rounded-md">
                  <span className="text-brand-800 font-bold">رقم الدور</span>
                  <span className="text-3xl font-black text-brand-600">{queueNumber}</span>
                </div>
              </div>

              <div className="pt-6">
                <button
                  onClick={() => navigate('/')}
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-brand-600 hover:bg-brand-700"
                >
                  العودة للرئيسية
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
