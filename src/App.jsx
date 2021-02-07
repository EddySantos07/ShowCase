import React, { Component } from "react";
import DisplayProjects from './components/DisplayProjects/DisplayProjectContainer.jsx';
class App extends React.Component {

    constructor() {
        super()
    }

    render() {
        return (
            <>

                <div> testing App Component</div>
                
                <DisplayProjects/>

            </>
        );
    }

};

export default App;