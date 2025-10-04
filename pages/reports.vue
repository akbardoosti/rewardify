<template>
  <div class="reports-page">
    <div class="card">
      <Panel header="دانلود گزارشات">
        <p>
          برای دریافت گزارشات خرید، روی دکمه "دانلود گزارشات" کلیک کنید.
        </p>
        <p>
          در صورتی که نیاز به دریافت گزارشات کاملتر دارید میتوانید نسخه پرو را خریداری فرمایید.
        </p>
      </Panel>
      <div class="p-mt-4 mt-3">
        <Button label="دانلود گزارشات" icon="pi pi-download" @click="download" />
      </div>
    </div>
  </div>
</template>
<script setup>
definePageMeta({
  layout: 'vendor'
})
import { ref } from 'vue';
import api from '~/services/api';
import Panel from 'primevue/panel';
import Button from 'primevue/button';

const download = async () => {
  try {
    const response = await api.downloadReports();
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'reports.xlsx'); // or any other filename
    document.body.appendChild(link);
    link.click();
  } catch (error) {
    console.error('Error downloading the report:', error);
  }
};
</script>

<style scoped>
.reports-page {
  padding: 2rem;
}
.card {
  max-width: 600px;
  margin: 0 auto;
}
</style>
