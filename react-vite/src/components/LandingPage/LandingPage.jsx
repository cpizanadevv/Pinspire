import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as pinActions from "../../redux/pins";
import { NavLink } from "react-router-dom";
import "./LandingPage.css";
import InfiniteScroll from "react-infinite-scroll-component";
// import PinComponent from './PinComponent'

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

  const pins = useSelector((state) => state.pinState.pins || {});
  // console.log('THIS IS PINS',pins)

  const allPins = Object.values(pins);
  // console.log('THIS IS ALLPINS', allPins)
  shuffleArray(allPins);

  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    dispatch(pinActions.getAllPins(page));
  }, [dispatch, page]);

  const fetchPins = () => {
    if (hasMore) {
      setPage((prevPage) => prevPage + 1);
    }else {
        setHasMore(false)
    }
  };

  return (
    <InfiniteScroll
      dataLength={allPins.length}
      next={fetchPins}
      hasMore={true}
      loader={<h4>Loading...</h4>}
      endMessage={<p>No more pins </p>}
    >
      <div className="pins">
        {allPins &&
          allPins.map(
            ({
              id,
              img_url,
              // user_id,
              // title,
              // description,
              // link
            }) => (
              <div key={id} className="pin">
                <NavLink key={id} to={`/pin/${id}`}>
                  <img src={img_url} alt="" className="img" />
                </NavLink>
              </div>
            )
          )}
      </div>
    </InfiniteScroll>
  );
}

export default LandingPage;
