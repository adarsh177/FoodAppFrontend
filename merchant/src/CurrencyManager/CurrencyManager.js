import CountryCodeCurrencyMap from './CountryCodeCurrencyMap.json'
import Currency from './Currency.json'
import * as RNLocalize from "react-native-localize"

export default function GetCurrencySymbol(){
    const countryCode = RNLocalize.getCountry()
    const currency = Currency[CountryCodeCurrencyMap[countryCode]]

    return currency ?? Currency.INR
}
