import React, { Component } from 'react';
import SkillItem from './SkillItem';

class Skills extends Component {
    deleteSkill(id){
        this.props.onDelete(id);
    }

    render() {
    let skillItems;
    if(this.props.skills){
      skillItems = this.props.skills.map(skill => {
        //console.log(skill);
        return (
          <SkillItem onDelete={this.deleteSkill.bind(this)} key={skill.title} skill={skill} />
        );
      });
    }
    return (
      <div className="Skills">
        <h3>Latest Skills</h3>
        {skillItems}
      </div>
    );
  }
}

Skills.propTypes = {
  skills: React.PropTypes.array,
  onDelete: React.PropTypes.func
}

export default Skills;
