import {expect, test} from "@playwright/test";

test("authenication", async ({ browser }) => {
    let context = await browser.newContext({
        httpCredentials: {
            username: "admin",
            password: "admin"
        }
    })
    let page = await context.newPage()
    await page.goto("https://the-internet.herokuapp.com/basic_auth")
    await expect(page.locator("//p")).toContainText("Congratulations! You must have the proper credentials.")
})