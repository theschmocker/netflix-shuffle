import { of } from 'rxjs';
import { map, reduce, switchMap } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';
import { writeFileSync } from "fs";

import { Episode } from '../shared/episode';

import { config } from 'dotenv';
config();

const { XMLHttpRequest }: any = require('xmlhttprequest2');

const parksEpisodes = ajax({
	url: "https://unogs-unogs-v1.p.rapidapi.com/aaapi.cgi?t=episodes&q=70143842",
	createXHR: () => new XMLHttpRequest(),
	crossDomain: true,
	method: 'GET',
	headers: {
		"x-rapidapi-host": "unogs-unogs-v1.p.rapidapi.com",
		"x-rapidapi-key": process.env.RAPIDAPI_KEY,
	}
}).pipe(
	map((request: any) => request.response.RESULTS),
	switchMap(seasons => of(...seasons.map(season => season.episodes))),
	map(season => season.map(ep => ep.episode)),
	reduce((acc, season) => [...acc, ...season], []),
	map((episodes): Episode[] =>
		episodes.map(episode => ({
			...episode,
			seasnum: +episode.seasnum,
			epnum: +episode.epnum,
			available: JSON.parse(episode.available),
		}))
	),
)

parksEpisodes.subscribe(
	episodes => {
		writeFileSync('./episodes.json', JSON.stringify(episodes, null, 2));
	},
	(err: any) => console.log('err: ', err)
)