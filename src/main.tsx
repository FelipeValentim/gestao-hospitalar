import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { Provider } from "react-redux";
import store from "./redux/configureStore.tsx";
import "/src/assets/css/common.css";
import "/src/assets/css/styles.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <Suspense fallback={<div className="loading" />}>
        <App />
      </Suspense>
    </Provider>
    <ToastContainer />
  </StrictMode>
);
