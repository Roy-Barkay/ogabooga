<script setup lang="ts">
import TButton from '@@/components/TButton.vue'

async function asyncFunc() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(true)
    }, 1000)
  })
}
</script>

<template>
  <div class="p-3">
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
        نوع (type):
      </p>
      <p dir="ltr">
        button | submit | reset (default: button)
      </p>
    </div>

    <div class="flex my-2">
      <p class="font-extrabold">
        رنگ (color):
      </p>
      <p dir="ltr">
        primary | secondary | tertiary | black | error (default: primary)
      </p>
    </div>
    <div class="flex my-2">
      <p class="font-extrabold">
        اندازه (size):
      </p>
      <p dir="ltr">
        small | medium | large | xlarge (default: medium)
      </p>
    </div>

    <div class="flex my-2">
      <p class="font-extrabold">
        بارگزاری (loading):
      </p>
      <p dir="ltr">
        true | false (default: false)
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
        اختیاری
      </p>
    </div>
  </div>

  <p class="p-3 @text-title">
    TButton
  </p>
  <div class="@flex-center mt-4 flex-wrap gap-1 mb-3">
    <TButton
      :loading="false"
      size="small"
      style-type="text"
      color="primary"
    >
      سلام
    </TButton>

    <TButton
      :loading="true"
      size="small"
      style-type="text"
      color="primary"
    >
      سلام
    </TButton>

    <TButton
      :icon="require('@icons/b-plus.svg')"
      size="small"
      style-type="text"
      color="black"
    >
      سلام اکبر اکبر اکبر اکبر
    </TButton>
  </div>

  <div class="@flex-center mt-4 flex-wrap gap-1 mb-3">
    <TButton
      :loading="false"
      :size="'small'"
      :style-type="'tonal'"
    >
      سلام
    </TButton>

    <TButton
      :loading="true"
      :size="'small'"
      :style-type="'tonal'"
    >
      سلام
    </TButton>

    <TButton
      :icon="require('@icons/b-plus.svg')"
      :size="'small'"
      :style-type="'tonal'"
      color="black"
    >
      سلام اکبر اکبر اکبر اکبر
    </TButton>
  </div>

  <div class="@flex-center mt-4 flex-wrap gap-1 mb-3">
    <TButton
      :loading="false"
      :size="'medium'"
      :color="'secondary'"
    >
      سلام
    </TButton>

    <TButton
      :loading="true"
      :size="'medium'"
      :color="'secondary'"
    >
      سلام
    </TButton>

    <TButton
      :icon="require('@icons/b-plus.svg')"
      :size="'medium'"
      color="black"
    >
      سلام اکبر اکبر اکبر اکبر
    </TButton>
  </div>

  <div class="@flex-center mt-4 flex-wrap gap-1 mb-3">
    <TButton
      :loading="false"
      :size="'xmedium'"
      color="success"
    >
      سلام
    </TButton>

    <TButton
      :loading="true"
      :size="'xmedium'"
      color="success"
    >
      سلام
    </TButton>

    <TButton
      :icon="require('@icons/b-plus.svg')"
      :size="'xmedium'"
      color="success"
    >
      سلام اکبر اکبر اکبر اکبر
    </TButton>
  </div>

  <div class="@flex-center mt-4 flex-wrap gap-1 mb-3">
    <TButton
      :loading="false"
      :size="'large'"
      :style-type="'outlined'"
      :color="'tertiary'"
    >
      سلام
    </TButton>

    <TButton
      :loading="true"
      :size="'large'"
      :style-type="'outlined'"
      :color="'tertiary'"
    >
      سلام
    </TButton>

    <TButton
      :icon="require('@icons/b-plus.svg')"
      :size="'large'"
      :style-type="'outlined'"
      color="black"
    >
      سلام اکبر اکبر اکبر اکبر
    </TButton>
  </div>

  <div class="@flex-center mt-4 flex-wrap gap-1 mb-3">
    <TButton
      :loading="false"
      :size="'xlarge'"
      :shadow="true"
    >
      سلام
    </TButton>

    <TButton
      :loading="true"
      :size="'xlarge'"
      :shadow="true"
    >
      سلام
    </TButton>

    <TButton
      :icon="require('@icons/b-plus.svg')"
      :size="'xlarge'"
      :action="asyncFunc"
      :shadow="true"
    >
      سلام اکبر اکبر اکبر اکبر
    </TButton>
  </div>

  <hr>

  <p class="p-3 @text-title">
    Curved TButton
  </p>
  <div class="@flex-center mt-4 flex-wrap gap-1 mb-3">
    <TButton
      :loading="false"
      :size="'small'"
      :style-type="'tonal'"
      :btn-corners="'curve'"
    >
      سلام
    </TButton>

    <TButton
      :loading="true"
      :size="'small'"
      :style-type="'tonal'"
      :btn-corners="'curve'"
    >
      سلام
    </TButton>

    <TButton
      :icon="require('@icons/b-plus.svg')"
      :size="'small'"
      :style-type="'tonal'"
      :btn-corners="'curve'"
    >
      سلام اکبر اکبر اکبر اکبر
    </TButton>
  </div>

  <div class="@flex-center mt-4 flex-wrap gap-1 mb-3">
    <TButton
      :loading="false"
      :size="'medium'"
      :color="'secondary'"
      :btn-corners="'curve'"
    >
      سلام
    </TButton>

    <TButton
      :loading="true"
      :size="'medium'"
      :color="'secondary'"
      :btn-corners="'curve'"
    >
      سلام
    </TButton>

    <TButton
      :icon="require('@icons/b-plus.svg')"
      :size="'medium'"
      :color="'secondary'"
      :btn-corners="'curve'"
    >
      سلام اکبر اکبر اکبر اکبر
    </TButton>
  </div>

  <div class="@flex-center mt-4 flex-wrap gap-1 mb-3">
    <TButton
      :loading="false"
      :size="'xmedium'"
      color="success"
      :btn-corners="'curve'"
    >
      سلام
    </TButton>

    <TButton
      :loading="true"
      :size="'xmedium'"
      color="success"
      :btn-corners="'curve'"
    >
      سلام
    </TButton>

    <TButton
      :icon="require('@icons/b-plus.svg')"
      :size="'xmedium'"
      color="success"
      :btn-corners="'curve'"
    >
      سلام اکبر اکبر اکبر اکبر
    </TButton>
  </div>

  <div class="@flex-center mt-4 flex-wrap gap-1 mb-3">
    <TButton
      :loading="false"
      :size="'large'"
      :style-type="'outlined'"
      :color="'tertiary'"
      :btn-corners="'curve'"
    >
      سلام
    </TButton>

    <TButton
      :loading="true"
      :size="'large'"
      :style-type="'outlined'"
      :color="'tertiary'"
      :btn-corners="'curve'"
    >
      سلام
    </TButton>

    <TButton
      :icon="require('@icons/b-plus.svg')"
      :size="'large'"
      :style-type="'outlined'"
      :color="'tertiary'"
      :btn-corners="'curve'"
    >
      سلام اکبر اکبر اکبر اکبر
    </TButton>
  </div>

  <div class="@flex-center mt-4 flex-wrap gap-1 mb-3">
    <TButton
      :loading="false"
      :size="'xlarge'"
      :btn-corners="'curve'"
      :shadow="true"
    >
      سلام
    </TButton>

    <TButton
      :loading="true"
      :size="'xlarge'"
      :btn-corners="'curve'"
      :shadow="true"
    >
      سلام
    </TButton>

    <TButton
      :icon="require('@icons/b-plus.svg')"
      :size="'xlarge'"
      :action="asyncFunc"
      :btn-corners="'curve'"
      :shadow="true"
    >
      سلام اکبر اکبر اکبر اکبر
    </TButton>
  </div>

  <hr>
  <p class="p-3 @text-title">
    IconOnly
  </p>
  <div class="@flex-center mt-4 flex-wrap gap-5 mb-3">
    <TButton
      :icon="require('@icons/b-plus.svg')"
      :action="asyncFunc"
      color="secondary"
      style-type="text"
      :loading="true"
      size="small"
    />

    <TButton
      :icon="require('@icons/b-plus.svg')"
      :action="asyncFunc"
      color="tertiary"
      style-type="text"
      size="small"
    />

    <TButton
      :icon="require('@icons/b-plus.svg')"
      :action="asyncFunc"
      color="primary"
      style-type="text"
      size="small"
    />
  </div>
  <div class="@flex-center mt-4 flex-wrap gap-5 mb-3">
    <TButton
      :icon="require('@icons/b-plus.svg')"
      :action="asyncFunc"
      color="secondary"
      size="medium"
      shadow
    />

    <TButton
      :icon="require('@icons/b-plus.svg')"
      :action="asyncFunc"
      color="tertiary"
      size="medium"
      shadow
    />

    <TButton
      :icon="require('@icons/b-plus.svg')"
      :action="asyncFunc"
      color="primary"
      size="medium"
      shadow
    />
  </div>

  <div class="@flex-center mt-4 flex-wrap gap-5 mb-3">
    <TButton
      :icon="require('@icons/b-plus.svg')"
      :action="asyncFunc"
      color="secondary"
      size="xmedium"
      shadow
    />

    <TButton
      :icon="require('@icons/b-plus.svg')"
      :action="asyncFunc"
      color="tertiary"
      size="xmedium"
      shadow
    />

    <TButton
      :icon="require('@icons/b-plus.svg')"
      :action="asyncFunc"
      color="primary"
      size="xmedium"
      shadow
    />
  </div>

  <div class="@flex-center mt-4 flex-wrap gap-5 mb-3">
    <TButton
      :icon="require('@icons/b-plus.svg')"
      :action="asyncFunc"
      color="secondary"
      :style-type="'tonal'"
      size="large"
    />

    <TButton
      :icon="require('@icons/b-plus.svg')"
      :action="asyncFunc"
      color="tertiary"
      :style-type="'tonal'"
      size="large"
    />

    <TButton
      :icon="require('@icons/b-plus.svg')"
      :action="asyncFunc"
      color="primary"
      :style-type="'tonal'"
      size="large"
    />
  </div>

  <div class="@flex-center mt-4 flex-wrap gap-5 mb-3">
    <TButton
      :icon="require('@icons/b-plus.svg')"
      :action="asyncFunc"
      color="secondary"
      :style-type="'outlined'"
      size="xlarge"
    />

    <TButton
      :icon="require('@icons/b-plus.svg')"
      :action="asyncFunc"
      color="tertiary"
      :style-type="'outlined'"
      size="xlarge"
    />

    <TButton
      :icon="require('@icons/b-plus.svg')"
      :action="asyncFunc"
      color="primary"
      :style-type="'outlined'"
      size="xlarge"
    />
  </div>

  <hr>
  <p class="p-3 @text-title">
    curve IconOnly
  </p>
  <div class="@flex-center mt-4 flex-wrap gap-5 mb-3">
    <TButton
      :icon="require('@icons/b-plus.svg')"
      :action="asyncFunc"
      color="secondary"
      style-type="text"
      btn-corners="curve"
      size="small"
    />

    <TButton
      :icon="require('@icons/b-plus.svg')"
      :action="asyncFunc"
      color="tertiary"
      style-type="text"
      btn-corners="curve"
      size="small"
    />

    <TButton
      :icon="require('@icons/b-plus.svg')"
      :action="asyncFunc"
      color="primary"
      style-type="text"
      btn-corners="curve"
      size="small"
    />
  </div>
  <div class="@flex-center mt-4 flex-wrap gap-5 mb-3">
    <TButton
      :icon="require('@icons/b-plus.svg')"
      :action="asyncFunc"
      color="secondary"
      btn-corners="curve"
      size="medium"
      shadow
    />

    <TButton
      :icon="require('@icons/b-plus.svg')"
      :action="asyncFunc"
      color="tertiary"
      btn-corners="curve"
      size="medium"
      shadow
    />

    <TButton
      :icon="require('@icons/b-plus.svg')"
      :action="asyncFunc"
      color="primary"
      btn-corners="curve"
      size="medium"
      shadow
    />
  </div>

  <div class="@flex-center mt-4 flex-wrap gap-5 mb-3">
    <TButton
      :icon="require('@icons/b-plus.svg')"
      :action="asyncFunc"
      color="secondary"
      btn-corners="curve"
      size="xmedium"
      shadow
    />

    <TButton
      :icon="require('@icons/b-plus.svg')"
      :action="asyncFunc"
      color="tertiary"
      btn-corners="curve"
      size="xmedium"
      shadow
    />

    <TButton
      :icon="require('@icons/b-plus.svg')"
      :action="asyncFunc"
      color="primary"
      btn-corners="curve"
      size="xmedium"
      shadow
    />
  </div>

  <div class="@flex-center mt-4 flex-wrap gap-5 mb-3">
    <TButton
      :icon="require('@icons/b-plus.svg')"
      :action="asyncFunc"
      color="secondary"
      :style-type="'tonal'"
      btn-corners="curve"
      size="large"
    />

    <TButton
      :icon="require('@icons/b-plus.svg')"
      :action="asyncFunc"
      color="tertiary"
      :style-type="'tonal'"
      btn-corners="curve"
      size="large"
    />

    <TButton
      :icon="require('@icons/b-plus.svg')"
      :action="asyncFunc"
      color="primary"
      :style-type="'tonal'"
      btn-corners="curve"
      size="large"
    />
  </div>

  <div class="@flex-center mt-4 flex-wrap gap-5 mb-3">
    <TButton
      :icon="require('@icons/b-plus.svg')"
      :action="asyncFunc"
      color="secondary"
      :style-type="'outlined'"
      btn-corners="curve"
      size="xlarge"
    />

    <TButton
      :icon="require('@icons/b-plus.svg')"
      :action="asyncFunc"
      color="tertiary"
      :style-type="'outlined'"
      btn-corners="curve"
      size="xlarge"
    />

    <TButton
      :icon="require('@icons/b-plus.svg')"
      :action="asyncFunc"
      color="primary"
      :style-type="'outlined'"
      btn-corners="curve"
      size="xlarge"
    />
  </div>

  <hr>
  <p class="p-3 @text-title">
    disabled
  </p>
  <div class="@flex-center mt-4 flex-wrap gap-1 mb-3">
    <TButton
      :loading="false"
      size="small"
      style-type="text"
      color="primary"
      :disabled="true"
    >
      سلام
    </TButton>

    <TButton
      :loading="true"
      size="small"
      style-type="text"
      color="primary"
      :disabled="true"
    >
      سلام
    </TButton>

    <TButton
      :icon="require('@icons/b-plus.svg')"
      size="small"
      style-type="text"
      color="primary"
      :disabled="true"
    >
      سلام اکبر اکبر اکبر اکبر
    </TButton>
  </div>

  <div class="@flex-center mt-4 flex-wrap gap-1 mb-3">
    <TButton
      :loading="false"
      :size="'small'"
      :style-type="'tonal'"
      :disabled="true"
    >
      سلام
    </TButton>

    <TButton
      :loading="true"
      :size="'small'"
      :style-type="'tonal'"
      :disabled="true"
    >
      سلام
    </TButton>

    <TButton
      :icon="require('@icons/b-plus.svg')"
      :size="'small'"
      :style-type="'tonal'"
      :disabled="true"
    >
      سلام اکبر اکبر اکبر اکبر
    </TButton>
  </div>

  <div class="@flex-center mt-4 flex-wrap gap-1 mb-3">
    <TButton
      :loading="false"
      :size="'medium'"
      :color="'secondary'"
      :disabled="true"
    >
      سلام
    </TButton>

    <TButton
      :loading="true"
      :size="'medium'"
      :color="'secondary'"
      :disabled="true"
    >
      سلام
    </TButton>

    <TButton
      :icon="require('@icons/b-plus.svg')"
      :size="'medium'"
      :color="'secondary'"
      :disabled="true"
    >
      سلام اکبر اکبر اکبر اکبر
    </TButton>
  </div>

  <div class="@flex-center mt-4 flex-wrap gap-1 mb-3">
    <TButton
      :loading="false"
      :size="'large'"
      :style-type="'outlined'"
      :color="'tertiary'"
      :disabled="true"
    >
      سلام
    </TButton>

    <TButton
      :loading="true"
      :size="'large'"
      :style-type="'outlined'"
      :color="'tertiary'"
      :disabled="true"
    >
      سلام
    </TButton>

    <TButton
      :icon="require('@icons/b-plus.svg')"
      :size="'large'"
      :style-type="'outlined'"
      :color="'tertiary'"
      :disabled="true"
    >
      سلام اکبر اکبر اکبر اکبر
    </TButton>
  </div>

  <div class="@flex-center mt-4 flex-wrap gap-1 mb-3">
    <TButton
      :loading="false"
      :size="'xlarge'"
      :shadow="true"
      :disabled="true"
    >
      سلام
    </TButton>

    <TButton
      :loading="true"
      :size="'xlarge'"
      :shadow="true"
      :disabled="true"
    >
      سلام
    </TButton>

    <TButton
      :icon="require('@icons/b-plus.svg')"
      :size="'xlarge'"
      :action="asyncFunc"
      :shadow="true"
      :disabled="true"
    >
      سلام اکبر اکبر اکبر اکبر
    </TButton>
  </div>

  <hr>
</template>
