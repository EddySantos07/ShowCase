import React, { Component } from "react";
import DisplayProjects from './components/DisplayProjects/DisplayProjectContainer';

class App extends React.Component {

    render() {
        return (
            <>
                <div className="AppContainer"> </div>


                <div> testing App Component </div>
                
                <DisplayProjects/>

            </>
        );
    }

};

export default App;