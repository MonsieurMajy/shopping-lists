const { test, expect } = require("@playwright/test");

test("Server responds with a form to add a list on /lists", async ({ page }) => {
  const response = await page.goto("/lists");

  //Check the titles
  await expect(page.locator("h2")).toHaveText(["Add a list", "Active lists"]);
  
  //Select the elements
  const formExists = await page.waitForSelector('form');
  const nameInputExists = await page.waitForSelector('input[name="name"]');
  const submitButtonExists = await page.waitForSelector('input[type="submit"][data-test="create"]');

  //Check existence
  expect(formExists).toBeTruthy();
  expect(nameInputExists).toBeTruthy();
  expect(submitButtonExists).toBeTruthy();

  //Check the text of the submit button
  await expect(page.locator('input[type="submit"][data-test="create"]')).toHaveText("Create list!");
});

test("Adding a list on the /lists page", async ({ page }) => {
  await page.goto("/");
  const listName = `My list: ${Math.random()}`;
  await page.locator("input[type=text]").type(listName);
  await page.locator('input[type=submit][data-test="create"]').click();

  //Check the existence of the new entry
  const entryExists = await page.waitForSelector(`li >> text='${listName}'`);
  expect(entryExists).toBeTruthy();
});