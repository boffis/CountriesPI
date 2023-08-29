import Card from '../card/Card'
import { useState } from 'react'
import {useSelector} from "react-redux"

function Home (props) {

    const countriesShown = useSelector(state=>state.countriesShown)

    const [currentPage, setCurrentPage] = useState(1)

    
    const itemsPerPage = 10

    
    let startIndex = (currentPage-1) * itemsPerPage
    let endIndex = startIndex + itemsPerPage
    let currentCountries = countriesShown.slice (startIndex, endIndex)
    
    let totalPages = Math.ceil (countriesShown.length / itemsPerPage)
    
    let pageNumbers = []

    for (let i=1;i<=totalPages;i++) {
        pageNumbers.push ( i )
    }
    

    let pageButtons = pageNumbers.map ( number =>{
        return(
            <li key={number}>
                <button onClick={()=>{setCurrentPage(number)}}>
                    {number}
                </button>
            </li>
        )
        })

    let currentCards = currentCountries.map (country => {
        return (
            <li key={country.name}>
                <Card 
                country={country}
                />
            </li>
        )
    })


    return (
        <div>
            <div>
                {currentCards}
            </div>
            <div>
                <ul>
                    {pageButtons}
                </ul>
            </div>
        </div>
    )
}

export default Home