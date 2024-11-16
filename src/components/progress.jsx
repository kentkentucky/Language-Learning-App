import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import "./progress.css";

function Progress({ steps, words })
{
    const [currentLevel, setCurrentLevel] = useState(0);
    const [modalShow, setModalShow] = useState(false);
    const [buttonIndex, setButtonIndex] = useState(0);

    let navigate = useNavigate();
    const toLesson = (words) => {
        navigate("/lesson", {state: {lesson: words}});
    };

    const handleClick = (index) => {
        setModalShow(true);
        setButtonIndex(index);
    };

    let checkActive = () => {
        // return currentLevel == buttonIndex ? true : false
        // I think that syntax would be a bit easier to read

        /*
            alternatively:

            if (currentLevel == buttonIndex) return true
            return false

            // if the if condition isn't true, it will always be the else anyways. So there is no need for an else in this case :)!

        */
        if(currentLevel == buttonIndex)
        {
            return true;
        }
        else
        {
            return false;
        }

        // Those above are actually just suggestions for more complex syntax. Here we can simply do this:
        // return currentLevel == buttonIndex
        // evaluates to true if true, and false if false
    }

    return (
        <>
            <div className='container-progress'>
                <div className='stepper-level'>
                    {steps.map(({ label }, index) => {
                        return (
                            <div key={index} className='stepper-container'>
                                <button className={`level-number ${index <= currentLevel ? "active" : ""}`} onClick={() => handleClick(index)}>
                                    {/* I think is quite cryptic. I think it would make sense to create variables here for readability
                                        const count = index + 1
                                        const lastStep = steps.length - 1
                                        const currentStep = index

                                        those are some examples
                                    */}
                                    {index + 1}
                                    {index < steps.length - 1 && (<div className={`step-line ${index < currentLevel ? "active" : ""}`}></div>)}
                                </button>
                                {/* We should place the modal into a separate component */}
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
                                        {/* Now that I see how checkActive is used, I think we don't need a function for it and could just use it in here. Good job on conditional CSS though! */}
                                        <Button className='modal-button' style={{ display: checkActive() ? "block" : "none" }} onClick={() => {setCurrentLevel((currentLevel + 1)); toLesson(words[buttonIndex]); }}>Play</Button>
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