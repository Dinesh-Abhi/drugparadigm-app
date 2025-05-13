import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Mail, MapPin, Phone } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Message sent",
        description: "We've received your message and will get back to you soon.",
      });
      setFormData({
        name: "",
        email: "",
        company: "",
        subject: "",
        message: ""
      });
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
      <Navbar />
      <main className="flex-grow">
        <div className="bg-dp-purple-50 dark:bg-gray-800 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold text-center text-gray-900 dark:text-white">Contact Us</h1>
            <p className="mt-4 text-xl text-center text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Have questions about our AI models or interested in collaboration? Get in touch with our team.
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Send Us a Message</h2>
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Your Name *
                    </label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Email Address *
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Company/Organization
                    </label>
                    <Input
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Subject *
                    </label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="mb-6">
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Your Message *
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="resize-none"
                  />
                </div>
                <Button 
                  type="submit" 
                  className="bg-dp-purple-500 hover:bg-dp-purple-600 dark:bg-dp-purple-600 dark:hover:bg-dp-purple-700 text-white"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </div>

            {/* Contact Info */}
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Get in Touch</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-8">
                We'd love to hear from you. Whether you have questions about our AI models, are interested in collaborating, or just want to learn more about Drugparadigm, our team is here to help.
              </p>

              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="bg-dp-purple-100 dark:bg-dp-purple-900 rounded-full p-3">
                      <MapPin className="h-6 w-6 text-dp-purple-600 dark:text-dp-purple-300" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">Our Location</h3>
                    <p className="mt-1 text-gray-600 dark:text-gray-400">
                      123 AI Drive<br />
                      Cambridge, MA 02142<br />
                      United States
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="bg-dp-purple-100 dark:bg-dp-purple-900 rounded-full p-3">
                      <Mail className="h-6 w-6 text-dp-purple-600 dark:text-dp-purple-300" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">Email Us</h3>
                    <p className="mt-1 text-gray-600 dark:text-gray-400">
                      General Inquiries: <a href="mailto:info@drugparadigm.com" className="text-dp-purple-600 dark:text-dp-purple-400 hover:underline">info@drugparadigm.com</a><br />
                      Technical Support: <a href="mailto:support@drugparadigm.com" className="text-dp-purple-600 dark:text-dp-purple-400 hover:underline">support@drugparadigm.com</a><br />
                      Partnerships: <a href="mailto:partnerships@drugparadigm.com" className="text-dp-purple-600 dark:text-dp-purple-400 hover:underline">partnerships@drugparadigm.com</a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="bg-dp-purple-100 dark:bg-dp-purple-900 rounded-full p-3">
                      <Phone className="h-6 w-6 text-dp-purple-600 dark:text-dp-purple-300" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">Call Us</h3>
                    <p className="mt-1 text-gray-600 dark:text-gray-400">
                      Main Office: <a href="tel:+15551234567" className="text-dp-purple-600 dark:text-dp-purple-400 hover:underline">+1 (555) 123-4567</a><br />
                      Technical Support: <a href="tel:+15551234568" className="text-dp-purple-600 dark:text-dp-purple-400 hover:underline">+1 (555) 123-4568</a>
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-12">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Follow Us</h3>
                <div className="flex space-x-4">
                  {/* Socials */}
                  <a href="#" className="text-gray-400 hover:text-dp-purple-500">
                    <span className="sr-only">Twitter</span>
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="..." />
                    </svg>
                  </a>
                  <a href="#" className="text-gray-400 hover:text-dp-purple-500">
                    <span className="sr-only">LinkedIn</span>
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="..." />
                    </svg>
                  </a>
                  <a href="#" className="text-gray-400 hover:text-dp-purple-500">
                    <span className="sr-only">GitHub</span>
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="..." />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
