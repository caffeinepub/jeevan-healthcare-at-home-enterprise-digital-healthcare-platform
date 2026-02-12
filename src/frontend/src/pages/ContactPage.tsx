import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import { SiWhatsapp, SiFacebook, SiInstagram, SiGoogle } from 'react-icons/si';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function ContactPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-jeevan-primary py-16 text-white">
        <div className="container mx-auto px-4">
          <h1 className="mb-4 text-4xl font-bold md:text-5xl">Contact Us</h1>
          <p className="text-xl text-white/90">
            Get in touch with us for any healthcare service or inquiry
          </p>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Contact Details */}
            <div>
              <h2 className="mb-6 text-3xl font-bold text-jeevan-primary">Get In Touch</h2>
              <p className="mb-8 text-lg text-jeevan-text">
                We're here to help you with all your home healthcare needs. Reach out to us through
                any of the following channels, and our team will respond promptly.
              </p>

              <div className="space-y-6">
                <Card>
                  <CardContent className="flex items-start space-x-4 p-6">
                    <div className="rounded-full bg-jeevan-primary/10 p-3">
                      <Phone className="h-6 w-6 text-jeevan-primary" />
                    </div>
                    <div>
                      <h3 className="mb-1 font-semibold text-jeevan-primary">Phone</h3>
                      <a
                        href="tel:+919700104108"
                        className="text-jeevan-text hover:text-jeevan-primary"
                      >
                        +91 97001 04108
                      </a>
                      <p className="mt-1 text-sm text-jeevan-text/70">Available 24/7</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="flex items-start space-x-4 p-6">
                    <div className="rounded-full bg-jeevan-primary/10 p-3">
                      <SiWhatsapp className="h-6 w-6 text-jeevan-primary" />
                    </div>
                    <div>
                      <h3 className="mb-1 font-semibold text-jeevan-primary">WhatsApp</h3>
                      <a
                        href="https://wa.me/919700104108"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-jeevan-text hover:text-jeevan-primary"
                      >
                        +91 97001 04108
                      </a>
                      <p className="mt-1 text-sm text-jeevan-text/70">Quick response</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="flex items-start space-x-4 p-6">
                    <div className="rounded-full bg-jeevan-primary/10 p-3">
                      <Mail className="h-6 w-6 text-jeevan-primary" />
                    </div>
                    <div>
                      <h3 className="mb-1 font-semibold text-jeevan-primary">Email</h3>
                      <a
                        href="mailto:care@jeevanhealthcare.com"
                        className="text-jeevan-text hover:text-jeevan-primary"
                      >
                        care@jeevanhealthcare.com
                      </a>
                      <p className="mt-1 text-sm text-jeevan-text/70">
                        We'll respond within 24 hours
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="flex items-start space-x-4 p-6">
                    <div className="rounded-full bg-jeevan-primary/10 p-3">
                      <MapPin className="h-6 w-6 text-jeevan-primary" />
                    </div>
                    <div>
                      <h3 className="mb-1 font-semibold text-jeevan-primary">Location</h3>
                      <p className="text-jeevan-text">Hyderabad, Telangana, India</p>
                      <p className="mt-1 text-sm text-jeevan-text/70">Serving all areas</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="flex items-start space-x-4 p-6">
                    <div className="rounded-full bg-jeevan-primary/10 p-3">
                      <Clock className="h-6 w-6 text-jeevan-primary" />
                    </div>
                    <div>
                      <h3 className="mb-1 font-semibold text-jeevan-primary">Working Hours</h3>
                      <p className="text-jeevan-text">24/7 Emergency Services</p>
                      <p className="mt-1 text-sm text-jeevan-text/70">
                        Regular services: 8 AM - 8 PM
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Social Media */}
              <div className="mt-8">
                <h3 className="mb-4 text-xl font-semibold text-jeevan-primary">Follow Us</h3>
                <div className="flex space-x-4">
                  <a
                    href="https://www.google.com/search?q=jeevan+healthcare"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full bg-jeevan-primary/10 p-3 text-jeevan-primary transition-colors hover:bg-jeevan-primary hover:text-white"
                  >
                    <SiGoogle className="h-6 w-6" />
                  </a>
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full bg-jeevan-primary/10 p-3 text-jeevan-primary transition-colors hover:bg-jeevan-primary hover:text-white"
                  >
                    <SiFacebook className="h-6 w-6" />
                  </a>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full bg-jeevan-primary/10 p-3 text-jeevan-primary transition-colors hover:bg-jeevan-primary hover:text-white"
                  >
                    <SiInstagram className="h-6 w-6" />
                  </a>
                </div>
              </div>
            </div>

            {/* Quick Contact Form */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl text-jeevan-primary">
                    Book a Home Service
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-6 text-jeevan-text">
                    For immediate assistance and to book any of our home healthcare services, please
                    call or WhatsApp us directly. Our team is ready to help you 24/7.
                  </p>

                  <div className="space-y-4">
                    <Button
                      asChild
                      size="lg"
                      className="w-full bg-jeevan-primary hover:bg-jeevan-accent"
                    >
                      <a href="tel:+919700104108">
                        <Phone className="mr-2 h-5 w-5" />
                        Call +91 97001 04108
                      </a>
                    </Button>

                    <Button
                      asChild
                      size="lg"
                      variant="outline"
                      className="w-full border-jeevan-primary text-jeevan-primary hover:bg-jeevan-primary hover:text-white"
                    >
                      <a
                        href="https://wa.me/919700104108"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <SiWhatsapp className="mr-2 h-5 w-5" />
                        WhatsApp Us
                      </a>
                    </Button>

                    <Button
                      asChild
                      size="lg"
                      variant="outline"
                      className="w-full border-jeevan-primary text-jeevan-primary hover:bg-jeevan-primary hover:text-white"
                    >
                      <a href="mailto:care@jeevanhealthcare.com">
                        <Mail className="mr-2 h-5 w-5" />
                        Email Us
                      </a>
                    </Button>
                  </div>

                  <div className="mt-8 rounded-lg bg-jeevan-primary/5 p-6">
                    <h4 className="mb-3 font-semibold text-jeevan-primary">
                      What to expect when you contact us:
                    </h4>
                    <ul className="space-y-2 text-sm text-jeevan-text">
                      <li className="flex items-start space-x-2">
                        <span className="mt-1 text-jeevan-primary">•</span>
                        <span>Immediate response from our care team</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="mt-1 text-jeevan-primary">•</span>
                        <span>Detailed discussion of your healthcare needs</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="mt-1 text-jeevan-primary">•</span>
                        <span>Transparent pricing and service details</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="mt-1 text-jeevan-primary">•</span>
                        <span>Flexible scheduling at your convenience</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="mt-1 text-jeevan-primary">•</span>
                        <span>Professional service delivery at your doorstep</span>
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Service Areas */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-6 text-3xl font-bold text-jeevan-primary">Service Areas</h2>
            <p className="mb-8 text-lg text-jeevan-text">
              We provide home healthcare services across all areas of Hyderabad and surrounding
              regions. Our team is equipped to reach you quickly, no matter where you are located in
              the city.
            </p>
            <p className="text-jeevan-text">
              <strong>Coverage:</strong> All areas of Hyderabad including Secunderabad, Gachibowli,
              Hitech City, Madhapur, Banjara Hills, Jubilee Hills, Kukatpally, Miyapur, and more.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
