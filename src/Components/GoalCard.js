import React, { Component } from 'react'

class GoalCard extends Component {
    render() {
        return (
            <div>
                {this.props.goal.goal_name}
            </div>
        )
    }
}

export default GoalCard