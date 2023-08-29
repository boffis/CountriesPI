import { useLocation, NavLink } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { useState, useEffect } from "react"
import { filterActivity, filterContinent, orderAlph, orderPop } from "../../Redux/actions"
import SearchBar from "../searchBar/SearchBar"

function NavBar (props) {
    const [orderDirection, setOrderDirection] = useState("d")
    const [orderType, setOrderType] = useState ("alph")
    const [currentContinentFilter, setCurrentContinentFilter] = useState ("showAll")
    const [currentActivityFilter, setCurrentActivityFilter] = useState ("showAll")

    const location = useLocation()
    const dispatch = useDispatch()

    const activities = useSelector(state => state.activities)
    
    const continents = [
        'Africa',
        'Europe',
        'Oceania',
        'Asia',
        'South America',
        'North America',
        'Antarctica'
    ]

    let activitiesList = activities.map (activity => {
        return(
            <option value={activity.name} key={activity.name}>
                {activity.name}
            </option>
        )
    })

    let continentList = continents.map (continent => {
        return(
            <option value={continent} key={continent}>
                {continent}
            </option>
        )
    })

    const onChangeOrderType = (event) => {
        setOrderType(event.target.value)
        
        event.target.value === "alph" ? 
        dispatch (orderAlph(orderDirection)) 
        : dispatch(orderPop(orderDirection))
    }

    const onChangeOrderDirection = (event) => {
        setOrderDirection (event.target.value) 
        orderType === "alph" ? 
        dispatch (orderAlph(event.target.value)) 
        : dispatch (orderPop(event.target.value))
    }

    const onChangeActivityFilter = (event) => {
        setCurrentActivityFilter(event.target.value)
        dispatch (filterActivity(event.target.value))
    }

    const onChangeContinentFilter = (event) => {
        setCurrentContinentFilter(event.target.value)
        dispatch (filterContinent(event.target.value))
    }



    if (location.pathname === "/home") {

            return(
                <div>
                    <div>
                        <NavLink to={"/form"}>
                            <button>
                                Add your activities!
                            </button>
                        </NavLink>
                        
                        <NavLink to={'/home'}>
                            <button>
                                Home
                            </button>
                        </NavLink>
                    </div>
                    <div>

                        <SearchBar
                        currentActivityFilter = {currentActivityFilter}
                        currentContinentFilter = {currentContinentFilter}
                        />

                        <select name="activities" id="activities" 
                        onChange={onChangeActivityFilter}>
                            <option value="showAll">
                                showAll
                            </option>
                            {activitiesList}
                        </select>
                        <select name="continent" id="continent"
                        onChange={onChangeContinentFilter}>
                            <option value="showAll">
                                showAll
                            </option>
                            {continentList}
                        </select>
                        <select name="orderType" id="orderType" 
                        onChange={onChangeOrderType}>
                            <option value="alph">
                                alphabetically
                            </option>
                            <option value="pop">
                                by population
                            </option>
                        </select>
                        <select name="orderDir" id="orderDir" 
                        onChange={onChangeOrderDirection}>
                            <option value="d">
                                descending
                            </option>
                            <option value="a">
                                ascending
                            </option>
                        </select>
                    </div>
                </div>
            )

        } else {

            return(
                <div>
                    <div>
                        <NavLink to={"/form"}>
                            <button>
                                Add your activities!
                            </button>
                        </NavLink>
                        
                        <NavLink to={'/home'}>
                            <button>
                                Home
                            </button>
                        </NavLink>
                    </div>
                </div>
            )
        }
}

export default NavBar