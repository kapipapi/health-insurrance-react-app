import './App.css';
import React, { useState } from 'react';

export default function App(props) {
  const [age, setAge] = useState(30);
  const [height, setHeight] = useState(170);
  const [mass, setMass] = useState(70);

  return (
    <div className='App'>
      <h1>Medical inssurance cost</h1>
<section class="formcarry-container">
  <form action="#" method="POST" enctype="multipart/form-data">
    
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
      <input type="range" name="height" id="fc-generated-1-height" min="0" defaultValue={age} max="100" onChange={(event) => setAge(event.target.value)}/>
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
      <input type="checkbox" name="smoker" id="fc-generated-1-smoker" class="switch" />
      <label for="fc-generated-1-smoker"></label>
    </div>

    <div class="formcarry-block">
      <label>Do you have children?</label>
        <select name="people" id="fc-generated-1-people">
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

// Log to console
console.log('Hello console')