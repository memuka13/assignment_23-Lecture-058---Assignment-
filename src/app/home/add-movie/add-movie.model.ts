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

export interface GetMovie {
  name: string | null | undefined;
  country: string | null | undefined;
  premierEventPlace?: string | null | undefined;
  releaseDate: string | Date | null | undefined;
  genre: Partial<GetGenre> | undefined;
  movieOrTvShow: MovieOrTvShow | null | undefined;
  minutes?: string | number | null | undefined;
  series?: string | number | null | undefined;
  rating: number | null | undefined;
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

export interface GetGenre {
  action: boolean | null;
  comedy: boolean | null;
  drama: boolean | null;
  fantasy: boolean | null;
  horror: boolean | null;
  mystery: boolean | null;
  romance: boolean | null;
  thriller: boolean | null;
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
  [key: string]: any; // ამა ვერ ვასწორებდი. სორტ ფაიფში მინთებდა ერორს ამის გარეშე და ჩათ ჯიპიტიმ დამაჰენდლინა ასე. რამე სხვაც ხომ უნდა არსებობდეს აქ any რომ არ მქონდეს მითითებული?
}
