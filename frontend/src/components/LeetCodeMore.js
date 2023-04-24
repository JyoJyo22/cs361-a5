import React from "react"

function LeetCodeMore( {topicNum, prevActionArr, handleTextSection} ) {

    // call to DB or MicroService that loads the LeetCode MORE content based on topicNum
        // and if topicNum is 0, then this is just default Pattern page w/ "select a pattern to begin"
    // then return that info for rendering

    return(
        <>
        <div className="leet-main-page">
            <section className="text-section">
                <h2>More Info on Pattern of Pattern number: {topicNum} </h2>
                <p>
                    Info about LeetCode MORE goes here
                </p>
            </section>

            <button onClick={ () => handleTextSection("pattern")}>Return to Studying</button>
            <button onClick={ () => handleTextSection("sources")}>Outside Sources</button>
        </div>
        </>
    );
}


export default LeetCodeMore;