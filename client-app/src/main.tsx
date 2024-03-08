import ReactDOM from "react-dom/client";
import App from "./app/layout/App";
import "./app/layout/styles.css";
import { StrictMode } from "react";
import { StoreContext, store } from "./app/stores/store";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <StoreContext.Provider value={store}>
      <App />
    </StoreContext.Provider>
  </StrictMode>
);
