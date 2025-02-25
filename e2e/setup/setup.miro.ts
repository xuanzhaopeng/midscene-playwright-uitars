import { test as setup, expect } from '@playwright/test';
import * as path from 'path';

const authFile = path.join(__dirname, '../.auth/miro.json');

setup('authenticate', async ({ page }) => {
  await page.goto('https://miro.com/login');
  await page.getByTestId('mr-form-login-email-1').fill('xuanzhaopeng+uitars@gmail.com');
  await page.getByTestId('mr-form-login-password-1').fill('IlikeUiTars999!!!');
  await page.getByTestId('mr-form-login-btn-signin-1').click();

  await page.waitForURL('https://miro.com/app/dashboard/');
  await page.context().storageState({ path: authFile });
});