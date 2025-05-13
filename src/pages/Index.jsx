import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import ModelCard from "@/components/ModelCard";
import { getFeaturedModels, getNewestModels, drugModalities } from "@/lib/data";
import Cookies from "js-cookie";
import { GetAllDrugModalities } from "@/redux/drugmodailities/actionCreator";
import { useDispatch, useSelector } from "react-redux";
import { GetAllModels } from "@/redux/models/actionCreator";
const Index = () => {
  const [activeTab, setActiveTab] = useState("featured");
  const featuredModels = getFeaturedModels(3);
  const newestModels = getNewestModels(3);
  const dispatch = useDispatch();

  const {
    getDrugModalitiesData,
    DrugModalitiesDataLoading,
    getModelsData,
    ModelsDataLoading,
  } = useSelector((state) => {
    return {
      getDrugModalitiesData: state.getDrugModalitiesReducerRes.data,
      DrugModalitiesDataLoading: state.getDrugModalitiesReducerRes.loading,
      getModelsData: state.GetAllModelsReducerRes.data || [],
      ModelsDataLoading: state.GetAllModelsReducerRes.loading,
    };
  });

  useEffect(() => {
    dispatch(GetAllDrugModalities());
    dispatch(GetAllModels());
  }, [dispatch]);

  // Initialize theme from cookie on component mount
  useEffect(() => {
    const savedTheme = Cookies.get("theme");
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  // Normalize models list
  const allModels = getModelsData.map((m) => ({
    ...m,
    modality: m.modality?.modality_code || null,
    modalityTitle: m.modality?.title || "",
  }));

  console.log(allModels);
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <Navbar />
      <main className="flex-grow">
        <HeroSection />
        {/* Modalities Section */}
        <section className="py-16 bg-gray-50 dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                Drug Modalities
              </h2>
              <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Our models support various therapeutic modalities, enabling a
                comprehensive approach to drug discovery
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {getDrugModalitiesData?.map((modality) => (
                <div
                  key={modality.modality_code}
                  className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow"
                >
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    {modality.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {modality.description ||
                      `Specialized AI models for ${modality.title.toLowerCase()} design, optimization, and analysis.`}
                  </p>
                  <Link
                    to={`/models?modality=${encodeURIComponent(modality.modality_code)}`}
                    className="text-dp-purple-600 dark:text-dp-purple-400 hover:text-dp-purple-700 dark:hover:text-dp-purple-300 font-medium flex items-center text-sm"
                  >
                    Browse {modality.title} models{" "}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
        {/* Models Section */}
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                  Explore Our Models
                </h2>
                <p className="mt-2 text-lg text-gray-600 dark:text-gray-300">
                  Discover state-of-the-art AI models for drug discovery
                </p>
              </div>
              <div className="mt-4 md:mt-0">
                <Button
                  asChild
                  variant="outline"
                  className="text-dp-purple-600 dark:text-dp-purple-400 border-dp-purple-200 dark:border-dp-purple-600 hover:bg-dp-purple-50 dark:hover:bg-dp-purple-900 hover:text-dp-purple-700 dark:hover:text-dp-purple-300"
                >
                  <Link to="/models" className="flex items-center">
                    View all models <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>

            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="mb-8 bg-gray-100 dark:bg-gray-800">
                <TabsTrigger
                  value="featured"
                  className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700"
                >
                  Models
                </TabsTrigger>
                {/* <TabsTrigger
                  value="newest"
                  className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700"
                >
                  Newest Models
                </TabsTrigger> */}
              </TabsList>
              {/* all models and thier sub */}
              <TabsContent value="featured" className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {allModels
                    .filter((model) => model.is_live)
                    .map((model) => (
                      <ModelCard key={model.id} {...model} />
                    ))}
                </div>
              </TabsContent>
              {/* <TabsContent value="newest" className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {newestModels.map((model) => (
                    <ModelCard key={model.id} {...model} />
                  ))}
                </div>
              </TabsContent> */}
            </Tabs>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-dp-purple-50 dark:bg-dp-purple-900/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:grid lg:grid-cols-2 lg:gap-8 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                  Ready to accelerate your drug discovery pipeline?
                </h2>
                <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
                  Our AI models can help you identify promising compounds
                  faster, optimize lead molecules more efficiently, and reduce
                  the time and cost of bringing new therapeutics to market.
                </p>
                <div className="mt-8 flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4">
                  <Button
                    asChild
                    size="lg"
                    className="bg-dp-purple-500 hover:bg-dp-purple-600 dark:bg-dp-purple-600 dark:hover:bg-dp-purple-700 text-white"
                  >
                    <Link to="/models">Start Using Our Models</Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="text-dp-purple-600 dark:text-dp-purple-400 border-dp-purple-200 dark:border-dp-purple-600 hover:bg-dp-purple-50 dark:hover:bg-dp-purple-900 hover:text-dp-purple-700 dark:hover:text-dp-purple-300"
                  >
                    <Link to="/contact">Contact Our Team</Link>
                  </Button>
                </div>
              </div>
              <div className="mt-10 lg:mt-0 pl-0 lg:pl-8">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-100 dark:border-gray-700">
                  <div className="font-semibold text-gray-900 dark:text-white mb-4">
                    What our users say
                  </div>
                  <blockquote className="text-gray-600 dark:text-gray-300 italic">
                    "Drugparadigm's AI models have transformed our early-stage
                    discovery process. We've been able to identify novel
                    compounds with desired activity profiles in a fraction of
                    the time it would take using traditional methods."
                  </blockquote>
                  <div className="mt-4 flex items-center">
                    <div className="flex-shrink-0">
                      <div className="h-10 w-10 rounded-full bg-dp-blue-100 dark:bg-dp-blue-900 flex items-center justify-center">
                        <span className="text-dp-blue-600 dark:text-dp-blue-300 font-semibold">
                          JD
                        </span>
                      </div>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        Dr. Jane Doe
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        Lead Scientist, Pharma Company
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
