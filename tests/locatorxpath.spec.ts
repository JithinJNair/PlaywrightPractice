import {expect, Locator, test} from "@playwright/test"
// https://opensource-demo.orangehrmlive.com/web/index.php/auth/login
// https://www.saucedemo.com/ 

test.skip("xpathByAttribute",async({page})=>{
    await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");
    await page.locator("//input[@name = 'username']").fill("Admin");
    await page.locator("//input[@type = 'password']").fill("admin123");
    await page.locator("//button[@type = 'submit']").click();
    await page.waitForTimeout(3000);
})

test.skip("xpathByTextMethod",async({page})=>{
    await page.goto("https://www.saucedemo.com/ ");
    await page.locator("#user-name").fill("standard_user");
    await page.locator("//input[@name = 'password']").fill("secret_sauce");
    await page.locator(".submit-button").click();
    await page.locator("//div[text()='Sauce Labs Backpack']").click();
    await page.waitForTimeout(3000);
})

test.skip("xpathByContainsMethod",async({page})=>{
    await page.goto("https://www.amazon.in/");
    await page.locator("//input[contains(@placeholder,'Search')]").fill("iphone");
    await page.locator("//input[@id='nav-search-submit-button']").click();
    await page.locator("//span[contains(text(),'iPhone 17 Pro 256 GB: 15.93 cm (6.3″) Display with Promotion up to 120Hz, A19 Pro Chip')]").first().click();
    await page.waitForTimeout(3000);
})

test.skip("xpathByMultipleAttributes",async({page})=>{
    await page.goto("https://en.wikipedia.org/wiki/Wikipedia");
    await page.locator("//input[@name='search' and contains(@title, 'Search Wikipedia')]").fill("hello");
    await page.waitForTimeout(3000);
})

test("xpathByStartsWith", async({page})=>{
    await page.goto("https://www.amazon.in/");
    await page.locator("//input[starts-with(@placeholder,'Search')]").fill("iphone");
    await page.locator("//input[starts-with(@id,'nav-search')]").click();
    await page.locator("//span[contains(text(),'iPhone 17 Pro 256 GB: 15.93 cm (6.3″) Display with Promotion up to 120Hz, A19 Pro Chip')]").first().click();
    await page.waitForTimeout(3000);
})

test("xpathByIndex",async({page})=>{
    await page.goto("https://demowebshop.tricentis.com");
    await page.locator("(//input[@value='Add to cart'])[4]").click();
    await page.waitForTimeout(3000);
})

test("xpathByIndex-last()",async({page})=>{
    await page.goto("https://demowebshop.tricentis.com");
    await page.locator("(//input[@value='Add to cart'])[last()]").click();
    await page.waitForTimeout(3000);
})

test("xpathByIndex-position()",async({page})=>{
    await page.goto("https://demowebshop.tricentis.com");
    await page.locator("(//input[@value='Add to cart'])[position()=3]").click();
    await page.waitForTimeout(3000);
})



