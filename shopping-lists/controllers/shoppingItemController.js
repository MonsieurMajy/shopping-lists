import * as shopItemServ from "../services/shoppingItemService.js"
import { redirectTo } from "../utils/requestUtils.js";

let cnt = 0;

const addItemToList = async (request) => {
    //Get the id of the list
    const url = new URL(request.url);
    const urlParts = url.pathname.split("/");
    const list_id = urlParts[2];

    //Get the name of the item
    const formData = await request.formData();
    const item_name = formData.get("name");

    await shopItemServ.addItemToList(list_id, item_name);

    return redirectTo(`/lists/${list_id}`);
};

const collectItem = async (request) => {
    //Get the id of the list
    const url = new URL(request.url);
    const urlParts = url.pathname.split("/");
    const list_id = urlParts[2];
    const item_id = urlParts[4];

    await shopItemServ.collectItemAtList(item_id);

    return redirectTo(`/lists/${list_id}`);

}

export { addItemToList , collectItem };