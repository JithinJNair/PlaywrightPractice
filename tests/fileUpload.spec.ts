import {expect, test} from "@playwright/test";
import path from "path"

test("fileUpload", async ({ page }) => {
    await page.goto("https://testautomationpractice.blogspot.com/")
    //from local system 
    // single file
    await page.locator("#singleFileInput").setInputFiles("D:/PlaywrightCourse/uploadResource/Assertion.txt")
    await page.locator("//button[text()='Upload Single File']").click()
    await expect(page.locator("#singleFileStatus")).toContainText("Assertion.txt")

    //multiple file
    await page.locator("#multipleFilesInput").setInputFiles(["D:/PlaywrightCourse/uploadResource/Assertion.txt",
        "D:/PlaywrightCourse/uploadResource/Commands.txt"])
    await page.locator("//button[text()='Upload Multiple Files']").click()
    await expect(page.locator("#multipleFilesStatus")).toHaveText(/Assertion\.txt[\s\S]*Commands\.txt/)

    //from project
    //single
    await page.locator("#singleFileInput").setInputFiles([path.join(__dirname, "../uploadResource/Assertion.txt")])
    await page.locator("//button[text()='Upload Single File']").click()
    await expect(page.locator("#singleFileStatus")).toContainText("Assertion.txt")

    // //multiple file
    await page.locator("#multipleFilesInput").setInputFiles([path.join(__dirname, "../uploadResource/Assertion.txt"),
        path.join(__dirname, "../uploadResource/Commands.txt"),])
    await page.locator("//button[text()='Upload Multiple Files']").click()
    await expect(page.locator("#multipleFilesStatus")).toHaveText(/Assertion\.txt[\s\S]*Commands\.txt/)

    // //remove
    await page.locator("#multipleFilesInput").setInputFiles([])
    await page.locator("//button[text()='Upload Multiple Files']").click()
    await expect(page.locator("#multipleFilesStatus")).toHaveText("No files selected.")
})

test("fileUpload2", async ({ page }) => {
    await page.goto("https://qaplayground.com/practice/file-upload")
    //from local system 
    // single file
    await page.locator("//input[@data-testid='fu-drop-input']").setInputFiles("D:/PlaywrightCourse/uploadResource/Assertion.txt")
    await page.locator("//input[@data-testid='fu-drop-input']").click()
    await expect(page.locator("#result-s04")).toContainText('Selected via input: "Assertion.txt"');

})

test.only("fileUpload3", async ({ page }) => {
    await page.goto("https://www.foundit.in/upload")
    //from local system 
    // single file
    await page.locator("//div[contains(text(),'Upload Resume')]").click()
    await expect(page.locator("#file-upload")).toBeVisible();
    await page.locator("#file-upload").setInputFiles("D:/PlaywrightCourse/uploadResource/Assertion.txt")
    await page.locator("#file-upload").click()
    await expect(page.locator("//p[@data-default-text='Drag & Drop file here']")).toContainText("Assertion.txt");

})

