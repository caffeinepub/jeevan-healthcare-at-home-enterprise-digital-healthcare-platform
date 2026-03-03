import { RouterProvider, createRouter, createRoute, createRootRoute } from '@tanstack/react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from 'next-themes';
import { Toaster } from '@/components/ui/sonner';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import ServicePage from './pages/ServicePage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import TestsPage from './pages/TestsPage';
import CartPage from './pages/CartPage';
import BookingPage from './pages/BookingPage';
import OrdersPage from './pages/OrdersPage';
import OrderTrackingPage from './pages/OrderTrackingPage';
import ReportsPage from './pages/ReportsPage';
import HealthPage from './pages/HealthPage';
import DoctorConsultationPage from './pages/DoctorConsultationPage';
import DoctorListingPage from './pages/DoctorListingPage';
import PublicDoctorProfilePage from './pages/PublicDoctorProfilePage';
import AdminLayout from './components/admin/AdminLayout';
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import AdminTestsPage from './pages/admin/AdminTestsPage';
import AdminOrdersPage from './pages/admin/AdminOrdersPage';
import AdminReportsPage from './pages/admin/AdminReportsPage';
import AdminUsersPage from './pages/admin/AdminUsersPage';
import AdminCRMPage from './pages/admin/AdminCRMPage';
import AdminCustomersPage from './pages/admin/AdminCustomersPage';
import AdminPatientsPage from './pages/admin/AdminPatientsPage';
import AdminVitalsPage from './pages/admin/AdminVitalsPage';
import PhlebotomistLayout from './components/phlebotomist/PhlebotomistLayout';
import PhlebotomistDashboardPage from './pages/phlebotomist/PhlebotomistDashboardPage';
import PhlebotomistCollectionsPage from './pages/phlebotomist/PhlebotomistCollectionsPage';
import DoctorLayout from './components/doctor/DoctorLayout';
import DoctorDashboardPage from './pages/doctor/DoctorDashboardPage';
import DoctorAppointmentsPage from './pages/doctor/DoctorAppointmentsPage';
import DoctorPatientsPage from './pages/doctor/DoctorPatientsPage';
import DoctorConsultationsPage from './pages/doctor/DoctorConsultationsPage';
import DoctorEarningsPage from './pages/doctor/DoctorEarningsPage';
import DoctorAnalyticsPage from './pages/doctor/DoctorAnalyticsPage';
import DoctorProfilePage from './pages/doctor/DoctorProfilePage';
import DoctorHelpPage from './pages/doctor/DoctorHelpPage';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 5 * 60 * 1000,
    },
  },
});

// Root route uses Layout directly so all child paths are top-level (e.g. /services/$slug, /orders/$orderId)
const rootRoute = createRootRoute({
  component: Layout,
});

// Public routes
const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: HomePage,
});

const serviceRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/services/$slug',
  component: ServicePage,
});

const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/about',
  component: AboutPage,
});

const contactRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/contact',
  component: ContactPage,
});

const testsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/tests',
  component: TestsPage,
});

const cartRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/cart',
  component: CartPage,
});

const bookingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/booking',
  component: BookingPage,
});

const ordersRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/orders',
  component: OrdersPage,
});

const orderTrackingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/orders/$orderId',
  component: OrderTrackingPage,
});

const reportsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/reports',
  component: ReportsPage,
});

const healthRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/health',
  component: HealthPage,
});

const doctorConsultationRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/doctor-consultation',
  component: DoctorConsultationPage,
});

const doctorListingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/doctor-listing/$specialty',
  component: DoctorListingPage,
});

const publicDoctorProfileRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/doctor-profile/$doctorId',
  component: PublicDoctorProfilePage,
});

// Admin routes
const adminRootRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin',
  component: AdminLayout,
});

const adminDashboardRoute = createRoute({
  getParentRoute: () => adminRootRoute,
  path: '/',
  component: AdminDashboardPage,
});

const adminTestsRoute = createRoute({
  getParentRoute: () => adminRootRoute,
  path: '/tests',
  component: AdminTestsPage,
});

const adminOrdersRoute = createRoute({
  getParentRoute: () => adminRootRoute,
  path: '/orders',
  component: AdminOrdersPage,
});

