import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate, NavLink } from "react-router-dom";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import "./ProfilePage.css";
import { getAllPins } from "../../redux/pins";
import { fetchAllBoards, postBoardPin } from "../../redux/board";
import EditPin from "../EditPin/EditPin";
import AddBoardPin from "../AddBoardPin/AddBoardPin";

const Profile = () => {
    const user = useSelector((state) => state.session.user);
    const pinsObj = useSelector((state) => state.pinState.pins);
    const boardsObj = useSelector((state) => state.boardState);
    const pins = Object.values(pinsObj);
    const boards = Object.values(boardsObj);
    const userPins = pins.filter((pin) => pin.user_id === user.id);
    const userBoards = boards.filter((board) => board.user_id === user.id);
    const [selectedBoardPin, setSelectedBoardPin] = useState({
        boardId: null,
        pinId: null,
    });
    const [savedPins, setSavedPins] = useState({});

    const handleSelectedBoard = (boardId, pinId) => {
        setSelectedBoardPin({ boardId, pinId });
    };

    const selectedBoard = userBoards.filter(board => board.id === selectedBoardPin.boardId)

    console.log('AAAAAAAAAAAAAAAA', selectedBoard[0].name)

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

    const [activeTab, setActiveTab] = useState("saved");

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

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    return (
        <div id="profile-page-container">
            <div id="profile-top-container">
                <div id="profile-user-container">
                    <span id="profile-picture">{user.last_name[0]}</span>
                    <h1>
                        {user.first_name} {user.last_name}
                    </h1>
                    <p>{user.username}</p>
                    <div className="profile-buttons">
                        <button>Share</button>
                        <button>Edit profile</button>
                    </div>
                </div>
                <div className="profile-links">
                    <div
                        className={activeTab === "created" ? "active" : ""}
                        onClick={() => handleTabChange("created")}
                    >
                        Created
                    </div>
                    <div
                        className={activeTab === "saved" ? "active" : ""}
                        onClick={() => handleTabChange("saved")}
                    >
                        Saved
                    </div>
                    <div
                        className={activeTab === "favorites" ? "active" : ""}
                        onClick={() => handleTabChange("favorites")}
                    >
                        Favorites
                    </div>
                </div>
            </div>
            {activeTab === "saved" && (
                <div className="profile-middle-container">
                    <button>
                        <i className="fa-solid fa-sort"></i>
                    </button>
                    <button>
                        <i className="fa-solid fa-plus"></i>
                    </button>
                </div>
            )}
            <div className="profile-bottom-container">
                {activeTab === "created" && (
                    <div className="created-grid">
                        {userPins.map((pin) => (
                            <NavLink key={pin.id}>
                                <div className="profile-pin-container">
                                    <img src={pin.img_url} alt={pin.title} />
                                    <div className="profile-image-overlay">
                                        <OpenModalButton
                                            buttonText={selectedBoard[0]?.name}
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
                )}

                {activeTab === "saved" && (
                    <div className="profile-board-grid">
                        {userBoards.map((board) => (
                            <NavLink key={board.id} to={`/boards/${board.id}`}>
                                <div className="profile-board-container">
                                    <div className="profile-board-image-container">
                                        {board.name !== "All Pins" && (
                                            <button className="profile-board-edit-button">
                                                Edit
                                            </button>
                                        )}
                                    </div>
                                    <div className="profile-board-title-container">
                                        <p className="profile-board-title">
                                            {board.name}
                                        </p>
                                    </div>
                                </div>
                            </NavLink>
                        ))}
                    </div>
                )}

                {activeTab === "favorites" && <div>Favorites place holder</div>}
            </div>
        </div>
    );
};

export default Profile;
