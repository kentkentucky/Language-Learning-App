import "./language.css"

import Button from 'react-bootstrap/Button';

import { useNavigate } from 'react-router-dom';

import { levels_j, lessons_j } from "../data/japanese";
import { levels_c } from "../data/chinese";
import { levels_k } from "../data/korean";

function Language()
{
    let navigate = useNavigate();
    const toHome = (levelData, wordData) => {
        // nice using the react router state
        navigate("/home", { state: { level: levelData, lesson: wordData } });
    };

    return (
        <form className="language">
            <h1>Pick a language you want to learn: </h1>
            {/* Maybe we could have a reusable button component here, that has the same attributes, only the data used differs? */}
            <Button size="lg" className="btn-language" onClick={() => toHome(levels_j, lessons_j)}>Japanese</Button>
            <Button size="lg" className="btn-language" onClick={() => toHome(levels_c)}>Chinese</Button>
            <Button size="lg" className="btn-language" onClick={() => toHome(levels_k)}>Korean</Button>
        </form>
    );
}

export default Language;