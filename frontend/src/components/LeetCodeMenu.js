import React from "react";


function LeetCodeMenu( {topicNum, setTopicNum, prevActionArr, setPrevActionArr, textSection} ) {

    const handleTopicNum = (num) => {
        setPrevActionArr(oldArr => [...oldArr, {            // push a new prev state Obj to end of the prevActionArr
            key: oldArr.length,
            page: "leetcode",
            topicNum: topicNum,
            textSection: textSection
        }]);
        setTopicNum(num);
        console.log(prevActionArr);
    }

    return (

    <section className="leetcode-menu">
        <h2 className="patterns-menu-title">LeetCode Patterns</h2>
        <article className="inner-menu">
            <button onClick={() => handleTopicNum(1)}>Web Servers 1</button>
            <button onClick={() => handleTopicNum(2)}>Web Servers 2</button>
            <button onClick={() => handleTopicNum(3)}>Web Servers 3</button>
            <button onClick={() => handleTopicNum(4)}>Web Servers 4</button>
            <button onClick={() => handleTopicNum(5)}>Web Servers 5</button>
            <button onClick={() => handleTopicNum(6)}>Web Servers 6</button>
            <button onClick={() => handleTopicNum(7)}>Web Servers 7</button>
            <button onClick={() => handleTopicNum(8)}>Web Servers 8</button>
            <button onClick={() => handleTopicNum(9)}>Web Servers 9 </button>
            <button onClick={() => handleTopicNum(10)}>Web Servers 10</button>
        </article>
    </section>

    );
}

export default LeetCodeMenu;

