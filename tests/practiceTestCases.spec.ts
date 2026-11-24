import {expect, test} from "@playwright/test";

//https://playwright-playground.com/locators/accessibility-tree

//Test Case1
//  1. Open the website https://automationexercise.com/products
//  2. Hover over the first product
//  3. Click the “Add to cart” button that appears in the overlay
//  4. WAIT until the popup is visible
//  5. Assertion: the popup text is “Your product has been added to cart.”

test.skip("TestCase1", async({page})=>{
    await page.goto("https://automationexercise.com/products");

    const firstProduct = page.locator('.features_items .single-products').first();
    await firstProduct.scrollIntoViewIfNeeded();

    await firstProduct.hover();
    await firstProduct.locator('.product-overlay .add-to-cart').click();

   
    let popUPMessageLocator = page.locator("//div[@id='cartModal']//p[@class='text-center']").first();

    // Assert the text is present
    await expect(popUPMessageLocator).toContainText('Your product has been added to cart.');

    await page.waitForTimeout(2000);
})


// Test Case 2:
// 1. Open the website https://www.easemytrip.com
// 2. Click on the Departure date field
// 3. WAIT until the calendar is visible
// 4. Click on date feb 4


test.skip("TestCase2-Easemytrip", async({page})=>{
    await page.goto("https://www.easemytrip.com/");

    expect(page).toHaveTitle("EaseMyTrip : Book Flights, Hotels, Trains, Bus & Holidays");

    let targetMonthYear: string = "February 2027";

    //Enter From City
    let fromLocator = page.locator(".telab",{hasText:"From"});
    await expect(fromLocator).toBeVisible();
    await fromLocator.click();
    let fromCityInputLocator = page.locator("#txtAutoOrgLoc");
    await expect(fromCityInputLocator).toBeVisible();
    await fromCityInputLocator.fill("Bangalore");
    await expect(fromCityInputLocator).toHaveValue("Bangalore");

    //Enter To City
    let toLocator = page.locator(".telab",{hasText:"To"});
    await expect(toLocator).toBeVisible();
    await toLocator.click();
    let toCityInputLocator = page.locator("#txtAutoDesLoc");
    await expect(toCityInputLocator).toBeVisible();
    await toCityInputLocator.fill("Kochi");
    await expect(toCityInputLocator).toHaveValue("Kochi");

    //Click on Departure Date Field
    let fromDateLocator = page.getByText("Departure Date");
    await fromDateLocator.click();

    //Wait for Calendar to Open
    let calendarLocator = page.locator(".month-labels span").first();
    await expect(calendarLocator).toBeVisible();

    let nextButtonLocator = page.locator("#Nxtbtn");

    let currentMonthYear = await calendarLocator.textContent();

    //Click next button,until we have February 2027 in calendar 
    if(currentMonthYear !== targetMonthYear){
        while(true){
            await nextButtonLocator.click();
            currentMonthYear = await calendarLocator.textContent();
            if(currentMonthYear == targetMonthYear){
                break;
            }
        }
    }

    //Click on date 4 Feb 2027.
    let febContainer = page.locator("//div[@class='month-title' and text()=' February 2027 ']/..");
    let dateLocator = febContainer.getByText("4",{exact:true});
    await dateLocator.click();

    await page.waitForTimeout(3000);
})

// testcase 3:
// 1. Open the website https://www.google.com.
// 2 .locate textfield ,enter play
// 3 .Click on the suggestion playwright
// Assertion: the URL contains playwright
test.skip("TestCase3:Google suggestion", async({page})=>{
    await page.goto("https://www.google.com");
    await expect(page).toHaveTitle("Google");

    let searchTerm: string = "Playwright";
    let searchLocator = page.getByRole("combobox",{name:"Search", exact:true});
    await expect(searchLocator).toBeVisible();
    await searchLocator.fill("Play");

    //This looping method doesnt work,because the list item itself is binded as an attribute.
    // let suggestionBox = page.getByRole("listbox");
    // await expect(suggestionBox).toBeVisible();
    // let allSuggestions = await suggestionBox.locator("//li").all();

    // for(let suggestion of allSuggestions){
    //     let suggestionText = await suggestion.textContent();
    //     if(suggestionText?.includes("Playwright")){
    //         await suggestion.click();
    //         break;
    //     }
    // }

    let searchTermLocator = page.getByRole("listbox").getByText("playwright",{exact:false});
    await searchTermLocator.click();

    await expect(page).toHaveTitle("playwright-Google Search");
    await page.waitForTimeout(2000);

})

