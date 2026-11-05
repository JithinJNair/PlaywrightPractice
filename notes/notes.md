## Fixture
Readymade object provided by Playwright that handles setup and teardown.

### Page Fixture
1) Its built in Fixture that represents a Browser tab or fresh page.
2) A page represents a single browser tab.
3) Used to interact with web elements, navigate URLs, click buttons, enter text, and verify results.
4) Provided automatically by Playwright Test as a fixture.

Common methods: page.goto(), page.locator(), page.click(), page.fill(), page.screenshot().
   
### Browser Fixture
1) Its a built in Fixture that represents  the browser instance.(chromium,firefox,webkit)
2) Represents a browser instance, such as Chromium, Firefox, or WebKit.
3) A browser can contain multiple browser contexts.
4) Used when you need to create contexts or pages manually.

### context (browserContext)
- Represents an isolated browser session.
- Holds session-specific data such as cookies, local storage state, and permissions.
- Multiple contexts can run independently within the same browser instance.
- Useful for testing multiple users, such as an admin and a customer.

### browserName
- Identifies which browser engine is being used.
- Available through Playwright's testInfo.project.use.browserName or through the test configuration.
- Common values: chromium, firefox, and webkit.

```typescript
import {test} from "@playwright/test"

test("page fixture",async({page})=>{
    await page.goto("https://demowebshop.tricentis.com/")
    await page.waitForTimeout(2000)
    await page.goto("https://www.instagram.com/")
    await page.waitForTimeout(2000)
})

test("browserfixture",async({browser})=>{//to create multiple browser sessions
    let context1 = await browser.newContext()
    let page1 = await context1.newPage()
    await page1.goto("https://demowebshop.tricentis.com/")

    let context2 = await browser.newContext()
    let page2 = await context2.newPage()
    await page2.goto("https://www.instagram.com/")
})

test("context fixture",async({context})=>{//to create multiple tabs
    let page1 = await context.newPage()
    await page1.goto("https://demowebshop.tricentis.com/")

    let page2 = await context.newPage()
    await page2.goto("https://www.instagram.com/")
    await page2.waitForTimeout(2000)
})
```

#### When we use the page fixture
Playwright Test provides a browser instance, creates a browser context, and provides a page (tab) inside that context.
We use the page fixture methods to perform actions on that tab.
```typescript
test('Page fixture', async ({ page }) => {
    await page.goto('https://demowebshop.tricentis.com/');
});```

//Hierarchy: Browser → Context → Page (Tab)

### When we use the context fixture
Playwright Test provides the browser context. The test runner also manages the browser lifecycle, and we can create pages manually inside the provided context.
``` typescript
test('Context fixture', async ({ context }) => {
    const page1 = await context.newPage();
    await page1.goto('https://demowebshop.tricentis.com/');

    const page2 = await context.newPage();
    await page2.goto('https://www.instagram.com/');
});```

Both pages belong to the same context and share relevant cookies and browser storage.
Hierarchy:Browser (managed by Playwright Test) → Context (provided by fixture) → Pages (created manually)

##### When we use the browser fixture
Playwright Test provides the browser instance. We manually create browser contexts and pages using that browser.
``` typescript
test('Browser fixture', async ({ browser }) => {
    const context1 = await browser.newContext();
    const page1 = await context1.newPage();
    await page1.goto('https://demowebshop.tricentis.com/');

    const context2 = await browser.newContext();
    const page2 = await context2.newPage();
    await page2.goto('https://www.instagram.com/');
});```

// 13/10/2026

## Run Commands
1. Run all Test
- npx playwright test

2. Run a specific test file
- npx playwright test filename

3. Run in headed mode
- npx playwright test filename --headed

4. Run a specific test case with respect to title name 
- npx playwright test -grep "title"
-OR   npx playwright test -g "title"(-g is short of -grep)
- title should be unique

5. Run only the test failed in last run
- npx playwright test --last-failed

6. Run on differrent browser
- npx playwright test --project=chromium
- npx playwright test --project=firefox
- npx playwright test --project=webkit

7. Run on multiple browser
- 

8. Show Report
- npx playwright show-report

9. Debug the test in inspector mode 
- npx playwright test --debug
- npx playwright test filepath --debug

## Annotations

1. Annotations are special instructions used to provide additional information about a test and control how Playwright executes it.
2. They help us skip tests, focus on specific tests, mark expected failures, identify tests that need fixing, and increase test timeouts.
3. Annotations can be applied to individual tests or groups of tests, depending on the API.

### `test.skip()`

Skip a test without executing its test body.

```typescript
test('Feature test', async ({ page, browserName }) => {
    test.skip(browserName === 'firefox', 'Not supported in Firefox');
    await page.goto('https://example.com');
});
```

### `test.only()`

Run only the specified test or tests, excluding other tests from the run.

```typescript
test.only('Login test', async ({ page }) => {
    await page.goto('https://example.com');
});
```

### `test.fail()`

Mark a test as expected to fail.

- If the test fails as expected, Playwright reports it as an expected failure.
- If the test unexpectedly passes, Playwright reports it as a failure because the expected failure did not occur.

```typescript
test('Checkout bug', async ({ page }) => {
    test.fail();
    await page.goto('https://example.com');
    // Add the assertion that currently fails.
});
```

### `test.fixme()`

Mark a test as needing a fix and skip its execution.

- `test.skip()` — Skip a test that should not run.
- `test.fixme()` — Skip a test that is known to need fixing.

