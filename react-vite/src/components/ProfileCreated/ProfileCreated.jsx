import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate, NavLink } from "react-router-dom";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import { getAllPins } from "../../redux/pins";
import { fetchAllBoards, postBoardPin } from "../../redux/board";
import EditPin from "../EditPin/EditPin";
import AddBoardPin from "../AddBoardPin/AddBoardPin";

const ProfileCreated = () => {
    const user = useSelector((state) => state.session.user);
    const pinsObj = useSelector((state) => state.pinState.pins);
    const boardsObj = useSelector((state) => state.boardState);
    const pins = Object.values(pinsObj);
    const boards = Object.values(boardsObj);
    const userPins = pins.filter((pin) => pin.user_id === user.id);
    const userBoards = boards.filter((board) => board.user_id === user.id);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { userId } = useParams();

    const [selectedBoardPin, setSelectedBoardPin] = useState({
        boardId: null,
        pinId: null,
    });
    const [savedPins, setSavedPins] = useState({});

    const handleSelectedBoard = (boardId, pinId) => {
        setSelectedBoardPin({ boardId, pinId });
    };

    const selectedBoard = userBoards.filter(board => board.id === selectedBoardPin.boardId)

    const handleSavePin = async () => {
        if (selectedBoardPin.boardId && selectedBoardPin.pinId) {
            // Dispatch the postBoardPin thunk action
            await dispatch(
                postBoardPin(selectedBoardPin.boardId, selectedBoardPin.pinId)
            );

            // Update the savedPins state to reflect that this pin is saved
            setSavedPins((prev) => ({
                ...prev,
                [`${selectedBoardPin.pinId}-${selectedBoardPin.boardId}`]: true,
            }));
        }
    };


    useEffect(() => {
        if (!user || user.id !== +userId) {
            navigate("/");
        }
    }, [user, userId, navigate]);

    useEffect(() => {
        dispatch(getAllPins());
        dispatch(fetchAllBoards());
    }, [dispatch]);

    return (
        <div className="created-grid">
            {userPins.map((pin) => (
                <NavLink key={pin.id} to={`/pin/${pin.id}`}>
                    <div className="profile-pin-container">
                        <img src={pin.img_url} alt={pin.title} />
                        <div className="profile-image-overlay">
                            <OpenModalButton
                                buttonText={selectedBoard[0]?.name || "Add to Board"}
                                modalComponent={
                                    <AddBoardPin
                                        onSelectBoard={
                                            handleSelectedBoard
                                        }
                                    />
                                }
                                pinId={pin.id}
                                className="add-board-pin-button"
                            />
                            <button
                            className={`save-button ${savedPins[`${pin.id}-${selectedBoardPin.boardId}`] ? 'saved' : ''}`}
                            onClick={handleSavePin}
                            disabled={savedPins[`${pin.id}-${selectedBoardPin.boardId}`]}
                            >
                                    {savedPins[`${pin.id}-${selectedBoardPin.boardId}`] ? "Saved" : "Save"}
                            </button>
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
