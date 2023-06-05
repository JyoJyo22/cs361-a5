import React from "react"

function LeetCodeSources( {topicNum, prevActionArr, handleTextSection, leetCodeEntry} ) {

    // call to DB or MicroService that loads the LeetCode SOURCES content based on topicNum
    // and if topicNum is 0, then this is just default Pattern page w/ "select a pattern to begin"
    // then return that info for rendering

    const leetCodePatternSources = leetCodeEntry.patternSources;

    return(
        <>
        <div key={prevActionArr.length} className="leet-main-page">

            <div className="text-section text-div">
                <h2>Explore more sources of pattern {topicNum}: {leetCodeEntry.patternName} </h2>
                <ul className="align-left">
                    {leetCodePatternSources.map((source) => (
                        <li>{source}</li>
                    ))}
                </ul>
                <p>
                    Practice these problems on the LeetCode site
                </p>
            </div>
        
            <div className="buttons-div">
                <div className="single-button">
                    <button className="inner-buttons" onClick={ () => handleTextSection("pattern")}>Return to Studying</button>
                    <p className="button-labels"> head back to LeetCode studying </p>
                </div>
                <div className="single-button">
                    <button className="inner-buttons" onClick={ () => handleTextSection("more")}>Get More Info</button>
                    <p className="button-labels"> Head here for extra info on this topic </p>
                </div>
            </div>

        </div>
        </>
    );
}


export default LeetCodeSources;