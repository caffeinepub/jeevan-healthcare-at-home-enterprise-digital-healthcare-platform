import { Link } from '@tanstack/react-router';
import { Phone, Mail, MapPin, Heart } from 'lucide-react';
import { SiFacebook, SiInstagram, SiGoogle } from 'react-icons/si';

export default function Footer() {
  return (
    <footer className="border-t border-border bg-jeevan-soft-grey">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <div className="mb-4 flex items-center space-x-2">
              <img
                src="/assets/generated/jeevan-logo-transparent.dim_200x200.png"
                alt="Jeevan HealthCare"
                className="h-12 w-12"
              />
              <span className="font-heading text-lg font-bold text-jeevan-primary">Jeevan HealthCare</span>
            </div>
            <p className="text-sm text-jeevan-text/80">
              Bringing quality healthcare to your doorstep. Professional medical services at home in
              Hyderabad.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 font-heading text-lg font-semibold text-jeevan-primary">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-jeevan-text/80 transition-colors hover:text-jeevan-teal">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-jeevan-text/80 transition-colors hover:text-jeevan-teal"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-jeevan-text/80 transition-colors hover:text-jeevan-teal"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="mb-4 font-heading text-lg font-semibold text-jeevan-primary">Our Services</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/services/$slug"
                  params={{ slug: 'doctor-consultation' }}
                  className="text-jeevan-text/80 transition-colors hover:text-jeevan-teal"
                >
                  Doctor Consultation
                </Link>
              </li>
              <li>
                <Link
                  to="/services/$slug"
                  params={{ slug: 'nursing-care' }}
                  className="text-jeevan-text/80 transition-colors hover:text-jeevan-teal"
                >
                  Nursing Care
                </Link>
              </li>
              <li>
                <Link
                  to="/services/$slug"
                  params={{ slug: 'lab-tests' }}
                  className="text-jeevan-text/80 transition-colors hover:text-jeevan-teal"
                >
                  Lab Tests & Diagnostics
                </Link>
              </li>
              <li>
                <Link
                  to="/services/$slug"
                  params={{ slug: 'physiotherapy' }}
                  className="text-jeevan-text/80 transition-colors hover:text-jeevan-teal"
                >
                  Physiotherapy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 font-heading text-lg font-semibold text-jeevan-primary">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start space-x-2">
                <Phone className="mt-0.5 h-4 w-4 flex-shrink-0 text-jeevan-teal" />
                <a
                  href="tel:+919700104108"
                  className="text-jeevan-text/80 transition-colors hover:text-jeevan-teal"
                >
                  +91 97001 04108
                </a>
              </li>
              <li className="flex items-start space-x-2">
                <Mail className="mt-0.5 h-4 w-4 flex-shrink-0 text-jeevan-teal" />
                <a
                  href="mailto:care@jeevanhealthcare.com"
                  className="text-jeevan-text/80 transition-colors hover:text-jeevan-teal"
                >
                  care@jeevanhealthcare.com
                </a>
              </li>
              <li className="flex items-start space-x-2">
                <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-jeevan-teal" />
                <span className="text-jeevan-text/80">Hyderabad, India</span>
              </li>
            </ul>

            {/* Social Links */}
            <div className="mt-4 flex space-x-4">
              <a
                href="https://www.google.com/search?q=jeevan+healthcare"
                target="_blank"
                rel="noopener noreferrer"
                className="text-jeevan-primary transition-colors hover:text-jeevan-teal"
              >
                <SiGoogle className="h-5 w-5" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-jeevan-primary transition-colors hover:text-jeevan-teal"
              >
                <SiFacebook className="h-5 w-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-jeevan-primary transition-colors hover:text-jeevan-teal"
              >
                <SiInstagram className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-border pt-8 text-center text-sm text-jeevan-text/70">
          <p className="flex items-center justify-center space-x-1">
            <span>© 2025. Built with</span>
            <Heart className="h-4 w-4 fill-current text-jeevan-teal" />
            <span>using</span>
            <a
              href="https://caffeine.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-jeevan-primary transition-colors hover:text-jeevan-teal"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
