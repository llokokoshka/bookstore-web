import { createBrowserRouter } from "react-router-dom";

import App from './App';
import Autorisate from "./Autorisate";


 const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
    },
    {
      path: "/sign-in",
      element: <Autorisate />,
    }
  ]);

export default router;