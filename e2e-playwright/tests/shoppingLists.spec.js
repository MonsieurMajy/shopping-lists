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

test("Check the existence of the deactivate button on list entries at /lists", async ({ page }) => {
  await page.goto("/");
  const nb = Math.floor(Math.random()*10000);
  const listName = `list_${nb}`;
  await page.locator("input[type=text]").type(listName);
  await page.locator('input[type=submit][data-test="create"]').click();

  //Check the existence of deactivate button
  const buttonExists = await page.locator(`input[type=submit][data-test=deactivate_${listName}]`);
  expect(buttonExists).toBeTruthy();
});

test("Deactivate a list make it disapear from /lists page @fail", async ({ page }) => {
  await page.goto("/");
  const nb = Math.floor(Math.random()*10000);
  const listName = `list_${nb}`;
  await page.locator("input[type=text]").type(listName);
  await page.locator('input[type=submit][data-test="create"]').click();

  const button = await page.locator(`input[type=submit][data-test=deactivate_${listName}]`);
  await button.click();

  //Check the absence of the list into the main page, should fail
  expect(page.locator(`li >> text='${listName}'`)).toBeTruthy();
});