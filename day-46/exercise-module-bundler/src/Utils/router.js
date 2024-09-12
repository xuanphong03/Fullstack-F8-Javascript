import Navigo from "navigo";
import Error from "../Error";

const app = document.querySelector("#app");
const routerNavigo = new Navigo("/", { linksSelector: "a", hash: false });

const renderApp = (page, defaultLayout, isNotFound = false) => {
  if (!isNotFound) {
    return (app.innerHTML = defaultLayout.replace("{body}", page));
  }
  return (app.innerHTML = page);
};

export const router = (routes = [], defaultLayout) => {
  routes.forEach(({ path, component }) => {
    routerNavigo.on(path, (url) => {
      renderApp(component(url), defaultLayout());
    });
  });
  routerNavigo.notFound(() => renderApp(Error(), defaultLayout(), true));
  routerNavigo.resolve();
};
