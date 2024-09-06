import Navigo from "navigo";
import Error from "../Error";

const app = document.querySelector("#app");
const routerNavigo = new Navigo("/", { linksSelector: "a", hash: false });

const renderApp = (page, defaultLayout) => {
  app.innerHTML = defaultLayout.replace("{body}", page);
};

export const router = (routes = [], defaultLayout) => {
  routes.forEach(({ path, component }) => {
    routerNavigo.on(path, (urlData) => {
      const { data: params } = urlData;
      renderApp(component(params), defaultLayout(), urlData);
    });
  });
  routerNavigo.notFound(() => renderApp(Error(), defaultLayout()));
  routerNavigo.resolve();
};
