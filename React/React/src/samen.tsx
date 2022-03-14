/** @format */

import * as React from "react";
import Comp from "./component";
import Comp2 from "./component2";

interface IState {}

interface IProps {}

export default class Samen extends React.Component<IProps, IState> {
	constructor(props: IProps) {
		super(props);
		this.state = {};
	}

	render(): React.ReactNode {
		return (
			<div>
				<Comp test={10} />
				<Comp2 />
			</div>
		);
	}
}
