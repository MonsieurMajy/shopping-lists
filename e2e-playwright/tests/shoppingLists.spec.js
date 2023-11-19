const { test, expect } = require("@playwright/test");

test("Server responds with a form to add a list on /lists", async ({ page }) => {
  const response = await page.goto("/lists");

  //Check the titles
  await expect(page.locator("h2")).toHaveText(["Add a list", "Active lists"]);
  
  //Select the elements
  const formExists = await page.waitForSelector('form');
  const nameInputExists = await page.waitForSelector('input[name="name"]');
  const submitButtonExists = await page.waitForSelector('input[type="submit"]');

  //Check existence
  expect(formExists).toBeTruthy();
  expect(nameInputExists).toBeTruthy();
  expect(submitButtonExists).toBeTruthy();

  //Check the text of the submit button
  await expect(page.locator('input[type="submit"]')).toHaveText("Create list!");
});