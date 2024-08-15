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
        <div className="pins">
            {allPins && allPins.map(({
                id,
                img_url,
                // user_id,
                // title,
                // description,
                // link
            }) =>(
                <div key={id} className="pin">
                    <NavLink key={id} to={`/pin/${id}`}><img src={img_url} alt="" className="img"/></NavLink>
                </div>
                
            ))}
        
            
        </div>
        

    )
    
}

export default LandingPage;