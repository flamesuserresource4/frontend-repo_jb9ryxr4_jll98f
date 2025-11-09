import React from 'react';
import Spline from '@splinetool/react-spline';

export default function HeroCover() {
  return (
    <section className="relative w-full h-[320px] sm:h-[420px] overflow-hidden rounded-b-2xl">
      <Spline
        scene="https://prod.spline.design/WCoEDSwacOpKBjaC/scene.splinecode"
        style={{ width: '100%', height: '100%' }}
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/10 via-white/30 to-white" />
      <div className="absolute inset-x-0 bottom-4 mx-4 sm:mx-8">
        <div className="backdrop-blur-sm bg-white/70 rounded-xl px-4 py-3 shadow-md max-w-3xl mx-auto">
          <h1 className="text-xl sm:text-2xl font-semibold text-gray-800 tracking-tight">
            AttendanceDoc
          </h1>
          <p className="text-sm sm:text-base text-gray-600">
            One dynamic screen to sign up, sign in, and calculate your attendance health.
          </p>
        </div>
      </div>
    </section>
  );
}
