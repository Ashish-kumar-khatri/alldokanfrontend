
import { Nav,SearchBar } from '../../components';

import './style.css';

const OtherLayout = ({nav,children}) => (
    <div className="otherlayout">
        <Nav
            burger = {false}
        >
            <SearchBar 
                placeholder = "Search for anything"
            //   onSubmit = {searchHandler}
            />
        </Nav>
        <div className="main wrapper">
            {children}
        </div>
    </div>
)

export default OtherLayout;