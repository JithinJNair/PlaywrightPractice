import {expect, Locator, test} from "@playwright/test"

test.skip("Standard Dropdown-Singleselect", async ({ page, context }) => {
    await page.goto("https://demoapps.qspiders.com/ui/dropdown?sublist=0");

    let countryLocator = page.locator("#select3");
    await countryLocator.selectOption({index:7})

    let stateLocator = page.locator("#select5");
    await stateLocator.selectOption({value:"Kerala"})

    // let cityLocator = page.locator("#select3");
    // await cityLocator.selectOption({label:"Alappuzha"})

    let allOption = await countryLocator.allTextContents();
    console.log(allOption);

    let selectedOption = await countryLocator.inputValue();
    console.log(`Selected Option:${selectedOption}`);

    let anyOption = await page.locator("#select3 option[value='Germany']").textContent();
    console.log(`anyOption:${anyOption}`);

    await page.waitForTimeout(2000);

});

test.skip("Standard Dropdown-MultiSelect", async ({ page }) => {

    await page.goto(" https://demoapps.qspiders.com/ui/dropdown/multiSelect?sublist=1 ");
   
    let multiSelect = page.locator("#select-multiple-native");

    // Select multiple options by Index
    await multiSelect.selectOption([
        { index: 0 },
        { index: 2 },
        { index: 3 }
    ]);

    await page.waitForTimeout(2000);

    // Deselect All
    await multiSelect.selectOption([]);

    await page.waitForTimeout(2000);

    // Select multiple options by Value
    await multiSelect.selectOption([
        { value: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops" },
        { value: "Mens Casual Premium Slim Fit T-Shirts" },
        { value: "Mens Cotton Jacket" }
    ]);

    await page.waitForTimeout(2000);

    // Deselect All
    await multiSelect.selectOption([]);

    await page.waitForTimeout(2000);

    // Select multiple options by Label
    // await multiSelect.selectOption([
    //     { label: "Fjallraven - Foldsac..." },
    //     { label: "Mens Casual Premium ..." },
    //     { label: "Mens Cotton Jacket..." }
    // ]);

    await page.waitForTimeout(2000);

});

test.skip("custom dropdown", async ({ page, context }) => {
    await page.goto("https://demoqa.com/select-menu");

    await page.locator("#selectOne").click();
    await page.locator("//div[text()='Mr.']").click();

    await page.waitForTimeout(2000);
});


test.only("autosuggestion dropdown",async({page})=>{
  await page.goto("https://www.amazon.in/")
  await page.locator("#twotabsearchtextbox").fill("shoes")
  let allsug=await page.locator("//div[@role='row']").all()
  for(let sug of allsug){
    let text=await sug.textContent()
    if(text?.includes(" for woman"))
      await sug.click()
      break;
  }
})

