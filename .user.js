// ==UserScript==
// @name         AutoTrimps-Zek
// @version      1.0-Zek
// @namespace    https://synackse.github.io/auto-trimps
// @updateURL    https://synackse.github.io/auto-trimps/.user.js
// @description  Automate all the trimps!
// @author       zininzinin, spindrjr, Ishkaru, genBTC, Zeker0
// @include      *trimps.github.io*
// @include      *kongregate.com/games/GreenSatellite/trimps
// @connect      *synackse.github.io/auto-trimps*
// @connect      *trimps.github.io*
// @connect      self
// @grant        GM_xmlhttpRequest 
// ==/UserScript==

var script = document.createElement('script');
script.id = 'AutoTrimps-Zek';
//This can be edited to point to your own Github Repository URL.
script.src = 'https://synackse.github.io/auto-trimps/AutoTrimps2.js';
//script.setAttribute('crossorigin',"use-credentials");
script.setAttribute('crossorigin',"anonymous");
document.head.appendChild(script);
