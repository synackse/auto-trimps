if (!String.prototype.includes) {
    String.prototype.includes = function(search, start) {
        'use strict';
        if (typeof start !== 'number') {
            start = 0;
        }
        if (start + search.length > this.length) {
            return false;
        } else {
            return this.indexOf(search, start) !== -1;
        }
    };
}

function loadPageVariables() {
    var tmp = JSON.parse(localStorage.getItem('autoTrimpSettings'));
    if (tmp !== null && tmp['ATversion'] != undefined) {
        autoTrimpSettings = tmp;
    }
}

function safeSetItems(a,b){try{localStorage.setItem(a,b)}catch(c){22==c.code&&debug("Error: LocalStorage is full, or error. Attempt to delete some portals from your graph or restart browser.")}}

function serializeSettings() {
    return JSON.stringify(Object.keys(autoTrimpSettings).reduce((v, k) => {
        const el = autoTrimpSettings[k];
        switch (el.type) {
        case 'boolean':
            return v[k] = el.enabled, v;
        case 'value':
        case 'multiValue':
        case 'textValue':
        case 'valueNegative':
        case 'multitoggle':
            return v[k] = el.value, v;
        case 'dropdown':
            return v[k] = el.selected, v;
        }
        return v[k] = el, v;
    }, {}));
}

