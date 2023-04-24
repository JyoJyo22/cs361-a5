import React from "react"
import LeetCodeMore from "../components/LeetCodeMore";
import LeetCodePattern from "../components/LeetCodePattern";
import LeetCodeSources from "../components/LeetCodeSources";


function LeetCodePage( {topicNum, textSection, setTextSection, setPrevActionArr} ) {

    const handleTextSection = (textSectionValue) => {
        setPrevActionArr(oldArr => [...oldArr, {
            page: "leetcode",
            topicNum: topicNum,
            textSection: textSection
        }]);
        setTextSection(textSectionValue);
    }


    switch(textSection) {
        case("more"):
            return(
                <LeetCodeMore topicNum={topicNum} handleTextSection={handleTextSection}/>
            );
        case("sources"):
            return(
                <LeetCodeSources topicNum={topicNum} handleTextSection={handleTextSection}/>
            );
        default:                                 // default to option "pattern" for Pattern page
            return(
                <LeetCodePattern topicNum={topicNum} handleTextSection={handleTextSection}/>
            );
    }
}

export default LeetCodePage;

    