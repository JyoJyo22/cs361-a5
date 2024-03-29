import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";

function LeetCodeInfo( {prevActionArr, setPrevActionArr, setTopicNum, setTextSection, setIsFirstRender, leetCodeEntry, setLeetCodeEntry} ) {

    const redirect = useNavigate();
    const [startStudy, setStartStudy] = useState(false);

    const handleStudy = () => {
        setPrevActionArr([{                 // push a new prev state Obj to end of the prevActionArr                   
            page: "/",                      // set it to the first obj every time you come back to this page
            topicNum: 0,
            textSection: "pattern"
        }]);
        setStartStudy(true);
        // console.log(prevActionArr);
    }

    // // RETRIEVE all LeetCode entries
    // const retrieveLeetCode = async () => {
    //     const response = await fetch('/get', { method: 'GET' });        
    //     const LeetCodeList = await response.json();       
    //     const defaultLeetCodePage = LeetCodeList[0];                 
    //     setLeetCodeEntry(defaultLeetCodePage);                          // the first LC in the List is the default page 
    //     // console.log("LeetCode List: ", LeetCodeList);
    //     // console.log("LeetCode List at [0] is ", LeetCodeList[0]);
    //     // console.log("leetCodeEntry: ", leetCodeEntry);
    // } 

    // // LOAD all LeetCode entries as a LIST
    // useEffect(() => {
    //     retrieveLeetCode();
    // }, []);


    useEffect(() => {
        if (startStudy) {
            setStartStudy(false);
            setTopicNum(1);                      // set the default as the first LC pattern
            setTextSection("pattern");           
            redirect("/leetcode");
        }
        setIsFirstRender = true;
    }, [startStudy, setIsFirstRender]);
      
      
    return(
        <>
            <section className="text-section">
                <h2>LeetCode Patterns</h2>
                <p>
                    For those new to LeetCode, each problem can be solved with a specific algorithmic pattern. Being
                    able to identify these patterns and when to use them is critical for LeetCode success. All of the
                    possible LeetCode patterns that learners may need will be presented here along with: a description
                    of that pattern, the general steps for implementing that pattern to solve a problem, and LeetCode 
                    problems that require the use of the given pattern.
                </p>
            </section>

            <button onClick={() => handleStudy()} className="start-studying">Start Studying Leetcode</button>
        </>
    );
}

export default LeetCodeInfo;