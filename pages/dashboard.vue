<template>
  <div>
    <header class="brand-header-bar">
        <div class="brand-header-bar-content">
            <span class="brand-logo">
              <svg width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="48" height="48" rx="14" fill="#6366f1"/>
                <path d="M24 14c-2.5 0-4.5 2-4.5 4.5S21.5 23 24 23s4.5-2 4.5-4.5S26.5 14 24 14zm0 2c1.4 0 2.5 1.1 2.5 2.5S25.4 21 24 21s-2.5-1.1-2.5-2.5S22.6 16 24 16zm-8 7c-1.1 0-2 .9-2 2v7c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2v-7c0-1.1-.9-2-2-2H16zm0 2h16v7H16v-7z"
                      fill="#fff"/>
              </svg>
            </span>
            <span class="brand-title">Rewardify</span>
            <span style="flex:1"></span>
            <span class="brand-tagline">پاداش وفاداری شما با <b>Rewardify</b></span>
        </div>
    </header>
    <div id="birthday-effect" style="display:none;"></div>
    <!-- Phone Check Page -->
    <section id="phone-check-section" v-if="currentSection === 'phone-check'">
        <h2>بررسی شماره موبایل</h2>
        <form id="phone-check-form" @submit.prevent="checkPhoneNumber">
            <label for="phone_number">شماره موبایل:</label>
            <input type="text" id="phone_number" name="phone_number" pattern="^09\d{9}$" required
                   placeholder="مثلاً 09123456789" v-model="phoneNumber"
                   :class="{ invalid: isPhoneNumberInvalid }" @input="isPhoneNumberInvalid = false">
            <button type="submit" id="phone-check-btn" :disabled="isPhoneChecking">
                {{ isPhoneChecking ? 'در حال بررسی...' : 'بررسی' }}
            </button>
        </form>
        <div id="phone-check-message" class="message">{{ phoneCheckMessage }}</div>
    </section>

    <!-- Signup Page -->
    <section id="signup-section" v-if="currentSection === 'signup'">
        <h2>ثبت‌نام مشتری جدید</h2>
        <form id="signup-form" @submit.prevent="signup">
            <label for="signup_full_name">نام و نام خانوادگی:</label>
            <input type="text" id="signup_full_name" name="full_name" required placeholder="مثلاً علی رضایی" v-model="signupFullName"
                   :class="{ invalid: isSignupFullNameInvalid }" @input="isSignupFullNameInvalid = false">

            <label for="signup_phone_number">شماره موبایل:</label>
            <input type="text" id="signup_phone_number" name="phone_number" readonly v-model="signupPhoneNumber">

            <label for="signup_birth_date">تاریخ تولد:</label>
            <date-picker
                v-model="signupBirthDate"
                id="signup_birth_date"
                name="birth_date"
                class="persian-date-input"
                placeholder="مثلاً 1370/01/01"
                required
                :class="{ invalid: isSignupBirthDateInvalid }"
                @input="isSignupBirthDateInvalid = false"
                format="jYYYY/jMM/jDD"
                display-format="jYYYY/jMM/jDD"
                :auto-submit="true"
                :show-gregorian="true"
                :column="1"
                mode="single"
            ></date-picker>
            <div id="birth-date-preview"
                 style="margin-top: 0.5rem; font-size: 0.9rem; color: #388e3c; text-align: center;" v-if="birthDatePreview">
                 {{ birthDatePreview }}
            </div>


            <label for="signup_first_purchase_amount">مبلغ اولین خرید:</label>
            <div class="input-with-unit">
                <input type="number" id="signup_first_purchase_amount" name="first_purchase_amount" min="0" required
                       placeholder="مثلاً 100000" v-model="signupFirstPurchaseAmount"
                       :class="{ invalid: isSignupFirstPurchaseAmountInvalid }" @input="isSignupFirstPurchaseAmountInvalid = false">
                <span class="unit">تومان</span>
            </div>

            <button type="submit" id="signup-btn" :disabled="isSigningUp">
                {{ isSigningUp ? 'در حال ثبت‌نام...' : 'ثبت‌نام' }}
            </button>
        </form>
        <div id="signup-message" class="message">{{ signupMessage }}</div>
    </section>

    <!-- Purchase Page -->
    <section id="purchase-section" v-if="currentSection === 'purchase'">
        <h2>ثبت خرید</h2>
        <form id="purchase-form" @submit.prevent="purchase">
            <div id="customer-name"
                 style="margin-bottom: 1rem; color: #6366f1; font-weight: 600; font-size: 1.08rem;" v-if="customerNameToDisplay">
                مشتری: {{ customerNameToDisplay }}
            </div>
            <label for="purchase_amount">مبلغ خرید:</label>
            <div class="input-with-unit">
                <input type="number" id="purchase_amount" name="amount" min="0" required placeholder="مثلاً 50000" v-model.number="purchaseAmount">
                <span class="unit">تومان</span>
            </div>

            <div id="discount-container" style="display: flex; align-items: center; gap: 0.7rem;">
                <input type="checkbox" id="use_discount" name="use_discount" v-model="useDiscount">
                <label for="use_discount">استفاده از تخفیف (<span id="available_discount">{{ totalDiscount }}</span>)</label>
                <span class="unit">تومان</span>
            </div>
            <div id="birthday-discount-message" v-if="isBirthday" style="color: #ff4081; text-align: center; margin-top: 1rem; font-weight: bold;">
                {{ birthdayDiscountMessage }}
            </div>
            <div id="final-price-container"
                 style="margin-top:0.7rem; color:#388e3c; font-weight:600; font-size:1.08rem;" v-if="purchaseAmount">
                قیمت بعد از اعمال تخفیف: <span id="final-price">{{ finalPrice }}</span> تومان
            </div>

            <button type="submit" id="purchase-btn" :disabled="isPurchasing">
                {{ isPurchasing ? 'در حال ثبت...' : 'ثبت خرید' }}
            </button>
        </form>
        <div id="purchase-message" class="message">{{ purchaseMessage }}</div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import DatePicker from '@alireza-ab/vue3-persian-datepicker';
