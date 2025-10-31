const {test, expect}=require('@playwright/test')

test('@web client app login', async({page}) =>
{
    await page.goto("https://www.saucedemo.com");
    console.log(await page.title());
    await test.expect(page).toHaveTitle("Swag Labs");

    await page.locator("#user-name").fill("standard_user");
    await page.locator("#password").fill("secret_sauce");
    await page.locator("#login-button").click();
    await page.pause();
    const cardTitles=page.locator('.inventory_item_name');
    await page.waitForLoadState("networkidle");
    await cardTitles.first().waitFor();
    const allTitles=await cardTitles.allTextContents();
    console.log(allTitles);


const products=page.locator(".inventory_item_description");
const productName="Sauce Labs Backpack";
const count=await products.count();
console.log(count);
for(let i=0;i<count;i++)
{
    if(await products.nth(i).locator('.inventory_item_name').textContent()===productName)
    {
        await products.nth(i).locator("text=Add to cart").click();
        break;
    }
}
await page.locator("//a[@class='shopping_cart_link']").click();
await page.locator("//div[@class='inventory_item_name']").waitFor();
const bool=await page.locator("//div[@class='inventory_item_name']").isVisible();
console.log(bool);
expect(bool).toBeTruthy();
await page.locator("//button[@id='checkout']").click();
await page.locator("//input[@id='first-name']").fill("Devika");
await page.locator("//input[@id='last-name']").fill("Rajeev");
await page.locator("//input[@id='postal-code']").fill("600096");
await page.locator("//input[@id='continue']").click();
//for waiting for an element
await page.locator(".summary_info").waitFor();
const itemTotal=await page.locator(".summary_subtotal_label").textContent();
console.log(itemTotal); 
expect(itemTotal).toContain("Item total: $29.99");
await page.locator("//button[@id='finish']").click();
expect(page.locator(".complete-header")).toHaveText("Thank you for your order!");
await page.pause();
});