import React, { useEffect } from "react";


function LeetCodeMenu( {topicNum, setTopicNum, prevActionArr, setPrevActionArr, textSection, leetCodeEntry, setLeetCodeEntry} ) {

    const handleTopicNum = (num) => {
        setPrevActionArr(oldArr => [...oldArr, {            // PUSH a new prev state Obj to end of the prevActionArr
            page: "leetcode",
            topicNum: topicNum,
            textSection: textSection
        }]);
        setTopicNum(num);
        console.log(prevActionArr);
    }

    // RETRIEVE a LeetCode entry by ID
    const retrieveLeetCode = async (patternName) => {
        const response = await fetch(`/get/${patternName}`, { method: 'GET' });    // retrieve a single Leetcode Entry by Name
        const newLeetCode = await response.json();                     // Name field is just based on which menu item is clicked
        setLeetCodeEntry(newLeetCode);                                          // see below, it'll be the same as topicNum
    } 

    // LOAD the LeetCode entry 
    useEffect(() => {
            retrieveLeetCode(leetCodeEntry.patternName);
    }, [leetCodeEntry.patternName]);

    return (

    <section className="leetcode-menu">
        <h2 className="patterns-menu-title">LeetCode Patterns</h2>     
        <article className="inner-menu">
            <button onClick={() => {handleTopicNum(1); retrieveLeetCode("A message from CS361")}}>Pattern 1</button>
            <button onClick={() => {handleTopicNum(2); retrieveLeetCode("Fast & Slow Pointers")}}>Pattern 2</button>
            <button onClick={() => {handleTopicNum(3); retrieveLeetCode(3)}}>Pattern 3</button>
            <button onClick={() => {handleTopicNum(4); retrieveLeetCode(4)}}>Pattern 4</button>
            <button onClick={() => {handleTopicNum(5); retrieveLeetCode(5)}}>Pattern 5</button>
            <button onClick={() => {handleTopicNum(6); retrieveLeetCode(6)}}>Pattern 6</button>
            <button onClick={() => {handleTopicNum(7); retrieveLeetCode(7)}}>Pattern 7</button>
            <button onClick={() => {handleTopicNum(8); retrieveLeetCode(8)}}>Pattern 8</button>
            <button onClick={() => {handleTopicNum(9); retrieveLeetCode(9)}}>Pattern 9 </button>
            <button onClick={() => {handleTopicNum(10); retrieveLeetCode(10)}}>Pattern 10</button>
        </article>
    </section>

    );
}

export default LeetCodeMenu;

