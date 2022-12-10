import { Logo } from "../../components";
import './style.css';

const SimpleLayout = ({children}) => (
    <div className = "simpleLayout">
        <div className = "logo-area bordered">
            <Logo />
        </div>
        <div className = "main wrapper">
            {children}
        </div>
    </div>
)

export default SimpleLayout;