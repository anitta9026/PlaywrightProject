const {test, expect}=require('@playwright/test')

test('@web client app login using special locators', async({page}) =>
{
    await page.goto("https://www.saucedemo.com");
    console.log(await page.title());
    await test.expect(page).toHaveTitle("Swag Labs");

    await page.getByPlaceholder("Username").fill("standard_user");
    await page.getByPlaceholder("Password").fill("secret_sauce");
    await page.getByRole('button', { name: 'Login' }).click();
    //await page.pause();
    //filtering
    const cardTitles=page.locator('.inventory_item');
    await cardTitles.filter({ hasText: 'Sauce Labs Backpack' }).getByRole("button", { name: 'Add to cart' }).click();

    /*await page.waitForLoadState("networkidle");
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
        await products.nth(i).getByText("Add to cart").click();
        break;
    }
}*/

await page.locator("//a[@class='shopping_cart_link']").click();
await page.locator("//div[@class='inventory_item_name']").waitFor();
const bool=await page.locator("//div[@class='inventory_item_name']").isVisible();
console.log(bool);
expect(bool).toBeTruthy();
await page.getByRole('button', { name: 'Checkout' }).click();
await page.getByPlaceholder('First Name').fill("Devika");
await page.getByPlaceholder('Last Name').fill("Rajeev");
await page.getByPlaceholder('Zip/Postal Code').fill("600096");
await page.getByRole('button', { name: 'Continue' }).click();
//for waiting for an element
await page.locator(".summary_info").waitFor();
const itemTotal=await page.locator(".summary_subtotal_label").textContent();
console.log(itemTotal); 
expect(itemTotal).toContain("Item total: $29.99");
await page.getByRole('button', { name: 'Finish' }).click();
expect(page.locator(".complete-header")).toHaveText("Thank you for your order!");
await page.pause();
});

//npx playwright test --ui  ---for running all the folders created 