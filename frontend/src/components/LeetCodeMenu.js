import React, { useEffect } from "react";


function LeetCodeMenu( {retrieveAllLeetCode, allLeetCode, setAllLeetCode, topicNum, setTopicNum, prevActionArr, setPrevActionArr, textSection, leetCodeEntry, setLeetCodeEntry, isFirstRender, setIsFirstRender} ) {

    
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

    // // RETRIEVE ALL LeetCode entries by Key
    //     // this is needed cuz otherwise idk how to dynamically generate content from a DB
    // const retrieveAllLeetCode = async () => {
    //     const response = await fetch(`/get`, { method: 'GET' });    // retrieve a single Leetcode Entry by Name
    //     const allLeetCodeEntries = await response.json();           // Name field is just based on which menu item is clicked
    //     console.log("ALL LEET CODES: ", allLeetCodeEntries);
    //     setAllLeetCode(allLeetCodeEntries);
    //     // setLeetCodeEntry(allLeetCodeEntries[0]);                 // set the default LeetCode to be the first one - BFS            
    // }


    // LOAD the LeetCode entry 
    useEffect(() => {
        retrieveAllLeetCode();
    }, []);      

    return (

    // <section className="leetcode-menu">
    //     <h2 className="patterns-menu-title">LeetCode Patterns</h2>     
    //     <article className="inner-menu">
    //         <button onClick={() => {handleTopicNum(1); retrieveLeetCode("BFS")}}>Pattern 1:  BFS</button>
    //         <button onClick={() => {handleTopicNum(2); retrieveLeetCode("DFS")}}>Pattern 2:  DFS</button>
    //         <button onClick={() => {handleTopicNum(3); retrieveLeetCode("DP")}}>Pattern 3:  DP</button>
    //         <button onClick={() => {handleTopicNum(4); retrieveLeetCode("BT")}}>Pattern 4:  BT</button>
    //         <button onClick={() => {handleTopicNum(5); retrieveLeetCode("UF")}}>Pattern 5:  UF</button>
    //         <button onClick={() => {handleTopicNum(6); retrieveLeetCode("FSP")}}>Pattern 6:  FSP</button>
    //         <button onClick={() => {handleTopicNum(7); retrieveLeetCode("SW")}}>Pattern 7:  SW</button>
    //         <button onClick={() => {handleTopicNum(8); retrieveLeetCode("CS")}}>Pattern 8:  CS</button>
    //         <button onClick={() => {handleTopicNum(9); retrieveLeetCode("TKE")}}>Pattern 9:  TKE</button>
    //         <button onClick={() => {handleTopicNum(10); retrieveLeetCode("QS")}}>Pattern 10:  QS</button>
    //     </article>
    // </section>

    <section className="leetcode-menu">
        <h2 className="patterns-menu-title">LeetCode Patterns</h2>     
        <article className="inner-menu">
            {allLeetCode.map( (leetCode, index) => 
                <button onClick={() => {handleTopicNum(index + 1); setLeetCodeEntry(leetCode);}}>Pattern {index+1}:  {leetCode.patternKey}</button>
            )}
        </article>
    </section>

    );
}

export default LeetCodeMenu;
