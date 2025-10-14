<template>
  <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col" style="margin-top: 60px;">
    <h1 class="text-2xl text-center">
      تعرفه‌های ارسال پیام لویانا
    </h1>

    <Card class="mb-8 mt-4">
      <template #content>
        <p class="m-0">
          با تعرفه‌های متنوع لویانا، ارتباطی مؤثر و به‌صرفه با مشتریان خود برقرار کنید. بسته‌ای را انتخاب کنید که به بهترین شکل با نیازهای کسب‌وکار شما هماهنگ است و از همین امروز کمپین‌های خود را آغاز کنید.
        </p>
      </template>
    </Card>

    <div class="flex flex-col items-center">
      <SelectButton v-model="selectedPeriod" :options="periods" aria-labelledby="basic" class="mb-4" />
      <ClientOnly>
        <div class="w-full">
          <Accordion :multiple="false" :activeIndex="0" expandIcon="pi pi-chevron-up" collapseIcon="pi pi-chevron-down">
            <AccordionTab v-for="(pkg, pkgKey) in filteredPackages" :key="pkgKey" :header="pkg.title">
              <p class="mb-4">{{ pkg.description }}</p>
              <div v-if="pkg.features" class="mb-4">
                <h3 class="font-bold">ویژگی‌ها:</h3>
                <ul class="list-disc list-inside">
                  <li v-for="(feature, index) in pkg.features" :key="index">{{ feature }}</li>
                </ul>
              </div>
              <div class="flex flex-col">
                <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                  <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                    <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                      <table class="min-w-full divide-y divide-gray-200">
                        <thead class="bg-gray-50">
                        <tr>
                          <th scope="col" class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">مدت</th>
                          <th scope="col" class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">تعداد پیام</th>
                          <th scope="col" class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">قیمت پیشنهادی</th>
                          <th scope="col" class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
                        </tr>
                        </thead>
                        <tbody class="bg-white divide-y divide-gray-200">
                        <tr v-for="plan in pkg.plans" :key="plan.period">
                          <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ plan.period }}</td>
                          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ plan.messages.toLocaleString('fa-IR') }} پیام</td>
                          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ plan.price.toLocaleString('fa-IR') }} تومان</td>
                          <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <a :href="contactLink" class="text-indigo-600 hover:text-indigo-900 bg-indigo-100 hover:bg-indigo-200 px-4 py-2 rounded-md">تماس با پشتیبانی</a>
                          </td>
                        </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </AccordionTab>
            <AccordionTab v-if="filteredAllInOnePlans.length > 0" header="💎 پیشنهاد ویژه: پکیج جامع ارتباط مشتری (Loyana All-in-One)">
              <p class="mb-4">شامل تمام ۵ پکیج بالا با تخفیف ۲۰٪. قابل خرید در دوره‌های ۳ ماهه و ۱ ساله. برای فروشگاه‌هایی که می‌خوان تمام ارتباط‌های مشتری رو خودکارسازی کنن.</p>
              <div class="flex flex-col">
                <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                  <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                    <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                      <table class="min-w-full divide-y divide-gray-200">
                        <thead class="bg-gray-50">
                        <tr>
                          <th scope="col" class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">مدت</th>
                          <th scope="col" class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">قیمت پیشنهادی</th>
                          <th scope="col" class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
                        </tr>
                        </thead>
                        <tbody class="bg-white divide-y divide-gray-200">
                        <tr v-for="plan in filteredAllInOnePlans" :key="plan.period">
                          <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ plan.period }}</td>
                          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ plan.price.toLocaleString('fa-IR') }} تومان</td>
                          <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <a :href="contactLink" class="text-indigo-600 hover:text-indigo-900 bg-indigo-100 hover:bg-indigo-200 px-4 py-2 rounded-md">تماس با پشتیبانی</a>
                          </td>
                        </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </AccordionTab>
          </Accordion>
        </div>
      </ClientOnly>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import Accordion from 'primevue/accordion';
import AccordionTab from 'primevue/accordiontab';
import SelectButton from 'primevue/selectbutton';
import Card from 'primevue/card';

useHead({
  title: 'لویانا - تعرفه‌ها'
});

definePageMeta({
  layout: 'vendor'
});

const contactLink = 'tel:09194563252';

const periods = ref(['۱ ماهه', '۳ ماهه', '۱ ساله']);
const selectedPeriod = ref(periods.value[0]);

