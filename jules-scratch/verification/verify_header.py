from playwright.sync_api import sync_playwright, Page, expect

def verify_dashboard_header(page: Page):
    """
    This script verifies that the new PrimeVue header on the dashboard page is rendered correctly.
    """
    # 1. Navigate to the dashboard page.
    page.goto("http://localhost:3000/dashboard")

    # 2. Assert: Check if the Menubar component is visible.
    menubar = page.locator(".p-menubar.brand-header-bar")
    expect(menubar).to_be_visible(timeout=10000) # Increased timeout for initial load

    # 3. Assert: Check for the brand logo and title in the #start slot.
    brand_title = menubar.get_by_text("Rewardify")
    expect(brand_title).to_be_visible()

    # 4. Assert: Check for the Avatar in the #end slot using a more robust selector.
    avatar = menubar.locator(".p-avatar")
    expect(avatar).to_be_visible()

    # 5. Take a screenshot of just the header for focused verification.
    menubar.screenshot(path="jules-scratch/verification/verification.png")

def main():
    """
    Main function to run the Playwright verification script.
    """
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            verify_dashboard_header(page)
            print("Verification script ran successfully.")
        except Exception as e:
            print(f"An error occurred during verification: {e}")
            page.screenshot(path="jules-scratch/verification/error_screenshot.png")
        finally:
            browser.close()

if __name__ == "__main__":
    main()