import {expect, test} from "@playwright/test";

// test.use({
//   viewport: null, // Lets the rendered viewport fill the browser window
//   launchOptions: {
//     args: ["--start-maximized"], // Opens Chromium maximized
//   },
// });

test("Browser Operations", async({page})=>{
    // Navigate to an URL
    await page.goto("https://www.saucedemo.com");
    await expect(page).toHaveTitle("Swag Labs");

    let userLoc = page.getByLabel("Username");
    let passwordLoc = page.getByLabel("Password");
    let buttonLoc = page.getByRole("button",{name:"Login"});
    let itemLoc = page.getByText("Sauce Labs Backpack");

    await userLoc.fill("standard_user");
    await passwordLoc.fill("secret_sauce");

    await buttonLoc.click();
    await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");

    await expect(itemLoc).toBeVisible();
    await itemLoc.click();

    await page.goForward();
    await expect(page).toHaveURL("https://www.saucedemo.com/inventory-item.html?id=4");

    
    await page.goBack();
    await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");

    await page.waitForTimeout(3000);
})

