import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Nav from './components/Nav';
import NavBack from './components/NavBack';
import HomePage from './pages/HomePage';
import LeetCodeMenu from './components/LeetCodeMenu';
import LeetCodePage from './pages/LeetCodePage';
import AddEditDel from './components/AddEditDel';
import popUpAdd from './components/popUpAdd';
import popUpEdit from './components/popUpEdit';



function App() {

  const [info, setInfo] = useState("home");                     // for Home Page content
  const [topicNum, setTopicNum] = useState(1);                  // for Leetcode Menu pattern/topic number 
  const [textSection, setTextSection] = useState("pattern");    // for LeetCode Page content

  const [prevActionArr, setPrevActionArr] = useState([]);       // for back button

  const [leetCodeEntry, setLeetCodeEntry] = useState({            // Use state to bring in LeetCode data from MongoDB
    patternKey: "pattern key",
    patternName: "pattern name",                                    
    patternInfo: ["pattern info"],
    patternMoreInfo: ["more pattern info"],
    patternSources: ["pattern sources"]
  }); 

  const [allLeetCode, setAllLeetCode] = useState(["all leet code entries"]);

  const [isFirstRender, setIsFirstRender] = useState(true);         // constant for skipping a render on page load

  const [editIsOpen, setEditIsOpen] = useState(false);
  const [addIsOpen, setAddIsOpen] = useState(false);


//   // RETRIEVE the default LeetCode entry by ID
//   const retrieveLeetCode = async (patternKey) => {
//     const response = await fetch(`/get/${patternKey}`, { method: 'GET' });     // retrieve a single Leetcode Entry by Name
//     const newLeetCode = await response.json();                     
//     setLeetCodeEntry(newLeetCode);                                    
// } 
//
//   // LOAD the default LeetCode entry - BFS
//   useEffect(() => {
//     retrieveLeetCode("BFS");       
//   }, []);

  // RETRIEVE ALL LeetCode entries by Key
  // this is needed cuz otherwise idk how to dynamically generate content from a DB
    const retrieveAllLeetCode = async () => {
      const response = await fetch(`/get`, { method: 'GET' });    // retrieve a single Leetcode Entry by Name
      const allLeetCodeEntries = await response.json();           // Name field is just based on which menu item is clicked
      console.log("ALL LEET CODES: ", allLeetCodeEntries);
      setAllLeetCode(allLeetCodeEntries);
      setLeetCodeEntry(allLeetCodeEntries[0]);                 // set the default LeetCode to be the first one - BFS            
    }

    useEffect(() => {
      retrieveAllLeetCode("BFS");       
    }, []);


  return (
    <div className="app">
      <BrowserRouter>

        <section className="nav-and-menu">
          <Routes>
            <Route path="/" element={<Nav setInfo={setInfo} />} />
            <Route path="/leetcode" element={[
              <NavBack 
                  setInfo={setInfo} 
                  prevActionArr={prevActionArr} 
                  setPrevActionArr={setPrevActionArr} 
                  setTopicNum={setTopicNum} 
                  setTextSection={setTextSection}
                  leetCodeEntry={leetCodeEntry}
                  setLeetCodeEntry={setLeetCodeEntry}
              />, 
              <LeetCodeMenu 
                  topicNum={topicNum} 
                  setTopicNum={setTopicNum}
                  prevActionArr={prevActionArr} 
                  setPrevActionArr={setPrevActionArr} 
                  textSection={textSection} 
                  leetCodeEntry={leetCodeEntry}
                  setLeetCodeEntry={setLeetCodeEntry}
                  allLeetCode={allLeetCode}
                  setAllLeetCode={setAllLeetCode}
                  isFirstRender={isFirstRender}
                  setIsFirstRender={setIsFirstRender}
                  retrieveAllLeetCode={retrieveAllLeetCode}
              />,
              <AddEditDel
                  addIsOpen={addIsOpen}
                  setAddIsOpen={setAddIsOpen}
                  editIsOpen={editIsOpen}
                  setEditIsOpen={setEditIsOpen}
                  leetCodeEntry={leetCodeEntry}
                  setLeetCodeEntry={setLeetCodeEntry}
                  retrieveAllLeetCode={retrieveAllLeetCode}
                  topicNum={topicNum} 
                  setTopicNum={setTopicNum}
                  className="add-edit-del"
              />
            ]}/>
          </Routes>
        </section>

          <main>
            <section>
              <Routes>
                <Route path="/" element={
                  <HomePage 
                    info={info} 
                    prevActionArr={prevActionArr} 
                    setPrevActionArr={setPrevActionArr} 
                    setTopicNum={setTopicNum}
                    setTextSection={setTextSection}
                    setLeetCodeEntry={setLeetCodeEntry}
                  />} 
                />
                <Route path="/leetcode" element={[
                  <LeetCodePage 
                    topicNum={topicNum} 
                    setTopicNum={setTopicNum}
                    textSection={textSection} 
                    setTextSection={setTextSection} 
                    prevActionArr={prevActionArr} 
                    setPrevActionArr={setPrevActionArr} 
                    leetCodeEntry={leetCodeEntry}
                    setLeetCodeEntry={setLeetCodeEntry}
                    setIsFirstRender={setIsFirstRender}
                    addIsOpen={addIsOpen}
                    setAddIsOpen={setAddIsOpen}
                    editIsOpen={editIsOpen}
                    setEditIsOpen={setEditIsOpen}
                    retrieveAllLeetCode={retrieveAllLeetCode}
                  />,
                  // <popUpEdit editIsOpen={editIsOpen} setEditIsOpen={setEditIsOpen} leetCodeEntry={leetCodeEntry} />,
                  // <popUpAdd addIsOpen={addIsOpen} setAddIsOpen={setAddIsOpen} />
                ]}/>
              </Routes>
            </section>
          </main>

      </BrowserRouter>
    </div>
  );
}

export default App;
