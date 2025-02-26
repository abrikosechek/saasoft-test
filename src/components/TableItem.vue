<template>
  <InputText v-model="state.mark" type="text" :invalid="v$.mark.$error" placeholder="Введите" maxlength="50" fluid
    @blur="submit" />
  <Select v-model="state.type" :options="noteTypesList" :invalid="v$.type.$error" placeholder="Выберите" />

  <InputText v-model="state.login" :invalid="v$.login.$error" type="text" placeholder="Введите" maxlength="100" fluid
    :class="{ wide: !showPasswordField }" @blur="submit" />
  <Password v-if="showPasswordField" v-model="state.password" toggleMask fluid :invalid="v$.password.$error"
    placeholder="Введите" maxlength="100" @blur="submit" />

  <Button icon="pi pi-trash" severity="danger" variant="text" @click="usersStore.delete(id)" />
</template>

<script setup lang='ts'>
import { reactive, computed, watch } from 'vue';
import { useUsersStore } from '@/store/users';
import { noteTypesList } from '@/shared/consts';
import type { User } from "../shared/interfaces";
import { InputText, Select, Button, Password } from 'primevue';
import { useVuelidate, type ValidationRuleWithoutParams, type ValidationRuleWithParams } from '@vuelidate/core'
import { required, maxLength } from '@vuelidate/validators'

interface Rules {
  mark: {
    maxLength: ValidationRuleWithParams<{ max: number }>
  },
  type: {
    required: ValidationRuleWithoutParams,
  },
  login: {
    required: ValidationRuleWithoutParams,
    maxLength: ValidationRuleWithParams<{ max: number }>
  },
  password: {
    required?: ValidationRuleWithoutParams,
    maxLength: ValidationRuleWithParams<{ max: number }>
  },
}

const usersStore = useUsersStore()

const props = defineProps<User>()

const state = reactive<User>({ ...props })
const rules = computed(() => {
  let rulesObject: Rules = {
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


const submit = () => {
  if (v$.value.$invalid) return

  usersStore.set(state)
}
</script>

<style scoped lang='scss'>
.wide {
  grid-column: span 2;
}
</style>