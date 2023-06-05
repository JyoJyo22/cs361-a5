import React from "react"

function LeetCodeMore( {topicNum, prevActionArr, handleTextSection, leetCodeEntry} ) {

    const leetCodeSteps = leetCodeEntry.patternMoreInfo; 

    return(
        <>
        <div className="leet-main-page">

            <div className="text-section text-div">
                <h2>More Info on pattern {topicNum}:  {leetCodeEntry.patternName} </h2>
                <ul className="align-left">
                    {leetCodeSteps.map((step) => (
                        <li>{step}</li>
                    ))}
                </ul>
            </div>

            <div className="buttons-div">
                <div className="single-button">
                    <button className="inner-buttons" onClick={ () => handleTextSection("pattern")}>Return to Studying</button>
                    <p className="button-labels"> head back to LeetCode studying </p>
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


export default LeetCodeMore;