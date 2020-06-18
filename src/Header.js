import React from "react";
import { Link } from "react-router-dom";

class Header extends React.Component {
	state = { inputField: "" };

	search = event =>
		this.setState({ [event.target.name]: event.target.value }, () =>
			this.props.search(this.state.inputField, this.props.movies)
		);

	clear = () =>
		this.setState({ inputField: "" }, () =>
			this.props.search(this.state.inputField, this.props.movies)
		);

	render = () => (
		<header className="header">
			<Link to="/" onClick={this.clear}>
				<img
					src="https://fontmeme.com/permalink/190707/fd4735271a0d997cbe19a04408c896fc.png"
					alt="netflix-font"
					border="0"
				/>
			</Link>
			<div id="navigation" className="navigation">
				<nav>
					<ul>
						<li>
							<Link to="/myList" onClick={this.clear}>
								My List
							</Link>
						</li>
					</ul>
				</nav>
			</div>
			<form id="search" className="search">
				<input
					name="inputField"
					type="search"
					placeholder="Search for a title..."
					value={this.state.inputField}
					onChange={this.search}
				/>
				<div className="searchResults">
					{this.state.inputField.trim() === ""
						? ""
						: `
					Found ${this.props.results} movies with the query "${this.state.inputField}"`}
				</div>
			</form>
		</header>
	);
}

export default Header;
