import { executeQuery } from "../database/database.js";

const create = async (name) => {
  await executeQuery(`INSERT INTO shopping_lists (name) VALUES ('${ name }')`);
};

const findAllActiveLists = async () => {
  return await executeQuery(`SELECT * FROM shopping_lists WHERE active = TRUE`);
};

const findListById = async (id) => {
  return await executeQuery(`SELECT * FROM shopping_lists WHERE id = ${ id }`);
};

const deactivateListById = async (id) => {
  await executeQuery(`UPDATE shopping_lists SET active = FALSE WHERE id = ${id}`);
};

export { create, findAllActiveLists, findListById, deactivateListById };