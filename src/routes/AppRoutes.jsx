import { Routes, Route } from "react-router-dom";
import { getSuperTokensRoutesForReactRouterDom } from "supertokens-auth-react/ui";
import { SessionAuth } from "supertokens-auth-react/recipe/session";
import * as ReactRouter from "react-router-dom";
import { EmailVerificationPreBuiltUI } from "supertokens-auth-react/recipe/emailverification/prebuiltui";
import { PreBuiltUIList } from "../config";
import { Suspense } from "react";
import ScrollToTop from "../components/ScrollToTop";
import { MutatingDots } from "react-loader-spinner";

// Your page imports
import Index from "../pages/Index";
import Models from "../pages/Models";
import ModelDetail from "../pages/ModelDetail";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Resources from "../pages/Resources";
import NotFound from "../pages/NotFound";
import UserProfile from "@/components/User/UserProfile";
import UploadModalities from "@/components/Admin/UploadModalities";
import UploadModels from "@/components/Admin/UploadModels";

export default function AppRoutes() {
  return (
    <>
      <ScrollToTop />
      <Suspense
        fallback={
          <MutatingDots
            visible={true}
            height="100"
            width="100"
            color="blue"
            secondaryColor="#00BFFF"
            radius="12.5"
            ariaLabel="mutating-dots-loading"
            wrapperStyle={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          />
        }
      >
        <Routes>
          {/* SuperTokens Auth UI routes */}
          {getSuperTokensRoutesForReactRouterDom(ReactRouter, [
            ...PreBuiltUIList,
            EmailVerificationPreBuiltUI,
          ])}

          {/* App Routes */}
          <Route path="/uploadmodalities" element={<UploadModalities />} />
          <Route path='/uploadmodels' element={<UploadModels />} />
          <Route path="/" element={<Index />} />
          <Route path="profile" element={<SessionAuth><UserProfile /></SessionAuth>} />
          <Route path="/models"element={<Models />}/>
          <Route path="/models/:id"element={<ModelDetail />}/>
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </>
  );
}
