import React from "react";
import Movie from "./Movie";

export default function genre(props) {
	return props.movies.length > 0 ? (
		<div className="titleList">
			<div className="title">
				<h1>{props.genre.name}</h1>
				<div className="titles-wrapper">
					{props.movies.map(movie => (
						<Movie key={movie.id} movie={movie} mark={props.mark} />
					))}
				</div>
			</div>
		</div>
	) : (
		<></>
	);
}
