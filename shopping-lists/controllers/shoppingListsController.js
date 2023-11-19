import { renderFile } from "../deps.js";
import * as shopListServ from "../services/shoppingListsService.js";
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

const viewLists = async (request) => {
  const data = {
    lists: await shopListServ.findAllActiveLists(),
  };

  return new Response(await renderFile("../views/shopping_lists.eta", data), responseDetails);
};

export { addList, viewLists };