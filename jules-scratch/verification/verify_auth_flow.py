from playwright.sync_api import sync_playwright, expect
import time

def run_verification(playwright):
    browser = playwright.chromium.launch(headless=True)
    context = browser.new_context()
    page = context.new_page()

    try:
        # 1. Test unauthenticated redirect
        print("Testing unauthenticated redirect...")
        page.goto("http://localhost:3000/dashboard", wait_until="networkidle")
        expect(page).to_have_url("http://localhost:3000/login", timeout=10000)
        page.screenshot(path="jules-scratch/verification/01_redirect_to_login.png")
        print("Screenshot 1: Redirect to login successful.")

        # 2. Attempt a failed login and capture the result
        print("Testing failed login and capturing screenshot...")
        page.get_by_label("نام کاربری یا شماره تلفن").fill("invalid_user")
        page.get_by_label("کلمه عبور").fill("invalid_password")
        page.get_by_role("button", name="ورود", exact=True).click()

        # Wait for a few seconds to allow any async operations (like showing a toast) to complete.
        time.sleep(3)

        page.screenshot(path="jules-scratch/verification/02_final_login_attempt_result.png")
        print("Screenshot 2: Captured final result of login attempt.")

        print("Verification script finished.")

    except Exception as e:
        print(f"An error occurred during verification: {e}")
        page.screenshot(path="jules-scratch/verification/error.png")

    finally:
        browser.close()

with sync_playwright() as playwright:
    run_verification(playwright)