class Login {
    constructor(page) {
        this.page = page;
        this.username = page.locator('input#user-name');
        this.password = page.locator('input#password');
        this.login = page.locator('input#login-button');

    }
    async goto() {
        await this.page.goto("https://www.saucedemo.com");

    }
    async validLogin(username, password) {
        await this.username.fill(username);
        await this.password.fill(password);
        await this.login.click();
}
}
module.exports = Login ;