function serializeSettings60() {
    return '{"ManualGather2":1,"ATversion":"2.1.6.9b-genbtc-4-2-2018 + KFrowde + Zeker0","BuyUpgrades":true,"TrapTrimps":true,"ManageBreedtimer":false,"UsePatience":true,"GeneticistTimer":-1,"SpireBreedTimer":60,"AutoAllocatePerks":0,"AutoStartDaily":false,"AutoFinishDaily":false,"AutoFinishDailyZone":-30,"FinishC2":-1,"AutoEggs":true,"ManualCoords":2,"AutoPortal":"Off","HeliumHourChallenge":"None","CustomAutoPortal":999,"HeHrDontPortalBefore":496,"HeliumHrBuffer":1,"PauseScript":false,"BuyStorage":true,"BuyBuildings":true,"WarpstationCap":true,"WarpstationCoordBuy":true,"MaxHut":100,"MaxHouse":100,"MaxMansion":100,"MaxHotel":100,"MaxResort":100,"MaxGateway":50,"MaxWormhole":"0","MaxCollector":-1,"MaxGym":"-1","MaxTribute":"-1","GymWall":-1,"FirstGigastation":10,"DeltaGigastation":2,"WarpstationWall3":1,"MaxNursery":-1,"NoNurseriesUntil":-1,"PreSpireNurseries":-1,"BuyJobs":true,"WorkerRatios":true,"AutoMagmamancers":true,"FarmerRatio":1,"LumberjackRatio":11,"MinerRatio":12,"MaxScientists":-1,"MaxExplorers":"-1","MaxTrainers":"-1","TrainerCaptoTributes":10,"BreedFire":false,"BuyArmor":true,"BuyArmorUpgrades":true,"BuyWeapons":true,"BuyWeaponUpgrades":true,"CapEquip2":15,"DynamicPrestige2":-1,"Prestige":"Dagadder","PrestigeBackup":{"selected":"Dagadder","id":"PrestigeBackup","name":"PrestigeBackup"},"ForcePresZ":-1,"PrestigeSkipMode":false,"PrestigeSkip2":false,"DelayArmorWhenNeeded":false,"BuyShieldblock":true,"AutoMaps":1,"DynamicSiphonology":true,"PreferMetal":false,"MaxMapBonusAfterZone":-1,"DisableFarm":16,"LowerFarmingZone":true,"MaxStacksForSpire":true,"MinutestoFarmBeforeSpire":0,"IgnoreSpiresUntil":0,"RunBionicBeforeSpire":false,"ExitSpireCell":-1,"CorruptionCalc":true,"FarmWhenNomStacks7":true,"VoidMaps":-1,"RunNewVoids":true,"RunNewVoidsUntil":-1,"VoidCheck":6,"MaxTox":false,"TrimpleZ":0,"AdvMapSpecialModifier":false,"BetterAutoFight":2,"AutoStance":1,"IgnoreCrits":0,"PowerSaving":0,"ForceAbandon":true,"DynamicGyms":true,"AutoRoboTrimp":60,"UseScryerStance":true,"ScryerUseWhenOverkill":true,"ScryerMinZone":181,"ScryerMaxZone":-1,"ScryerUseinMaps2":0,"ScryerUseinVoidMaps2":0,"ScryerUseinSpire2":0,"ScryerSkipBoss2":0,"ScryerSkipCorrupteds2":2,"ScryerDieToUseS":false,"ScryerDieZ":181,"UseAutoGen":true,"AutoGen2":1,"AutoGen2End":400,"AutoGen2SupplyEnd":true,"AutoGen3":0,"AutoGenDC":1,"AutoGenC2":1,"AutoGen2Override":1,"AutoMagmiteSpender2":1,"SupplyWall":2.4,"OneTimeOnly":false,"BuyOvclock":false,"AutoHeirlooms":true,"AutoHeirlooms2":true,"AutoUpgradeHeirlooms":false,"AutoGoldenUpgrades":"Helium","goldStrat":"Max then Helium","goldAlternating":1.5,"goldZone":401,"goldNoBattle":false,"AutoNatureTokens":true,"AutoPoison":"Empowerment","AutoWind":"Empowerment","AutoIce":"Empowerment","EnhanceGrids":false,"SpamGeneral":true,"SpamUpgrades":false,"SpamEquipment":false,"SpamMaps":true,"SpamOther":true,"SpamBuilding":false,"SpamJobs":false,"SpamGraphs":false,"SpamMagmite":true,"SpamPerks":true,"allowSettingsUpload":true,"analyticsID":"b93c4930-760d-4feb-9330-f72041b1d362","BuyUpgradesNew":1,"fastallocate":false,"lootdumpz":-1,"lootdumpa":-1,"AutoFinishDailyNew":1,"BuyBuildingsNew":1,"BuyJobsNew":1,"BuyArmorNew":1,"BuyWeaponsNew":1,"PrestigeSkip1_2":0,"RunNewVoidsUntilNew":-1,"DailyVoidMod":-1,"VoidPraid":false,"Praidingzone":[-1],"BWraid":false,"BWraidingz":[-1],"BWraidingmax":[-1],"WindStackingMin":100,"ScryUseinPoison":-1,"ScryUseinWind":0,"ScryUseinIce":-1,"BuyOneTimeOC":2,"AutoHeirloomsNew":2,"ShowSettings":true,"Raiding":false,"RaidingStartZone":506,"PrestigeRaiding":0,"AutomateAT":true,"DailyVMZone":525,"FillerVMZone":510,"FillerSpireCell":40,"WindStack":true,"WindStackCutOff":60,"Dailyportal":546,"dVoidPraid":true,"dPraidingzone":[-1],"dExitSpireCell":-1,"Dailybwraid":false,"dBWraidingz":[-1],"dBWraidingmax":[-1],"trimpsnotdie":true,"gearamounttobuy":1,"WindStackingMax":195,"buyheliumy":-1,"use3daily":false,"buynojobsc":true,"fightforever":-1,"windcutoff":-1,"spireshitbuy":true,"hardcorewind":-1,"dPraidHarder":false,"dMaxPraidZone":[-1],"dPraidFarmFragsZ":[-1],"dPraidBeforeFarmZ":[-1],"dWindStackingMin":100,"dWindStackingMax":195,"dwindcutoff":-1,"dhardcorewind":-1,"PraidHarder":false,"MaxPraidZone":[-1],"PraidFarmFragsZ":[-1],"PraidBeforeFarmZ":[-1],"fuellater":300,"ScryerSkipHealthy":2,"addpoison":false,"amalcoord":false,"dhardcorewindmax":-1,"cfightforever":true,"work":"false","in":"false","progress":"false","hardcorewindmax":"-1","dAutoGoldenUpgrades":"Helium","cAutoGoldenUpgrades":"Battle","dfightforever":2,"fuelend":260,"defaultgen":2,"spendmagmite":2,"spendmagmitesetting":0,"amalcoordhd":0.000025,"amalcoordz":-1,"dultwind":-1,"dultwindcut":-1,"dwindhealthy":"false","darmormagic":3,"carmormagic":1,"CapEquiparm":15,"ultwind":-1,"ultwindcut":"0.00025","windhealthy":false,"onlyminmaxworld":true,"fuckanti":-1,"dscryvoidmaps":false,"scryvoidmaps":false,"dusebstance":false,"AutoPortalDaily":0,"dHeliumHourChallenge":"None","dCustomAutoPortal":560,"dHeHrDontPortalBefore":"999","dHeliumHrBuffer":"0","usebstance":"false","hidebuildings":false,"fuckjobs":false,"amalcoordt":-1,"screwessence":true,"beforegen":2,"c2runnerstart":false,"c2runnerportal":"999","mapc2hd":6,"buywepsvoid":true,"ScryerUseinBW":0,"dwindcutoffmap":-1,"windcutoffmap":-1}';
}
function serializeSettings550() {
    return '{"ManualGather2":2,"ATversion":"2.1.6.9b-genbtc-4-2-2018 + KFrowde + Zeker0","BetterAutoFight":3,"AutoStance":2,"BuyStorage":true,"BuyBuildings":true,"BuyUpgrades":true,"BuyJobs":true,"TrapTrimps":false,"AutoHeirlooms":true,"HireScientists":true,"WorkerRatios":false,"ManageBreedtimer":false,"AutoPortal":"Custom","HeliumHourChallenge":"Corrupted","CustomAutoPortal":560,"HeHrDontPortalBefore":496,"HeliumHrBuffer":3,"AutoFinishDaily":true,"AutoFinishDailyZone":0,"AutoStartDaily":true,"PauseScript":false,"BuyArmor":true,"BuyArmorUpgrades":true,"BuyWeapons":true,"BuyWeaponUpgrades":true,"BuyShieldblock":false,"Prestige":"Dagadder","PrestigeBackup":{"selected":"Dagadder","id":"PrestigeBackup","name":"PrestigeBackup"},"DynamicPrestige2":-1,"PrestigeSkipMode":false,"AlwaysArmorLvl2":true,"WaitTill60":true,"DelayArmorWhenNeeded":false,"CapEquip2":200,"AutoMaps":1,"DynamicSiphonology":true,"LowerFarmingZone":true,"MinutestoFarmBeforeSpire":0,"RunBionicBeforeSpire":false,"ExitSpireCell":-1,"CorruptionCalc":true,"FarmWhenNomStacks7":true,"VoidMaps":555,"RunNewVoids":false,"RunNewVoidsUntil":600,"VoidCheck":1,"MaxTox":false,"DisableFarm":-1,"FarmerRatio":20,"LumberjackRatio":10,"MinerRatio":1000,"MaxScientists":"-1","MaxExplorers":3000,"MaxTrainers":-1,"MaxHut":100,"MaxHouse":0,"MaxMansion":0,"MaxHotel":0,"MaxResort":0,"MaxGateway":0,"MaxWormhole":0,"MaxCollector":0,"FirstGigastation":1,"DeltaGigastation":1,"MaxGym":"-1","MaxTribute":"-1","MaxNursery":-1,"BreedFire":false,"AutoMagmamancers":false,"WarpstationCap":false,"WarpstationWall3":-1,"WarpstationCoordBuy":false,"AutoRoboTrimp":270,"AutoGoldenUpgrades":"Void 60","AutoHeirlooms2":false,"AutoUpgradeHeirlooms":false,"TrainerCaptoTributes":"-1","NoNurseriesUntil":498,"AutoMagmiteSpender2":2,"ForceAbandon":true,"GymWall":-1,"DynamicGyms":true,"AutoAllocatePerks":2,"SpireBreedTimer":-1,"UseScryerStance":false,"ScryerUseWhenOverkill":false,"ScryerMinZone":530,"ScryerMaxZone":-1,"ScryerUseinMaps2":0,"ScryerUseinVoidMaps2":0,"ScryerUseinSpire2":0,"ScryerSkipBoss2":0,"ScryerSkipCorrupteds2":2,"ScryerDieToUseS":true,"SpamGeneral":true,"SpamUpgrades":false,"SpamEquipment":false,"SpamMaps":false,"SpamOther":false,"SpamBuilding":false,"SpamJobs":false,"ManualCoords":false,"TrimpleZ":0,"ScryerDieZ":230.6,"IgnoreCrits":2,"ForcePresZ":-1,"PreferMetal":false,"PreSpireNurseries":7000,"FinishC2":-1,"PowerSaving":0,"PrestigeSkip2":false,"AutoEggs":false,"UseAutoGen":1,"AutoGen2":3,"AutoGen2End":320,"AutoGen2SupplyEnd":false,"AutoGen3":0,"AutoGenDC":1,"AutoGenC2":1,"AutoGen2Override":1,"SupplyWall":1,"OneTimeOnly":false,"BuyOvclock":false,"IgnoreSpiresUntil":500,"goldStrat":"Max then Helium","goldAlternating":2,"goldZone":600,"MaxStacksForSpire":true,"UsePatience":false,"AutoNatureTokens":true,"AutoPoison":"Empowerment","AutoWind":"Convert to Poison","AutoIce":"Convert to Poison","MaxMapBonusAfterZone":-1,"SpamGraphs":false,"allowSettingsUpload":false,"EnhanceGrids":false,"EnableAFK":{"id":"EnableAFK","name":"Enable AFK","description":"Enables CPU and RAM saving AFK-mode","type":"action","value":1},"SpamMagmite":false,"SpamPerks":true,"analyticsID":"7f11701e-adc9-477c-a08d-2b66fe3ec2a2","ChangeLog":{"id":"ChangeLog","name":"Show Changelog","description":"Shows the changelog popup message that AT loads on startup in case you missed it.","type":"action","value":1},"AdvMapSpecialModifier":false,"GeneticistTimer":-1,"goldNoBattle":true,"BuyUpgradesNew":1,"AutoFinishDailyNew":0,"BuyBuildingsNew":0,"BuyJobsNew":0,"BuyArmorNew":1,"BuyWeaponsNew":1,"PrestigeSkip1_2":0,"RunNewVoidsUntilNew":0,"DailyVoidMod":570,"PlusMapVoidToggle":0,"Praidingzone":[495,546,555,561,566,570],"BWraid":false,"BWraidingmin":-1,"BWraidingmax":[640],"lootdumpz":265,"lootdumpa":10000,"WindStackingMin":-1,"ScryUseinPoison":-1,"ScryUseinWind":-1,"ScryUseinIce":-1,"BuyOneTimeOC":2,"AutoHeirloomsNew":2,"ShowSettings":true,"BWraidingz":[597],"fastallocate":true,"VoidPraid":true,"trimpsnotdie":true,"gearamounttobuy":5,"Dailyportal":560,"dVoidPraid":true,"dPraidingzone":[495,510,525,540,555,570],"Dailybwraid":false,"dBWraidingz":[495],"dBWraidingmax":[515],"dExitSpireCell":-1,"WindStackingMax":190,"buyheliumy":-1,"buynojobsc":true,"Trimpicide":true,"fightforever":0,"use3daily":true,"windcutoff":-1,"spireshitbuy":true,"hardcorewind":-1,"PraidHarder":false,"PraidFarmFrags":false,"PraidBeforeFarm":false,"dPraidHarder":false,"dMaxPraidZone":[-1],"dPraidFarmFragsZ":[-1],"dPraidBeforeFarmZ":[-1],"MaxPraidZone":[505,535,545,555,561],"PraidFarmFragsZ":[495],"PraidBeforeFarmZ":[-1],"fuellater":260,"dWindStackingMin":450,"dWindStackingMax":190,"dwindcutoff":160,"dhardcorewind":480,"ScryerSkipHealthy":2,"addpoison":true,"amalcoord":true,"dAutoGoldenUpgrades":"Void 60","cAutoGoldenUpgrades":"Battle","dhardcorewindmax":"-1","cfightforever":true,"work":false,"in":false,"progress":false,"hardcorewindmax":"-1","dfightforever":2,"fuelend":320,"defaultgen":0,"spendmagmite":2,"spendmagmitesetting":1,"ultwind":-1,"ultwindcut":0.05,"CapEquiparm":100,"amalcoordhd":0.0000025,"onlyminmaxworld":false,"amalcoordz":398,"dultwind":"-1","dultwindcut":"0.00025","dwindhealthy":"false","windhealthy":false,"mapcutoff":4,"darmormagic":3,"carmormagic":3,"fuckanti":"-1","dscryvoidmaps":true,"scryvoidmaps":true,"dusebstance":true,"usebstance":true,"AutoPortalDaily":2,"dCustomAutoPortal":575,"dHeHrDontPortalBefore":"999","dHeliumHrBuffer":"0","dHeliumHourChallenge":"Corrupted","hidebuildings":true,"fuckjobs":true,"amalcoordt":6,"screwessence":false,"beforegen":0,"c2runnerstart":false,"c2runnerportal":"999","buywepsvoid":true,"mapc2hd":"-1","ScryerUseinBW":0,"dwindcutoffmap":160,"windcutoffmap":"-1"}';
}

