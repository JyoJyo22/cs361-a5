import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";

function LeetCodeInfo( {prevActionArr, setPrevActionArr, setTopicNum, setTextSection} ) {

    const redirect = useNavigate();
    const [startStudy, setStartStudy] = useState(false);

    const handleStudy = () => {
        setPrevActionArr([{                 // push a new prev state Obj to end of the prevActionArr                   
            page: "/",                                   // set it to the first obj every time you come back to this page
            topicNum: 0,
            textSection: "pattern"
        }]);
        setStartStudy(true);
        console.log(prevActionArr);
    }

    useEffect(() => {
        if (startStudy) {
            setStartStudy(false);
            setTopicNum(0);                      // make sure these are at default
            setTextSection("pattern");           // make sure these are at default
            redirect("/leetcode");
        }
    }, [startStudy]);
      
      
    return(
        <>
            <section className="text-section">
                <h2>LeetCode Info</h2>
                <p>
                    info about LeetCode pattern here
                </p>
            </section>

            <button onClick={() => handleStudy()} className="start-study">Start Studying Leetcode</button>
        </>
    );
}

export default LeetCodeInfo;