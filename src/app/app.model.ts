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
}
