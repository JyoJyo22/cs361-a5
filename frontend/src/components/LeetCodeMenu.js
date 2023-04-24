import React, { useEffect } from "react";


function LeetCodeMenu( {topicNum, setTopicNum, prevActionArr, setPrevActionArr, textSection, setLeetCodeEntry} ) {

    const handleTopicNum = (num) => {
        setPrevActionArr(oldArr => [...oldArr, {            // PUSH a new prev state Obj to end of the prevActionArr
            key: oldArr.length,
            page: "leetcode",
            topicNum: topicNum,
            textSection: textSection
        }]);
        setTopicNum(num);
        console.log(prevActionArr);
    }

    // RETRIEVE a LeetCode entry by ID
    const retrieveLeetCode = async (_id) => {
        const response = await fetch('/get/:_id', { method: 'GET' });        // retrieve a single Leetcode Entry by ID
        const newLeetCode = await response.json();                          // ID is just based on which menu item is clicked
        setLeetCodeEntry(newLeetCode);                                          // see below, it'll be the same as topicNum
    } 

    // LOAD the LeetCode entry 
    useEffect((_id) => {
        retrieveLeetCode(_id);
    }, []);

    return (

    <section className="leetcode-menu">
        <h2 className="patterns-menu-title">LeetCode Patterns</h2>     
        <article className="inner-menu">
            <button onClick={() => {handleTopicNum(1); retrieveLeetCode(1)}}>Web Servers 1</button>
            <button onClick={() => {handleTopicNum(2); retrieveLeetCode(2)}}>Web Servers 2</button>
            <button onClick={() => {handleTopicNum(3); retrieveLeetCode(3)}}>Web Servers 3</button>
            <button onClick={() => {handleTopicNum(4); retrieveLeetCode(4)}}>Web Servers 4</button>
            <button onClick={() => {handleTopicNum(5); retrieveLeetCode(5)}}>Web Servers 5</button>
            <button onClick={() => {handleTopicNum(6); retrieveLeetCode(6)}}>Web Servers 6</button>
            <button onClick={() => {handleTopicNum(7); retrieveLeetCode(7)}}>Web Servers 7</button>
            <button onClick={() => {handleTopicNum(8); retrieveLeetCode(8)}}>Web Servers 8</button>
            <button onClick={() => {handleTopicNum(9); retrieveLeetCode(9)}}>Web Servers 9 </button>
            <button onClick={() => {handleTopicNum(10); retrieveLeetCode(10)}}>Web Servers 10</button>
        </article>
    </section>

    );
}

export default LeetCodeMenu;

