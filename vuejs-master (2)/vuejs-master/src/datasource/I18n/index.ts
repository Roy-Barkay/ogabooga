export async function Static_I18n_GetStrings(language: Language) {
  const module = await import(`@@/datasource/I18n/translations/${language}.json`)
  return module.default as Record<string, string>
}
