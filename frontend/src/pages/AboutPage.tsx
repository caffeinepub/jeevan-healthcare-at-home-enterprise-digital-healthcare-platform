import { CheckCircle2, Heart, Users, Award, Target } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const values = [
  {
    icon: Heart,
    title: 'Compassionate Care',
    description: 'We treat every patient with empathy, dignity, and respect',
  },
  {
    icon: Award,
    title: 'Excellence',
    description: 'Committed to the highest standards of healthcare delivery',
  },
  {
    icon: Users,
    title: 'Patient-Centric',
    description: 'Your health and comfort are our top priorities',
  },
  {
    icon: Target,
    title: 'Accessibility',
    description: 'Making quality healthcare accessible to everyone at home',
  },
];

export default function AboutPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-jeevan-primary py-16 text-white">
        <div className="container mx-auto px-4">
          <h1 className="mb-4 text-4xl font-bold md:text-5xl">About Jeevan HealthCare</h1>
          <p className="text-xl text-white/90">
            Your trusted partner for comprehensive home healthcare in Hyderabad
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 lg:grid-cols-2">
            <Card>
              <CardContent className="p-8">
                <h2 className="mb-4 text-2xl font-bold text-jeevan-primary">Our Mission</h2>
                <p className="text-jeevan-text">
                  To provide accessible, affordable, and high-quality healthcare services at home,
                  ensuring that every individual receives the medical attention they deserve in the
                  comfort of their own space. We strive to bridge the gap between hospitals and
                  homes, making healthcare more convenient and patient-friendly.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-8">
                <h2 className="mb-4 text-2xl font-bold text-jeevan-primary">Our Vision</h2>
                <p className="text-jeevan-text">
                  To become the most trusted and preferred home healthcare provider in India,
                  revolutionizing the way healthcare is delivered by bringing hospital-grade medical
                  services to every doorstep. We envision a future where quality healthcare is
                  accessible to all, regardless of mobility or location constraints.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-6 text-3xl font-bold text-jeevan-primary md:text-4xl">Our Story</h2>
            <p className="mb-4 text-lg text-jeevan-text">
              Jeevan HealthCare at Home was founded with a simple yet powerful vision: to make
              quality healthcare accessible to everyone in the comfort of their homes. We recognized
              that many patients, especially the elderly and those with chronic conditions, face
              significant challenges in accessing healthcare facilities.
            </p>
            <p className="mb-4 text-lg text-jeevan-text">
              Starting with basic home nursing services, we have grown into a comprehensive
              healthcare provider offering everything from doctor consultations to advanced
              diagnostics, physiotherapy, and even home ICU setups. Our team of dedicated healthcare
              professionals works tirelessly to ensure that every patient receives personalized,
              compassionate care.
            </p>
            <p className="text-lg text-jeevan-text">
              Today, we serve hundreds of families across Hyderabad, and our commitment to
              excellence continues to drive us forward as we expand our services and reach.
            </p>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold text-jeevan-primary md:text-4xl">
            Our Core Values
          </h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {values.map((value, index) => (
              <Card key={index} className="text-center">
                <CardContent className="p-8">
                  <div className="mb-4 flex justify-center">
                    <div className="rounded-full bg-jeevan-primary/10 p-4">
                      <value.icon className="h-8 w-8 text-jeevan-primary" />
                    </div>
                  </div>
                  <h3 className="mb-2 text-xl font-semibold text-jeevan-primary">{value.title}</h3>
                  <p className="text-jeevan-text">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-jeevan-primary py-16 text-white">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold md:text-4xl">
            Why Families Trust Jeevan HealthCare
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              'Certified and experienced healthcare professionals',
              'Available 24/7 for emergencies',
              'Hospital-grade medical equipment',
              'Transparent and affordable pricing',
              'Personalized care plans',
              'NABL certified lab partners',
              'Digital health records',
              'Quick response time',
              'Comprehensive service range',
            ].map((item, index) => (
              <div key={index} className="flex items-start space-x-3">
                <CheckCircle2 className="mt-1 h-6 w-6 flex-shrink-0" />
                <span className="text-lg">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-6 text-3xl font-bold text-jeevan-primary md:text-4xl">Our Team</h2>
            <p className="mb-8 text-lg text-jeevan-text">
              Our team comprises experienced doctors, nurses, physiotherapists, caregivers, and
              support staff who are passionate about delivering exceptional healthcare. Every team
              member undergoes rigorous training and background verification to ensure the highest
              standards of care and professionalism.
            </p>
            <div className="grid gap-6 md:grid-cols-3">
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="mb-4 flex justify-center">
                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-jeevan-primary text-2xl font-bold text-white">
                      50+
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-jeevan-primary">
                    Healthcare Professionals
                  </h3>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <div className="mb-4 flex justify-center">
                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-jeevan-primary text-2xl font-bold text-white">
                      1000+
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-jeevan-primary">Families Served</h3>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <div className="mb-4 flex justify-center">
                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-jeevan-primary text-2xl font-bold text-white">
                      24/7
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-jeevan-primary">
                    Available Support
                  </h3>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
