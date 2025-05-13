import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "../src/routes/AppRoutes";
import SuperTokens, { SuperTokensWrapper } from 'supertokens-auth-react';
import { ComponentWrapper, SuperTokensConfig } from './config.jsx';
import { Provider } from 'react-redux';
import { store } from './redux/store.js';
import './index.css';

const queryClient = new QueryClient();
SuperTokens.init({
  ...SuperTokensConfig,
  style: `
    [data-supertokens~="poweredBy"] {
      display: none !important;
    }
    a[data-supertokens="superTokensBranding"] {
        display: none !important;
    }
    [data-supertokens~="button"] {
      background-color:rgb(50, 102, 151);
      border-radius: 4px;
      font-weight: bold;
    }
   
  `,

});

const App = () => (
  <SuperTokensWrapper>
    <Provider store={store}>
      <ComponentWrapper>
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <AppRoutes />
            </BrowserRouter>
          </TooltipProvider>
        </QueryClientProvider>
      </ComponentWrapper>
    </Provider>
  </SuperTokensWrapper>

);

export default App;
