<template>
  <InputText v-model="state.mark" type="text" :invalid="v$.mark.$error" placeholder="Введите" maxlength="50"
    @blur="submit" />
  <Select v-model="state.type" :options="noteTypesList" :invalid="v$.type.$error" placeholder="Выберите" />

  <InputText v-model="state.login" :invalid="v$.login.$error" type="text" placeholder="Введите" maxlength="100"
    :class="{ wide: !showPasswordField }" @blur="submit" />
  <InputText v-if="showPasswordField" v-model="state.password" :invalid="v$.password.$error" placeholder="Введите"
    maxlength="100" @blur="submit" />

  <Button icon="pi pi-trash" severity="danger" variant="text" />
  <!-- <p>{{ v$.mark.$error }}</p> -->
</template>

<script setup lang='ts'>
import { reactive, computed, watch } from 'vue';
import { noteTypesList } from '@/shared/consts';
import type { User, UserToSave } from '@/shared/interfaces';
import { InputText, Select, Button } from 'primevue';
import { useVuelidate } from '@vuelidate/core'
import { required, maxLength } from '@vuelidate/validators'


const state = reactive<User>({
  mark: null,
  type: "Локальная",
  login: null,
  password: null,
})
const rules = computed(() => {
  let rulesObject: any = {
    mark: { maxLength: maxLength(50) },
    type: { required },
    login: { required, maxLength: maxLength(100) },
    password: { maxLength: maxLength(100) },
  }

  if (state.type == 'Локальная') rulesObject.password.required = required

  return rulesObject
})

const v$ = useVuelidate(rules, state)
v$.value.$touch()

const stateType = computed(() => state.type)
const showPasswordField = computed(() => state.type == 'Локальная')

watch(stateType, (newValue) => {
  if (newValue == "LDAP") state.password = null

  submit()
})

const createMarkArray = (markString: string) => {
  const result = markString.split(';').map(item => item.trim()).filter(item => item)
  return result.length > 0 ? result : null
}

const submit = () => {
  if (v$.value.$invalid) return

  const objectToSave: UserToSave = {
    mark: state.mark ? createMarkArray(state.mark) : null,
    type: state.type,
    login: state.login.trim(),
    password: state.password ? state.password.trim() : null
  }

  console.log(objectToSave)
}
</script>

<style scoped lang='scss'>
.wide {
  grid-column: span 2;
}
</style>