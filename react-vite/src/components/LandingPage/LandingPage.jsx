import { useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as pinActions from "../../redux/pins";
import { NavLink } from "react-router-dom";
import "./LandingPage.css";
import * as boardActions from "../../redux/board";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import AddBoardPin from "../AddBoardPin/AddBoardPin";
import Loader from "../Loader/Loader";

const stopBounce = (func, wait) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
};

function LandingPage() {
  const dispatch = useDispatch();
  // const currentUserId = useSelector((state) => state.session.user?.id);
  const { pins, page, pageSize, hasMore, loading } = useSelector(
    (state) => state.pinState || {}
  );

  const user = useSelector((store) => store.session.user);
  // const boards = useSelector((state) => state.boardState || []);

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
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight - 5 && hasMore && !loading) {
      dispatch(pinActions.setPage(page + 1));
    }
  }, 300);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const displayPins = useMemo(() => Object.values(pins), [pins]);

  return (
    <div className="pins-message">
      {loading && <Loader />}
      <div className="created-grid-container">
        {!loading && displayPins.length > 0 && (
          <div className="landing">
            {displayPins.map(({ id, img_url }) => (
              <NavLink key={id} to={`/pin/${id}`}>
                <div className="pin-container">
                  <img src={img_url} alt={`Pin ${id}`} />
                  <div className="image-overlay">
                    {user && (
                      <div className="board-container">
                        <OpenModalButton
                          buttonText="Save"
                          modalComponent={<AddBoardPin />}
                          className="landing-save-button"
                          pinId={id}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </NavLink>
            ))}
          </div>
        )}
      </div>
      {!loading && !hasMore && (
        <div className="no-pins-message">No more pins available.</div>
      )}
    </div>
  );
}

export default LandingPage;
