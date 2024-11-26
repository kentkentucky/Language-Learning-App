import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useLevel } from './levelController';

import "./progress.css";

function Progress({ steps, words})
{
    const [currentLevel, setCurrentLevel] = useLevel();
    const [modalShow, setModalShow] = useState(false);
    const [buttonIndex, setButtonIndex] = useState(0);

    let navigate = useNavigate();
    const toLesson = (words) => {
        navigate("/lesson", {state: { lesson: words }});
    };

    const handleClick = (index) => {
        setModalShow(true);
        setButtonIndex(index);
    };

    let checkActive = () => {
        if(currentLevel == buttonIndex)
        {
            return true;
        }
        else
        {
            return false;
        }
    }

    return (
        <>
            <div className='container-progress'>
                <div className='stepper-level'>
                    {steps.map(({ label }, index) => {
                        return (
                            <div key={index} className='stepper-container'>
                                <button className={`level-number ${index <= currentLevel ? "active" : ""}`} onClick={() => handleClick(index)}>
                                    {index + 1}
                                    {index < steps.length - 1 && (<div className={`step-line ${index < currentLevel ? "active" : ""}`}></div>)}
                                </button>
                                <Modal
                                    show={modalShow}
                                    onHide={() => setModalShow(false)}
                                    size="lg"
                                    aria-labelledby="contained-modal-title-vcenter"
                                    centered
                                >
                                    <Modal.Header closeButton>
                                        <Modal.Title id="contained-modal-title-vcenter">{steps[buttonIndex].label}</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <p>
                                        {steps[buttonIndex].description}
                                        </p>
                                    </Modal.Body>
                                    <Modal.Footer className='modal-footer'>
                                        <Button className='modal-button' style={{ display: checkActive() ? "block" : "none" }} onClick={(e) => {e.preventDefault(); toLesson(words[buttonIndex]);}}>Play</Button>
                                        <Button onClick={() => setModalShow(false)} className='modal-button'>Close</Button>
                                    </Modal.Footer>
                                </Modal>
                                <div className="level-label">{label}</div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    );
}

export default Progress;