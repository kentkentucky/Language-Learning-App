import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import { shuffleWords, getRandomIndex } from "../components/shuffle.js";
import { useLevel } from "../components/levelController";

import "./lesson.css"

function Lesson() {

    const location = useLocation();
    const lessonWords = location.state.lesson;

    const [currentLevel, setCurrentLevel] = useLevel();
    const [wordDeck, setWordDeck] = useState(lessonWords.words);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [currentGameState, setCurrentGameState] = useState(0);
    const [quizDeck, setQuizDeck] = useState([]);
    const [optionDeck, setOptionDeck] = useState([]);
    const [show, setShow] = useState(false);
    const [isCorrect, setIsCorrect] = useState(null);
    const [enWord, setEnWord] = useState(null);
    const [tpWord, setTpWord] = useState(null);
    const [enClicked, setEnClicked] = useState(null);
    const [tpClicked, setTpClicked] = useState(null);
    const [matchedWords, setMatchedWords] = useState([]);
    const [hasEnded, setHasEnded] = useState(false);
    const [isWrong, setIsWrong] = useState(false);

    useEffect(() => {
        if(quizDeck.length > 0) 
        {
            let options = createQuizOptions(quizDeck[currentIndex].english);
            setOptionDeck(options);
        }
    }, [currentIndex, quizDeck]);

    useEffect(() => {
        if (enWord && tpWord) {
          checkMatch();
        }
    }, [enWord, tpWord]);

    let navigate = useNavigate();
    const backHome = () => {
        navigate("/home");
    };

    const nextCard = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1));
        setShow(false);
        setIsCorrect(null);
    };

    const nextGameState = () => {
        setCurrentGameState((prevGameState) => (prevGameState + 1));
        setCurrentIndex(0);
        setQuizDeck(shuffleWords([...wordDeck]));
        setIsCorrect(null);
        setShow(false);
    };

    const checkWordDeck = () => {
        return currentIndex == wordDeck.length - 1;
    };

    const lessonContent = () => {
        if(currentGameState == 0)
        {
            return (
                <div className="content">
                    <div className="content-card">
                        <p className="romaji">Pronunciation: {wordDeck[currentIndex].pronunciation}</p>
                        <p className="japanese">Text: {wordDeck[currentIndex].text}</p>
                        <p className="english">English: {wordDeck[currentIndex].english}</p>
                        <button onClick={(e) => {e.preventDefault(); checkWordDeck() ? nextGameState() : nextCard();}}>{ checkWordDeck() ? "Next" : "Got it!" }</button>
                    </div>
                </div>
            );
        }
    };

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
        if(option == quizDeck[currentIndex].english)
        {
            setIsCorrect(true);
            return setShow(true);
        }
        setIsCorrect(false);
        setShow(true);
    }

    const checkQuizDeck = () => {
        return currentIndex == (quizDeck.length - 1);
    };

    const quiz = () => {
        if(currentGameState == 1)
        {
            return (
                <div className="quiz">
                    <div className="quiz-card">
                        <p className="question">Pick the correct meaning!</p>
                        <p className="word">Pronunciation: {quizDeck[currentIndex].pronunciation}</p>
                        <p className="word">Text: {quizDeck[currentIndex].text}</p>
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
        if(enWord.english == tpWord.english)
        {
            setMatchedWords([...matchedWords, enWord.english]);
        }
        else
        {
            setIsWrong(true);
            setTimeout(() => setIsWrong(false), 100);
        }
        setEnWord(null);
        setTpWord(null);
        setEnClicked(null);
        setTpClicked(null);
        checkMatchedWords();
    }

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
                                setTpWord(word); 
                                setTpClicked(word.english);
                            }} 
                                className={`${tpClicked == word.english ? "lit" : ""} ${matchedWords.includes(word.english) ? 'matched' : ''} ${isWrong ? "incorrect" : ""}`} disabled={matchedWords.includes(word.english)}
                            >
                                {word.pronunciation}
                                {word.text}
                            </button>
                        ))}
                    </div>
                </div>
            );
        }
    };

    return (
        <>
            <h1>{lessonWords.title}</h1>
            <p>{lessonWords.overview}</p>
            {lessonContent()}
            {quiz()}
            {matchWords()}
            <Modal show={hasEnded} aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header>
                    <Modal.Title id="contained-modal-title-vcenter">End of Lesson</Modal.Title>
                </Modal.Header>
                <Modal.Body>Good job for completing the lesson! You did well!</Modal.Body>
                <Modal.Footer>
                <Button variant="primary" onClick={(e) => {e.preventDefault(); setCurrentLevel(currentLevel + 1); backHome(); }}>End</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default Lesson;