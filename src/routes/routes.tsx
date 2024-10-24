import { createBrowserRouter } from "react-router-dom";

import App from './App';
// import TodosPage from './todosPage';


 const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
    },
    // {
    //   path: "/todo/:id",
    //   element: <TodosPage />,
    // }
  ]);

export default router;