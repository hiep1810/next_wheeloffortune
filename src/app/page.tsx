'use client';

export default function Home() {
  return (
    <main className="h-full">
      <div className="h-full container mx-auto px-4">
        <section className="h-full flex flex-col items-center justify-center text-white">
          <h1 className="text-6xl font-bold mb-8 text-center animate-fade-in text-2xl bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 
                     text-transparent bg-clip-text hover:from-yellow-500 hover:via-pink-600 
                     hover:to-purple-600 transition-all duration-300">
            Wheel of Fortune
          </h1>
          <p className="text-xl mb-12 text-center max-w-2xl animate-fade-in-delay">
            Spin the wheel and test your luck! Win amazing rewards and compete with others.
          </p>
          <a
            href="/play"
            className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-3 px-8 rounded-full 
                     transform hover:scale-105 transition-all duration-300 animate-bounce"
          >
            Start Game
          </a>
        </section>
      </div>
    </main>
  );
} 