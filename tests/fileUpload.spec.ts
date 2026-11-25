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
    await page.locator("#singleFileInput").setInputFiles("D:/PlaywrightCourse/uploadResource/Assertion.txt")
    await page.locator("//button[text()='Upload Single File']").click()
    await expect(page.locator("#singleFileStatus")).toContainText("Assertion.txt")

    //multiple file
    // await page.locator("#multipleFilesInput").setInputFiles(["D:/PlaywrightCourse/uploadResource/Assertion.txt",
    //     "D:/PlaywrightCourse/uploadResource/Commands.txt"])
    // await page.locator("//button[text()='Upload Multiple Files']").click()
    // await expect(page.locator("#multipleFilesStatus")).toHaveText(/Assertion\.txt[\s\S]*Commands\.txt/)

})