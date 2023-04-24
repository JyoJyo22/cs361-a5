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
                  setPrevActionArr={setPrevActionArr} 
                  textSection={textSection}
              />
            ]}/>
          </Routes>
        </section>

          <main>
            <section>
              <Routes>
                <Route path="/" element={<HomePage info={info} setPrevActionArr={setPrevActionArr} />} />
                <Route path="/leetcode" element={
                  <LeetCodePage 
                    topicNum={topicNum} 
                    textSection={textSection} 
                    setTextSection={setTextSection} 
                    setPrevActionArr={setPrevActionArr}
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
