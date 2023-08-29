import { NavLink } from "react-router-dom"

function Card (props) {
    const {country} = props
    const continentList = country.continent.map(continent=>{
        return(
            <li key={continent}>
                {continent}
            </li>
        )
    })

    return (
        <div>
            <NavLink to={`/detail/${country.id}`}>
            <h3>{country.name}</h3>
            </NavLink>
            <img src={country.flag} alt={country.name} />
            <ul>
                {continentList}
            </ul>
        </div>
    )
}
export default Card