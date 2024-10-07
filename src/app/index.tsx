import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { HomePage } from "@/pages";
import "./styles/main.scss";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
