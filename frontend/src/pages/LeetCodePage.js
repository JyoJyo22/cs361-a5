import { React, useEffect } from "react"
import LeetCodeMore from "../components/LeetCodeMore";
import LeetCodePattern from "../components/LeetCodePattern";
import LeetCodeSources from "../components/LeetCodeSources";


function LeetCodePage( {topicNum, textSection, setTextSection, prevActionArr, setPrevActionArr, leetCodeEntry, setLeetCodeEntry} ) {

    const handleTextSection = (textSectionValue) => {
        setPrevActionArr(oldArr => [...oldArr, {
            page: "leetcode",
            topicNum: topicNum,
            textSection: textSection,
            leetCodeEntry: leetCodeEntry
        }]);
        setTextSection(textSectionValue);
        console.log("Previous actions: ", prevActionArr);
    }

    // // RETRIEVE a LeetCode entry by ID
    // const retrieveLeetCode = async (patternName) => {
    //      const response = await fetch(`/get/${patternName}`, { method: 'GET' });    // retrieve a single Leetcode Entry by Name
    //     // const response = await fetch(`https://leetcode-microservice.onrender.com/get/${patternName}`);
    //      const newLeetCode = await response.json();               
    //      console.log("INITIAL LEET CODE: ", newLeetCode);
    //      setLeetCodeEntry(newLeetCode);                                
    //  } 
 
    //  // LOAD the LeetCode entry 
    //  useEffect(() => {
    //      retrieveLeetCode("BFS");
    //  }, []);


    switch(textSection) {
        case("more"):
            return(
                <LeetCodeMore 
                    topicNum={topicNum} 
                    prevActionArr={prevActionArr} 
                    handleTextSection={handleTextSection}
                    leetCodeEntry={leetCodeEntry}
                />
            );
        case("sources"):
            return(
                <LeetCodeSources 
                    topicNum={topicNum} 
                    prevActionArr={prevActionArr} 
                    handleTextSection={handleTextSection}
                    leetCodeEntry={leetCodeEntry}
                />
            );
        default:                                 // default to option "pattern" for Pattern page
            return(
                <LeetCodePattern 
                    topicNum={topicNum} 
                    prevActionArr={prevActionArr} 
                    handleTextSection={handleTextSection}
                    leetCodeEntry={leetCodeEntry}
                />
            );
    }
}

export default LeetCodePage;

    