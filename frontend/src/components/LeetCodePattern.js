import React from "react"

function LeetCodePattern( {topicNum, handleTextSection, leetCodeEntry} ) {

    // call to DB or MicroService that loads the LeetCode PATTERN content based on topicNum
    // and if topicNum is 0, then this is just default Pattern page w/ "select a pattern to begin"
    // then return that info for rendering

    const leetCodePatternList = leetCodeEntry.patternInfo;

    return(
        <>
        <div className="leet-main-page">

            <div className="text-section text-div">
                <h2>LeetCode Pattern {topicNum}: {leetCodeEntry.patternName} </h2>
                <ul className="align-left">
                    {leetCodePatternList.map((info) => (
                        <li>{info}</li>
                    ))}
                </ul>
            </div>

            <div className="buttons-div">
                <div className="single-button">
                    <button className="inner-buttons" onClick={ () => handleTextSection("more")}>Get More Info</button>
                    <p className="button-labels"> Head here for extra info on this topic </p>
                </div>
                <div className="single-button">
                    <button className="inner-buttons" onClick={ () => handleTextSection("sources")}>Outside Sources</button>
                    <p className="button-labels"> Find more sources on this topic </p>
                </div>
            </div>

        </div>
        </>
    );
}


export default LeetCodePattern;