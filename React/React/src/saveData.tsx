/** @format */

import * as React from "react";
import { userFC, user } from "./component";
import logo from "./logo.svg";
import "./comp.css";
import fs from "fs";

interface IProp {
	saveFile: string;
}

interface IState {
	loadedData: user[];
	currentUser: user;
}

export default class SaveData extends React.Component<IProp, IState> {
	constructor(props: IProp) {
		super(props);

		this.state = {
			loadedData: [],
			currentUser: {
				gender: "gender",
				name: "name",
				surname: "surname",
				email: "email",
				profilepicture: "",
			},
		};
	}

	LoadData(): void {
		let data = fs.readFileSync(this.props.saveFile, "utf8");
		try {
			const tempList: user[] = JSON.parse(data);
			console.log(tempList);
			this.setState({ loadedData: tempList });
		} catch {}
	}

	AppendData(user: user): void {
		let tempList: user[] = this.state.loadedData;
		tempList.push(user);
		this.setState({ loadedData: tempList });
		const jsonString: string = JSON.stringify(tempList);

		fs.writeFile(this.props.saveFile, jsonString, "utf8", (err: NodeJS.ErrnoException | null) => {
			if (err) {
				console.log("Error writing file", err);
			} else {
				console.log("Successfully wrote file");
			}
		});
	}

	componentWillMount(): void {
		this.LoadData();
	}

	handleSubmit(event: React.FormEvent): void {
		this.AppendData(this.state.currentUser);
	}

	handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
		const target = e.target;
		const value = target.value;
		const name = target.name;

		this.setState({ currentUser: { ...this.state.currentUser, [name]: value } });
	};

	render(): React.ReactNode {
		return (
			<div className="container">
				<img src={logo} className="App-logo" alt="logo" width={"250px"} height={"250px"} />
				<form onSubmit={this.handleSubmit}>
					<label>
						Name:
						<input
							name="name"
							type="text"
							value={this.state.currentUser.name}
							onChange={this.handleChange}
						/>
						Surname:
						<input
							name="surname"
							type="text"
							value={this.state.currentUser.surname}
							onChange={this.handleChange}
						/>
						Email:
						<input
							name="email"
							type="text"
							value={this.state.currentUser.email}
							onChange={this.handleChange}
						/>
						Gender:
						<input
							name="gender"
							type="text"
							value={this.state.currentUser.gender}
							onChange={this.handleChange}
						/>
						ProfilePicture:
						<input
							name="profilepicture"
							type="text"
							value={this.state.currentUser.profilepicture}
							onChange={this.handleChange}
						/>
					</label>
					<input type="submit" value="Submit" />
				</form>

				{this.state.loadedData.map((e) => {
					return userFC(e);
				})}
			</div>
		);
	}
}
