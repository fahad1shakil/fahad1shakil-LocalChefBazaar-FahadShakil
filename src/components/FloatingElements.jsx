import React from 'react';

const FloatingElements = () => {
  const elements = [
    { type: 'leaf', top: '12%', left: '8%', size: 'w-16 h-16', duration: '18s', delay: '0s', rotate: 'rotate-12' },
    { type: 'anise', top: '28%', right: '10%', size: 'w-12 h-12', duration: '22s', delay: '2s', rotate: '-rotate-45' },
    { type: 'orb', top: '48%', left: '18%', size: 'w-32 h-32', duration: '25s', delay: '1s', color: 'bg-green-400/20' },
    { type: 'leaf', top: '68%', right: '15%', size: 'w-20 h-20', duration: '20s', delay: '5s', rotate: 'rotate-90' },
    { type: 'anise', top: '82%', left: '35%', size: 'w-14 h-14', duration: '24s', delay: '3s', rotate: 'rotate-180' },
    { type: 'orb', top: '18%', right: '28%', size: 'w-24 h-24', duration: '32s', delay: '0s', color: 'bg-orange-300/20' },
    { type: 'leaf', top: '58%', left: '10%', size: 'w-14 h-14', duration: '19s', delay: '7s', rotate: '-rotate-12' },
    { type: 'orb', top: '88%', right: '22%', size: 'w-40 h-40', duration: '30s', delay: '4s', color: 'bg-green-300/10' },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none -z-40 overflow-hidden hidden md:block select-none">
      <style>
        {`
          @keyframes float-drift {
            0% { transform: translateY(0) rotate(0deg); }
            50% { transform: translateY(-35px) rotate(12deg); }
            100% { transform: translateY(0) rotate(0deg); }
          }
        `}
      </style>
      {elements.map((el, i) => (
        <div
          key={i}
          className={`absolute opacity-10 dark:opacity-[0.15] ${el.rotate}`}
          style={{
            top: el.top,
            left: el.left,
            right: el.right,
            animation: `float-drift ${el.duration} ease-in-out infinite`,
            animationDelay: el.delay,
          }}
        >
          {el.type === 'leaf' && (
            <svg viewBox="0 0 24 24" fill="currentColor" className="text-[#6db70e] dark:text-[#7ecf55] w-full h-full">
              <path d="M17,8C15,5.41 12.18,4 10,4C7.82,4 4,6.18 4,12C4,17.82 7.82,20 10,20C12.18,20 15,18.59 17,16C19.12,13.26 20,10 20,10C20,10 18.23,9.59 17,8Z" />
            </svg>
          )}
          {el.type === 'anise' && (
            <svg viewBox="0 0 24 24" fill="currentColor" className="text-orange-400/80 dark:text-orange-300/60 w-full h-full">
              <path d="M12,2L13.5,8.5L20,10L13.5,11.5L12,18L10.5,11.5L4,10L10.5,8.5L12,2Z" />
            </svg>
          )}
          {el.type === 'orb' && (
            <div className={`rounded-full blur-3xl ${el.color} ${el.size}`} />
          )}
        </div>
      ))}
    </div>
  );
};

export default FloatingElements;
