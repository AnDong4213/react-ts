import React, { Component } from 'react';
import A from './A';

class C extends Component {
  render() {
    return (
      <div>
        <img src={require('../images/2.jpg')} alt='' />
      </div>
    )
  }
}

export default A(C)
