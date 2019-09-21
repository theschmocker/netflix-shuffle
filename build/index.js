"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const fs_1 = require("fs");
const { XMLHttpRequest } = require('xmlhttprequest2');
// import { writeFile } from 'fs';
/*
fetch("https://unogs-unogs-v1.p.rapidapi.com/aaapi.cgi?t=episodes&q=70143842", {
    "method": "GET",
    "headers": {
        "x-rapidapi-host": "unogs-unogs-v1.p.rapidapi.com",
        "x-rapidapi-key": "bbbuMXkb6omsh0v6EPswmb3B41gyp1bxz37jsnHOncEYiRbvlS"
    }
})
*/
// const api = ajax({
//     url: "https://unogs-unogs-v1.p.rapidapi.com/aaapi.cgi?t=episodes&q=70143842",
//     createXHR: () => new XMLHttpRequest(),
//     crossDomain: true,
//     method: 'GET',
//     headers: {
// 		"x-rapidapi-host": "unogs-unogs-v1.p.rapidapi.com",
// 		"x-rapidapi-key": "bbbuMXkb6omsh0v6EPswmb3B41gyp1bxz37jsnHOncEYiRbvlS"
//     }
// }).pipe(
//     tap(data => console.log(data.response)),
//     map((request: any) => JSON.stringify(request.response.RESULTS, null, 2))
// ).subscribe(
//     (episodes: string) => {
//         writeFileSync('./episodes.json', episodes);
//     },
//     (err: any) => console.log('err: ', err)
// )
const episodes = JSON.parse(fs_1.readFileSync('./episodes.json').toString());
rxjs_1.of(...episodes).pipe(operators_1.switchMap(season => rxjs_1.of(...season.episodes)), operators_1.map(episode => episode.episode), operators_1.reduce((acc, eps) => [...acc, eps], [])).subscribe(console.log);
