type Position = {
  x: number
  y: number
}

const isOpen = ref(false)
export const Tooltip_IsOpen = readonly(isOpen)

const position = ref<Position>()
export const Tooltip_Position = readonly(position)

const color = ref<'primary' | 'secondary' | 'tertiary' | 'warning' | 'black'>('black')
export const Tooltip_Color = readonly(color)

const title = ref('')
export const Tooltip_Title = readonly(title)

const message = ref('')
export const Tooltip_Message = readonly(message)

export function Tooltip_SetIsOpen(isOpenValue: boolean) {
  isOpen.value = isOpenValue
}

export function Tooltip_SetPosition(thePosition: Position) {
  position.value = thePosition
}

export function Tooltip_SetData(theTitle?: string, theMessage?: string, theColor?: 'primary' | 'secondary' | 'tertiary' | 'warning' | 'black') {
  title.value = ''
  message.value = ''
  color.value = 'black'

  if (theTitle) title.value = theTitle
  if (theMessage) message.value = theMessage
  if (theColor) color.value = theColor
}
