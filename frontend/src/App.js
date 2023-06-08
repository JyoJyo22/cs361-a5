import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Nav from './components/Nav';
import NavBack from './components/NavBack';
import HomePage from './pages/HomePage';
import LeetCodeMenu from './components/LeetCodeMenu';
import LeetCodePage from './pages/LeetCodePage';



function App() {

  const [info, setInfo] = useState("home");                     // for Home Page content
  const [topicNum, setTopicNum] = useState(1);                  // for Leetcode Menu pattern/topic number 
  const [textSection, setTextSection] = useState("pattern");    // for LeetCode Page content

  const [prevActionArr, setPrevActionArr] = useState([]);       // for back button

  const [leetCodeEntry, setLeetCodeEntry] = useState({            // Use state to bring in LeetCode data from MongoDB
    patternName: "pattern name",                                    
    patternInfo: ["pattern info"],
    patternMoreInfo: ["more pattern info"],
    patternSources: ["pattern sources"]
  }); 

  const [isFirstRender, setIsFirstRender] = useState(true);         // constant for skipping a render on page load


  // RETRIEVE the default LeetCode entry by ID
  const retrieveLeetCode = async (patternKey) => {
    const response = await fetch(`/get/${patternKey}`, { method: 'GET' });     // retrieve a single Leetcode Entry by Name
    const newLeetCode = await response.json();                     
    setLeetCodeEntry(newLeetCode);                                    
} 

  // LOAD the default LeetCode entry 
  useEffect(() => {
    retrieveLeetCode("BFS");          // 2 Pointers will be default pattern
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
                  isFirstRender={isFirstRender}
                  setIsFirstRender={setIsFirstRender}
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
                <Route path="/leetcode" element={
                  <LeetCodePage 
                    topicNum={topicNum} 
                    textSection={textSection} 
                    setTextSection={setTextSection} 
                    prevActionArr={prevActionArr} 
                    setPrevActionArr={setPrevActionArr} 
                    leetCodeEntry={leetCodeEntry}
                    setLeetCodeEntry={setLeetCodeEntry}
                    setIsFirstRender={setIsFirstRender}
                  />
                }/>
              </Routes>
            </section>
          </main>

      </BrowserRouter>
    </div>
  );
}

export default App;
