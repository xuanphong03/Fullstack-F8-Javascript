import DefaultLayout from "./Layouts/Default";
import About from "./Pages/About";
import Home from "./Pages/Home";
import ProductDetail from "./Pages/ProductDetail";
import Products from "./Pages/Products";
import { router } from "./Utils/router";

function App() {
  const routes = [
    { path: "/", component: Home },
    { path: "/gioi-thieu", component: About },
    { path: "/san-pham", component: Products },
    { path: "/san-pham/:id", component: ProductDetail },
  ];
  return router(routes, DefaultLayout);
}

export default App;
