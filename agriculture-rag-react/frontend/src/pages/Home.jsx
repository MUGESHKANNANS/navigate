import React, { useState } from 'react';
import ChatInterface from '../components/ChatInterface';
import MovingDots from '../components/MovingDots';
import { HiMenuAlt2 } from 'react-icons/hi';
import { FiMessageSquare, FiUpload, FiSearch, FiSettings } from 'react-icons/fi';

const Home = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const menuItems = [
    { icon: <FiMessageSquare />, text: 'Chat Analysis' },
    { icon: <FiUpload />, text: 'Upload Documents' },
    { icon: <FiSearch />, text: 'Search Documents' },
    { icon: <FiSettings />, text: 'Settings' },
  ];

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex min-h-screen bg-background text-text overflow-hidden">
      <MovingDots />

      {/* Sidebar Toggle Button - Always visible */}
      <button 
        className="fixed top-4 left-4 z-50 p-2.5 bg-sidebar/80 backdrop-blur-sm rounded-lg text-accent hover:text-primary transition-colors shadow-lg"
        onClick={toggleSidebar}
      >
        <HiMenuAlt2 size={24} />
      </button>

      {/* Sidebar */}
      <aside 
        className={`fixed lg:relative h-screen z-40 bg-sidebar/95 backdrop-blur-sm shadow-2xl transition-all duration-300 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:w-72'
        }`}
      >
        <div className="flex flex-col h-full w-72 p-6">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <img 
                src="https://framerusercontent.com/images/4CxS9YFB1XivL2va3c8XaJp4g.png" 
                alt="Logo" 
                className="w-10 h-10"
              />
              <h2 className="text-xl font-bold text-accent">AgriDoc AI</h2>
            </div>
          </div>

          <nav className="flex-1">
            <ul className="space-y-2">
              {menuItems.map((item, index) => (
                <li key={index}>
                  <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-text/70 hover:bg-primary/20 hover:text-accent transition-all group">
                    <span className="text-xl group-hover:scale-110 transition-transform">
                      {item.icon}
                    </span>
                    {item.text}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <div className="mt-auto pt-6 border-t border-border/30">
            <div className="bg-primary/10 rounded-xl p-4">
              <h3 className="text-accent font-semibold mb-2">Pro Features</h3>
              <p className="text-sm text-text/70 mb-3">Unlock advanced analysis and unlimited document processing</p>
              <button className="w-full bg-accent hover:bg-primary text-white py-2 rounded-lg transition-all transform hover:scale-105">
                Upgrade Now
              </button>
            </div>
          </div>
        </div>
      </aside>
      
      {/* Main Content */}
      <main className="flex-1 relative w-full min-h-screen overflow-hidden">
        <div className="p-4 lg:p-6 w-full max-w-[1600px] mx-auto">
          <ChatInterface isSidebarOpen={isSidebarOpen} />
        </div>
      </main>

      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default Home;