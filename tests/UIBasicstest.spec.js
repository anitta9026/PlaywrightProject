const {test, expect}=require('@playwright/test')
//older meathod
test('first playright test',async function ({browser}) 
{

});
//this is same as 
//newer meathod
//browser context
test.describe.configure({mode:'parallel'});
//test.describe.configure({mode:'serial'}); if one is not executed further files will not execute

test('Browser context playwright test',async({browser})=>
{
    const context = await browser.newContext();
    const page = await context.newPage();
    const username=page.locator('#user-name');
    const password=page.locator('#password');
    const login=page.locator('#login-button');
    const cardtitles=page.locator('.inventory_item_name');


    await page.goto("https://www.saucedemo.com");
    console.log(await page.title());
    await test.expect(page).toHaveTitle("Swag Labs");
    await page.locator("#user-name").fill("standarduser");
    await page.locator("#password").fill("secret_sauce");
    await page.locator("#login-button").click();
    //await page.pause();
    console.log(await page.locator("h3[data-test='error']").textContent());
    await test.expect(page.locator("h3[data-test='error']")).toContainText("Epic sadface");
    await username.fill("");
    await username.fill("standard_user");
    //await password.type("secret_sauce");
    await login.click();
    console.log(await cardtitles.first().textContent());
    console.log(await cardtitles.nth(1).textContent());
    const alltitles=await cardtitles.allTextContents();
    console.log(alltitles);
    //await page.pause();
}
);
//page context
test('@web page context playwright test', async ({page})=>{
    await page.goto("https://google.com");
    console.log(await page.title());
    await test.expect(page).toHaveTitle("Google");
});
test('UI controls',async({page})=>{
    await page.goto('https://selenium.qabible.in/index.php');
    await page.locator("//a[normalize-space()='Input Form']").click();
    await page.locator("//a[normalize-space()='Select Input']").click();
    await page.locator("//select[@id='single-input-field']").selectOption("Yellow");
    await page.locator("//a[normalize-space()='Radio Buttons Demo']").click();
    await page.locator("//label[@for='inlineRadio2']").check();
    await page.locator("//label[@for='inlineRadio24']").click();
    await expect(page.locator("//label[@for='inlineRadio24']")).toBeChecked();//assertion
    //await page.locator("//label[@for='inlineRadio24']").uncheck();
    //expect (await page.locator("//label[@for='inlineRadio24']").isChecked()).toBeFalsy();
    
    await page.locator("//a[normalize-space()='Checkbox Demo']").click();
    await page.locator("//label[@for='gridCheck']").check();
    await expect(page.locator("//label[@for='gridCheck']")).toBeChecked();
    //uncheck is for check box not for radio buttons
    await page.locator("//label[@for='gridCheck']").uncheck();
    expect (await page.locator("//label[@for='gridCheck']").isChecked()).toBeFalsy();
    await page.locator("//label[@for='check-box-two']").check();
    //await page.pause();

});
test('Handling childwindow and tabs', async ({browser})=>{
    const context=await browser.newContext();
    const page=await context.newPage();
    await page.goto("https://selenium.qabible.in/index.php");
    const link=page.locator("https://selenium.qabible.in/index.php");
    const [newPage]=await Promise.all([
        context.waitForEvent("page"),
        page.evaluate(()=>window.open("https://google.com","_blank"))
    ]);
    const newTab=await context.newPage();
    await newTab.goto("https://selenium.qabible.in/index.php");
    console.log(await newTab.title());
    //await test.expect(newTab).toHaveTitle("Google");
    //console.log(await newTab.title());
    await newTab.locator("//a[normalize-space()='Input Form']").click();
    await newTab.locator("//a[normalize-space()='Select Input']").click();
    await newTab.locator("//select[@id='single-input-field']").selectOption("Yellow");
    //await newPage.pause();

})
test('Playwright special locators', async({page}) => {
    await page.goto("https://selenium.qabible.in/index.php");
    await page.getByRole('link', { name: 'INPUT FORM' }).click();
    await page.getByRole('link', { name: 'Checkbox Demo' }).click();
    await page.getByLabel("Click on this check box").check();
    await page.getByLabel("Check Box Three").check();
    await page.getByLabel("Check Box Two").check();

    await page.getByRole('link', { name: 'Radio Buttons Demo' }).click();
    await page.getByLabel("45 to 60").check();
    await expect(page.getByLabel("45 to 60")).toBeChecked();

    await page.getByRole('link', { name: 'Select Input' }).click();
    await page.getByLabel("Select Color").selectOption("Yellow");

    await page.locator("//a[normalize-space()='Form Submit']").click();
    await page.getByLabel("First name").fill("Devika");
    await page.getByLabel("Last name").fill("Rajeev");
    await page.getByPlaceholder("Username").fill("devika123");
    await page.getByPlaceholder("City").fill("Haripad");
    await page.getByPlaceholder("State").fill("Kerala");
    await page.getByPlaceholder("Zip").fill("600096");
    await page.getByLabel("Agree to terms and conditions").check();
    await page.getByRole('button', { name: 'Submit form' }).click();

    await page.getByRole('link', { name:'Simple Form Demo'}).click();
    await page.getByPlaceholder("Message").fill("Hello");
    await page.getByRole('button', { name: 'Show Message' }).click();
    await expect(page.getByText("Your Message : Hello")).toBeVisible();
    //await page.pause();
});
