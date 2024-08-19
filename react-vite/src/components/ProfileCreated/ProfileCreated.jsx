import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate, NavLink } from "react-router-dom";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import { getAllPins } from "../../redux/pins";
import { fetchAllBoards } from "../../redux/board";
import EditPin from "../EditPin/EditPin";
import AddBoardPin from "../AddBoardPin/AddBoardPin";

const ProfileCreated = () => {
    const user = useSelector((state) => state.session.user);
    const pinsObj = useSelector((state) => state.pinState.pins);
    const pins = Object.values(pinsObj);
    const userPins = pins.filter((pin) => pin.user_id === user.id);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { userId } = useParams();

    useEffect(() => {
        if (!user || user.id !== +userId) {
            navigate("/");
        }
    }, [user, userId, navigate]);

    useEffect(() => {
        dispatch(getAllPins());
        dispatch(fetchAllBoards());
    }, [dispatch]);

    if (!pins.length) {
        return <div className="loading-message">Loading pin data...</div>;
    }

    return (
        <div className="created-grid">
            {userPins.map((pin) => (
                <NavLink key={pin.id} to={`/pin/${pin.id}`}>
                    <div key={pin.id} className="profile-pin-container">
                        <img
                            src={pin.img_url}
                            alt={pin.title}
                            onClick={() => navigate(`/pin/${pin.id}`)}
                        />
                        <div className="profile-image-overlay">
                            <OpenModalButton
                                buttonText="Save"
                                modalComponent={<AddBoardPin />}
                                className="add-board-pin-button"
                                pinId={pin.id}
                            />
                            <OpenModalButton
                                buttonText="Edit"
                                modalComponent={<EditPin />}
                                className="profile-edit-button"
                                pinId={pin.id}
                            />
                        </div>
                    </div>
                </NavLink>
            ))}
        </div>
    );
};

export default ProfileCreated;
