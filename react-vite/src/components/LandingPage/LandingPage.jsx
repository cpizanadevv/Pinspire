import { useCallback, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as pinActions from "../../redux/pins";
import { NavLink } from "react-router-dom";
import "./LandingPage.css";
import * as boardActions from "../../redux/board";

function LandingPage() {
<<<<<<< HEAD
    const dispatch = useDispatch();
    const [shuffledPins, setShuffledPins] = useState([]);
    const [savedPins, setSavedPins] = useState({}); // State to track saved pins by board
    // const [pinId, setPinId] = useState(null);
    const [selectedBoardId, setSelectedBoardId] = useState(null);

    const currentUserId = useSelector((state) => state.session.user?.id);
    const pins = useSelector((state) => state.pinState.pins || {});
    const boards = useSelector((state) => state.boardState || []);
    const boardsObj = Object.values(boards);
=======
  const dispatch = useDispatch();
  const [savedPins, setSavedPins] = useState({});
  const [selectedBoardId, setSelectedBoardId] = useState(null);

  const currentUserId = useSelector((state) => state.session.user.id);
  const { pins, page, pageSize, hasMore, loading } = useSelector(
    (state) => state.pinState
  );
  const boards = useSelector((state) => state.boardState || []);
  const boardsObj = Object.values(boards);
>>>>>>> 90bb0bc (Add favorites thunk and store)

  const allPins = Object.values(pins);

  useEffect(() => {
    dispatch(pinActions.resetPins());
    dispatch(pinActions.getAllPinsWPagination(1, pageSize));
  }, [dispatch, pageSize]);

  useEffect(() => {
    if (hasMore && !loading) {
      dispatch(pinActions.getAllPinsWPagination(page, pageSize));
    }
  }, [dispatch, page, pageSize, hasMore, loading]);

  useEffect(() => {
    dispatch(boardActions.fetchAllBoards());
  }, [dispatch]);

<<<<<<< HEAD
    // const handlePinHover = (id) => {
    //     // setPinId(id);
    // };
=======
  const userBoards = boardsObj.filter(
    (board) => board.user_id === currentUserId
  );
  const allPinsBoard = boardsObj.find(
    (board) => board.name === "All Pins" && board.user_id === currentUserId
  );
>>>>>>> 90bb0bc (Add favorites thunk and store)

  const handleSave = (pinId) => {
    if (selectedBoardId) {
      dispatch(boardActions.postBoardPin(selectedBoardId, pinId));

      // Update savedPins state immutably
      setSavedPins((prevState) => ({
        ...prevState,
        [selectedBoardId]: new Set([
          ...(prevState[selectedBoardId] || []),
          pinId,
        ]),
      }));
    }
  };

  const isPinSaved = (pinId, boardId) => {
    return savedPins[boardId]?.has(pinId);
  };

<<<<<<< HEAD
    return (
        <div className="created-grid-container">
            {shuffledPins.map(({ id, img_url }) => (
                // <NavLink key={id} to={`/pin/${id}`}>
                <NavLink key={id}>
                    <div className="pin-container"

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
=======
  // Handle scrolling for infinite scroll
  const handleScroll = useCallback(() => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight - 5 && hasMore && !loading) {
      dispatch(pinActions.setPage(page + 1)); // Increment page in state
    }
  }, [dispatch, hasMore, loading, page]);

  // Attach and detach scroll event listener
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <div className="created-grid">
      {allPins.map(({ id, img_url }) => (
        <div key={id} className="profile-pin-container">
          <NavLink to={`/pin/${id}`}>
            <img src={img_url} alt="Pin" />
          </NavLink>
          <div className="profile-image-overlay">
            <div className="board-container">
              <h4 className="save-to-board-text">Save to Board</h4>
              <select
                className="profile-overlay-text"
                value={selectedBoardId || ""}
                onChange={(e) => setSelectedBoardId(e.target.value)}
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
              className={`save-button ${
                isPinSaved(id, selectedBoardId) ? "saved" : ""
              }`}
              onClick={() => handleSave(id)}
              disabled={!selectedBoardId || isPinSaved(id, selectedBoardId)}
            >
              {isPinSaved(id, selectedBoardId) ? "Saved" : "Save"}
            </button>
          </div>
>>>>>>> 90bb0bc (Add favorites thunk and store)
        </div>
      ))}
      {loading && (
        <div className="loading-message">
          <h3>Loading more pins...</h3>
        </div>
      )}
    </div>
  );
}
export default LandingPage;
