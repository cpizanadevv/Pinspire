import { useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as pinActions from "../../redux/pins";
import { NavLink } from "react-router-dom";
import "./LandingPage.css";
// import PinComponent from './PinComponent'

function LandingPage() {
  const dispatch = useDispatch();
  const { pins, page, pageSize, hasMore, loading } = useSelector(
    (state) => state.pinState
  );
  // console.log('THIS IS PINS',pins)

  const allPins = Object.values(pins);
  // console.log('THIS IS ALLPINS', allPins)

  useEffect(() => {
    dispatch(pinActions.resetPins());
    dispatch(pinActions.getAllPinsWPagination(1, pageSize));
}, [dispatch, pageSize]);

  useEffect(() => {
    if (hasMore && !loading) {
      dispatch(pinActions.getAllPinsWPagination(page, pageSize));
    }
  }, [dispatch, page, pageSize, hasMore, loading]);

  const handleScroll = useCallback(() => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight - 5 && hasMore && !loading) {
      dispatch(pinActions.setPage(page + 1)); // Increment page in state
    }
  }, [dispatch, hasMore, loading, page]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <div className="created-grid">
      {allPins &&
        allPins.map(({ id, img_url }) => (
          <NavLink key={id} to={`/pin/${id}`}>
            <div className="profile-pin-container">
              <img src={img_url} alt="Pin" />
              <div className="profile-image-overlay">
                <p className="profile-overlay-text">Profile</p>
                <button className="save-button">Save</button>
              </div>
            </div>
          </NavLink>
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
