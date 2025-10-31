const {test, expect}=require('@playwright/test')
test('page movement',async({page})=>{
    await page.goto("https://www.saucedemo.com");
    await page.goto("https://google.com");
    await page.goBack();
    await page.goForward();
    await page.reload();
    await page.pause();
});
//execution in debug mode
//npx playwright test Morevalidations.spec.js --debug
test('popup validation',async({page})=>{
    await page.goto("https://www.saucedemo.com");
    await expect(page.locator("h3[data-test='error']")).toBeHidden();
    await page.locator("#login-button").click();
    await expect(page.locator("h3[data-test='error']")).toBeVisible();
    await page.pause();
    await page.goto("https://selenium.qabible.in/index.php");
    const documentLink=page.locator("#alert-modal");
    await documentLink.click();
    const modal=page.locator("a[href='javascript-alert.php']");
    await modal.click();
    await page.locator(".btn.btn-warning").click();
    page.on('dialog', dialog => dialog.accept());
    await page.locator(".btn.btn-warning").click();
    page.on('dialog', dialog => dialog.dismiss());
    await page.pause();
    //hover meathod
    await page.locator("#others").hover();
    await page.pause();
    await page.goto("https://demoqa.com/frames");
    const framepage=page.frameLocator("#frame1");
    console.log(await framepage.locator("#sampleHeading").textContent());
    await page.pause();

});
test('Screenshot',async({page})=>{

    await page.goto("https://www.saucedemo.com");
    await expect(page.locator("h3[data-test='error']")).toBeHidden();
    await page.locator("#login-button").click();
    await page.locator("h3[data-test='error']").screenshot({path:'error.png'});
    await expect(page.locator("h3[data-test='error']")).toBeVisible();
    await page.screenshot({path:'homepage.png',fullPage:true});
    await page.pause();



});
//visual comparision
//npx playwright codegen www.google.com

test.only('visual comparision',async({page})=>{
    await page.goto("https://www.saucedemo.com");
    expect (await page.screenshot()).toMatchSnapshot('saucedemo.png');
    
    //compare the current screenshot with the exisiting one
    await page.pause();
});

