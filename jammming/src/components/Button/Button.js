import React from 'react';
import './loading.css';
import './loading-btn.css';

class Button extends React.Component {
  constructor (props) {
    super(props);

    this.clickHandler = this.clickHandler.bind(this);
    this.getCurrentButtonState = this.getCurrentButtonState.bind(this);
  }

  clickHandler (e) {
    this.props.handleClick(e);
  }

  getCurrentButtonState () {
    const defaultClass = (this.props.classes || '') + ' ld-over-inverse';

    if (this.props.success) {
      return defaultClass;
    } else {
      return defaultClass + ' running';
    }
  }

  render () {
    return (
      <a className={this.getCurrentButtonState()} onClick={this.clickHandler}>
        <div>{ this.props.text }</div>
        <div className={'ld ld-ring ld-spin'}></div>
      </a>
    );
  }
}

export default Button;