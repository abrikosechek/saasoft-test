<template>
  <div class="page">
    <div class="header">
      <h1 class="header__title">Учетные записи</h1>
      <Button icon="pi pi-home" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Button } from 'primevue';
</script>

<style scoped lang="scss">
.header {
  display: flex;
  align-items: center;
  gap: 8px;

  &__title {}
}

.page {
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
}
</style>
