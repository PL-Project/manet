import React from 'react'
import {Link} from 'react-router-dom';

class NavbarTop extends React.Component {
    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="nav navbar-nav ml-auto">

                            {
                            }
                            <li className="nav-item active">
                                <Link className="nav-link" to='/Manet'>Manet</Link>

                            </li>
                        </ul>
                    </div>

                </div>

            </nav>


        )
    }
}

export default NavbarTop