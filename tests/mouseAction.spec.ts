//"https://demoapps.qspiders.com/ui/download?sublist=0"
import {expect, Locator, test} from "@playwright/test"

test("click", async ({ page }) => {

    // Normal left click
    await page.goto("https://demoapps.qspiders.com/ui/button?sublist=0");
    await page.locator("#btn").click();
    await expect(page.locator(".text-green-600"))
        .toContainText("You selected");

    //Right click
    //Method 1: Using locator click
    await page.goto(
        "https://demoapps.qspiders.com/ui/button/buttonRight?sublist=1"
    );
    
    await page.locator("#btn_a").click({
        button: "right",
        clickCount: 2,
        delay: 1000
    });

    await page.locator("//div[text()='Yes']").click();

    // Method 2: Using boundingBox and mouse.click
     await page.goto(
        "https://demoapps.qspiders.com/ui/button/buttonRight?sublist=1"
    );
    const box = await page.locator("#btn_a").boundingBox();

    await page.mouse.click(
        box!.x + box!.width / 2,
        box!.y + box!.height / 2,
        { button: "right" }
    );

    await page.locator("//div[text()='Yes']").click();

    await expect(page.locator(".text-green-600"))
        .toContainText("You selected");
});

test.only("doubleclick", async ({ page }) => {

    // double click using normal click+ locator click
    await page.goto("https://demoapps.qspiders.com/ui/button/buttonDouble?sublist=2");
    await page.locator("#btn_a").click({clickCount:2});
    await expect(page.locator(".text-green-600"))
        .toContainText("You selected");

    //double click using normal click+ bounding box
     await page.goto(
        "https://demoapps.qspiders.com/ui/button/buttonDouble?sublist=2"
    );
    const box2 = await page.locator("#btn_a").boundingBox();

    await page.mouse.click(
        box2!.x + box2!.width / 2,
        box2!.y + box2!.height / 2,
        { button: "left", clickCount:2 }
    );

    await expect(page.locator(".text-green-600"))
        .toContainText("You selected");
    

     // double click using dbclick+locator
    await page.goto("https://demoapps.qspiders.com/ui/button/buttonDouble?sublist=2");
    await page.locator("#btn_a").dblclick();
    await expect(page.locator(".text-green-600"))
        .toContainText("You selected");

    //double click using db click+ bounding box
     await page.goto(
        "https://demoapps.qspiders.com/ui/button/buttonDouble?sublist=2"
    );
    const box3 = await page.locator("#btn_a").boundingBox();

    await page.mouse.dblclick(
        box3!.x + box3!.width / 2,
        box3!.y + box3!.height / 2,
    );

    await expect(page.locator(".text-green-600"))
        .toContainText("You selected");
});