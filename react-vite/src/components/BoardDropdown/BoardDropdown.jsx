import { useState, useRef, useEffect } from 'react';
import './BoardDropdown.css';

function BoardDropdown({ boards, selectedBoard, onSelectBoard, imageBoardIds }) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const handleToggleDropdown = () => {
        if (!allBoardsSelected) {
            setIsOpen(!isOpen);
        }
    };

    const handleBoardSelect = (boardId) => {
        if (!imageBoardIds.includes(boardId)) {
            onSelectBoard(boardId);
            setIsOpen(false);
        }
    };

    const handleClickOutside = (e) => {
        if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Check if the pin is already in all boards
    const allBoardsSelected = boards.length > 0 && boards.every(board => imageBoardIds.includes(board.id));

    return (
        <div className={`custom-dropdown ${allBoardsSelected ? 'disabled' : ''}`} ref={dropdownRef}>
            <div className="dropdown-header" onClick={handleToggleDropdown}>
                {allBoardsSelected ? 'This pin is already in all your boards' : selectedBoard ? boards.find(board => board.id === selectedBoard)?.name : 'Choose board'}
                {!allBoardsSelected && (
                    <span className={`dropdown-arrow ${isOpen ? 'open' : ''}`}><i className="fa-solid fa-chevron-down"></i></span>
                )}
            </div>
            {isOpen && (
                <div className="dropdown-list">
                    {boards.map(board => (
                        <div
                            key={board.id}
                            className={`dropdown-item ${imageBoardIds.includes(board.id) ? 'selected' : ''}`}
                            onClick={() => handleBoardSelect(board.id)}
                            style={{ cursor: imageBoardIds.includes(board.id) ? 'not-allowed' : 'pointer' }}
                        >
                            {board.name}
                            {imageBoardIds.includes(board.id) && (
                                <span className="checkmark"><i className="fa-solid fa-check"></i></span>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default BoardDropdown;
