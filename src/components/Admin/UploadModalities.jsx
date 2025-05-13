import { useState } from "react";
import {
  User,
  FileText,
  Type,
  List,
  Link2,
  Image,
  Download,
  Sun,
  Moon,
  HelpCircle,
  Eye,
  EyeOff,
  Settings,
  Info,
  X,
  Check,
} from "lucide-react";

// Main component
export default function UploadModalities() {
  const [darkMode, setDarkMode] = useState(false);
  const [showSampleModal, setShowSampleModal] = useState(false);
  const [activeTooltip, setActiveTooltip] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    inputType: "single",
    headerInputNames: "",
    links: "",
    submitted: false,
  });
  const [fileName, setFileName] = useState(null);
  const [preview, setPreview] = useState(false);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle file upload
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
    }
  };

  // Handle form submission
  const handleSubmit = () => {
    setFormData((prev) => ({
      ...prev,
      submitted: true,
    }));
    setTimeout(() => {
      setFormData((prev) => ({
        ...prev,
        submitted: false,
      }));
    }, 3000);
  };

  // Define sample data
  const sampleData = {
    single: `{
  "name": "Product Survey",
  "description": "Please provide feedback on our product",
  "inputType": "single",
  "link": "https://example.com/product"
}`,
    multiple: `{
  "name": "Weekly Report",
  "description": "Submit your weekly progress report",
  "inputType": "multiple",
  "headerInputNames": "Day,Task,Hours,Status",
  "links": "https://example.com/docs, https://example.com/help"
}`,
  };

  // Apply the current theme to the page
  const pageClass = darkMode
    ? "bg-gray-900 text-white min-h-screen"
    : "bg-gray-100 text-gray-800 min-h-screen";

  return (
    <div className={pageClass}>
      <div className="container mx-auto p-4 md:p-6 lg:p-8">
        <div
          className={`${darkMode ? "bg-gray-800" : "bg-white"} rounded-lg shadow-lg p-4 md:p-6 lg:p-8`}
        >
          {/* Header Section */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <h1 className="text-2xl md:text-3xl font-bold">
              Upload Modalities
            </h1>
            <div className="flex space-x-4 items-center">
              <button
                onClick={() => setShowSampleModal(true)}
                className="flex items-center gap-2 text-sm px-3 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 transition-colors"
              >
                <Download size={16} /> Examples
              </button>
              <button
                onClick={toggleDarkMode}
                className={`p-2 rounded-full transition-colors ${darkMode ? "bg-gray-700 text-yellow-300 hover:bg-gray-600" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}
                aria-label={
                  darkMode ? "Switch to light mode" : "Switch to dark mode"
                }
              >
                {darkMode ? <Sun size={18} /> : <Moon size={18} />}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-6">
              {/* Name Field */}
              <div className="relative">
                <label className="flex items-center gap-2 text-sm font-medium mb-2">
                  <User size={16} />
                  Name
                  <button
                    type="button"
                    onClick={() =>
                      setActiveTooltip(activeTooltip === "name" ? null : "name")
                    }
                    className="text-blue-500 hover:text-blue-600"
                    aria-label="Help for name field"
                  >
                    <HelpCircle size={14} />
                  </button>
                </label>
                {activeTooltip === "name" && (
                  <div
                    className={`absolute z-10 p-3 rounded-md text-sm w-64 top-0 left-24 shadow-lg ${darkMode ? "bg-gray-700 text-white" : "bg-white text-gray-800 border border-gray-200"}`}
                  >
                    Enter the name of your form or project
                    <button
                      onClick={() => setActiveTooltip(null)}
                      className="absolute top-1 right-1 text-gray-500 hover:text-gray-700"
                      aria-label="Close tooltip"
                    >
                      <X size={14} />
                    </button>
                  </div>
                )}
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full p-3 rounded-md border focus:ring-2 focus:ring-blue-500 focus:outline-none transition-colors ${darkMode ? "bg-gray-700 border-gray-600" : "bg-gray-50 border-gray-300"}`}
                  placeholder="Enter form name"
                />
              </div>

              {/* Description Field */}
              <div className="relative">
                <label
                  htmlFor="description"
                  className="flex items-center gap-2 text-sm font-medium mb-2"
                >
                  <FileText size={16} />
                  Description
                  <button
                    type="button"
                    onClick={() =>
                      setActiveTooltip(
                        activeTooltip === "description" ? null : "description"
                      )
                    }
                    className="text-blue-500 hover:text-blue-600"
                    aria-label="Help for description field"
                  >
                    <HelpCircle size={14} />
                  </button>
                </label>
                {activeTooltip === "description" && (
                  <div
                    className={`absolute z-10 p-3 rounded-md text-sm w-64 top-0 left-32 shadow-lg ${darkMode ? "bg-gray-700 text-white" : "bg-white text-gray-800 border border-gray-200"}`}
                  >
                    Provide details about the purpose of this form
                    <button
                      onClick={() => setActiveTooltip(null)}
                      className="absolute top-1 right-1 text-gray-500 hover:text-gray-700"
                      aria-label="Close tooltip"
                    >
                      <X size={14} />
                    </button>
                  </div>
                )}
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className={`w-full p-3 rounded-md border focus:ring-2 focus:ring-blue-500 focus:outline-none transition-colors ${darkMode ? "bg-gray-700 border-gray-600" : "bg-gray-50 border-gray-300"}`}
                  placeholder="Enter description"
                  rows="4"
                />
              </div>

              {/* Input Type Field */}
              <div className="relative">
                <label className="flex items-center gap-2 text-sm font-medium mb-2">
                  <Type size={16} />
                  Input Type
                  <button
                    type="button"
                    onClick={() =>
                      setActiveTooltip(
                        activeTooltip === "inputType" ? null : "inputType"
                      )
                    }
                    className="text-blue-500 hover:text-blue-600"
                    aria-label="Help for input type field"
                  >
                    <HelpCircle size={14} />
                  </button>
                </label>
                {activeTooltip === "inputType" && (
                  <div
                    className={`absolute z-10 p-3 rounded-md text-sm w-64 top-0 left-32 shadow-lg ${darkMode ? "bg-gray-700 text-white" : "bg-white text-gray-800 border border-gray-200"}`}
                  >
                    Select single for one input field or multiple for table-like
                    inputs with headers
                    <button
                      onClick={() => setActiveTooltip(null)}
                      className="absolute top-1 right-1 text-gray-500 hover:text-gray-700"
                      aria-label="Close tooltip"
                    >
                      <X size={14} />
                    </button>
                  </div>
                )}
                <div className="flex gap-4">
                  <label
                    className={`flex items-center gap-2 p-3 border rounded-md cursor-pointer transition-colors ${formData.inputType === "single" ? (darkMode ? "bg-blue-900 border-blue-500" : "bg-blue-100 border-blue-500") : darkMode ? "bg-gray-700 border-gray-600" : "bg-gray-50 border-gray-300"}`}
                  >
                    <input
                      type="radio"
                      name="inputType"
                      value="single"
                      checked={formData.inputType === "single"}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    <div
                      className={`w-4 h-4 rounded-full border flex items-center justify-center ${formData.inputType === "single" ? "border-blue-500" : darkMode ? "border-gray-500" : "border-gray-400"}`}
                    >
                      {formData.inputType === "single" && (
                        <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                      )}
                    </div>
                    <span>Single</span>
                  </label>
                  <label
                    className={`flex items-center gap-2 p-3 border rounded-md cursor-pointer transition-colors ${formData.inputType === "multiple" ? (darkMode ? "bg-blue-900 border-blue-500" : "bg-blue-100 border-blue-500") : darkMode ? "bg-gray-700 border-gray-600" : "bg-gray-50 border-gray-300"}`}
                  >
                    <input
                      type="radio"
                      name="inputType"
                      value="multiple"
                      checked={formData.inputType === "multiple"}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    <div
                      className={`w-4 h-4 rounded-full border flex items-center justify-center ${formData.inputType === "multiple" ? "border-blue-500" : darkMode ? "border-gray-500" : "border-gray-400"}`}
                    >
                      {formData.inputType === "multiple" && (
                        <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                      )}
                    </div>
                    <span>Multiple</span>
                  </label>
                </div>
              </div>

              {/* Header/Input Names Field (Only shows if multiple is selected) */}
              {formData.inputType === "multiple" && (
                <div className="relative">
                  <label
                    htmlFor="headerInputNames"
                    className="flex items-center gap-2 text-sm font-medium mb-2"
                  >
                    <List size={16} />
                    Header/Input Names
                    <button
                      type="button"
                      onClick={() =>
                        setActiveTooltip(
                          activeTooltip === "headerInputNames"
                            ? null
                            : "headerInputNames"
                        )
                      }
                      className="text-blue-500 hover:text-blue-600"
                      aria-label="Help for header input names field"
                    >
                      <HelpCircle size={14} />
                    </button>
                  </label>
                  {activeTooltip === "headerInputNames" && (
                    <div
                      className={`absolute z-10 p-3 rounded-md text-sm w-64 top-0 left-48 shadow-lg ${darkMode ? "bg-gray-700 text-white" : "bg-white text-gray-800 border border-gray-200"}`}
                    >
                      Enter comma-separated header names for multiple inputs
                      (e.g., Name,Email,Phone)
                      <button
                        onClick={() => setActiveTooltip(null)}
                        className="absolute top-1 right-1 text-gray-500 hover:text-gray-700"
                        aria-label="Close tooltip"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  )}
                  <input
                    type="text"
                    id="headerInputNames"
                    name="headerInputNames"
                    value={formData.headerInputNames}
                    onChange={handleChange}
                    className={`w-full p-3 rounded-md border focus:ring-2 focus:ring-blue-500 focus:outline-none transition-colors ${darkMode ? "bg-gray-700 border-gray-600" : "bg-gray-50 border-gray-300"}`}
                    placeholder="E.g., Name,Email,Phone,Address"
                  />
                </div>
              )}
            </div>

            <div className="space-y-6">
              {/* Links Field */}
              <div className="relative">
                <label
                  htmlFor="links"
                  className="flex items-center gap-2 text-sm font-medium mb-2"
                >
                  <Link2 size={16} />
                  Links
                  <button
                    type="button"
                    onClick={() =>
                      setActiveTooltip(
                        activeTooltip === "links" ? null : "links"
                      )
                    }
                    className="text-blue-500 hover:text-blue-600"
                    aria-label="Help for links field"
                  >
                    <HelpCircle size={14} />
                  </button>
                </label>
                {activeTooltip === "links" && (
                  <div
                    className={`absolute z-10 p-3 rounded-md text-sm w-64 top-0 left-20 shadow-lg ${darkMode ? "bg-gray-700 text-white" : "bg-white text-gray-800 border border-gray-200"}`}
                  >
                    Enter comma-separated URLs to reference in your form
                    <button
                      onClick={() => setActiveTooltip(null)}
                      className="absolute top-1 right-1 text-gray-500 hover:text-gray-700"
                      aria-label="Close tooltip"
                    >
                      <X size={14} />
                    </button>
                  </div>
                )}
                <input
                  type="text"
                  id="links"
                  name="links"
                  value={formData.links}
                  onChange={handleChange}
                  className={`w-full p-3 rounded-md border focus:ring-2 focus:ring-blue-500 focus:outline-none transition-colors ${darkMode ? "bg-gray-700 border-gray-600" : "bg-gray-50 border-gray-300"}`}
                  placeholder="Enter comma-separated links"
                />
              </div>

              {/* Image Upload Field */}
              <div className="relative">
                <label className="flex items-center gap-2 text-sm font-medium mb-2">
                  <Image size={16} />
                  Image Upload
                  <button
                    type="button"
                    onClick={() =>
                      setActiveTooltip(
                        activeTooltip === "image" ? null : "image"
                      )
                    }
                    className="text-blue-500 hover:text-blue-600"
                    aria-label="Help for image upload field"
                  >
                    <HelpCircle size={14} />
                  </button>
                </label>
                {activeTooltip === "image" && (
                  <div
                    className={`absolute z-10 p-3 rounded-md text-sm w-64 top-0 left-36 shadow-lg ${darkMode ? "bg-gray-700 text-white" : "bg-white text-gray-800 border border-gray-200"}`}
                  >
                    Upload an image related to your form (optional)
                    <button
                      onClick={() => setActiveTooltip(null)}
                      className="absolute top-1 right-1 text-gray-500 hover:text-gray-700"
                      aria-label="Close tooltip"
                    >
                      <X size={14} />
                    </button>
                  </div>
                )}
                <div
                  className={`border-2 border-dashed rounded-md p-6 text-center transition-colors ${darkMode ? "border-gray-600 bg-gray-700 hover:border-gray-500" : "border-gray-300 bg-gray-50 hover:border-gray-400"}`}
                >
                  <div className="flex flex-col items-center">
                    <Image
                      className={`mb-2 ${darkMode ? "text-gray-400" : "text-gray-400"}`}
                      size={32}
                    />
                    <p className="text-sm mb-3">
                      Drag and drop an image here, or click to select
                    </p>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      id="imageUpload"
                      onChange={handleFileChange}
                    />
                    <label
                      htmlFor="imageUpload"
                      className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-600 transition-colors"
                    >
                      Browse Files
                    </label>
                    {fileName && (
                      <div className="mt-4 text-sm flex items-center gap-2">
                        <Image size={14} />
                        <p>Selected: {fileName}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Preview Toggle */}
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setPreview(!preview)}
                  className={`flex items-center gap-2 text-sm px-4 py-2 rounded-md border transition-colors ${darkMode ? "border-gray-600 hover:bg-gray-700" : "border-gray-300 hover:bg-gray-100"}`}
                  aria-label={preview ? "Hide preview" : "Show preview"}
                >
                  {preview ? (
                    <>
                      <EyeOff size={16} /> Hide Preview
                    </>
                  ) : (
                    <>
                      <Eye size={16} /> Show Preview
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Preview Section */}
          {preview && (
            <div
              className={`mt-8 border rounded-lg p-6 ${darkMode ? "bg-gray-700 border-gray-600" : "bg-gray-50 border-gray-200"}`}
            >
              <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                <Info size={18} /> Form Preview
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {formData.name && (
                  <div>
                    <span className="text-sm font-medium block mb-1">
                      Name:
                    </span>
                    <p
                      className={`p-2 rounded ${darkMode ? "bg-gray-800" : "bg-white"}`}
                    >
                      {formData.name}
                    </p>
                  </div>
                )}
                {formData.description && (
                  <div className="md:col-span-2">
                    <span className="text-sm font-medium block mb-1">
                      Description:
                    </span>
                    <p
                      className={`p-2 rounded ${darkMode ? "bg-gray-800" : "bg-white"}`}
                    >
                      {formData.description}
                    </p>
                  </div>
                )}
                <div>
                  <span className="text-sm font-medium block mb-1">
                    Input Type:
                  </span>
                  <p
                    className={`p-2 rounded ${darkMode ? "bg-gray-800" : "bg-white"} flex items-center gap-2`}
                  >
                    {formData.inputType === "single" ? (
                      <>
                        <span className="w-3 h-3 rounded-full bg-blue-500"></span>{" "}
                        Single
                      </>
                    ) : (
                      <>
                        <span className="w-3 h-3 rounded-full bg-green-500"></span>{" "}
                        Multiple
                      </>
                    )}
                  </p>
                </div>
                {formData.inputType === "multiple" &&
                  formData.headerInputNames && (
                    <div className="md:col-span-2">
                      <span className="text-sm font-medium block mb-1">
                        Headers:
                      </span>
                      <div
                        className={`p-2 rounded ${darkMode ? "bg-gray-800" : "bg-white"}`}
                      >
                        <div className="flex flex-wrap gap-2 mt-1">
                          {formData.headerInputNames
                            .split(",")
                            .map((header, index) => (
                              <span
                                key={index}
                                className={`px-3 py-1 rounded-full text-xs ${darkMode ? "bg-gray-600 text-gray-200" : "bg-gray-200 text-gray-800"}`}
                              >
                                {header.trim()}
                              </span>
                            ))}
                        </div>
                      </div>
                    </div>
                  )}
                {formData.links && (
                  <div className="md:col-span-2">
                    <span className="text-sm font-medium block mb-1">
                      Links:
                    </span>
                    <div
                      className={`p-2 rounded ${darkMode ? "bg-gray-800" : "bg-white"}`}
                    >
                      <div className="flex flex-wrap gap-2">
                        {formData.links.split(",").map((link, index) => (
                          <span
                            key={index}
                            className={`flex items-center px-3 py-1 rounded-full text-xs ${darkMode ? "bg-blue-900 text-blue-200" : "bg-blue-100 text-blue-700"}`}
                          >
                            <Link2 size={12} className="mr-1" />
                            {link.trim()}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
                {fileName && (
                  <div>
                    <span className="text-sm font-medium block mb-1">
                      File:
                    </span>
                    <p
                      className={`p-2 rounded ${darkMode ? "bg-gray-800" : "bg-white"} flex items-center gap-2`}
                    >
                      <Image size={16} /> {fileName}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Submit Button */}
          <div className="mt-8">
            <button
              onClick={handleSubmit}
              className={`w-full sm:w-auto px-6 py-3 rounded-md text-white font-medium transition-all ${
                formData.submitted
                  ? "bg-green-500 hover:bg-green-600"
                  : "bg-blue-500 hover:bg-blue-600"
              } flex items-center justify-center gap-2`}
            >
              {formData.submitted ? (
                <>
                  <Check size={18} /> Form Submitted!
                </>
              ) : (
                <>
                  <Settings size={18} /> Submit Form
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Examples Modal */}
      {showSampleModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
          <div
            className={`relative rounded-lg shadow-xl max-w-3xl w-full max-h-screen overflow-auto ${darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"}`}
          >
            <div className="p-6">
              <button
                onClick={() => setShowSampleModal(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors"
                aria-label="Close modal"
              >
                <X size={24} />
              </button>
              <h2 className="text-xl font-bold mb-6">Sample Form Examples</h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-3 flex items-center gap-2">
                    <Download size={18} />
                    Single Input Example
                  </h3>
                  <pre
                    className={`p-4 rounded-md overflow-auto text-sm ${darkMode ? "bg-gray-700" : "bg-gray-100"}`}
                  >
                    {sampleData.single}
                  </pre>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-3 flex items-center gap-2">
                    <Download size={18} />
                    Multiple Input Example
                  </h3>
                  <pre
                    className={`p-4 rounded-md overflow-auto text-sm ${darkMode ? "bg-gray-700" : "bg-gray-100"}`}
                  >
                    {sampleData.multiple}
                  </pre>
                </div>

                <p className="text-sm">
                  These examples show the typical structure and format for both
                  single and multiple input forms. You can copy these examples
                  and modify them according to your needs.
                </p>

                <div className="flex justify-end mt-6">
                  <button
                    onClick={() => setShowSampleModal(false)}
                    className="px-5 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
