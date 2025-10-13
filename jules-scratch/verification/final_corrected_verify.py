from playwright.sync_api import sync_playwright, expect

def run_verification(playwright):
    browser = playwright.chromium.launch(headless=True)
    context = browser.new_context()
    page = context.new_page()

    try:
        # Step 1: Bypass authentication
        page.goto("http://localhost:3000/login")
        page.evaluate("() => { localStorage.setItem('access_token', 'dummy_token'); }")

        # Step 2: Navigate to dashboard and start signup
        page.goto("http://localhost:3000/dashboard")
        expect(page.get_by_role("heading", name="بررسی شماره موبایل")).to_be_visible()
        page.screenshot(path="jules-scratch/verification/01_phone_check.png")

        phone_input = page.locator("#phone_number")
        phone_input.fill("09112233445") # New number
        page.get_by_role("button", name="بررسی").click()

        # Step 3: Fill signup form
        expect(page.get_by_role("heading", name="ثبت‌نام مشتری جدید")).to_be_visible(timeout=10000)
        page.locator("#signup_full_name").fill("کاربر اصلاح شده")
        page.locator("#signup_birth_date").fill("1366/06/06")
        page.locator("#signup_first_purchase_amount").fill("110000")
        page.screenshot(path="jules-scratch/verification/02_signup_form.png")
        page.get_by_role("button", name="ثبت‌نام").click()

        # Step 4: Check success message and redirection to phone-check
        success_msg = page.locator("#signup-message")
        expect(success_msg).to_have_class("message success")
        expect(success_msg).to_contain_text("خرید با موفقیت ثبت شد")
        page.screenshot(path="jules-scratch/verification/03_signup_success.png")

        # Expect to be returned to the phone check section
        expect(page.get_by_role("heading", name="بررسی شماره موبایل")).to_be_visible(timeout=5000)
        expect(page.locator("#phone_number")).to_have_value("") # Field should be reset
        page.screenshot(path="jules-scratch/verification/04_back_to_phone_check.png")

        # Step 5: Verify the new user and their purchase page, including the delete button
        phone_input.fill("09112233445")
        page.get_by_role("button", name="بررسی").click()

        expect(page.get_by_role("heading", name="ثبت خرید")).to_be_visible(timeout=10000)
        expect(page.get_by_text("مشتری: کاربر اصلاح شده")).to_be_visible()
        delete_button = page.get_by_role("button", name="حذف مشتری")
        expect(delete_button).to_be_visible()
        page.screenshot(path="jules-scratch/verification/05_purchase_page_with_delete.png")

        # Step 6: Test the delete button's functionality (goes back to phone check)
        delete_button.click()
        expect(page.get_by_role("heading", name="بررسی شماره موبایل")).to_be_visible(timeout=5000)
        page.screenshot(path="jules-scratch/verification/06_after_delete_click.png")

    except Exception as e:
        print(f"An error occurred: {e}")
        page.screenshot(path="jules-scratch/verification/error.png")

    finally:
        browser.close()

with sync_playwright() as p:
    run_verification(p)