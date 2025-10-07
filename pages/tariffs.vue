<template>
  <div class="tariffs-page">
    <div class="page-header">
      <h1>تعرفه‌های لویانا</h1>
      <p>با تعرفه‌های متنوع لویانا، ارتباطی مؤثر و به‌صرفه با مشتریان خود برقرار کنید. بسته‌ای را انتخاب کنید که به بهترین شکل با نیازهای کسب‌وکار شما هماهنگ است و از همین امروز کمپین‌های خود را آغاز کنید.</p>
    </div>

    <TabView>
      <TabPanel header="پیامک">
        <div class="p-grid">
          <div class="p-col-12 p-md-4" v-for="tariff in smsTariffs" :key="tariff.id">
            <Card class="tariff-card">
              <template #title>{{ tariff.name }}</template>
              <template #content>
                <p>تعداد پیامک: {{ tariff.messages }}</p>
                <p>هزینه هر پیام: {{ tariff.cost_per_message }} تومان</p>
                <p>قیمت کل: {{ tariff.total_price }} تومان</p>
                <a :href="contactLink" class="p-button p-button-primary">تماس با پشتیبانی</a>
              </template>
            </Card>
          </div>
        </div>
      </TabPanel>
      <TabPanel header="تلگرام">
        <div class="p-grid">
          <div class="p-col-12 p-md-4" v-for="tariff in telegramTariffs" :key="tariff.id">
            <Card class="tariff-card">
              <template #title>{{ tariff.name }}</template>
              <template #content>
                <p>تعداد پیام: {{ tariff.messages }}</p>
                <p>هزینه هر پیام: {{ tariff.cost_per_message }} تومان</p>
                <p>قیمت کل: {{ tariff.total_price }} تومان</p>
                <a :href="contactLink" class="p-button p-button-primary">تماس با پشتیبانی</a>
              </template>
            </Card>
          </div>
        </div>
      </TabPanel>
      <TabPanel header="بله">
        <div class="p-grid">
          <div class="p-col-12 p-md-4" v-for="tariff in baleTariffs" :key="tariff.id">
            <Card class="tariff-card">
              <template #title>{{ tariff.name }}</template>
              <template #content>
                <p>تعداد پیام: {{ tariff.messages }}</p>
                <p>هزینه هر پیام: {{ tariff.cost_per_message }} تومان</p>
                <p>قیمت کل: {{ tariff.total_price }} تومان</p>
                <a :href="contactLink" class="p-button p-button-primary">تماس با پشتیبانی</a>
              </template>
            </Card>
          </div>
        </div>
      </TabPanel>
    </TabView>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import Card from 'primevue/card';
import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';

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
.tariffs-page {
  padding: 2rem;
}

.page-header {
  text-align: center;
  margin-bottom: 2rem;
}

.page-header h1 {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
}

.page-header p {
  font-size: 1.2rem;
  color: #6c757d;
}

.tariff-card {
  margin-bottom: 1rem;
}

.p-grid {
    display: flex;
    flex-wrap: wrap;
    margin-right: -0.5rem;
    margin-left: -0.5rem;
    margin-top: -0.5rem;
}

.p-col-12 {
    flex: 0 0 100%;
    max-width: 100%;
    padding: 0.5rem;
}

@media screen and (min-width: 768px) {
    .p-md-4 {
        flex: 0 0 33.3333%;
        max-width: 33.3333%;
    }
}
</style>