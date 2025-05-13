import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Zap, Info } from "lucide-react";

interface ModelCardProps {
  id: string;
  name: string;
  model_code: string;
  inputType: string;
  outputType: string;
  tags: { name: string }[];
  is_live: boolean;
  modality: string;
}

const getModalityColors = (modality: string) => {
  switch (modality?.toLowerCase()) {
    case "vision":
      return "bg-indigo-50 text-indigo-600 dark:bg-indigo-900/40 dark:text-indigo-200 border-indigo-200 dark:border-indigo-700";
    case "text":
      return "bg-cyan-50 text-cyan-600 dark:bg-cyan-900/40 dark:text-cyan-200 border-cyan-200 dark:border-cyan-700";
    case "speech":
      return "bg-fuchsia-50 text-fuchsia-600 dark:bg-fuchsia-900/40 dark:text-fuchsia-200 border-fuchsia-200 dark:border-fuchsia-700";
    case "audio":
      return "bg-amber-50 text-amber-600 dark:bg-amber-900/40 dark:text-amber-200 border-amber-200 dark:border-amber-700";
    case "multimodal":
      return "bg-rose-50 text-rose-600 dark:bg-rose-900/40 dark:text-rose-200 border-rose-200 dark:border-rose-700";
    default:
      return "bg-emerald-50 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-200 border-emerald-200 dark:border-emerald-700";
  }
};

const ModelCard = ({ id, name, model_code, tags, is_live, modality }: ModelCardProps) => {
  const [showTooltip, setShowTooltip] = useState(false);
  
  // Colors for tags with improved dark mode support
  const tagColorClasses = [
    "bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-200 border border-blue-200 dark:border-blue-800/30",
    "bg-purple-50 text-purple-600 dark:bg-purple-900/30 dark:text-purple-200 border border-purple-200 dark:border-purple-800/30",
    "bg-orange-50 text-orange-600 dark:bg-orange-900/30 dark:text-orange-200 border border-orange-200 dark:border-orange-800/30",
    "bg-pink-50 text-pink-600 dark:bg-pink-900/30 dark:text-pink-200 border border-pink-200 dark:border-pink-800/30",
    "bg-teal-50 text-teal-600 dark:bg-teal-900/30 dark:text-teal-200 border border-teal-200 dark:border-teal-800/30"
  ];

  return (
    <Card className="h-full flex flex-col transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden group bg-white dark:bg-gray-900 dark:shadow-md dark:shadow-gray-950/20">
      <CardHeader className="pb-3 relative">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <Badge
            variant="outline"
            className={`px-3 py-1 rounded-full text-sm font-medium no-underline border ${getModalityColors(modality)}`}
          >
            {modality || "others"}
          </Badge>

          {is_live ? (
            <div className="flex items-center gap-1 bg-gradient-to-r from-green-500 to-emerald-600 dark:from-green-600 dark:to-emerald-700 text-white px-2.5 py-0.5 rounded-full text-xs font-medium shadow-sm">
              <Zap className="h-3 w-3" />
              Live
            </div>
          ) : (
            <Badge
              variant="outline"
              className="bg-gray-50 text-gray-500 dark:bg-gray-800/80 dark:text-gray-300 border-gray-200 dark:border-gray-700 px-2.5 py-0.5 rounded-full text-xs font-medium"
            >
              Coming Soon
            </Badge>
          )}
        </div>

        <h3 className="text-xl font-semibold line-clamp-2 text-gray-900 dark:text-gray-50 group-hover:text-primary dark:group-hover:text-primary-400 transition-colors duration-200">
          {name}
        </h3>
      </CardHeader>

      <CardContent className="pb-0 flex-grow">
        <div className="flex flex-wrap gap-1.5 relative">
          {tags?.slice(0, 3).map((t, i) => (
            <Badge
              key={t.name}
              variant="secondary"
              className={`text-xs font-normal whitespace-nowrap px-2 py-0.5 rounded-md ${tagColorClasses[i % tagColorClasses.length]}`}
            >
              {t.name}
            </Badge>
          ))}
          
          {tags?.length > 3 && (
            <div className="relative inline-block">
              <Badge
                variant="secondary"
                className="text-xs font-normal bg-gray-50 text-gray-500 dark:bg-gray-800 dark:text-gray-300 border border-gray-200 dark:border-gray-700 px-2 py-0.5 rounded-md cursor-pointer flex items-center gap-1"
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
              >
                <Info className="h-3 w-3" />
                +{tags.length - 3}
              </Badge>
              
              {showTooltip && (
                <div className="absolute z-10 w-48 max-w-xs bg-white dark:bg-gray-800 rounded-md shadow-lg p-2 text-sm border border-gray-200 dark:border-gray-700 bottom-full mb-2 left-0">
                  <div className="font-medium text-gray-700 dark:text-gray-200 mb-1">Additional tags:</div>
                  <div className="flex flex-wrap gap-1">
                    {tags.slice(3).map((tag) => (
                      <span key={tag.name} className="text-xs text-gray-600 dark:text-gray-300">
                        {tag.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </CardContent>

      <CardFooter className="mt-auto pt-4 flex justify-end border-t border-gray-100 dark:border-gray-800/80">
        <a
          href={`/models/${model_code}`}
          className="inline-flex items-center text-sm font-medium text-primary dark:text-primary-400 transition-all hover:text-primary/80 dark:hover:text-primary-300 hover:translate-x-0.5 focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-primary-400 focus:ring-offset-2 dark:focus:ring-offset-gray-900 group"
        >
          View details 
          <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </a>
      </CardFooter>
    </Card>
  );
};

export default ModelCard;