const adminReportsRoute = createRoute({
  getParentRoute: () => adminRootRoute,
  path: '/reports',
  component: AdminReportsPage,
});

const adminUsersRoute = createRoute({
  getParentRoute: () => adminRootRoute,
  path: '/users',
  component: AdminUsersPage,
});

const adminCRMRoute = createRoute({
  getParentRoute: () => adminRootRoute,
  path: '/crm',
  component: AdminCRMPage,
});

const adminCustomersRoute = createRoute({
  getParentRoute: () => adminRootRoute,
  path: '/customers',
  component: AdminCustomersPage,
});

const adminPatientsRoute = createRoute({
  getParentRoute: () => adminRootRoute,
  path: '/patients',
  component: AdminPatientsPage,
});

const adminVitalsRoute = createRoute({
  getParentRoute: () => adminRootRoute,
  path: '/vitals',
  component: AdminVitalsPage,
});

// Phlebotomist routes
const phlebotomistRootRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/phlebotomist',
  component: PhlebotomistLayout,
});

const phlebotomistDashboardRoute = createRoute({
  getParentRoute: () => phlebotomistRootRoute,
  path: '/',
  component: PhlebotomistDashboardPage,
});

const phlebotomistCollectionsRoute = createRoute({
  getParentRoute: () => phlebotomistRootRoute,
  path: '/collections',
  component: PhlebotomistCollectionsPage,
});

// Doctor routes
const doctorRootRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/doctor',
  component: DoctorLayout,
});

const doctorDashboardRoute = createRoute({
  getParentRoute: () => doctorRootRoute,
  path: '/',
  component: DoctorDashboardPage,
});

const doctorAppointmentsRoute = createRoute({
  getParentRoute: () => doctorRootRoute,
  path: '/appointments',
  component: DoctorAppointmentsPage,
});

const doctorPatientsRoute = createRoute({
  getParentRoute: () => doctorRootRoute,
  path: '/patients',
  component: DoctorPatientsPage,
});

const doctorConsultationsRoute = createRoute({
  getParentRoute: () => doctorRootRoute,
  path: '/consultations',
  component: DoctorConsultationsPage,
});

const doctorEarningsRoute = createRoute({
  getParentRoute: () => doctorRootRoute,
  path: '/earnings',
  component: DoctorEarningsPage,
});

const doctorAnalyticsRoute = createRoute({
  getParentRoute: () => doctorRootRoute,
  path: '/analytics',
  component: DoctorAnalyticsPage,
});

const doctorProfileRoute = createRoute({
  getParentRoute: () => doctorRootRoute,
  path: '/profile',
  component: DoctorProfilePage,
});

const doctorHelpRoute = createRoute({
  getParentRoute: () => doctorRootRoute,
  path: '/help',
  component: DoctorHelpPage,
});

// Route tree
const routeTree = rootRoute.addChildren([
  indexRoute,
  serviceRoute,
  aboutRoute,
  contactRoute,
  testsRoute,
  cartRoute,
  bookingRoute,
  ordersRoute,
  orderTrackingRoute,
  reportsRoute,
  healthRoute,
  doctorConsultationRoute,
  doctorListingRoute,
  publicDoctorProfileRoute,
  adminRootRoute.addChildren([
    adminDashboardRoute,
    adminTestsRoute,
    adminOrdersRoute,
    adminReportsRoute,
    adminUsersRoute,
    adminCRMRoute,
    adminCustomersRoute,
    adminPatientsRoute,
    adminVitalsRoute,
  ]),
  phlebotomistRootRoute.addChildren([
    phlebotomistDashboardRoute,
    phlebotomistCollectionsRoute,
  ]),
  doctorRootRoute.addChildren([
    doctorDashboardRoute,
    doctorAppointmentsRoute,
    doctorPatientsRoute,
    doctorConsultationsRoute,
    doctorEarningsRoute,
    doctorAnalyticsRoute,
    doctorProfileRoute,
    doctorHelpRoute,
  ]),
]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
        <RouterProvider router={router} />
        <Toaster position="top-right" richColors />
      </ThemeProvider>
    </QueryClientProvider>
  );
}
