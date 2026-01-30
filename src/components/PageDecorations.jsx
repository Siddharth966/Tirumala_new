import React from 'react';

const PageDecorations = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-[45]">
      {/* Intense Vibrant Blue Side Glows - Overlaying content for maximum impact */}
      <div className="absolute top-0 -left-64 sm:-left-96 w-[500px] sm:w-[900px] h-full bg-blue-600/30 sm:bg-blue-600/25 rounded-full blur-[80px] sm:blur-[160px]"></div>
      <div className="absolute top-0 -right-64 sm:-right-96 w-[500px] sm:w-[900px] h-full bg-blue-600/30 sm:bg-blue-600/25 rounded-full blur-[80px] sm:blur-[160px]"></div>

      {/* Subtle Accent Orbs */}
      <div className="absolute top-[20%] -left-32 w-80 h-80 bg-green-500/10 rounded-full blur-[100px] hidden sm:block"></div>
      <div className="absolute top-[65%] -right-32 w-96 h-96 bg-orange-500/10 rounded-full blur-[110px] hidden sm:block"></div>

      {/* Global Dot Grid Pattern - High visibility */}
      <div className="absolute inset-0 opacity-[0.07] sm:opacity-[0.1] bg-[radial-gradient(circle_at_2px_2px,#000_1px,transparent_0)] bg-[length:32px_32px] sm:bg-[length:48px_48px]"></div>
    </div>
  );
};

export default PageDecorations;
