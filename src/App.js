import './App.css';
import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Outlet, Link } from "react-router-dom";

export default function App(props) {
  return (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Form />} />
        <Route path="*" element={<NoMatch />} />
      </Route>
    </Routes>
  </BrowserRouter>
  )
}

function Layout() {
  return (
    <div className='App'>
      <h1>Medical inssurance cost</h1>
      <nav>
        <ul>
          <li>
            <Link to="/">Form</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
        </ul>
      </nav>

      <hr />

      <Outlet />
    </div>
  );
}

function Form() {
  const [age, setAge] = useState(30);
  const [height, setHeight] = useState(170);
  const [mass, setMass] = useState(70);

  const post_url = "https://kapipapi-curly-adventure-7rp9vp9r9xr3www4-5000.preview.app.github.dev/";

  return (
    <div>
      <section class="formcarry-container">
        <form method="POST" enctype="multipart/form-data" action={post_url}>
          
          <div class="formcarry-block">
            <label for="fc-generated-1-name">Full Name</label>
            <input type="text" name="name" id="fc-generated-1-name" placeholder="Your first and last name" />
          </div>
          
          <div class="formcarry-block">
            <label for="fc-generated-1-email">Email</label>
            <input type="email" name="email" id="fc-generated-1-email" placeholder="john@doe.com" />
          </div>
          
          <div class="formcarry-block">
            <label for="fc-generated-1-height">Age</label>
            <input type="range" name="age" id="fc-generated-1-height" min="0" defaultValue={age} max="100" onChange={(event) => setAge(event.target.value)}/>
            {age} y/o
          </div>
          
          <div class="formcarry-block">
            <label for="fc-generated-1-height">Height</label>
            <input type="range" name="height" id="fc-generated-1-height" min="100" defaultValue={height} max="220" onChange={(event) => setHeight(event.target.value)}/>
            {height} cm
          </div>

          <div class="formcarry-block">
            <label for="fc-generated-1-mass">Body mass</label>
            <input type="range" name="height" id="fc-generated-1-mass" min="40" defaultValue={mass} max="120" onChange={(event) => setMass(event.target.value)}/>
            {mass} kg
          </div>

          <div class="formcarry-block">
            <label>Are you smoking cigarettes?</label>
            <input type="checkbox" name="smoker" id="fc-generated-1-smoker" class="switch"/>
            <label for="fc-generated-1-smoker"></label>
          </div>

          <div class="formcarry-block">
            <label>Do you have children?</label>
            <select name="children" id="fc-generated-1-children" required>
              <option value="" selected disabled>Please select..</option>
              <option value="0">I don't have kids</option>
              <option value="" disabled>How many kids you have?</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5 or more</option>
            </select>
          </div>
          
          <div class="formcarry-block">  
            <button type="submit">Calculate inssurance cost</button>
          </div>
        
        </form>
      </section>
    </div>
  );
}

function NoMatch() {
  return (
    <div>
      <h2>Nothing to see here!</h2>
      <p>
        <Link to="/">Go to the home page</Link>
      </p>
    </div>
  );
}