from playwright.sync_api import sync_playwright, expect

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    context = browser.new_context()
    page = context.new_page()

    try:
        page.goto("http://localhost:3000/tariffs", timeout=90000)
        expect(page.get_by_role("heading", name="تعرفه‌های ارسال پیام لویانا")).to_be_visible(timeout=30000)

        # --- Monthly View ---
        monthly_panel = page.locator('[role="tabpanel"][data-p-active="true"]')
        expect(monthly_panel.get_by_text("150000")).to_be_visible(timeout=15000)
        page.screenshot(path="jules-scratch/verification/01-monthly-view-final.png")

        # --- Quarterly View ---
        page.get_by_role("tab", name="سه ماهه").click()
        quarterly_panel = page.locator('[role="tabpanel"][data-p-active="true"]')
        expect(quarterly_panel.get_by_text("435000")).to_be_visible(timeout=15000)
        page.screenshot(path="jules-scratch/verification/02-quarterly-view-final.png")

        # --- Yearly View ---
        page.get_by_role("tab", name="سالیانه").click()
        yearly_panel = page.locator('[role="tabpanel"][data-p-active="true"]')
        expect(yearly_panel.get_by_text("1680000")).to_be_visible(timeout=15000)
        page.screenshot(path="jules-scratch/verification/03-yearly-view-final.png")

    except Exception as e:
        print(f"An error occurred: {e}")
        page.screenshot(path="jules-scratch/verification/error-final.png")

    finally:
        browser.close()

with sync_playwright() as playwright:
    run(playwright)