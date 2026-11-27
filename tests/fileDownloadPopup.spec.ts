import { expect, test } from "@playwright/test"
import path from "path"
import fs from "fs"

test.only("waitforevent", async ({page}) => {
    await page.goto("https://demoapps.qspiders.com/ui/download?sublist=0")
    await page.locator("#writeArea").fill("im downloading a file")
    let [downloadfile] = await Promise.all([
        page.waitForEvent('download'),
        page.locator("#downloadButton").click()
    ])
    console.log(await downloadfile.path())
    console.log(downloadfile.suggestedFilename())

    //store the file in download floder
    // let downloadfolder="D:/PlaywrightCourse/downloadResource"
    // let filename= downloadfile.suggestedFilename()
    // await downloadfile.saveAs(path.join(downloadfolder,filename))

    //local system
    let downloadfolder = "C:/Users/89jit/Downloads"
    let filename = downloadfile.suggestedFilename()
    await downloadfile.saveAs(path.join(downloadfolder, filename))

    //read the data
    let file = path.join(downloadfolder, filename)

    let data = fs.readFileSync(file, 'utf-8')
    expect(data).toContain("im downloading a file")
})