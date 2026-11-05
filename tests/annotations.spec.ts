import {test} from "@playwright/test"

test("test1",async()=>{
    console.log("test1 exxecuted");
})

test("test2",async()=>{
    let num=10;
    test.skip(num==10,'unexpected value');
    console.log("test2 executed");
})

test("test3",async()=>{
    console.log("test3 executed");
})

// test.only("test4",()=>{//runs only this one and skips all others
//     console.log("test4 executed");
// })

test("test5",()=>{
    console.log("test5 executed");
})

test.fail("test6",async({page})=>{// expected to pass if test fails
    await page.goto("https://demowebshop.tricentiscom/");
})

test.fixme("test7",()=>{
    console.log("test5 executed");
})

test("test8 annotation-slow",async({page})=>{
    test.slow();
    console.log(test.info().timeout);
    await page.goto("https://demowebshop.tricentis.com/");
})

test("test9 annotation-setTime",async({page})=>{
    test.setTimeout(60000);
    console.log(test.info().timeout);
    await page.goto("https://demowebshop.tricentis.com/");
})

test.describe('Login functionality', () => {

    test('Admin login', async ({ page }) => {
        console.log("Admin login");
    });

    test('Valid login', async ({ page }) => {
        let num2=10;
        test.skip(num2==10);
        console.log("Valid login");
    });

    test('Invalid login', async ({ page }) => {
        console.log("Invalid login");
    });

})

