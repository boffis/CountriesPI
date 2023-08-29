
import { NavLink } from "react-router-dom"

function Landing (props) {
    return (
        <div>
            <div>
                Countries PI
            </div>
            <div>
                <NavLink to={"/home"}>
                    <button>
                        Home
                    </button>
                </NavLink>
            </div>
        </div>
    )
}

export default Landing