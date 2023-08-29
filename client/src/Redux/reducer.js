import { FILTER_ACTIVITY, FILTER_CONTINENT, ORDER_ALPH, ORDER_POPULATION, ADD_ACTIVITY,  ADD_COUNTRY, MAKE_COUNTRY_NAME_LIST } from "./types"

const initialState = {
    countryNameList:[],
    allCountries : [],
    activityFilter : [],
    continentFilter : [],
    countriesShown : [],
    activities : []
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case FILTER_ACTIVITY:{

            let toFilter = []
            let done = []
            
            if (action.payload==="showAll") {
                toFilter = [...state.allCountries]
                done = state.continentFilter.filter(country=>toFilter.includes(country))
            } else {
                const activity = state.activities.find(element=>{element.name===action.payload})
                const countriesNames = activity.countries
                
                toFilter = state.allCountries.filter(country=>{countriesNames.includes(country.name)})
                
                done = toFilter.filter (country=>{state.continentFilter.some(country2=>{country.name===country2.name})})
            }
            return ({...state, activityFilter:toFilter, countriesShown:done})
        }

        case FILTER_CONTINENT:{
            
            let toFilter = []
            let done = []
            
            if (action.payload==="showAll") {
                toFilter = [...state.allCountries]
                done = state.activityFilter.filter(country=>toFilter.includes(country))
            } else {
                toFilter = state.allCountries.filter(country=> { 
                    return(
                        country.continent.some(continent=> {
                        return(continent===action.payload)
                        })
                    )
                })
                done = toFilter.filter(country=>{
                    return (state.activityFilter.some(country2=>{
                        return (country.name===country2.name)
                    }))
                })
            }

            return ({...state, continentFilter:toFilter, countriesShown:done})
        }

        case ORDER_ALPH:{
            const orderedCountries = [...state.allCountries]
            if (action.payload === "a") {
                orderedCountries.sort((a,b) =>  {
                    const nameA = a.name.toUpperCase()
                    const nameB = b.name.toUpperCase()
                    if  (nameA < nameB) {
                        return -1
                    }
                    if (nameA > nameB) {
                        return 1
                    }
                    return 0
                })
            } else {
                orderedCountries.sort((a,b) =>  {
                    const nameA = a.name.toUpperCase()
                    const nameB = b.name.toUpperCase()
                    if  (nameA < nameB) {
                        return 1
                    }
                    if (nameA > nameB) {
                        return -1
                    }
                    return 0
                })
            }
            return ({...state, countriesShown:orderedCountries})
        }

        case ORDER_POPULATION:{
            const orderedCountries = [...state.allCountries]
            if (action.payload === "a") {
                orderedCountries.sort((a,b) =>  {
                    if  (a.population < b.population) {
                        return -1
                    }
                    if (a.population > b.population) {
                        return 1
                    }
                    return 0
                })
            } else {
                orderedCountries.sort((a,b) =>  {
                    if  (a.population < b.population) {
                        return 1
                    }
                    if (a.population > b.population) {
                        return -1
                    }
                    return 0
                })
            }
            return ({...state, countriesShown:orderedCountries})

        }
        
        case ADD_ACTIVITY:{
            const copyActivities = [...state.activities]
            copyActivities.push(action.payload)
            
            return ({...state, activities:copyActivities})
        }
        

        case ADD_COUNTRY:{

            let notAdded = []

            notAdded = action.payload.filter(country=>{ 
                return (!state.allCountries.some(country2=> {
                    return (country.name === country2.name)
                }))
            })

            const copyAll = [...state.allCountries, ...notAdded]
            const copyActivityFilter = [...state.activityFilter, ...notAdded]
            const copyContinentFilter = [...state.continentFilter, ...notAdded]
            const copyShown = [...state.countriesShown, ...notAdded]

            return({...state, allCountries:copyAll, activityFilter:copyActivityFilter, continentFilter:copyContinentFilter, countriesShown:copyShown})
            
            
        }

        case MAKE_COUNTRY_NAME_LIST: {
            return{...state, countryNameList:action.payload}

        }

        default : {
            return{...state}
        }
    }
}

export default reducer