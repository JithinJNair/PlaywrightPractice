import { expect, test } from "@playwright/test"
import data from "../testdata/data.json"
import multipledata from "../testdata/multipleData.json"
import validAndInvalid from "../testdata/validAndInvalid.json";

// test("singledatadata", () => {
//     console.log(data.url)
//     console.log(data.username)
//     console.log(data.password)
//     console.log(data.assertion)
// })

// test("saucelabloginwithsinglesetofdata", async ({ page }) => {
//     let Url = data.url
//     let Username = data.username
//     let Password = data.password
//     let Assertion = data.assertion
//     await page.goto(Url)
//     await page.locator("#user-name").fill(Username)
//     await page.locator("#password").fill(Password)
//     await page.locator("#login-button").click()
//     await expect(page).toHaveURL(Assertion)
//     await page.waitForTimeout(3000);
// })

// for(const d of multipledata){
//  test(`multiple data:${d.id}`,()=>{
//     console.log(d.id);
//     console.log(d.url);
//     console.log(d.username);
//     console.log(d.password);
//  })
// }
// for(const d of multipledata){
// test.only(`saucelabloginwithmultipledata${d.id}`, async ({ page }) => {
//     let Url = d.url
//     let Username = d.username
//     let Password = d.password
//     let Assertion = d.assertion
//     await page.goto(Url)
//     await page.locator("#user-name").fill(Username)
//     await page.locator("#password").fill(Password)
//     await page.locator("#login-button").click()
//     await expect(page).toHaveURL(Assertion)
//     await page.waitForTimeout(3000);
// })
// }

test.describe.only("validandinvaliddata", () => {
    for (const d of validAndInvalid.valid) {
        test.only(`saucelabloginwithvalid ${d.id}`, async ({ page }) => {
            let Url = d.url
            let Username = d.username
            let Password = d.password
            let Assertion = d.assertion
            await page.goto(Url)
            await page.locator("#user-name").fill(Username)
            await page.locator("#password").fill(Password)
            await page.locator("#login-button").click()
            await expect(page).toHaveURL(Assertion)
        })
    }

    for (const d of validAndInvalid.invalid) {
        test.only(`saucelabloginwithinvalid ${d.id}`, async ({ page }) => {
            let Url = d.url
            let Username = d.username
            let Password = d.password
            let Assertion = d.assertion
            await page.goto(Url)
            await page.locator("#user-name").fill(Username)
            await page.locator("#password").fill(Password)
            // ... remaining lines cut off at bottom/right of screen
        })
    }
})

