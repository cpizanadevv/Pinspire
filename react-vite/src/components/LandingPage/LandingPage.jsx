import { useEffect, useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as pinActions from "../../redux/pins";
import { NavLink } from "react-router-dom";
import "./LandingPage.css";
import * as boardActions from "../../redux/board";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import AddBoardPin from "../AddBoardPin/AddBoardPin";

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
        if (
            scrollTop + clientHeight >= scrollHeight - 5 &&
            hasMore &&
            !loading
        ) {
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

    // const allPinsBoard = useMemo(
    //     () =>
    //         boardsObj.find(
    //             (board) =>
    //                 board.name === "All Pins" && board.user_id === currentUserId
    //         ),
    //     [boardsObj, currentUserId]
    // );

    // const isPinSaved = (pinId, boardId) => {
    //     return savedPins[boardId]?.has(pinId);
    // };

    const displayPins = useMemo(() => Object.values(pins), [pins]);

    const [selectedBoardPin, setSelectedBoardPin] = useState({
        boardId: null,
        pinId: null,
    });

    const handleSelectedBoard = (boardId, pinId) => {
        setSelectedBoardPin({ boardId, pinId });
    };

    const selectedBoard = userBoards.filter(
        (board) => board.id === selectedBoardPin.boardId
    );

    const handleSavePin = async () => {
        if (selectedBoardPin.boardId && selectedBoardPin.pinId) {
            await dispatch(
                boardActions.postBoardPin(selectedBoardPin.boardId, selectedBoardPin.pinId)
            );

            setSavedPins((prev) => ({
                ...prev,
                [`${selectedBoardPin.pinId}-${selectedBoardPin.boardId}`]: true,
            }));
        }
    };

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
                                            <OpenModalButton
                                                buttonText="Save"
                                                modalComponent={
                                                    <AddBoardPin
                                                        onSelectBoard={
                                                            handleSelectedBoard
                                                        }
                                                    />
                                                }
                                                className="landing-save-button"
                                                pinId={id}
                                            />
                                        </div>
                                        {/* <button
                                            className={`landing-save-button ${
                                                savedPins[
                                                    `${id}-${selectedBoardPin.boardId}`
                                                ]
                                                    ? "saved"
                                                    : ""
                                            }`}
                                            onClick={(e) => {
                                                e.stopPropagation(); // Prevent the click from propagating to the image
                                                handleSavePin();
                                            }}
                                            disabled={
                                                savedPins[
                                                    `${id}-${selectedBoardPin.boardId}`
                                                ]
                                            }
                                        >
                                            {savedPins[
                                                `${id}-${selectedBoardPin.boardId}`
                                            ]
                                                ? "Saved"
                                                : "Save"}
                                        </button> */}
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
