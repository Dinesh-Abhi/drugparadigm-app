import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const HeroSection = () => {
  return (
    <div className="relative hero-gradient dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-12 lg:py-20">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-6">
              <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
                <span className="block">Accelerate Drug</span>
                <span className="block text-dp-purple-500 dark:text-dp-purple-400">Discovery with AI</span>
              </h1>
              <p className="mt-6 text-xl text-gray-600 dark:text-gray-300 max-w-3xl">
                Drugparadigm provides state-of-the-art deep learning models for every stage of the drug discovery pipeline. Our models help researchers identify promising compounds faster and with higher accuracy.
              </p>
              <div className="mt-10 flex space-x-4">
                <Button asChild size="lg" className="bg-dp-purple-500 hover:bg-dp-purple-600 dark:bg-dp-purple-600 dark:hover:bg-dp-purple-700 text-white">
                  <Link to="/models">Explore Models</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="text-dp-purple-600 dark:text-dp-purple-400 border-dp-purple-200 dark:border-dp-purple-600 hover:bg-dp-purple-50 dark:hover:bg-dp-purple-900 hover:text-dp-purple-700 dark:hover:text-dp-purple-300">
                  <Link to="/resources" className="flex items-center">
                    Learn More <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
            <div className="mt-12 lg:mt-0 lg:col-span-6">
              <div className="bg-white dark:bg-gray-800 shadow-xl rounded-lg overflow-hidden border border-gray-100 dark:border-gray-700 animate-fade-in">
                <div className="px-6 py-8">
                  <div className="flex items-center justify-between">
                    <div className="bg-dp-purple-100 dark:bg-dp-purple-900/50 text-dp-purple-600 dark:text-dp-purple-300 px-3 py-1 rounded-full text-sm font-medium">
                      Featured Model
                    </div>
                    <div className="text-dp-blue-500 dark:text-dp-blue-300 text-sm font-medium">Small Molecule</div>
                  </div>
                  <h3 className="mt-4 text-xl font-semibold text-gray-900 dark:text-white">DrugGen-1B</h3>
                  <p className="mt-2 text-gray-600 dark:text-gray-300">
                    A generative model for small molecule drug design, trained on over 10 million compounds with known bioactivities.
                  </p>
                  <div className="mt-4 flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-300 mr-2">
                      NEW
                    </span>
                    Updated 2 weeks ago • 3,240+ downloads
                  </div>
                  <div className="mt-6">
                    <code className="block bg-gray-50 dark:bg-gray-900 p-4 rounded-md text-sm overflow-x-auto text-gray-800 dark:text-gray-200">
                      from drugparadigm import DrugGen<br />
                      <br />
                      model = DrugGen.from_pretrained("drugparadigm/druggen-1b")<br />
                      molecules = model.generate(target="EGFR", n=5)
                    </code>
                  </div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 px-6 py-3">
                  <a href="#" className="text-dp-purple-600 dark:text-dp-purple-400 hover:text-dp-purple-700 dark:hover:text-dp-purple-300 font-medium flex items-center">
                    View model details <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-white dark:from-gray-900 to-transparent"></div>
    </div>
  );
};

export default HeroSection;