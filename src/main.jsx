import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Movie from "./pages/Movie.jsx";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import { Provider } from "react-redux";
import { store } from "./store/store.js";
import VendorHome from "./pages/VendorHome.jsx";
import Booking from "./pages/Booking.jsx";
import OrderSummary from "./pages/OrderSummary.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "/movie/:id",
        element: <Movie />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/vendor-home",
    element: <VendorHome/>
  },
  {
    path: "/booking",
    element: <Booking/>
  },
  {
    path: "/order-summary",
    element: <OrderSummary/>
  }
]);

createRoot(document.getElementById("root")).render(
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
);
