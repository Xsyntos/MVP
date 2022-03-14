/** @format */

import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import Comp from "./component";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import SaveData from "./saveData";

ReactDOM.render(
	<BrowserRouter>
		<Routes>
			<Route path={"/"} element={<Comp test={10} />} />
			<Route path={"/savedata"} element={<SaveData saveFile={"./test.json"} />} />
		</Routes>
	</BrowserRouter>,
	document.getElementById("root")
);
