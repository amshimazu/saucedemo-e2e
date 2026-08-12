export default class BasePage {
  page: any;

  constructor(page: any) {
    this.page = page;
  }

  async goto(path: string) {
    await this.page.goto(path);
  }

  async maximize() {
    try {
      const size = await this.page.evaluate(() => ({ width: window.screen.width, height: window.screen.height }));
      await this.page.setViewportSize({ width: size.width, height: size.height });
    } catch (e) {
      await this.page.setViewportSize({ width: 1920, height: 1080 });
    }
  }
}
