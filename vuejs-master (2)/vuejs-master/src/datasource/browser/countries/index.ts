export async function Static_Countries_Get() {
  const module = await import(`./countries.json`)
  return module.default
}
