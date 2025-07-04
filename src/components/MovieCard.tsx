import type React from "react";
import type { Movie } from "../types/movie";

export interface MovieCardProps {
  movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({
  movie: { poster_path, vote_average, release_date, genres, title },
}) => {
  const imgSrc = `${
    import.meta.env.VITE_TMDB_IMAGE_BASE_URL
  }/w200/${poster_path}`;

  return (
    <div className="movie-card">
      <img src={imgSrc} alt="" width={200} />
      <div className="title">{title}</div>
      <ul>
        <li>
          <span className="prop-label">Star: </span>
          <span className="prop-value">{vote_average}</span>
        </li>
        <li>
          <span className="prop-value">{release_date}</span>
        </li>
      </ul>
      {genres && (
        <div className="genres-container">
          {genres.map((g) => (
            <span className="genre" key={g.id}>{g.name}</span>
          ))}
        </div>
      )}
    </div>
  );
};

export default MovieCard;