import moment from 'moment-jalaali';
import api from '~/services/api'; // Import the centralized API service

// State for the current view
const currentSection = ref('phone-check'); // 'phone-check', 'signup', or 'purchase'
const customerId = ref(null); // To store the ID of the customer

// Phone Check section
const phoneNumber = ref('');
const phoneCheckMessage = ref('');
const isPhoneNumberInvalid = ref(false);
const isPhoneChecking = ref(false);

const checkPhoneNumber = async () => {
  isPhoneChecking.value = true;
  phoneCheckMessage.value = '';
  try {
    // Basic validation
    if (!/^09\d{9}$/.test(phoneNumber.value)) {
      phoneCheckMessage.value = 'شماره موبایل وارد شده معتبر نیست.';
      isPhoneNumberInvalid.value = true;
      return;
    }
    isPhoneNumberInvalid.value = false;

    const response = await api.verifyPhone(phoneNumber.value);

    // User found, now get their discount info
    const customer = response.data;
    customerId.value = customer.id;

    // Fetch discount information
    const discountResponse = await api.getCustomerDiscount(customer.id);
    const discountData = discountResponse.data;

    customerNameToDisplay.value = discountData.full_name;
    availableDiscount.value = discountData.available_discount || 0;
    isBirthday.value = discountData.is_birthday || false;
    birthdayDiscount.value = discountData.birthday_discount || 0;

    if (isBirthday.value) {
        birthdayDiscountMessage.value = 'تولدت مبارک! یک تخفیف ویژه برای شما داریم.';
        triggerConfetti();
    } else {
        birthdayDiscountMessage.value = '';
    }

    currentSection.value = 'purchase';
    phoneCheckMessage.value = '';

  } catch (error) {
    if (error.response && (error.response.status === 404 || (error.response.data && error.response.data.detail === "Not Found"))) {
      // New user, go to signup page
      signupPhoneNumber.value = phoneNumber.value;
      currentSection.value = 'signup';
      phoneCheckMessage.value = '';
    } else {
      console.error('Error checking phone number:', error);
      phoneCheckMessage.value = 'خطا در برقراری ارتباط با سرور. لطفاً دوباره تلاش کنید.';
    }
  } finally {
    isPhoneChecking.value = false;
  }
};

// Signup section
const signupFullName = ref('');
const signupPhoneNumber = ref('');
const signupBirthDate = ref('');
const signupFirstPurchaseAmount = ref('');
const signupMessage = ref('');
const birthDatePreview = ref('');
const isSignupFullNameInvalid = ref(false);
const isSignupBirthDateInvalid = ref(false);
const isSignupFirstPurchaseAmountInvalid = ref(false);

watch(signupBirthDate, () => {
    isSignupBirthDateInvalid.value = false;
});

const isSigningUp = ref(false);

