<template>
  <div>
    <!-- This page is intentionally left blank.
         The auth middleware will redirect the user. -->
  </div>
</template>

<script setup>
// No script logic is needed here as the redirection is handled
// by the global authentication middleware in middleware/auth.global.ts
definePageMeta({
  layout: 'default', // or false, as it will redirect anyway
});
</script>