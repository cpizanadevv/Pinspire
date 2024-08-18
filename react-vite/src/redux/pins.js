const LOAD_PIN = "pins/loadPin"
const GET_PINS = "pins/getPins"
const CREATE_PIN = "pins/createPin"
const UPDATE_PIN = "pins/updatePin"
const REMOVE_PIN = "pins/removePin"


const createPin = (pin) => ({
    type: CREATE_PIN,
    pin
});

const loadPin = (pin) => ({
    type: LOAD_PIN,
    pin
});

const getPins = (pins) => ({
    type:  GET_PINS,
    pins
});

const removePin = (pinId) => ({
    type: REMOVE_PIN,
    pinId
});

const updatePin = (pin) => ({
    type: UPDATE_PIN,
    pin
});

export const setPage = (page) => ({
    type: 'SET_PAGE',
    page,
});

export const setPageSize = (pageSize) => ({
    type: 'SET_PAGE_SIZE',
    pageSize,
});

export const setHasMore = (hasMore) => ({
    type: 'SET_HAS_MORE',
    hasMore,
});

export const setLoading = (loading) => ({
    type: 'SET_LOADING',
    loading,
});
export const pinsWithPagination = (pins) => ({
    type: 'GET_PINS_WITH_PAGINATION',
    pins,
});
export const resetPins = () => ({
    type: 'RESET_PINS',
});


export const getPin = (pinId) => async (dispatch) => {
    const response = await fetch(`/api/pins/${pinId}`)
    if (response.ok) {
        const pin = await response.json();
        dispatch(loadPin(pin))
    } else {
        const error = await response.json()
        return error
    }
};

export const getAllPins = () => async (dispatch) => {
    const response = await fetch("/api/pins/")
    if (response.ok) {
        const { Pins } = await response.json();
        dispatch(getPins(Pins))
    } else {
        const error = await response.json()
        return error
    }
};

export const getAllPinsWPagination = (page = 1, pageSize = 15) => async (dispatch) => {
    const response = await fetch(`/api/pins/pagination?page=${page}&page_size=${pageSize}`)
    if (response.ok) {
        const { Pins } = await response.json();
        dispatch(pinsWithPagination(Pins));

        // Check if there's more data to be loaded
        const hasMore = Pins.length === pageSize;
        dispatch(setHasMore(hasMore));
    } else {
        const error = await response.json();
        console.error('Error fetching pins:', error);
    }
};


export const deletePin = (pinId) => async (dispatch) => {
    const response = await fetch(`/api/pins/${pinId}`, {
        method: 'DELETE',
    })

    if (response.ok) {
        dispatch(removePin(pinId))
    } else {
        const error = await response.json()
        return error
    }
};

export const editPin = ({editedPin, pinId}) => async (dispatch) => {

    const { image, title, description, link } = editedPin

    const response = await fetch(`/api/pins/${pinId}/edit`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({
            image: image,
            title: title,
            description: description,
            link: link
        })
    })

    if (response.ok) {
        const resPin = await response.json()
        dispatch(updatePin(resPin))
        return resPin
    } else {
        const error = await response.json()
        return error
    }
};

export const addPin = (newPin) => async (dispatch) => {
    const { file, title, description, link } = newPin;

    const formData = new FormData();
    formData.append("image", file);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("link", link);

    const response = await fetch("/api/pins/new", {
        method: "POST",
        body: formData,
        credentials: 'include',
    });

    if (response.ok) {
        const data = await response.json();
        dispatch(createPin(data));
        return data;
    } else {
        const error = await response.json();
        return error;
    }
};

const initialState = { pin: {}, pins: {},
page: 1,
pageSize: 15,
hasMore: true,
loading: false,};

function pinsReducer(state = initialState, action) {
    let newState = {};
    switch (action.type) {
        case LOAD_PIN: {
            // newState = { ...state, pins: { ...state.pins, [action.pin.id]: action.pin } };
            const newState = { ...state, pins: { ...state.pins, [action.pin.id]: action.pin }, pin: action.pin };
            return newState;
        }
        case GET_PINS: {
            newState = { ...state, pins: {} };
            action.pins.forEach( pin => { newState.pins[pin.id] = pin })
            // console.log('GET_PINS action:', newState.pins);
            return newState
        }
        case 'GET_PINS_WITH_PAGINATION': {
            // For routes with pagination
            const newPins = action.pins.reduce((acc, pin) => {
                acc[pin.id] = pin;
                return acc;
            }, {});
            return {
                ...state,
                pins: { ...state.pins, ...newPins }, // Merge with existing pins
                loading: false,
            };
        }
        case 'RESET_PINS': {
            return {
                ...state,
                pins: {},  // Clear the pins
                page: 1,   // Reset the page to 1
                hasMore: true, // Reset hasMore to true if you want to reload data
                loading: false, // Reset loading state
            };
        }
        case UPDATE_PIN: {
            const updatedPin = action.pin
            newState = {...state, pins: {...state.pins, [updatedPin.id]: updatedPin}}
            return newState
        }
        case REMOVE_PIN: {
            newState = {...state}
            delete newState.pins[action.pinId]
            return newState
        }
        case CREATE_PIN: {
            const newPin = action.pin;
            newState = { ...state, pins: { ...state.pins, [newPin.id]: newPin } };
            return newState;
        }
        case 'SET_PAGE': {
            return { ...state, page: action.page };
        }
        case 'SET_PAGE_SIZE': {
            return { ...state, pageSize: action.pageSize };
        }
        case 'SET_HAS_MORE': {
            return { ...state, hasMore: action.hasMore };
        }
        case 'SET_LOADING': {
            return { ...state, loading: action.loading };
        }
        default:
            return state;
    }


}

export default pinsReducer;
