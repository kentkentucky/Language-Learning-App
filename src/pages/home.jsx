import NavBar from "../components/navbar";
import Progress from "../components/progress";

import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

function Home()
{
    const location = useLocation();
    const [levels, setLevels] = useState(null);
    const [lessons, setLessons] = useState(null);

    // Save data to localStorage when the component is mounted
    useEffect(() => {
        if (location.state) {
            // Set state from location
            setLevels(location.state.level);
            setLessons(location.state.lesson);

            // Save data to localStorage
            localStorage.setItem("levels", JSON.stringify(location.state.level));  // Store levels data
            localStorage.setItem("lessons", JSON.stringify(location.state.lesson)); // Store lessons data
        } 
        else {
            // If location.state is not available, try to load from localStorage
            const savedLevels = JSON.parse(localStorage.getItem("levels"));
            const savedLessons = JSON.parse(localStorage.getItem("lessons"));

            if (savedLevels && savedLessons) {
                setLevels(savedLevels);
                setLessons(savedLessons);
            } 
            else {
                // Handle the case where no data is available
                console.log("No data found in location or localStorage");
            }
        }
    }, []);

    // Show loading or error if levels and lessons are not set
    if (!levels || !lessons) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <NavBar />
            <Progress steps={levels} words={lessons} />
        </>
    );
}

export default Home;