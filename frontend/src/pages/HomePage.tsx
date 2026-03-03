import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import {
  Stethoscope,
  Pill,
  TestTube,
  Activity,
  Heart,
  Users,
  Dumbbell,
  Syringe,
  Phone,
  Clock,
  Shield,
  Award,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useActiveHealthPackages } from '@/hooks/useQueries';
import { Skeleton } from '@/components/ui/skeleton';

const quickServices = [
  { icon: Stethoscope, title: 'Doctor Consultation', path: '/doctor-consultation', isRoute: true },
  { icon: Pill, title: 'Medicine Delivery', slug: 'medicine-delivery', isRoute: false },
  { icon: TestTube, title: 'Lab Tests', slug: 'lab-tests', isRoute: false },
  { icon: Activity, title: 'Diagnostics', slug: 'diagnostics', isRoute: false },
  { icon: Heart, title: 'Nursing Care', slug: 'nursing-care', isRoute: false },
  { icon: Users, title: 'Caregiver Services', slug: 'caregiver-services', isRoute: false },
  { icon: Dumbbell, title: 'Physiotherapy', slug: 'physiotherapy', isRoute: false },
  { icon: Syringe, title: 'Vaccination', slug: 'vaccination', isRoute: false },
];

const whyChooseUs = [
  {
    icon: Clock,
    title: '24/7 Availability',
    description: 'Round-the-clock healthcare services at your doorstep',
  },
  {
    icon: Shield,
    title: 'Certified Professionals',
    description: 'Experienced and qualified healthcare experts',
  },
  {
    icon: Award,
    title: 'Quality Care',
    description: 'Medical-grade equipment and highest standards',
  },
  {
    icon: CheckCircle2,
    title: 'Affordable Pricing',
    description: 'Transparent pricing with no hidden costs',
  },
];

// Map icon names to image paths
const getPackageIcon = (iconName: string): string => {
  const iconMap: Record<string, string> = {
    'body-checkup': '/assets/generated/full-body-checkup-icon.dim_200x200.png',
    'diabetes-care': '/assets/generated/diabetes-care-icon.dim_200x200.png',
    'heart-health': '/assets/generated/heart-health-icon.dim_200x200.png',
    'thyroid-wellness': '/assets/generated/thyroid-wellness-icon.dim_200x200.png',
    'womens-health': '/assets/generated/womens-health-icon.dim_200x200.png',
    'senior-health': '/assets/generated/senior-health-icon.dim_200x200.png',
    'covid-screening': '/assets/generated/covid-screening-icon.dim_200x200.png',
    'liver-kidney': '/assets/generated/liver-kidney-icon.dim_200x200.png',
    'womens-wellness': '/assets/generated/womens-wellness-icon.dim_200x200.png',
    'senior-comprehensive': '/assets/generated/senior-comprehensive-icon.dim_200x200.png',
    'cardiac-risk': '/assets/generated/cardiac-risk-icon.dim_200x200.png',
    'hormone-balance': '/assets/generated/thyroid-hormone-icon.dim_200x200.png',
    'organ-health': '/assets/generated/liver-kidney-panel-icon.dim_200x200.png',
    'diabetes-advanced': '/assets/generated/advanced-diabetes-icon.dim_200x200.png',
    'pre-employment': '/assets/generated/pre-employment-icon.dim_200x200.png',
    'executive-health': '/assets/generated/corporate-executive-icon.dim_200x200.png',
    'mother-child': '/assets/generated/mother-child-icon.dim_200x200.png',
    'preventive-basic': '/assets/generated/preventive-basic-icon.dim_200x200.png',
    'preventive-advanced': '/assets/generated/preventive-advanced-icon.dim_200x200.png',
  };
  
  return iconMap[iconName] || '/assets/generated/healthcare-icons.dim_400x400.png';
};

