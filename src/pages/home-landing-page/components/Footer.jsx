import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const Footer = () => {
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();

  const footerData = {
    company: {
      name: "Rural Catering Hub",
      tagline: "Authentic Flavors, Delivered",
      description: "Connecting rural catering providers with food enthusiasts across India, preserving traditional recipes and supporting local communities."
    },
    quickLinks: [
      { label: "Home", path: "/home-landing-page" },
      { label: "Browse Dishes", path: "/product-catalog-browse" },
      { label: "Cart", path: "/shopping-cart-checkout" },
      { label: "My Account", path: "/user-account-dashboard" }
    ],
    forCaterers: [
      { label: "Caterer Dashboard", path: "/caterer-admin-dashboard" },
      { label: "Sell Your Food", path: "/caterer-admin-dashboard" },
      { label: "Partner with Us", path: "/caterer-admin-dashboard" },
      { label: "Support", path: "/caterer-admin-dashboard" }
    ],
    categories: [
      { label: "South Indian", path: "/product-catalog-browse?category=South Indian" },
      { label: "Rajasthani", path: "/product-catalog-browse?category=Rajasthani" },
      { label: "Bengali", path: "/product-catalog-browse?category=Bengali" },
      { label: "Punjabi", path: "/product-catalog-browse?category=Punjabi" },
      { label: "Sweet Dishes", path: "/product-catalog-browse?category=Sweet Dishes" },
      { label: "Gujarati", path: "/product-catalog-browse?category=Gujarati" }
    ],
    contact: {
      email: "hello@ruralcateringhub.com",
      phone: "+91 9555631308",
      address: "123 Heritage Lane, Cultural District, Mumbai, Maharashtra 400001"
    },
    socialMedia: [
      { name: "Facebook", icon: "Facebook", url: "https://facebook.com" },
      { name: "Instagram", icon: "Instagram", url: "https://instagram.com" },
      { name: "Twitter", icon: "Twitter", url: "https://twitter.com" },
      { name: "YouTube", icon: "Youtube", url: "https://youtube.com" }
    ]
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleSocialClick = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <footer className="bg-text-primary text-surface">
      {/* Newsletter Section */}
      <div className="border-b border-surface/20">
        <div className="content-max-width viewport-padding py-12">
          <div className="text-center max-w-2xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-heading font-bold mb-4">
              Stay Connected with Authentic Flavors
            </h3>
            <p className="text-surface/80 mb-6">
              Get updates on new caterers, seasonal dishes, and exclusive offers from rural kitchens across India
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 rounded-cultural border border-surface/20 bg-surface/10 text-surface placeholder-surface/60 focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <Button
                variant="primary"
                iconName="Mail"
                iconPosition="left"
                className="whitespace-nowrap"
              >
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="content-max-width viewport-padding py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-primary rounded-cultural flex items-center justify-center">
                <Icon name="UtensilsCrossed" size={28} color="white" />
              </div>
              <div>
                <h3 className="text-xl font-heading font-bold">{footerData.company.name}</h3>
                <p className="text-sm text-surface/80">{footerData.company.tagline}</p>
              </div>
            </div>
            <p className="text-surface/80 mb-6 leading-relaxed">
              {footerData.company.description}
            </p>
            
            {/* Social Media */}
            <div className="flex space-x-3">
              {footerData.socialMedia.map((social) => (
                <button
                  key={social.name}
                  onClick={() => handleSocialClick(social.url)}
                  className="w-10 h-10 bg-surface/10 hover:bg-primary rounded-cultural flex items-center justify-center cultural-transition"
                  aria-label={`Follow us on ${social.name}`}
                >
                  <Icon name={social.icon} size={18} color="currentColor" />
                </button>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-heading font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-3">
              {footerData.quickLinks.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => handleNavigation(link.path)}
                    className="text-surface/80 hover:text-surface cultural-transition text-left"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* For Caterers */}
          <div>
            <h4 className="text-lg font-heading font-semibold mb-4">For Caterers</h4>
            <ul className="space-y-3">
              {footerData.forCaterers.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => handleNavigation(link.path)}
                    className="text-surface/80 hover:text-surface cultural-transition text-left"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-lg font-heading font-semibold mb-4">Categories</h4>
            <ul className="space-y-3">
              {footerData.categories.map((category) => (
                <li key={category.label}>
                  <button
                    onClick={() => handleNavigation(category.path)}
                    className="text-surface/80 hover:text-surface cultural-transition text-left"
                  >
                    {category.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Contact Information */}
        <div className="mt-12 pt-8 border-t border-surface/20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary/20 rounded-cultural flex items-center justify-center">
                <Icon name="Mail" size={18} color="var(--color-primary)" />
              </div>
              <div>
                <p className="text-sm text-surface/60">Email</p>
                <p className="text-surface">{footerData.contact.email}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary/20 rounded-cultural flex items-center justify-center">
                <Icon name="Phone" size={18} color="var(--color-primary)" />
              </div>
              <div>
                <p className="text-sm text-surface/60">Phone</p>
                <p className="text-surface">{footerData.contact.phone}</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 bg-primary/20 rounded-cultural flex items-center justify-center flex-shrink-0">
                <Icon name="MapPin" size={18} color="var(--color-primary)" />
              </div>
              <div>
                <p className="text-sm text-surface/60">Address</p>
                <p className="text-surface text-sm leading-relaxed">{footerData.contact.address}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-surface/20">
        <div className="content-max-width viewport-padding py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-surface/80 text-sm text-center md:text-left">
              <p>&copy; {currentYear} Rural Catering Hub. All rights reserved.</p>
              <p className="mt-1">Preserving traditions, one meal at a time.</p>
            </div>
            
            <div className="flex flex-wrap justify-center md:justify-end space-x-6 text-sm">
              <button className="text-surface/80 hover:text-surface cultural-transition">
                Privacy Policy
              </button>
              <button className="text-surface/80 hover:text-surface cultural-transition">
                Terms of Service
              </button>
              <button className="text-surface/80 hover:text-surface cultural-transition">
                Cookie Policy
              </button>
              <button className="text-surface/80 hover:text-surface cultural-transition">
                Help Center
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;