```typescript
test('Broken checkout test', async ({ page }) => {
    test.fixme();
    await page.goto('https://example.com');
});
```

### `test.slow()`

Triple the default test timeout.

If the default test timeout is 30 seconds, `test.slow()` makes it 90 seconds.

```typescript
test('Generate report', async ({ page }) => {
    test.slow();
    await page.goto('https://example.com');
});
```

### `test.describe()`

Group related tests into a test suite.

```typescript
test.describe('Login functionality', () => {

    test('Valid login', async ({ page }) => {
        await page.goto('https://example.com');
    });

    test('Invalid login', async ({ page }) => {
        await page.goto('https://example.com');
    });

});
```

You can also apply annotations to an entire group:

```typescript
test.describe('Mobile tests', () => {
    test.skip(({ isMobile }) => !isMobile, 'Mobile tests only');

    test('Mobile navigation', async ({ page }) => {
        await page.goto('https://example.com');
    });
});
```

Here, the tests are skipped when the project is not configured for mobile.

### `test.setTimeout()`

Set a specific timeout for a test.

```typescript
test('Checkout test', async ({ page }) => {
    test.setTimeout(60000);

    await page.goto('https://example.com');
});
```

Unlike `test.slow()`, which triples the default timeout, `test.setTimeout()` lets you specify the exact timeout you want.

//14/10/2026
## Browser Controls
1. page.setviewportsize()- sets window size- page.setViewportSize({ width: 1280, height: 720 });
2. page.viewport()- gets the window size
3. page.url()- returns the page url
4. page.title()- returns page title
5. page.goto()- navigate to url
6. context.cookies()- Returns cookies associated with the browser context. You can optionally provide URLs to filter the cookies.
7. browser.newContext()- Create new context(like a fresh browser profile)
8. context.newpage()-create new page/tab.
9. chromium.launch()- Launch browser instance manually for chromium browser.
10. page.screenshot()- screenshot of cuurrent page
11. browser.close()

```typescript
import {test, chromium} from "@playwright/test";

test("browsercontrol",async({page})=>{
    await page.goto("https://demowebshop.tricentis.com/");
    let size = page.viewportSize();
    console.log(size);

    await page.setViewportSize({width:800,height:500});
    let newSize = page.viewportSize();
    console.log(newSize);
    await page.waitForTimeout(2000);

    let url = page.url();
    console.log("URL:"+url);

    let title = await page.title();
    console.log("Title of webpage:"+title);
})

test("contextcookies",async({browser})=>{
    const context1 = await browser.newContext();
    const page1 = await context1.newPage();
    await page1.goto("https://demowebshop.tricentis.com/");
    console.log(await context1.cookies());
    console.log("------------------------------------------------------");
    const context2 = await browser.newContext();
    const page2 = await context2.newPage();
    await page2.goto("https://www.w3schools.com/");
    console.log(await context2.cookies());
})

test("chromium",async({})=>{
    let browser = await chromium.launch();// should import chromium
    const context1 = await browser.newContext();
    const page1 = await context1.newPage();
    await page1.goto("https://www.w3schools.com/");
    console.log(await context1.cookies());
    await browser.close();
   
})

test.only("screenshot",async({page})=>{
    await page.goto("https://www.w3schools.com/");

    // Generate a timestamp
    let time = new Date().getTime();

    // Capture a screenshot with the dynamic name
    await page.screenshot({ path: `screenshot/w3schoolSS_${time}.png`});

})
```
//16/10/2026
# Locators
1.Built in getBy methods
2. Locatrs-Selectors-CSS-Xpath

Buil in getBy methods
1.getByAltTest()- To locate an Image,media,audio,vedio using alt attribute
  - page.getByAltTest("text")
  - page.getByAltTest("text",options)- page.getByAltTest("text",{exact:true})

2. getByText()
  - To locate an element by its visible text or text of an element.

3. getByRole()
    - to locate the

- getByLabel()
    - to get an element using its associated <label> text.
    <input id="username">email
    <label for="username">
- getByplaceholder()
    -  Used If i want to locate an input box using a placeholder attribute.
- getBytitle()
    -When I want to locate the element using title attribute.
- getBytestId()
    - If I want to locate an element by using test id attribute.
    - attribute name sould be - data testId
    - If attribute name is differrnt like- data test /datatestpw/datatestIdpw- we have to configure that  in config file.


```typescript
import {expect, Locator, test} from "@playwright/test"

test("getByAltText",async({page})=>{
    await page.goto("https://demowebshop.tricentis.com/");
    let logo:Locator = page.getByAltText("Tricentis Demo Web Shop", {exact: true});
    await expect(logo).toBeVisible();
})

test("getByText",async({page})=>{
    await page.goto("https://demowebshop.tricentis.com/");
    let text:Locator = page.getByText("Featured Products");
    await expect(text).toBeVisible();
})

test.only("getByRole",async({page})=>{
    await page.goto("https://demowebshop.tricentis.com/");
    await page.getByRole("link",{name:'Register'}).click();
    await page.getByRole("radio",{name:'Male', exact:true}).click();
    await page.getByRole("textbox",{name:'First name:'}).fill("Jithin");
    await page.getByRole("textbox",{name:'Last name:'}).fill("Nair");
    await page.getByRole("textbox",{name:'Email:'}).fill("89.jith@gmail.com");
    await page.getByRole("textbox",{name:'Password:', exact:true}).fill("xyz1234");
    await page.getByRole("textbox",{name:'Confirm password:'}).fill("xyz1234");
    await page.pause();

})```

