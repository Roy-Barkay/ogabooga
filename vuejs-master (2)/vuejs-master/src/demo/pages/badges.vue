<script setup lang="ts">
import TBadge from '@@/components/TBadge.vue'

</script>

<template>
  <div class="flex flex-col">
    <p class="@text-title mb-4">
      ورودی‌ها
    </p>

    <div class="flex my-2">
      <p class="font-extrabold">
        شکل ظاهری (styleType):
      </p>
      <p dir="ltr">
        solid | outlined | tonal (default: solid)
      </p>
    </div>

    <div class="flex my-2">
      <p class="font-extrabold">
        رنگ (color):
      </p>
      <p dir="ltr">
        primary | error | black | success | warning | info | secondary‌ | tertiary (default: primary)
      </p>
    </div>
    <div class="flex my-2">
      <p class="font-extrabold">
        اندازه (size):
      </p>
      <p dir="ltr">
        small | medium | large (default: medium)
      </p>
    </div>

    <div class="flex my-2">
      <p class="font-extrabold">
        شکل گوشه‌ها (btnCorners):
      </p>
      <p dir="ltr">
        simple | curve (default: simple)
      </p>
    </div>

    <div class="flex my-2">
      <p class="font-extrabold">
        آیکن (icon):
      </p>
      <p dir="ltr">
        اختیاری (فقط به صورت تنها استفاده میشود!)
      </p>
    </div>

    <div class="flex my-2">
      <p class="font-extrabold">
        تایپ (type):
      </p>
      <p dir="ltr">
        text | icon | number | empty (default: empty)
      </p>
    </div>

    <div class="flex my-2">
      <p class="font-extrabold">
        غیرفعال (disable):
      </p>
      <p dir="ltr">
        اختیاری
      </p>
    </div>
    <p class="mt-10 font-extrabold">
      simple corner - small size :
    </p>
    <div class="mt-10 mx-auto flex flex">
      <TBadge
        btn-corners="simple"
        color="black"
        size="small"
        style-type="outlined"
        type="text"
      >
        hello
      </TBadge>
      <TBadge
        btn-corners="simple"
        color="primary"
        size="small"
        style-type="solid"
        class="mx-10"
        type="text"
      >
        hello
      </TBadge>
      <TBadge
        btn-corners="simple"
        color="warning"
        size="small"
        style-type="tonal"
        type="text"
      >
        hello
      </TBadge>
    </div>
    <p class="mt-10 font-extrabold">
      curve corner - small size :
    </p>
    <div class="mt-10 mx-auto flex">
      <TBadge
        btn-corners="curve"
        color="warning"
        size="small"
        style-type="outlined"
        type="text"
      >
        hello
      </TBadge>
      <TBadge
        btn-corners="curve"
        color="info"
        size="small"
        style-type="solid"
        class="mx-10"
        type="text"
      >
        hello
      </TBadge>
      <TBadge
        btn-corners="curve"
        color="success"
        size="small"
        style-type="tonal"
        type="text"
      >
        hello
      </TBadge>
    </div>
    <p class="mt-10 font-extrabold">
      simple corner - medium size :
    </p>
    <div class="mt-10 mx-auto flex">
      <TBadge
        btn-corners="simple"
        color="black"
        size="medium"
        style-type="outlined"
        type="text"
      >
        hello
      </TBadge>
      <TBadge
        btn-corners="simple"
        color="warning"
        size="medium"
        style-type="solid"
        class="mx-10"
        type="text"
      >
        hello
      </TBadge>
      <TBadge
        btn-corners="simple"
        color="error"
        size="medium"
        style-type="tonal"
        type="text"
      >
        hello
      </TBadge>
    </div>
    <p class="mt-10 font-extrabold">
      curve corner - medium size :
    </p>
    <div class="mt-10 mx-auto flex">
      <TBadge
        btn-corners="curve"
        color="warning"
        size="medium"
        style-type="outlined"
        type="text"
      >
        hello
      </TBadge>
      <TBadge
        btn-corners="curve"
        color="info"
        size="medium"
        style-type="tonal"
        class="mx-10"
        type="text"
      >
        hello
      </TBadge>
      <TBadge
        btn-corners="curve"
        color="success"
        size="medium"
        style-type="tonal"
        type="text"
      >
        hello
      </TBadge>
    </div>
    <p class="mt-10 font-extrabold">
      simple corner - large size :
    </p>
    <div class="mt-10 mx-auto flex">
      <TBadge
        btn-corners="simple"
        color="black"
        size="large"
        style-type="outlined"
        type="text"
      >
        hello
      </TBadge>
      <TBadge
        btn-corners="simple"
        color="warning"
        size="large"
        style-type="solid"
        class="mx-10"
        type="text"
      >
        hello
      </TBadge>
      <TBadge
        btn-corners="simple"
        color="error"
        size="large"
        style-type="tonal"
        type="text"
      >
        hello
      </TBadge>
    </div>
    <p class="mt-10 font-extrabold">
      curve corner - large size :
    </p>
    <div class="mt-10 mx-auto flex">
      <TBadge
        btn-corners="curve"
        color="warning"
        size="large"
        style-type="outlined"
        type="text"
      >
        hello
      </TBadge>
      <TBadge
        btn-corners="curve"
        color="info"
        size="large"
        style-type="outlined"
        class="mx-10"
        type="text"
      >
        hello
      </TBadge>
      <TBadge
        btn-corners="curve"
        color="success"
        size="large"
        style-type="tonal"
        type="text"
      >
        hello
      </TBadge>
    </div>
    <p class="mt-10 font-extrabold">
      icon only (simple - small) :
    </p>
    <div class="mt-10 mx-auto flex">
      <TBadge
        :icon="require('@icons/b-plus.svg')"
        color="warning"
        style-type="solid"
        size="small"
        btn-corners="simple"
        type="icon"
      />
      <TBadge
        :icon="require('@icons/b-plus.svg')"
        color="error"
        style-type="outlined"
        size="small"
        btn-corners="simple"
        class="mx-10"
        type="icon"
      />
      <TBadge
        :icon="require('@icons/b-plus.svg')"
        color="success"
        style-type="tonal"
        size="small"
        btn-corners="simple"
        type="icon"
      />
    </div>
    <p class="mt-10 font-extrabold">
      icon only (curve - medium) :
    </p>
    <div class="mt-10 mx-auto flex">
      <TBadge
        :icon="require('@icons/b-plus.svg')"
        color="black"
        style-type="tonal"
        size="medium"
        btn-corners="curve"
        type="icon"
      />
      <TBadge
        :icon="require('@icons/b-plus.svg')"
        color="info"
        style-type="solid"
        size="medium"
        btn-corners="curve"
        class="mx-10"
        type="icon"
      />
      <TBadge
        :icon="require('@icons/b-plus.svg')"
        color="black"
        style-type="outlined"
        size="medium"
        btn-corners="curve"
        type="icon"
      />
    </div>
    <p class="mt-10 font-extrabold">
      number only (curve - medium) :
    </p>
    <div class="mt-10 mx-auto flex">
      <TBadge
        color="warning"
        style-type="tonal"
        btn-corners="curve"
        type="number"
      >
        1
      </TBadge>
      <TBadge
        color="black"
        style-type="solid"
        btn-corners="curve"
        type="number"
        class="mx-10"
      >
        999
      </TBadge>
      <TBadge
        color="error"
        style-type="outlined"
        btn-corners="simple"
        type="number"
      >
        99
      </TBadge>
    </div>
    <p class="mt-10 font-extrabold">
      empty badge (small):
    </p>
    <div class="my-10 mx-auto flex">
      <TBadge
        color="warning"
        style-type="outlined"
        size="small"
        btn-corners="curve"
        type="empty"
      />
      <TBadge
        color="info"
        style-type="solid"
        btn-corners="simple"
        class="mx-10"
        type="empty"
      />
      <TBadge
        color="success"
        style-type="tonal"
        btn-corners="curve"
        type="empty"
      />
    </div>
    <p class="mt-10 font-extrabold">
      disabled badge :
    </p>
    <div class="my-10 mx-auto flex items-center">
      <TBadge
        btn-corners="curve"
        color="warning"
        size="large"
        style-type="outlined"
        type="text"
        disabled
      >
        hello
      </TBadge>
      <TBadge
        color="success"
        style-type="tonal"
        btn-corners="curve"
        type="empty"
        disabled
        class="ms-10"
      />
    </div>
  </div>
</template>
