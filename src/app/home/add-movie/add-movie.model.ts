import { FormControl, FormGroup } from '@angular/forms';

export interface AddMovie {
  name: FormControl<string | null>;
  country: FormControl<string | null>;
  premierEventPlace?: FormControl<string | null>;
  releseDate: FormControl<Date | null>;
  genre: FormGroup<Genre>;
  movieOrTvShow: FormControl<MovieOrTvShow | null>;
  minutes?: FormControl<string | null>;
  series?: FormControl<string | null>;
  raiting: FormControl<number | null>;
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
