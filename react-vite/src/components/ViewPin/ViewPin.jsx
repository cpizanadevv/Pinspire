import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getPin } from '../../redux/pins';
import './ViewPin.css';

const ViewPin = () => {
    console.log('ViewPin Component Mounted')
    const { pinId } = useParams();
    const dispatch = useDispatch();
    const pin = useSelector((state) => state.pinState.pins[pinId]);

    useEffect(() => {
        dispatch(getPin(pinId));
    }, [dispatch, pinId]);

    if (!pin) {
        return <div>Loading pin data...</div>;
    }

    return (
        <div className='view-pin-page'>
            <div className='pin-container'>
                <div className='left'>
                    <img src={pin.img_url} alt={pin.title} />
                </div>
                <div className='right'>
                    <h2>{pin.title}</h2>
                    <p>{pin.description}</p>
                    {pin.link && <a href={pin.link} target="_blank" rel="noopener noreferrer">Visit Link</a>}
                </div>
            </div>
        </div>
    )
};

export default ViewPin;
