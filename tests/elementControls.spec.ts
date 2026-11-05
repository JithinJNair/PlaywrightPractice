import {expect, Locator, test} from '@playwright/test';

test("fill", async({page})=>{
    await page.goto("https://demowebshop.tricentis.com/")
    await page.locator("//input[@id='small-searchterms']").fill("mobile");
    await page.waitForTimeout(2000);
    await page.locator("//input[@id='small-searchterms']").fill("hello");
    await page.waitForTimeout(2000);
})

test("type", async({page})=>{
    await page.goto("https://demowebshop.tricentis.com/")
    await page.locator("//input[@id='small-searchterms']").type("mobile");
    await page.waitForTimeout(2000);
    await page.locator("//input[@id='small-searchterms']").type("hello");
    await page.waitForTimeout(2000);
})

test("clear and click", async({page})=>{
    await page.goto("https://demowebshop.tricentis.com/")
    await page.locator("//input[@id='small-searchterms']").fill("mobile");
    await page.waitForTimeout(2000);
    await page.locator("//input[@id='small-searchterms']").clear();
    await page.waitForTimeout(2000);
    await page.locator("//input[@id='small-searchterms']").fill("hello");
    await page.waitForTimeout(2000);
    await page.click("//input['.button-1.search-box-button' and @type='submit']");
    await page.waitForTimeout(2000);
})

test("innerText", async({page})=>{
    await page.goto("https://demowebshop.tricentis.com/")
    let inText:string = await page.locator("//a[text()='$25 Virtual Gift Card']").innerText();
    console.log(inText);
    await page.waitForTimeout(2000);

    let allText:Locator =  page.locator(".product-title");

    let count: number = await allText.count();
    for(let i=0;i<count;i++){
        console.log(await allText.nth(i).innerText());
    }
})

test("textContent", async({page})=>{
    await page.goto("https://demowebshop.tricentis.com/")
    // let inText2:string = await page.locator("//a[text()='$25 Virtual Gift Card']").textContent();
    // console.log(inText2);
    // await page.waitForTimeout(2000);

    let allText:Locator =  page.locator(".product-title");

    let count: number = await allText.count();
    for(let i=0;i<count;i++){
        console.log(await allText.nth(i).textContent());
    }
})

test("allinnerText", async({page})=>{
    await page.goto("https://demowebshop.tricentis.com/")
     let allText:string[] =  await page.locator(".product-title").allInnerTexts();
    console.group(allText);
})

test("allTextContents", async({page})=>{
    await page.goto("https://demowebshop.tricentis.com/")
     let allText:string[] =  await page.locator(".product-title").allTextContents();
    console.group(allText);
})

test("inputValue", async({page})=>{
    await page.goto("https://demowebshop.tricentis.com/")
    let textField = page.locator("//input[@id='small-searchterms']");
    await textField.fill("mobile");
    console.log(await textField.inputValue());
})

test("getAttribute", async({page})=>{
    await page.goto("https://demowebshop.tricentis.com/")
    let textField = page.locator("//input[@id='small-searchterms']");
    console.log(await textField.getAttribute("type"));
    console.log(await textField.getAttribute("id"));
    console.log(await textField.getAttribute("class"));
})

test("all", async({page})=>{
    await page.goto("https://demowebshop.tricentis.com/")
    let allText:Locator[] =  await page.locator(".product-title").all();
    for(let a of allText){
        console.log(await a.innerText());
    }
})

test("isVisible", async({page})=>{
    await page.goto("https://www.saucedemo.com/ ");
    await page.locator("#user-name").fill("standard_user");
    await page.locator("//input[@name = 'password']").fill("secret_sauce");
    await page.locator(".submit-button").click();
    let img = page.locator("[alt = 'Sauce Labs Backpack']");
    await page.waitForTimeout(3000);
    console.log(await img.isVisible());
})

test("isEnable", async({page})=>{
    await page.goto("https://www.instagram.com/ ");
    await page.locator("[name='email']").fill("Jithin");
    await page.locator("[name='pass']").fill("123");
    let button = page.locator("[aria-label='Log In']");
    console.log(`Button enabled:${await button.isEnabled()}`)
})

test("isDisabled", async({page})=>{
    await page.goto("https://www.instagram.com/ ");
    await page.locator("[name='email']").fill("Jithin");
    await page.locator("[name='pass']").fill("123");
    let button = page.locator("[aria-label='Log In']");
    console.log(`Button disabled:${await button.isDisabled()}`)
})

test("isEditable", async({page})=>{
    await page.goto("https://demowebshop.tricentis.com/")
    let inputField = page.locator("inut#small-searchterms");
    console.log(`Input field editable:${inputField.isEditable()}`);
})

test("check and uncheck", async({page})=>{
    await page.goto("https://testautomationpractice.blogspot.com/")
    await page.locator("#male").check();
    await page.locator("#sunday").check()
    await page.locator("#saturday").check()
    await page.waitForTimeout(3000);
    await page.locator("#sunday").uncheck()
    await page.locator("#saturday").uncheck()
    await page.waitForTimeout(3000);
})

test.only("isChecked", async({page})=>{
    await page.goto("https://testautomationpractice.blogspot.com/")
    let checkBox = page.locator("#male");
    console.log(`Is Checkbox checked:${await checkBox.isChecked()}`);//false
    await checkBox.check();
    console.log(`Is Checkbox checked:${await checkBox.isChecked()}`);//true

})

test("waitFor", async({page})=>{
    await page.goto("https://www.saucedemo.com/ ");
    await page.locator("#user-name").fill("standard_user");
    await page.locator("//input[@name = 'password']").fill("secret_sauce");
    await page.locator(".submit-button").click();
    let img = page.locator("[alt = 'Sauce Labs Backpack']");
    console.log(await img.isVisible());
    await page.locator("[alt = 'Sauce Labs Backpack']").waitFor({state:'visible',timeout:1000});
    console.log(await img.isVisible());
     await page.waitForTimeout(3000);
})

test.only("checkboxes", async ({ page }) => {
    await page.goto("https://testautomationpractice.blogspot.com/");

    let checkBoxes: Locator[] = await page.locator("//input[@class='form-check-input' and @type='checkbox']").all();

    for (let checkBox of checkBoxes) {
        await checkBox.check();
    }
    for (let checkBox of checkBoxes) {
        let id = await checkBox.getAttribute("id");

        if (id === "tuesday" || id === "wednesday") {
            await checkBox.uncheck();
        }
    }
});








