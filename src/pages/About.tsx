import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Separator } from "@/components/ui/separator";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900">
      <Navbar />
      <main className="flex-grow">
        <div className="bg-dp-purple-50 dark:bg-gray-800 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold text-center text-gray-900 dark:text-white">
              About Drugparadigm
            </h1>
            <p className="mt-4 text-xl text-center text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              We're building the future of AI-powered drug discovery
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="prose prose-lg dark:prose-invert mx-auto">
            <h2>Our Mission</h2>
            <p>
              At Drugparadigm, we believe that artificial intelligence has the potential to
              revolutionize drug discovery and development...
            </p>
            <p>
              We're building a comprehensive platform of AI models...
            </p>

            <h2>Our Approach</h2>
            <p>
              Drugparadigm combines deep expertise in machine learning, computational chemistry...
            </p>
            <ul>
              <li>
                <strong>Comprehensive coverage of drug modalities</strong> – We develop specialized models...
              </li>
              <li>
                <strong>Data-driven training</strong> – Our models are trained on diverse datasets...
              </li>
              <li>
                <strong>Scientific rigor</strong> – We validate our models...
              </li>
              <li>
                <strong>Interpretable outputs</strong> – Our models offer insights...
              </li>
            </ul>

            <h2>Our Team</h2>
            <p>
              Drugparadigm was founded by a team of experts in AI, computational chemistry...
            </p>
            <p>
              Our team combines decades of experience in both academia and industry...
            </p>
          </div>

          <Separator className="my-12 dark:bg-gray-700" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
            {[
              {
                title: "Our Purpose",
                desc: "To accelerate the discovery of therapeutics that improve human health",
                icon: (
                  <path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z" />
                ),
              },
              {
                title: "Our Values",
                desc: "Scientific integrity, innovation, and collaboration",
                icon: (
                  <>
                    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                  </>
                ),
              },
              {
                title: "Our Focus",
                desc: "Creating AI models that solve real-world drug discovery challenges",
                icon: (
                  <>
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                  </>
                ),
              },
              {
                title: "Our Commitment",
                desc: "Advancing science through open research and collaboration",
                icon: (
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                ),
              },
            ].map((item, idx) => (
              <div className="text-center" key={idx}>
                <div className="bg-dp-purple-100 dark:bg-dp-purple-900 rounded-full h-16 w-16 flex items-center justify-center mx-auto">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-dp-purple-600 dark:text-dp-purple-300"
                  >
                    {item.icon}
                  </svg>
                </div>
                <h3 className="mt-4 text-xl font-semibold text-gray-900 dark:text-white">
                  {item.title}
                </h3>
                <p className="mt-2 text-gray-600 dark:text-gray-400">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Join Our Team
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              We're always looking for talented individuals who are passionate about using AI...
            </p>
            <div className="mt-6">
              <a
                href="#"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-dp-purple-500 hover:bg-dp-purple-600"
              >
                View Open Positions
              </a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default About;
