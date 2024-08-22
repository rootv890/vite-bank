import { useReducer } from 'react';
import Input from './Components/Input';

const DEFAULT_LOAN = 5000;
const initialState = {
	balance: 0,
	loan: 0,
	depositAmount: 0,
	withdrawAmount: 0,
	loanAmount: DEFAULT_LOAN,
	isActive: false,
	payLoanAmount: DEFAULT_LOAN,
};

const reducerFn = (state, action) => {
	switch (action.type) {
		// Open and Close
		case 'openAccount':
			return { ...state, isActive: true, balance: 500 };

		// Deposit

		case 'setDepositAmount':
			return { ...state, depositAmount: action.payload };

		case 'deposit':
			if (!state.isActive) {
				alert('No Account to Deposit');
				return state;
			} else {
				return {
					...state,
					balance: state.balance + state.depositAmount,
				};
			}

		// Withdraw
		case 'setWithdrawAmount':
			return {
				...state,
				withdrawAmount: action.payload,
			};

		case 'withdraw':
			if (state.balance - state.withdrawAmount >= 0) {
				return {
					...state,
					balance: state.balance - state.withdrawAmount,
				};
			} else {
				alert('You dont have enough money');
				return {
					...state,
					balance: state.balance,
					withdrawAmount: 0,
				};
			}

		// Get Loan
		case 'setLoanAmount':
			return {
				...state,
				loanAmount: action.payload,
			};

		case 'getLoan':
			if (state.loan === 0) {
				return {
					...state,
					loan: state.loanAmount,
					balance: state.balance + state.loanAmount,
				};
			} else {
				alert('You have taken loan Already!');
				return state;
			}

		// Pay Loan
		case 'setPayLoanAmount':
			return {
				...state,
				payLoanAmount: action.payload,
			};

		case 'payLoan':
			if (state.loan === 0) {
				alert('No Loan to Pay!');
				return state;
			}

			if (state.balance - state.payLoanAmount >= 0) {
				return {
					...state,
					balance: state.balance - state.payLoanAmount,
					loan: state.loan - state.payLoanAmount,
				};
			} else {
				alert('You dont have enough money');
				return {
					...state,
					balance: state.balance,
					loan: state.loan,
				};
			}

		case 'closeAccount':
			if (state.loan === 0 && state.balance === 0) {
				return {
					...state,
					isActive: false,
				};
			} else {
				alert('Your Loan and Balance need to be NIL to clear!');
				return state;
			}

		default:
			throw new Error('No matching action type');
	}
};

export default function App() {
	const [state, dispatch] = useReducer(reducerFn, initialState);

	const {
		balance,
		loan,
		isActive,
		depositAmount,
		withdrawAmount,
		loanAmount,
		payLoanAmount,
	} = state;

	return (
		<div className=" flex items-center justify-center flex-col gap-8 w-screen  h-screen ">
			<div className="flex flex-col items-center justify-center bg-white rounded-xl text-black px-4 py-2 ">
				<h1>useReducer Bank Account </h1>
				<h3 className="text-2xl">useReducer Bank ® 2024</h3>
			</div>

			<div className="flex text-xl gap-6 ">
				<p className="bg-gray-50 text-black p-2 px-4 rounded-xl">
					Balance: <strong>{balance}</strong>
				</p>
				<p className="bg-gray-50 text-black p-2 px-4 rounded-xl">
					Loan: <strong>{loan}</strong>
				</p>
			</div>

			<div className="flex mx-auto gap-6 w-full justify-center items-center">
				<p>
					<button
						disabled={isActive}
						onClick={() =>
							dispatch({
								type: 'openAccount',
							})
						}
					>
						Open account
					</button>
				</p>
				<Input
					value={depositAmount}
					inputDispatch={(value) =>
						dispatch({
							type: 'setDepositAmount',
							payload: value,
						})
					}
					SubmitDispatch={() =>
						dispatch({
							type: 'deposit',
						})
					}
					buttonName={'Deposit'}
					isActive={isActive}
				/>

				<Input
					buttonName={'Withdraw'}
					value={withdrawAmount}
					inputDispatch={(value) => {
						dispatch({
							type: 'setWithdrawAmount',
							payload: value,
						});
					}}
					SubmitDispatch={() => {
						dispatch({
							type: 'withdraw',
						});
					}}
					isActive={isActive}
				/>

				<Input
					value={loanAmount}
					buttonName={'Request Loan'}
					SubmitDispatch={() => {
						dispatch({
							type: 'getLoan',
						});
					}}
					isActive={isActive}
					inputDispatch={(value) => {
						dispatch({
							type: 'setLoanAmount',
							payload: value,
						});
					}}
				/>

				<Input
					value={payLoanAmount}
					buttonName={'Pay Loan'}
					SubmitDispatch={() => {
						dispatch({
							type: 'payLoan',
						});
					}}
					isActive={isActive}
					inputDispatch={(value) => {
						dispatch({
							type: 'setPayLoanAmount',
							payload: value,
						});
					}}
				/>
				<p>
					<button
						onClick={() => {
							dispatch({
								type: 'closeAccount',
							});
						}}
						disabled={!isActive}
					>
						Close account
					</button>
				</p>
			</div>
		</div>
	);
}
