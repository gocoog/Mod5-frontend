import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const useStyles = theme => ({
    root: {
      maxWidth: 345,
    },
    media: {
      height: 140,
      
    },
  });

class TaskCard extends React.Component {
    state = {
        submitted: false,
        completed: false
    }

    // useStyles = makeStyles({
    //     root: {
    //       maxWidth: 345,
    //     },
    //     media: {
    //       height: 140,
          
    //     },
    //   });

    componentDidMount() {
        this.setState({
            submitted: this.props.submitted,
            completed: this.props.completed
        })
    }

    handleAdultButton = (e) => {
        e.preventDefault()
        let patchData = {
            "completed": true
        }
        fetch(`http://localhost:3001/tasks/${this.props.task.id}`, {
            method: 'PATCH',
            body: JSON.stringify(patchData),
            headers: {
                'Content-Type': 'application/json',
                'Accept': "application/json"
                }
        }).then(res => res.json())
        .then(json => {
            console.log(json)
            this.getWallets(json.user_id, json.task_amount, json.task_name)
            this.setState({
                ...this.state,
                completed: true
            })
        })
    }

    getWallets = (user_id, task_amount, task_name) => {
        fetch('http://localhost:3001/wallets')
        .then(res => res.json())
        .then(wallets => {
            this.walletDeposit(wallets, user_id, task_amount, task_name)
        })
    }

    walletDeposit = (wallets, user_id, task_amount, task_name) => {
        for(const wallet of wallets) {
            if (wallet.user.id === user_id) {
                let newWalletDeposit = {
                    amount: wallet.amount + task_amount,
                }

                fetch(`http://localhost:3001/wallets/${wallet.id}`, {
                         method: 'PATCH',
                         body: JSON.stringify(newWalletDeposit),
                         headers: {
                            'Content-Type': 'application/json',
                            'Accept': "application/json"
                            }
                     })
                     .then(res => res.json())
                     .then(json => console.log(json))

                fetch('http://localhost:3001/transactions', {
                    method: 'POST',
                    body: JSON.stringify({
                        wallet_id: wallet.id,
                        transaction_type: 'Deposit',
                        amount: task_amount,
                        transaction_desc: task_name
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
    }

    handleChildClick = (e) => {
        e.preventDefault()
        let patchData = {
            "submitted": true
        }
        fetch(`http://localhost:3001/tasks/${this.props.task.id}`, {
                    method: 'PATCH',
                    body: JSON.stringify(patchData),
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': "application/json"
                      }
                }).then(res => res.json())
                .then(json => {
                    console.log(json)
                    this.setState({
                        ...this.state,
                        submitted: true
                    })
                })
    }

    render(){
        const { classes } = this.props;
        return(
            <Card className="card-container">
                
                <CardActionArea>
                    <CardMedia
                    style={{height: 190}}
                    image={this.props.task.task_img}
                    title="task image"
                    />
                    <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        Task amount: ${this.props.task.task_amount}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        Task description:
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {this.props.task.task_name}
                    </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions className="card-buttons">
                    {this.props.isAdult ? 
                        (this.state.completed ? <button className="all-done-button" disabled >Approved</button> : (this.state.submitted ? <button className="submit-button" onClick={this.handleAdultButton}>Approve</button> : null)) 
                        : 
                        (this.state.submitted ? <button className="all-done-button"  disabled > submitted</button> : <button className="submit-button" onClick={this.handleChildClick}>submit!</button>)
                        }
                        <div>
                            {this.props.isAdult ? <button className="delete-button" onClick={(e) => this.props.handleDelete(e, this.props.task.id)}>Delete</button> : null}
                        </div>
                   
                </CardActions>
            </Card>
                // <div class="card">
                    
                //     <img src={this.props.task.task_img} alt="Avatar" style={{width: "20%"}} />
                //     <div class="container">
                //         <h4><b>{this.props.task.task_name}</b></h4> 
                //         <p>${this.props.task.task_amount}</p> 
                //         {this.props.isAdult ? 
                //         (this.state.completed ? <button disabled >Complete</button> : (this.state.submitted ? <button onClick={this.handleAdultButton}>Submit completion</button> : null)) 
                //         : 
                //         (this.state.submitted ? <button disabled > submitted</button> : <button onClick={this.handleChildClick}>submit!</button>)
                //         }
                //         <div>
                //             {this.props.isAdult ? <button onClick={(e) => this.props.handleDelete(e, this.props.task.id)}>❌</button> : null}
                //         </div>
                //     </div>
                // </div>
        )
    }
}

export default withStyles(useStyles) (TaskCard)