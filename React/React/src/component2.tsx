/** @format */

import * as React from "react";
import "./comp.css";

export interface post {
	id: Number;
	userid: Number;
	title: string;
	body: string;
}

interface IProps {}

interface IState {
	posts: post[];
}

export let blogsFC: React.FunctionComponent<post> = (post: post) => {
	return (
		<div>
			<h1>{post.title}</h1>
			<p>{post.body}</p>
		</div>
	);
};

export default class Comp2 extends React.Component<IProps, IState> {
	constructor(props: IProps) {
		super(props);

		this.state = {
			posts: [],
		};
	}
	componentWillMount(): void {
		this.getData();
	}

	getData(): void {
		fetch("https://jsonplaceholder.typicode.com/posts")
			.then((response) => response.json())
			.then((data) => {
				let temp: post[] = [];

				data.map((e: post) =>
					temp.push({
						id: e.id,
						userid: e.userid,
						title: e.title,
						body: e.body,
					})
				);

				this.setState({ posts: temp });
			})
			.catch((error) => console.log(error + "🚫"));
	}
	render(): React.ReactNode {
		console.log(this.state);

		return (
			<div className="container">
				<br></br>

				{this.state.posts.map((e) => {
					return blogsFC(e);
				})}
			</div>
		);
	}
}
