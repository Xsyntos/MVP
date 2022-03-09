/** @format */

import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import Comp from "./component";
import Comp2 from "./component2";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";

ReactDOM.render(
	<BrowserRouter>
		<Routes>
			<Route path={"/"} element={<Comp test={10} />} />
			<Route path= {"/posts"} element = {<Comp2 />} />
		</Routes>
	</BrowserRouter>,
	document.getElementById("root")
);
