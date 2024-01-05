import { Static_Countries_Get } from '../datasource/browser/countries'
let countries: string[][]

export async function Countries_GetCountries() {
  countries = await Static_Countries_Get()
  return countries
}