// 21/10/2026

```typescript
test("getByLabel",async({page})=>{
     await page.goto("https://demowebshop.tricentis.com/");
     await page.getByRole("link",{name:'Log in'}).click();
     await page.getByLabel("Email:").fill("xyz@gmail.com");
     await page.getByLabel("Password:").fill("1234");
     await page.waitForTimeout(3000);
})

test("getByPlaceHolder",async({page})=>{
     await page.goto("https://www.amazon.in/");
     await page.getByPlaceholder("Search Amazon.in").fill("mobiles");
     await page.waitForTimeout(3000);
})

test("getByTitle",async({page})=>{
     await page.goto("https://demowebshop.tricentis.com/");
     await page.getByTitle("Show details for Build your own cheap computer").first().click();
     await page.waitForTimeout(3000);
})

test.only("getByTestId",async({page})=>{
    await page.goto("https://www.saucedemo.com/");
    await page.getByTestId("username").fill("Jithin");
    await page.waitForTimeout(3000);
})
```

## Playwright Locators — `getBy...()` Methods- ChatGpt notes

Playwright provides built-in locator methods to find elements on a web page. These methods make tests easier to read, maintain, and debug.

### 1. `getByRole()`

Locates an element based on its **accessible role** and, optionally, its accessible name.

**Syntax:**

```typescript
page.getByRole(role, { name: 'accessible name' });
```

**Example:**

```typescript
page.getByRole('button', { name: 'Login' });
page.getByRole('textbox', { name: 'Email' });
page.getByRole('link', { name: 'Home' });
page.getByRole('checkbox', { name: 'Remember me' });
```

**Common roles:**

| Role | Example element |
|---|---|
| `button` | `<button>Login</button>` |
| `link` | `<a href="/">Home</a>` |
| `textbox` | Text input |
| `checkbox` | Checkbox |
| `radio` | Radio button |
| `heading` | Heading |
| `img` | Image |
| `combobox` | Select or combo box |

**When to use:** Prefer `getByRole()` when the element has a meaningful accessible role and name.

---

### 2. `getByText()`

Locates an element based on the text it contains.

**Syntax:**

```typescript
page.getByText('text');
```

**Example:**

```typescript
page.getByText('Welcome');
page.getByText('Login successful');
page.getByText('Submit', { exact: true });
```

By default, text matching can be case-insensitive and can match a substring. Use `{ exact: true }` when you want an exact text match.

**When to use:** When locating an element using visible text, such as messages, labels, or text displayed on a page.

---

### 3. `getByLabel()`

Locates form controls using their associated label.

**Syntax:**

```typescript
page.getByLabel('label text');
```

**Example:**

```typescript
page.getByLabel('Email');
page.getByLabel('Password');
page.getByLabel('Remember me');
```

**Example HTML:**

```html
<label for="email">Email</label>
<input id="email" type="email" />
```

**When to use:** When interacting with form fields that have associated labels.

---

### 4. `getByPlaceholder()`

Locates an input element using its placeholder text.

**Syntax:**

```typescript
page.getByPlaceholder('placeholder text');
```

**Example:**

```typescript
page.getByPlaceholder('Enter your email');
page.getByPlaceholder('Enter your password');
page.getByPlaceholder('Search');
```

**Example HTML:**

```html
<input type="email" placeholder="Enter your email" />
```

**When to use:** When an input field has a meaningful placeholder and no better locator is available.

**Note:** Placeholder text is not a replacement for a proper accessible label.

---

### 5. `getByAltText()`

Locates elements, typically images, using their `alt` attribute.

**Syntax:**

```typescript
page.getByAltText('alternative text');
```

**Example:**

```typescript
page.getByAltText('Company logo');
page.getByAltText('Profile picture');
```

**Example HTML:**

```html
<img src="logo.png" alt="Company logo" />
```

**When to use:** When locating images or other elements with meaningful alternative text.

**Important:** The correct method name is `getByAltText()`, not `getByAltTest()`.

---

### 7. `getByTestId()`

Locates an element using a test ID attribute in the HTML.

**Syntax:**

```typescript
page.getByTestId('test-id-value');
```

**Example:**

```typescript
page.getByTestId('login-button');
page.getByTestId('email-input');
page.getByTestId('submit-button');
```

**Example HTML:**

```html
<button data-testid="login-button">Login</button>
<input data-testid="email-input" type="email" />
```

By default, Playwright uses the `data-testid` attribute.

#### How to configure a custom test ID attribute

Sometimes an application uses an attribute other than `data-testid`, such as `data-test` or `data-qa`.

You can configure Playwright to use a custom attribute in the `playwright.config.ts` file.

**Example: Configure `data-test`**

```typescript
import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: {
    testIdAttribute: 'data-test',
  },
});
```

Then, use the same `getByTestId()` method in your test:

```typescript
page.getByTestId('login-button');
```

Your HTML should use the configured attribute:

```html
<button data-test="login-button">Login</button>
```

**Example: Configure `data-qa` instead**

```typescript
import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: {
    testIdAttribute: 'data-qa',
  },
});
```

HTML:

```html
<button data-qa="login-button">Login</button>
```

Test:

```typescript
page.getByTestId('login-button');
```

**Important points:**

