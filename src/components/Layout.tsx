import { Outlet, Navigate, Link, useLocation } from 'react-router';
import { useStore } from '../store/useStore';
import { 
  LayoutDashboard, 
  Calendar, 
  Users, 
  FileText, 
  Settings, 
  LogOut,
  Activity,
  Menu,
  X
} from 'lucide-react';
import { useState } from 'react';
import { cn } from '../lib/utils';

export function Layout() {
  const { currentUser, logout } = useStore();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  const getNavItems = () => {
    switch (currentUser.role) {
      case 'admin':
        return [
          { name: 'لوحة التحكم', href: '/admin', icon: LayoutDashboard },
          { name: 'المستخدمين', href: '/admin/users', icon: Users },
          { name: 'التقارير', href: '/admin/reports', icon: FileText },
          { name: 'الإعدادات', href: '/admin/settings', icon: Settings },
        ];
      case 'secretary':
        return [
          { name: 'الحجوزات', href: '/secretary', icon: Calendar },
          { name: 'قائمة الانتظار', href: '/secretary/queue', icon: Users },
        ];
      case 'consultant':
        return [
          { name: 'الحالات الجديدة', href: '/consultant', icon: Users },
          { name: 'البروتوكولات', href: '/consultant/protocols', icon: FileText },
          { name: 'مكتبة التشريح', href: '/consultant/anatomy', icon: Activity },
          { name: 'المراجعات', href: '/consultant/reviews', icon: Calendar },
        ];
      case 'therapist':
        return [
          { name: 'جدول المرضى', href: '/therapist', icon: Calendar },
          { name: 'البروتوكولات المعلقة', href: '/therapist/pending', icon: FileText },
          { name: 'الجلسات اليومية', href: '/therapist/sessions', icon: Activity },
        ];
      case 'patient':
        return [
          { name: 'المواعيد القادمة', href: '/patient', icon: Calendar },
          { name: 'التاريخ المرضي', href: '/patient/history', icon: FileText },
          { name: 'التقدم العلاجي', href: '/patient/progress', icon: Activity },
        ];
      default:
        return [];
    }
  };

  const navItems = getNavItems();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row" dir="rtl">
      {/* Mobile Header */}
      <div className="md:hidden bg-white border-b p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-brand-600">عيادة العلاج الطبيعي</h1>
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2">
          {isSidebarOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Sidebar */}
      <aside className={cn(
        "bg-white w-64 border-l min-h-screen flex-col fixed md:sticky top-0 z-50 transition-transform duration-300",
        isSidebarOpen ? "translate-x-0" : "translate-x-full md:translate-x-0"
      )}>
        <div className="p-6 border-b hidden md:block">
          <h1 className="text-2xl font-bold text-brand-600">عيادة العلاج الطبيعي</h1>
        </div>
        
        <div className="p-4 border-b">
          <div className="font-medium text-gray-900">{currentUser.full_name}</div>
          <div className="text-sm text-gray-500 capitalize">{currentUser.role}</div>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => setIsSidebarOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                  isActive 
                    ? "bg-brand-50 text-brand-700" 
                    : "text-gray-700 hover:bg-gray-100"
                )}
              >
                <item.icon className="w-5 h-5" />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t">
          <button
            onClick={logout}
            className="flex items-center gap-3 px-3 py-2 w-full rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            تسجيل الخروج
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
