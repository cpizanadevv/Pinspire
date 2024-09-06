import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate, NavLink } from "react-router-dom";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import { getPinsByUser } from "../../redux/pins";
import { fetchAllBoards } from "../../redux/board";
import EditPin from "../EditPin/EditPin";
import AddBoardPin from "../AddBoardPin/AddBoardPin";
import Loader from "../Loader/Loader";

const ProfileCreated = () => {
    const user = useSelector((state) => state.session.user);
    const pinsObj = useSelector((state) => state.pinState.userPins);
    const userPins = Object.values(pinsObj);


    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { userId } = useParams();

    useEffect(() => {
        if (!user || user.id !== +userId) {
            navigate("/");
        }
    }, [user, userId, navigate]);

    useEffect(() => {
        dispatch(getPinsByUser(userId));
        dispatch(fetchAllBoards());
    }, [dispatch]);

    if (!userPins.length) {
        return <div className="loading-message">You haven&apos;t made any pins yet</div>;
    }

    return (
        <div className="created-grid">
            {!userPins && <Loader/>}
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
