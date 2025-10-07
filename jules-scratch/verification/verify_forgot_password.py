from playwright.sync_api import sync_playwright, expect

def run_verification(playwright):
    browser = playwright.chromium.launch(headless=True)
    context = browser.new_context()
    page = context.new_page()

    try:
        # Navigate to the forgot password page directly, now on port 3001
        page.goto("http://localhost:3001/forgot-password")

        # Verify the page loaded correctly
        expect(page.get_by_role("heading", name="فراموشی رمز عبور")).to_be_visible()

        # Fill the form
        page.get_by_label("ایمیل یا شماره تلفن").fill("test@example.com")

        # Click the submit button
        page.get_by_role("button", name="ارسال لینک بازیابی").click()

        # Wait for the success message to appear
        success_message_selector = "text=ایمیل خود را چک کنید. لینک بازیابی برای شما ارسال شد."
        success_message = page.wait_for_selector(success_message_selector, timeout=5000)
        expect(success_message).to_be_visible()

        # Take a screenshot
        page.screenshot(path="jules-scratch/verification/forgot-password-success.png")
        print("Screenshot for forgot password page saved successfully.")

    except Exception as e:
        print(f"An error occurred during verification: {e}")
        page.screenshot(path="jules-scratch/verification/forgot-password-error.png")
        raise

    finally:
        browser.close()

with sync_playwright() as playwright:
    run_verification(playwright)