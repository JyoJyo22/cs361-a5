import React from "react"
import LeetCodeMore from "../components/LeetCodeMore";
import LeetCodePattern from "../components/LeetCodePattern";
import LeetCodeSources from "../components/LeetCodeSources";


function LeetCodePage( {topicNum, textSection, setTextSection, prevActionArr, setPrevActionArr, leetCodeEntry} ) {

    const handleTextSection = (textSectionValue) => {
        setPrevActionArr(oldArr => [...oldArr, {
            page: "leetcode",
            topicNum: topicNum,
            textSection: textSection
        }]);
        setTextSection(textSectionValue);
        console.log(prevActionArr);
    }


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

    