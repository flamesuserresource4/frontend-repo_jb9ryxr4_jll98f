import React, { useEffect, useMemo, useState } from 'react';

export default function YearSelector({ visible, isGuest, onSelect }) {
  const [year, setYear] = useState('');
  const [subjects, setSubjects] = useState([]);

  const isVisible = useMemo(() => !!visible, [visible]);
  if (!isVisible) return null;

  useEffect(() => {
    if (!year) return setSubjects([]);
    if (Number(year) === 1) {
      setSubjects([
        'Anatomy',
        'Anatomy (Lab)',
        'Biochemistry',
        'Biochemistry (Lab)',
        'Physiology',
        'Physiology (Lab)',
      ]);
    } else if (Number(year) === 2) {
      setSubjects([
        'Pathology',
        'Pathology (Lab)',
        'Microbiology',
        'Microbiology (Lab)',
        'Pharmacology',
        'Pharmacology (Lab)',
      ]);
    } else {
      setSubjects(['Subjects not added yet']);
    }
  }, [year]);

  const handleContinue = () => {
    if (!year) return;
    onSelect(Number(year), subjects);
  };

  return (
    <section className="mx-auto mt-6 w-full max-w-3xl px-4 sm:px-6">
      <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-800">Choose your year</h2>
        <p className="mt-1 text-sm text-gray-600">This helps us load the right subjects for you.</p>

        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-xs font-medium text-gray-600">Select Year</label>
            <select
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="" disabled>
                -- choose --
              </option>
              {[1, 2, 3, 4, 5].map((y) => (
                <option key={y} value={y}>
                  Year {y}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-5 flex items-center justify-between gap-3">
          <div className="text-xs text-gray-500">
            {!isGuest ? 'Your year will be saved to your profile.' : 'Guest mode won\'t save your year.'}
          </div>
          <button
            onClick={handleContinue}
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
            disabled={!year}
          >
            Continue
          </button>
        </div>
      </div>
    </section>
  );
}
