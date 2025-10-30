'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { Menu, X, Bot, Wallet, User } from 'lucide-react';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <Bot className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">MacroMagent</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium">
              Home
            </Link>
            <Link href="/agents" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium">
              Agents
            </Link>
            <Link href="/dashboard" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium">
              Dashboard
            </Link>
            <Link href="/staking" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium">
              THA Staking
            </Link>
            <div className="flex items-center space-x-4 ml-4">
              <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                <Wallet className="h-4 w-4" />
                <span>Connect Wallet</span>
              </button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-200">
            <Link href="/" className="text-gray-700 hover:text-blue-600 block px-3 py-2 text-base font-medium">
              Home
            </Link>
            <Link href="/agents" className="text-gray-700 hover:text-blue-600 block px-3 py-2 text-base font-medium">
              Agents
            </Link>
            <Link href="/dashboard" className="text-gray-700 hover:text-blue-600 block px-3 py-2 text-base font-medium">
              Dashboard
            </Link>
            <Link href="/staking" className="text-gray-700 hover:text-blue-600 block px-3 py-2 text-base font-medium">
              THA Staking
            </Link>
            <div className="px-3 py-2">
              <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors w-full justify-center">
                <Wallet className="h-4 w-4" />
                <span>Connect Wallet</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}