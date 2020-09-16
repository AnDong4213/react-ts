import React, { Component } from 'react';

/* export default class A extends Component {
  render() {
    return (
      <div className='a-container'>
        <div className='header'>
          <div>提示</div>
          <div> X </div>
        </div>
        <div>
          这是内容部分
        </div>
      </div>
    )
  }
} */

function A(WrappedComponent: any) {
  return class A extends Component {
    render() {
      return (
        <div className='a-container'>
          <div className='header'>
            <div>提示</div>
            <div> X </div>
          </div>
          <div>
            <WrappedComponent></WrappedComponent>
          </div>
        </div>
      )
    }
  }
}

export default A
