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

            <button onClick={ () => handleTextSection("pattern")}>Return to Studying</button>
            <button onClick={ () => handleTextSection("sources")}>Outside Sources</button>
        </div>
        </>
    );
}


export default LeetCodeMore;