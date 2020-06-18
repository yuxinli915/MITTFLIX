import React from "react";
import { Switch, Route } from "react-router-dom";
import * as MovieAPI from "./MovieAPI";
import Header from "./Header";
import Genre from "./Genre";

class App extends React.Component {
	state = { movies: [], genres: [] };

	search = (keyword, list) =>
		keyword.trim() !== ""
			? this.setState({
					movies: list.filter(
						movie =>
							movie.overview.toLowerCase().includes(keyword.toLowerCase()) ||
							movie.title.toLowerCase().includes(keyword.toLowerCase())
					),
			  })
			: MovieAPI.getAll().then(movies => this.setState({ movies }));

	mark = movie =>
		(movie.my_list
			? MovieAPI.removeFromList(movie)
			: MovieAPI.addToList(movie)
		).then(() => MovieAPI.getAll().then(movies => this.setState({ movies })));

	componentDidMount = () => {
		MovieAPI.genres().then(genres =>
			this.setState({
				genres: genres.sort((a, b) => (a.name < b.name ? -1 : 1)),
			})
		);
		MovieAPI.getAll().then(movies => this.setState({ movies }));
	};

	render = () => (
		<Switch>
			<Route exact path="/">
				<Header
					search={this.search}
					results={this.state.movies.length}
					movies={this.state.movies}
				/>
				{this.state.genres.map(genre => (
					<Genre
						key={genre.id}
						genre={genre}
						movies={this.state.movies.filter(movie =>
							movie.genre_ids.includes(genre.id)
						)}
						mark={this.mark}
					/>
				))}
			</Route>
			<Route exact path="/myList">
				<Header
					search={this.search}
					results={this.state.movies.length}
					movies={this.state.movies.filter(movie => movie.my_list === true)}
				/>
				<Genre
					movies={this.state.movies.filter(movie => movie.my_list === true)}
					genre={{ name: "My List" }}
					mark={this.mark}
				/>
			</Route>
		</Switch>
	);
}

export default App;
