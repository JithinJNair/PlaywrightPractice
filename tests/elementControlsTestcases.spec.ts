import {expect, Locator, test} from '@playwright/test';

test("testcase1", async ({ page }) => {
    await page.goto("https://demowebshop.tricentis.com/");

    let links: Locator = page.locator("//a");
    let count = await links.count();

    for (let i = 0; i < count; i++) {
        console.log(await links.nth(i).innerText());
    }
});

test("testcase2", async({page})=>{
    await page.goto("https://www.saucedemo.com/ ");
    await page.locator("#user-name").fill("standard_user");
    await page.waitForTimeout(2000);
    await page.locator("//input[@name = 'password']").fill("secret_sauce");
    await page.waitForTimeout(2000);
    await page.locator(".submit-button").click();
    let addToCartButtons:Locator =  page.locator("//button[contains(@class,'btn_inventory ')]");
    let count = await addToCartButtons.count();

    for(let i=0;i<count;i++){
        await addToCartButtons.nth(i).click();
    }

    await page.waitForTimeout(2000);
})


test.only("testcase3", async({page})=>{
    await page.goto("https://demowebshop.tricentis.com/")

    let allText: Locator = page.locator("(//h2[contains(@class,'product-title')])[position()>4]");

    let count = await allText.count();

    for(let i=0;i<count;i++){
        console.log(await allText.nth(i).innerText());
    }
})

