from playwright.sync_api import sync_playwright, expect

def run_verification():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        try:
            # Navigate to the login page
            page.goto("http://localhost:3000/", timeout=30000)

            # Wait for the main heading of the login form to be visible
            # This ensures the page is rendered with styles before taking the screenshot
            login_heading = page.get_by_role("heading", name="خوش آمدید")
            expect(login_heading).to_be_visible(timeout=20000)

            # Also wait for the login button to be visible
            login_button = page.get_by_role("button", name="ورود", exact=True)
            expect(login_button).to_be_visible()

            # Take a screenshot to verify the initial render
            page.screenshot(path="jules-scratch/verification/verification.png")

            print("Screenshot taken successfully.")

        except Exception as e:
            print(f"An error occurred: {e}")
            # In case of an error, take a screenshot for debugging
            page.screenshot(path="jules-scratch/verification/error.png")

        finally:
            browser.close()

if __name__ == "__main__":
    run_verification()