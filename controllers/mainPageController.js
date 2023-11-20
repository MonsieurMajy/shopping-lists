import { renderFile } from "../deps.js";
import * as shopItemServ from "../services/shoppingItemService.js"
import * as shopListServ from "../services/shoppingListsService.js"

const responseDetails = {
    headers: { "Content-Type": "text/html;charset=UTF-8" },
  };

const handleMainRequest = async (request) => {
    const list_query = await shopListServ.countList();
    const item_query = await shopItemServ.countItem();
    const data = {
      list_cnt: list_query[0].count,
      item_cnt: item_query[0].count,
    };
  
    return new Response(await renderFile("../views/main_page.eta", data), responseDetails);
  };

export { handleMainRequest };