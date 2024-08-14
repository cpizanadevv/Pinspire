import { useEffect, useState } from "react";
import { useDispatch, useSelector} from 'react-redux';
import { editPin, getPin } from "../../redux/pins";
import { useParams, useNavigate } from 'react-router-dom';

const EditPin = () => {
    const pin = useSelector(state => state.pinState.pin)
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [link, setLink] = useState("");
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const { pinId } = useParams()

    useEffect(() => {
        dispatch(getPin(pinId))
    }, [dispatch, pinId])

    useEffect(() => {
        if (pin) {
            setTitle(pin.title || "")
            setDescription(pin.description || "")
            setLink(pin.link || "")
        }
    }, [pin])

    const handleSubmit = async (e) => {
        e.preventDefault();

        const editedPin = {
            image: pin.img_url,
            title,
            description,
            link
        }

        const response = await dispatch(editPin({editedPin, pinId}))

        if (response.ok) {
            navigate("/")
        }
    
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <textarea
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Link"
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                />
                <button type="submit">Save</button>
            </form>
        </div>
    );


}

export default EditPin;