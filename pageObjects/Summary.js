class Summary {
    constructor(page) {
        this.page = page;
        this.summary = page.locator(".summary_info");
        this.total = page.locator(".summary_subtotal_label");
        this.finishButton = page.locator("#finish");
    }

    async getSummary() {
        await this.summary.waitFor();
        const totalText = await this.total.textContent();
        console.log(totalText);
    }

    async finishOrder() {
        await this.finishButton.click();
    }
}

module.exports = Summary;
