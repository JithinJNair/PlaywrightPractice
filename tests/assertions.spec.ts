import {expect, Locator, test} from "@playwright/test"

test("withoutAssertion1",async({page})=>{
    await page.goto("https://demowebshop.tricentis.com");
    let actualUrl:string = page.url();
    let expectedUrl:string= "https://demowebshop.tricentis.com";
    console.log(actualUrl);
    console.log(expectedUrl);
    if(actualUrl==expectedUrl){
        console.log("passed");// both console and report prints passed
    }else{
        console.log("fail");
    }
})

test("withoutAssertion2",async({page})=>{
    await page.goto("https://www.saucedemo.com/");
    let actualUrl:string = page.url();
    let expectedUrl:string= "https://demowebshop.tricentis.com";
    if(actualUrl==expectedUrl){
        console.log("passed");// console show failed but report shows passed.because if else doesnt have the capability to fail a test case.
    }else{
        console.log("fail");
    }
})

test("withAutoRetryAssertion",async({page})=>{
    await page.goto("https://www.saucedemo.com/");
    let actualUrl:string = page.url();
    let expectedUrl:string= "https://demowebshop.tricentis.com";
    await expect(page).toHaveURL(expectedUrl);// Fails both tescase  and report shows fail.
})

test("toHaveTitle",async({page})=>{
    await page.goto("https://www.saucedemo.com/");
    await expect(page).toHaveTitle("Swag Labs");// Pass  tescase  and report shows pass.
})

test("toBeVisible",async({page})=>{
    await page.goto("https://www.saucedemo.com/");
    let logo:Locator = page.locator("//div[@class='login_logo']");
    await expect(logo).toBeVisible();// Pass  tescase  and report shows pass.
})

test("toHaveValue",async({page})=>{
    await page.goto("https://www.saucedemo.com/");
    let textField:Locator = page.locator("//input[@id='user-name']");
    textField.fill("Jithin")
    await expect(textField).toHaveValue("Jithin");// Pass  tescase  and report shows pass.
})

test("toHaveText",async({page})=>{
    await page.goto("https://demowebshop.tricentis.com");
    let productTitle:Locator = page.locator("//a[.='$25 Virtual Gift Card']");
    await expect(productTitle).toHaveText("$25 Virtual Gift Card");// Pass  tescase  and report shows pass.
})

test("toContainText",async({page})=>{
     await page.goto("https://demowebshop.tricentis.com");
    let productTitle:Locator = page.locator("//a[.='$25 Virtual Gift Card']");
    await expect(productTitle).toContainText("Virtual Gift");// Pass  tescase  and report shows pass.
})

test("toHaveScreenShot",async({page})=>{
    // Playwright captures a fresh screenshot.
    // Compares it against homepage.png.
    // If the screenshots match within the configured tolerance, the test passes.
    // If there is a significant difference, the test fails.
    await page.goto("https://demowebshop.tricentis.com");
    await expect(page).toHaveScreenshot("homepage.png");// Pass  tescase  and report shows pass.
})



