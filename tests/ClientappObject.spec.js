const {test, expect}=require('@playwright/test');
const Login = require('../pageObjects/Login');
const Dashboard = require('../pageObjects/Dashboard');
const Cart = require('../pageObjects/Cart');
const Summary = require('../pageObjects/Summary');
const UserDetail = require('../pageObjects/UserDetail');
const placeOrderData= JSON.parse(JSON.stringify(require('../Utils/PlaceOderTestData.json')));
const {customTest}=require('../Utils/Test-Base');
//npx playwright test --grep @web --reporter=line,allure-playwright
test('@API page playwright using object model', async({page}) =>{
    /*const username=placeOrderData.username;
    const password=placeOrderData.password;
    const productName="Sauce Labs Backpack";*/
    const login = new Login (page);
    await login.goto();
    await login.validLogin(placeOrderData.username, placeOrderData.password);
    

    const dashboard = new Dashboard(page);
    await dashboard.selectProduct(placeOrderData.productName);
    await dashboard.goToCart();

    const cart= new Cart(page);
    await cart.verifyItemInCart();
    await cart.proceedToCheckout();
    

    const userDetails = new UserDetail(page);
    await userDetails.enterUserDetails("Devika", "Rajeev", "600096");
    await userDetails.clickContinue();

    const summary = new Summary(page);
    await summary.getSummary();
    await summary.finishOrder();



expect(page.locator(".complete-header")).toHaveText("Thank you for your order!");
await page.pause();
});
//fixtures-testdata as fixture

customTest('page playwright using object model with test data from Test-Base', async({page, testDataForOrder}) =>{
    const login = new Login (page);
    await login.goto();
    await login.validLogin(testDataForOrder.username, testDataForOrder.password);

    const dashboard = new Dashboard(page);
    await dashboard.selectProduct(placeOrderData.productName);
    await dashboard.goToCart();

    const cart= new Cart(page);
    await cart.verifyItemInCart();
    await cart.proceedToCheckout();
});