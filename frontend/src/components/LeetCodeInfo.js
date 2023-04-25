import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";

function LeetCodeInfo( {prevActionArr, setPrevActionArr, setTopicNum, setTextSection, leetCodeEntry, setLeetCodeEntry} ) {

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

    // RETRIEVE all LeetCode entries
    const retrieveLeetCode = async () => {
        const response = await fetch('/get', { method: 'GET' });        
        const LeetCodeList = await response.json();       
        const defaultLeetCodePage = LeetCodeList[0];                 
        setLeetCodeEntry(defaultLeetCodePage);                             // the first LC in the List is the default page 
        console.log("LeetCode List: ", LeetCodeList);
        console.log("LeetCode List at [0] is ", LeetCodeList[0]);
        console.log("leetCodeEntry: ", leetCodeEntry);
    } 

    // LOAD all LeetCode entries as a LIST
    useEffect(() => {
        retrieveLeetCode();
    }, []);


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