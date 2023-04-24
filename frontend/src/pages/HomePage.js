import React from "react";
import ContactInfo from "../components/ContactInfo";
import HomeInfo from "../components/HomeInfo";
import LeetCodeInfo from "../components/LeetCodeInfo";

function HomePage( {info, prevActionArr, setPrevActionArr, setTopicNum, setTextSection} ) {

    switch(info) {
        case "contact":
            return(
                <ContactInfo/>
            );
        case "leetcode":
            return(
                <LeetCodeInfo 
                    prevActionArr={prevActionArr} 
                    setPrevActionArr={setPrevActionArr} 
                    setTopicNum={setTopicNum} 
                    setTextSection={setTextSection}
                />
            );
        default:                    // default to option "home" for home page
            return(
                <HomeInfo />
            );
    
    }

}


export default HomePage;