const signup = async () => {
  isSigningUp.value = true;
  signupMessage.value = '';
  try {
    // Basic validation
    isSignupFullNameInvalid.value = !signupFullName.value;
    isSignupBirthDateInvalid.value = !signupBirthDate.value;
    isSignupFirstPurchaseAmountInvalid.value = !signupFirstPurchaseAmount.value;

    if (isSignupFullNameInvalid.value || isSignupBirthDateInvalid.value
      || isSignupFirstPurchaseAmountInvalid.value) {
      signupMessage.value = 'لطفاً تمام فیلدها را پر کنید.';
      return;
    }

    const birthDateForAPI = moment(signupBirthDate.value, 'jYYYY/jMM/jDD').format('YYYY-MM-DD');

    const payload = {
      full_name: signupFullName.value,
      phone_number: signupPhoneNumber.value,
      birth_date: birthDateForAPI,
      first_purchase_amount: signupFirstPurchaseAmount.value
    };

    const response = await api.registerCustomer(payload);

    // Handle successful registration
    const newCustomer = response.data;
    customerId.value = newCustomer.id;

    signupMessage.value = 'ثبت‌نام با موفقیت انجام شد!';

    // After signup, move to the purchase section
    customerNameToDisplay.value = newCustomer.full_name;
    purchaseAmount.value = signupFirstPurchaseAmount.value;
    availableDiscount.value = 0;
    currentSection.value = 'purchase';

  } catch (error) {
    console.error('Error during signup:', error);
    if (error.response && error.response.data) {
        const errorMessages = Object.values(error.response.data).flat();
        signupMessage.value = `خطا: ${errorMessages.join(' ')}`;
    } else {
        signupMessage.value = 'خطا در ثبت‌نام. لطفاً دوباره تلاش کنید.';
    }
  } finally {
    isSigningUp.value = false;
  }
};

// Purchase section
const customerNameToDisplay = ref('');
const purchaseAmount = ref(null);
const useDiscount = ref(false);
const availableDiscount = ref(0);
const birthdayDiscount = ref(0);
const purchaseMessage = ref('');

const totalDiscount = computed(() => {
    let total = availableDiscount.value || 0;
    if (isBirthday.value && birthdayDiscount.value) {
        total += birthdayDiscount.value;
    }
    return total;
});

const finalPrice = computed(() => {
  if (useDiscount.value) {
    const price = (purchaseAmount.value || 0) - totalDiscount.value;
    return price > 0 ? price : 0;
  }
  return purchaseAmount.value;
});

const isPurchasing = ref(false);
const isBirthday = ref(false);
const birthdayDiscountMessage = ref('');

const triggerConfetti = () => {
    const birthdayEffectContainer = document.getElementById('birthday-effect');
    if (!birthdayEffectContainer) return;
    birthdayEffectContainer.style.display = 'block';
    const message = document.createElement('div');
    message.className = 'birthday-message';
    message.textContent = 'تولدت مبارک!';
    birthdayEffectContainer.appendChild(message);
    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = `${Math.random() * 100}vw`;
        confetti.style.animationDelay = `${Math.random() * 2}s`;
        confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
        birthdayEffectContainer.appendChild(confetti);
    }
    setTimeout(() => {
        birthdayEffectContainer.innerHTML = '';
        birthdayEffectContainer.style.display = 'none';
    }, 4000);
};

const purchase = async () => {
  isPurchasing.value = true;
  purchaseMessage.value = '';
  try {
    if (!purchaseAmount.value || purchaseAmount.value <= 0) {
      purchaseMessage.value = 'لطفاً مبلغ خرید معتبری را وارد کنید.';
      return;
    }

    const payload = {
      customer_id: customerId.value,
      amount: purchaseAmount.value,
      use_discount: useDiscount.value
    };

    await api.createPurchase(payload);

    purchaseMessage.value = `خرید با موفقیت ثبت شد! مبلغ نهایی: ${finalPrice.value} تومان`;

    setTimeout(() => {
      currentSection.value = 'phone-check';
      phoneNumber.value = '';
      phoneCheckMessage.value = '';
      signupFullName.value = '';
      signupPhoneNumber.value = '';
      signupBirthDate.value = '';
      signupFirstPurchaseAmount.value = '';
      signupMessage.value = '';
      customerNameToDisplay.value = '';
      purchaseAmount.value = null;
      useDiscount.value = false;
      purchaseMessage.value = '';
      birthDatePreview.value = '';
      isBirthday.value = false;
      birthdayDiscountMessage.value = '';
      customerId.value = null;
    }, 2500);
  } catch (error) {
    console.error('Error during purchase:', error);
    if (error.response && error.response.data) {
        const errors = Object.values(error.response.data).flat().join(' ');
        purchaseMessage.value = `خطا در ثبت خرید: ${errors}`;
    } else {
        purchaseMessage.value = 'خطا در ثبت خرید. لطفاً دوباره تلاش کنید.';
    }
  } finally {
    setTimeout(() => { isPurchasing.value = false; }, 2500);
  }
};

