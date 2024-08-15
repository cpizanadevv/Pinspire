const LOAD_PIN = "pins/loadPin"
const GET_PINS = "pins/getPins"
// const CREATE_PIN = "pins/createPin"
const UPDATE_PIN = "pins/updatePin"
const REMOVE_PIN = "pins/removePin"

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

export const getPin = (pinId) => async (dispatch) => {
    const response = await fetch(`/api/pins/${pinId}`)
    if (response.ok) {
        const pin = await response.json();
        dispatch(loadPin(pin))
    } else {
        const error = response.json()
        return error
    }
};

export const getAllPins = () => async (dispatch) => {
    const response = await fetch("/api/pins/")
    if (response.ok) {
        const { Pins } = await response.json();
        dispatch(getPins(Pins))
    } else {
        const error = response.json()
        return error
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

const initialState = { pin: {}, pins: {} };

function pinsReducer(state = initialState, action) {
    let newState = {};
    switch (action.type) {
        case LOAD_PIN:
            return {...state, pin: action.pin}
        case GET_PINS: {
            newState = {...state, pins: {} }
            action.pins.forEach( pin => { newState.pins[pin.id] = pin })
            return newState
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
        default:
            return state;
    }

}

export default pinsReducer;
