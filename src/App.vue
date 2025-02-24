<template>
  <div class="page">
    <div class="header">
      <h1 class="header__title">Учетные записи</h1>
      <Button icon="pi pi-plus-circle" variant="outlined"  />
    </div>
    <Message severity="info" icon="pi pi-question-circle">
      Для указания одной или нескольких меток используйте разделитель ;
    </Message>
  </div>
</template>

<script setup lang="ts">
import { Button, Message } from 'primevue';
</script>

<style scoped lang="scss">
.header {
  display: flex;
  align-items: center;
  gap: 18px;

  &__title {
    font-weight: 400;
  }
}

.page {
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
}
</style>
