import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { AuthModalContextProvider } from "./Context/AuthModalToggleContext";
import { store } from "./store";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";
import { SideDrawerContextProvider } from "./Context/DashboardContext.tsx";
import { AddVihicleContextProvider } from "./Context/AddVihicleModal.tsx";
import { RequestCallBackContextProvider } from "./Context/RequestCallBackContext.tsx";
import { AddPackageContextProvider } from "./Context/AddPackageContext.tsx";
import { UserProfileContextProvider } from "./Context/UserProfileContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <AddPackageContextProvider>
        <UserProfileContextProvider>
          <RequestCallBackContextProvider>
            <AddVihicleContextProvider>
              <AuthModalContextProvider>
                <SideDrawerContextProvider>
                  <App />
                </SideDrawerContextProvider>
              </AuthModalContextProvider>
            </AddVihicleContextProvider>
          </RequestCallBackContextProvider>
        </UserProfileContextProvider>
      </AddPackageContextProvider>
    </Provider>
    <Toaster />
  </React.StrictMode>
);
