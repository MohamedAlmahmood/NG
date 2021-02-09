import React from 'react'
import {Link} from 'react-router-dom'

function NavBar(){
    return(
        <ul>
            <li><Link to="/">login</Link></li>
            <li><Link to="/Home">Home</Link></li>
        </ul>
    )

}
export default NavBar;