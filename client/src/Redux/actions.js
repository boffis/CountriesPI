import { FILTER_ACTIVITY, FILTER_CONTINENT, ORDER_ALPH, ORDER_POPULATION, ADD_ACTIVITY, ADD_COUNTRY, MAKE_COUNTRY_NAME_LIST } from "./types";

export const filterActivity = (activity) => {
    return({
        type:FILTER_ACTIVITY,
        payload:activity
    })
}

export const filterContinent = (continent) => {
    return({
        type:FILTER_CONTINENT,
        payload:continent
    })
}

export const orderAlph = (order) => {
    return({
        type:ORDER_ALPH,
        payload:order
    })
}
export const orderPop = (order) => {
    return({
        type:ORDER_POPULATION,
        payload:order
    })
}

export const addCountry = (country) => {
    return({
        type:ADD_COUNTRY,
        payload:country
    })
}
export const addActivity = (activity) => {
    return({
        type:ADD_ACTIVITY,
        payload:activity
    })
}

export const makeCountryNameList = (list) => {
    return({
        type:MAKE_COUNTRY_NAME_LIST,
        payload:list
    })
}