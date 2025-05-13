import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Book, File, Search, Video } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface Resource {
  id: string;
  title: string;
  description: string;
  type: "documentation" | "tutorial" | "paper" | "video";
  url: string;
  date: string;
  tags: string[];
}

const resources: Resource[] = [
  {
    id: "quickstart",
    title: "QuickStart Guide",
    description: "Get started with Drugparadigm models in under 5 minutes",
    type: "documentation",
    url: "#",
    date: "Updated 2 weeks ago",
    tags: ["Beginner", "Overview"]
  },
  {
    id: "api-reference",
    title: "API Reference",
    description: "Complete reference for the Drugparadigm Python API",
    type: "documentation",
    url: "#",
    date: "Updated 1 month ago",
    tags: ["API", "Reference"]
  },
  {
    id: "small-molecule-tutorial",
    title: "Small Molecule Generation Tutorial",
    description: "Learn how to generate novel small molecules with DrugGen-1B",
    type: "tutorial",
    url: "#",
    date: "Updated 2 weeks ago",
    tags: ["Small Molecule", "Generation", "DrugGen-1B"]
  },
  {
    id: "protein-binding-tutorial",
    title: "Protein-Ligand Binding Prediction",
    description: "Tutorial on predicting protein-ligand binding with ProtBind-XL",
    type: "tutorial",
    url: "#",
    date: "Updated 1 month ago",
    tags: ["Protein", "Binding", "ProtBind-XL"]
  },
  {
    id: "admet-paper",
    title: "Deep Learning for ADMET Property Prediction",
    description: "Research paper describing the architecture and training of our ADMET-Predictor model",
    type: "paper",
    url: "#",
    date: "Published 2 months ago",
    tags: ["ADMET", "Research", "Small Molecule"]
  },
  {
    id: "antibody-paper",
    title: "Generative Models for Antibody Design",
    description: "Research paper on our approach to antibody sequence design and optimization",
    type: "paper",
    url: "#",
    date: "Published 3 months ago",
    tags: ["Antibody", "Research", "Generation"]
  },
  {
    id: "webinar-intro",
    title: "Introduction to Drugparadigm",
    description: "Webinar introducing the Drugparadigm platform and its capabilities",
    type: "video",
    url: "#",
    date: "Recorded 1 month ago",
    tags: ["Overview", "Webinar"]
  },
  {
    id: "workshop-admet",
    title: "ADMET Prediction Workshop",
    description: "In-depth workshop on using our ADMET-Predictor model for drug development",
    type: "video",
    url: "#",
    date: "Recorded 3 weeks ago",
    tags: ["ADMET", "Workshop", "Small Molecule"]
  }
];

const ResourceTypeIcon = ({ type }: { type: string }) => {
  switch (type) {
    case "documentation":
      return <Book className="h-4 w-4" />;
    case "tutorial":
      return <File className="h-4 w-4" />;
    case "paper":
      return <File className="h-4 w-4" />;
    case "video":
      return <Video className="h-4 w-4" />;
    default:
      return <File className="h-4 w-4" />;
  }
};

const ResourceTypeLabel = ({ type }: { type: string }) => {
  switch (type) {
    case "documentation":
      return "Documentation";
    case "tutorial":
      return "Tutorial";
    case "paper":
      return "Research Paper";
    case "video":
      return "Video";
    default:
      return type;
  }
};

