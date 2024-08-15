const addFave = (fave) => ({
  type: ADD_FAVE,
  fave,
});

export const addFavorite = (fave, pinId) => async (dispatch) => {
  const res = await fetch(`/api/favorites/${pinId}`, {
    method: "POST",
    body: JSON.stringify(fave),
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  if (res.ok) {
    const favorite = await res.json();
    dispatch;
    return favorite;
  }
};

initialState = { favorite:{} }

function faveReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_FAVE:
      return { ...state, fave };

    default:
      return state;
  }
}
