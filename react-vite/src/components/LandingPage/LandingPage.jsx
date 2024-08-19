import { useEffect, useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as pinActions from "../../redux/pins";
import { NavLink } from "react-router-dom";
import "./LandingPage.css";
import * as boardActions from "../../redux/board";

const stopBounce = (func, wait) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
};

function LandingPage() {
  const dispatch = useDispatch();
  const [savedPins, setSavedPins] = useState({});
  const [selectedBoardId, setSelectedBoardId] = useState(null);

  const currentUserId = useSelector((state) => state.session.user?.id);
  const { pins, page, pageSize, hasMore, loading } = useSelector(
    (state) => state.pinState || {}
  );
  const boards = useSelector((state) => state.boardState || []);
  const boardsObj = Object.values(boards);

  useEffect(() => {
    dispatch(pinActions.resetPins());
    dispatch(pinActions.getAllPinsWPagination(1, pageSize));
  }, [dispatch, pageSize]);

  useEffect(() => {
    dispatch(boardActions.fetchAllBoards());
  }, [dispatch]);

  useEffect(() => {
    if (hasMore && !loading) {
      dispatch(pinActions.getAllPinsWPagination(page, pageSize));
    }
  }, [dispatch, page, pageSize, hasMore, loading]);

  const handleScroll = stopBounce(() => {
    const { scrollTop, scrollHeight, clientHeight } =
      document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight - 5 && hasMore && !loading) {
      dispatch(pinActions.setPage(page + 1));
    }
  }, 300);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

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

  const displayPins = useMemo(() => Object.values(pins), [pins]);
  // console.log("Loading:", loading);
  // console.log("Page:", page);
  // console.log("Has More:", hasMore);

  return (
    <div className="pins-message">
      <div className="created-grid-container">
        {!loading && displayPins.length > 0 && (
          <div className="landing">
            {displayPins.map(({ id, img_url }) => (
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
        )}
      </div>
      {/* Render no pins message outside of the .pins-wrapper */}
        {/* {loading && (
          <p className="loading-message">
            {page === 1 ? "Loading pins..." : "Loading more pins..."}
          </p>
        )} */}
      {!loading && !hasMore && (
        <div className="no-pins-message">No more pins available.</div>
      )}
    </div>
  );
}

export default LandingPage;
