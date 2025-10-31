const base = require('@playwright/test');
exports.customTest =  base.test.extend({
    testDataForOrder:{
        username: 'standard_user',
        password: 'secret_sauce',
        productName: 'Sauce Labs Backpack',
    }      
});