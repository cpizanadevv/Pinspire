import { useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import * as pinActions from "../../redux/pins";
import * as boardActions from "../../redux/board";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import AddBoardPin from "../AddBoardPin/AddBoardPin";
import "./LandingPage.css";

const stopBounce = (func, wait) => {
    let timeout;
    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
};

function SearchPins() {
    const dispatch = useDispatch();
    const { keyword } = useParams();

    const pins = useSelector((state) => state.pinState.pins || {} );
    const user = useSelector((store) => store.session.user);
    const allPins = Object.values(pins);

    const filtered = allPins.filter(pin => 
        pin.title.toLowerCase().includes(keyword.toLowerCase())
    );


    useEffect(() => {
        dispatch(pinActions.getAllPins());
        dispatch(boardActions.fetchAllBoards());
    }, [dispatch]);


    return (
        <div className="pins-message">
            <div className="created-grid-container">
                {filtered && filtered.length > 0 ? (
                    <div className="landing">
                        {filtered.map(({ id, img_url }) => (
                            <NavLink key={id} to={`/pin/${id}`}>
                                <div className="pin-container">
                                    <img src={img_url} alt={`Pin ${id}`} />
                                    <div className="image-overlay">
                                        {user && (
                                            <div className="board-container">
                                                <OpenModalButton
                                                    buttonText="Add to Board"
                                                    modalComponent={<AddBoardPin />}
                                                    className="landing-save-button"
                                                    pinId={id}
                                                />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </NavLink>
                        ))}
                    </div>
                ):(
                <div className="no-pins-message">No pins available.</div>
            )}
            </div>
            
        </div>
    );
}

export default SearchPins;
