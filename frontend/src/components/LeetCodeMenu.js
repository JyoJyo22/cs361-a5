import React, { useEffect } from "react";


function LeetCodeMenu( {topicNum, setTopicNum, prevActionArr, setPrevActionArr, textSection, leetCodeEntry, setLeetCodeEntry, isFirstRender, setIsFirstRender} ) {

    

    const handleTopicNum = (num) => {
        setPrevActionArr(oldArr => [...oldArr, {            // PUSH a new prev state Obj to end of the prevActionArr
            page: "leetcode",
            topicNum: topicNum,
            textSection: textSection,
            leetCodeEntry: leetCodeEntry
        }]);
        setTopicNum(num);
        console.log("Previous actions: ", prevActionArr);
    }

    // RETRIEVE a LeetCode entry by ID
    const retrieveLeetCode = async (patternName) => {
       // const response = await fetch(`/get/${patternName}`, { method: 'GET' });    // retrieve a single Leetcode Entry by Name
        const response = await fetch(`https://leetcode-microservice.onrender.com/get/${patternName}`);
        const newLeetCode = await response.json();                     // Name field is just based on which menu item is clicked
        console.log("NEW LEET CODE: ", newLeetCode);
        setLeetCodeEntry(newLeetCode);                            
    } 

    // LOAD the LeetCode entry 
    useEffect(() => {
        retrieveLeetCode(leetCodeEntry.patternName);
    }, []);      

    return (

    <section className="leetcode-menu">
        <h2 className="patterns-menu-title">LeetCode Patterns</h2>     
        <article className="inner-menu">
            <button onClick={() => {handleTopicNum(1); retrieveLeetCode("BFS")}}>Pattern 1</button>
            <button onClick={() => {handleTopicNum(2); retrieveLeetCode("DFS")}}>Pattern 2</button>
            <button onClick={() => {handleTopicNum(3); retrieveLeetCode("DP")}}>Pattern 3</button>
            <button onClick={() => {handleTopicNum(4); retrieveLeetCode("BT")}}>Pattern 4</button>
            <button onClick={() => {handleTopicNum(5); retrieveLeetCode("UF")}}>Pattern 5</button>
            <button onClick={() => {handleTopicNum(6); retrieveLeetCode("FSP")}}>Pattern 6</button>
            <button onClick={() => {handleTopicNum(7); retrieveLeetCode("SW")}}>Pattern 7</button>
            <button onClick={() => {handleTopicNum(8); retrieveLeetCode("CS")}}>Pattern 8</button>
            <button onClick={() => {handleTopicNum(9); retrieveLeetCode("TKE")}}>Pattern 9</button>
            <button onClick={() => {handleTopicNum(10); retrieveLeetCode("QS")}}>Pattern 10</button>
        </article>
    </section>

    );
}

export default LeetCodeMenu;

