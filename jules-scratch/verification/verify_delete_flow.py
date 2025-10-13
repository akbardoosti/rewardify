from playwright.sync_api import sync_playwright, expect
import re

def run_verification(playwright):
    browser = playwright.chromium.launch(headless=True)
    context = browser.new_context()
    page = context.new_page()

    try:
        # Step 1: Bypass authentication
        page.goto("http://localhost:3001/login")
        page.evaluate("() => { localStorage.setItem('access_token', 'dummy_token'); }")

        # Step 2: Navigate to dashboard and start signup for a new customer
        page.goto("http://localhost:3001/dashboard")
        expect(page.get_by_role("heading", name="بررسی شماره موبایل")).to_be_visible()

        phone_input = page.locator("#phone_number")
        # Use a unique phone number for each run to ensure the user is new
        import random
        phone_number = f"09{random.randint(100000000, 999999999)}"
        phone_input.fill(phone_number)
        page.get_by_role("button", name="بررسی").click()

        # Step 3: Go to the purchase page for the newly created customer
        # First, we need to go back to the phone check and re-enter the number
        # This part of the flow is a bit clunky in the app, but we'll follow it.
        page.goto("http://localhost:3001/dashboard")
        phone_input = page.locator("#phone_number")
        phone_input.fill("09112233445") # Use the number from the last script as it should exist now
        page.get_by_role("button", name="بررسی").click()

        # Step 4: Verify purchase page and click the delete button
        expect(page.get_by_role("heading", name="ثبت خرید")).to_be_visible(timeout=10000)
        delete_button = page.get_by_role("button", name="حذف مشتری")
        expect(delete_button).to_be_visible()
        page.screenshot(path="jules-scratch/verification/01_purchase_page_with_delete.png")

        delete_button.click()

        # Step 5: Verify the confirmation dialog and accept it
        expect(page.get_by_role("dialog")).to_be_visible()
        expect(page.get_by_text("آیا از حذف این مشتری اطمینان دارید؟")).to_be_visible()
        page.screenshot(path="jules-scratch/verification/02_confirm_dialog.png")
        page.get_by_role("button", name="حذف کن").click()

        # Step 6: Verify the success toast message
        # The toast appears in the layout, so we look for it anywhere on the page
        toast_message = page.locator(".p-toast-summary")
        expect(toast_message).to_have_text("موفق")
        expect(page.locator(".p-toast-detail")).to_have_text("مشتری با موفقیت حذف شد.")
        page.screenshot(path="jules-scratch/verification/03_delete_success_toast.png")

        # Step 7: Verify that we are back to the phone check section
        expect(page.get_by_role("heading", name="بررسی شماره موبایل")).to_be_visible(timeout=5000)
        page.screenshot(path="jules-scratch/verification/04_back_to_phone_check_after_delete.png")

    except Exception as e:
        print(f"An error occurred: {e}")
        page.screenshot(path="jules-scratch/verification/error.png")

    finally:
        browser.close()

with sync_playwright() as p:
    run_verification(p)