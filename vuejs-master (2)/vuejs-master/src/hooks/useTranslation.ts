import { useI18nStore } from '@@/repository/I18n'

export function useTranslation() {
  const i18nStore = useI18nStore()
  const { __ } = i18nStore

  return __
}
