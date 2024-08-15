import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink } from 'react-router-dom';
// import * as boardActions from 


function PinComponent(){
    const [hovered, setHovered] = useState(false);
    // const dispatch = useDispatch();
    // const boards = useState((state)=> state.boards)
    // const user = useSelector((state) => state.session.user);
    
    //! GET CURR USER BOARDS 
    // useEffect((user.id) => {
    //     dispatch()
    // },[dispatch])

    const handleHover = () => {
        setHovered(true)
    }

    const handleNotHovered = () => {
        setHovered(false)
    }


    // ! Waiting on thunks
    // const handleAddToBoard = () => {

    // }

    // const handleFave = () => {

    // }

    return(
        <div className="pin" onMouseEnter={handleHover} onMouseLeave={handleNotHovered}>
            <NavLink to={`/pin/${pin.id}`}>
                <img src={pin.img_url} alt={pin.title} className="img" />
                {hovered && (
                    <div className="overlay">
                        <h4>{title}</h4>
                        {/* DROP DOWN FOR BOARDS */}
                        {/* <button onClick={handleFave}></button> */}
                    </div>
                )}
            </NavLink>
        </div>
    )
}

export default PinComponent;