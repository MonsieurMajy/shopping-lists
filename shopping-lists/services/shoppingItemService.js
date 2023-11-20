import { executeQuery } from "../database/database.js";

/*const create = async (name) => {
  await executeQuery(`INSERT INTO shopping_lists (name) VALUES ('${ name }')`);
};*/

const findItemsByListId = async (id) => {
  return await executeQuery(`SELECT * FROM shopping_list_items WHERE shopping_list_id = ${ id } ORDER BY collected, name`);
};

const addItemToList = async (list_id, item_name) => {
    await executeQuery(`INSERT INTO shopping_list_items (name, shopping_list_id) VALUES ('${ item_name }', ${ list_id })`);
};

const collectItemAtList = async (item_id) => {
    await executeQuery(`UPDATE shopping_list_items SET collected = true WHERE id = ${item_id}`);
};

const countItem = async () => {
  return await executeQuery(`SELECT COUNT(*) FROM shopping_list_items`);
};

export { findItemsByListId , addItemToList, collectItemAtList, countItem };