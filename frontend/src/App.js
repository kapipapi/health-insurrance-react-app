import './App.css';
import React, {useState} from 'react';
import {BrowserRouter, Routes, Route, Outlet, Link} from "react-router-dom";

export default function App(props) {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout/>}>
                    <Route index element={<Form/>}/>
                    <Route path="/result" element={<Result/>}/>
                    <Route path="/about" element={<About/>}/>
                    <Route path="/table" element={<Table/>}/>
                    <Route path="*" element={<NoMatch/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

function Layout() {
    return (
        <div className='App'>
            <h1 className="Title">Medical inssurance cost</h1>
            <nav>
                <li>
                    <Link to="/">Form</Link>
                </li>
                <li>
                    <Link to="/about">About</Link>
                </li>
                <li>
                    <Link to="/table">Table</Link>
                </li>
            </nav>

            <hr/>

            <Outlet/>
        </div>
    );
}

function Result() {
    const query = new URLSearchParams(window.location.search);
    const name = query.get('name')
    const charges = query.get('charges')

    return (
        <div className='App'>
            <h2>Result</h2>
            <h3 className="lower">Name:</h3>
            <h2 className="upper">{name}</h2>
            <h3 className="lower">Insurance charges:</h3>
            <h2 className="upper">$ {charges} $</h2>
        </div>
    );
}

function About() {
    return (
        <div className='App'>
            <h3>Authors</h3>
            <p>Paweł Czapla</p>
            <p>Kacper Ledwosiński</p>
        </div>
    );
}

function Table() {
    let [isLoaded, setIsLoaded] = useState(false);
    let [data, setData] = useState([]);

    if (!isLoaded) {
        fetch("http://localhost:5000/", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(response => response.json())
            .then(data => {
                setData(data)
                setIsLoaded(true)
            });
    }

    return (
        <div className='Table'>
            <table>
                <tr>
                    <th>name</th>
                    <th>age</th>
                    <th>charges</th>
                </tr>
                {data.map((value, index) => {
                    return <tr key={value.name + index}>
                        <td>{value.name}</td>
                        <td>{value.age} y/o</td>
                        <td>{value.charges} $</td>
                    </tr>
                })}
            </table>
        </div>
    );
}


function Form() {
    const [age, setAge] = useState(30);
    const [height, setHeight] = useState(170);
    const [mass, setMass] = useState(70);

    const post_url = "http://localhost:5000";

    return (
        <div>
            <section class="formcarry-container">
                <form method="POST" enctype="application/x-www-form-urlencoded" action={post_url}>

                    <div class="formcarry-block">
                        <label for="fc-generated-1-name">Full Name</label>
                        <input type="text" name="name" id="fc-generated-1-name" placeholder="Your first and last name"/>
                    </div>

                    <div class="formcarry-block">
                        <label for="fc-generated-1-email">Email</label>
                        <input type="email" name="email" id="fc-generated-1-email" placeholder="john@doe.com"/>
                    </div>

                    <div class="formcarry-block">
                        <label for="fc-generated-1-height">Age</label>
                        <input type="range" name="age" id="fc-generated-1-height" min="0" defaultValue={age} max="100"
                               onChange={(event) => setAge(event.target.value)}/>
                        {age} y/o
                    </div>

                    <div class="formcarry-block">
                        <label for="fc-generated-1-height">Height</label>
                        <input type="range" name="height" id="fc-generated-1-height" min="100" defaultValue={height}
                               max="220" onChange={(event) => setHeight(event.target.value)}/>
                        {height} cm
                    </div>

                    <div class="formcarry-block">
                        <label for="fc-generated-1-mass">Body mass</label>
                        <input type="range" name="weight" id="fc-generated-1-mass" min="40" defaultValue={mass}
                               max="120" onChange={(event) => setMass(event.target.value)}/>
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