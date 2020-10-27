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
        progress: this.props.progress,
        completed: this.props.goal.completed
    }

    // componentDidMount() {
    //     this.percentage()
    // }
    componentDidMount() {
        // Call this function so that it fetch first time right after mounting the component
        this.percentage();
    
        // set Interval
        this.interval = setInterval(this.percentage, 500);
    }
    
    componentWillUnmount() {
        // Clear the interval right before component unmount
        clearInterval(this.interval);
    }

    percentage = () => {
        let progress = (this.props.wallet.amount * 100) / this.props.goal.goal_amount

        progress = Math.round(progress)
        this.setState({
            progress: progress
        })
    }

    handleClick = () => {

        if (this.state.progress >= 100) {
            let patchData = {
                completed: true
            }

            fetch(`http://localhost:3001/goals/${this.props.goal.id}`, {
            method: 'PATCH',
            body: JSON.stringify(patchData),
            headers: {
                'Content-Type': 'application/json',
                'Auth-Key': localStorage.getItem('auth_key')
              }
            }) .then(res => res.json())
            .then(json => this.setState({
                completed: true
            }))

            let walletData = {
                amount: (this.props.wallet.amount - this.props.goal.goal_amount)
            }
            fetch(`http://localhost:3001/wallets/${this.props.wallet.id}`, {
                method: 'PATCH',
                body: JSON.stringify(walletData),
                headers: {
                    'Content-Type': 'application/json',
                    'Auth-Key': localStorage.getItem('auth_key')
                  }
            }).then(res => res.json())
            .then(json => {
                this.props.getTransactions(json.id) 
                this.props.handleState(json)
            })

            fetch('http://localhost:3001/transactions', {
                    method: 'POST',
                    body: JSON.stringify({
                        wallet_id: this.props.wallet.id,
                        transaction_type: 'Withdrawal',
                        amount: this.props.goal.goal_amount,
                        transaction_desc: this.props.goal.goal_name
                    }),
                    headers: {
                        'Content-Type': 'application/json',
                        'Auth-Key': localStorage.getItem('auth_key')
                      }
                })
                .then(res => res.json())
                .then(json => console.log(json))
        }
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
                <CardActions className="card-buttons">
                    {this.state.completed ? 
                    <button className="all-done-button" disabled >Complete</button>
                    :
                        <button className="completion-button" onClick={this.handleClick}>Completed</button> }
                        <button className="delete-button" onClick={(e) => this.props.handleDelete(e, this.props.goal.id)} >Delete</button>
                   
                </CardActions>
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