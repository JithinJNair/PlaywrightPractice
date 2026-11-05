import {test, expect} from '@playwright/test';

test('verify Title', async ({page})=>{
    await page.goto('https://playwright.dev/');

    await expect(page).toHaveTitle(/Playwright/);

    let titleOfPage: string = await page.title();
    console.log(`Title of Page:${titleOfPage}`);

    //await expect(page)

})