export default function HomePage() {
  const navigate = useNavigate();
  const [showHealthPackages, setShowHealthPackages] = useState(false);
  const { data: healthPackages, isLoading: packagesLoading } = useActiveHealthPackages();

  const handleServiceClick = (service: typeof quickServices[0]) => {
    if (service.isRoute && service.path) {
      navigate({ to: service.path });
    } else if (!service.isRoute && service.slug) {
      navigate({ to: '/services/$slug', params: { slug: service.slug } });
    }
  };

  const handleBookNow = () => {
    navigate({ to: '/booking' });
  };

  const toggleHealthPackages = () => {
    setShowHealthPackages(!showHealthPackages);
  };

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-jeevan-primary to-jeevan-teal py-20 text-white">
        <div className="container mx-auto px-4">
          <div className="grid items-center gap-8 lg:grid-cols-2">
            <div>
              <h1 className="mb-4 font-heading text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
                Quality Healthcare at Your Doorstep
              </h1>
              <p className="mb-8 text-lg text-white/90 md:text-xl">
                Professional medical services delivered to your home in Hyderabad. Expert doctors,
                nurses, and caregivers available 24/7.
              </p>
              <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
                <Button
                  size="lg"
                  onClick={handleBookNow}
                  className="rounded-full bg-white font-heading text-jeevan-primary shadow-card hover:bg-jeevan-light-blue focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-jeevan-primary"
                  aria-label="Book home healthcare service"
                >
                  Book Home Service
                </Button>
                <Button
                  size="lg"
                  onClick={toggleHealthPackages}
                  className="rounded-full border-2 border-white bg-transparent font-heading text-white hover:bg-white hover:text-jeevan-primary focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-jeevan-primary"
                  aria-label="View health packages"
                  aria-expanded={showHealthPackages}
                >
                  Health Packages
                  {showHealthPackages ? (
                    <ChevronUp className="ml-2 h-5 w-5" />
                  ) : (
                    <ChevronDown className="ml-2 h-5 w-5" />
                  )}
                </Button>
              </div>
            </div>
            <div className="relative">
              <img
                src="/assets/generated/doctor-home-visit.dim_800x600.jpg"
                alt="Doctor Home Visit"
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Health Packages Expanded Section */}
      {showHealthPackages && (
        <section className="bg-jeevan-soft-grey py-16">
          <div className="container mx-auto px-4">
            <div className="mb-12 text-center">
              <h2 className="mb-4 font-heading text-3xl font-bold text-jeevan-primary md:text-4xl">
                Comprehensive Health Packages
              </h2>
              <p className="text-lg text-jeevan-text">
                Choose from our specially curated health screening packages
              </p>
            </div>

            {packagesLoading ? (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {[...Array(8)].map((_, i) => (
                  <Card key={i} className="rounded-2xl shadow-soft">
                    <CardHeader>
                      <Skeleton className="h-6 w-3/4" />
                      <Skeleton className="h-4 w-full" />
                    </CardHeader>
                    <CardContent>
                      <Skeleton className="mb-4 h-32 w-full" />
                      <Skeleton className="h-10 w-full" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {healthPackages?.map((pkg) => (
                  <Card
                    key={pkg.packageId.toString()}
                    className="rounded-2xl shadow-soft transition-all hover:shadow-card hover:border-jeevan-teal"
                  >
                    <CardHeader>
                      <div className="mb-3 flex justify-center">
                        <div className="rounded-full bg-jeevan-light-blue p-3">
                          <img
                            src={getPackageIcon(pkg.iconName)}
                            alt={pkg.packageName}
                            className="h-12 w-12 object-contain"
                          />
                        </div>
                      </div>
                      <CardTitle className="font-heading text-lg text-jeevan-primary">
                        {pkg.packageName}
                      </CardTitle>
                      <CardDescription className="text-sm">{pkg.shortDescription}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <p className="mb-2 text-sm font-semibold text-jeevan-text">
                          Tests Included:
                        </p>
                        <ul className="space-y-1 text-xs text-jeevan-text">
                          {pkg.testInclusions.slice(0, 4).map((test, idx) => (
                            <li key={idx} className="flex items-start">
                              <CheckCircle2 className="mr-1 mt-0.5 h-3 w-3 flex-shrink-0 text-jeevan-teal" />
                              <span>{test}</span>
                            </li>
                          ))}
                          {pkg.testInclusions.length > 4 && (
                            <li className="text-jeevan-teal">
                              +{pkg.testInclusions.length - 4} more tests
                            </li>
                          )}
                        </ul>
                      </div>

                      <div className="space-y-1 text-xs text-jeevan-text">
                        <p>
                          <span className="font-semibold">Sample:</span> {pkg.sampleCollection}
                        </p>
                        <p>
                          <span className="font-semibold">Report:</span> {pkg.reportDeliveryTime}
                        </p>
                      </div>

                      <div className="pt-2">
                        <p className="mb-3 text-center font-heading text-2xl font-bold text-jeevan-primary">
                          ₹{pkg.price.toLocaleString()}
                        </p>
                        <Button
                          onClick={handleBookNow}
                          className="w-full rounded-full bg-jeevan-primary font-heading hover:bg-jeevan-teal focus:outline-none focus:ring-2 focus:ring-jeevan-primary focus:ring-offset-2"
                        >
                          Book Now
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Quick Services */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-heading text-3xl font-bold text-jeevan-primary md:text-4xl">
              Our Services
            </h2>
            <p className="text-lg text-jeevan-text">
              Comprehensive healthcare solutions delivered to your home
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:gap-6">
            {quickServices.map((service) => (
              <Card
                key={service.title}
                className="cursor-pointer rounded-2xl shadow-soft transition-all hover:shadow-card hover:border-jeevan-teal"
                onClick={() => handleServiceClick(service)}
              >
                <CardContent className="flex flex-col items-center p-6 text-center">
                  <div className="mb-4 rounded-full bg-jeevan-light-blue p-4">
                    <service.icon className="h-8 w-8 text-jeevan-primary md:h-10 md:w-10" />
                  </div>
                  <h3 className="font-heading text-sm font-semibold text-jeevan-text md:text-base">
                    {service.title}
                  </h3>
                  {service.isRoute && (
                    <span className="mt-1 text-xs text-blue-600 font-medium">Book Now →</span>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Tabbed Services Overview */}
      <section className="bg-jeevan-soft-grey py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-heading text-3xl font-bold text-jeevan-primary md:text-4xl">
              Explore Our Healthcare Solutions
            </h2>
          </div>

          <Tabs defaultValue="primary" className="w-full">
            <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4">
              <TabsTrigger value="primary">Primary Care</TabsTrigger>
              <TabsTrigger value="equipment">Equipment</TabsTrigger>
              <TabsTrigger value="preventive">Preventive</TabsTrigger>
              <TabsTrigger value="specialized">Specialized</TabsTrigger>
            </TabsList>

            <TabsContent value="primary" className="mt-8">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <Card className="rounded-2xl shadow-soft">
                  <CardHeader>
                    <CardTitle className="font-heading">Doctor Consultation</CardTitle>
                    <CardDescription>Expert medical advice at home</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <img
                      src="/assets/generated/doctor-home-visit.dim_800x600.jpg"
                      alt="Doctor Consultation"
                      className="mb-4 rounded-xl"
                    />
                    <Button
                      onClick={() => navigate({ to: '/doctor-consultation' })}
                      className="w-full rounded-full bg-jeevan-primary font-heading hover:bg-jeevan-teal focus:outline-none focus:ring-2 focus:ring-jeevan-primary focus:ring-offset-2"
                    >
                      Book Specialist
                    </Button>
                  </CardContent>
                </Card>

                <Card className="rounded-2xl shadow-soft">
                  <CardHeader>
                    <CardTitle className="font-heading">Nursing Care</CardTitle>
                    <CardDescription>Professional nursing services</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <img
                      src="/assets/generated/nursing-care-home.dim_800x600.jpg"
                      alt="Nursing Care"
                      className="mb-4 rounded-xl"
                    />
                    <Button
                      onClick={() => navigate({ to: '/services/$slug', params: { slug: 'nursing-care' } })}
                      className="w-full rounded-full bg-jeevan-primary font-heading hover:bg-jeevan-teal focus:outline-none focus:ring-2 focus:ring-jeevan-primary focus:ring-offset-2"
                    >
                      Learn More
                    </Button>
                  </CardContent>
                </Card>

                <Card className="rounded-2xl shadow-soft">
                  <CardHeader>
                    <CardTitle className="font-heading">Lab Tests</CardTitle>
                    <CardDescription>Diagnostic tests at home</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <img
                      src="/assets/generated/lab-test-home.dim_800x600.jpg"
                      alt="Lab Tests"
                      className="mb-4 rounded-xl"
                    />
                    <Button
                      onClick={() => navigate({ to: '/services/$slug', params: { slug: 'lab-tests' } })}
                      className="w-full rounded-full bg-jeevan-primary font-heading hover:bg-jeevan-teal focus:outline-none focus:ring-2 focus:ring-jeevan-primary focus:ring-offset-2"
                    >
                      Learn More
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="equipment" className="mt-8">
              <div className="grid gap-6 md:grid-cols-2">
                <Card className="rounded-2xl shadow-soft">
                  <CardHeader>
                    <CardTitle className="font-heading">Medical Equipment Rental</CardTitle>
                    <CardDescription>Quality equipment for home care</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <img
                      src="/assets/generated/medical-equipment.dim_600x400.jpg"
                      alt="Medical Equipment"
                      className="mb-4 rounded-xl"
                    />
                    <Button
                      onClick={() => navigate({ to: '/services/$slug', params: { slug: 'equipment-rental' } })}
                      className="w-full rounded-full bg-jeevan-primary font-heading hover:bg-jeevan-teal focus:outline-none focus:ring-2 focus:ring-jeevan-primary focus:ring-offset-2"
                    >
                      Learn More
                    </Button>
                  </CardContent>
                </Card>

                <Card className="rounded-2xl shadow-soft">
                  <CardHeader>
                    <CardTitle className="font-heading">Home ICU Setup</CardTitle>
                    <CardDescription>Complete ICU care at home</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <img
                      src="/assets/generated/medical-equipment.dim_600x400.jpg"
                      alt="ICU Setup"
                      className="mb-4 rounded-xl"
                    />
                    <Button
                      onClick={() => navigate({ to: '/services/$slug', params: { slug: 'icu-setup' } })}
                      className="w-full rounded-full bg-jeevan-primary font-heading hover:bg-jeevan-teal focus:outline-none focus:ring-2 focus:ring-jeevan-primary focus:ring-offset-2"
                    >
                      Learn More
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="preventive" className="mt-8">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <Card className="rounded-2xl shadow-soft">
                  <CardHeader>
                    <CardTitle className="font-heading">Health Checkups</CardTitle>
                    <CardDescription>Comprehensive preventive screenings</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <img
                      src="/assets/generated/diagnostic-lab.dim_800x600.jpg"
                      alt="Health Checkups"
                      className="mb-4 rounded-xl"
                    />
                    <Button
                      onClick={() => navigate({ to: '/services/$slug', params: { slug: 'health-checkups' } })}
                      className="w-full rounded-full bg-jeevan-primary font-heading hover:bg-jeevan-teal focus:outline-none focus:ring-2 focus:ring-jeevan-primary focus:ring-offset-2"
                    >
                      Learn More
                    </Button>
                  </CardContent>
                </Card>

                <Card className="rounded-2xl shadow-soft">
                  <CardHeader>
                    <CardTitle className="font-heading">Vaccination</CardTitle>
                    <CardDescription>Immunization at your doorstep</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <img
                      src="/assets/generated/lab-test-home.dim_800x600.jpg"
                      alt="Vaccination"
                      className="mb-4 rounded-xl"
                    />
                    <Button
                      onClick={() => navigate({ to: '/services/$slug', params: { slug: 'vaccination' } })}
                      className="w-full rounded-full bg-jeevan-primary font-heading hover:bg-jeevan-teal focus:outline-none focus:ring-2 focus:ring-jeevan-primary focus:ring-offset-2"
                    >
                      Learn More
                    </Button>
                  </CardContent>
                </Card>

                <Card className="rounded-2xl shadow-soft">
                  <CardHeader>
                    <CardTitle className="font-heading">Corporate Health</CardTitle>
                    <CardDescription>Workplace wellness programs</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <img
                      src="/assets/generated/diagnostic-lab.dim_800x600.jpg"
                      alt="Corporate Health"
                      className="mb-4 rounded-xl"
                    />
                    <Button
                      onClick={() => navigate({ to: '/services/$slug', params: { slug: 'corporate-health' } })}
                      className="w-full rounded-full bg-jeevan-primary font-heading hover:bg-jeevan-teal focus:outline-none focus:ring-2 focus:ring-jeevan-primary focus:ring-offset-2"
                    >
                      Learn More
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="specialized" className="mt-8">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <Card className="rounded-2xl shadow-soft">
                  <CardHeader>
                    <CardTitle className="font-heading">Physiotherapy</CardTitle>
                    <CardDescription>Rehabilitation at home</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <img
                      src="/assets/generated/physiotherapy-home.dim_800x600.jpg"
                      alt="Physiotherapy"
                      className="mb-4 rounded-xl"
                    />
                    <Button
                      onClick={() => navigate({ to: '/services/$slug', params: { slug: 'physiotherapy' } })}
                      className="w-full rounded-full bg-jeevan-primary font-heading hover:bg-jeevan-teal focus:outline-none focus:ring-2 focus:ring-jeevan-primary focus:ring-offset-2"
                    >
                      Learn More
                    </Button>
                  </CardContent>
                </Card>

                <Card className="rounded-2xl shadow-soft">
                  <CardHeader>
                    <CardTitle className="font-heading">Mother & Child Care</CardTitle>
                    <CardDescription>Specialized maternal and pediatric care</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <img
                      src="/assets/generated/nursing-care-home.dim_800x600.jpg"
                      alt="Mother Child Care"
                      className="mb-4 rounded-xl"
                    />
                    <Button
                      onClick={() => navigate({ to: '/services/$slug', params: { slug: 'mother-child-care' } })}
                      className="w-full rounded-full bg-jeevan-primary font-heading hover:bg-jeevan-teal focus:outline-none focus:ring-2 focus:ring-jeevan-primary focus:ring-offset-2"
                    >
                      Learn More
                    </Button>
                  </CardContent>
                </Card>

                <Card className="rounded-2xl shadow-soft">
                  <CardHeader>
                    <CardTitle className="font-heading">Medicine Delivery</CardTitle>
                    <CardDescription>Medicines delivered to your door</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <img
                      src="/assets/generated/medicine-delivery.dim_600x400.jpg"
                      alt="Medicine Delivery"
                      className="mb-4 rounded-xl"
                    />
                    <Button
                      onClick={() => navigate({ to: '/services/$slug', params: { slug: 'medicine-delivery' } })}
                      className="w-full rounded-full bg-jeevan-primary font-heading hover:bg-jeevan-teal focus:outline-none focus:ring-2 focus:ring-jeevan-primary focus:ring-offset-2"
                    >
                      Learn More
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-heading text-3xl font-bold text-jeevan-primary md:text-4xl">
              Why Choose Jeevan HealthCare?
            </h2>
            <p className="text-lg text-jeevan-text">
              Trusted by thousands of families across Hyderabad
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {whyChooseUs.map((item) => (
              <Card key={item.title} className="rounded-2xl shadow-soft text-center">
                <CardContent className="p-8">
                  <div className="mb-4 flex justify-center">
                    <div className="rounded-full bg-jeevan-light-blue p-4">
                      <item.icon className="h-8 w-8 text-jeevan-primary" />
                    </div>
                  </div>
                  <h3 className="mb-2 font-heading text-lg font-semibold text-jeevan-primary">
                    {item.title}
                  </h3>
                  <p className="text-sm text-jeevan-text">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Diagnostics Highlight */}
      <section className="bg-jeevan-soft-grey py-16">
        <div className="container mx-auto px-4">
          <div className="grid items-center gap-8 lg:grid-cols-2">
            <div>
              <h2 className="mb-4 font-heading text-3xl font-bold text-jeevan-primary md:text-4xl">
                NABL Certified Diagnostics
              </h2>
              <p className="mb-6 text-lg text-jeevan-text">
                Our diagnostic services are NABL certified, ensuring the highest accuracy and
                reliability in test results. Get your reports delivered digitally within 24 hours.
              </p>
              <ul className="mb-8 space-y-3">
                {[
                  'Home sample collection',
                  'Digital reports in 24 hours',
                  'NABL certified laboratory',
                  '500+ tests available',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-jeevan-text">
                    <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-jeevan-teal" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Button
                onClick={() => navigate({ to: '/tests' })}
                className="rounded-full bg-jeevan-primary font-heading hover:bg-jeevan-teal focus:outline-none focus:ring-2 focus:ring-jeevan-primary focus:ring-offset-2"
              >
                View All Tests
              </Button>
            </div>
            <div>
              <img
                src="/assets/generated/diagnostic-lab.dim_800x600.jpg"
                alt="Diagnostic Lab"
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Corporate Services */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid items-center gap-8 lg:grid-cols-2">
            <div>
              <img
                src="/assets/generated/doctor-dashboard-interface.dim_800x600.jpg"
                alt="Corporate Healthcare"
                className="rounded-2xl shadow-2xl"
              />
            </div>
            <div>
              <h2 className="mb-4 font-heading text-3xl font-bold text-jeevan-primary md:text-4xl">
                Corporate Healthcare Solutions
              </h2>
              <p className="mb-6 text-lg text-jeevan-text">
                Comprehensive healthcare programs for your employees. From annual health checkups to
                on-site medical support, we've got your workforce covered.
              </p>
              <ul className="mb-8 space-y-3">
                {[
                  'Annual health checkup programs',
                  'On-site medical support',
                  'Employee wellness programs',
                  'Customized health packages',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-jeevan-text">
                    <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-jeevan-teal" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Button
                onClick={() => navigate({ to: '/contact' })}
                className="rounded-full bg-jeevan-primary font-heading hover:bg-jeevan-teal focus:outline-none focus:ring-2 focus:ring-jeevan-primary focus:ring-offset-2"
              >
                Contact Us
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Strip */}
      <section className="bg-gradient-to-r from-jeevan-primary to-jeevan-teal py-16 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-4 font-heading text-3xl font-bold md:text-4xl">
            Ready to Get Started?
          </h2>
          <p className="mb-8 text-lg text-white/90">
            Book your first appointment today and experience healthcare at its best.
          </p>
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Button
              size="lg"
              onClick={handleBookNow}
              className="rounded-full bg-white font-heading text-jeevan-primary hover:bg-jeevan-light-blue focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-jeevan-primary"
            >
              Book Now
            </Button>
            <Button
              size="lg"
              onClick={() => navigate({ to: '/contact' })}
              className="rounded-full border-2 border-white bg-transparent font-heading text-white hover:bg-white hover:text-jeevan-primary focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-jeevan-primary"
            >
              <Phone className="mr-2 h-5 w-5" />
              Call Us
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
