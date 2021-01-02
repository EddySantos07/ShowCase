// import React, { Component } from 'react';

import React, { useState } from 'react';
import GetProjects from './GetProjects';

function DisplayProjectContainer () {

  return (
      <div className="ProjectHouseContainer"> hosues projects Container
        <GetProjects/>
      </div>
    ); 
}

export default DisplayProjectContainer;