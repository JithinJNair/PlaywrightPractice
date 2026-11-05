import {expect, Locator, test} from "@playwright/test"

test("getByAltText",async({page})=>{
    await page.goto("https://demowebshop.tricentis.com/");
    let logo:Locator = page.getByAltText("Tricentis Demo Web Shop", {exact: true});
    await expect(logo).toBeVisible();
})

test("getByText",async({page})=>{
    await page.goto("https://demowebshop.tricentis.com/");
    let text:Locator = page.getByText("Featured Products");
    await expect(text).toBeVisible();
})

test("getByRole",async({page})=>{
    await page.goto("https://demowebshop.tricentis.com/");
    await page.getByRole("link",{name:'Register'}).click();
    await page.getByRole("radio",{name:'Male', exact:true}).click();
    await page.getByRole("textbox",{name:'First name:'}).fill("Jithin");
    await page.getByRole("textbox",{name:'Last name:'}).fill("Nair");
    await page.getByRole("textbox",{name:'Email:'}).fill("89.jith@gmail.com");
    await page.getByRole("textbox",{name:'Password:', exact:true}).fill("xyz1234");
    await page.getByRole("textbox",{name:'Confirm password:'}).fill("xyz1234");
    await page.pause();

})

test("getByLabel",async({page})=>{
     await page.goto("https://demowebshop.tricentis.com/");
     await page.getByRole("link",{name:'Log in'}).click();
     await page.getByLabel("Email:").fill("xyz@gmail.com");
     await page.getByLabel("Password:").fill("1234");
     await page.waitForTimeout(3000);
})

test("getByPlaceHolder",async({page})=>{
     await page.goto("https://www.amazon.in/");
     await page.getByPlaceholder("Search Amazon.in").fill("mobiles");
     await page.waitForTimeout(3000);
})

test("getByTitle",async({page})=>{
     await page.goto("https://demowebshop.tricentis.com/");
     await page.getByTitle("Show details for Build your own cheap computer").first().click();
     await page.waitForTimeout(3000);
})

test.only("getByTestId",async({page})=>{
    await page.goto("https://www.saucedemo.com/");
    await page.getByTestId("username").fill("Jithin");
    await page.waitForTimeout(3000);
})
