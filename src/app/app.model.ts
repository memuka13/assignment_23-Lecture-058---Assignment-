import { Genre, MovieOrTvShow } from './home/add-movie/add-movie.model';

export interface MovieInfo {
  Title: string;
  Year: string;
  Actors: string;
  Country: string;
}

export interface CountryInfo {
  currencies: string;
  flags: {
    png: string;
  };
  population?: number;
}

// export interface CountryResult {
//   currencies: string[];
//   flags: {
//     png: string;
//   };
// }

export interface FavouriteMoviesList {
  id: string;
  Title: string;
  Year: string;
  Actors: string;
  currencies: string;
  flags: {
    png: string;
  };
  comment: string;
  raiting: number;
}

export interface AllCountries {
  name: {
    official: string;
  };
  population: string;
}

// export interface addedMoviesList {
//   name: string | null;
//   country: string | null;
//   premierEventPlace?: string | undefined | null;
//   releseDate: string | Date | null;
//   genre: string | Genre | null;
//   movieOrTvShow: MovieOrTvShow | string | undefined | null;
//   minutes?: string | number | undefined | null;
//   series?: string | number | undefined | null;
//   rating: number | null;
// }

export interface addedMoviesList {
  id: string;
  name: string | null;
  country: string | null;
  premierEventPlace?: string | null;
  releaseDate: string | Date | null;
  genre: Genre | null;
  movieOrTvShow: MovieOrTvShow | null;
  minutes?: number | null;
  series?: number | null;
  rating: number | null;
}
