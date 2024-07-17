import { useState } from 'react'
import './index.css'

const initialExpense = [
	// { id: '1bc2ad', message: 'Milk', expense: 40 },
	// { id: '2bc3ad', message: 'Vegetable', expense: -80 },
	// { id: '3bc4ad', message: 'Snacks', expense: -30 },
	// { id: '4bc5ad', message: 'Freelance', expense: 1000 },
]

export default function App() {
	const [expenseList, setExpenseList] = useState(initialExpense)

	function handleAddExpense(newExp) {
		setExpenseList(expenseList => [newExp, ...expenseList])
	}

	function handleTotalIncome() {
		const totalIncome = expenseList.reduce(
			(acc, exp) => (acc += exp.expense),
			0
		)
		return totalIncome
	}

	function handleIncome() {
		const income = expenseList.reduce((acc, exp) => {
			if (exp.expense > 0) {
				acc += exp.expense
			}
			return acc
		}, 0)

		return income
	}

	function handleExpense() {
		const expense = expenseList.reduce((acc, exp) => {
			if (exp.expense < 0) {
				acc += exp.expense
			}
			return acc
		}, 0)

		return expense
	}

	function handleDelete(id) {
		setExpenseList(expenseList => expenseList.filter(el => el.id !== id))
	}

	const totalIncome = handleTotalIncome()
	const income = handleIncome()
	const expense = handleExpense()

	return (
		<div className='app'>
			<header>Expense Tracker</header>
			<ShowBalance
				totalIncome={totalIncome}
				income={income}
				expense={expense}
			/>
			<History onExpenseList={expenseList} onDelete={handleDelete} />
			<NewTransaction onAddExpense={handleAddExpense} />
		</div>
	)
}

function ShowBalance({ totalIncome, income, expense }) {
	return (
		<div className='showBalance-cont'>
			<div className='showBalance'>
				<h3 className='your-ble-label'>YOUR BALANCE</h3>
				<h4>${totalIncome}</h4>
			</div>

			<div className='income-expense-cont'>
				<div className='income-ble'>
					<h3>INCOME</h3>
					<h4>+ {income}</h4>
				</div>
				<hr />
				<div className='expense-ble'>
					<h3>EXPENSE</h3>
					<h4>- {Math.abs(expense)}</h4>
				</div>
			</div>
		</div>
	)
}

function History({ onExpenseList, onDelete }) {
	return (
		<div className='history'>
			<h3>Transaction History</h3>
			<hr />
			<div className='history-cont'>
				<HistoryList onExpenseList={onExpenseList} onDelete={onDelete} />
			</div>
		</div>
	)
}

function HistoryList({ onExpenseList, onDelete }) {
	return (
		<>
			{onExpenseList.map(expense => (
				<div className='history-list' key={expense.id}>
					<h1>Hello</h1>
					<span className='delete-list' onClick={() => onDelete(expense.id)}>
						🗑️
					</span>
					<h4>{expense.message}</h4>
					{expense.expense < 0 ? (
						<h3 style={{ color: 'red' }}>-{expense.expense}</h3>
					) : (
						<h3 style={{ color: 'green' }}>+{expense.expense}</h3>
					)}
				</div>
			))}
		</>
	)
}

function NewTransaction({ onAddExpense }) {
	return (
		<div className='new-transaction'>
			<div>
				<h3>Add New Transaction</h3>
				<hr />
			</div>
			<TransactionForm onAddExpense={onAddExpense} />
		</div>
	)
}

function TransactionForm({ onAddExpense }) {
	const [message, setMessage] = useState('')
	const [expense, setExpense] = useState('')

	function handleSubmit(event) {
		event.preventDefault()

		const id = crypto.randomUUID().slice(0, 6)
		console.log(id)

		const newExpense = {
			message,
			expense,
			id: id,
		}

		onAddExpense(newExpense)
	}

	return (
		<>
			<form
				className='transaction-form'
				onSubmit={event => handleSubmit(event)}
			>
				<label>Text</label>
				<br />
				<input
					type='text'
					placeholder='Enter Text...'
					value={message}
					onChange={event => setMessage(event.target.value)}
				/>
				<br />
				<label>
					Amount
					<br />( negative~expense, positive~income )
				</label>
				<br />
				<input
					type='number'
					placeholder='Enter Amount...'
					value={expense}
					onChange={event => setExpense(Number(event.target.value))}
				/>
				<br />
				<button>Add Transaction</button>
			</form>
		</>
	)
}
