
import { Nav,SearchBar } from '../../components';

import './style.css';

const OtherLayout = ({searchBarType,children}) => (
    <div className="otherlayout">
        <Nav
            burger = {false}
        >
            <SearchBar 
                placeholder = "Search for anything"
            //   onSubmit = {searchHandler}
                type = {searchBarType}
            />
        </Nav>
        <div className="main wrapper">
            {children}
        </div>
    </div>
)

export default OtherLayout;