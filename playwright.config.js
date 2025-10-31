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
  timeout:40*1000,
  expect:{
    timeout:40*1000
  },

  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    
    browserName:'chromium',
    headless:false,
    screenshot:'on',
    trace:'on',
  },

  

});
module.exports=config;
