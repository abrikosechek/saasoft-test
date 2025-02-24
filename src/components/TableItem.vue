<template>
  <InputText type="text" placeholder="Введите" />
  <Select :options="noteTypesList" optionLabel="name" placeholder="Выберите" class="w-full md:w-56" />

  <template v-if="!wide">
    <InputText type="text" placeholder="Введите" />
    <InputText type="text" placeholder="Введите" />
  </template>
  <InputText v-else class="wide" type="text" placeholder="Введите" />

  <Button icon="pi pi-trash" severity="danger" variant="text" />
</template>

<script setup lang='ts'>
import { InputText, Select, Button } from 'primevue';

interface Props {
  wide?: boolean
}

withDefaults(defineProps<Props>(), {
  wide: false
})

interface NoteTypes {
  id: string | number
  name: string
};

const noteTypesList: NoteTypes[] = [
  {
    name: "Локальная",
    id: "local"
  },
  {
    name: "LDAP",
    id: "ldap"
  },
]
</script>

<style scoped lang='scss'>
.wide {
  grid-column: span 2;
}
</style>