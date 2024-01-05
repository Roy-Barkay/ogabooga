function getColorString(customPropertyName, opacityValue) {
  if (opacityValue !== undefined) {
    return `rgba(var(--${customPropertyName}), ${opacityValue / 100})`
  }
  return `rgb(var(--${customPropertyName}))`
}

const COLORS = ['primary', 'secondary', 'tertiary', 'error', 'black', 'warning', 'complementary', 'success', 'info']
const COLORS_AUTOCOMPLETE_STRING = `(${COLORS.join('|')})`

const Z_INDEXES = {
  tooltip: 25,
  toast: 25,
  modal: 20,
  backdrop: 15,
  menu: 14,
  menubackdrop: 13,
  header: 5,
  zero: 0,
}
const Z_INDEXES_AUTOCOMPLETE_STRING = `(${Object.keys(Z_INDEXES).join('|')})`

/**
 * پریست ما
 *
 * @param   {[type]}  options  [options description]
 *
 * @return  {import('unocss').Preset}           [return description]
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
module.exports = function TPreset(options = {}) {
  return {
    name: 'TPreset',
    rules: [
      ...[
        ['bg', 'background-color'],
        ['text', 'color'],
        ['border', 'border-color'],
        ['border-t', 'border-top-color'],
        ['border-b', 'border-bottom-color'],
        ['border-l', 'border-left-color'],
        ['border-r', 'border-right-color'],
      ].map(([prefix, prop]) => [
        new RegExp(`^@${prefix}-([^/1-9]*)-((?:[1-9]00)|50)(?:/(\\d+))?$`),
        ([, c, w, o]) => {
          if (COLORS.includes(c)) {
            return { [prop]: getColorString(`${c}-${w}`, o) }
          }
          return null
        },
        {
          autocomplete: `@${prefix}-${COLORS_AUTOCOMPLETE_STRING}`,
        }]),
      ['@shadow-cards', { 'box-shadow': '0px 0px 70px rgba(var(--black-700), 0.06);' }],
      ['@shadow-toasts', { 'box-shadow': '0px 0px 50px rgba(var(--black-700), 0.2);' }],
      ['@shadow-tooltips', { 'box-shadow': '0px 0px 50px rgba(var(--black-700), 0.2);' }],
      ['@shadow-dialogs', { 'box-shadow': '0px 0px 100px rgba(var(--black-700), 0.48);' }],
      ['@shadow-buttons', { 'box-shadow': '0px 15px 40px rgba(var(--black-700), 0.4);' }],
      ['@shadow-chips', { 'box-shadow': '0px 0px 20px rgba(var(--black-700), 0.12);' }],
      ['@shadow-card2', { 'box-shadow': '0px 4px 4px rgba(var(--black-700), 0.02), 0px 15px 18px rgba(var(--black-700), 0.06), 0px 20px 40px rgba(var(--black-700), 0.08), 0px 60px 50px rgba(var(--black-700), 0.08);' }],
      ['@shadow-FAB', { 'box-shadow': '0px 4px 4px rgba(var(--black-700), 0.04), 0px 6px 15px rgba(var(--black-700), 0.06), 0px 20px 30px rgba(var(--black-700), 0.06), 0px 40px 50px rgba(var(--black-700), 0.08);' }],
      ['@shadow-float', { 'box-shadow': '0px 2px 10px rgba(var(--black-700), 0.12);' }],
      [/^@z-(.*)$/, ([, z]) => ({ 'z-index': Z_INDEXES[z] }), { autocomplete: `@z-${Z_INDEXES_AUTOCOMPLETE_STRING}` }],
    ],
    layers: {
      components: -1,
      tsitfyComponents: 0,
      shortcuts: 1,
      default: 2,
      utilities: 3,
    },
    shortcuts: [
      {
        mirror: '-scale-x-100%',
      },
      ['@text-h1', 'text-17px font-bold sm:text-25px', { layer: 'tsitfyComponents' }],
      ['@text-h2', 'text-15px font-extrabold sm:text-20px', { layer: 'tsitfyComponents' }],
      ['@text-title', 'text-13px font-extrabold sm:text-15px', { layer: 'tsitfyComponents' }],
      ['@text-subtitle1', 'text-12px font-bold sm:text-13px', { layer: 'tsitfyComponents' }],
      ['@text-subtitle2', 'text-12px font-extrabold sm:text-13px', { layer: 'tsitfyComponents' }],
      ['@text-body', 'text-13px font-bold sm:text-15px', { layer: 'tsitfyComponents' }],
      ['@text-bodyLarge', 'text-15px font-medium sm:text-18px', { layer: 'tsitfyComponents' }],
      ['@text-overline', 'text-11px font-bold sm:text-12px', { layer: 'tsitfyComponents' }],
      ['@landing-card-icon', 'block w-21 h-21 mx-11 flex-shrink-0', { layer: 'tsitfyComponents' }],
      ['@flex-center', 'flex justify-center items-center', { layer: 'tsitfyComponents' }],
      ['@card', 'bg-gradient-to-t from-[rgb(var(--black-50))] rounded-8 md:rounded-10 @shadow-cards', { layer: 'tsitfyComponents' }],
      [/^s-(.*)$/, ([, s]) => `w-${s} h-${s}`, { layer: 'utilities' }],
      [/^(-?m)s-?(\d.*|auto)$/, ([, n, s]) => `rtl:${n}r-${s} ltr:${n}l-${s}`],
      [/^(-?m)e-?(\d.*|auto)$/, ([, n, s]) => `rtl:${n}l-${s} ltr:${n}r-${s}`],
      [/^ps-?(\d.*)$/, ([, s]) => `rtl:pr-${s} ltr:pl-${s}`],
      [/^pe-?(\d.*)$/, ([, s]) => `rtl:pl-${s} ltr:pr-${s}`],
      [/^border-s-(.*)$/, ([, s]) => `rtl:border-r-${s} ltr:border-l-${s}`],
      [/^border-e-(.*)$/, ([, s]) => `rtl:border-l-${s} ltr:border-r-${s}`],
      [/^start-(.*)$/, ([, s]) => `rtl:right-${s} ltr:left-${s}`],
      [/^end-(.*)$/, ([, s]) => `rtl:left-${s} ltr:right-${s}`],
      [/^inset-(\d.*)$/, ([, s]) => `right-${s} left-${s} top-${s} bottom-${s}`],
      [/^rounded-([tb]?)s-(.*)$/, ([, y, s]) => `rtl:rounded-${y}r-${s} ltr:rounded-${y}l-${s}`],
      [/^rounded-([tb]?)e-(.*)$/, ([, y, s]) => `rtl:rounded-${y}l-${s} ltr:rounded-${y}r-${s}`],
      {
        'text-start': 'rtl:text-right ltr:text-left',
        'text-end': 'rtl:text-left ltr:text-right',
        'dir-ltr': '[direction:ltr]',
        'dir-rtl': '[direction:rtl]',
        'dir-start': 'rtl:dir-rtl ltr:dir-ltr',
        'dir-end': 'rtl:dir-ltr ltr:dir-rtl',
        'transform-origin-start': 'rtl:transform-origin-right ltr:transform-origin-left',
        'transform-origin-end': 'rtl:transform-origin-left ltr:transform-origin-right',
        'gradient-2': 'bg-gradient-to-b from-[rgb(var(--black-200))] to-[rgb(var(--black-50))]',
      },
    ],
  }
}
