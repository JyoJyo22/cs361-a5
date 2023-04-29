import React from "react"

function LeetCodePattern( {topicNum, prevActionArr, handleTextSection, leetCodeEntry} ) {

    // call to DB or MicroService that loads the LeetCode PATTERN content based on topicNum
        // and if topicNum is 0, then this is just default Pattern page w/ "select a pattern to begin"
    // then return that info for rendering

    return(
        <>
        <div className="leet-main-page">
            <section className="text-section">
                <h2>LeetCode Pattern: {leetCodeEntry.patternName} </h2>
                <p>
                    {leetCodeEntry.patternInfo}
                </p>
            </section>

            <button className="inner-buttons" onClick={ () => handleTextSection("more")}>Get More Info</button>
            <p className="button-labels"> Head here for extra info on this topic </p>
            <button className="inner-buttons" onClick={ () => handleTextSection("sources")}>Outside Sources</button>
            <p className="button-labels"> Find more sources on this topic </p>
        </div>
        </>
    );
}


export default LeetCodePattern;