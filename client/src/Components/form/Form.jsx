import axios from "axios"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import validaton from "./validation"

function Form (props) {
    const [newActivity, setNewActivity] = useState({name:"", difficulty:"", duration:"", season:[], countries:[]})

    const [errors, setErrors]=useState({})
    
    const countryNames = useSelector (state=> state.countryNameList)

    const [countrySearch, setCountrySearch] = useState("")

    const [countriesShown, setCountriesShown] = useState(countryNames)

    
    const [countriesSelectedHTML, setCountriesSelectedHTML] = useState([])




    const handleChange = (event) => {
        const {name, value} = event.target
        setNewActivity({...newActivity, [name]:value})
    }

    const handleChangeSearch = (event) => {
        const {value} = event.target
        setCountrySearch(value)
    }
    

    const handleCheck = (event) => {
        const {checked, name} = event.target;
        let newCountries = [...newActivity.countries]

        if (checked){

            newCountries.push (name)
            setNewActivity({
                ...newActivity, countries:newCountries
            }) 
        } else {
            newCountries.splice (newCountries.indexOf(name),1)
            setNewActivity({
                ...newActivity, countries:newCountries
            })
        }
        
    }

    const seasons = ["Spring", "Summer", "Fall", "Winter"]
    
    const seasonChecks = seasons.map(season => {
        
        return(
            <li>
                <label>{season}</label>
                <input type="checkbox" name={season} id={season} value={season}  />
            </li>
        )
    })
    
        let countryChecks = countriesShown.map(country => {
            let checked = false
            newActivity.countries.includes(country) ? checked = true : null;

            return(
                <li>
                    <label>{country}</label>
                    <input type="checkbox" name={country} id={country} value={country} 
                    checked = {checked}
                    onChange={handleCheck}/>
                </li>
            )
        })
        const [errorHtml, setErrorHtml] = useState({
            name : null,
            difficulty : null,
            season : null,
            country : null
        }) 

        const handleSubmit = async () => {
            try {
                setErrors(validaton())
                const errorKeys = Object.keys(errors)
                if (errorKeys.length > 0) {
                    let toBeErrorHtml = {}
                    for (const key of errorKeys) {
                        toBeErrorHtml[key] = <p>{errors[key]}</p>

                    }
                    setErrorHtml(toBeErrorHtml)
                }
                else {
                    
                }
            }
            catch (error) {
                console.log (error)
            }
        }

    useEffect(()=>{
        let toShowCountries = countryNames.filter(name => {
            const realName = name.toUpperCase()
            const realSearch = countrySearch.toUpperCase()
            if (realName.includes(realSearch)){
                return true
            }
            return false
        })
        setCountriesShown(toShowCountries)
    },[countrySearch])
    
    let selectedCountryFunction = ()=>{
        
        let selectedCountryList = newActivity.countries.map(country=>{
        return(
            <li>
                {country}
            </li>
        )
        })
        if (newActivity.countries.length > 0 ){
            return(
            <ul>
                {selectedCountryList}
            </ul>
                )
        } else {
            return(
            <p>
                No countries selected
            </p>
                )
        }
    }

    useEffect(()=>{
        setCountriesSelectedHTML(selectedCountryFunction())
    },[newActivity.countries])



    return (
        <div>
            <form>
                <label>Name: </label>
                <input type="text" name="name" id="name" value={newActivity.name} onChange={handleChange}/>

                <label>Difficulty: </label>
                <input type="text" name="difficulty" value={newActivity.difficulty} onChange={handleChange}/>

                <label>Duration: </label>
                <input type="text" name="duration" value={newActivity.duration} onChange={handleChange}/>

                <label>Seasons:</label>
                <ul>
                    {seasonChecks}
                </ul>
                <p>
                    Countries Selected:
                </p>
                
                {countriesSelectedHTML}

                <label>Countries:</label>
                <input type="text" name="countrySearch" id="countrySearch" value={countrySearch} onChange={handleChangeSearch}/>
                <ul>
                {countryChecks}
                </ul>

                <button>
                    Submit
                </button>
            </form>
        </div>
    )
}


export default Form