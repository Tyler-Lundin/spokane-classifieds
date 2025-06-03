"use client";

export default function InTheDark() {
    return (
        <span className="hidden dark:block absolute -bottom-2 -right-2">
        <span className="relative inline-block">
          <span className="text-white font-thin text-2xl tracking-wider animate-pulse" style={{
            textShadow: '0 0 5px #fff, 0 0 10px #fff, 0 0 15px #fff, 0 0 20px #ff00de, 0 0 35px #ff00de, 0 0 40px #ff00de, 0 0 50px #ff00de, 0 0 75px #ff00de',
            animation: 'neon 1.5s ease-in-out infinite alternate'
          }}>
            in the dark
          </span>
          <style jsx>{`
            @keyframes neon {
              from {
                text-shadow: 0 0 5px #fff, 0 0 10px #fff, 0 0 15px #fff, 0 0 20px #ff00de, 0 0 35px #ff00de, 0 0 40px #ff00de, 0 0 50px #ff00de, 0 0 75px #ff00de;
              }
              to {
                text-shadow: 0 0 2.5px #fff, 0 0 5px #fff, 0 0 7.5px #fff, 0 0 10px #ff00de, 0 0 17.5px #ff00de, 0 0 20px #ff00de, 0 0 25px #ff00de, 0 0 37.5px #ff00de;
              }
            }
          `}</style>
        </span>
      </span>
    )
}