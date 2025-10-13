from playwright.sync_api import sync_playwright, expect
import time

def run_verification(playwright):
    browser = playwright.chromium.launch(headless=True)
    context = browser.new_context()
    page = context.new_page()

    try:
        # Step 1: Navigate to the dashboard and enter a new phone number
        page.goto("http://localhost:3000/dashboard")
        expect(page.get_by_role("heading", name="بررسی شماره موبایل")).to_be_visible()
        page.screenshot(path="jules-scratch/verification/01_phone_check_page.png")

        phone_number_input = page.locator("#phone_number")
        phone_number_input.fill("09111111112")  # A new number to ensure we go to signup
        page.get_by_role("button", name="بررسی").click()

        # Step 2: Verify navigation to the signup page
        expect(page.get_by_role("heading", name="ثبت‌نام مشتری جدید")).to_be_visible(timeout=10000)
        page.screenshot(path="jules-scratch/verification/02_signup_page.png")

        # Step 3: Fill out the signup form
        page.locator("#signup_full_name").fill("کاربر تستی جدید")
        page.locator("#signup_birth_date").fill("1380/02/02")
        page.locator("#signup_first_purchase_amount").fill("75000")

        # Step 4: Verify the success message and redirect
        page.get_by_role("button", name="ثبت‌نام").click()

        signup_success_message = page.locator("#signup-message")
        expect(signup_success_message).to_have_class("message success")
        expect(signup_success_message).to_contain_text("خرید با موفقیت ثبت شد")
        page.screenshot(path="jules-scratch/verification/03_signup_success.png")

        # Step 5: Wait for redirect and verify the URL
        page.wait_for_url("**/verify", timeout=5000)
        expect(page).to_have_url("http://localhost:3000/verify")
        page.screenshot(path="jules-scratch/verification/04_redirect_to_verify.png")

        # Step 6: Go back to dashboard to test the purchase flow for the new user
        page.goto("http://localhost:3000/dashboard")
        phone_number_input = page.locator("#phone_number")
        phone_number_input.fill("09111111112")
        page.get_by_role("button", name="بررسی").click()

        # Step 7: Verify purchase page with new user's data
        expect(page.get_by_role("heading", name="ثبت خرید")).to_be_visible(timeout=10000)
        expect(page.get_by_text("مشتری: کاربر تستی جدید")).to_be_visible()
        expect(page.get_by_role("button", name="حذف مشتری")).to_be_visible()
        page.screenshot(path="jules-scratch/verification/05_purchase_page_new_user.png")

        # Step 8: Verify purchase success message
        page.locator("#purchase_amount").fill("120000")
        page.get_by_role("button", name="ثبت خرید").click()

        purchase_success_message = page.locator("#purchase-message")
        expect(purchase_success_message).to_have_class("message success")
        expect(purchase_success_message).to_contain_text("خرید با موفقیت ثبت شد")
        page.screenshot(path="jules-scratch/verification/06_purchase_success.png")

    except Exception as e:
        print(f"An error occurred: {e}")
        page.screenshot(path="jules-scratch/verification/error.png")

    finally:
        browser.close()

with sync_playwright() as p:
    run_verification(p)