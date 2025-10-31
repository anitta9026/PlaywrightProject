// @ts-check
import { defineConfig, devices, expect } from '@playwright/test';
import { trace } from 'console';
import { TIMEOUT } from 'dns';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * @see https://playwright.dev/docs/test-configuration
 */
  const config=({
  testDir: './tests',
  retries: 1,
  workers: 2, //-- runs tests in parallel
  timeout:40*1000,
  expect:{
    timeout:40*1000
  },

  reporter: 'html',
  
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  projects:[
    {name:'safari',
  use: {
    browserName:'webkit',
    headless:true,
    screenshot:'on',
    trace:'on',
  }
},
    {name:'chrome',
      use: {
        //viewport:{width:720,height:720},
        ...devices['iPhone 13'],
        ignoreHTTPSErrors:true,
        permissions:['geolocation'],
    browserName:'chromium',
    headless:false,
    screenshot:'on',
    trace:'on',
    video:'on'
  },
},
]

});
module.exports=config;
