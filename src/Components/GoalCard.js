import React, { Component } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import {
    CircularProgressbar,
    CircularProgressbarWithChildren,
    buildStyles
  } from "react-circular-progressbar";
  import "react-circular-progressbar/dist/styles.css";
  
  // Animation
  import { easeQuadInOut } from "d3-ease";
//   import AnimatedProgressProvider from "./AnimatedProgressProvider";
//   import ChangingProgressProvider from "./ChangingProgressProvider";
  
  // Radial separators
//   import RadialSeparators from "./RadialSeparators";

class GoalCard extends Component {
    state = {
        progress: 0
    }

    componentDidMount() {
        this.percentage()
    }

    percentage = () => {
        let progress = (this.props.wallet_amount * 100) / this.props.goal.goal_amount

        progress = Math.round(progress)
        this.setState({
            progress: progress
        })
    }

    render() {
        return (
            <Card className="card-container2">
                
                <CardActionArea>
                    <CardMedia style={{height: 290}} title="task image">
                    
                    <CircularProgressbar
                        value={this.state.progress}
                        text={`${this.state.progress}%`}
                        styles={buildStyles({
                        textColor: "red",
                        pathColor: "turquoise",
                        trailColor: "gold"
                        })}
                    />
                    </CardMedia>
                    <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        Goal amount: ${this.props.goal.goal_amount}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        Task description:
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {this.props.goal.goal_name}
                    </Typography>
                    </CardContent>
                </CardActionArea>
                {/* <CardActions className="card-buttons">
                    {this.props.isAdult ? 
                        (this.state.completed ? <button className="all-done-button" disabled >Complete</button> : (this.state.submitted ? <button className="completion-button" onClick={this.handleAdultButton}>Submit completion</button> : null)) 
                        : 
                        (this.state.submitted ? <button disabled > submitted</button> : <button className="submit-button" onClick={this.handleChildClick}>submit!</button>)
                        }
                        <div>
                            {this.props.isAdult ? <button className="delete-button" onClick={(e) => this.props.handleDelete(e, this.props.task.id)}>Delete</button> : null}
                        </div>
                   
                </CardActions> */}
            </Card>
            // <div>
            //     {this.state.progress}
            //     {this.props.goal.goal_name}
            //     {this.props.goal.goal_amount}
            // </div>
        )
    }
}

export default GoalCard