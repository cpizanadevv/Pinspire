import { useEffect, useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as pinActions from "../../redux/pins";
import { NavLink } from "react-router-dom";
import "./LandingPage.css";
// import PinComponent from './PinComponent'
import * as boardActions from "../../redux/board";
// Function to shuffle pins on load to show variety
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function LandingPage() {
    const dispatch = useDispatch();
    const [shuffledPins, setShuffledPins] = useState([]);
    const [savedPins, setSavedPins] = useState({}); // State to track saved pins by board
    // const [pinId, setPinId] = useState(null);
    const [selectedBoardId, setSelectedBoardId] = useState(null);

    const currentUserId = useSelector((state) => state.session.user.id);
    const pins = useSelector((state) => state.pinState.pins || {});
    const boards = useSelector((state) => state.boardState || []);
    const boardsObj = Object.values(boards);

    useEffect(() => {
        dispatch(pinActions.getAllPins());
        dispatch(boardActions.fetchAllBoards());
    }, [dispatch]);

    const memoizedShuffledPins = useMemo(() => {
        const allPins = Object.values(pins);
        return shuffleArray([...allPins]);
    }, [pins]);

    useEffect(() => {
        setShuffledPins(memoizedShuffledPins);
    }, [memoizedShuffledPins]);

    const userBoards = boardsObj.filter(
        (board) => board.user_id === currentUserId
    );
    const allPinsBoard = boardsObj.find(
        (board) => board.name === "All Pins" && board.user_id === currentUserId
    );

    // const handlePinHover = (id) => {
    //     // setPinId(id);
    // };

    const handleSave = (pinId) => {
        if (selectedBoardId && allPinsBoard) {
            dispatch(boardActions.postBoardPin(selectedBoardId, pinId));

            // Update savedPins state to reflect the pin saved to the selected board
            setSavedPins((prevState) => ({
                ...prevState,
                [selectedBoardId]: new Set(
                    prevState[selectedBoardId] || []
                ).add(pinId),
            }));
        }
    };

    const isPinSaved = (pinId, boardId) => {
        return savedPins[boardId]?.has(pinId);
    };

    return (
        <div className="created-grid-container">
            {shuffledPins.map(({ id, img_url }) => (
                <NavLink key={id}>
                    <div
                        className="pin-container"
                        // onMouseEnter={() => handlePinHover(id)}
                    >
                        <img src={img_url} alt={`Pin ${id}`} />
                        <div className="image-overlay">
                            <div className="board-container">
                                <h4 className="save-to-board-text">
                                    Save to Board
                                </h4>
                                <select
                                    className="overlay-text"
                                    value={selectedBoardId || ""}
                                    onChange={(e) =>
                                        setSelectedBoardId(e.target.value)
                                    }
                                >
                                    <option value="" disabled>
                                        Select a Board
                                    </option>
                                    {userBoards.map((board) => (
                                        <option key={board.id} value={board.id}>
                                            {board.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <button
                                className={`landing-save-button ${
                                    isPinSaved(id, selectedBoardId)
                                        ? "saved"
                                        : ""
                                }`}
                                onClick={() => handleSave(id)}
                            >
                                {isPinSaved(id, selectedBoardId)
                                    ? "Saved"
                                    : "Save"}
                            </button>
                        </div>
                    </div>
                </NavLink>
            ))}
        </div>
    );
}

export default LandingPage;
