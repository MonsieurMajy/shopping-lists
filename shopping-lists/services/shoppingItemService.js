import { executeQuery } from "../database/database.js";

/*const create = async (name) => {
  await executeQuery(`INSERT INTO shopping_lists (name) VALUES ('${ name }')`);
};*/

const findItemsByListId = async (id) => {
  return await executeQuery(`SELECT * FROM shopping_list_items WHERE shopping_list_id = ${ id }`);
};

const addItemToList = async (list_id, item_name) => {
    return await executeQuery(`INSERT INTO shopping_list_items (name, shopping_list_id) VALUES ('${ item_name }', ${ list_id })`);
};

export { findItemsByListId , addItemToList };