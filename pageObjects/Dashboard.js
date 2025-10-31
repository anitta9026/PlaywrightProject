class Dashboard {
    constructor(page) {
        this.page = page;
        this.products = page.locator(".inventory_item_label");
        this.productText = page.locator(".inventory_item_name");
        this.addToCart = page.locator("//button[@id='add-to-cart-sauce-labs-backpack']");
        this.cart = page.locator("//a[@class='shopping_cart_link']");


}
async selectProduct(productName) {
    await this.products.nth(0).waitFor();
    const title = await this.productText.allTextContents();
    console.log(title);
    const count = await this.products.count();
    console.log(count); 
    for (let i = 0; i < count; i++) {
        if (await this.productText.nth(i).textContent() === productName) {
            await this.addToCart.click();
            break;
        }
}
}
async goToCart() {
    await this.cart.click();    
}
}
module.exports = Dashboard;