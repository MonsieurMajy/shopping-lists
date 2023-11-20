import { renderFile } from "../deps.js";
import * as shopListServ from "../services/shoppingListsService.js";
import * as shopItemServ from "../services/shoppingItemService.js"
import { redirectTo } from "../utils/requestUtils.js";

const responseDetails = {
  headers: { "Content-Type": "text/html;charset=UTF-8" },
};

const addList = async (request) => {
  const formData = await request.formData();
  const name = formData.get("name");

  await shopListServ.create(name);

  return redirectTo("/lists");
};

const viewActiveLists = async (request) => {
  const data = {
    lists: await shopListServ.findAllActiveLists(),
  };

  return new Response(await renderFile("../views/shopping_lists.eta", data), responseDetails);
};

const viewList = async (request) => {
    const url = new URL(request.url);
    const urlParts = url.pathname.split("/");
    const id = urlParts[2];
    const list = await shopListServ.findListById(id);

    const data = {
        list: list[0],
        items: await shopItemServ.findItemsByListId(id)
    }

    return new Response(await renderFile("../views/list_details.eta", data), responseDetails);
};

const deactivateList = async (request) => {
  const url = new URL(request.url);
  const urlParts = url.pathname.split("/");
  await shopListServ.deactivateListById(urlParts[2]);

  return redirectTo("/lists");
};

export { addList, viewActiveLists, viewList, deactivateList };