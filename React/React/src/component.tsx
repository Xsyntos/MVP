/** @format */

import { randomBytes } from "crypto";
import * as React from "react";
import internal from "stream";
import "./comp.css";
import logo from "./logo.svg";

export interface Name {
	title: string;
	first: string;
	last: string;
}

export interface Street {
	number: number;
	name: string;
}

export interface Coordinates {
	latitude: string;
	longitude: string;
}

export interface Timezone {
	offset: string;
	description: string;
}

export interface Location {
	street: Street;
	city: string;
	state: string;
	country: string;
	postcode: number;
	coordinates: Coordinates;
	timezone: Timezone;
}

export interface Login {
	uuid: string;
	username: string;
	password: string;
	salt: string;
	md5: string;
	sha1: string;
	sha256: string;
}

export interface Dob {
	date: Date;
	age: number;
}

export interface Registered {
	date: Date;
	age: number;
}

export interface Id {
	name: string;
	value: string;
}

export interface Picture {
	large: string;
	medium: string;
	thumbnail: string;
}

export interface RootObject {
	gender: string;
	name: Name;
	location: Location;
	email: string;
	login: Login;
	dob: Dob;
	registered: Registered;
	phone: string;
	cell: string;
	id: Id;
	picture: Picture;
	nat: string;
}

export interface user {
	gender: string;
	name: string;
	surname: string;
	email: string;
	profilepicture: string;
}

export interface todo {
	userId: number;
	id: number;
	title: string;
	completed: boolean;
}

interface IProps {
	test: number;
}

interface IState {
	Users: user[];
	todos: todo[];
}

export let userFC: React.FunctionComponent<user> = (user: user, todos: todo[]) => {
	let classes = `person ${user.gender}`;
	let x: number = Math.floor(Math.random() * todos.length);
	return (
		<div className={classes}>
			<img src={user.profilepicture} />
			<h1>{user.name + " " + user.surname}</h1>
			<p>{user.email}</p>
			{todoFC(todos[x])}
		</div>
	);
};

export let todoFC: React.FunctionComponent<todo> = (todo: todo) => {
	return (
		<div>
			<p>{todo.title}</p>
			<p>{todo.completed}</p>
		</div>
	);
};

export default class Comp extends React.Component<IProps, IState> {
	constructor(props: IProps) {
		super(props);

		this.state = {
			Users: [],
			todos: [],
		};
	}

	componentWillMount(): void {
		this.getData();
	}

	getData(): void {
		fetch(`https://randomuser.me/api/?results=` + this.props.test)
			.then((response) => response.json())
			.then((data) => {
				let temp: user[] = [];

				data.results.map((e: RootObject) =>
					temp.push({
						gender: e.gender,
						name: e.name.first,
						surname: e.name.last,
						email: e.email,
						profilepicture: e.picture.medium,
					})
				);
				console.log(JSON.stringify(temp));
				this.setState({ Users: temp });
			})
			.catch((error) => console.log(error + "🚫"));
		fetch("https://jsonplaceholder.typicode.com/todos/")
			.then((response) => response.json())
			.then((data: todo[]) => {
				console.log(JSON.stringify(data));
				this.setState({ ...this.state, todos: data });
			})
			.catch((error) => console.log(error + "🚫"));
	}

	render(): React.ReactNode {
		console.log(this.state);

		return (
			<div className="container">
				<img src={logo} className="App-logo" alt="logo" width={"250px"} height={"250px"} />
				<br></br>

				{this.state.Users.map((e) => {
					return userFC(e, this.state.todos);
				})}
			</div>
		);
	}
}
