import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
const Cell = function (props) {
	return (
		// eslint-disable-next-line react/prop-types
		<div className="Cell" onClick={props.onClickCell}>
			{props.text}
		</div>
	);
};
const Chessboard = function () {
	const [n, setN] = useState(0);
	const [Cells, setCell] = useState([
		[null, null, null],
		[null, null, null],
		[null, null, null],
	]);
	const [f, setF] = useState(false);
	const onClickReset = function () {
		setCell([
			[null, null, null],
			[null, null, null],
			[null, null, null],
		]);
		setF(false);
		setN(0);
	};
	const onClickCell = (row, cel) => {
		console.log("行" + row);
		console.log("列" + cel);
		const copy = JSON.parse(JSON.stringify(Cells));
		if (copy[row][cel] == null && f == false) {
			copy[row][cel] = n % 2 == 0 ? "X" : "O";
			setCell(copy);
			setN(n + 1);
			for (let i = 0; i < 3; i++) {
				if (
					copy[i][0] == copy[i][1] &&
					copy[i][1] == copy[i][2] &&
					copy[i][0] !== null
				) {
					setF(true);
					console.log("win:" + copy[i][0]);
				}
				break;
			}
			for (let i = 0; i < 3; i++) {
				if (
					copy[0][i] == copy[1][i] &&
					copy[0][i] == copy[2][i] &&
					copy[0][i] !== null
				) {
					setF(true);
					console.log("win:" + copy[0][i]);
				}
				break;
			}
			if (
				copy[0][0] == copy[1][1] &&
				copy[1][1] == copy[2][2] &&
				copy[0][0] !== null
			) {
				setF(true);
				console.log("win" + copy[0][0]);
			}
			if (
				copy[0][2] == copy[1][1] &&
				copy[1][1] == copy[2][0] &&
				copy[0][2] !== null
			) {
				setF(true);
				console.log("win" + copy[0][2]);
			}
		}
	};

	return (
		<div>
			{Cells.map((items, row) => {
				return (
					// eslint-disable-next-line react/jsx-key
					<div className="row">
						{items.map((item, cel) => {
							return (
								// eslint-disable-next-line react/jsx-key
								<Cell
									text={item}
									onClickCell={() => onClickCell(row, cel)}
								/>
							);
						})}
					</div>
				);
			})}
			{f && (
				<div className="Bu">
					<div className="GO">GameOver</div>
					<div className="CZ" onClick={onClickReset}>
						重置
					</div>
				</div>
			)}
		</div>
	);
};

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<Chessboard />
	</React.StrictMode>
);
