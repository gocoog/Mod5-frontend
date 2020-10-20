import React from 'react'
import 'tui-grid/dist/tui-grid.css';
import Grid from '@toast-ui/react-grid';
import TuiGrid from 'tui-grid';
TuiGrid.applyTheme('striped');
// let data = []

// const mapTransactions = (props) => {
//     for (const transaction of props.transactions) {
//         data.push({desc: transaction.transaction_desc, amount: transaction.amount, type: transaction.transaction_type})
//     }
//     console.log(data)
// }
  
  const columns = [
    {name: 'desc', header: 'Transaction Description'},
    {name: 'amount', header: 'Amount'},
    {name: 'type', header: 'Transaction Type'}
  ];

const TransactionTable = (props) => {
    let data = []

    for (const transaction of props.transactions) {
        data.push({desc: transaction.transaction_desc, amount: `$${transaction.amount}`, type: transaction.transaction_type})
    }

    return (
        <div>
            <Grid
                data={data}
                columns={columns}
                rowHeight={25}
                bodyHeight={300}
                heightResizable={true}
                // rowHeaders={['rowNum']}
            />
        </div>
    )
}

export default TransactionTable