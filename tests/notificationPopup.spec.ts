import { expect, test } from "@playwright/test"

test("notification", async ({ browser }) => {
    let context = await browser.newContext({
        permissions: ["notifications"]
    })
    //await context.clearPermissions()
    let page = await context.newPage()
    await page.goto("https://demoapps.qspiders.com/ui/browserNot?sublist=0")
    await page.locator("#browNotButton").click()
    let result = await page.evaluate(() => {
        return Notification.requestPermission()
    })
    console.log(result)
})