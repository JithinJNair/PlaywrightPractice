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

test("doubleclick", async ({ page }) => {

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

test("hovering", async ({ page }) => {


    await page.goto("https://demoapps.qspiders.com/ui/button/buttonDouble?sublist=0");
    //hovering using locator based method
    await page.locator("#circle").hover();
    //hovering using mouse class
    let circle = await page.locator("#circle").boundingBox();
    await page.mouse.move(circle!.x + circle!.width / 2,circle!.y + circle!.height / 2);
    await page.mouse.down();
    await page.waitForTimeout(2000);
    await page.mouse.up();

});


test("drag and drop",async({page})=>{
//   await page.goto("https://demoapps.qspiders.com/ui/dragDrop/dragToCorrect?sublist=2")
//   //dragto
//   let source= page.locator("//div[text()='Mobile Charger']")
//   let target=page.locator("//div[text()='Mobile Accessories']/parent::div")
//   await source.dragTo(target)
//   await page.waitForTimeout(2000)

//   //mouse action
//   let box=await page.locator("//div[text()='Mobile Charger']").boundingBox()
//   await page.mouse.move(box!.x+box!.width/2,box!.y+box!.height/2)
//   await page.mouse.down()
//   let target=await page.locator("//div[text()='Mobile Accessories']/parent::div").boundingBox()
//   await page.mouse.move(target!.x+target!.width/2,target!.y+target!.height/2)
//   await page.mouse.up()
//   await page.waitForTimeout(2000)

//   //hover,up down
//   await page.locator("//div[text()='Mobile Charger']").hover()
//   await page.mouse.down()
//   await page.locator("//div[text()='Mobile Accessories']/parent::div").hover()
//   await page.mouse.up()
//   await page.waitForTimeout(2000)

})

test("scrolling",async({page})=>{
  await page.goto("https://demoapps.qspiders.com/ui/scroll/newTabVertical")
  //wheel
  await page.mouse.wheel(0,1000)
  await page.waitForTimeout(2000)
  await page.mouse.wheel(0,-500)

  //locator based method
  await page.goto("https://doodles.google/")
  await page.locator("#monthDropdown").scrollIntoViewIfNeeded()
  await page.waitForTimeout(2000)
})


test.only("slider", async ({ page }) => {

    await page.goto("https://demoapps.qspiders.com/ui/slider?sublist=0");

    let slider = page.locator("input[type='range']");

    let boundingBox = await slider.boundingBox();

    if (!boundingBox) {
        throw new Error("Slider not found");
    }

    let targetValue = 109;
    let minValue = 0;
    let maxValue = 6000;

    let percentage = (targetValue - minValue) / (maxValue - minValue);

    let startX = boundingBox.x;
    let targetX = boundingBox.x + (boundingBox.width * percentage);

    let y = boundingBox.y + (boundingBox.height / 2);

    await page.mouse.move(startX, y);
    await page.mouse.down();
    //await page.mouse.move(targetX, y, { steps: 10 });
    await page.mouse.move(targetX, y);
    await page.mouse.up();

});



