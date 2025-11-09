import React, { useMemo, useState } from 'react';

export default function LoginSection({
  visible,
  onSignup,
  onSignin,
  onGuest,
}) {
  const [tab, setTab] = useState('signup');

  const [su, setSu] = useState({ name: '', roll_number: '', email: '', password: '' });
  const [si, setSi] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});

  const isVisible = useMemo(() => !!visible, [visible]);
  if (!isVisible) return null;

  const validateEmail = (email) => /[^\s@]+@[^\s@]+\.[^\s@]+/.test(email);

  const handleSignup = () => {
    const e = {};
    if (!su.name.trim()) e.name = 'Name is required';
    if (!su.roll_number.trim()) e.roll_number = 'Roll number is required';
    if (!validateEmail(su.email)) e.email = 'Valid email required';
    if (su.password.length < 6) e.password = 'Min 6 characters';
    setErrors(e);
    if (Object.keys(e).length) return;
    onSignup({ ...su });
  };

  const handleSignin = () => {
    const e = {};
    if (!validateEmail(si.email)) e.email = 'Valid email required';
    if (!si.password) e.password = 'Password required';
    setErrors(e);
    if (Object.keys(e).length) return;
    onSignin({ ...si });
  };

  const inputClass =
    'w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500';

  return (
    <section className="mx-auto w-full max-w-5xl px-4 sm:px-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <div className="flex gap-2 rounded-xl bg-gray-100 p-1 text-sm">
            {['signup', 'signin'].map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`flex-1 rounded-lg px-4 py-2 font-medium transition ${
                  tab === t ? 'bg-white shadow' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {t === 'signup' ? 'Sign Up' : 'Sign In'}
              </button>
            ))}
          </div>

          {tab === 'signup' ? (
            <div className="mt-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-xs font-medium text-gray-600">Name</label>
                  <input className={inputClass} value={su.name} onChange={(e) => setSu({ ...su, name: e.target.value })} />
                  {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name}</p>}
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-gray-600">Roll Number</label>
                  <input className={inputClass} value={su.roll_number} onChange={(e) => setSu({ ...su, roll_number: e.target.value })} />
                  {errors.roll_number && <p className="mt-1 text-xs text-red-600">{errors.roll_number}</p>}
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-gray-600">Email</label>
                  <input className={inputClass} value={su.email} onChange={(e) => setSu({ ...su, email: e.target.value })} />
                  {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-gray-600">Password</label>
                  <input type="password" className={inputClass} value={su.password} onChange={(e) => setSu({ ...su, password: e.target.value })} />
                  {errors.password && <p className="mt-1 text-xs text-red-600">{errors.password}</p>}
                </div>
              </div>
              <div className="mt-4 flex justify-end">
                <button onClick={handleSignup} className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
                  Create Account
                </button>
              </div>
            </div>
          ) : (
            <div className="mt-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-xs font-medium text-gray-600">Email</label>
                  <input className={inputClass} value={si.email} onChange={(e) => setSi({ ...si, email: e.target.value })} />
                  {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-gray-600">Password</label>
                  <input type="password" className={inputClass} value={si.password} onChange={(e) => setSi({ ...si, password: e.target.value })} />
                  {errors.password && <p className="mt-1 text-xs text-red-600">{errors.password}</p>}
                </div>
              </div>
              <div className="mt-4 flex justify-end">
                <button onClick={handleSignin} className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
                  Sign In
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="md:col-span-1">
          <div className="mt-0 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
            <h3 className="text-sm font-semibold text-gray-800">Or continue as guest</h3>
            <p className="mt-1 text-xs text-gray-600">Jump right in without creating an account.</p>
            <button
              onClick={onGuest}
              className="mt-3 w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-50"
            >
              Continue as Guest
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
