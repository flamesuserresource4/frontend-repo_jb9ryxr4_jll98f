import React, { useMemo } from 'react';

function formatDay(date) {
  if (!date) return '';
  try {
    const d = new Date(date);
    return d.toLocaleDateString(undefined, { weekday: 'long' });
  } catch (e) {
    return '';
  }
}

export default function AttendanceCalculator({
  visible,
  attendanceDate,
  setAttendanceDate,
  subjectsList,
  classesAttended,
  classesHeld,
  classesRemaining,
  setClassesAttended,
  setClassesHeld,
  setClassesRemaining,
}) {
  const isVisible = useMemo(() => !!visible, [visible]);
  if (!isVisible) return null;

  const card = (item) => {
    const a = Number(classesAttended[item] || 0);
    const h = Number(classesHeld[item] || 0);
    const r = classesRemaining[item] !== undefined && classesRemaining[item] !== '' ? Number(classesRemaining[item]) : undefined;

    const invalid = a > h;

    const isLab = item.includes('(Lab)');
    const minPercent = isLab ? 80 : 75;

    const percentage = h > 0 ? (a / h) * 100 : 0;
    const status = percentage >= minPercent ? 'SAFE' : 'NOT SAFE';

    let maxPossible = undefined;
    let required = 0;
    if (r !== undefined && h >= 0) {
      maxPossible = (a + r) / (h + r) * 100;
      if (100 - minPercent !== 0) {
        required = Math.ceil(((minPercent * h) - (100 * a)) / (100 - minPercent));
      } else {
        required = 0;
      }
    }

    return (
      <div key={item} className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h4 className="text-base font-semibold text-gray-800">{item}</h4>
            <p className="text-xs text-gray-500">{isLab ? 'Lab • Min 80%' : 'Theory • Min 75%'}</p>
          </div>
          <div className={`text-xs font-semibold ${status === 'SAFE' ? 'text-emerald-600' : 'text-amber-600'}`}>{status}</div>
        </div>

        <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-3">
          <div>
            <label className="mb-1 block text-xs font-medium text-gray-600">Classes Attended</label>
            <input
              type="number"
              min="0"
              value={classesAttended[item] ?? ''}
              onChange={(e) => setClassesAttended((prev) => ({ ...prev, [item]: e.target.value }))}
              className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-gray-600">Classes Held</label>
            <input
              type="number"
              min="0"
              value={classesHeld[item] ?? ''}
              onChange={(e) => setClassesHeld((prev) => ({ ...prev, [item]: e.target.value }))}
              className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-gray-600">Classes Remaining</label>
            <input
              type="number"
              min="0"
              value={classesRemaining[item] ?? ''}
              onChange={(e) => setClassesRemaining((prev) => ({ ...prev, [item]: e.target.value }))}
              className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {invalid ? (
          <p className="mt-3 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
            Classes attended cannot be greater than classes held.
          </p>
        ) : (
          <div className="mt-3 space-y-2 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Percentage</span>
              <span className="font-medium text-gray-900">{percentage ? percentage.toFixed(2) : '0.00'}%</span>
            </div>

            {r !== undefined && (
              <div className="rounded-lg bg-gray-50 p-3">
                {maxPossible !== undefined && maxPossible < minPercent ? (
                  <p className="text-amber-700">Even attending all remaining classes cannot reach the minimum requirement.</p>
                ) : required > 0 ? (
                  <p className="text-gray-800">
                    You must attend <span className="font-semibold">{required}</span> out of{' '}
                    <span className="font-semibold">{r}</span> remaining classes.
                  </p>
                ) : (
                  <p className="text-gray-800">
                    You can skip <span className="font-semibold">{Math.abs(required)}</span> out of{' '}
                    <span className="font-semibold">{r}</span> remaining classes.
                  </p>
                )}
              </div>
            )}

            <p className="text-xs text-gray-500">Subject: {item} — {percentage ? percentage.toFixed(2) : '0.00'}% — {status}</p>
          </div>
        )}
      </div>
    );
  };

  return (
    <section className="mx-auto mt-6 w-full max-w-5xl px-4 sm:px-6">
      <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
        <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-lg font-semibold text-gray-800">Attendance Calculator</h2>
            <p className="text-sm text-gray-600">Enter your numbers per subject to see where you stand.</p>
          </div>
          <div className="flex items-center gap-3">
            <input
              type="date"
              value={attendanceDate || ''}
              onChange={(e) => setAttendanceDate(e.target.value)}
              className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="text-sm text-gray-600">Day: {formatDay(attendanceDate)}</div>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {subjectsList.map((item) => card(item))}
        </div>
      </div>
    </section>
  );
}