const Resources = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTab, setSelectedTab] = useState("all");

  const filteredResources = resources.filter(resource => {
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        resource.title.toLowerCase().includes(query) ||
        resource.description.toLowerCase().includes(query) ||
        resource.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }
    return true;
  }).filter(resource => {
    if (selectedTab === "all") return true;
    return resource.type === selectedTab;
  });

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900">
      <Navbar />
      <main className="flex-grow">
        <div className="bg-dp-purple-50 dark:bg-gray-900 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold text-center text-gray-900 dark:text-white">Resources</h1>
            <p className="mt-4 text-xl text-center text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Documentation, tutorials, and research papers to help you get the most out of our models
            </p>
            <div className="mt-8 max-w-2xl mx-auto">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                </div>
                <Input
                  type="text"
                  placeholder="Search resources..."
                  className="pl-10 py-6 text-base bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700 rounded-md"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-100 dark:bg-gray-800 py-12">
          <div className="max-w-7xl dark:bg-gray-800 mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <Tabs value={selectedTab} onValueChange={setSelectedTab}>
              <TabsList className="mb-8 w-full max-w-2xl mx-auto bg-gray-100 dark:bg-gray-800 border dark:border-gray-700 rounded-md">
                <TabsTrigger value="all">All Resources</TabsTrigger>
                <TabsTrigger value="documentation">Documentation</TabsTrigger>
                <TabsTrigger value="tutorial">Tutorials</TabsTrigger>
                <TabsTrigger value="paper">Research Papers</TabsTrigger>
                <TabsTrigger value="video">Videos</TabsTrigger>
              </TabsList>

              <TabsContent value={selectedTab} className="mt-0">
                {filteredResources.length === 0 ? (
                  <div className="text-center py-12">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No resources found</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Try adjusting your search query.
                    </p>
                    <Button
                      variant="outline"
                      onClick={() => setSearchQuery("")}
                      className="mt-4"
                    >
                      Clear search
                    </Button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredResources.map((resource) => (
                      <Card key={resource.id} className="overflow-hidden hover:shadow-md transition-shadow dark:bg-gray-900 dark:border-gray-700">
                        <CardHeader className="pb-3">
                          <div className="flex items-center justify-between mb-1">
                            <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200">
                              <ResourceTypeIcon type={resource.type} />
                              <span className="ml-1">{ResourceTypeLabel({ type: resource.type })}</span>
                            </div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">{resource.date}</div>
                          </div>
                          <CardTitle className="text-gray-900 dark:text-white">{resource.title}</CardTitle>
                          <CardDescription className="text-gray-600 dark:text-gray-400">{resource.description}</CardDescription>
                        </CardHeader>
                        <CardContent className="pt-0">
                          <div className="flex flex-wrap gap-2 mb-4">
                            {resource.tags.map((tag) => (
                              <div
                                key={tag}
                                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-dp-purple-50 text-dp-purple-700 dark:bg-dp-purple-900 dark:text-dp-purple-200"
                              >
                                {tag}
                              </div>
                            ))}
                          </div>
                          <a
                            href={resource.url}
                            className="text-dp-purple-600 hover:text-dp-purple-700 dark:text-dp-purple-400 dark:hover:text-dp-purple-300 font-medium flex items-center text-sm"
                          >
                            View resource <ArrowRight className="ml-1 h-4 w-4" />
                          </a>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* Call to Action Section */}

        {/* FAQ Section */}
        <div className="bg-gray-50 dark:bg-gray-950 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Frequently Asked Questions</h2>
              <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                Common questions about Drugparadigm models and how to use them
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  How do I install the Drugparadigm package?
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-2">
                  You can install our package using pip:
                </p>
                <pre className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white p-3 rounded-md text-sm mb-4">
                  pip install drugparadigm
                </pre>
                <p className="text-gray-600 dark:text-gray-400">
                  For more detailed installation instructions, check our <a href="#" className="text-dp-purple-600 hover:text-dp-purple-700 dark:text-dp-purple-400 dark:hover:text-dp-purple-300">installation guide</a>.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  What input formats are supported?
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Our models support various input formats depending on the model type. Small molecule models accept SMILES strings, protein models accept PDB files or amino acid sequences, and RNA models accept nucleotide sequences. Check the documentation for each specific model for details.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Can I use the models locally without an internet connection?
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Yes, once you've downloaded a model it can be used offline. Use the <code className="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded">from_pretrained</code> method with <code className="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded">local_files_only=True</code> to use your locally cached models.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Are there usage limits for the models?
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Our open-source models can be used without limits. For commercial applications or high-throughput usage, we offer premium models and API access with additional capabilities. Contact our <Link to="/contact" className="text-dp-purple-600 hover:text-dp-purple-700 dark:text-dp-purple-400 dark:hover:text-dp-purple-300">sales team</Link> for more information.
                </p>
              </div>
            </div>

            <div className="mt-12 text-center">
              <Link to="/contact">
                <Button className="bg-dp-purple-500 hover:bg-dp-purple-600 dark:bg-dp-purple-700 dark:hover:bg-dp-purple-600 text-white">
                  Contact Support for More Questions
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Resources;
