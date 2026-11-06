import {expect, Locator, test} from "@playwright/test"

test.skip("waitForLoadState",async({page})=>{
    await page.goto("https://amazon.in");
    await page.locator("#nav-cart-count-container").click();
    // await page.waitForLoadState('documentloaded');
    // await page.waitForLoadState('load');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveURL(/cart/)
})


test.skip("waitForEvent", async ({ page }) => {
    await page.goto("https://demoapps.qspiders.com/ui/download?sublist=0");
    await page.locator("#writeArea").fill("Im downloading a file");
    let[downloadFile] = await Promise.all([
        page.waitForEvent('download'),
        page.locator("#downloadButton").click()
    ]);

    console.log(await downloadFile.path());
});



test.only("customwait",async({page})=>{
    await page.goto("https://www.amazon.in/")
    await page.locator("#nav-cart-count-container").click()
    await page.waitForFunction(()=>{
         return document.readyState==="complete"
    })
    await expect(page).toHaveURL(/cart/)
})

test.only("custom1",async({page})=>{
    await page.goto("https://www.amazon.in/")
    await page.locator("input#twotabsearchtextbox").fill("shoes")
    await page.waitForFunction(()=>{
        let element= document.querySelectorAll(".s-suggestion-container")
        element.length>1
    })
    let autosuggestion:string[]=await page.locator("//div[@role='row']").allInnerTexts()
    console.log(autosuggestion)
})

