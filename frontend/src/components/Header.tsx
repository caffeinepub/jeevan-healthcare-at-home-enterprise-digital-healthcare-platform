import React, { useState } from 'react';
import { useNavigate, useRouter } from '@tanstack/react-router';
import { ShoppingCart, Menu, X, User, LogOut, LayoutDashboard, Heart, ChevronDown, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useQueryClient } from '@tanstack/react-query';
import { useGetCallerUserProfile } from '../hooks/useQueries';
import { useCart } from '../hooks/useCart';
import { Badge } from '@/components/ui/badge';

const NAV_LINKS = [
  { label: 'Home', path: '/' },
  { label: 'Services', path: '/services/home-healthcare' },
  { label: 'Tests & Packages', path: '/tests' },
  { label: 'Health', path: '/health' },
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' },
];

export default function Header() {
  const navigate = useNavigate();
  const { login, clear, loginStatus, identity } = useInternetIdentity();
  const queryClient = useQueryClient();
  const { data: userProfile } = useGetCallerUserProfile();
  const { items } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isAuthenticated = !!identity;
  const isLoggingIn = loginStatus === 'logging-in';
  const cartCount = items.length;

  const handleAuth = async () => {
    if (isAuthenticated) {
      await clear();
      queryClient.clear();
    } else {
      try {
        await login();
      } catch (error: any) {
        if (error?.message === 'User is already authenticated') {
          await clear();
          setTimeout(() => login(), 300);
        }
      }
    }
  };

  const getDashboardPath = () => {
    if (!userProfile) return '/admin';
    switch (userProfile.role) {
      case 'admin':
      case 'labExecutive':
        return '/admin';
      case 'phlebotomist':
        return '/phlebotomist';
      case 'doctor':
        return '/doctor';
      default:
        return '/orders';
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      {/* Top bar */}
      <div className="bg-blue-700 text-white text-xs py-1.5 px-4 flex items-center justify-between">
        <span className="flex items-center gap-1.5">
          <Phone className="w-3 h-3" />
          Emergency: <strong>+91 98765 43210</strong>
        </span>
        <span className="hidden sm:block">Available 24/7 · Serving Hyderabad & Surrounding Areas</span>
      </div>

      {/* Main header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button
            onClick={() => navigate({ to: '/' })}
            className="flex items-center gap-2 focus:outline-none"
          >
            <img
              src="/assets/Jeevan HealthCare Logo.jpeg"
              alt="Jeevan HealthCare at Home"
              className="h-10 w-auto object-contain"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
              }}
            />
            <div className="hidden sm:block">
              <div className="text-blue-700 font-bold text-base leading-tight">Jeevan HealthCare</div>
              <div className="text-gray-500 text-xs leading-tight">at Home</div>
            </div>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map(link => (
              <button
                key={link.path}
                onClick={() => navigate({ to: link.path })}
                className="px-3 py-2 text-sm font-medium text-gray-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            {/* Cart */}
            <Button
              variant="ghost"
              size="icon"
              className="relative"
              onClick={() => navigate({ to: '/cart' })}
            >
              <ShoppingCart className="w-5 h-5 text-gray-600" />
              {cartCount > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-blue-600">
                  {cartCount}
                </Badge>
              )}
            </Button>

            {/* Auth */}
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="hidden sm:flex items-center gap-1.5 border-blue-200 text-blue-700 hover:bg-blue-50">
                    <User className="w-4 h-4" />
                    <span className="max-w-[100px] truncate">{userProfile?.name || 'Account'}</span>
                    <ChevronDown className="w-3 h-3" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem onClick={() => navigate({ to: getDashboardPath() })}>
                    <LayoutDashboard className="w-4 h-4 mr-2" />
                    Dashboard
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate({ to: '/health' })}>
                    <Heart className="w-4 h-4 mr-2" />
                    Health Centre
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleAuth} className="text-red-600">
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button
                size="sm"
                onClick={handleAuth}
                disabled={isLoggingIn}
                className="hidden sm:flex bg-blue-600 hover:bg-blue-700 text-white"
              >
                {isLoggingIn ? 'Logging in...' : 'Login'}
              </Button>
            )}

            {/* Mobile menu toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-gray-100 bg-white shadow-lg">
          <div className="px-4 py-3 space-y-1">
            {NAV_LINKS.map(link => (
              <button
                key={link.path}
                onClick={() => {
                  navigate({ to: link.path });
                  setMobileOpen(false);
                }}
                className="w-full text-left px-3 py-2.5 text-sm font-medium text-gray-700 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors"
              >
                {link.label}
              </button>
            ))}
            <div className="pt-2 border-t border-gray-100">
              {isAuthenticated ? (
                <>
                  <button
                    onClick={() => {
                      navigate({ to: getDashboardPath() });
                      setMobileOpen(false);
                    }}
                    className="w-full text-left px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-blue-50 rounded-lg"
                  >
                    Dashboard
                  </button>
                  <button
                    onClick={() => {
                      handleAuth();
                      setMobileOpen(false);
                    }}
                    className="w-full text-left px-3 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Button
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                  onClick={() => {
                    handleAuth();
                    setMobileOpen(false);
                  }}
                  disabled={isLoggingIn}
                >
                  {isLoggingIn ? 'Logging in...' : 'Login'}
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
