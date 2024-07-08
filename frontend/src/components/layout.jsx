import React from 'react';
import Sidebar from './sideBar';

const Layout = ({ children }) => {
  return (
    <div className="flex h-screen"> {/* Ensure full height layout */}
      <Sidebar />
      <div className="flex-1 overflow-y-auto bg-gray-100"> {/* Allow main content to scroll */}
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
