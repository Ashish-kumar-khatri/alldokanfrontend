import { useEffect } from "react";

const useWindowSize = () => {

    const [width,setWidth] = useState(window.innerWidth);
    const [height,setHeight] = useState(window.innerHeight);

    useEffect(() => {
        window.addEventListener('resize',(e) => {
            console.log('size changing',e)
        })
    },[])

    return {width,height}
}

export default useWindowSize;