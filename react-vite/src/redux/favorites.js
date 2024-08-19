const GET_FAVORITES = "favorites/getFavorites"
const CREATE_FAVORITE = "favorites/createFavorite"
const REMOVE_FAVORITE = "favorites/removeFavorite"

const getFavorites = (favorites) => ({
    type: GET_FAVORITES,
    favorites
});

const createFavorite = (favorite) => ({
    type: CREATE_FAVORITE,
    favorite
});

const removeFavorite = (favoriteId) => ({
    type: REMOVE_FAVORITE,
    favoriteId
});

export const getAllFavorites = () => async (dispatch) => {
    const response = await fetch("/api/favorites/all")
    if (response.ok) {
        const favorites = await response.json();
        dispatch(getFavorites(favorites))
    } else {
        const error = await response.json()
        return error
    }
};

export const getUserFavorites = (userId) => async (dispatch) => {
    const response = await fetch(`/api/favorites/user/${userId}`);
    if (response.ok) {
        const favorites = await response.json();
        dispatch(getFavorites(favorites));
        return favorites;
    } else {
        const error = await response.json();
        return error;
    }
};

export const createNewFavorite = (pinId) => async (dispatch) => {
    console.log(typeof pinId)
    const response = await fetch(`/api/favorites/${pinId}/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    })

    console.log("PINNNIDDD", response)
    if (response.ok) {
        const resFavorite = await response.json()
        await dispatch(createFavorite(resFavorite))
        return resFavorite
    } else {
        const error = await response.json()
        // console.log("ERRRORRRRRRR", error)
        return error
    }
};

export const deleteFavorite = (pinId) => async (dispatch) => {
    const response = await fetch(`/api/favorites/${pinId}/delete`, {
        method: 'DELETE',
    })

    if (response.ok) {
        const favorite = await response.json()
        dispatch(removeFavorite(favorite.id))
    } else {
        const error = await response.json()
        return error
    }
};

const initialState = { favorites: {} };

function favoritesReducer(state = initialState, action) {
    let newState = {};
    switch (action.type) {
        // case GET_FAVORITES: {
        //     newState = { ...state, favorites: {} };
        //     action.favorites.forEach( favorite => { newState.favorites[favorite.id] = favorite })
        //     return newState
        // }
        case GET_FAVORITES: {
            newState = { ...state };
            action.favorites.forEach(favorite => {
                newState.favorites[favorite.pin_id] = favorite; // store by pin_id for consistency
            });
            return newState;
        }
        case CREATE_FAVORITE: {
            const newFavorite = action.favorite;
            newState = {
                ...state,
                favorites: {
                    ...state.favorites,
                    [newFavorite.pin_id]: newFavorite // store by pin_id for consistency
                }
            };
            return newState;
        }
        case REMOVE_FAVORITE: {
            newState = { ...state }
            delete newState.favorites[action.favoriteId];
            return newState
        }
        default:
            return state;
    }

}

export default favoritesReducer;
