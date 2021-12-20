import { LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { AuthProvider } from "contexts/JWTAuthContext";
import SettingsProvider from "contexts/SettingsContext";
import TitleContextProvider from "contexts/TitleContext";
import "nprogress/nprogress.css";
import "pure-react-carousel/dist/react-carousel.es.css";
import { StrictMode } from "react";
import ReactDOM from "react-dom";
import "react-image-lightbox/style.css";
import { BrowserRouter } from "react-router-dom";
import "simplebar/dist/simplebar.min.css";
import App from "./App";
ReactDOM.render(<StrictMode>
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <AuthProvider>
        <SettingsProvider>
          <TitleContextProvider>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </TitleContextProvider>
        </SettingsProvider>
      </AuthProvider>
    </LocalizationProvider>
  </StrictMode>, document.getElementById("root"));