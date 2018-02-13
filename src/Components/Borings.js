import React, { Component } from 'react';
import BoringItem from './BoringItem';

class Borings extends Component {
  deleteBoring(id){
    this.props.onDelete(id);
  }

  render() {
    let boringItems;
    if(this.props.borings){
      boringItems = this.props.borings.map(boring => {
        //console.log(boring);
        return (
          <BoringItem onDelete={this.deleteBoring.bind(this)} key={boring.title} boring={boring} />
        );
      });
    }
    return (
      <div className="Borings">
        <h3>Latest Borings</h3>
        {boringItems}
      </div>
    );
  }
}

Borings.propTypes = {
  borings: React.PropTypes.array,
  onDelete: React.PropTypes.func
}

export default Borings;
