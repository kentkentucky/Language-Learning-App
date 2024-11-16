import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import { shuffleWords, getRandomIndex } from "../components/shuffle";

import "./lesson.css"

function Lesson() {

    let navigate = useNavigate();

    const location = useLocation();
    const lessonWords = location.state.lesson;

    const [wordDeck, setWordDeck] = useState(lessonWords.words);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [currentGameState, setCurrentGameState] = useState(0); // why is game state a number?
    const [quizDeck, setQuizDeck] = useState([]);
    const [optionDeck, setOptionDeck] = useState([]);
    const [show, setShow] = useState(false);
    const [isCorrect, setIsCorrect] = useState(null);
    // since you app is supposed to also support korean and chinese, I think we shouldn't name state fixed to a specific language and write it more general purpose
    const [enWord, setEnWord] = useState(null);
    const [jpWord, setJpWord] = useState(null);
    const [enClicked, setEnClicked] = useState(null);
    const [jpClicked, setJpClicked] = useState(null);
    const [matchedWords, setMatchedWords] = useState([]);
    const [hasEnded, setHasEnded] = useState(false);
    const [isWrong, setIsWrong] = useState(false);

    const nextCard = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1));
        setShow(false);
        setIsCorrect(null);
    };

    // What is a next game state? I think naming could be improved here. e.g. displayNextPage, displayNextLessonType or something along those lines
    const nextGameState = () => {
        setCurrentGameState((prevGameState) => (prevGameState + 1));
        setCurrentIndex(0);
        setQuizDeck(shuffleWords([...wordDeck]));
        setIsCorrect(null);
        setShow(false);
    };

    // what does it check? Can be a bit more specific
    const checkWordDeck = () => {
        return currentIndex == wordDeck.length - 1
    };

    // this is a component, defined within a component. I wouldn't recommend this. I would define this outside of the component and pass wordDeck as prop
    const lessonContent = () => {
        if(!currentGameState)
        {
            return (
                <div className="content">
                    <div className="content-card">
                        {/* Can create a reusable component for this p tag */}
                        <p className="romaji">Romaji: {wordDeck[currentIndex].romaji}</p>
                        <p className="japanese">Japanese: {wordDeck[currentIndex].japanese}</p>
                        <p className="english">English: {wordDeck[currentIndex].english}</p>
                        {/* Since you run checkWordDeck() twice here, I recommend using a variable in which you store its result, then use at the desired spots in your code */}
                        <button onClick={(e) => {e.preventDefault(); checkWordDeck() ? nextGameState() : nextCard();}}>{ checkWordDeck() ? "Next" : "Got it!" }</button>
                    </div>
                </div>
            );
        }
    };

    // A rule in React is, to always place all hooks at the top of the component. So place useEffect directly under you useState definitions
    // since there is more syntax going on here, i would recommend making this a named function so I don't need to read the whole code to understand what is happening
    useEffect(function createQuizOptionsDeck() {
        if(quizDeck.length) 
        {
            let options = createQuizOptions(quizDeck[currentIndex].english);
            setOptionDeck(options);
        }
    }, [currentIndex, quizDeck]);

    // this can be defined outside of the component, maybe in another file. We don't use any state here aside from quizDeck, which we can get via a function argument instead
    const createQuizOptions = (answer) => {
        let options = [answer];
        while(options.length < 4)
        {
            let j = getRandomIndex(quizDeck.length);
            let randomOption = quizDeck[j].english;
            if(randomOption != answer && !options.includes(randomOption))
            {
                options.push(randomOption);
            }
        }
        return shuffleWords(options);
    }

    const checkAnswer = (option) => {
        if(option == quizDeck[currentIndex].english) {
            setIsCorrect(true)
            return setShow(true)
        }
        setIsCorrect(false)
        setShow(true)
    }

    const checkQuizDeck = () => {
        return currentIndex == (quizDeck.length - 1)
    };

    // should be a separate component
    const quiz = () => {
        if(currentGameState == 1)
        {
            return (
                <div className="quiz">
                    <div className="quiz-card">
                        <p className="question">Pick the correct meaning!</p>
                        <p className="word">Romaji: {quizDeck[currentIndex].romaji}</p>
                        <p className="word">Japanese: {quizDeck[currentIndex].japanese}</p>
                        <div className="options">
                            {optionDeck.map((option, index) => (
                                <button key={index} onClick={(e) => {e.preventDefault(); checkAnswer(optionDeck[index])}}>{option}</button>
                            ))}
                        </div>
                        <Modal show={show} aria-labelledby="contained-modal-title-vcenter" centered>
                            <Modal.Header className={isCorrect ? "correct" : "incorrect"}>
                                <Modal.Title id="contained-modal-title-vcenter">{isCorrect ? "Correct!" : "Wrong!"}</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>{isCorrect ? "Well Done!" : `Answer: ${quizDeck[currentIndex].english}`}</Modal.Body>
                            <Modal.Footer>
                            <Button variant="primary" onClick={(e) => {e.preventDefault(); checkQuizDeck() ? nextGameState() : nextCard();}}>
                                Next
                            </Button>
                            </Modal.Footer>
                        </Modal>
                    </div>
                </div>
            );
        }
    }

    const checkMatch = () => {
        if(enWord.english == jpWord.english)
        {
            setMatchedWords([...matchedWords, enWord.english]);
        }
        else
        {
            setIsWrong(true);
            setTimeout(() => setIsWrong(false), 100); // why implement a delay here?
        }
        setEnWord(null);
        setJpWord(null);
        setEnClicked(null);
        setJpClicked(null);
        checkMatchedWords();
    }

    useEffect(() => {
        if (enWord && jpWord) {
          checkMatch();
        }
    }, [enWord, jpWord]);

    const checkMatchedWords = () => {
        if(matchedWords.length == wordDeck.length - 1)
        {
            setHasEnded(true);
        }
    }

    const matchWords = () => {
        if(currentGameState == 2)
        {
            return (
                <div className={`container-match ${isWrong ? "incorrect" : ""}`}>
                    <div className={`container-column ${isWrong ? "incorrect" : ""}`} key="english">
                        {wordDeck.map((word) => (
                            <button key={word.english} onClick={(e) => {
                                e.preventDefault(); 
                                setEnWord(word); 
                                setEnClicked(word.english);
                            }} 
                            // enClicked sounds like a boolean, but seems to be a string
                            // I recommend something like clickedEnglishWord instead
                                className={`${enClicked == word.english ? "lit" : ""} ${matchedWords.includes(word.english) ? 'matched' : ''} ${isWrong ? "incorrect" : ""}`} disabled={matchedWords.includes(word.english)}
                            >
                                {word.english}
                            </button>
                        ))}
                    </div>
                    <div className={`container-column ${isWrong ? "incorrect" : ""}`} key="japanese">
                        {quizDeck.map((word) => (
                            <button key={word.english} onClick={(e) => {
                                e.preventDefault(); 
                                setJpWord(word); 
                                setJpClicked(word.english);
                            }} 
                                className={`${jpClicked == word.english ? "lit" : ""} ${matchedWords.includes(word.english) ? 'matched' : ''} ${isWrong ? "incorrect" : ""}`} disabled={matchedWords.includes(word.english)}
                            >
                                {word.romaji}
                                {word.japanese}
                            </button>
                        ))}
                    </div>
                </div>
            );
        }
    };

    const backHome = () => {
        navigate("/home");
    };

    return (
        <>
            <h1>{lessonWords.title}</h1>
            <p>{lessonWords.overview}</p>
            {lessonContent()}
            {quiz()}
            {matchWords()}
            {/* Modal should be own component */}
            <Modal show={hasEnded} aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header>
                    <Modal.Title id="contained-modal-title-vcenter">End of Lesson</Modal.Title>
                </Modal.Header>
                <Modal.Body>Good job for completing the lesson! You did well!</Modal.Body>
                <Modal.Footer>
                <Button variant="primary" onClick={() => backHome()}>End</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default Lesson;