- Configure `testIdAttribute` inside the `use` section of `playwright.config.ts`.
- The configured attribute name must match the attribute used in the HTML.
- You do not change the `getByTestId()` method name when changing the attribute.
- If no custom attribute is configured, Playwright uses `data-testid`.
- The configuration affects `getByTestId()` throughout the tests that use that Playwright configuration.

**When to use:** When the application has stable test-specific attributes designed to make automated tests reliable.

---

### 8. Using `getBy...()` Locators with Actions

You can use these locator methods with Playwright actions such as `click()`, `fill()`, and `check()`.

```typescript
import { test, expect } from '@playwright/test';

test('Login example', async ({ page }) => {
  await page.goto('https://example.com');

  await page.getByLabel('Email').fill('user@example.com');
  await page.getByLabel('Password').fill('password123');
  await page.getByRole('button', { name: 'Login' }).click();

  await expect(page.getByText('Welcome')).toBeVisible();
});
```

**Remember:**

- Use `fill()` to enter text into an input.
- Use `click()` to click an element.
- Use `check()` for checkboxes and radio buttons when supported.
- Use `toBeVisible()` to verify that an element is visible.
- Use `await` with asynchronous Playwright actions and assertions as shown above.

---

### 9. Quick Revision Table

| Locator method | Locates elements using |
|---|---|
| `getByRole()` | Accessible role and optional accessible name |
| `getByText()` | Text content |
| `getByLabel()` | Associated form label |
| `getByPlaceholder()` | Placeholder text |
| `getByAltText()` | Alternative text, usually for images |
| `getByTitle()` | `title` attribute |
| `getByTestId()` | Configured test ID attribute; defaults to `data-testid` |

### 10. Best Practices

1. Prefer `getByRole()` when the element has a meaningful accessible role and name.
2. Use `getByLabel()` for form fields with associated labels.
3. Use `getByText()` when visible text is the best way to identify an element.
4. Use `getByPlaceholder()` when a meaningful placeholder is available.
5. Use `getByAltText()` for elements with meaningful alternative text.
6. Use `getByTitle()` when the `title` attribute is suitable for locating the element.
7. Use `getByTestId()` when a stable test-specific attribute is available.
8. Avoid relying on text or attributes that change frequently.
9. If multiple elements match a locator, make it more specific rather than assuming the first match is correct.
10. Remember that Playwright locators are generally resolved when an action or assertion runs, which helps them work with changing pages.

**Interview tip:** Be ready to explain the difference between `getByRole()`, `getByText()`, `getByLabel()`, and `getByTestId()`, and know how to configure a custom `testIdAttribute` in `playwright.config.ts`.


## locator()
- Is a playwright method which is used to locate 
// page.loactor("selectotr)
1. CSS Selector
    - It is used to identify elem
    - elements are identified using id,classname,tagname+id,tagname+classname,tagname+attribute
2. Xpath


// write notes of locator().



// 22/10/2026


### Xpath
    - xpath stands for xml path language.
    - It is multidirectional
    - Two types of xpath are absolute xpath and relative xpath.
#### Relative xpaths
1. xpath by attribute
2. xpath by text()
3. xpath by contains
4. xpath by multiple attributes
5. xpath by surroundings
6. xpath by starts-with
7. xpath by ends-with
8. xpath by index

1. xpath by attribute name value pair.
    - locate the element using attribute.
    - //tagname[@attributename = 'attributevalue].

2. xpath by text()
    - If i want to locate the element by using the visibe text/text of an element ,i will be using xpath by text().
    - //tagname[text()='visible text']

3. xpath by contains
    - locate the element by passing partial amount of attribute value/text value.
    - It is used when attribute value/text value is lengthy or the element is dynamic.
    - //tagname[contains(text(),'text value')].
    - //tagname[contains(@attributename, 'partial attribute value')
    ]
    ```html
    <a>'welcome to playwright batch'</a>
    ```
    - //a[contains(text(),'playwright')]

    ```html
    <a placeholder = 'welcome to 2026'></a>
    ```
    - //a[contains(@placehgolder,'welcome to')]

4. xpath by multiple attributes
    - Locate the element by using multipleattributes and logical operator.
    - //tagname[@attribute1='attribute1 value' and @attribute2='attribute2 value']
    - //tagname[@attribute1='attribute1 value' or @attribute2='attribute2 value']
    - //tagname[@attribute1='attribute1 value' and text()='xyz']

5. strats-with: locate the element by passing the beginning textvalue/attribute value.
    - //input[contains(@placeholder,'Search')]

6. ends-with : locate the element by passing the ending textvalue/attribute value.
    - //input[contains(@placeholder,'Search')]

