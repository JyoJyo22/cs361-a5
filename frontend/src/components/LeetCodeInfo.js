import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";

function LeetCodeInfo( {setPrevActionArr} ) {

    const redirect = useNavigate();
    const [startStudy, setStartStudy] = useState(false);

    const handleStudy = () => {
        setPrevActionArr([{                 // push a new prev state Obj to end of the prevActionArr
            page: "/",                             // set it to the first 2 objects every time you come back to this page
            topicNum: 0,
            textSection: "pattern"
        }, 
        {
            page: "leetcode",                             // add the next page also
            topicNum: 0,
            textSection: "pattern"
        }    
    ]);
        setStartStudy(true);
    }

    useEffect(() => {
        if (startStudy) {
            console.log('flipped startStudy to True');
        }
      }, [startStudy]);

    
    if (startStudy) {
        redirect("/leetcode");
    } else { 
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

}

export default LeetCodeInfo;