const packages = ref({
  welcome: {
    title: '۱. پکیج خوش‌آمدگویی (Welcome Pack)',
    description: 'برای خوشامدگویی خودکار به مشتری‌های جدید، یا اطلاع از تخفیف خرید اول.',
    features: [
      'ارسال خودکار پیام خوش‌آمدگویی یا اطلاع از تخفیف خرید اول',
      'قابل فعال‌سازی برای تمام مشتریان جدید فروشگاه',
      'ارسال از طریق SMS یا ایمیل اختصاصی فروشگاه',
    ],
    plans: [
      { period: '۱ ماهه', messages: 200, price: 89000 },
      { period: '۳ ماهه', messages: 600, price: 249000 },
      { period: '۱ ساله', messages: 2400, price: 899000 },
    ]
  },
  birthday: {
    title: '۲. پکیج تبریک تولد (Birthday Pack)',
    description: 'برای ارسال خودکار تبریک تولد به مشتری و اطلاع از تخفیف تولدش.',
    features: [
      'تبریک خودکار تولد مشتری',
      'اطلاع از تخفیف ویژه تولد (در صورت فعال بودن)',
      'ارسال از طریق SMS یا ایمیل اختصاصی فروشگاه',
    ],
    plans: [
      { period: '۱ ماهه', messages: 150, price: 69000 },
      { period: '۳ ماهه', messages: 450, price: 189000 },
      { period: '۱ ساله', messages: 1800, price: 649000 },
    ]
  },
  anniversary: {
    title: '۳. پکیج سالگرد عضویت (Anniversary Pack)',
    description: 'برای تبریک سالگرد عضویت مشتری در باشگاه وفاداری و یادآوری تخفیفش.',
    features: [
      'پیام خودکار در سالگرد عضویت',
      'اطلاع از تخفیف مخصوص سالگرد',
      'ارسال از طریق SMS یا ایمیل اختصاصی فروشگاه',
    ],
    plans: [
      { period: '۱ ماهه', messages: 100, price: 59000 },
      { period: '۳ ماهه', messages: 300, price: 159000 },
      { period: '۱ ساله', messages: 1200, price: 549000 },
    ]
  },
  reminder: {
    title: '۴. پکیج یادآوری هوشمند (Reminder Pack)',
    description: 'برای ارسال خودکار پیام‌های دوره‌ای بعد از خرید یا یادآوری تخفیف‌های ذخیره‌شده مشتری.',
    features: [
      'پیام خودکار مثلاً ۷، ۱۵ یا ۳۰ روز بعد از خرید',
      'یادآوری تخفیف‌های فعال یا ذخیره‌شده',
      'متن دلخواه توسط فروشگاه قابل تنظیم',
      'ارسال از طریق SMS یا ایمیل اختصاصی',
    ],
    plans: [
      { period: '۱ ماهه', messages: 300, price: 129000 },
      { period: '۳ ماهه', messages: 900, price: 349000 },
      { period: '۱ ساله', messages: 3600, price: 1199000 },
    ]
  },
  broadcast: {
    title: '۵. پکیج پیام‌های انبوه (Broadcast Pack)',
    description: 'برای اطلاع‌رسانی‌های کلی به تمام مشتریان (مثل حراجی، تعطیلی یا محصولات جدید).',
    features: [
      'ارسال پیام انبوه به تمام مشتریان یا گروه خاص',
      'مناسب برای اعلام حراج، تغییر ساعت کاری، یا معرفی محصولات جدید',
      'ارسال از طریق SMS یا ایمیل اختصاصی',
    ],
    plans: [
      { period: '۱ ماهه', messages: 500, price: 199000 },
      { period: '۳ ماهه', messages: 1500, price: 549000 },
      { period: '۱ ساله', messages: 6000, price: 1899000 },
    ]
  }
});

const filteredPackages = computed(() => {
  const result = {};
  for (const pkgKey in packages.value) {
    const pkg = packages.value[pkgKey];
    const filteredPlans = pkg.plans.filter(p => p.period === selectedPeriod.value);
    if (filteredPlans.length > 0) {
      result[pkgKey] = {
        ...pkg,
        plans: filteredPlans
      };
    }
  }
  return result;
});

const filteredAllInOnePlans = computed(() => {
    const quarterlyPrice = Object.values(packages.value).reduce((total, pkg) => {
        const plan = pkg.plans.find(p => p.period === '۳ ماهه');
        return total + (plan ? plan.price : 0);
    }, 0);

    const yearlyPrice = Object.values(packages.value).reduce((total, pkg) => {
        const plan = pkg.plans.find(p => p.period === '۱ ساله');
        return total + (plan ? plan.price : 0);
    }, 0);

    const allPlans = [
        { period: '۳ ماهه', price: Math.round(quarterlyPrice * 0.8) },
        { period: '۱ ساله', price: Math.round(yearlyPrice * 0.8) }
    ];

    return allPlans.filter(p => p.period === selectedPeriod.value);
});

</script>

<style scoped>
/* Scoped styles can be removed or kept if needed for specific adjustments */
</style>