import React, { useState } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Nav from './components/Nav';
import NavBack from './components/NavBack';
import HomePage from './pages/HomePage';
import LeetCodeMenu from './components/LeetCodeMenu';
import LeetCodePage from './pages/LeetCodePage';



function App() {

  const [info, setInfo] = useState("home");                     // for Home Page content
  const [topicNum, setTopicNum] = useState(0);                  // for Leetcode Menu pattern/topic number 
  const [textSection, setTextSection] = useState("pattern");    // for LeetCode Page content

  const [prevActionArr, setPrevActionArr] = useState([]);       // for back button

  const [leetcodeEntry, setLeetCodeEntry] = useState({            // Use state to bring in LeetCode data from MongoDB
    patternNo: 0,                                               // set default for default LeetCode Page
    patternName: "pattern name",
    patternInfo: "pattern info",
    patternMoreInfo: "more pattern info",
    patternSources  : "pattern soruces"
  });                                                       


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
              />, 
              <LeetCodeMenu 
                  topicNum={topicNum} 
                  setTopicNum={setTopicNum}
                  prevActionArr={prevActionArr} 
                  setPrevActionArr={setPrevActionArr} 
                  textSection={textSection} 
                  setLeetCodeEntry={setLeetCodeEntry}
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
                    leetcodeEntry={leetcodeEntry}
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
