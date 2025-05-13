import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ModelCard from "@/components/ModelCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Search } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { GetAllModels } from "@/redux/models/actionCreator";
import { GetAllDrugModalities } from "@/redux/drugmodailities/actionCreator";

const Models = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  // Read ?modality= from URL for initial filter
  const queryParams = new URLSearchParams(location.search);
  const initialModality = queryParams.get("modality") || null;

  // Redux slices
  const {
    getModelsData = [],
    getDrugModalitiesData = [],
    loadingModels,
    loadingModalities,
  } = useSelector((state) => ({
    getModelsData: state.GetAllModelsReducerRes.data || [],
    loadingModels: state.GetAllModelsReducerRes.loading,
    getDrugModalitiesData: state.getDrugModalitiesReducerRes.data || [],
    loadingModalities: state.getDrugModalitiesReducerRes.loading,
  }));

  // Fetch data
  useEffect(() => {
    dispatch(GetAllModels());
    dispatch(GetAllDrugModalities());
  }, [dispatch]);

  // Normalize models list
  const allModels = getModelsData.map((m) => ({
    ...m,
    modality: m.modality?.modality_code || null,
    modalityTitle: m.modality?.title || "",
  }));

  // Filter state
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedModels, setSelectedModels] = useState([]);
  const [selectedModalities, setSelectedModalities] = useState(
    initialModality ? [initialModality] : []
  );
  const [selectedTags, setSelectedTags] = useState([]);
  const [showLiveOnly, setShowLiveOnly] = useState(false);

  // Derive tags and options
  const allTags = Array.from(
    new Set(allModels.flatMap((m) => (m.tags || []).map((t) => t.name)))
  ).sort();

  // Apply filters
  const filteredModels = allModels.filter((m) => {
    if (
      searchQuery &&
      !m.name.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }
    if (selectedModels.length && !selectedModels.includes(m.id)) {
      return false;
    }
    if (selectedModalities.length && !selectedModalities.includes(m.modality)) {
      return false;
    }
    if (
      selectedTags.length &&
      !m.tags.some((t) => selectedTags.includes(t.name))
    ) {
      return false;
    }
    if (showLiveOnly && !m.is_live) {
      return false;
    }
    return true;
  });

  // Handlers
  const toggle = (val, arr, setArr) =>
    setArr(arr.includes(val) ? arr.filter((x) => x !== val) : [...arr, val]);

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedModels([]);
    setSelectedModalities([]);
    setSelectedTags([]);
    setShowLiveOnly(false);
  };

  const isLoading = loadingModels || loadingModalities;

  return (
    <div className="min-h-screen flex flex-col dark:bg-gray-900">
      <Navbar />
      <main className="flex-grow bg-gray-50 dark:bg-gray-900 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Models Hub
            </h1>
            <p className="mt-2 text-lg text-gray-600 dark:text-gray-300">
              {filteredModels.length}{" "}
              {filteredModels.length === 1 ? "model" : "models"} found
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Filters Sidebar */}
            <aside className="lg:col-span-1 space-y-6">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border dark:border-gray-700 sticky top-24 space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Filters
                  </h2>
                  <Button variant="ghost" size="sm" onClick={clearFilters}>
                    Clear
                  </Button>
                </div>

                {/* Search */}
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-4 w-4 text-gray-400 dark:text-gray-500" />
                  </div>
                  <Input
                    type="text"
                    placeholder="Search models..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>

                {/* Models */}
                {/* <div>
                  <h3 className="font-medium text-gray-900 dark:text-gray-200 mb-2">
                    Models
                  </h3>
                  <div className="max-h-40 overflow-auto space-y-1">
                    {allModels.map((m) => (
                      <div key={m.id} className="flex items-center">
                        <Checkbox
                          id={`mdl-${m.id}`}
                          checked={selectedModels.includes(m.id)}
                          onCheckedChange={() =>
                            toggle(m.id, selectedModels, setSelectedModels)
                          }
                        />
                        <label
                          htmlFor={`mdl-${m.id}"`}
                          className="ml-2 text-sm text-gray-700 dark:text-gray-300"
                        >
                          {m.name}
                        </label>
                      </div>
                    ))}
                  </div>
                </div> */}

                {/* Modalities */}
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-gray-200 mb-2">
                    Modalities
                  </h3>
                  <div className="space-y-1">
                    {getDrugModalitiesData.map((mod) => (
                      <div key={mod.modality_code} className="flex items-center">
                        <Checkbox
                          id={`mod-${mod.modality_code}`}
                          checked={selectedModalities.includes(mod.modality_code)}
                          onCheckedChange={() =>
                            toggle(
                              mod.modality_code,
                              selectedModalities,
                              setSelectedModalities
                            )
                          }
                        />
                        <label
                          htmlFor={`mod-${mod.modality_code}"`}
                          className="ml-2 text-sm text-gray-700 dark:text-gray-300"
                        >
                          {mod.title}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tags */}
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-gray-200 mb-2">
                    Tags
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {allTags.map((tag) => (
                      <Badge
                        key={tag}
                        className={`cursor-pointer text-xs px-2 py-0.5 rounded-full border ${
                          selectedTags.includes(tag)
                            ? "bg-dp-blue-200 border-dp-blue-400 text-dp-white-800"
                            : "bg-dp-white-300 border-dp-blue-500 text-dp-blue-800"
                        }`}
                        onClick={() =>
                          toggle(tag, selectedTags, setSelectedTags)
                        }
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Live only */}
                <div className="flex items-center">
                  <Checkbox
                    id="live-only"
                    checked={showLiveOnly}
                    onCheckedChange={(c) => setShowLiveOnly(c === true)}
                  />
                  <label htmlFor="live-only" className="ml-2 text-sm">
                    Live only
                  </label>
                </div>
              </div>
            </aside>

            {/* Models Grid */}
            <section className="lg:col-span-3">
              {isLoading ? (
                <p>Loading models…</p>
              ) : filteredModels.length ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredModels.map((m) => (
                    <ModelCard key={m.id} {...m} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    No models available.
                  </h3>
                  <Button variant="outline" onClick={clearFilters}>
                    Clear filters
                  </Button>
                </div>
              )}
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Models;