</script>

<style>


section {
    background: #ffffff;
    padding: 2.2rem 1.8rem 1.5rem 1.8rem;
    margin: 2.5rem 0;
    border-radius: 28px;
    box-shadow: 0 12px 40px rgba(80, 80, 160, 0.13), 0 2px 8px rgba(80, 80, 160, 0.10);
    min-width: 390px;
    max-width: 480px;
    direction: rtl;
    transition: box-shadow 0.2s;
    border: 1.5px solid #e0e7ff;
    position: relative;
}

section:hover {
    box-shadow: 0 18px 48px rgba(80, 80, 160, 0.17), 0 4px 16px rgba(80, 80, 160, 0.13);
}

h2 {
    margin-top: 0;
    color: #3b3b6d;
    text-align: center;
    font-weight: 700;
    letter-spacing: -0.5px;
    font-size: 1.6rem;
}

form {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
}

label {
    font-weight: 500;
    margin-bottom: 0.2rem;
    color: #444;
    font-size: 1.07rem;
}

input[type="text"],
input[type="number"],
input[type="date"] {
    padding: 0.7rem 0.9rem;
    border: 1.5px solid #bfc7d1;
    border-radius: 8px;
    font-size: 1.13rem;
    text-align: right;
    background: #f6f8fa;
    transition: border 0.2s, box-shadow 0.2s;
    font-family: inherit;
    color: #2d3137;
}

input:focus {
    border: 2px solid #6366f1;
    outline: none;
    background: #fff;
    box-shadow: 0 0 0 2px #e0e7ff;
}

input.invalid {
    border: 2.2px solid #e53935 !important;
    background: #fff0f0;
    animation: shake 0.18s 1;
    color: #b71c1c;
}

input.invalid::placeholder {
    color: #e53935 !important;
    opacity: 0.85;
}

@keyframes shake {
    0% {
        transform: translateX(0);
    }
    25% {
        transform: translateX(-4px);
    }
    50% {
        transform: translateX(4px);
    }
    75% {
        transform: translateX(-2px);
    }
    100% {
        transform: translateX(0);
    }
}

