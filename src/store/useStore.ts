import { create } from 'zustand';

// Mock Data Types
export type Role = 'admin' | 'secretary' | 'consultant' | 'therapist' | 'patient';

export interface User {
  id: string;
  email: string;
  role: Role;
  full_name: string;
  phone: string;
}

export interface Appointment {
  id: string;
  patient_id: string;
  doctor_id: string;
  date: string;
  time: string;
  status: 'scheduled' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled';
  queue_number: number;
}

interface StoreState {
  currentUser: User | null;
  users: User[];
  appointments: Appointment[];
  login: (email: string, role: Role) => void;
  logout: () => void;
  addAppointment: (appointment: Omit<Appointment, 'id' | 'queue_number'>) => void;
}

export const useStore = create<StoreState>((set) => ({
  currentUser: null,
  users: [
    { id: '1', email: 'admin@clinic.com', role: 'admin', full_name: 'مدير النظام', phone: '01000000000' },
    { id: '2', email: 'sec@clinic.com', role: 'secretary', full_name: 'السكرتيرة', phone: '01000000001' },
    { id: '3', email: 'consultant@clinic.com', role: 'consultant', full_name: 'د. أحمد (استشاري)', phone: '01000000002' },
    { id: '4', email: 'therapist@clinic.com', role: 'therapist', full_name: 'د. محمد (أخصائي)', phone: '01000000003' },
    { id: '5', email: 'patient@clinic.com', role: 'patient', full_name: 'المريض الأول', phone: '01000000004' },
  ],
  appointments: [],
  login: (email, role) => set((state) => {
    const user = state.users.find(u => u.email === email && u.role === role) || 
                 state.users.find(u => u.role === role); // Fallback to first user of that role
    return { currentUser: user || null };
  }),
  logout: () => set({ currentUser: null }),
  addAppointment: (appointment) => set((state) => ({
    appointments: [
      ...state.appointments,
      {
        ...appointment,
        id: Math.random().toString(36).substr(2, 9),
        queue_number: state.appointments.filter(a => a.date === appointment.date).length + 1,
      }
    ]
  })),
}));
