import React from 'react';

const Input = ({
	isActive,
	inputDispatch,
	SubmitDispatch,
	value,
	buttonName,
}) => {
	return (
		<form
			className="bg-gray-400 p-2 flex flex-col gap-2 rounded-md"
			action=""
			onSubmit={(e) => {
				e.preventDefault();
				SubmitDispatch();
			}}
		>
			{isActive && (
				<input
					value={value}
					onChange={(e) => {
						// error validation
						if (Number(e.target.value) < 0 || isNaN(Number(e.target.value))) {
							alert('Please enter a valid number');
						} else {
							inputDispatch(Number(e.target.value));
						}
					}}
					type="text"
					placeholder="Amount"
					className="w-24 rounded-md text-zinc-900 bg-gray-100 p-2 "
				/>
			)}
			<button
				type="submit"
				disabled={!isActive}
				className="flex flex-col justify-center items-center"
			>
				{buttonName}
			</button>
		</form>
	);
};

export default Input;
