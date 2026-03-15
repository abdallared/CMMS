import { Link } from 'react-router';
import { Activity, Calendar, Users, Clock } from 'lucide-react';

export function Home() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans" dir="rtl">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 text-brand-600">
            <Activity className="w-8 h-8" />
            <span className="text-xl font-bold">عيادة العلاج الطبيعي</span>
          </div>
          <nav className="flex gap-4">
            <Link to="/login" className="text-gray-600 hover:text-brand-600 font-medium">تسجيل الدخول للكادر</Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <main>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
              <span className="block">رحلة تعافيك تبدأ هنا</span>
              <span className="block text-brand-600 mt-2">نظام متكامل للعلاج الطبيعي</span>
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              احجز موعدك الآن مع أفضل الاستشاريين والأخصائيين. نوفر لك بروتوكولات علاجية مخصصة ومتابعة مستمرة لحالتك.
            </p>
            <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
              <div className="rounded-md shadow">
                <Link
                  to="/book"
                  className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-brand-600 hover:bg-brand-700 md:py-4 md:text-lg md:px-10"
                >
                  احجز موعدك الآن
                </Link>
              </div>
              <div className="mt-3 rounded-md shadow sm:mt-0 sm:mr-3">
                <Link
                  to="/login"
                  className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-brand-600 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10"
                >
                  متابعة حالتي
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="bg-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              <div className="text-center p-6 rounded-xl bg-brand-50">
                <div className="w-12 h-12 mx-auto bg-brand-100 text-brand-600 rounded-full flex items-center justify-center mb-4">
                  <Calendar className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">حجز سهل وسريع</h3>
                <p className="text-gray-500">احجز موعدك في ثوانٍ معدودة واحصل على رقم دورك مباشرة.</p>
              </div>
              <div className="text-center p-6 rounded-xl bg-brand-50">
                <div className="w-12 h-12 mx-auto bg-brand-100 text-brand-600 rounded-full flex items-center justify-center mb-4">
                  <Users className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">نخبة من الأطباء</h3>
                <p className="text-gray-500">استشاريون وأخصائيون ذوو خبرة عالية في جميع التخصصات.</p>
              </div>
              <div className="text-center p-6 rounded-xl bg-brand-50">
                <div className="w-12 h-12 mx-auto bg-brand-100 text-brand-600 rounded-full flex items-center justify-center mb-4">
                  <Clock className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">متابعة مستمرة</h3>
                <p className="text-gray-500">بروتوكولات علاجية مخصصة ومتابعة دقيقة لتقدم حالتك.</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
