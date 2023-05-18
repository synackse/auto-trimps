// ==UserScript==
// @name         AT-Quia-GraphsOnly
// @namespace    https://github.com/synackse/AutoTrimps
// @version      3.0-Quia
// @updateURL    https://github.com/synackse/AutoTrimps/GraphsOnly.user.js
// @description  Graphs Module (only) from AutoTrimps
// @author       zininzinin, spindrjr, belaith, ishakaru, genBTC, Zek, Quia
// @include      *trimps.github.io*
// @include      *kongregate.com/games/GreenSatellite/trimps
// @grant        none
// ==/UserScript==
var script = document.createElement('script');
script.id = 'AutoTrimps-Graphs';
script.src = 'https://synackse.github.io/auto-trimps/GraphsOnly.js';
script.setAttribute('crossorigin', "anonymous");
document.head.appendChild(script);