7. xpath by index : 
    - locate the element based on the idex.
    - (//a[contains(@placeholder,'welcome to')])[index]
    - page.locator("(//input[@value='Add to cart'])[4]")

8. xpath index-last element:
    - (//a[contains(@placeholder,'welcome to')])[last()];
    - page.locator("(//input[@value='Add to cart'])[last()]").click()

9. xpath by index- position:
    - (//a[contains(@placeholder,'welcome to')])[position()=3]
    - page.locator("(//input[@value='Add to cart'])[position()=3]").click();

10. xpath by normalized space: when the element has starting or trailing spaces,locates element  by avoiding the whitespace.
    - //a[normalize-space(text())='Books']

11. xpath by axes: locate the element by based on the relationship between 2 elements.


    
```typescript
import {expect, Locator, test} from "@playwright/test"
// https://opensource-demo.orangehrmlive.com/web/index.php/auth/login
// https://www.saucedemo.com/ 
//https://demowebshop.tricentis.com

test("xpathByAttribute",async({page})=>{
    await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");
    await page.locator("//input[@name = 'username']").fill("Admin");
    await page.locator("//input[@type = 'password']").fill("admin123");
    await page.locator("//button[@type = 'submit']").click();
    await page.waitForTimeout(3000);
})

test("xpathByTextMethod",async({page})=>{
    await page.goto("https://www.saucedemo.com/ ");
    await page.locator("#user-name").fill("standard_user");
    await page.locator("//input[@name = 'password']").fill("secret_sauce");
    await page.locator(".submit-button").click();
    await page.locator("//div[text()='Sauce Labs Backpack']").click();
    await page.waitForTimeout(3000);
})

test("xpathByContainsMethod",async({page})=>{
    await page.goto("https://www.amazon.in/");
    await page.locator("//input[contains(@placeholder,'Search')]").fill("iphone");
    await page.locator("//input[@id='nav-search-submit-button']").click();
    await page.locator("//span[contains(text(),'iPhone 17 Pro 256 GB: 15.93 cm (6.3″) Display with Promotion up to 120Hz, A19 Pro Chip')]").first().click();
    await page.waitForTimeout(3000);
})

test.skip("xpathByMultipleAttributes",async({page})=>{
    await page.goto("https://en.wikipedia.org/wiki/Wikipedia");
    await page.locator("//input[@name='search' and contains(@title, 'Search Wikipedia')]").fill("hello");
    await page.waitForTimeout(3000);
})
// skipped 23/10/2026 class- write notes of it.

// 27/10/2026

test("xpathByStartsWith", async({page})=>{
    await page.goto("https://www.amazon.in/");
    await page.locator("//input[starts-with(@placeholder,'Search')]").fill("iphone");
    await page.locator("//input[starts-with(@id,'nav-search')]").click();
    await page.locator("//span[contains(text(),'iPhone 17 Pro 256 GB: 15.93 cm (6.3″) Display with Promotion up to 120Hz, A19 Pro Chip')]").first().click();
    await page.waitForTimeout(3000);
})

test("xpathByIndex",async({page})=>{
    await page.goto("https://demowebshop.tricentis.com");
    await page.locator("(//input[@value='Add to cart'])[4]").click();
    await page.waitForTimeout(3000);
})

test("xpathByIndex-last()",async({page})=>{
    await page.goto("https://demowebshop.tricentis.com");
    await page.locator("(//input[@value='Add to cart'])[last()]").click();
    await page.waitForTimeout(3000);
})

test("xpathByIndex-position()",async({page})=>{
    await page.goto("https://demowebshop.tricentis.com");
    await page.locator("(//input[@value='Add to cart'])[position()=3]").click();
    await page.waitForTimeout(3000);
})
```
// skipped 23/10/2026 class- write notes of it.

// 27/10/2026

## WebElement/ Element Control methods


# Categories of Playwright Locator Methods

| Category | Methods | Purpose |
|---|---|---|
| State-checking methods | `isVisible()`, `isEnabled()`, `isDisabled()`, `isEditable()`, `isChecked()` | Check the current state of an element |
| Action methods | `click()`, `fill()`, `check()`, `uncheck()` | Perform actions on elements |
| Text retrieval methods | `innerText()`, `textContent()`, `allInnerTexts()`, `allTextContents()` | Retrieve text from elements |
| Value retrieval methods | `inputValue()` | Retrieve the current value of an input field |
| Locator collection methods | `count()`, `all()`, `nth()`, `first()`, `last()` | Count, retrieve, or select matching elements |
| Waiting methods | `waitFor()` | Wait for an element to reach a specified state |

1. fill()
    - enter data into textbox.
    - if any data already present,it will remove the existing data before adding new one.
    - It accepts data in String format.

2. type()
    - It enters data along with the existing data.
    - It enters data chracter by chracter.
    - It is deprecated.

3. clear()
    - It clears the data from textfield.

4. click()
    - It performs click actions.
    - It takes no argument.

5. innerText()
    - It is used to retrieve/capture the visible text of an element which is present on the webpage.
    - inner text will be present on webpage and will be between opening and closing tag.
    ```html
    <a> login </a>  // login is inner text which is visible on webpage.
    <a display:hidden>register</a>  //register is not visible on webpage. innerText() cannot retreive text "register".Because its not visible on webpage. Use textContent().
    ```
    - It captures only 1 visible text of an element at a time.
    - In Playwright with TypeScript, innerText() and textContent() are both used to retrieve text from a web element, 
      but they behave differently.
    - Use innerText() when you want to verify the text a user can see on the page.
    - Use textContent() when you need all text nodes, including hidden text, or want to inspect the DOM's text content.
    - InnerText() returns Promise<string>.
    - textContent() returns Promise<string \| null>.

6. allInnerText()
    - It returbs array of String.
    - // page.locator("").allInnerText()
7. allTextContent()
    -
8. inputValue()
    - To capture the data that entered in input field.
    - // page.locator("").inputValue()

9. getAttribute():
    - To capture the attribute value.
    - We have to pass the attribute name to capture attribute value.
    - // page.locator("").getAttribute()

10. all():
    - It retrieves all the elements matching to given locators and returns an array of locator.
    - // let allLocators:Locator[] = page.locator("").all()

```typescript
import {expect, Locator, test} from '@playwright/test';

test("fill", async({page})=>{
    await page.goto("https://demowebshop.tricentis.com/")
    await page.locator("//input[@id='small-searchterms']").fill("mobile");
    await page.waitForTimeout(2000);
    await page.locator("//input[@id='small-searchterms']").fill("hello");
    await page.waitForTimeout(2000);
})

test("type", async({page})=>{
    await page.goto("https://demowebshop.tricentis.com/")
    await page.locator("//input[@id='small-searchterms']").type("mobile");
    await page.waitForTimeout(2000);
    await page.locator("//input[@id='small-searchterms']").type("hello");
    await page.waitForTimeout(2000);
})

test("clear and click", async({page})=>{
    await page.goto("https://demowebshop.tricentis.com/")
    await page.locator("//input[@id='small-searchterms']").fill("mobile");
    await page.waitForTimeout(2000);
    await page.locator("//input[@id='small-searchterms']").clear();
    await page.waitForTimeout(2000);
    await page.locator("//input[@id='small-searchterms']").fill("hello");
    await page.waitForTimeout(2000);
    await page.click("//input['.button-1.search-box-button' and @type='submit']");
    await page.waitForTimeout(2000);
})

test("innerText", async({page})=>{
    await page.goto("https://demowebshop.tricentis.com/")
    let inText:string = await page.locator("//a[text()='$25 Virtual Gift Card']").innerText();
    console.log(inText);
    await page.waitForTimeout(2000);

    let allText:Locator =  page.locator(".product-title");

    let count: number = await allText.count();
    for(let i=0;i<count;i++){
        console.log(await allText.nth(i).innerText());
    }
})

test("textContent", async({page})=>{
    await page.goto("https://demowebshop.tricentis.com/")
    // let inText2:string = await page.locator("//a[text()='$25 Virtual Gift Card']").textContent();
    // console.log(inText2);
    // await page.waitForTimeout(2000);

    let allText:Locator =  page.locator(".product-title");

    let count: number = await allText.count();
    for(let i=0;i<count;i++){
        console.log(await allText.nth(i).textContent());
    }
})

test("allinnerText", async({page})=>{
    await page.goto("https://demowebshop.tricentis.com/")
     let allText:string[] =  await page.locator(".product-title").allInnerTexts();
    console.group(allText);
})

test("allTextContents", async({page})=>{
    await page.goto("https://demowebshop.tricentis.com/")
     let allText:string[] =  await page.locator(".product-title").allTextContents();
    console.group(allText);
})

test("inputValue", async({page})=>{
    await page.goto("https://demowebshop.tricentis.com/")
    let textField = page.locator("//input[@id='small-searchterms']");
    await textField.fill("mobile");
    console.log(await textField.inputValue());
})

test("getAttribute", async({page})=>{
    await page.goto("https://demowebshop.tricentis.com/")
    let textField = page.locator("//input[@id='small-searchterms']");
    console.log(await textField.getAttribute("type"));
    console.log(await textField.getAttribute("id"));
    console.log(await textField.getAttribute("class"));
})

test("all", async({page})=>{
    await page.goto("https://demowebshop.tricentis.com/")
    let allText:Locator[] =  await page.locator(".product-title").all();
    for(let a of allText){
        console.log(await a.innerText());
    }
})
```

## Test Cases
### testcase1 
1. navigate to demowebshop 
2. locate all the link
3. print all the visible text of link on console(innertext) without all()
```typescript
test("ass",async({page})=>{
await page.goto("https://demowebshop.tricentis.com/")
 let link= page.locator("//a")
 const count=await link.count()//95
 for(let i=0;i<count;i++){
        console.log(await link.nth(i).innerText())
     }
})
```

### testcase2
1. navigate to saucedemo 
2. login 
3. locate all 6 addtocart button and add that button to cart 
```typescript
test("testcase2", async({page})=>{
    await page.goto("https://www.saucedemo.com/ ");
    await page.locator("#user-name").fill("standard_user");
    await page.waitForTimeout(2000);
    await page.locator("//input[@name = 'password']").fill("secret_sauce");
    await page.waitForTimeout(2000);
    await page.locator(".submit-button").click();
    let addToCartButtons:Locator =  page.locator("//button[contains(@class,'btn_inventory ')]");
    let count = await addToCartButtons.count();

    for(let i=0;i<count;i++){
        await addToCartButtons.nth(i).click();
    }

    await page.waitForTimeout(2000);
})
```

### testcase3[xpath by position]
1. navigate to demowebshop 
2. locate all 6 productname 
3. print visible text only of last 2 product 
```typescript
test("ass1",async({page})=>{
await page.goto("https://demowebshop.tricentis.com/")
  let allproduct:Locator[]=await 
  page.locator("(//h2[@class='product-title'])[position()>4]").all()
  for(let a of allproduct){
    console.log(await a.innerText())
  }
}) 
```
//29/20/2026
## WebElement/ Element Control methods
11. isVisible():
    - used to check whether element is visible or not.
    - It doesnt have auto wait mechanism.
    
12. isEnabled():
    - To check whether element is enabled or not.
    - element is available on webpage but is not taking action.
    - for example a login button,button is disabled until password entered is more than 6chracters.
    - doesnt have auto wait mechanism.

13. isDisabled():
    - To check whether element state itself is disable dor not.
    - doent have auto wait mechanism.

14. isEditable():
    - To check whether text field is editable or not.
    - doesnt have auto wait mechanism.

15. check():
    - To select checkbox or radiobox

16. uncheck():
    -

17. isChecked():
    - No autowait

18. waitFor():
    - locator.waitFor() pauses the execution of the test until the specified element state is reached or the timeout expires.
    - It takes two arguments-state and max timeout
    states checked are: 
        1. Visible: The element is attached to the DOM and has a visible bounding box, with no visibility: hidden.
        2. hidden: The element is either hidden or detached from the DOM.
        3. attached: The element exists in the DOM, whether visible or hidden.
        4. dettached: 	The element is no longer present in the DOM.
    - if no state passed-default state for which it wait is visible.
    - default max timeout is 0sec.
    - Useful for waiting for elements to appear, disappear, or be added to or removed from the DOM.
    ```typescript
    //Wait until an element is visible
    //Playwright waits up to 10 seconds for the button to become visible. If it becomes visible sooner, execution continues immediately.
    const loginButton = page.locator("#login");
    await loginButton.waitFor({state: "visible",timeout: 10000});
    await loginButton.click();

    //Wait until an element disappears
    //This is useful when waiting for a loading spinner to disappear. The condition is also satisfied if the spinner is removed from the DOM.
    const loader = page.locator(".loading");
    await loader.waitFor({state: "hidden",timeout: 30000});

    //Wait until an element is attached to the DOM
    //The test continues when the element is present in the DOM, even if it is hidden.
    await page.locator("#message").waitFor({state: "attached"});
    ```

``` typescript
test("isVisible", async({page})=>{
    await page.goto("https://www.saucedemo.com/ ");
    await page.locator("#user-name").fill("standard_user");
    await page.locator("//input[@name = 'password']").fill("secret_sauce");
    await page.locator(".submit-button").click();
    let img = page.locator("[alt = 'Sauce Labs Backpack']");
    await page.waitForTimeout(3000);
    console.log(await img.isVisible());
})

test("isEnable", async({page})=>{
    await page.goto("https://www.instagram.com/ ");
    await page.locator("[name='email']").fill("Jithin");
    await page.locator("[name='pass']").fill("123");
    let button = page.locator("[aria-label='Log In']");
    console.log(`Button enabled:${await button.isEnabled()}`)
})

test("isDisabled", async({page})=>{
    await page.goto("https://www.instagram.com/ ");
    await page.locator("[name='email']").fill("Jithin");
    await page.locator("[name='pass']").fill("123");
    let button = page.locator("[aria-label='Log In']");
    console.log(`Button disabled:${await button.isDisabled()}`)
})

test("isEditable", async({page})=>{
    await page.goto("https://demowebshop.tricentis.com/")
    let inputField = page.locator("inut#small-searchterms");
    console.log(`Input field editable:${inputField.isEditable()}`);
})

test("check and uncheck", async({page})=>{
    await page.goto("https://testautomationpractice.blogspot.com/")
    await page.locator("#male").check();
    await page.locator("#sunday").check()
    await page.locator("#saturday").check()
    await page.waitForTimeout(3000);
    await page.locator("#sunday").uncheck()
    await page.locator("#saturday").uncheck()
    await page.waitForTimeout(3000);
})

test.only("isChecked", async({page})=>{
    await page.goto("https://testautomationpractice.blogspot.com/")
    let checkBox = page.locator("#male");
    console.log(`Is Checkbox checked:${await checkBox.isChecked()}`);//false
    await checkBox.check();
    console.log(`Is Checkbox checked:${await checkBox.isChecked()}`);//true

})

test.only("waitFor", async({page})=>{
    await page.goto("https://www.saucedemo.com/ ");
    await page.locator("#user-name").fill("standard_user");
    await page.locator("//input[@name = 'password']").fill("secret_sauce");
    await page.locator(".submit-button").click();
    let img = page.locator("[alt = 'Sauce Labs Backpack']");
    console.log(await img.isVisible());
    await page.locator("[alt = 'Sauce Labs Backpack']").waitFor({state:'visible',timeout:1000});
    console.log(await img.isVisible());
    await page.waitForTimeout(3000);
})
```
    
### Testcase
1. select all checkboxes.
2. deselect tuesday and wednesday

``` typescript
test.only("checkboxes", async ({ page }) => {
    await page.goto("https://testautomationpractice.blogspot.com/");

    let checkBoxes: Locator[] = await page.locator("//input[@class='form-check-input' and @type='checkbox']").all();

    for (let checkBox of checkBoxes) {
        await checkBox.check();
    }
    for (let checkBox of checkBoxes) {
        let id = await checkBox.getAttribute("id");

        if (id === "tuesday" || id === "wednesday") {
            await checkBox.uncheck();
        }
    }
})
```

## Assertions
- To verify actual result matches with the expected result.
- We can perform validation using if-else+operators ,but it doesnt have the capability to fail a test case.
- argument: page/locator/value/{custom message}
- when we are asseerting on page or locator,we need to use await.
- await expect(page/locator/value/custom message).assertionmethod().

### Differrent Types of Assertions
1. Auto retrying assertion
- Automatically it will check a condition again and again ,until it becomes true/passed/timeout is matched.
- It is having autowaiting mechanism for 5sec.
- We can increase or decrease the timeout.
```typescript
await expect(page.locator("#email")).toBeVisible();
await expect(page.locator("#email")).toHaveValue("test@gmail.com");
await expect(page.locator("#login")).toBeEnabled();
```

2. Non retrying assertion

3. Negating assertion
4. Soft assertion

#### Retrying Assertion methods

| Method                          | One-sentence use                                                              |
| ------------------------------- | ----------------------------------------------------------------------------- |
| `toBeVisible()`                 | Verifies that an element is visible on the page.                              |
| `toBeHidden()`                  | Verifies that an element is hidden or detached from the DOM.                  |
| `toBeAttached()`                | Verifies that an element is attached to the DOM.                              |
| `toBeEnabled()`                 | Verifies that an element is enabled.                                          |
| `toBeDisabled()`                | Verifies that an element is disabled.                                         |
| `toBeEditable()`                | Verifies that an element is editable.                                         |
| `toBeFocused()`                 | Verifies that an element has keyboard focus.                                  |
| `toBeChecked()`                 | Verifies that a checkbox or radio button is checked.                          |
| `toBeInViewport()`              | Verifies that an element is within the viewport.                              |
| `toHaveText()`                  | Verifies that an element contains the expected text.                          |
| `toContainText()`               | Verifies that an element contains a particular text.                          |
| `toHaveValue()`                 | Verifies that an input field has the expected value.                          |
| `toHaveValues()`                | Verifies that a multi-select element has the expected selected values.        |
| `toHaveAttribute()`             | Verifies that an element has the expected attribute and value.                |
| `toHaveClass()`                 | Verifies that an element has the expected CSS class.                          |
| `toHaveCSS()`                   | Verifies that an element has the expected CSS property value.                 |
| `toHaveCount()`                 | Verifies that the locator matches the expected number of elements.            |
| `toHaveId()`                    | Verifies that an element has the expected ID.                                 |
| `toHaveJSProperty()`            | Verifies that an element has the expected JavaScript property value.          |
| `toHaveRole()`                  | Verifies that an element has the expected ARIA role.                          |
| `toHaveAccessibleName()`        | Verifies that an element has the expected accessible name.                    |
| `toHaveAccessibleDescription()` | Verifies that an element has the expected accessible description.             |
| `toHaveScreenshot()`            | Verifies that the page or element screenshot matches the expected screenshot. |

```typescript
import {expect, Locator, test} from "@playwright/test"

test("withoutAssertion1",async({page})=>{
    await page.goto("https://demowebshop.tricentis.com");
    let actualUrl:string = page.url();
    let expectedUrl:string= "https://demowebshop.tricentis.com";
    console.log(actualUrl);
    console.log(expectedUrl);
    if(actualUrl==expectedUrl){
        console.log("passed");// both console and report prints passed
    }else{
        console.log("fail");
    }
})

test("withoutAssertion2",async({page})=>{
    await page.goto("https://www.saucedemo.com/");
    let actualUrl:string = page.url();
    let expectedUrl:string= "https://demowebshop.tricentis.com";
    if(actualUrl==expectedUrl){
        console.log("passed");// console show failed but report shows passed.because if else doesnt have the capability to fail a test case.
    }else{
        console.log("fail");
    }
})

test("withAutoRetryAssertion",async({page})=>{
    await page.goto("https://www.saucedemo.com/");
    let actualUrl:string = page.url();
    let expectedUrl:string= "https://demowebshop.tricentis.com";
    await expect(page).toHaveURL(expectedUrl);// Fails both tescase  and report shows fail.
})

test("toHaveTitle",async({page})=>{
    await page.goto("https://www.saucedemo.com/");
    await expect(page).toHaveTitle("Swag Labs");// Pass  tescase  and report shows pass.
})

test("toBeVisible",async({page})=>{
    await page.goto("https://www.saucedemo.com/");
    let logo:Locator = page.locator("//div[@class='login_logo']");
    await expect(logo).toBeVisible();// Pass  tescase  and report shows pass.
})

test("toHaveValue",async({page})=>{
    await page.goto("https://www.saucedemo.com/");
    let textField:Locator = page.locator("//input[@id='user-name']");
    textField.fill("Jithin")
    await expect(textField).toHaveValue("Jithin");// Pass  tescase  and report shows pass.
})

test("toHaveText",async({page})=>{
    await page.goto("https://demowebshop.tricentis.com");
    let productTitle:Locator = page.locator("//a[.='$25 Virtual Gift Card']");
    await expect(productTitle).toHaveText("$25 Virtual Gift Card");// Pass  tescase  and report shows pass.
})

test("toContainText",async({page})=>{
     await page.goto("https://demowebshop.tricentis.com");
    let productTitle:Locator = page.locator("//a[.='$25 Virtual Gift Card']");
    await expect(productTitle).toContainText("Virtual Gift");// Pass  tescase  and report shows pass.
})

test.only("toHaveScreenShot",async({page})=>{
    // Playwright captures a fresh screenshot.
    // Compares it against homepage.png.
    // If the screenshots match within the configured tolerance, the test passes.
    // If there is a significant difference, the test fails.
    await page.goto("https://demowebshop.tricentis.com");
    await expect(page).toHaveScreenshot("homepage.png");// Pass  tescase  and report shows pass.
})
```
2. Non Retrying Assertion
- In Playwright, non-retrying assertions are assertions that execute once immediately and do not wait for the expected condition to become true.
- They are useful for checking values that are already available, rather than waiting for UI changes.
- This type of assertion checks the condition only once.
- If the condition is true,test case is passed else its failed.
- It doesnt have autowait mechanism or default time.
- Auto retrying assertions are used on page and locator,while non retrying are used to verift values.






