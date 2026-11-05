import {test, chromium} from "@playwright/test";

test("browsercontrol",async({page})=>{
    await page.goto("https://demowebshop.tricentis.com/");
    let size = page.viewportSize();
    console.log(size);

    await page.setViewportSize({width:800,height:500});
    let newSize = page.viewportSize();
    console.log(newSize);
    await page.waitForTimeout(2000);

    let url = page.url();
    console.log("URL:"+url);

    let title = await page.title();
    console.log("Title of webpage:"+title);
})

test("contextcookies",async({browser})=>{
    const context1 = await browser.newContext();
    const page1 = await context1.newPage();
    await page1.goto("https://demowebshop.tricentis.com/");
    console.log(await context1.cookies());
    console.log("------------------------------------------------------");
    const context2 = await browser.newContext();
    const page2 = await context2.newPage();
    await page2.goto("https://www.w3schools.com/");
    console.log(await context2.cookies());
})

test("chromium",async({})=>{
    let browser = await chromium.launch();// should import chromium
    const context1 = await browser.newContext();
    const page1 = await context1.newPage();
    await page1.goto("https://www.w3schools.com/");
    console.log(await context1.cookies());
    await browser.close();
   
})

test.only("screenshot",async({page})=>{
    await page.goto("https://www.w3schools.com/");

    // Generate a timestamp
    let time = new Date().getTime();

    // Capture a screenshot with the dynamic name
    await page.screenshot({ path: `screenshot/w3schoolSS_${time}.png`});

})