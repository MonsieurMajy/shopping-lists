
import { serve } from "./deps.js";
import { configure } from "./deps.js";
import * as shopListControl from "./controllers/shoppingListsController.js";
import * as shopItemControl from "./controllers/shoppingItemController.js"
import { redirectTo } from "./utils/requestUtils.js";

configure({
  views: `${Deno.cwd()}/views/`,
});

const handleRequest = async (request) => {
  const url = new URL(request.url);

  if (url.pathname === "/" && request.method === "GET") {
    return redirectTo("/lists");
  } else if (url.pathname === "/lists" && request.method === "POST") {
    return await shopListControl.addList(request);
  } else if (url.pathname === "/lists" && request.method === "GET") {
    return await shopListControl.viewActiveLists(request);
  } else if (url.pathname.match("/lists/[0-9]+/items/[0-9]+") && request.method === "POST") {
    return await shopItemControl.collectItem(request);
  } else if (url.pathname.match("/lists/[0-9]+/items") && request.method === "POST") {
    return await shopItemControl.addItemToList(request);
  } else if (url.pathname.match("/lists/[0-9]+") && request.method === "GET") {
    return await shopListControl.viewList(request);
  } else {
    return new Response("Not found", { status: 404 });
  }
};

serve(handleRequest, { port: 7777 });