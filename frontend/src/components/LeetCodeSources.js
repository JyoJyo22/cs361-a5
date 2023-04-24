import React from "react"

function LeetCodeSources( {topicNum, prevActionArr, handleTextSection} ) {

    // call to DB or MicroService that loads the LeetCode SOURCES content based on topicNum
        // and if topicNum is 0, then this is just default Pattern page w/ "select a pattern to begin"
    // then return that info for rendering

    return(
        <>
        <div key={prevActionArr.length} className="leet-main-page">
            <section className="text-section">
                <h2>Find More Sources of Pattern number: {topicNum} </h2>
                <p>
                    Info about LeetCode goes here
                </p>
            </section>

            <button onClick={ () => handleTextSection("pattern")}>Return to Studying</button>
            <button onClick={ () => handleTextSection("more")}>Get More Info</button>
        </div>
        </>
    );
}


export default LeetCodeSources;