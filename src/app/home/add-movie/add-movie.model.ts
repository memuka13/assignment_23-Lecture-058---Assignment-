import { FormControl, FormGroup } from '@angular/forms';

export interface AddMovie {
  name: FormControl<string | null | undefined>;
  country: FormControl<string | null | undefined>;
  premierEventPlace?: FormControl<string | null | undefined>;
  releaseDate: FormControl<string | Date | null | undefined>;
  genre: FormGroup<Genre>;
  movieOrTvShow: FormControl<MovieOrTvShow | null | undefined>;
  minutes?: FormControl<string | number | null | undefined>;
  series?: FormControl<string | number | null | undefined>;
  rating: FormControl<number | null | undefined>;
}

export interface Genre {
  action: FormControl<boolean | null>;
  comedy: FormControl<boolean | null>;
  drama: FormControl<boolean | null>;
  fantasy: FormControl<boolean | null>;
  horror: FormControl<boolean | null>;
  mystery: FormControl<boolean | null>;
  romance: FormControl<boolean | null>;
  thriller: FormControl<boolean | null>;
}

export enum MovieOrTvShow {
  Movie = 'Movie',
  TvShow = 'Tv-Show',
}

export interface AllCountries {
  name: {
    official: string;
  };
  population: string;
}