function getPageSetting(setting) {
    if (autoTrimpSettings.hasOwnProperty(setting) == false) {
        return false;
    }
    if (autoTrimpSettings[setting].type == 'boolean') {
        return autoTrimpSettings[setting].enabled;
    } else if (autoTrimpSettings[setting].type == 'multiValue') {
        return Array.from(autoTrimpSettings[setting].value)
        .map(x => parseInt(x));
    } else if (autoTrimpSettings[setting].type == 'textValue') {
        return autoTrimpSettings[setting].value;
    } else if (autoTrimpSettings[setting].type == 'value' || autoTrimpSettings[setting].type == 'valueNegative') {
        return parseFloat(autoTrimpSettings[setting].value);
    } else if (autoTrimpSettings[setting].type == 'multitoggle') {
        return parseInt(autoTrimpSettings[setting].value);
    } else if (autoTrimpSettings[setting].type == 'dropdown') {
        return autoTrimpSettings[setting].selected;
    }
}

function setPageSetting(setting, value) {
    if (autoTrimpSettings.hasOwnProperty(setting) == false) {
        return false;
    }
    if (autoTrimpSettings[setting].type == 'boolean') {
        autoTrimpSettings[setting].enabled = value;
        document.getElementById(setting).setAttribute('class', 'noselect settingsBtn settingBtn' + autoTrimpSettings[setting].enabled);
    } else if (autoTrimpSettings[setting].type == 'value' || autoTrimpSettings[setting].type == 'valueNegative') {
        autoTrimpSettings[setting].value = value;
    } else if (autoTrimpSettings[setting].type == 'textValue') {
        autoTrimpSettings[setting].value = value;
    } else if (autoTrimpSettings[setting].type == 'multiValue' || autoTrimpSettings[setting].type == 'valueNegative') {
        autoTrimpSettings[setting].value = value;
    } else if (autoTrimpSettings[setting].type == 'multitoggle') {
        autoTrimpSettings[setting].value = value;
        document.getElementById(setting).setAttribute('class', 'noselect settingsBtn settingBtn' + autoTrimpSettings[setting].value);
    } else if (autoTrimpSettings[setting].type == 'dropdown') {
        autoTrimpSettings[setting].selected = value;
    }
}

