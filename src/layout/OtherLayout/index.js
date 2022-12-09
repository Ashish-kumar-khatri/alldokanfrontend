import './style.css';

const OtherLayout = ({nav,children}) => (
    <div className="otherlayout">
        {nav}
        <div className="main wrapper">
            {children}
        </div>
    </div>
)

export default OtherLayout;