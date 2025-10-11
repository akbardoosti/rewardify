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

    <ClientOnly>
      <div class="flex justify-center">
        <TabView class="w-full">
          <TabPanel v-for="(period, periodName) in tariffs" :key="periodName" :header="periodName" >
            <Accordion :multiple="false" :activeIndex="0" expandIcon="pi pi-chevron-up" collapseIcon="pi pi-chevron-down">
              <AccordionTab v-for="(service, serviceName) in period" :key="serviceName" :header="service.title">
                <div class="flex flex-col">
                  <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                      <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                        <table class="min-w-full divide-y divide-gray-200">
                          <thead class="bg-gray-50">
                          <tr>
                            <th scope="col" class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">نام بسته</th>
                            <th scope="col" class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">تعداد پیام</th>
                            <th scope="col" class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">هزینه هر پیام (تومان)</th>
                            <th scope="col" class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">قیمت کل (تومان)</th>
                            <th scope="col" class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
                          </tr>
                          </thead>
                          <tbody class="bg-white divide-y divide-gray-200">
                          <tr v-for="tariff in service.plans" :key="tariff.id">
                            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ tariff.name }}</td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ tariff.messages }}</td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ tariff.cost_per_message }}</td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ tariff.total_price }}</td>
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
          </TabPanel>
        </TabView>
      </div>
    </ClientOnly>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import Accordion from 'primevue/accordion';
import AccordionTab from 'primevue/accordiontab';
import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';
import Card from 'primevue/card';

useHead({
  title: 'لویانا - تعرفه‌ها'
});

definePageMeta({
  layout: 'vendor'
});

const contactLink = 'tel:09194563252';

const tariffs = ref({
  'ماهانه': {
    sms: {
      title: 'تعرفه پیامک (۳۰ روز)',
      plans: [
        { id: 1, name: 'بسته پایه', messages: 1000, cost_per_message: 150, total_price: 150000 },
        { id: 2, name: 'بسته استاندارد', messages: 5000, cost_per_message: 140, total_price: 700000 },
        { id: 3, name: 'بسته حرفه‌ای', messages: 10000, cost_per_message: 130, total_price: 1300000 },
      ]
    },
    telegram: {
      title: 'تعرفه تلگرام (۳۰ روز)',
      plans: [
        { id: 1, name: 'بسته پایه', messages: 1000, cost_per_message: 100, total_price: 100000 },
        { id: 2, name: 'بسته استاندارد', messages: 5000, cost_per_message: 90, total_price: 450000 },
        { id: 3, name: 'بسته حرفه‌ای', messages: 10000, cost_per_message: 80, total_price: 800000 },
      ]
    },
    bale: {
      title: 'تعرفه بله (۳۰ روز)',
      plans: [
        { id: 1, name: 'بسته پایه', messages: 1000, cost_per_message: 80, total_price: 80000 },
        { id: 2, name: 'بسته استاندارد', messages: 5000, cost_per_message: 70, total_price: 350000 },
        { id: 3, name: 'بسته حرفه‌ای', messages: 10000, cost_per_message: 60, total_price: 600000 },
      ]
    }
  },
  'سه ماهه': {
    sms: {
      title: 'تعرفه پیامک (۹۰ روز)',
      plans: [
        { id: 4, name: 'بسته پایه', messages: 3000, cost_per_message: 145, total_price: 435000 },
        { id: 5, name: 'بسته استاندارد', messages: 15000, cost_per_message: 135, total_price: 2025000 },
        { id: 6, name: 'بسته حرفه‌ای', messages: 30000, cost_per_message: 125, total_price: 3750000 },
      ]
    },
    telegram: {
      title: 'تعرفه تلگرام (۹۰ روز)',
      plans: [
        { id: 4, name: 'بسته پایه', messages: 3000, cost_per_message: 95, total_price: 285000 },
        { id: 5, name: 'بسته استاندارد', messages: 15000, cost_per_message: 85, total_price: 1275000 },
        { id: 6, name: 'بسته حرفه‌ای', messages: 30000, cost_per_message: 75, total_price: 2250000 },
      ]
    },
    bale: {
      title: 'تعرفه بله (۹۰ روز)',
      plans: [
        { id: 4, name: 'بسته پایه', messages: 3000, cost_per_message: 75, total_price: 225000 },
        { id: 5, name: 'بسته استاندارد', messages: 15000, cost_per_message: 65, total_price: 975000 },
        { id: 6, name: 'بسته حرفه‌ای', messages: 30000, cost_per_message: 55, total_price: 1650000 },
      ]
    }
  },
  'سالیانه': {
    sms: {
      title: 'تعرفه پیامک (یکساله)',
      plans: [
        { id: 7, name: 'بسته پایه', messages: 12000, cost_per_message: 140, total_price: 1680000 },
        { id: 8, name: 'بسته استاندارد', messages: 60000, cost_per_message: 130, total_price: 7800000 },
        { id: 9, name: 'بسته حرفه‌ای', messages: 120000, cost_per_message: 120, total_price: 14400000 },
      ]
    },
    telegram: {
      title: 'تعرفه تلگرام (یکساله)',
      plans: [
        { id: 7, name: 'بسته پایه', messages: 12000, cost_per_message: 90, total_price: 1080000 },
        { id: 8, name: 'بسته استاندارد', messages: 60000, cost_per_message: 80, total_price: 4800000 },
        { id: 9, name: 'بسته حرفه‌ای', messages: 120000, cost_per_message: 70, total_price: 8400000 },
      ]
    },
    bale: {
      title: 'تعرفه بله (یکساله)',
      plans: [
        { id: 7, name: 'بسته پایه', messages: 12000, cost_per_message: 70, total_price: 840000 },
        { id: 8, name: 'بسته استاندارد', messages: 60000, cost_per_message: 60, total_price: 3600000 },
        { id: 9, name: 'بسته حرفه‌ای', messages: 120000, cost_per_message: 50, total_price: 6000000 },
      ]
    }
  }
});
</script>

<style scoped>
/* Scoped styles can be removed or kept if needed for specific adjustments */
</style>
