/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route, Navigate } from 'react-router';
import { Layout } from './components/Layout';
import { Login } from './pages/Login';
import { Home } from './pages/Home';
import { Booking } from './pages/Booking';

// Role Dashboards
import { AdminDashboard } from './pages/admin/Dashboard';
import { SecretaryDashboard } from './pages/secretary/Dashboard';
import { ConsultantDashboard } from './pages/consultant/Dashboard';
import { ProtocolBuilder } from './pages/consultant/ProtocolBuilder';
import { TherapistDashboard } from './pages/therapist/Dashboard';
import { SessionLogger } from './pages/therapist/SessionLogger';
import { PatientDashboard } from './pages/patient/Dashboard';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/book" element={<Booking />} />
        
        <Route element={<Layout />}>
          {/* Admin Routes */}
          <Route path="/admin" element={<AdminDashboard />} />
          
          {/* Secretary Routes */}
          <Route path="/secretary" element={<SecretaryDashboard />} />
          <Route path="/secretary/queue" element={<SecretaryDashboard />} />
          
          {/* Consultant Routes */}
          <Route path="/consultant" element={<ConsultantDashboard />} />
          <Route path="/consultant/protocols" element={<ProtocolBuilder />} />
          
          {/* Therapist Routes */}
          <Route path="/therapist" element={<TherapistDashboard />} />
          <Route path="/therapist/sessions" element={<SessionLogger />} />
          
          {/* Patient Routes */}
          <Route path="/patient" element={<PatientDashboard />} />
        </Route>
        
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
