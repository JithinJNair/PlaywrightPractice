import {expect, Locator, test, chromium} from "@playwright/test"

// test.skip("keyBoard actions",async({page})=>{
//     //enter text into a field
//     await page.goto("https://demoapps.qspiders.com/ui?scenario=1");
//     let nameLocator = page.locator("#name");
//     nameLocator.click()
//     await page.keyboard.type("Jithin");

//     //copy and paste into another field using press
//     await page.keyboard.press('Control+A');
//     await page.keyboard.press('Control+C');
//     await page.keyboard.press("Tab");
//     await page.keyboard.insertText("Jithin");

//     //copy and paste into another field-using locator and elemment
//     // await page.keyboard.press('control+C');
//     // let emailLocator = page.locator("#email");
//     // emailLocator.focus();
//     // await page.keyboard.insertText("Jithin");

//     //enter password into password field - navigate to field using down
//     await page.keyboard.down("Tab");
//     await page.keyboard.up("Tab");
//     await page.keyboard.insertText("jithin@123");
//     await page.waitForTimeout(5000);

// })

test.skip("Type in Caps", async ({ page, context }) => {
    await page.goto("https://demoapps.qspiders.com/ui?scenario=1");

    let nameLocator = page.locator("#name");
    await nameLocator.click();

    let name = "jithin";

    for (let char of name) {
        await page.keyboard.press(`Shift+${char.toUpperCase()}`);
    }

    await page.waitForTimeout(2000);
    context.close();
});

test.only("Type in Caps2", async ({ page, context }) => {
    await page.goto("https://demoapps.qspiders.com/ui?scenario=1");

    let nameLocator = page.locator("#name");
    await nameLocator.click();

    let name = "jithin";

    for (let char of name) {
        await page.keyboard.press(`Shift+${char}`);
    }

    await page.waitForTimeout(2000);
    context.close();
});



