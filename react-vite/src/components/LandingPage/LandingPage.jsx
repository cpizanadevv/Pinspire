import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as pinActions from '../../redux/pins'
import { NavLink } from "react-router-dom";
import './LandingPage.css'
// import PinComponent from './PinComponent'

// Function to shuffle pins on load to show variety
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}


function LandingPage(){
    const dispatch = useDispatch();

    const pins = useSelector((state) => state.pinState.pins || {} )
    // console.log('THIS IS PINS',pins)
    
    const allPins = Object.values(pins)
    // console.log('THIS IS ALLPINS', allPins)
    shuffleArray(allPins)
    
    useEffect(()=>{
        dispatch(pinActions.getAllPins())
    },[dispatch])

    return (
        <div className="created-grid">
            {allPins && allPins.map(({
                id,
                img_url,
                // user_id,
                // title,
                // description,
                // link
            }) =>(
                <NavLink key={id} to={`/pin/${id}`}>
                    <div className="profile-pin-container">
                        <img src={img_url} />
                        <div className="profile-image-overlay">
                            <p className="profile-overlay-text">Profile</p>
                            <button className="save-button">Save</button>
                            {/* <button>Options</button> */}
                        </div>
                    </div>
                </NavLink>
            ))}
        </div>
    )  
}

export default LandingPage;