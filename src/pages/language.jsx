import "./language.css"

import Button from 'react-bootstrap/Button';

import { Link } from 'react-router-dom';

function Language()
{
    return (
        <form className="language">
            <h1>Pick a language you want to learn: </h1>
            <Button size="lg" className="btn-language"><Link to="/Home" className="link-home">Japanese</Link></Button>
            <Button size="lg" className="btn-language"><Link to="/Home" className="link-home">Chinese</Link></Button>
            <Button size="lg" className="btn-language"><Link to="/Home" className="link-home">Korean</Link></Button>
        </form>
    );
}

export default Language;