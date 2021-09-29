import React, { Component } from 'react';
import { createPortal } from 'react-dom';
const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component {
  render() {
    return createPortal(
      <div className="modal-backdrop">
        <div className="modal-contetnt">{this.props.children} </div>
      </div>,
      modalRoot,
    );
  }
}
