class UserDetail
 {
    constructor(page) {
        this.page = page;
        this.firstName = page.locator("#first-name");
        this.lastName = page.locator("#last-name");
        this.postalCode = page.locator("#postal-code");
        this.continueButton = page.locator("#continue");
    }
    async enterUserDetails(firstName, lastName, postalCode) {
        await this.firstName.fill(firstName);
        await this.lastName.fill(lastName);
        await this.postalCode.fill(postalCode);
    }
    async clickContinue() {
        await this.continueButton.click();
    }
}

module.exports = UserDetail;
