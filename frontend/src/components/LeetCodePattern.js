import React from "react"

function LeetCodePattern( {topicNum, prevActionArr, handleTextSection, leetCodeEntry} ) {

    // call to DB or MicroService that loads the LeetCode PATTERN content based on topicNum
        // and if topicNum is 0, then this is just default Pattern page w/ "select a pattern to begin"
    // then return that info for rendering

    return(
        <>
        <div className="leet-main-page">
            <section className="text-section">
                <h2>LeetCode Pattern: Pattern Name </h2>
                <p>
                    {/* {leetCodeEntry.patternInfo} */}
                    LeetCode pattern learning
                </p>
            </section>

            <button onClick={ () => handleTextSection("more")}>Get More Info</button>
            <button onClick={ () => handleTextSection("sources")}>Outside Sources</button>
        </div>
        </>
    );
}


export default LeetCodePattern;