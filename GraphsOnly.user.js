// ==UserScript==
// @name         AT-Zek-GraphsOnly
// @namespace    https://github.com/Quiaaaa/AutoTrimps
// @version      2.6.1-Zek
// @updateURL    https://github.com/Quiaaaa/AutoTrimps/GraphsOnly.user.js
// @description  Graphs Module (only) from AutoTrimps
// @author       zininzinin, spindrjr, belaith, ishakaru, genBTC, Zek
// @include      *trimps.github.io*
// @include      *kongregate.com/games/GreenSatellite/trimps
// @grant        none
// ==/UserScript==
var script = document.createElement('script');
script.id = 'AutoTrimps-Graphs';
script.src = 'https://Quiaaaa.github.io/AutoTrimps/GraphsOnly.js';
script.setAttribute('crossorigin', "anonymous");
document.head.appendChild(script);
