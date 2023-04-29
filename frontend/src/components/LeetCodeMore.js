import React from "react"

function LeetCodeMore( {topicNum, prevActionArr, handleTextSection, leetCodeEntry} ) {

    return(
        <>
        <div className="leet-main-page">
            <section className="text-section">
                <h2>More Info on:  {leetCodeEntry.patternName} </h2>
                <p>
                    {leetCodeEntry.patternMoreInfo}
                </p>
            </section>

            <button className="inner-buttons" onClick={ () => handleTextSection("pattern")}>Return to Studying</button>
            <p className="button-labels"> head back to LeetCode studying </p>
            <button className="inner-buttons" onClick={ () => handleTextSection("sources")}>Outside Sources</button>
            <p className="button-labels"> Find more sources on this topic </p>
        </div>
        </>
    );
}


export default LeetCodeMore;