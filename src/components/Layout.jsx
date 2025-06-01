import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow p-4 bg-gradient-to-br from-purple-100 to-pink-100">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
