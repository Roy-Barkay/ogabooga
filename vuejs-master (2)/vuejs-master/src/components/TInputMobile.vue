<script setup lang="ts">
import { BaseInput_CommonProps } from '@@/components/base/BaseInput.vue'
import BaseInput from './base/BaseInput.vue'
import { Countries_GetCountries } from '../repository/Countries'
import useAsyncMethod from '../hooks/useAsyncMethod'
import TInputSearch from '@@/components/TInputSearch.vue'
import TModal from '@@/components/TModal.vue'
import arrowDown from '@@/assets/icons/tt-arrow-down.svg'
import { useTranslation } from '@@/hooks/useTranslation'

const __ = useTranslation()

const props = defineProps({
  ...BaseInput_CommonProps,
})

let map: Record<string, string>

const isModalCountriesOpen = ref(false)

const { LoadingContainer, result: countries } = useAsyncMethod(Countries_GetCountries)

const filteredCountries = computed(
  () => countries.value?.filter(country => search(country[0], searchText.value) || search(country[1], searchText.value)),
)
const countryNotFound = computed(() => !filteredCountries.value?.length)

const searchText = ref('')

const countryCode = defineModel<string>('countryCode', { required: true })
const mobile = defineModel<string>('mobile', { required: true })

const selectedCountry = computed(() => {
  if (countries.value) {
    const index = countries.value.findIndex(country => country[1] === countryCode.value)
    if (index > -1) {
      return {
        code: countries.value[index][1],
        name: countries.value[index][0],
      }
    } else {
      return {
        code: '',
        name: '',
      }
    }
  } else {
    return {
      code: '+98',
      name: 'Iran',
    }
  }
})

watch(isModalCountriesOpen, () => {
  searchText.value = ''
})

function getCountryUrl(country: string[]) {
  const key = country[2]
  if (VITE) {
    if (map) {
      return map[key]
    }

    const countryRegex = /f_(.*)\.png$/
    const modules = import.meta.glob('@@/assets/countries/f_*.png', {
      eager: true,
      import: 'default',
    })

    const entries = Object.entries(modules).map(([key, val]) => [countryRegex.exec(key)![1], val])
    map = Object.fromEntries(entries)
    // console.log(map)

    return map[key]
  }
  return require(`@@/assets/countries/f_${key}.png`)
}

function select(country: string[]) {
  countryCode.value = country[1]
  isModalCountriesOpen.value = false
}

function search(source: string, searchWord: string) {
  return source.toLowerCase().includes(searchWord.toLowerCase())
}

</script>

<template>
  <div
    v-bind="$attrs"
    class="flex justify-center w-full dir-ltr"
    :class="{ 'items-center': !props.infoText, 'items-start': props.infoText, }"
  >
    <BaseInput
      v-model="selectedCountry.code"
      class="cursor-pointer"
      input-class="max-w-40px cursor-pointer"
      :style-type="styleType"
      :append-icon="arrowDown"
      :error="error"
      readonly
      @click="isModalCountriesOpen = true"
    />
    <BaseInput
      v-model="mobile"
      :label="label"
      :show-reset-button="false"
      :style-type="styleType"
      type="tel"
      :error="error"
      class="grow ml-2"
    />
  </div>
  <TModal
    v-model="isModalCountriesOpen"
    close-icon
    full-height
  >
    <template #header>
      <div class="@text-h2 text-center mb-8 mt-4">
        {{ __('tsitfy.select-country') }}
      </div>
      <div class="w-full rounded-14px px-4 mb-8">
        <TInputSearch
          v-model="searchText"
          name="search"
          :label="__('tsitfy.search')"
        />
      </div>
    </template>
    <div class="w-full h-800px px-3">
      <div v-if="countryNotFound" class="flex justify-center @text-title mt-10">
        {{ __('tsitfy.result-not-found') }}
      </div>
      <div v-else class="@flex-center flex-col w-full">
        <LoadingContainer>
          <ul class="w-full">
            <li
              v-for="(country, i) in filteredCountries"
              :key="i"
              class="flex items-center hover:@bg-primary-100 mt-2 rounded-4 @text-title @text-black-600 w-full cursor-pointer"
              role="button"
              :class="{ active: country[1] === selectedCountry.code }"
              @click="select(country)"
            >
              <img
                :src="getCountryUrl(country)"
                :alt="country[2]"
                class="rounded-full me-3 ms-1 w-13 h-13 shrink-0"
                loading="lazy"
              >

              <p class="break-all grow">
                {{ country[0] }}
              </p>
            </li>
          </ul>
        </LoadingContainer>
      </div>
    </div>
  </TModal>
</template>