function saveSettings(){safeSetItems('autoTrimpSettings',serializeSettings())}

function debug(message, type, lootIcon) {
    var general = getPageSetting('SpamGeneral');
    var upgrades = getPageSetting('SpamUpgrades');
    var equips = getPageSetting('SpamEquipment');
    var maps = getPageSetting('SpamMaps');
    var other = getPageSetting('SpamOther');
    var buildings = getPageSetting('SpamBuilding');
    var jobs = getPageSetting('SpamJobs');
    var graphs = getPageSetting('SpamGraphs');
    var magmite = getPageSetting('SpamMagmite');
    var perks = getPageSetting('SpamPerks');
    var output = true;
    switch (type) {
        case null:
            break;
        case "general":
            output = general;
            break;
        case "upgrades":
            output = upgrades;
            break;
        case "equips":
            output = equips;
            break;
        case "buildings":
            output = buildings;
            break;
        case "jobs":
            output = jobs;
            break;
        case "maps":
            output = maps;
            break;
        case "other":
            output = other;
            break;
        case "graphs":
            output = graphs;
            break;
        case "magmite":
            output = magmite;
            break;
        case "perks":
            output = perks;
            break;
    }
    if (output) {
        if (enableDebug)
            console.log(timeStamp() + ' ' + message);
        message2(message, "AutoTrimps", lootIcon, type);
    }
}

