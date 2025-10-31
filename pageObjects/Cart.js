class Cart {
    constructor(page) {
        this.page = page;
        this.cartItems = page.locator("//div[@class='inventory_item_name']");
        this.checkoutButton = page.locator("//button[@id='checkout']");
    }

    async verifyItemInCart(itemName) {
        await this.cartItems.first().waitFor();
        const bool = await this.cartItems.isVisible();
        console.log(bool);
    }
    async  proceedToCheckout() {
        await this.checkoutButton.click();
    }
}

module.exports = Cart;
