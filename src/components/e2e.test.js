import puppeteer from "puppeteer";

describe("E2E tests", () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch();
    page = await browser.newPage();
  }, 60000);

  it("contains the welcome text", async () => {
    await page.goto("http://localhost:3000");
    await page.waitForSelector(".header-title");
    const text = await page.$eval(".header-title", (e) => e.textContent);
    expect(text).toContain("To-Do List");
  });

  it("navigates to the about page", async () => {
    await page.goto("http://localhost:3000");
    await page.click("button.header-task-table_button");
    await page.waitForSelector(".title");
    const text = await page.$eval(".title", (e) => e.textContent);
    expect(text).toContain("Tasks Table");
  });

  afterAll(() => browser.close());
});
