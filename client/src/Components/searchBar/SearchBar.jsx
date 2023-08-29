import { useState } from "react"
import axios from "axios"
import { useDispatch } from "react-redux"
import { addCountry, filterActivity, filterContinent} from "../../Redux/actions"

function SearchBar (props) {
    const [name, setName] = useState("")
    const dispatch = useDispatch()

    const handleChange = (event) =>{
        setName(event.target.value)
    }

    const onSearch = async (search) => {
        try {
            let result = await axios(`http://localhost:3001/countries/name?name=${search}`)
            if (result.data.length > 0){  
            dispatch(addCountry(result.data))} 
            else {
                window.alert ("search did not match with any country")
            }

        dispatch (filterActivity(props.currentActivityFilter))
        dispatch (filterContinent(props.currentContinentFilter))
        }
        catch (error) {
            window.alert ("error searching country")
        }
    }

    return (
        <div>
            <input 
            type="text" 
            id="search" 
            name="search" 
            onChange={handleChange} />
            
            <button onClick={()=>(onSearch(name))}>
                add
            </button>
        </div>
    )
}

export default SearchBar