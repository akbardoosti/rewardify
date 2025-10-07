<template>
  <div class=" mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col" style="margin-top: 60px;">
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


    <Accordion :multiple="false" :activeIndex="0">
      <AccordionTab header="تعرفه پیامک">
        <div class="flex flex-col">
          <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <table class="min-w-full divide-y divide-gray-200">
                  <thead class="bg-gray-50">
                    <tr>
                      <th scope="col" class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">نام بسته</th>
                      <th scope="col" class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">تعداد پیامک</th>
                      <th scope="col" class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">هزینه هر پیام (تومان)</th>
                      <th scope="col" class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">قیمت کل (تومان)</th>
                      <th scope="col" class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
                    </tr>
                  </thead>
                  <tbody class="bg-white divide-y divide-gray-200">
                    <tr v-for="tariff in smsTariffs" :key="tariff.id">
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
      <AccordionTab header="تعرفه تلگرام">
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
                                <tr v-for="tariff in telegramTariffs" :key="tariff.id">
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
      <AccordionTab header="تعرفه بله">
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
                                <tr v-for="tariff in baleTariffs" :key="tariff.id">
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
  </div>
</template>

<script setup>
import { ref } from 'vue';
import Accordion from 'primevue/accordion';
import AccordionTab from 'primevue/accordiontab';
import {Card} from "primevue";

useHead({
  title: 'لویانا - تعرفه‌ها'
});

definePageMeta({
  layout: 'vendor'
});

const contactLink = 'tel:09194563252';

const smsTariffs = ref([
  { id: 1, name: 'بسته پایه', messages: 100, cost_per_message: 150, total_price: 15000 },
  { id: 2, name: 'بسته استاندارد', messages: 300, cost_per_message: 140, total_price: 42000 },
  { id: 3, name: 'بسته حرفه‌ای', messages: 500, cost_per_message: 130, total_price: 65000 },
]);

const telegramTariffs = ref([
  { id: 1, name: 'بسته پایه', messages: 100, cost_per_message: 100, total_price: 10000 },
  { id: 2, name: 'بسته استاندارد', messages: 300, cost_per_message: 90, total_price: 27000 },
  { id: 3, name: 'بسته حرفه‌ای', messages: 500, cost_per_message: 80, total_price: 40000 },
]);

const baleTariffs = ref([
  { id: 1, name: 'بسته پایه', messages: 100, cost_per_message: 80, total_price: 8000 },
  { id: 2, name: 'بسته استاندارد', messages: 300, cost_per_message: 70, total_price: 21000 },
  { id: 3, name: 'بسته حرفه‌ای', messages: 500, cost_per_message: 60, total_price: 30000 },
]);
</script>

<style scoped>
/* Scoped styles can be removed or kept if needed for specific adjustments */
</style>
