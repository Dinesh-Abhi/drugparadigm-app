// src/pages/ModelDetail.jsx

import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Copy } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { DocViewer } from "./ModelViewer/DocViewer";
import ModelInference from "./ModelInference";
import { useDispatch, useSelector } from "react-redux";
import { GetSingleModel } from "@/redux/models/actionCreator";

const ModelDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { toast } = useToast();

  const { getSingleModelData: model, SingleModelDataLoading } = useSelector(
    (state) => ({
      getSingleModelData: state.GetSingleModelReducerRes.data,
      SingleModelDataLoading: state.GetSingleModelReducerRes.loading,
    })
  );

  const [readme, setReadme] = useState("");

  // fetch model on mount or id change
  useEffect(() => {
    if (id) {
      dispatch(GetSingleModel(id));
    }
  }, [dispatch, id]);

  // fetch README markdown
  // useEffect(() => {
  //   if (model?.id) {
  //     fetch(`/docs/${id}.md`)
  //       .then((res) => res.text())
  //       .then(setReadme)
  //       .catch(() =>
  //         setReadme(
  //           "# Documentation Not Found\nNo README file is available for this model."
  //         )
  //       );
  //   }
  // }, [model?.id]);

  useEffect(() => {
    if (model?.description_path) {
      const descriptionPath = model.description_path.trim();
      if (descriptionPath === "" || descriptionPath === null) {
        setReadme(
          "# Documentation Not Found\nNo README file is available for this model."
        );
        return;
      }
  
      const baseUrl = import.meta.env.VITE_APP_API_URL;
      const fullPath = `${baseUrl}${descriptionPath}`;
  
      fetch(fullPath)
        .then((res) => res.text())
        .then(setReadme)
        .catch(() =>
          setReadme(
            "# Documentation Not Found\nNo README file is available for this model."
          )
        );
    } else {
      setReadme(
        "# Documentation Not Found\nNo README file is available for this model."
      );
    }
  }, [model?.description_path]);
  

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: "You can now paste the code in your project.",
    });
  };

  if (SingleModelDataLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading model…</p>
      </div>
    );
  }

  if (!model) {
    return (
      <div className="min-h-screen flex flex-col dark:bg-gray-900">
        <Navbar />
        <main className="flex-grow flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Model Not Found
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              We couldn't find the model you're looking for.
            </p>
            <Button asChild>
              <Link to="/models" className="flex items-center">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Models
              </Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col dark:bg-gray-900">
      <Navbar />
      <main className="flex-grow bg-gray-50 dark:bg-gray-900 pb-16">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <Link
                  to="/models"
                  className="text-dp-purple-600 dark:text-dp-purple-400 hover:text-dp-purple-700 dark:hover:text-dp-purple-300 flex items-center text-sm mb-4"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" /> Back to Models
                </Link>
                <div className="flex items-center space-x-3">
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                    {model.name}
                  </h1>
                  {model.is_live && (
                    <Badge className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200">
                      LIVE
                    </Badge>
                  )}
                </div>
                <div className="mt-2 flex items-center">
                  <Badge className="bg-dp-purple-100 dark:bg-dp-purple-900 text-dp-purple-600 dark:text-dp-purple-300 mr-2">
                    {model.modality?.code || 'others'}
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main */}
            <div className="lg:col-span-2">
              <Tabs defaultValue="overview">
                <TabsList className="mb-6 bg-white dark:bg-gray-800">
                  <TabsTrigger
                    value="overview"
                    className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700"
                  >
                    Overview
                  </TabsTrigger>
                  {/* <TabsTrigger
                    value="usage"
                    className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700"
                  >
                    Usage
                  </TabsTrigger>
                  <TabsTrigger
                    value="performance"
                    className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700"
                  >
                    Performance
                  </TabsTrigger> */}
                </TabsList>

                <TabsContent value="overview" className="mt-0">
                  <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
                    <DocViewer markdown={readme} />
                  </div>
                </TabsContent>
                {/* 
                <TabsContent value="usage" className="mt-0">
                  <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
                    <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
                      How to Use This Model
                    </h2>
                    <div className="relative">
                      <pre className="bg-gray-50 dark:bg-gray-900 p-4 rounded-md text-sm overflow-x-auto text-gray-800 dark:text-gray-300 border dark:border-gray-700">
                        {model.usage || "Usage example not available"}
                      </pre>
                      <button
                        onClick={() => model.usage && copyToClipboard(model.usage)}
                        className="absolute top-3 right-3 p-1.5 rounded-md text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                      >
                        <Copy className="h-4 w-4" />
                      </button>
                    </div>
                    <h3 className="text-xl font-semibold mt-8 mb-4 text-gray-900 dark:text-white">
                      Installation
                    </h3>
                    <div className="relative">
                      <pre className="bg-gray-50 dark:bg-gray-900 p-4 rounded-md text-sm overflow-x-auto text-gray-800 dark:text-gray-300 border dark:border-gray-700">
                        pip install drugparadigm
                      </pre>
                      <button
                        onClick={() => copyToClipboard("pip install drugparadigm")}
                        className="absolute top-3 right-3 p-1.5 rounded-md text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                      >
                        <Copy className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="performance" className="mt-0">
                  <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
                    <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">
                      Model Performance
                    </h2>
                    {model.performance?.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {model.performance.map((perf, i) => (
                          <div
                            key={i}
                            className="bg-gray-50 dark:bg-gray-700 p-4 rounded-md"
                          >
                            <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                              {perf.metric}
                            </div>
                            <div className="text-2xl font-semibold text-gray-900 dark:text-white mt-1">
                              {perf.value}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-600 dark:text-gray-400">
                        Performance metrics not available for this model.
                      </p>
                    )}
                  </div>
                </TabsContent> */}
              </Tabs>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 sticky top-24 space-y-6">
                {/* <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Tags
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {model.tags.map((t) => (
                      <Badge
                        key={t.name}
                        className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                      >
                        {t.name}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Model Card
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Modality
                      </div>
                      <div className="font-medium text-gray-900 dark:text-gray-200">
                        {model.modality}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Last Update
                      </div>
                      <div className="font-medium text-gray-900 dark:text-gray-200">
                        {model.updatedAt}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Downloads
                      </div>
                    </div>
                  </div>
                </div> */}

                <ModelInference model={model} />
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ModelDetail;
