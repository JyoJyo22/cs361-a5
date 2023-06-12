import { React, useState } from "react"
import LeetCodeMore from "../components/LeetCodeMore";
import LeetCodePattern from "../components/LeetCodePattern";
import LeetCodeSources from "../components/LeetCodeSources";
import { Dialog } from '@headlessui/react';


function LeetCodePage( {retrieveAllLeetCode, addIsOpen, setAddIsOpen, editIsOpen, setEditIsOpen, topicNum, setTopicNum, textSection, setTextSection, prevActionArr, setPrevActionArr, leetCodeEntry, setLeetCodeEntry} ) {

    const handleTextSection = (textSectionValue) => {
        setPrevActionArr(oldArr => [...oldArr, {
            page: "leetcode",
            topicNum: topicNum,
            textSection: textSection,
            leetCodeEntry: leetCodeEntry
        }]);
        setTextSection(textSectionValue);
        console.log("Previous actions: ", prevActionArr);
    }

    const [newPatternKey, setNewPatternKey]               = useState('newPatternKey');
    const [newPatternName, setNewPatternName]             = useState('newPatternName');
    const [newPatternInfo, setNewPatternInfo]             = useState('newPatternInfo');
    const [newPatternSteps, setNewPatternSteps]           = useState('newPatternSteps');
    const [newPatternProblems, setNewPatternProblems]     = useState('newPatternProblems');

    const [editPatternKey, setEditPatternKey]               = useState(leetCodeEntry.patternKey);
    const [editPatternName, setEditPatternName]             = useState(leetCodeEntry.patternName);
    const [editPatternInfo, setEditPatternInfo]             = useState(leetCodeEntry.patternInfo);
    const [editPatternSteps, setEditPatternSteps]           = useState(leetCodeEntry.patternMoreInfo);
    const [editPatternProblems, setEditPatternProblems]     = useState(leetCodeEntry.patternSources);


    const addLeetCode = async () => {
        const patternInfoArr = newPatternInfo.split('&');         // parse the user string into an array via & delimiter
        const patternStepsArr = newPatternSteps.split('&');
        const patternProblemsArr = newPatternProblems.split('&');
        const newLeetCode = { 
            patternKey: newPatternKey,
            patternName: newPatternName,
            patternInfo: patternInfoArr,
            patternMoreInfo: patternStepsArr,
            patternSources: patternProblemsArr
        };
        const response = await fetch('/create', {
            method: 'POST',
            body: JSON.stringify(newLeetCode),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if(response.status === 201){
            alert(`A new LeetCode entry has been successfully added to the DB`);
            retrieveAllLeetCode();
            setTopicNum(1);
        } else {
            alert(`A new LeetCode entry has failed to add to the DB`);
        }

    }

    const editLeetCode = async () => {
        let editPatternInfoArr = leetCodeEntry.patternInfo;         // check if user has changed the values or not
        let editPatternStepsArr = leetCodeEntry.patternMoreInfo;    // if user didn't update a value, then just set it 
        let editPatternProblemsArr = leetCodeEntry.patternSources;  // back to its default value, which is the old value
        let editPatternKeyCheck = leetCodeEntry.patternKey;
        let editPatternNameCheck = leetCodeEntry.patternName;

        console.log(editPatternInfo);
        console.log(leetCodeEntry.patternInfo);

        if (editPatternInfo.toString() !== leetCodeEntry.patternInfo.toString()) {
            if (editPatternInfo === undefined || editPatternInfo === '') {
                editPatternInfoArr = leetCodeEntry.patternInfo;
            } else {
                editPatternInfoArr = editPatternInfo.split('&');
            }
            
        }
        if (editPatternSteps.toString() !== leetCodeEntry.patternMoreInfo.toString()) {
            if (editPatternSteps === undefined || editPatternSteps === '') {
                editPatternStepsArr = leetCodeEntry.patternMoreInfo;
            } else {
                editPatternStepsArr = editPatternSteps.split('&');
            }
        }
        if (editPatternProblems.toString() !== leetCodeEntry.patternSources.toString()) {
            if (editPatternProblems === '' || editPatternProblems === undefined) {
                editPatternProblemsArr = leetCodeEntry.patternSources;
            } else {
                editPatternProblemsArr = editPatternProblems.split('&');
            }
        }
        if (editPatternKey !== leetCodeEntry.patternKey) {
            editPatternKeyCheck = editPatternKey;
        }
        if (editPatternName !== leetCodeEntry.patternName) {
            editPatternNameCheck = editPatternName;
        }

        const response = await fetch(`/update/${leetCodeEntry._id}`, {
            method: 'PUT',
            body: JSON.stringify({ 
                patternKey: editPatternKeyCheck,
                patternName: editPatternNameCheck,
                patternInfo: editPatternInfoArr,
                patternMoreInfo: editPatternStepsArr,
                patternSources: editPatternProblemsArr
            }),
            headers: {'Content-Type': 'application/json'},
        });

        if (response.status === 200) {
            alert(`A new LeetCode entry has been successfully updated in the DB`);
            retrieveAllLeetCode();
            setTopicNum(1);
        } else {
            const errMessage = await response.json();
            alert(`A new LeetCode entry has failed to update in the DB, with err msg: ${errMessage.Error}`);
        }
    }


    switch(textSection) {
        case("more"):
            return(
                <>
                    <Dialog open={addIsOpen} onClose={() => setAddIsOpen(false)}>
                        <Dialog.Panel>
                            <Dialog.Title>Add LeetCode Entry</Dialog.Title>

                            <article>
                                    <label htmlFor="patternKey">Key</label>
                                    <input
                                        type="text"
                                        name="key"
                                        placeholder="Pattern Key"
                                        onChange={e => setNewPatternKey(e.target.value)} 
                                        id="patternKey"
                                    />
                                    
                                    <label htmlFor="patternName">Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="Pattern Name"
                                        onChange={e => setNewPatternName(e.target.value)} 
                                        id="patternName"
                                    />

                                    <label htmlFor="patternInfo">Main Info</label>
                                    <textarea
                                        type="text"
                                        name="info[]"
                                        placeholder="Pattern Main Info"
                                        onChange={e => setNewPatternInfo(e.target.value)}
                                        id="patternInfo"
                                    />

                                    <label htmlFor="patternSteps">Steps</label>
                                    <textarea
                                        type="text"
                                        name="steps[]"
                                        placeholder="Pattern Steps"
                                        onChange={e => setNewPatternSteps(e.target.value)} 
                                        id="patternSteps"
                                    />

                                    <label htmlFor="patternProblems">Problems</label>
                                    <textarea
                                        type="text"
                                        name="problems[]"
                                        placeholder="Pattern LC Problems"
                                        onChange={e => setNewPatternProblems(e.target.value)}
                                        id="patternProblems"
                                    />

                                    <button onClick={ () => {addLeetCode(); setAddIsOpen(false)} }>Add LeetCode</button>
                            </article>
                        </Dialog.Panel>
                    </Dialog>

                    <Dialog open={editIsOpen} onClose={() => setEditIsOpen(false)}>
                        <Dialog.Panel>
                            <Dialog.Title>Edit LeetCode Entry</Dialog.Title>
                            <article>
                                    <label htmlFor="patternKey">Key</label>
                                    <input
                                        type="text"
                                        name="key"
                                        placeholder={leetCodeEntry.patternKey}
                                        onChange={ (e) => {
                                            if (e) setEditPatternKey(e.target.value)
                                            } 
                                        } 
                                        id="patternKey"
                                    />
                                    
                                    <label htmlFor="patternName">Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder={leetCodeEntry.patternName}
                                        onChange={ (e) => {
                                            if (e) setEditPatternName(e.target.value)
                                            } 
                                        } 
                                        id="patternName"
                                    />

                                    <label htmlFor="patternInfo">Main Info</label>
                                    <textarea
                                        type="text"
                                        name="info[]"
                                        placeholder={leetCodeEntry.patternInfo}
                                        onChange={ (e) => {
                                            if (e) setEditPatternInfo(e.target.value)
                                            } 
                                        }
                                        id="patternInfo"
                                    />

                                    <label htmlFor="patternSteps">Steps</label>
                                    <textarea
                                        type="text"
                                        name="steps[]"
                                        placeholder={leetCodeEntry.patternMoreInfo}
                                        onChange={ (e) => {
                                            if (e) setEditPatternSteps(e.target.value)
                                            } 
                                        } 
                                        id="patternSteps"
                                    />

                                    <label htmlFor="patternProblems">Problems</label>
                                    <textarea
                                        type="text"
                                        name="problems[]"
                                        placeholder={leetCodeEntry.patternSources}
                                        onChange={ (e) => {
                                            if (e) setEditPatternProblems(e.target.value)
                                            } 
                                        }
                                        id="patternProblems"
                                    />

                                    <button onClick={ () => {editLeetCode(); setEditIsOpen(false)} }>Edit LeetCode</button>
                            </article>
                        </Dialog.Panel>
                    </Dialog>

                    <LeetCodeMore 
                        topicNum={topicNum} 
                        prevActionArr={prevActionArr} 
                        handleTextSection={handleTextSection}
                        leetCodeEntry={leetCodeEntry}
                    />
                </>
            );
        case("sources"):
            return(
                <>
                    <Dialog open={addIsOpen} onClose={() => setAddIsOpen(false)}>
                        <Dialog.Panel>
                            <Dialog.Title>Add LeetCode Entry</Dialog.Title>

                            <article>
                                    <label htmlFor="patternKey">Key</label>
                                    <input
                                        type="text"
                                        name="key"
                                        placeholder="Pattern Key"
                                        onChange={e => setNewPatternKey(e.target.value)} 
                                        id="patternKey"
                                    />
                                    
                                    <label htmlFor="patternName">Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="Pattern Name"
                                        onChange={e => setNewPatternName(e.target.value)} 
                                        id="patternName"
                                    />

                                    <label htmlFor="patternInfo">Main Info</label>
                                    <textarea
                                        type="text"
                                        name="info[]"
                                        placeholder="Pattern Main Info"
                                        onChange={e => setNewPatternInfo(e.target.value)}
                                        id="patternInfo"
                                    />

                                    <label htmlFor="patternSteps">Steps</label>
                                    <textarea
                                        type="text"
                                        name="steps[]"
                                        placeholder="Pattern Steps"
                                        onChange={e => setNewPatternSteps(e.target.value)} 
                                        id="patternSteps"
                                    />

                                    <label htmlFor="patternProblems">Problems</label>
                                    <textarea
                                        type="text"
                                        name="problems[]"
                                        placeholder="Pattern LC Problems"
                                        onChange={e => setNewPatternProblems(e.target.value)}
                                        id="patternProblems"
                                    />

                                    <button onClick={ () => {addLeetCode(); setAddIsOpen(false)} }>Add LeetCode</button>
                            </article>
                        </Dialog.Panel>
                    </Dialog>

                    <Dialog open={editIsOpen} onClose={() => setEditIsOpen(false)}>
                        <Dialog.Panel>
                            <Dialog.Title>Edit LeetCode Entry</Dialog.Title>
                            <article>
                                    <label htmlFor="patternKey">Key</label>
                                    <input
                                        type="text"
                                        name="key"
                                        placeholder={leetCodeEntry.patternKey}
                                        onChange={ (e) => {
                                            if (e) setEditPatternKey(e.target.value)
                                            } 
                                        } 
                                        id="patternKey"
                                    />
                                    
                                    <label htmlFor="patternName">Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder={leetCodeEntry.patternName}
                                        onChange={ (e) => {
                                            if (e) setEditPatternName(e.target.value)
                                            } 
                                        } 
                                        id="patternName"
                                    />

                                    <label htmlFor="patternInfo">Main Info</label>
                                    <textarea
                                        type="text"
                                        name="info[]"
                                        placeholder={leetCodeEntry.patternInfo}
                                        onChange={ (e) => {
                                            if (e) setEditPatternInfo(e.target.value)
                                            } 
                                        }
                                        id="patternInfo"
                                    />

                                    <label htmlFor="patternSteps">Steps</label>
                                    <textarea
                                        type="text"
                                        name="steps[]"
                                        placeholder={leetCodeEntry.patternMoreInfo}
                                        onChange={ (e) => {
                                            if (e) setEditPatternSteps(e.target.value)
                                            } 
                                        } 
                                        id="patternSteps"
                                    />

                                    <label htmlFor="patternProblems">Problems</label>
                                    <textarea
                                        type="text"
                                        name="problems[]"
                                        placeholder={leetCodeEntry.patternSources}
                                        onChange={ (e) => {
                                            if (e) setEditPatternProblems(e.target.value)
                                            } 
                                        }
                                        id="patternProblems"
                                    />

                                    <button onClick={ () => {editLeetCode(); setEditIsOpen(false)} }>Edit LeetCode</button>
                            </article>
                        </Dialog.Panel>
                    </Dialog>

                    <LeetCodeSources 
                        topicNum={topicNum} 
                        prevActionArr={prevActionArr} 
                        handleTextSection={handleTextSection}
                        leetCodeEntry={leetCodeEntry}
                    />
                </>
            );
        default:                                 // default to option "pattern" for Pattern "main info" page
            return(
                <>
                    <Dialog open={addIsOpen} onClose={() => setAddIsOpen(false)}>
                        <Dialog.Panel>
                            <Dialog.Title>Add LeetCode Entry</Dialog.Title>

                            <article>
                                    <label htmlFor="patternKey">Key</label>
                                    <input
                                        type="text"
                                        name="key"
                                        placeholder="Pattern Key"
                                        onChange={e => setNewPatternKey(e.target.value)} 
                                        id="patternKey"
                                    />
                                    
                                    <label htmlFor="patternName">Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="Pattern Name"
                                        onChange={e => setNewPatternName(e.target.value)} 
                                        id="patternName"
                                    />

                                    <label htmlFor="patternInfo">Main Info</label>
                                    <textarea
                                        type="text"
                                        name="info[]"
                                        placeholder="Pattern Main Info"
                                        onChange={e => setNewPatternInfo(e.target.value)}
                                        id="patternInfo"
                                    />

                                    <label htmlFor="patternSteps">Steps</label>
                                    <textarea
                                        type="text"
                                        name="steps[]"
                                        placeholder="Pattern Steps"
                                        onChange={e => setNewPatternSteps(e.target.value)} 
                                        id="patternSteps"
                                    />

                                    <label htmlFor="patternProblems">Problems</label>
                                    <textarea
                                        type="text"
                                        name="problems[]"
                                        placeholder="Pattern LC Problems"
                                        onChange={e => setNewPatternProblems(e.target.value)}
                                        id="patternProblems"
                                    />

                                    <button onClick={ () => {addLeetCode(); setAddIsOpen(false)} }>Add LeetCode</button>
                            </article>
                        </Dialog.Panel>
                    </Dialog>

                    <Dialog open={editIsOpen} onClose={() => setEditIsOpen(false)}>
                        <Dialog.Panel>
                            <Dialog.Title>Edit LeetCode Entry</Dialog.Title>
                            <article>
                                    <label htmlFor="patternKey">Key</label>
                                    <input
                                        type="text"
                                        name="key"
                                        placeholder={leetCodeEntry.patternKey}
                                        onChange={ (e) => {
                                            if (e) setEditPatternKey(e.target.value)
                                            } 
                                        } 
                                        id="patternKey"
                                    />
                                    
                                    <label htmlFor="patternName">Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder={leetCodeEntry.patternName}
                                        onChange={ (e) => {
                                            if (e) setEditPatternName(e.target.value)
                                            } 
                                        } 
                                        id="patternName"
                                    />

                                    <label htmlFor="patternInfo">Main Info</label>
                                    <textarea
                                        type="text"
                                        name="info[]"
                                        placeholder={leetCodeEntry.patternInfo}
                                        onChange={ (e) => {
                                            if (e) setEditPatternInfo(e.target.value)
                                            } 
                                        }
                                        id="patternInfo"
                                    />

                                    <label htmlFor="patternSteps">Steps</label>
                                    <textarea
                                        type="text"
                                        name="steps[]"
                                        placeholder={leetCodeEntry.patternMoreInfo}
                                        onChange={ (e) => {
                                            if (e) setEditPatternSteps(e.target.value)
                                            } 
                                        } 
                                        id="patternSteps"
                                    />

                                    <label htmlFor="patternProblems">Problems</label>
                                    <textarea
                                        type="text"
                                        name="problems[]"
                                        placeholder={leetCodeEntry.patternSources}
                                        onChange={ (e) => {
                                            if (e) setEditPatternProblems(e.target.value)
                                            } 
                                        }
                                        id="patternProblems"
                                    />

                                    <button onClick={ () => {editLeetCode(); setEditIsOpen(false)} }>Edit LeetCode</button>
                            </article>
                        </Dialog.Panel>
                    </Dialog>

                    <LeetCodePattern 
                        topicNum={topicNum} 
                        prevActionArr={prevActionArr} 
                        handleTextSection={handleTextSection}
                        leetCodeEntry={leetCodeEntry}
                    />
                </>
            );
    }
}

export default LeetCodePage;

    