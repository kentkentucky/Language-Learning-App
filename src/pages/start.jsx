import logo from '../images/book-icon.png';
import Button from 'react-bootstrap/Button';

import "./start.css";

import { useNavigate } from 'react-router-dom';

function Start()
{
    let navigate = useNavigate();
    const toLanguage = () => {
        let path = "language";
        navigate(path);
    };

    return (
        <div className='homepage'>
            <p>
                Welcome to LingoLoop, your personalized language learning companion! Whether you're a beginner or advancing in your skills, our app is designed to make language learning fun, effective, and accessible. 
                Dive into interactive lessons, practice real-life conversations, and track your progress as you master new languages at your own pace. 
                With engaging quizzes, audio practice, and daily challenges, LingoLoop ensures you're not just memorizing words but speaking, understanding, and connecting with new cultures. 
                Embark on your language journey today and discover the joy of becoming multilingual!
            </p>
            <img src={logo} alt='Book Logo' className='logo'></img>
            <Button variant='success' className='btn-start' onClick={toLanguage}>Get started</Button>
        </div>
    );
}

export default Start;