button {
    padding: 0.9rem;
    background: linear-gradient(90deg, #6366f1 0%, #4f46e5 100%);
    color: #fff;
    border: none;
    border-radius: 8px;
    font-size: 1.15rem;
    cursor: pointer;
    transition: background 0.2s, box-shadow 0.2s;
    font-family: inherit;
    font-weight: 700;
    box-shadow: 0 2px 8px rgba(99, 102, 241, 0.08);
    margin-top: 0.7rem;
}

button:disabled {
    background: #b3bcf6;
    cursor: not-allowed;
    color: #f3f4f6;
}

button:hover:not(:disabled) {
    background: linear-gradient(90deg, #4f46e5 0%, #6366f1 100%);
    box-shadow: 0 4px 16px rgba(99, 102, 241, 0.13);
}

.message {
    margin-top: 1.2rem;
    min-height: 1.2em;
    color: #d32f2f;
    font-size: 1.08rem;
    text-align: center;
    font-weight: 500;
    letter-spacing: -0.2px;
    transition: color 0.2s;
}

.message:not(:empty) {
    animation: fadeIn 0.5s;
}

@keyframes fadeIn {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}
.pdp-icon.pdp-pointer {
  display: none;
}

#discount-container {
    margin-bottom: 1.2rem;
    background: #f1f5ff;
    border-radius: 7px;
    padding: 0.7rem 1rem;
    color: #3b3b6d;
    font-size: 1.05rem;
    display: flex;
    align-items: center;
    gap: 0.7rem;
}

input[type="checkbox"] {
    accent-color: #6366f1;
    width: 1.2em;
    height: 1.2em;
}

::-webkit-input-placeholder {
    color: #b0b3c6;
    font-size: 1.05rem;
}

::-moz-placeholder {
    color: #b0b3c6;
    font-size: 1.05rem;
}

:-ms-input-placeholder {
    color: #b0b3c6;
    font-size: 1.05rem;
}

::placeholder {
    color: #b0b3c6;
    font-size: 1.05rem;
}

@keyframes calendarPop {
    0% {
        transform: scale(0.85) translateY(30px);
        opacity: 0;
    }
    100% {
        transform: scale(1) translateY(0);
        opacity: 1;
    }
}

.brand-header-bar {
    width: 100%;
    background: #f7f5f2;
    box-shadow: 0 2px 12px rgba(99, 102, 241, 0.07);
    padding: 0.3rem 0;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 100;
    margin-bottom: 0;
    height: 56px;
}

.brand-header-bar-content {
    display: flex;
    flex-direction: row-reverse;
    align-items: center;
    justify-content: flex-start;
    direction: rtl;
    gap: 0.35rem;
    margin: 0;
    padding: 0.2rem 2rem;
    height: 100%;
}

.brand-header-bar .brand-logo svg {
    width: 24px;
    height: 24px;
}

.brand-header-bar .brand-logo {
    margin: 0;
    padding: 0;
    background: none;
    box-shadow: none;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 1.2rem;
}

.brand-header-bar .brand-title {
    font-family: 'Vazirmatn', Tahoma, Arial, sans-serif;
    font-size: 1.25rem;
    font-weight: 900;
    background: linear-gradient(90deg, #6366f1 0%, #4f46e5 100%);
    color: transparent;
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    letter-spacing: -1px;
    margin: 0 0.2rem 0 0.2rem;
    text-shadow: 0 2px 8px rgba(99, 102, 241, 0.08);
    vertical-align: middle;
    margin-right: 0.3rem;
}

.brand-header-bar .brand-tagline {
    font-size: 1.18rem;
    color: #6366f1;
    font-weight: bold;
    letter-spacing: -0.2px;
    opacity: 0.7;
    text-align: center;
    margin-left: 1.2rem;
}
#signup_birth_date.persian-date-input {
    background-image: url('data:image/svg+xml;utf8,<svg fill="%236366f1" height="20" viewBox="0 0 24 24" width="20" xmlns="http://www.w3.org/2000/svg"><path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11zm0-13H5V6h14v1zm-7 5h5v5h-5z"/></svg>');
    background-repeat: no-repeat;
    background-position: left 0.7rem center;
    background-size: 1.2em 1.2em;
    padding-left: 2.2em;
  width: 100%;
}

section {
    margin-top: 70px !important;
}

.input-with-unit {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 0.1rem;
}

.input-with-unit input {
    flex: 1 1 0;
}

.unit {
    color: #6366f1;
    font-size: 1.01rem;
    font-weight: 500;
    opacity: 0.85;
    white-space: nowrap;
}

@media (max-width: 600px) {
    section {
        min-width: 90vw;
        max-width: 98vw;
        padding: 2rem 0.5rem 1.5rem 0.5rem;
    }

    .brand-header-bar-content {
        gap: 0.3rem;
        padding: 0.1rem 0.7rem;
    }

    .brand-header-bar .brand-title {
        font-size: 0.98rem;
    }

    .brand-header-bar .brand-tagline {
        font-size: 1.05rem;
    }

    .brand-header-bar {
        height: 44px;
    }

    section {
        margin-top: 54px !important;
    }

    .input-with-unit {
        gap: 0.2rem;
    }

    .unit {
        font-size: 0.93rem;
    }

    .brand-header-bar .brand-logo {
        margin-right: 0.5rem;
    }

    .brand-header-bar .brand-tagline {
        margin-left: 0.5rem;
    }
}

#customer-name {
    font-size: 1.22rem;
    color: #4f46e5;
    font-weight: bold;
    margin-bottom: 1.3rem;
    background: linear-gradient(90deg, #6366f1 0%, #4f46e5 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-fill-color: transparent;
}

#birthday-effect {
    display: none;
    position: fixed !important;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 2147483647 !important;
    pointer-events: none;
    overflow: visible !important;
    background: transparent !important;
    border: 2px solid red !important;
}

#birthday-effect .birthday-message {
    position: absolute;
    top: 30%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 2.2rem;
    font-weight: bold;
    background: linear-gradient(90deg, #ffb300 0%, #ff4081 50%, #6366f1 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-fill-color: transparent;
    text-shadow: 0 4px 24px rgba(99, 102, 241, 0.18);
    white-space: nowrap;
    user-select: none;
    letter-spacing: 1px;
    opacity: 0.97;
}

.confetti {
    position: absolute;
    width: 12px;
    height: 18px;
    border-radius: 3px;
    opacity: 0.85;
    animation: confetti-fall 1.8s linear forwards;
}

@keyframes confetti-fall {
    0% {
        transform: translateY(-40px) rotateZ(0deg);
        opacity: 1;
    }
    80% {
        opacity: 1;
    }
    100% {
        transform: translateY(100vh) rotateZ(360deg);
        opacity: 0.2;
    }
}

#purchase-btn {
    font-size: 1.32rem;
    font-weight: bold;
    letter-spacing: 0.08em;
}
</style>
