import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate, NavLink } from "react-router-dom";
import { getAllPins } from "../../redux/pins";
import { fetchAllBoards } from "../../redux/board";
import { getAllFavorites } from "../../redux/favorites";
import CreateBoard from "../Board/CreateBoard";
import OpenModalButton from "../OpenModalButton/OpenModalButton";

const ProfileSaved = () => {
    const user = useSelector((state) => state.session.user);
    const boardsObj = useSelector((state) => state.boardState);
    const boards = Object.values(boardsObj);
    const userBoards = boards.filter((board) => board.user_id === user.id);

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
        dispatch(getAllFavorites());
    }, [dispatch]);

    return (
        <>
            <div className="profile-middle-container">
                <button>
                    <i className="fa-solid fa-sort"></i>
                </button>
                <OpenModalButton
                    buttonText={
                        <div className="create-board-button-content">
                            <i className="fa-solid fa-plus"></i>
                            <h2>Create Board</h2>
                        </div>
                    }
                    modalComponent={<CreateBoard />}
                    className="create-board-button"
                />
            </div>
            <div className="profile-board-grid">
                {userBoards.map((board) => (
                    <NavLink key={board.id} to={`/boards/${board.id}`}>
                        <div className="profile-board-container">
                            <div className="profile-board-image-container">
                                <div className="profile-board-image">
                                    <div
                                        className="profile-board-first-image"
                                        style={{
                                            backgroundColor: board.pins?.[0]
                                                ?.img_url
                                                ? "transparent"
                                                : "lightgray",
                                        }}
                                    >
                                        {board.pins?.[0]?.img_url ? (
                                            <img
                                                src={board.pins[0].img_url}
                                                alt={`Pin`}
                                            />
                                        ) : null}
                                    </div>
                                    <div className="profile-board-second-image">
                                        <div
                                            className="profile-board-second-image-nested"
                                            style={{
                                                backgroundColor: board.pins?.[1]
                                                    ?.img_url
                                                    ? "transparent"
                                                    : "lightgray",
                                            }}
                                        >
                                            {board.pins?.[1]?.img_url ? (
                                                <img
                                                    src={board.pins[1].img_url}
                                                    alt={`Pin`}
                                                />
                                            ) : null}
                                        </div>
                                        <div
                                            className="profile-board-second-image-nested"
                                            style={{
                                                backgroundColor: board.pins?.[2]
                                                    ?.img_url
                                                    ? "transparent"
                                                    : "lightgray",
                                            }}
                                        >
                                            {board.pins?.[2]?.img_url ? (
                                                <img
                                                    src={board.pins[2].img_url}
                                                    alt={`Pin`}
                                                />
                                            ) : null}
                                        </div>
                                    </div>
                                </div>
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
        </>
    );
};

export default ProfileSaved;
