import React, {Component} from 'react';

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


const A = (WrapperComponent) => {
  return class Permission extends Component{
    render(){
      return (
        <div className='a-container'>
          <div className="header">
            <div>提示</div>
            <div> X </div>
          </div>
          <div className="content">
            <WrapperComponent {...this.props} />
          </div>
        </div>
	  )
	}
  }
};


export default A;
