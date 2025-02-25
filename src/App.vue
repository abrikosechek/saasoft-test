<template>
  <div class="page">
    <div class="header">
      <h1 class="header__title">Учетные записи</h1>
      <Button icon="pi pi-plus-circle" variant="outlined" />
    </div>

    <Message severity="info" icon="pi pi-question-circle">
      Для указания одной или нескольких меток используйте разделитель ;
    </Message>

    <div class="table">
      <!-- Table header -->
      <div class="table__cell">
        <p>
          Метки
        </p>
      </div>
      <div class="table__cell">
        <p>
          Тип записи
        </p>
      </div>
      <div class="table__cell">
        <p>
          Логин
        </p>
      </div>
      <div class="table__cell">
        <p>
          Пароль
        </p>
      </div>
      <!-- Empty header block -->
      <div class="table__cell" />

      <!-- Table body -->
       <TableItem />
       <TableItem />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Button, Message } from 'primevue';
import TableItem from '@/components/TableItem.vue';
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
  max-width: 1200px;
  margin: 0 auto;
}

.table {
  display: grid;
  grid-template-columns: 2fr 1.5fr 2fr 2fr auto;
  gap: 12px;
  width: 100%;

  &__cell {
    &>p {
      font-size: 14px;
      opacity: 80%;
    }
  }
}
</style>
