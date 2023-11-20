const { test, expect } = require("@playwright/test");

test("Server responds with a form to add items on /lists/{id}", async ({ page }) => {
    await page.goto("/");
    const listName = `My list: ${Math.random()}`;
    await page.locator("input[type=text]").type(listName);
    await page.locator("input[type=submit][data-test='create']").click();
  
    //Click on the new entry
    await page.locator(`a >> text='${listName}'`).click();

    //Check the titles
    await expect(page.locator("h2")).toHaveText(["Add an item to the list", "Items"]);
  
    //Select the elements
    const formExists = await page.waitForSelector('form');
    const nameInputExists = await page.waitForSelector('input[name="name"]');
    const submitButtonExists = await page.waitForSelector('input[type="submit"][data-test="push_item"]');

    //Check existence
    expect(formExists).toBeTruthy();
    expect(nameInputExists).toBeTruthy();
    expect(submitButtonExists).toBeTruthy();

    //Check the text of the submit button
    await expect(page.locator('input[type="submit"][data-test="push_item"]')).toHaveText("Push to list!");
});

test("Adding an item on a list", async ({ page }) => {
    //Create a list and visit his page
    await page.goto("/");
    const listName = `My list: ${Math.random()}`;
    await page.locator("input[type=text]").type(listName);
    await page.locator("input[type=submit][data-test='create']").click();
  
    //Click on the new entry
    await page.locator(`a >> text='${listName}'`).click();

    //Add an item to the list
    const itemName = `My item: ${Math.random()}`;
    await page.locator("input[type=text]").type(itemName);
    await page.locator("input[type=submit][data-test='push_item']").click();
  
    //Check the existence of the new entry
    const entryExists = await page.waitForSelector(`li >> text='${itemName}'`);
    expect(entryExists).toBeTruthy();
  });


test("Marked an item as collected", async ({ page }) => {
    //Create a list and visit his page
    await page.goto("/");
    const listName = `My list: ${Math.random()}`;
    await page.locator("input[type=text]").type(listName);
    await page.locator("input[type=submit][data-test='create']").click();
  
    //Click on the new entry
    await page.locator(`a >> text='${listName}'`).click();

    //Add an item to the list
    const nb = Math.floor(Math.random()*10000);
    const itemName = `Item_${nb}`;
    await page.locator("input[type=text]").type(itemName);
    await page.locator("input[type=submit][data-test='push_item']").click();

    //Check the existence of the marked collected button on the right item div
    const buttonExists = await page.locator(`input[type=submit][data-test=${itemName}]`);
    expect(buttonExists).toBeTruthy();

    await buttonExists.click();
    await expect(page.locator(`del`)).toHaveText(`${itemName}`);

});
