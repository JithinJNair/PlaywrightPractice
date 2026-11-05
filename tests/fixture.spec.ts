import {test} from "@playwright/test"

test("page fixture",async({page})=>{
    await page.goto("https://demowebshop.tricentis.com/")
    await page.waitForTimeout(2000)
    await page.goto("https://www.instagram.com/")
    await page.waitForTimeout(2000)
})

test("browserfixture",async({browser})=>{//to create multiple browser sessions
    let context1 = await browser.newContext()
    let page1 = await context1.newPage()
    await page1.goto("https://demowebshop.tricentis.com/")

    let context2 = await browser.newContext()
    let page2 = await context2.newPage()
    await page2.goto("https://www.instagram.com/")
})

test("context fixture",async({context})=>{//to create multiple tabs
    let page1 = await context.newPage()
    await page1.goto("https://demowebshop.tricentis.com/")

    let page2 = await context.newPage()
    await page2.goto("https://www.instagram.com/")
    await page2.waitForTimeout(2000)
})






