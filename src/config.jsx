import ThirdParty, { Google } from "supertokens-auth-react/recipe/thirdparty";
import { ThirdPartyPreBuiltUI } from "supertokens-auth-react/recipe/thirdparty/prebuiltui";
import EmailPassword from "supertokens-auth-react/recipe/emailpassword";
import { EmailPasswordPreBuiltUI } from "supertokens-auth-react/recipe/emailpassword/prebuiltui";
import Session from "supertokens-auth-react/recipe/session";
import EmailVerification from "supertokens-auth-react/recipe/emailverification";
import { EmailVerificationPreBuiltUI } from "supertokens-auth-react/recipe/emailverification/prebuiltui";

// API Domain without defaulting to localhost
export function getApiDomain() {
  const apiUrl = import.meta.env.VITE_APP_API_URL;
  if (!apiUrl)
    throw new Error("VITE_APP_API_URL is not set in environment variables.");
  return apiUrl;
}
// Website Domain without defaulting to localhost
export function getWebsiteDomain() {
  const websiteUrl = import.meta.env.VITE_APP_WEBSITE_URL;
  if (!websiteUrl)
    throw new Error(
      "VITE_APP_WEBSITE_URL is not set in environment variables."
    );
  return websiteUrl;
}
const ALLOWED_DOMAINS = ["gmail.com", "outlook.com"];

// Main SuperTokens configuration
export const SuperTokensConfig = {
  appInfo: {
    appName: "drugparadigm",
    apiDomain: getApiDomain(),
    websiteDomain: getWebsiteDomain(),
  },
  recipeList: [
    EmailPassword.init(),
    ThirdParty.init({
      signInAndUpFeature: {
        providers: [Google.init()],
      },
    }),
    EmailVerification.init({
      mode: "REQUIRED", // or "OPTIONAL"
    }),
    Session.init(),
  ],  
  getRedirectionURL: async (context) => {
    if (context.action === "SUCCESS" && context.newSessionCreated) {
      if (context.redirectToPath !== undefined) {
        // we are navigating back to where the user was before they authenticated
        return context.redirectToPath;
      }
      if (context.createdNewUser) {
        // user signed up
      } else {
        // user signed in
      }
      return "/";
    }
    return undefined;
  },
};

export const PreBuiltUIList = [
  ThirdPartyPreBuiltUI,
  EmailPasswordPreBuiltUI,
  EmailVerificationPreBuiltUI,
];

export const ComponentWrapper = (props) => {
  return props.children;
};
