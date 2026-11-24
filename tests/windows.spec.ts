import {expect, test} from "@playwright/test";


test("mutiplewindow", async({browser})=>{
  let context = await browser.newContext()
  let parentpage = await context.newPage()
  await parentpage.goto("https://www.shoppersstack.com/products_page/70")

  //Why Promise.all is used: parentpage.waitForEvent('popup') sets up a listener before .click() fires. 
  // If you called await parentpage.locator("#compare").click() first and waited for 'popup' afterward,
  // a fast popup could open before the listener was attached, causing a race condition/timeout.
  // Promise.all([...]) returns an array of two items, and [childwindows] grabs only the first item—
  // which is the Playwright Page object representing the newly opened popup window.
  // What Each Promise Inside Promise.all Resolves To Index 0 (parentpage.waitForEvent('popup')):
  // Resolves to a Page instance (the first popup tab/window opened from parentpage).
  // Index 1 (parentpage.locator("#compare").click()): Resolves to undefined (.click() does not return a value when finished).
  // So before destructuring, the resolved array looks like: [ popupPage, undefined ]
  // How Array Destructuring [childwindows] Maps It
  // childwindows gets index 0 -> the new popup Page object (so you can call methods like 
  // childwindows. title(), childwindows.url(), childwindows.locator(...), or childwindows.waitForLoadState('load')).
  // Index 1 (undefined) is ignored because you didn't list a second variable name.
  // What If #compare Opens Multiple Popups?Even if clicking #compare opens two or three popup windows, parentpage.
  // waitForEvent('popup') only listens for one 'popup' event and resolves with that first popup Page. 
  // To get every popup that opened, you look at context.pages() (or listen to context.on('page', ...)).
  let [childwindows]=await Promise.all([
    parentpage.waitForEvent('popup'),
    parentpage.locator("#compare").click()
  ])

  // Ensures parentpage is settled after clicking #compare 
  // (in case clicking the button triggered navigation or updated resources on the parent tab).
  await parentpage.waitForLoadState('load')

  // Newly opened popup windows often start on about:blank or load their external page asynchronously after opening. 
  // Waiting for 'load' on childwindows helps make sure the popup's initial content/title is ready before 
  // your for (const pw of allwindow) loop checks await pw.title()
  await childwindows.waitForLoadState('load')
  let allwindow=context.pages()
  console.log("Total Windows:"+allwindow.length)
  for (const [index, win] of allwindow.entries()) {
    console.log(`Window ${index} URL:`, win.url());
  }
//   console.log(allwindow[0].url())
//   console.log(allwindow[1].url())
//   console.log(allwindow[2].url())
//   console.log(allwindow[3].url())

  for(const pw of allwindow){
    const title=await pw.title()
    if(title.includes("Online Shopping Site for Mobiles, Electronics, Furniture, Grocery")){
      await pw.setViewportSize({width:1366,height:768})
      let searchfield= pw.locator("[placeholder='Search for Products, Brands and More']")
      await expect(searchfield).toBeVisible({timeout:40000});
      await searchfield.fill("iphone")
      await expect(searchfield).toHaveValue("iphone")
    }
  }

  await context.close();
})

test.only("multiple windows2",async({browser})=>{
    //Without await, context1 is a Promise<BrowserContext>, not a BrowserContext instance, 
    // so context1.newPage() throws a TypeError: context1.newPage is not a function.
    let context1  = await browser.newContext();
    let pageOne = await context1.newPage();
    let pageTwo = await context1.newPage();

    await pageOne.goto("https://www.selenium.dev/");
    await expect(pageOne).toHaveURL("https://www.selenium.dev/");
    await pageTwo.goto("https://playwright.dev/java/");
    await expect(pageTwo).toHaveURL("https://playwright.dev/java/");

    let allwindow = context1.pages();

    for(const pw of allwindow){
        let pageTitle = await pw.title();
        if(pageTitle.includes("Playwright")){
            let getStartedLoc = pw.getByRole("link",{name:"Get Started"})
            await expect(getStartedLoc).toBeVisible();
            await getStartedLoc.click();
            await expect(pw).toHaveURL("https://playwright.dev/java/docs/intro");
        }
    }

})