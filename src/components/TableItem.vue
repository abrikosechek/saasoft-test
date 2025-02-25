<template>
  <InputText v-model="state.mark" type="text" placeholder="Введите" />
  <Select v-model="state.type" :options="noteTypesList" placeholder="Выберите" />

  <InputText v-model="state.login" type="text" placeholder="Введите" :class="{ wide: !showPasswordField }" />
  <InputText v-if="showPasswordField" v-model="state.mark" placeholder="Введите" />

  <Button icon="pi pi-trash" severity="danger" variant="text" />
</template>

<script setup lang='ts'>
import { reactive, computed } from 'vue';
import { noteTypesList } from '@/shared/consts';
import { InputText, Select, Button } from 'primevue';

const state = reactive({
  mark: null,
  type: "Локальная",
  login: null,
  password: null,
})

const showPasswordField = computed(() => state.type == 'Локальная')
</script>

<style scoped lang='scss'>
.wide {
  grid-column: span 2;
}
</style>