import { useEffect, useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as pinActions from "../../redux/pins";
import { NavLink, useParams } from "react-router-dom";
import "./LandingPage.css";

// import PinComponent from './PinComponent'


function SearchPins() {
  const dispatch = useDispatch();
  const [selectedBoardId, setSelectedBoardId] = useState(null);
  const [savedPins, setSavedPins] = useState({});

  const { keyword } = useParams();

  const currentUserId = useSelector((state) => state.session.user?.id);
  
  const boards = useSelector((state) => state.boardState || []);
  const boardsObj = Object.values(boards);
  
  useEffect(() => {
    dispatch(boardActions.fetchAllBoards());
  }, [dispatch]);

  const userBoards = useMemo(
    () => boardsObj.filter((board) => board.user_id === currentUserId),
    [boardsObj, currentUserId]
  );

  const allPinsBoard = useMemo(
    () =>
      boardsObj.find(
        (board) => board.name === "All Pins" && board.user_id === currentUserId
      ),
    [boardsObj, currentUserId]
  );

  const handleSave = (pinId) => {
    if (selectedBoardId && allPinsBoard) {
      dispatch(boardActions.postBoardPin(selectedBoardId, pinId));
      setSavedPins((prevState) => ({
        ...prevState,
        [selectedBoardId]: new Set(prevState[selectedBoardId] || []).add(pinId),
      }));
    }
  };

  const isPinSaved = (pinId, boardId) => {
    return savedPins[boardId]?.has(pinId);
  };

  const pins = useSelector((state) => state.pinState.pins || {});

  const allPins = Object.values(pins);

  const filtered = allPins.filter((pin) =>
    pin.title.toLowerCase().includes(keyword.toLowerCase())
  );

  useEffect(() => {
    dispatch(pinActions.getAllPins());
  }, [dispatch]);

  return (
    <div className="created-grid-container">
      {filtered && filtered.length > 0 ? (
        <div className="search">
          {filtered.map(({ id, img_url }) => (
            <NavLink key={id} to={`/pin/${id}`}>
              <div className="pin-container">
                <img src={img_url} alt={`Pin ${id}`} />
                <div className="image-overlay">
                  <div className="board-container">
                    <h4 className="save-to-board-text">Save to Board</h4>
                    <select
                      className="overlay-text"
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
                    className={`landing-save-button ${
                      isPinSaved(id, selectedBoardId) ? "saved" : ""
                    }`}
                    onClick={() => handleSave(id)}
                  >
                    {isPinSaved(id, selectedBoardId) ? "Saved" : "Save"}
                  </button>
                </div>
              </div>
            </NavLink>
          ))}
        </div>
      ) : (
        <div className="no-results">
          <p>No pins with {keyword} in their title were found.</p>
        </div>
      )}
    </div>
  );
}

export default SearchPins;
