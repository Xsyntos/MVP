/** @format */

import React from "react";

interface IProp {
	saveFile: string;
}

interface IState {
	loadedData: string;
}

export default class saveData extends React.Component<IProp, IState> {
	constructor(props: IProp) {
		super(props);

		this.state = {
			loadedData: "",
		};
	}

	LoadData(): void {}
}
