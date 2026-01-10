"use client";

export function AnimatedBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div 
        className="absolute top-1/6 -right-20 w-96 h-96 bg-purple-600/30 rounded-full blur-3xl animate-blob"
      />
      <div 
        className="absolute bottom-1/5 right-1/2 w-96 h-96 bg-violet-500/20 rounded-full blur-3xl animate-blob animation-delay-2000"
      />
      <div 
        className="absolute top-1/2 right-10 w-96 h-96 bg-indigo-600/25 rounded-full blur-3xl animate-blob animation-delay-4000"
      />
    </div>
  );
}