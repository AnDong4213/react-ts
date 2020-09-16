import React, {Component} from 'react';
import A from './A';

class B extends Component {
  render() {
    return (<div>
      <img src={require('../images/1.jpg')} alt=''/>
    </div>)
  }
}

export default A(B)