// Test Case: OrangeHRM add an employee and search in the Employee List

// 1. Open the website https://opensource-demo.orangehrmlive.com
// 2. Locate the username and password field and enter Admin and admin123
// 3. Click on the Login button Assertion: the URL contains dashboard
// 4. Click on PIM in the left menu
// 5. Click on Add Employee
// 6. Locate the first name field, enter eg(jithin) and Locate the last name field, enter eg(j)
// 7. Click on the Save button Assertion: the URL contains viewPersonalDetails
// 8. Click on Employee List
// 9. Locate the Employee Name field, enter eg{amruta}
// 10. Click on the Search button Assertion: the results table shows "amruta"
// 11. Click on the user dropdown (top right corner)
// 12. Click on Logout  

test.only("TestCase4-OrangeHrm",async({page})=>{
    await page.goto("https://opensource-demo.orangehrmlive.com");

    await expect(page).toHaveTitle("OrangeHRM");

    //Identify username field ,password field and Login button locators.
    let usernameLoc = page.getByRole("textbox",{name:"Username", exact:true});
    let passwordLoc = page.getByRole("textbox",{name:"Password", exact:true});
    let loginButtonLoc = page.getByRole("button",{name:"Login", exact:true});

    //Enter username-Admin
    await expect(usernameLoc).toBeVisible();
    await usernameLoc.fill("Admin");

    //Enter password-admin123
    await expect(passwordLoc).toBeVisible();
    await passwordLoc.fill("admin123");

    //Click on login
    await expect(loginButtonLoc).toBeVisible();
    await loginButtonLoc.click();

    //Assert the home page url contains dashboard.
    await expect(page).toHaveURL(/dashboard/);

    //clic on PIM
    let pimLoc = page.getByText("PIM");
    await expect(pimLoc).toBeVisible();
    await pimLoc.click();
    await expect(page).toHaveURL(/viewEmployeeList/);

    //Click on Add employee
    let addEmployeeLoc = page.getByRole("link",{name:"Add Employee"});
    await expect(addEmployeeLoc).toBeVisible();
    await addEmployeeLoc.click();
    await expect(page).toHaveURL(/addEmployee/);

    //Enter First Name-jithin Last Name- j
    let firstNameLoc = page.getByPlaceholder("First Name");
    let lastNameLoc = page.getByPlaceholder("Last Name");
    await expect(firstNameLoc).toBeVisible();
    await firstNameLoc.fill("jithin");
    await expect(lastNameLoc).toBeVisible();
    await lastNameLoc.fill("j");

    //Save the data and assert.
    let saveButtonLoc = page.getByRole("button",{name:"Save"});
    await expect(saveButtonLoc).toBeVisible();
    saveButtonLoc.click();
    await expect(page).toHaveURL(/viewPersonalDetails/);

    //Get Employee list
    let employeeListLoc = page.getByRole("link", {name:"Employee List"});
    await expect(employeeListLoc).toBeVisible();
    employeeListLoc.click();

    //Enter jithin in employee name .search and validate.
    let employeeNameSearchLoc = page.getByRole('textbox', { name: 'Type for hints...' }).first();
    await expect(employeeNameSearchLoc).toBeVisible();
    let searchLoc = page.getByRole("button",{name:"Search"});
    await expect(searchLoc).toBeVisible();
    await employeeNameSearchLoc.fill("jithin");
    await searchLoc.click();
    let employeeCellLoc = page.locator(".oxd-table-cell").getByText(/jithin/).first();
    await expect(employeeCellLoc).toBeVisible();

    //Logout
    let profilePicLoc = page.getByAltText("profile picture");
    let logoutLoc = page.getByRole("menuitem",{name:"Logout"});
    await expect(profilePicLoc).toBeVisible();
    profilePicLoc.click();
    await expect(logoutLoc).toBeVisible();
    await logoutLoc.click();
    await expect(page).toHaveURL(/login/);

    await page.waitForTimeout(2000);


})