import { defineConfig, presetUno, presetIcons, transformerVariantGroup, transformerCompileClass, transformerDirectives } from 'unocss'
import TPreset from './scripts/TPreset'

export default defineConfig({
  presets: [
    presetUno(),
    presetIcons(),
    TPreset(),
  ],
  transformers: [
    transformerCompileClass({ layer: 'components', classPrefix: 'n-' }),
    transformerVariantGroup(),
    transformerDirectives(),
  ],
  // icons used in AppState.ts
  safelist: [
    'i-teenyicons:button-outline',
    'i-mdi:dock-window',
    'i-mdi:image-search-outline',
    'i-mi:notification',
    'i-mdi:tooltip-outline',
    'i-mdi:menu',
    'i-icon-park-outline:avatar',
    'i-uil:slider-h-range',
    'i-lucide:text-cursor-input',
    'i-mdi:label-outline',
    'i-teenyicons:button-outline',
    'i-mi-archive',
  ],
})
