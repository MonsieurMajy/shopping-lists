const { test, expect } = require("@playwright/test");

test("Server responds with a form to add items on /lists/{id}", async ({ page }) => {
    await page.goto("/");
    const listName = `My list: ${Math.random()}`;
    await page.locator("input[type=text]").type(listName);
    await page.locator("input[type=submit]").click();
  
    //Click on the new entry
    await page.locator(`a >> text='${listName}'`).click();

    //Check the titles
    await expect(page.locator("h2")).toHaveText(["Add an item to the list", "Items"]);
  
    //Select the elements
    const formExists = await page.waitForSelector('form');
    const nameInputExists = await page.waitForSelector('input[name="name"]');
    const submitButtonExists = await page.waitForSelector('input[type="submit"]');

    //Check existence
    expect(formExists).toBeTruthy();
    expect(nameInputExists).toBeTruthy();
    expect(submitButtonExists).toBeTruthy();

    //Check the text of the submit button
    await expect(page.locator('input[type="submit"]')).toHaveText("Push to list!");
});

test("Adding an item on a list", async ({ page }) => {
    //Create a list and visit his page
    await page.goto("/");
    const listName2 = `My list: ${Math.random()}`;
    await page.locator("input[type=text]").type(listName2);
    await page.locator("input[type=submit]").click();
  
    //Click on the new entry
    await page.locator(`a >> text='${listName2}'`).click();

    //Add an item to the list
    const itemName = `My item: ${Math.random()}`;
    await page.locator("input[type=text]").type(itemName);
    await page.locator("input[type=submit]").click();
  
    //Check the existence of the new entry
    const entryExists = await page.waitForSelector(`li >> text='${itemName}'`);
    expect(entryExists).toBeTruthy();
  });
