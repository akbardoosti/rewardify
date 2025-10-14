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
              <p class="mb-4 font-bold">{{ pkg.subtitle }}</p>
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
                          <th scope="col" class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">مدت اعتبار</th>
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
            <AccordionTab v-if="filteredAllInOnePlans.length > 0" :header="allInOnePackage.title">
               <p class="mb-4 font-bold">{{ allInOnePackage.subtitle }}</p>
              <p class="mb-4">{{ allInOnePackage.description }}</p>
              <div v-if="allInOnePackage.features" class="mb-4">
                <h3 class="font-bold">ویژگی‌ها:</h3>
                <ul class="list-disc list-inside">
                  <li v-for="(feature, index) in allInOnePackage.features" :key="index">{{ feature }}</li>
                </ul>
              </div>
              <div class="flex flex-col">
                <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                  <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                    <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                      <table class="min-w-full divide-y divide-gray-200">
                        <thead class="bg-gray-50">
                        <tr>
                          <th scope="col" class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">مدت اعتبار</th>
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

    <div class="mt-8 text-center">
      <h2 class="text-xl mb-4">پشتیبانی</h2>
      <p class="mb-4">برای مشاوره و خرید بسته‌ها می‌توانید با شماره‌های زیر تماس بگیرید:</p>
      <div class="flex flex-col sm:flex-row justify-center items-center space-y-2 sm:space-y-0 sm:space-x-4 sm:space-x-reverse">
        <a v-for="num in supportNumbers" :key="num.link" :href="num.link" class="text-lg text-indigo-600 hover:text-indigo-900 font-bold">
          {{ num.display }}
        </a>
      </div>
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

const contactLink = 'tel:09222412012';

const supportNumbers = [
  { display: '0922 241 2012', link: 'tel:09222412012' },
  { display: '0910 580 0782', link: 'tel:09105800782' },
  { display: '0919 679 1889', link: 'tel:09196791889' },
]

const periods = ref(['۱ ماهه', '۳ ماهه', '۱ ساله']);
const selectedPeriod = ref(periods.value[0]);

const packages = ref({
  welcome: {
    title: 'بسته خوش‌آمدگویی',
    subtitle: 'شروعی گرم برای اولین تجربه مشتریان شما',
    description: 'با فعال‌سازی این بسته، به‌صورت خودکار پیام خوش‌آمدگویی برای مشتریان جدید ارسال می‌شود. اگر تخفیف خرید اول تنظیم شده باشد، مشتری نیز از آن مطلع خواهد شد.',
    features: [
      'ارسال خودکار پیام خوش‌آمدگویی یا اطلاع از تخفیف خرید اول',
      'قابل‌فعال‌سازی برای تمام مشتریان جدید',
      'ارسال از طریق SMS',
    ],
    plans: [
      { period: '۱ ماهه', messages: 200, price: 89000 },
      { period: '۳ ماهه', messages: 600, price: 249000 },
      { period: '۱ ساله', messages: 2400, price: 899000 },
    ]
  },
  birthday: {
    title: 'بسته تبریک تولد',
    subtitle: 'تجربه‌ای شخصی‌سازی‌شده در روز خاص مشتریان',
    description: 'در روز تولد هر مشتری، پیام تبریک اختصاصی همراه با اطلاع از تخفیف ویژه تولد به‌صورت خودکار ارسال می‌شود.',
    features: [
      'تبریک خودکار تولد مشتری',
      'اطلاع از تخفیف ویژه تولد (در صورت فعال بودن)',
      'ارسال از طریق SMS',
    ],
    plans: [
      { period: '۱ ماهه', messages: 150, price: 69000 },
      { period: '۳ ماهه', messages: 450, price: 189000 },
      { period: '۱ ساله', messages: 1800, price: 649000 },
    ]
  },
  anniversary: {
    title: 'بسته سالگرد عضویت',
    subtitle: 'حفظ ارتباط و وفاداری مشتریان قدیمی',
    description: 'در سالگرد عضویت هر مشتری در باشگاه وفاداری، پیام تبریک و تخفیف ویژه سالگرد به‌صورت خودکار ارسال می‌شود.',
    features: [
      'پیام تبریک خودکار در سالگرد عضویت',
      'اطلاع از تخفیف مخصوص سالگرد',
      'ارسال از طریق SMS',
    ],
    plans: [
      { period: '۱ ماهه', messages: 100, price: 59000 },
      { period: '۳ ماهه', messages: 300, price: 159000 },
      { period: '۱ ساله', messages: 1200, price: 549000 },
    ]
  },
  reminder: {
    title: 'بسته یادآوری هوشمند',
    subtitle: 'یادآوری هوشمندانه برای حفظ تعامل پس از خرید',
    description: 'چند روز بعد از خرید، به‌صورت خودکار پیام‌های یادآوری ارسال کنید و تخفیف‌های فعال یا ذخیره‌شده را به مشتری یادآوری کنید.',
    features: [
      'ارسال پیام خودکار در فواصل زمانی دلخواه (مثلاً ۷، ۱۵ یا ۳۰ روز بعد از خرید)',
      'یادآوری تخفیف‌های فعال یا ذخیره‌شده',
      'قابلیت تنظیم متن دلخواه توسط فروشگاه',
      'ارسال از طریق SMS',
    ],
    plans: [
      { period: '۱ ماهه', messages: 300, price: 129000 },
      { period: '۳ ماهه', messages: 900, price: 349000 },
      { period: '۱ ساله', messages: 3600, price: 1199000 },
    ]
  },
  broadcast: {
    title: 'بسته پیام‌های انبوه',
    subtitle: 'اطلاع‌رسانی سریع، گسترده و هدفمند به مشتریان',
    description: 'پیام‌های عمومی مانند حراج، تعطیلی یا معرفی محصولات جدید را به‌صورت انبوه برای تمام مشتریان یا گروه‌های خاص ارسال کنید.',
    features: [
      'ارسال پیام انبوه به همه یا گروه‌های منتخب',
      'مناسب برای اطلاع‌رسانی حراج‌ها، تغییر ساعت کاری یا محصولات جدید',
      'ارسال از طریق SMS',
    ],
    plans: [
      { period: '۱ ماهه', messages: 500, price: 199000 },
      { period: '۳ ماهه', messages: 1500, price: 549000 },
      { period: '۱ ساله', messages: 6000, price: 1899000 },
    ]
  }
});

const allInOnePackage = ref({
    title: '💎 پکیج جامع ارتباط مشتری',
    subtitle: 'همه قابلیت‌ها در یک پکیج کامل با ۲۰٪ تخفیف',
    description: 'اگر می‌خواهید تمام ارتباطات با مشتریان خود را هوشمند، خودکار و مؤثر کنید، این پکیج برای شماست.',
    features: [
        'شامل تمام ۵ بسته بالا',
        '۲۰٪ تخفیف نسبت به خرید جداگانه'
    ]
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
