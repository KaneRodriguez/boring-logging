import React, { Component } from 'react';

class BoringItem extends Component {
  deleteBoring(id){
    this.props.onDelete(id);
  }

  render() {
    return (
      <li className="Boring">
        <strong>{this.props.boring.title}</strong>: {this.props.boring.category} <a href="#" onClick={this.deleteBoring.bind(this, this.props.boring.id)}>X</a>
      </li>
    );
  }
}

BoringItem.propTypes = {
  boring: React.PropTypes.object,
  onDelete: React.PropTypes.func
}

export default BoringItem;
