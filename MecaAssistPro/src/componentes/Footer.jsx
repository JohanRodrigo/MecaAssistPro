import React from 'react'

export const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
      <footer className="footer bg-gray-800 py-4 px-8 flex items-center justify-center fixed bottom-0 w-full">
          <p className="text-white">© {currentYear} MecaAssistPro</p>
      </footer>
    );
}
