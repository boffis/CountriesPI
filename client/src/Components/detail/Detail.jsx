import { useParams } from "react-router-dom"
import axios from "axios"
import { useEffect, useState } from "react"

function Detail (props) {
    const [country, setCountry]=useState(null)
    const {id} = useParams()

    useEffect(()=>{
        const fetchData = async ()=>{
            const response = await axios(`http://localhost:3001/countries/${id}`)
            setCountry(response.data)
            console.log(response.data)
        }
        fetchData() 
    }
    ,
    [id])

    if (!country) {
        return (
            <div>
                <h1>
                    loading
                </h1>
            </div>
        )
    }

    let continentList = country.continent.map (continent=>{
        return(
            <li key={continent}>
                {continent}
            </li>
        )
    })
    
    if (!country.subregion) {
        country.subregion = "N/A"
    }

    if (!country.area) {
        country.area = "N/A"
    }
    return(
        <div>
            <p>
                {id}
            </p>
            <h1>
                {country.name}
            </h1>
            <img src={country.flag} alt={country.name} />
            <h2>
                Capital: {country.capital}
            </h2>
            <ul>
                {continentList}
            </ul>
            <p>
                sub-region: {country.subregion}
            </p>
            <p>
                area: {country.area}
            </p>
            <p>
                population: {country.population}
            </p>
        </div>
    )


}

export default Detail