function timeStamp(){for(var a=new Date,b=[a.getHours(),a.getMinutes(),a.getSeconds()],c=1;3>c;c++)10>b[c]&&(b[c]="0"+b[c]);return b.join(":")}
function preBuy(){preBuyAmt=game.global.buyAmt,preBuyFiring=game.global.firing,preBuyTooltip=game.global.lockTooltip,preBuymaxSplit=game.global.maxSplit}
function postBuy(){game.global.buyAmt=preBuyAmt,game.global.firing=preBuyFiring,game.global.lockTooltip=preBuyTooltip,game.global.maxSplit=preBuymaxSplit}
function preBuy2(){return[game.global.buyAmt,game.global.firing,game.global.lockTooltip,game.global.maxSplit]}
function postBuy2(a){game.global.buyAmt=a[0],game.global.firing=a[1],game.global.lockTooltip=a[2],game.global.maxSplit=a[3]}
function setTitle(){aWholeNewWorld&&(document.title='('+game.global.world+') Trimps '+document.getElementById('versionNumber').innerHTML)}
var lastmessagecount = 1;
function message2(a,b,c,d){var e=document.getElementById("log"),f=e.scrollTop+10>e.scrollHeight-e.clientHeight,g=ATmessageLogTabVisible?"block":"none",h="";c&&"*"==c.charAt(0)?(c=c.replace("*",""),h="icomoon icon-"):h="glyphicon glyphicon-",game.options.menu.timestamps.enabled&&(a=(1==game.options.menu.timestamps.enabled?getCurrentTime():updatePortalTimer(!0))+" "+a),c&&(a="<span class=\""+h+c+"\"></span> "+a),a="<span class=\"glyphicon glyphicon-superscript\"></span> "+a,a="<span class=\"icomoon icon-text-color\"></span>"+a;var i="<span class='"+b+"Message message "+d+"' style='display: "+g+"'>"+a+"</span>",j=document.getElementsByClassName(b+"Message");if(1<j.length&&-1<j[j.length-1].innerHTML.indexOf(a)){var k=j[j.length-1].innerHTML;lastmessagecount++;var l=k.lastIndexOf(" x");-1!=l&&(j[j.length-1].innerHTML=k.slice(0,l)),j[j.length-1].innerHTML+=" x"+lastmessagecount}else lastmessagecount=1,e.innerHTML+=i;f&&(e.scrollTop=e.scrollHeight),trimMessages(b)}
var ATbutton=document.createElement('button');ATbutton.innerHTML='AutoTrimps',ATbutton.setAttribute('id','AutoTrimpsFilter'),ATbutton.setAttribute('type','button'),ATbutton.setAttribute('onclick','filterMessage2(\'AutoTrimps\')'),ATbutton.setAttribute('class','btn btn-success logFlt');var tab=document.createElement('DIV');tab.setAttribute('class','btn-group'),tab.setAttribute('role','group'),tab.appendChild(ATbutton),document.getElementById('logBtnGroup').appendChild(tab);
function filterMessage2(a){var b=document.getElementById("log");displayed=!ATmessageLogTabVisible,ATmessageLogTabVisible=displayed;var c=document.getElementsByClassName(a+"Message"),d=displayed?a:a+" off",e=document.getElementById(a+"Filter");e.innerHTML=d,e.className="",e.className=getTabClass(displayed),displayed=displayed?"block":"none";for(var f=0;f<c.length;f++)c[f].style.display=displayed;b.scrollTop=b.scrollHeight}

function formatMinutesForDescriptions(number){
    var text;
    var seconds = Math.floor((number*60) % 60);
    var minutes = Math.floor(number % 60);
    var hours = Math.floor(number / 60);
    if (hours == 0)
        text = minutes + " minutes " + seconds + " seconds";
    else if (minutes > 0) {
        if (minutes < 10) minutes = "0" + minutes;
        if (seconds < 10) seconds = "0" + seconds;
        text = hours + ":" + minutes + ":" + seconds;
    }
    else {
        var hs = (hours > 1) ? "s" : "";
        var ms = (minutes > 1) ? "s" : "";
        var ss = (seconds > 1) ? "s" : "";
        text = hours + " hour" + hs + " " + minutes + " minute" + ms + " " + seconds + " second" + ss;
    }
    return text;
}

window.onerror=function(b,c,d,e,f){var g=['Message: '+b,'URL: '+c,'Line: '+d,'Column: '+e,'Error object: '+JSON.stringify(f)].join(' - ');0!=d&&console.log('AT logged error: '+g)};
function throwErrorfromModule(){throw new Error("We have successfully read the thrown error message out of a module")}
