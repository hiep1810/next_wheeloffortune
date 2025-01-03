import Link from 'next/link';
import { FaGithub } from 'react-icons/fa';
import { GiGamepad } from 'react-icons/gi';

const Header = () => {
  return (
    <header className="w-full bg-gray-800 text-white py-4 px-6 flex items-center justify-between">
      <div className="flex items-center">
        <Link 
          href="/" 
          className="text-2xl font-bold bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 
                     text-transparent bg-clip-text hover:from-yellow-500 hover:via-pink-600 
                     hover:to-purple-600 transition-all duration-300"
        >
          Wheel of Fortune
        </Link>
      </div>

      <div className="flex items-center space-x-6">
        <Link href="/play" className="flex items-center space-x-2 hover:text-gray-300">
          <GiGamepad className="text-xl" />
          <span>Play Game !</span>
        </Link>
        
        <Link 
          href="https://github.com/hiep1810/next_wheeloffortune" 
          target="_blank"
          className="flex items-center space-x-2 hover:text-gray-300"
        >
          <FaGithub className="text-xl" />
          <span>GitHub</span>
        </Link>
      </div>
    </header>
  );
};

export default Header; 