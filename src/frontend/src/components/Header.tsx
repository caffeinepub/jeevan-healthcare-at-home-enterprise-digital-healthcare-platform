import { useState } from 'react';
import { Link, useNavigate } from '@tanstack/react-router';
import { Phone, Menu, ShoppingCart, User, LogOut, LayoutDashboard } from 'lucide-react';
import { SiWhatsapp } from 'react-icons/si';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useGetCallerUserProfile, useLogout } from '../hooks/useQueries';
import { useCart } from '../hooks/useCart';
import { useQueryClient } from '@tanstack/react-query';
import { HealthcareRole } from '../backend';
import { toast } from 'sonner';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { identity, clear, login, loginStatus } = useInternetIdentity();
  const { data: userProfile } = useGetCallerUserProfile();
  const { items } = useCart();
  const queryClient = useQueryClient();
  const logoutMutation = useLogout();

  const isAuthenticated = !!identity;
  const cartItemCount = items.length;

  const handleBookService = () => {
    navigate({ to: '/tests' });
  };

  const handleLogout = async () => {
    try {
      await logoutMutation.mutateAsync();
      await clear();
      queryClient.clear();
      navigate({ to: '/' });
      toast.success('Logged out successfully');
    } catch (error) {
      console.error('Logout error:', error);
      await clear();
      queryClient.clear();
      navigate({ to: '/' });
    }
  };

  const handleLogin = async () => {
    try {
      await login();
      // After successful login, the profile will be loaded and role-based redirect will happen
    } catch (error: any) {
      console.error('Login error:', error);
      toast.error('Login failed. Please try again.');
    }
  };

  const handleDashboardClick = () => {
    if (!userProfile) {
      navigate({ to: '/orders' });
      return;
    }
    
    switch (userProfile.role) {
      case HealthcareRole.admin:
      case HealthcareRole.labExecutive:
        navigate({ to: '/admin' });
        break;
      case HealthcareRole.phlebotomist:
        navigate({ to: '/phlebotomist' });
        break;
      case HealthcareRole.doctor:
        navigate({ to: '/doctor' });
        break;
      default:
        navigate({ to: '/orders' });
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-white shadow-sm">
      <div className="container mx-auto flex h-20 items-center justify-between px-4">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <img
            src="/assets/Jeevan HealthCare Logo.jpeg"
            alt="Jeevan HealthCare"
            className="h-14 w-auto"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center space-x-6 lg:flex">
          <Link
            to="/"
            className="font-heading text-sm font-medium text-jeevan-text transition-colors hover:text-jeevan-primary"
          >
            Home
          </Link>
          <Link
            to="/tests"
            className="font-heading text-sm font-medium text-jeevan-text transition-colors hover:text-jeevan-primary"
          >
            Services
          </Link>
          <Link
            to="/about"
            className="font-heading text-sm font-medium text-jeevan-text transition-colors hover:text-jeevan-primary"
          >
            About Us
          </Link>
          <Link
            to="/contact"
            className="font-heading text-sm font-medium text-jeevan-text transition-colors hover:text-jeevan-primary"
          >
            Contact
          </Link>
        </nav>

        {/* Actions */}
        <div className="hidden items-center space-x-4 lg:flex">
          <a
            href="tel:+919700104108"
            className="flex items-center space-x-2 text-sm font-medium text-jeevan-primary transition-colors hover:text-jeevan-teal"
          >
            <Phone className="h-4 w-4" />
            <span>+91 97001 04108</span>
          </a>

          {isAuthenticated ? (
            <>
              <Button
                variant="ghost"
                size="icon"
                className="relative text-jeevan-primary hover:text-jeevan-teal"
                onClick={() => navigate({ to: '/cart' })}
              >
                <ShoppingCart className="h-5 w-5" />
                {cartItemCount > 0 && (
                  <Badge className="absolute -right-1 -top-1 h-5 w-5 rounded-full bg-jeevan-teal p-0 text-xs">
                    {cartItemCount}
                  </Badge>
                )}
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-jeevan-primary hover:text-jeevan-teal">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="px-2 py-1.5">
                    <p className="text-sm font-medium">{userProfile?.name || 'User'}</p>
                    <p className="text-xs text-muted-foreground">{userProfile?.email}</p>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleDashboardClick}>
                    <LayoutDashboard className="mr-2 h-4 w-4" />
                    Dashboard
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate({ to: '/orders' })}>
                    My Bookings
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate({ to: '/reports' })}>
                    My Reports
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <Button
              onClick={handleLogin}
              disabled={loginStatus === 'logging-in'}
              className="rounded-full bg-jeevan-primary font-heading text-white shadow-soft hover:bg-jeevan-teal"
            >
              {loginStatus === 'logging-in' ? 'Logging in...' : 'Login'}
            </Button>
          )}

          <Button
            onClick={handleBookService}
            className="rounded-full bg-jeevan-teal font-heading text-white shadow-soft hover:bg-jeevan-primary"
          >
            Book Service
          </Button>
        </div>

        {/* Mobile Menu */}
        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
          <SheetTrigger asChild className="lg:hidden">
            <Button variant="ghost" size="icon" className="text-jeevan-primary">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] overflow-y-auto">
            <div className="flex flex-col space-y-4 py-4">
              {isAuthenticated && userProfile && (
                <div className="border-b pb-4">
                  <p className="text-sm font-medium">{userProfile.name}</p>
                  <p className="text-xs text-muted-foreground">{userProfile.email}</p>
                </div>
              )}

              <Link
                to="/"
                className="font-heading text-sm font-medium text-jeevan-text"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/tests"
                className="font-heading text-sm font-medium text-jeevan-text"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Services
              </Link>
              <Link
                to="/about"
                className="font-heading text-sm font-medium text-jeevan-text"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About Us
              </Link>
              <Link
                to="/contact"
                className="font-heading text-sm font-medium text-jeevan-text"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact
              </Link>

              {isAuthenticated && (
                <>
                  <div className="border-t pt-4">
                    <Link
                      to="/cart"
                      className="flex items-center justify-between text-sm font-medium text-jeevan-text"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <span>Cart</span>
                      {cartItemCount > 0 && (
                        <Badge variant="secondary">{cartItemCount}</Badge>
                      )}
                    </Link>
                  </div>
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      handleDashboardClick();
                    }}
                    className="text-left text-sm font-medium text-jeevan-text"
                  >
                    Dashboard
                  </button>
                  <Link
                    to="/orders"
                    className="text-sm font-medium text-jeevan-text"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    My Bookings
                  </Link>
                  <Link
                    to="/reports"
                    className="text-sm font-medium text-jeevan-text"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    My Reports
                  </Link>
                  <Button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      handleLogout();
                    }}
                    variant="outline"
                    className="w-full"
                  >
                    Logout
                  </Button>
                </>
              )}

              {!isAuthenticated && (
                <Button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    handleLogin();
                  }}
                  className="w-full rounded-full bg-jeevan-primary text-white hover:bg-jeevan-teal"
                  disabled={loginStatus === 'logging-in'}
                >
                  {loginStatus === 'logging-in' ? 'Logging in...' : 'Login'}
                </Button>
              )}

              <div className="border-t pt-4">
                <a
                  href="tel:+919700104108"
                  className="flex items-center space-x-2 text-sm font-medium text-jeevan-primary"
                >
                  <Phone className="h-4 w-4" />
                  <span>+91 97001 04108</span>
                </a>
                <a
                  href="https://wa.me/919700104108"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 flex items-center space-x-2 text-sm font-medium text-jeevan-teal"
                >
                  <SiWhatsapp className="h-4 w-4" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
