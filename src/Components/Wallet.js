import React, { Component } from 'react'
import GoalCard from './GoalCard'
import TransactionTable from './TransactionTable';
import Lottie from 'react-lottie';
import animationData from '../lotties/dash';

const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };

export default class Wallet extends Component {
    state = {
        wallet_amount: 0,
        goals: [],
        transactions: []
    }
    componentDidMount(){
        const id = parseInt(localStorage.getItem('user_id'))

      Promise.all([fetch(`http://localhost:3001/wallets`), fetch('http://localhost:3001/goals')])

      .then(([res1, res2]) => { 
         return Promise.all([res1.json(), res2.json()]) 
      })
      .then(([res1, res2]) => {
          this.userWallet(res1)
          this.userGoals(res2, id)
      });  
    }

    userGoals = (goals, id) => {
        for (const goal of goals) {
            if(goal.user_id === id) {
                this.setState({
                    ...this.state,
                    goals: [...this.state.goals, goal]
                })
            }
        }
    }

    userWallet = (wallets) => {
        for(const wallet of wallets) {
            if (wallet.user.id === parseInt(localStorage.getItem('user_id')) ) {
                this.getTransactions(wallet.id)
                this.setState({
                    ...this.state,
                    wallet_amount: wallet.amount
                })
            }
        }
    }

    getTransactions = (wallet_id) => {
        fetch('http://localhost:3001/transactions')
        .then(res => res.json())
        .then(transactions => this.getUserTransactions(wallet_id, transactions))
    }

    getUserTransactions = (wallet_id, transactions) => {
        for (const transaction of transactions) {
            if (transaction.wallet.id === wallet_id) {
                this.setState({
                    ...this.state,
                    transactions: [...this.state.transactions, transaction]
                })
            }
        }
        console.log(this.state)
    }


    render(){
        return (
            <div id="bg">
                
            <div className="flex-container">
                <div className='flex-child' >
                <h1 className="progress-page">Progress Page!</h1>
                    <div id="cards">
                    {this.state.goals.map(goal => 
                        <GoalCard  key={goal.id} goal={goal} wallet_amount={this.state.wallet_amount}/>
                        )}

                    </div>
                
                </div>
                <div className="flex-child" id="transaction-table">
                <Lottie 
                    options={defaultOptions}
                    height={400}
                    width={400}
                />
                <TransactionTable transactions={this.state.transactions}/>
                
                </div>
                </div>
            </div>
        )
    }
}