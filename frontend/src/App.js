import React, { useState } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Nav from './components/Nav';
import NavBack from './components/NavBack'
import HomePage from './pages/HomePage';
import ContactPage from './pages/ContactPage';
import LeetCodeMenu from './components/LeetCodeMenu';
import LeetCodePage from './pages/LeetCodePage';



function App() {
  // pass shared State up to ancestor component
  // these State vars are shared btw KanjiHomePage and KanjiEditPage
  // const [kanji, setKanji] = useState([]);

  return (
    <div className="app">
      <BrowserRouter>

        <section className="nav-and-menu">
          <Routes>
            <Route path="/" element={<Nav/>} />
            <Route path="/contact" element={<Nav/>} />
            <Route path="/leetcode" element={[<NavBack/>, <LeetCodeMenu />]} />
          </Routes>
        </section>

          <main>
            <section>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/leetcode" element={<LeetCodePage />} />
              </Routes>
            </section>
          </main>

      </BrowserRouter>
    </div>
  );
}

export default App;
