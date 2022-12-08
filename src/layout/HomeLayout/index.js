import './style.css';

const HomeLayout = ({nav,categoriesList,Ad,children}) => (
    <div className = "homelayout">
        {/* Categories */}
        {nav}
        <div className = "wrapper main">
            {Ad}
            {categoriesList}
            {children}
        </div>
    </div>
)

export default HomeLayout;