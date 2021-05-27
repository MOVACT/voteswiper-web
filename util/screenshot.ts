import chrome from 'chrome-aws-lambda';
import puppeteer from 'puppeteer-core';

/**
 * Code based on virtual-event-starter-kit
 * https://github.com/vercel/virtual-event-starter-kit
 *
 * License of the original code: Apache License 2.0
 * https://github.com/vercel/virtual-event-starter-kit/blob/main/LICENSE
 */
export default async function screenshot(
  url: string,
  dimensions: { width: number; height: number }
): Promise<string | void | Buffer> {
  const options = process.env.AWS_REGION
    ? {
        args: chrome.args,
        executablePath: await chrome.executablePath,
        headless: chrome.headless,
      }
    : {
        args: [],
        executablePath:
          process.platform === 'win32'
            ? 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe'
            : process.platform === 'linux'
            ? '/usr/bin/google-chrome'
            : '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
      };
  const browser = await puppeteer.launch(options);
  const page = await browser.newPage();
  await page.setViewport({
    width: dimensions.width,
    height: dimensions.height,
  });
  await page.goto(url, { waitUntil: 'networkidle0' });
  return await page.screenshot({ type: 'png' });
}
