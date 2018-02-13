import React, { Component } from 'react';

class SkillItem extends Component {
  deleteSkill(id){
    this.props.onDelete(id);
  }
  render() {
    return (
      <li className="Skill">
        <strong>{this.props.skill.title}</strong><a href="#" onClick={this.deleteSkill.bind(this, this.props.skill.id)}>X</a>
      </li>
    );
  }
}

SkillItem.propTypes = {
  skill: React.PropTypes.object,
  onDelete: React.PropTypes.func
}

export default SkillItem;
