import React, { useState } from 'react';
import AppShell from './components/AppShell';
import HeroCover from './components/HeroCover';
import LoginSection from './components/LoginSection';
import YearSelector from './components/YearSelector';
import AttendanceCalculator from './components/AttendanceCalculator';
import ErrorBoundary from './components/ErrorBoundary';

// AttendanceDoc — Single dynamic screen with global state
export default function App() {
  // Global States
  const [userMode, setUserMode] = useState('none'); // 'signup' | 'signin' | 'guest' | 'none'
  const [isGuest, setIsGuest] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null); // object
  const [selectedYear, setSelectedYear] = useState(null); // number
  const [attendanceDate, setAttendanceDate] = useState(''); // date string (HTML date)
  const [subjectsList, setSubjectsList] = useState([]); // array
  const [classesAttended, setClassesAttended] = useState({}); // map of number
  const [classesHeld, setClassesHeld] = useState({}); // map of number
  const [classesRemaining, setClassesRemaining] = useState({}); // map of number

  // Local storage persistence (optional UX enhancement)
  React.useEffect(() => {
    try {
      const saved = localStorage.getItem('attendancedoc_session');
      if (!saved) return;
      const s = JSON.parse(saved);
      setIsGuest(!!s.isGuest);
      setLoggedInUser(s.loggedInUser || null);
      setSelectedYear(s.selectedYear || null);
      setAttendanceDate(s.attendanceDate || '');
      setSubjectsList(Array.isArray(s.subjectsList) ? s.subjectsList : []);
      setClassesAttended(s.classesAttended || {});
      setClassesHeld(s.classesHeld || {});
      setClassesRemaining(s.classesRemaining || {});
    } catch (e) {
      // ignore
    }
  }, []);

  React.useEffect(() => {
    const payload = {
      isGuest,
      loggedInUser,
      selectedYear,
      attendanceDate,
      subjectsList,
      classesAttended,
      classesHeld,
      classesRemaining,
    };
    try {
      localStorage.setItem('attendancedoc_session', JSON.stringify(payload));
    } catch (e) {
      // ignore storage errors
    }
  }, [isGuest, loggedInUser, selectedYear, attendanceDate, subjectsList, classesAttended, classesHeld, classesRemaining]);

  // Mock DB in localStorage for demo purpose (Users table)
  const USERS_KEY = 'attendancedoc_users_table';
  const readUsers = () => {
    try {
      const s = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
      return Array.isArray(s) ? s : [];
    } catch {
      return [];
    }
  };
  const writeUsers = (rows) => {
    try { localStorage.setItem(USERS_KEY, JSON.stringify(rows)); } catch {}
  };
  const createUser = (payload) => {
    const rows = readUsers();
    const exists = rows.find((r) => r.email === payload.email);
    if (exists) throw new Error('Email already registered');
    const now = new Date().toISOString();
    const rec = {
      id: (typeof crypto !== 'undefined' && crypto.randomUUID) ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`,
      name: payload.name,
      roll_number: payload.roll_number,
      email: payload.email,
      password: payload.password,
      year: null,
      created_at: now,
    };
    rows.push(rec);
    writeUsers(rows);
    return rec;
  };
  const findUser = ({ email, password }) => {
    const rows = readUsers();
    return rows.find((r) => r.email === email && r.password === password) || null;
  };
  const updateUser = (id, patch) => {
    const rows = readUsers();
    const idx = rows.findIndex((r) => r.id === id);
    if (idx >= 0) {
      rows[idx] = { ...rows[idx], ...patch };
      writeUsers(rows);
      return rows[idx];
    }
    return null;
  };

  // Handlers for auth
  const handleSignup = (data) => {
    try {
      const rec = createUser(data);
      setLoggedInUser(rec);
      setIsGuest(false);
      setUserMode('signup');
    } catch (e) {
      alert(e.message);
    }
  };
  const handleSignin = (data) => {
    const rec = findUser(data);
    if (!rec) return alert('Invalid credentials');
    setLoggedInUser(rec);
    setIsGuest(false);
    setUserMode('signin');
  };
  const handleGuest = () => {
    setIsGuest(true);
    setLoggedInUser({ name: 'Guest User' });
    setUserMode('guest');
  };
  const handleLogout = () => {
    setIsGuest(false);
    setLoggedInUser(null);
    setUserMode('none');
    setSelectedYear(null);
    setSubjectsList([]);
    setClassesAttended({});
    setClassesHeld({});
    setClassesRemaining({});
  };

  // After selecting year
  const onSelectYear = (year, subjects) => {
    setSelectedYear(year);
    setSubjectsList(subjects);
    if (loggedInUser && !isGuest && loggedInUser.id) {
      const updated = updateUser(loggedInUser.id, { year });
      if (updated) setLoggedInUser(updated);
    }
  };

  const showLogin = !loggedInUser;
  const showYear = !!loggedInUser && !selectedYear;
  const showAttendance = !!selectedYear;

  return (
    <AppShell user={loggedInUser} onLogout={handleLogout}>
      <ErrorBoundary>
        <HeroCover />
      </ErrorBoundary>

      {/* Login Section */}
      <LoginSection visible={showLogin} onSignup={handleSignup} onSignin={handleSignin} onGuest={handleGuest} />

      {/* Year Selection */}
      <YearSelector visible={showYear} isGuest={isGuest} onSelect={onSelectYear} />

      {/* Attendance Section */}
      <AttendanceCalculator
        visible={showAttendance}
        attendanceDate={attendanceDate}
        setAttendanceDate={setAttendanceDate}
        subjectsList={subjectsList}
        classesAttended={classesAttended}
        classesHeld={classesHeld}
        classesRemaining={classesRemaining}
        setClassesAttended={setClassesAttended}
        setClassesHeld={setClassesHeld}
        setClassesRemaining={setClassesRemaining}
      />

      {/* Helper note */}
      <div className="mx-auto my-10 w-full max-w-5xl px-4 text-center text-xs text-gray-500">
        This is a single, dynamic screen app. Data persists locally for demo. Use the controls above to manage your session.
      </div>
    </AppShell>
  );
}
