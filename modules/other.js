MODULES["other"] = {};
MODULES["other"].enableRoboTrimpSpam = true;
var prestraid = !1,
    dprestraid = !1,
    failpraid = !1,
    dfailpraid = !1,
    bwraided = !1,
    dbwraided = !1,
    failbwraid = !1,
    dfailbwraid = !1,
    perked = !1,
    prestraidon = !1,
    dprestraidon = !1,
    mapbought = !1,
    dmapbought = !1,
    bwraidon = !1,
    dbwraidon = !1,
    presteps = null,
    minMaxMapCost, fMap, pMap, shouldFarmFrags = !1,
    praidDone = !1;

function armydeath() {
    if (game.global.mapsActive) return !1;
    var e = game.global.lastClearedCell + 1,
        l = game.global.gridArray[e].attack * dailyModifiers.empower.getMult(game.global.dailyChallenge.empower.strength, game.global.dailyChallenge.empower.stacks),
        a = game.global.soldierHealth + game.global.soldierEnergyShield;
    "Ice" == getEmpowerment() && (l *= game.empowerments.Ice.getCombatModifier());
    var g = game.global.soldierCurrentBlock;
    return 3 == game.global.formation ? g /= 4 : "0" != game.global.formation && (g *= 2), g > game.global.gridArray[e].attack ? l *= getPierceAmt() : l -= g * (1 - getPierceAmt()), "Daily" == game.global.challengeActive && void 0 !== game.global.dailyChallenge.crits && (l *= dailyModifiers.crits.getMult(game.global.dailyChallenge.crits.strength)), void 0 !== game.global.dailyChallenge.bogged && (a -= game.global.soldierHealthMax * dailyModifiers.bogged.getMult(game.global.dailyChallenge.bogged.strength)), void 0 !== game.global.dailyChallenge.plague && (a -= game.global.soldierHealthMax * dailyModifiers.plague.getMult(game.global.dailyChallenge.plague.strength, game.global.dailyChallenge.plague.stacks)), challengeActive("Electricity") && (a -= game.global.soldierHealth -= game.global.soldierHealthMax * (.1 * game.challenges.Electricity.stacks)), "corruptCrit" == game.global.gridArray[e].corrupted ? l *= 5 : "healthyCrit" == game.global.gridArray[e].corrupted ? l *= 7 : "corruptBleed" == game.global.gridArray[e].corrupted ? a *= .8 : "healthyBleed" == game.global.gridArray[e].corrupted && (a *= .7), (a -= l) <= 1e3
}

function autoRoboTrimp() {
    if (!(0 < game.global.roboTrimpCooldown) && game.global.roboTrimpLevel) {
        var a = parseInt(getPageSetting("AutoRoboTrimp"));
        0 == a || game.global.world >= a && (game.global.world - a) % 5 == 0 && !checkIfLiquidZone() && !game.global.useShriek && (magnetoShriek(), MODULES.other.enableRoboTrimpSpam && debug("Activated Robotrimp MagnetoShriek Ability @ z" + game.global.world, "graphs", "*podcast"))
    }
}

function isBelowThreshold(a) {
    return a != game.global.world
}

function buyWeps() {
    if (!((getPageSetting('BuyWeaponsNew') == 1) || (getPageSetting('BuyWeaponsNew') == 3))) return;
    preBuy(), game.global.buyAmt = getPageSetting('gearamounttobuy'), game.equipment.Dagger.level < getPageSetting('CapEquip2') && canAffordBuilding('Dagger', null, null, !0) && buyEquipment('Dagger', !0, !0), game.equipment.Mace.level < getPageSetting('CapEquip2') && canAffordBuilding('Mace', null, null, !0) && buyEquipment('Mace', !0, !0), game.equipment.Polearm.level < getPageSetting('CapEquip2') && canAffordBuilding('Polearm', null, null, !0) && buyEquipment('Polearm', !0, !0), game.equipment.Battleaxe.level < getPageSetting('CapEquip2') && canAffordBuilding('Battleaxe', null, null, !0) && buyEquipment('Battleaxe', !0, !0), game.equipment.Greatsword.level < getPageSetting('CapEquip2') && canAffordBuilding('Greatsword', null, null, !0) && buyEquipment('Greatsword', !0, !0), !game.equipment.Arbalest.locked && game.equipment.Arbalest.level < getPageSetting('CapEquip2') && canAffordBuilding('Arbalest', null, null, !0) && buyEquipment('Arbalest', !0, !0), postBuy()
}

function buyArms() {
    if (!((getPageSetting('BuyArmourNew') == 1) || (getPageSetting('BuyArmourNew') == 3))) return;
    preBuy(), game.global.buyAmt = 10, game.equipment.Shield.level < getPageSetting('CapEquiparm') && canAffordBuilding('Shield', null, null, !0) && buyEquipment('Shield', !0, !0), game.equipment.Boots.level < getPageSetting('CapEquiparm') && canAffordBuilding('Boots', null, null, !0) && buyEquipment('Boots', !0, !0), game.equipment.Helmet.level < getPageSetting('CapEquiparm') && canAffordBuilding('Helmet', null, null, !0) && buyEquipment('Helmet', !0, !0), game.equipment.Pants.level < getPageSetting('CapEquiparm') && canAffordBuilding('Pants', null, null, !0) && buyEquipment('Pants', !0, !0), game.equipment.Shoulderguards.level < getPageSetting('CapEquiparm') && canAffordBuilding('Shoulderguards', null, null, !0) && buyEquipment('Shoulderguards', !0, !0), game.equipment.Breastplate.level < getPageSetting('CapEquiparm') && canAffordBuilding('Breastplate', null, null, !0) && buyEquipment('Breastplate', !0, !0), !game.equipment.Gambeson.locked && game.equipment.Gambeson.level < getPageSetting('CapEquiparm') && canAffordBuilding('Gambeson', null, null, !0) && buyEquipment('Gambeson', !0, !0), postBuy()
}

function isActiveSpireAT() {
    return game.global.challengeActive != 'Daily' && game.global.spireActive && game.global.world >= getPageSetting('IgnoreSpiresUntil')
}

function disActiveSpireAT() {
    return game.global.challengeActive == 'Daily' && game.global.spireActive && game.global.world >= getPageSetting('dIgnoreSpiresUntil')
}

function exitSpireCell() {
    isActiveSpireAT() && game.global.lastClearedCell >= getPageSetting('ExitSpireCell') - 1 && endSpire()
}

function dailyexitSpireCell() {
    disActiveSpireAT() && game.global.lastClearedCell >= getPageSetting('dExitSpireCell') - 1 && endSpire()
}

function plusPres() {
    document.getElementById("biomeAdvMapsSelect").value = "Random", document.getElementById("advExtraLevelSelect").value = plusMapToRun(game.global.world), document.getElementById("advSpecialSelect").value = "p", document.getElementById("lootAdvMapsRange").value = 0, document.getElementById("difficultyAdvMapsRange").value = 9, document.getElementById("sizeAdvMapsRange").value = 9, document.getElementById("advPerfectCheckbox").checked = !1, document.getElementById("mapLevelInput").value = game.global.world, updateMapCost()
}

function plusMapToRun(a) {
    return 9 == a % 10 ? 6 : 5 > a % 10 ? 5 - a % 10 : 11 - a % 10
}

function findLastBionic() {
    for (var a = game.global.mapsOwnedArray.length - 1; 0 <= a; a--)
        if ("Bionic" === game.global.mapsOwnedArray[a].location) return game.global.mapsOwnedArray[a]
}

function helptrimpsnotdie() {
    if (!game.global.preMapsActive && !game.global.fighting) buyArms();
}

function usedaily3() {
    !0 != getPageSetting('use3daily') || 'Daily' != game.global.challengeActive || daily3 || (daily3 = !0), !1 == getPageSetting('use3daily') && 'Daily' != game.global.challengeActive && daily3 && (daily3 = !1), !0 == getPageSetting('use3daily') && 'Daily' != game.global.challengeActive && daily3 && (daily3 = !1)
}

function buyshitspire() {
    !0 == getPageSetting('spireshitbuy') && game.global.spireActive && game.global.world >= getPageSetting('IgnoreSpiresUntil') && (buyWeps(), buyArms())
}

//Helium

function autoGoldenUpgradesAT(setting) {
    var num = getAvailableGoldenUpgrades();
    var setting2;
    if (num == 0) return;
    if (setting == "Helium")
        setting2 = "Helium";
    if ((!game.global.dailyChallenge.seed && !game.global.runningChallengeSquared && autoTrimpSettings.AutoGoldenUpgrades.selected == "Helium" && getPageSetting('radonbattle') > 0 && game.goldenUpgrades.Helium.purchasedAt.length >= getPageSetting('radonbattle')) || (game.global.dailyChallenge.seed && autoTrimpSettings.dAutoGoldenUpgrades.selected == "Helium" && getPageSetting('dradonbattle') > 0 && game.goldenUpgrades.Helium.purchasedAt.length >= getPageSetting('dradonbattle')))
        setting2 = "Battle";
    if (setting == "Battle")
        setting2 = "Battle";
    if ((!game.global.dailyChallenge.seed && !game.global.runningChallengeSquared && autoTrimpSettings.AutoGoldenUpgrades.selected == "Battle" && getPageSetting('battleradon') > 0 && game.goldenUpgrades.Battle.purchasedAt.length >= getPageSetting('battleradon')) || (game.global.dailyChallenge.seed && autoTrimpSettings.dAutoGoldenUpgrades.selected == "Battle" && getPageSetting('dbattleradon') > 0 && game.goldenUpgrades.Battle.purchasedAt.length >= getPageSetting('dbattleradon')))
        setting2 = "Helium";
    if (setting == "Void" || setting == "Void + Battle")
        setting2 = "Void";
    var success = buyGoldenUpgrade(setting2);
    if (!success && setting2 == "Void") {
        num = getAvailableGoldenUpgrades();
        if (num == 0) return;
        if ((autoTrimpSettings.AutoGoldenUpgrades.selected == "Void" && !game.global.dailyChallenge.seed && !game.global.runningChallengeSquared) || (autoTrimpSettings.dAutoGoldenUpgrades.selected == "Void" && game.global.dailyChallenge.seed))
            setting2 = "Helium";
        if (((autoTrimpSettings.AutoGoldenUpgrades.selected == "Void" && getPageSetting('voidheliumbattle') > 0 && game.global.world >= getPageSetting('voidheliumbattle')) || (autoTrimpSettings.dAutoGoldenUpgrades.selected == "Void" && getPageSetting('dvoidheliumbattle') > 0 && game.global.world >= getPageSetting('dvoidheliumbattle'))) || ((autoTrimpSettings.AutoGoldenUpgrades.selected == "Void + Battle" && !game.global.dailyChallenge.seed && !game.global.runningChallengeSquared) || (autoTrimpSettings.dAutoGoldenUpgrades.selected == "Void + Battle" && game.global.dailyChallenge.seed) || (autoTrimpSettings.cAutoGoldenUpgrades.selected == "Void + Battle" && game.global.runningChallengeSquared)))
            setting2 = "Battle";
        buyGoldenUpgrade(setting2);
    }
}

//Praiding

function plusMapToRun1() {
    var map = 1;
    if (game.global.world % 10 == 5)
        map = 6;
    if (game.global.world % 10 == 6)
        map = 5;
    if (game.global.world % 10 == 7)
        map = 4;
    if (game.global.world % 10 == 8)
        map = 3;
    if (game.global.world % 10 == 9)
        map = 2;
    return map;
}

function plusMapToRun2() {
    var map = 2;
    if (game.global.world % 10 == 4)
        map = 7;
    if (game.global.world % 10 == 5)
        map = 7;
    if (game.global.world % 10 == 6)
        map = 6;
    if (game.global.world % 10 == 7)
        map = 5;
    if (game.global.world % 10 == 8)
        map = 4;
    if (game.global.world % 10 == 9)
        map = 3;
    return map;
}

function plusMapToRun3() {
    var map = 3;
    if (game.global.world % 10 == 3)
        map = 8;
    if (game.global.world % 10 == 4)
        map = 8;
    if (game.global.world % 10 == 5)
        map = 8;
    if (game.global.world % 10 == 6)
        map = 7;
    if (game.global.world % 10 == 7)
        map = 6;
    if (game.global.world % 10 == 8)
        map = 5;
    if (game.global.world % 10 == 9)
        map = 4;
    return map;
}

function plusMapToRun4() {
    var map = 4;
    if (game.global.world % 10 == 2)
        map = 9;
    if (game.global.world % 10 == 3)
        map = 9;
    if (game.global.world % 10 == 4)
        map = 9;
    if (game.global.world % 10 == 5)
        map = 9;
    if (game.global.world % 10 == 6)
        map = 8;
    if (game.global.world % 10 == 7)
        map = 7;
    if (game.global.world % 10 == 8)
        map = 6;
    if (game.global.world % 10 == 9)
        map = 5;
    return map;
}

function plusMapToRun5() {
    var map = 5;
    if (game.global.world % 10 == 1)
        map = 10;
    if (game.global.world % 10 == 2)
        map = 10;
    if (game.global.world % 10 == 3)
        map = 10;
    if (game.global.world % 10 == 4)
        map = 10;
    if (game.global.world % 10 == 5)
        map = 10;
    if (game.global.world % 10 == 6)
        map = 9;
    if (game.global.world % 10 == 7)
        map = 8;
    if (game.global.world % 10 == 8)
        map = 7;
    if (game.global.world % 10 == 9)
        map = 6;
    return map;
}

function plusPres1() {
    document.getElementById("biomeAdvMapsSelect").value = "Depths";
    document.getElementById("advExtraLevelSelect").value = plusMapToRun1();
    document.getElementById("advSpecialSelect").value = "p";
    document.getElementById("lootAdvMapsRange").value = 0;
    document.getElementById("difficultyAdvMapsRange").value = 9;
    document.getElementById("sizeAdvMapsRange").value = 9;
    document.getElementById("advPerfectCheckbox").checked = true;
    document.getElementById("mapLevelInput").value = game.global.world;
    updateMapCost();

    if (updateMapCost(true) > game.resources.fragments.owned) {
        document.getElementById("biomeAdvMapsSelect").value = "Random";
        updateMapCost();
    }
    if (updateMapCost(true) > game.resources.fragments.owned) {
        document.getElementById("advPerfectCheckbox").checked = false;
        updateMapCost();
    }
    if (updateMapCost(true) > game.resources.fragments.owned) {
        document.getElementById("difficultyAdvMapsRange").value = 8;
        updateMapCost();
    }
    if (updateMapCost(true) > game.resources.fragments.owned) {
        document.getElementById("sizeAdvMapsRange").value = 8;
        updateMapCost();
    }
    if (updateMapCost(true) > game.resources.fragments.owned) {
        document.getElementById("difficultyAdvMapsRange").value = 7;
        updateMapCost();
    }
    if (updateMapCost(true) > game.resources.fragments.owned) {
        document.getElementById("sizeAdvMapsRange").value = 7;
        updateMapCost();
    }
    if (updateMapCost(true) > game.resources.fragments.owned) {
        document.getElementById("difficultyAdvMapsRange").value = 6;
        updateMapCost();
    }
    if (updateMapCost(true) > game.resources.fragments.owned) {
        document.getElementById("sizeAdvMapsRange").value = 6;
        updateMapCost();
    }
    if (updateMapCost(true) > game.resources.fragments.owned) {
        document.getElementById("difficultyAdvMapsRange").value = 5;
        updateMapCost();
    }
    if (updateMapCost(true) > game.resources.fragments.owned) {
        document.getElementById("sizeAdvMapsRange").value = 5;
        updateMapCost();
    }
    if (updateMapCost(true) > game.resources.fragments.owned) {
        document.getElementById("difficultyAdvMapsRange").value = 4;
        updateMapCost();
    }
    if (updateMapCost(true) > game.resources.fragments.owned) {
        document.getElementById("sizeAdvMapsRange").value = 4;
        updateMapCost();
    }
    if (updateMapCost(true) > game.resources.fragments.owned) {
        document.getElementById("difficultyAdvMapsRange").value = 3;
        updateMapCost();
    }
    if (updateMapCost(true) > game.resources.fragments.owned) {
        document.getElementById("sizeAdvMapsRange").value = 3;
        updateMapCost();
    }
    if (updateMapCost(true) > game.resources.fragments.owned) {
        document.getElementById("difficultyAdvMapsRange").value = 2;
        updateMapCost();
    }
    if (updateMapCost(true) > game.resources.fragments.owned) {
        document.getElementById("sizeAdvMapsRange").value = 2;
        updateMapCost();
    }
    if (updateMapCost(true) > game.resources.fragments.owned) {
        document.getElementById("difficultyAdvMapsRange").value = 1;
        updateMapCost();
    }
    if (updateMapCost(true) > game.resources.fragments.owned) {
        document.getElementById("sizeAdvMapsRange").value = 1;
        updateMapCost();
    }
    if (updateMapCost(true) > game.resources.fragments.owned) {
        document.getElementById("difficultyAdvMapsRange").value = 0;
        updateMapCost();
    }
    if (updateMapCost(true) > game.resources.fragments.owned) {
        document.getElementById("sizeAdvMapsRange").value = 0;
        updateMapCost();
    }
    if (updateMapCost(true) > game.resources.fragments.owned) {
        document.getElementById("advSpecialSelect").value = "fa";
        updateMapCost();
    }
    if (updateMapCost(true) > game.resources.fragments.owned) {
        document.getElementById("advSpecialSelect").value = "0";
        updateMapCost();
    }
}

function plusPres2() {
    document.getElementById("biomeAdvMapsSelect").value = "Depths";
    document.getElementById("advExtraLevelSelect").value = plusMapToRun2();
    document.getElementById("advSpecialSelect").value = "p";
    document.getElementById("lootAdvMapsRange").value = 0;
    document.getElementById("difficultyAdvMapsRange").value = 9;
    document.getElementById("sizeAdvMapsRange").value = 9;
    document.getElementById("advPerfectCheckbox").checked = true;
    document.getElementById("mapLevelInput").value = game.global.world;
    updateMapCost();

    if (updateMapCost(true) > game.resources.fragments.owned) {
        document.getElementById("biomeAdvMapsSelect").value = "Random";
        updateMapCost();
    }
    if (updateMapCost(true) > game.resources.fragments.owned) {
        document.getElementById("advPerfectCheckbox").checked = false;
        updateMapCost();
    }
    if (updateMapCost(true) > game.resources.fragments.owned) {
        document.getElementById("difficultyAdvMapsRange").value = 8;
        updateMapCost();
    }
    if (updateMapCost(true) > game.resources.fragments.owned) {
        document.getElementById("sizeAdvMapsRange").value = 8;
        updateMapCost();
    }
    if (updateMapCost(true) > game.resources.fragments.owned) {
        document.getElementById("difficultyAdvMapsRange").value = 7;
        updateMapCost();
    }
    if (updateMapCost(true) > game.resources.fragments.owned) {
        document.getElementById("sizeAdvMapsRange").value = 7;
        updateMapCost();
    }
    if (updateMapCost(true) > game.resources.fragments.owned) {
        document.getElementById("difficultyAdvMapsRange").value = 6;
        updateMapCost();
    }
    if (updateMapCost(true) > game.resources.fragments.owned) {
        document.getElementById("sizeAdvMapsRange").value = 6;
        updateMapCost();
    }
    if (updateMapCost(true) > game.resources.fragments.owned) {
        document.getElementById("difficultyAdvMapsRange").value = 5;
        updateMapCost();
    }
    if (updateMapCost(true) > game.resources.fragments.owned) {
        document.getElementById("sizeAdvMapsRange").value = 5;
        updateMapCost();
    }
    if (updateMapCost(true) > game.resources.fragments.owned) {
        document.getElementById("difficultyAdvMapsRange").value = 4;
        updateMapCost();
    }
    if (updateMapCost(true) > game.resources.fragments.owned) {
        document.getElementById("sizeAdvMapsRange").value = 4;
        updateMapCost();
    }
    if (updateMapCost(true) > game.resources.fragments.owned) {
        document.getElementById("difficultyAdvMapsRange").value = 3;
        updateMapCost();
    }
    if (updateMapCost(true) > game.resources.fragments.owned) {
        document.getElementById("sizeAdvMapsRange").value = 3;
        updateMapCost();
    }
    if (updateMapCost(true) > game.resources.fragments.owned) {
        document.getElementById("difficultyAdvMapsRange").value = 2;
        updateMapCost();
    }
    if (updateMapCost(true) > game.resources.fragments.owned) {
        document.getElementById("sizeAdvMapsRange").value = 2;
        updateMapCost();
    }
    if (updateMapCost(true) > game.resources.fragments.owned) {
        document.getElementById("difficultyAdvMapsRange").value = 1;
        updateMapCost();
    }
    if (updateMapCost(true) > game.resources.fragments.owned) {
        document.getElementById("sizeAdvMapsRange").value = 1;
        updateMapCost();
    }
    if (updateMapCost(true) > game.resources.fragments.owned) {
        document.getElementById("difficultyAdvMapsRange").value = 0;
        updateMapCost();
    }
    if (updateMapCost(true) > game.resources.fragments.owned) {
        document.getElementById("sizeAdvMapsRange").value = 0;
        updateMapCost();
    }
    if (updateMapCost(true) > game.resources.fragments.owned) {
        document.getElementById("advSpecialSelect").value = "fa";
        updateMapCost();
    }
    if (updateMapCost(true) > game.resources.fragments.owned) {
        document.getElementById("advSpecialSelect").value = "0";
        updateMapCost();
    }
}

function plusPres3() {
    document.getElementById("biomeAdvMapsSelect").value = "Depths";
    document.getElementById("advExtraLevelSelect").value = plusMapToRun3();
    document.getElementById("advSpecialSelect").value = "p";
    document.getElementById("lootAdvMapsRange").value = 0;
    document.getElementById("difficultyAdvMapsRange").value = 9;
    document.getElementById("sizeAdvMapsRange").value = 9;
    document.getElementById("advPerfectCheckbox").checked = true;
    document.getElementById("mapLevelInput").value = game.global.world;
    updateMapCost();

    if (updateMapCost(true) > game.resources.fragments.owned) {
        document.getElementById("biomeAdvMapsSelect").value = "Random";
        updateMapCost();
    }
    if (updateMapCost(true) > game.resources.fragments.owned) {
        document.getElementById("advPerfectCheckbox").checked = false;
        updateMapCost();
    }
    if (updateMapCost(true) > game.resources.fragments.owned) {
        document.getElementById("difficultyAdvMapsRange").value = 8;
        updateMapCost();
    }
    if (updateMapCost(true) > game.resources.fragments.owned) {
        document.getElementById("sizeAdvMapsRange").value = 8;
        updateMapCost();
    }
    if (updateMapCost(true) > game.resources.fragments.owned) {
        document.getElementById("difficultyAdvMapsRange").value = 7;
        updateMapCost();
    }
    if (updateMapCost(true) > game.resources.fragments.owned) {
        document.getElementById("sizeAdvMapsRange").value = 7;
        updateMapCost();
    }
    if (updateMapCost(true) > game.resources.fragments.owned) {
        document.getElementById("difficultyAdvMapsRange").value = 6;
        updateMapCost();
    }
    if (updateMapCost(true) > game.resources.fragments.owned) {
        document.getElementById("sizeAdvMapsRange").value = 6;
        updateMapCost();
    }
    if (updateMapCost(true) > game.resources.fragments.owned) {
        document.getElementById("difficultyAdvMapsRange").value = 5;
        updateMapCost();
    }
    if (updateMapCost(true) > game.resources.fragments.owned) {
        document.getElementById("sizeAdvMapsRange").value = 5;
        updateMapCost();
    }
    if (updateMapCost(true) > game.resources.fragments.owned) {
        document.getElementById("difficultyAdvMapsRange").value = 4;
        updateMapCost();
    }
    if (updateMapCost(true) > game.resources.fragments.owned) {
        document.getElementById("sizeAdvMapsRange").value = 4;
        updateMapCost();
    }
    if (updateMapCost(true) > game.resources.fragments.owned) {
        document.getElementById("difficultyAdvMapsRange").value = 3;
        updateMapCost();
    }
    if (updateMapCost(true) > game.resources.fragments.owned) {
        document.getElementById("sizeAdvMapsRange").value = 3;
        updateMapCost();
    }
    if (updateMapCost(true) > game.resources.fragments.owned) {
        document.getElementById("difficultyAdvMapsRange").value = 2;
        updateMapCost();
    }
    if (updateMapCost(true) > game.resources.fragments.owned) {
        document.getElementById("sizeAdvMapsRange").value = 2;
        updateMapCost();
    }
    if (updateMapCost(true) > game.resources.fragments.owned) {
        document.getElementById("difficultyAdvMapsRange").value = 1;
        updateMapCost();
    }
    if (updateMapCost(true) > game.resources.fragments.owned) {
        document.getElementById("sizeAdvMapsRange").value = 1;
        updateMapCost();
    }
    if (updateMapCost(true) > game.resources.fragments.owned) {
        document.getElementById("difficultyAdvMapsRange").value = 0;
        updateMapCost();
    }
    if (updateMapCost(true) > game.resources.fragments.owned) {
        document.getElementById("sizeAdvMapsRange").value = 0;
        updateMapCost();
    }
    if (updateMapCost(true) > game.resources.fragments.owned) {
        document.getElementById("advSpecialSelect").value = "fa";
        updateMapCost();
    }
    if (updateMapCost(true) > game.resources.fragments.owned) {
        document.getElementById("advSpecialSelect").value = "0";
        updateMapCost();
    }
}

function plusPres4() {
    document.getElementById("biomeAdvMapsSelect").value = "Depths";
    document.getElementById("advExtraLevelSelect").value = plusMapToRun4();
    document.getElementById("advSpecialSelect").value = "p";
    document.getElementById("lootAdvMapsRange").value = 0;
    document.getElementById("difficultyAdvMapsRange").value = 9;
    document.getElementById("sizeAdvMapsRange").value = 9;
    document.getElementById("advPerfectCheckbox").checked = true;
    document.getElementById("mapLevelInput").value = game.global.world;
    updateMapCost();

    if (updateMapCost(true) > game.resources.fragments.owned) {
        document.getElementById("biomeAdvMapsSelect").value = "Random";
        updateMapCost();
    }
    if (updateMapCost(true) > game.resources.fragments.owned) {
        document.getElementById("advPerfectCheckbox").checked = false;
        updateMapCost();
    }
    if (updateMapCost(true) > game.resources.fragments.owned) {
        document.getElementById("difficultyAdvMapsRange").value = 8;
        updateMapCost();
    }
    if (updateMapCost(true) > game.resources.fragments.owned) {
        document.getElementById("sizeAdvMapsRange").value = 8;
        updateMapCost();
    }
    if (updateMapCost(true) > game.resources.fragments.owned) {
        document.getElementById("difficultyAdvMapsRange").value = 7;
        updateMapCost();
    }
    if (updateMapCost(true) > game.resources.fragments.owned) {
        document.getElementById("sizeAdvMapsRange").value = 7;
        updateMapCost();
    }
    if (updateMapCost(true) > game.resources.fragments.owned) {
        document.getElementById("difficultyAdvMapsRange").value = 6;
        updateMapCost();
    }
    if (updateMapCost(true) > game.resources.fragments.owned) {
        document.getElementById("sizeAdvMapsRange").value = 6;
        updateMapCost();
    }
    if (updateMapCost(true) > game.resources.fragments.owned) {
        document.getElementById("difficultyAdvMapsRange").value = 5;
        updateMapCost();
    }
    if (updateMapCost(true) > game.resources.fragments.owned) {
        document.getElementById("sizeAdvMapsRange").value = 5;
        updateMapCost();
    }
    if (updateMapCost(true) > game.resources.fragments.owned) {
        document.getElementById("difficultyAdvMapsRange").value = 4;
        updateMapCost();
    }
    if (updateMapCost(true) > game.resources.fragments.owned) {
        document.getElementById("sizeAdvMapsRange").value = 4;
        updateMapCost();
    }
    if (updateMapCost(true) > game.resources.fragments.owned) {
        document.getElementById("difficultyAdvMapsRange").value = 3;
        updateMapCost();
    }
    if (updateMapCost(true) > game.resources.fragments.owned) {
        document.getElementById("sizeAdvMapsRange").value = 3;
        updateMapCost();
    }
    if (updateMapCost(true) > game.resources.fragments.owned) {
        document.getElementById("difficultyAdvMapsRange").value = 2;
        updateMapCost();
    }
    if (updateMapCost(true) > game.resources.fragments.owned) {
        document.getElementById("sizeAdvMapsRange").value = 2;
        updateMapCost();
    }
    if (updateMapCost(true) > game.resources.fragments.owned) {
        document.getElementById("difficultyAdvMapsRange").value = 1;
        updateMapCost();
    }
    if (updateMapCost(true) > game.resources.fragments.owned) {
        document.getElementById("sizeAdvMapsRange").value = 1;
        updateMapCost();
    }
    if (updateMapCost(true) > game.resources.fragments.owned) {
        document.getElementById("difficultyAdvMapsRange").value = 0;
        updateMapCost();
    }
    if (updateMapCost(true) > game.resources.fragments.owned) {
        document.getElementById("sizeAdvMapsRange").value = 0;
        updateMapCost();
    }
    if (updateMapCost(true) > game.resources.fragments.owned) {
        document.getElementById("advSpecialSelect").value = "fa";
        updateMapCost();
    }
    if (updateMapCost(true) > game.resources.fragments.owned) {
        document.getElementById("advSpecialSelect").value = "0";
        updateMapCost();
    }
}

function plusPres5() {
    document.getElementById("biomeAdvMapsSelect").value = "Depths";
    document.getElementById("advExtraLevelSelect").value = plusMapToRun5();
    document.getElementById("advSpecialSelect").value = "p";
    document.getElementById("lootAdvMapsRange").value = 0;
    document.getElementById("difficultyAdvMapsRange").value = 9;
    document.getElementById("sizeAdvMapsRange").value = 9;
    document.getElementById("advPerfectCheckbox").checked = true;
    document.getElementById("mapLevelInput").value = game.global.world;
    updateMapCost();

    if (updateMapCost(true) > game.resources.fragments.owned) {
        document.getElementById("biomeAdvMapsSelect").value = "Random";
        updateMapCost();
    }
    if (updateMapCost(true) > game.resources.fragments.owned) {
        document.getElementById("advPerfectCheckbox").checked = false;
        updateMapCost();
    }
    if (updateMapCost(true) > game.resources.fragments.owned) {
        document.getElementById("difficultyAdvMapsRange").value = 8;
        updateMapCost();
    }
    if (updateMapCost(true) > game.resources.fragments.owned) {
        document.getElementById("sizeAdvMapsRange").value = 8;
        updateMapCost();
    }
    if (updateMapCost(true) > game.resources.fragments.owned) {
        document.getElementById("difficultyAdvMapsRange").value = 7;
        updateMapCost();
    }
    if (updateMapCost(true) > game.resources.fragments.owned) {
        document.getElementById("sizeAdvMapsRange").value = 7;
        updateMapCost();
    }
    if (updateMapCost(true) > game.resources.fragments.owned) {
        document.getElementById("difficultyAdvMapsRange").value = 6;
        updateMapCost();
    }
    if (updateMapCost(true) > game.resources.fragments.owned) {
        document.getElementById("sizeAdvMapsRange").value = 6;
        updateMapCost();
    }
    if (updateMapCost(true) > game.resources.fragments.owned) {
        document.getElementById("difficultyAdvMapsRange").value = 5;
        updateMapCost();
    }
    if (updateMapCost(true) > game.resources.fragments.owned) {
        document.getElementById("sizeAdvMapsRange").value = 5;
        updateMapCost();
    }
    if (updateMapCost(true) > game.resources.fragments.owned) {
        document.getElementById("difficultyAdvMapsRange").value = 4;
        updateMapCost();
    }
    if (updateMapCost(true) > game.resources.fragments.owned) {
        document.getElementById("sizeAdvMapsRange").value = 4;
        updateMapCost();
    }
    if (updateMapCost(true) > game.resources.fragments.owned) {
        document.getElementById("difficultyAdvMapsRange").value = 3;
        updateMapCost();
    }
    if (updateMapCost(true) > game.resources.fragments.owned) {
        document.getElementById("sizeAdvMapsRange").value = 3;
        updateMapCost();
    }
    if (updateMapCost(true) > game.resources.fragments.owned) {
        document.getElementById("difficultyAdvMapsRange").value = 2;
        updateMapCost();
    }
    if (updateMapCost(true) > game.resources.fragments.owned) {
        document.getElementById("sizeAdvMapsRange").value = 2;
        updateMapCost();
    }
    if (updateMapCost(true) > game.resources.fragments.owned) {
        document.getElementById("difficultyAdvMapsRange").value = 1;
        updateMapCost();
    }
    if (updateMapCost(true) > game.resources.fragments.owned) {
        document.getElementById("sizeAdvMapsRange").value = 1;
        updateMapCost();
    }
    if (updateMapCost(true) > game.resources.fragments.owned) {
        document.getElementById("difficultyAdvMapsRange").value = 0;
        updateMapCost();
    }
    if (updateMapCost(true) > game.resources.fragments.owned) {
        document.getElementById("sizeAdvMapsRange").value = 0;
        updateMapCost();
    }
    if (updateMapCost(true) > game.resources.fragments.owned) {
        document.getElementById("advSpecialSelect").value = "fa";
        updateMapCost();
    }
    if (updateMapCost(true) > game.resources.fragments.owned) {
        document.getElementById("advSpecialSelect").value = "0";
        updateMapCost();
    }
}

function pcheck1() {

    var HD;
    var P;
    var I;

    if (game.global.challengeActive != "Daily") {
        HD = getPageSetting('PraidingHD');
        P = (getPageSetting('PraidingP') > 0 ? getPageSetting('PraidingP') : 0);
        I = (getPageSetting('PraidingI') > 0 ? getPageSetting('PraidingI') : 0);
    }
    if (game.global.challengeActive == "Daily") {
        HD = getPageSetting('dPraidingHD');
        P = (getPageSetting('dPraidingP') > 0 ? getPageSetting('dPraidingP') : 0);
        I = (getPageSetting('dPraidingI') > 0 ? getPageSetting('dPraidingI') : 0);
    }

    var go = false;

    if (HD <= 0) {
        go = true;
    } else if (HD > 0) {
        go = (HD >= calcHDratio(game.global.world + plusMapToRun1()));
    }
    if (P > 0 && getEmpowerment() == "Poison") {
        go = (P >= plusMapToRun1());
    }
    if (I > 0 && getEmpowerment() == "Ice") {
        go = (I >= plusMapToRun1());
    }
    return go;
}

function pcheck2() {

    var HD;
    var P;
    var I;

    if (game.global.challengeActive != "Daily") {
        HD = getPageSetting('PraidingHD');
        P = (getPageSetting('PraidingP') > 0 ? getPageSetting('PraidingP') : 0);
        I = (getPageSetting('PraidingI') > 0 ? getPageSetting('PraidingI') : 0);
    }
    if (game.global.challengeActive == "Daily") {
        HD = getPageSetting('dPraidingHD');
        P = (getPageSetting('dPraidingP') > 0 ? getPageSetting('dPraidingP') : 0);
        I = (getPageSetting('dPraidingI') > 0 ? getPageSetting('dPraidingI') : 0);
    }

    var go = false;

    if (HD <= 0) {
        go = true;
    } else if (HD > 0) {
        go = (HD >= calcHDratio(game.global.world + plusMapToRun2()));
    }
    if (P > 0 && getEmpowerment() == "Poison") {
        go = (P >= plusMapToRun2());
    }
    if (I > 0 && getEmpowerment() == "Ice") {
        go = (I >= plusMapToRun2());
    }
    return go;
}

function pcheck3() {

    var HD;
    var P;
    var I;

    if (game.global.challengeActive != "Daily") {
        HD = getPageSetting('PraidingHD');
        P = (getPageSetting('PraidingP') > 0 ? getPageSetting('PraidingP') : 0);
        I = (getPageSetting('PraidingI') > 0 ? getPageSetting('PraidingI') : 0);
    }
    if (game.global.challengeActive == "Daily") {
        HD = getPageSetting('dPraidingHD');
        P = (getPageSetting('dPraidingP') > 0 ? getPageSetting('dPraidingP') : 0);
        I = (getPageSetting('dPraidingI') > 0 ? getPageSetting('dPraidingI') : 0);
    }

    var go = false;

    if (HD <= 0) {
        go = true;
    } else if (HD > 0) {
        go = (HD >= calcHDratio(game.global.world + plusMapToRun3()));
    }
    if (P > 0 && getEmpowerment() == "Poison") {
        go = (P >= plusMapToRun3());
    }
    if (I > 0 && getEmpowerment() == "Ice") {
        go = (I >= plusMapToRun3());
    }
    return go;
}

function pcheck4() {

    var HD;
    var P;
    var I;

    if (game.global.challengeActive != "Daily") {
        HD = getPageSetting('PraidingHD');
        P = (getPageSetting('PraidingP') > 0 ? getPageSetting('PraidingP') : 0);
        I = (getPageSetting('PraidingI') > 0 ? getPageSetting('PraidingI') : 0);
    }
    if (game.global.challengeActive == "Daily") {
        HD = getPageSetting('dPraidingHD');
        P = (getPageSetting('dPraidingP') > 0 ? getPageSetting('dPraidingP') : 0);
        I = (getPageSetting('dPraidingI') > 0 ? getPageSetting('dPraidingI') : 0);
    }

    var go = false;

    if (HD <= 0) {
        go = true;
    } else if (HD > 0) {
        go = (HD >= calcHDratio(game.global.world + plusMapToRun4()));
    }
    if (P > 0 && getEmpowerment() == "Poison") {
        go = (P >= plusMapToRun4());
    }
    if (I > 0 && getEmpowerment() == "Ice") {
        go = (I >= plusMapToRun4());
    }
    return go;
}

function pcheck5() {

    var HD;
    var P;
    var I;

    if (game.global.challengeActive != "Daily") {
        HD = getPageSetting('PraidingHD');
        P = (getPageSetting('PraidingP') > 0 ? getPageSetting('PraidingP') : 0);
        I = (getPageSetting('PraidingI') > 0 ? getPageSetting('PraidingI') : 0);
    }
    if (game.global.challengeActive == "Daily") {
        HD = getPageSetting('dPraidingHD');
        P = (getPageSetting('dPraidingP') > 0 ? getPageSetting('dPraidingP') : 0);
        I = (getPageSetting('dPraidingI') > 0 ? getPageSetting('dPraidingI') : 0);
    }

    var go = false;

    if (HD <= 0) {
        go = true;
    } else if (HD > 0) {
        go = (HD >= calcHDratio(game.global.world + plusMapToRun5()));
    }
    if (P > 0 && getEmpowerment() == "Poison") {
        go = (P >= plusMapToRun5());
    }
    if (I > 0 && getEmpowerment() == "Ice") {
        go = (I >= plusMapToRun5());
    }
    return go;
}

function pcheckmap1() {
    var go = false;
    if (game.global.world % 10 == 0 && plusMapToRun1() == 1) {
        go = true;
    }
    if (game.global.world % 10 == 1 && (plusMapToRun1() == 1 || plusMapToRun1() == 10)) {
        go = true;
    }
    if (game.global.world % 10 == 2 && (plusMapToRun1() == 1 || plusMapToRun1() >= 9)) {
        go = true;
    }
    if (game.global.world % 10 == 3 && (plusMapToRun1() == 1 || plusMapToRun1() >= 8)) {
        go = true;
    }
    if (game.global.world % 10 == 4 && (plusMapToRun1() == 1 || plusMapToRun1() >= 7)) {
        go = true;
    }
    if (game.global.world % 10 == 5 && plusMapToRun1() >= 6) {
        go = true;
    }
    if (game.global.world % 10 == 6 && plusMapToRun1() >= 5) {
        go = true;
    }
    if (game.global.world % 10 == 7 && plusMapToRun1() >= 4) {
        go = true;
    }
    if (game.global.world % 10 == 8 && plusMapToRun1() >= 3) {
        go = true;
    }
    if (game.global.world % 10 == 9 && plusMapToRun1() >= 2) {
        go = true;
    }
    return go;
}

function pcheckmap2() {
    var go = false;
    if (game.global.world % 10 == 0 && plusMapToRun2() == 2) {
        go = true;
    }
    if (game.global.world % 10 == 1 && (plusMapToRun2() == 2 || plusMapToRun2() == 10)) {
        go = true;
    }
    if (game.global.world % 10 == 2 && (plusMapToRun2() == 2 || plusMapToRun2() >= 9)) {
        go = true;
    }
    if (game.global.world % 10 == 3 && (plusMapToRun2() == 2 || plusMapToRun2() >= 8)) {
        go = true;
    }
    if (game.global.world % 10 == 4 && plusMapToRun2() >= 7) {
        go = true;
    }
    if (game.global.world % 10 == 5 && plusMapToRun2() >= 6) {
        go = true;
    }
    if (game.global.world % 10 == 6 && plusMapToRun2() >= 6) {
        go = true;
    }
    if (game.global.world % 10 == 7 && plusMapToRun2() >= 5) {
        go = true;
    }
    if (game.global.world % 10 == 8 && plusMapToRun2() >= 4) {
        go = true;
    }
    if (game.global.world % 10 == 9 && plusMapToRun2() >= 3) {
        go = true;
    }
    return go;
}

function pcheckmap3() {
    var go = false;
    if (game.global.world % 10 == 0 && plusMapToRun3() == 3) {
        go = true;
    }
    if (game.global.world % 10 == 1 && (plusMapToRun3() == 3 || plusMapToRun3() == 10)) {
        go = true;
    }
    if (game.global.world % 10 == 2 && (plusMapToRun3() == 3 || plusMapToRun3() >= 9)) {
        go = true;
    }
    if (game.global.world % 10 == 3 && plusMapToRun3() >= 8) {
        go = true;
    }
    if (game.global.world % 10 == 4 && plusMapToRun3() >= 8) {
        go = true;
    }
    if (game.global.world % 10 == 5 && plusMapToRun3() >= 8) {
        go = true;
    }
    if (game.global.world % 10 == 6 && plusMapToRun3() >= 7) {
        go = true;
    }
    if (game.global.world % 10 == 7 && plusMapToRun3() >= 6) {
        go = true;
    }
    if (game.global.world % 10 == 8 && plusMapToRun3() >= 5) {
        go = true;
    }
    if (game.global.world % 10 == 9 && plusMapToRun3() >= 4) {
        go = true;
    }
    return go;
}

function pcheckmap4() {
    var go = false;
    if (game.global.world % 10 == 0 && plusMapToRun4() == 4) {
        go = true;
    }
    if (game.global.world % 10 == 1 && (plusMapToRun4() == 4 || plusMapToRun4() == 10)) {
        go = true;
    }
    if (game.global.world % 10 == 2 && plusMapToRun4() >= 9) {
        go = true;
    }
    if (game.global.world % 10 == 3 && plusMapToRun4() >= 8) {
        go = true;
    }
    if (game.global.world % 10 == 4 && plusMapToRun4() >= 7) {
        go = true;
    }
    if (game.global.world % 10 == 5 && plusMapToRun4() >= 6) {
        go = true;
    }
    if (game.global.world % 10 == 6 && plusMapToRun4() >= 5) {
        go = true;
    }
    if (game.global.world % 10 == 7 && plusMapToRun4() >= 4) {
        go = true;
    }
    if (game.global.world % 10 == 8 && plusMapToRun4() >= 3) {
        go = true;
    }
    if (game.global.world % 10 == 9 && plusMapToRun4() >= 2) {
        go = true;
    }
    return go;
}

function pcheckmap5() {
    var go = false;
    if (game.global.world % 10 == 0 && plusMapToRun5() == 5) {
        go = true;
    }
    if (game.global.world % 10 == 1 && (plusMapToRun5() == 4 || plusMapToRun5() == 10)) {
        go = true;
    }
    if (game.global.world % 10 == 2 && (plusMapToRun5() == 3 || plusMapToRun5() >= 9)) {
        go = true;
    }
    if (game.global.world % 10 == 3 && (plusMapToRun5() == 2 || plusMapToRun5() >= 8)) {
        go = true;
    }
    if (game.global.world % 10 == 4 && (plusMapToRun5() == 1 || plusMapToRun5() >= 7)) {
        go = true;
    }
    if (game.global.world % 10 == 5 && plusMapToRun5() >= 6) {
        go = true;
    }
    if (game.global.world % 10 == 6 && plusMapToRun5() >= 5) {
        go = true;
    }
    if (game.global.world % 10 == 7 && plusMapToRun5() >= 4) {
        go = true;
    }
    if (game.global.world % 10 == 8 && plusMapToRun5() >= 3) {
        go = true;
    }
    if (game.global.world % 10 == 9 && plusMapToRun5() >= 2) {
        go = true;
    }
    return go;
}

var pMap1 = undefined;
var pMap2 = undefined;
var pMap3 = undefined;
var pMap4 = undefined;
var pMap5 = undefined;
var repMap1 = undefined;
var repMap2 = undefined;
var repMap3 = undefined;
var repMap4 = undefined;
var repMap5 = undefined;
var mapbought1 = false;
var mapbought2 = false;
var mapbought3 = false;
var mapbought4 = false;
var mapbought5 = false;

function Praiding() {
    var cell;
    cell = ((getPageSetting('Praidingcell') > 0) ? getPageSetting('Praidingcell') : 0);
    if (getPageSetting('Praidingzone').length) {
        if (getPageSetting('Praidingzone').includes(game.global.world) && ((cell <= 1) || (cell > 1 && (game.global.lastClearedCell + 1) >= cell)) && !prestraid && !failpraid) {
            prestraidon = true;
            if (getPageSetting('AutoMaps') == 1 && !prestraid && !failpraid) {
                autoTrimpSettings["AutoMaps"].value = 0;
            }
            if (!game.global.preMapsActive && !game.global.mapsActive && !prestraid) {
                mapsClicked();
                if (!game.global.preMapsActive) {
                    mapsClicked();
                }
                debug("Beginning Prestige Raiding...");
            }
            if (game.options.menu.repeatUntil.enabled != 2 && !prestraid) {
                game.options.menu.repeatUntil.enabled = 2;
            }
            if (game.global.preMapsActive && !game.global.mapsActive && !prestraid) {
                debug("Map Loop");
                if (pcheckmap5() == true && pcheck5() == true && pMap5 == undefined && !mapbought5 && game.global.preMapsActive && !prestraid) {
                    debug("Check complete for 5th map");
                    plusPres5();
                    if ((updateMapCost(true) <= game.resources.fragments.owned)) {
                        buyMap();
                        mapbought5 = true;
                        if (mapbought5) {
                            pMap5 = game.global.mapsOwnedArray[game.global.mapsOwnedArray.length - 1].id;
                            debug("5th map bought");
                        }
                    }
                }
                if (pcheckmap4() == true && pcheck4() == true && pMap4 == undefined && !mapbought4 && game.global.preMapsActive && !prestraid) {
                    debug("Check complete for 4th map");
                    plusPres4();
                    if ((updateMapCost(true) <= game.resources.fragments.owned)) {
                        buyMap();
                        mapbought4 = true;
                        if (mapbought4) {
                            pMap4 = game.global.mapsOwnedArray[game.global.mapsOwnedArray.length - 1].id;
                            debug("4th map bought");
                        }
                    }
                }
                if (pcheckmap3() == true && pcheck3() == true && pMap3 == undefined && !mapbought3 && game.global.preMapsActive && !prestraid) {
                    debug("Check complete for 3rd map");
                    plusPres3();
                    if ((updateMapCost(true) <= game.resources.fragments.owned)) {
                        buyMap();
                        mapbought3 = true;
                        if (mapbought3) {
                            pMap3 = game.global.mapsOwnedArray[game.global.mapsOwnedArray.length - 1].id;
                            debug("3rd map bought");
                        }
                    }
                }
                if (pcheckmap2() == true && pcheck2() == true && pMap2 == undefined && !mapbought2 && game.global.preMapsActive && !prestraid) {
                    debug("Check complete for 2nd map");
                    plusPres2();
                    if ((updateMapCost(true) <= game.resources.fragments.owned)) {
                        buyMap();
                        mapbought2 = true;
                        if (mapbought2) {
                            pMap2 = game.global.mapsOwnedArray[game.global.mapsOwnedArray.length - 1].id;
                            debug("2nd map bought");
                        }
                    }
                }
                if (pcheckmap1() == true && pcheck1() == true && pMap1 == undefined && !mapbought1 && game.global.preMapsActive && !prestraid) {
                    debug("Check complete for 1st map");
                    plusPres1();
                    if ((updateMapCost(true) <= game.resources.fragments.owned)) {
                        buyMap();
                        mapbought1 = true;
                        if (mapbought1) {
                            pMap1 = game.global.mapsOwnedArray[game.global.mapsOwnedArray.length - 1].id;
                            debug("1st map bought");
                        }
                    }
                }
                if (!mapbought1 && !mapbought2 && !mapbought3 && !mapbought4 && !mapbought5) {
                    if (getPageSetting('AutoMaps') == 0 && !prestraid) {
                        autoTrimpSettings["AutoMaps"].value = 1;
                        game.options.menu.repeatUntil.enabled = 0;
                        prestraidon = false;
                        failpraid = true;
                        praidDone = true;
                        pMap1 = undefined;
                        pMap2 = undefined;
                        pMap3 = undefined;
                        pMap4 = undefined;
                        pMap5 = undefined;
                        debug("Failed to Prestige Raid. Looks like you can't afford to or you are too weak or you have limited yourself in a P/I zone. ");
                    }
                    return;
                }
            }
            if (game.global.preMapsActive && !game.global.mapsActive && mapbought1 && pMap1 != undefined && !prestraid) {
                debug("running map 1");
                selectMap(pMap1);
                runMap();
                repMap1 = pMap1;
                pMap1 = undefined;
            }
            if (game.global.preMapsActive && !game.global.mapsActive && mapbought2 && pMap2 != undefined && !prestraid) {
                debug("running map 2");
                selectMap(pMap2);
                runMap();
                repMap2 = pMap2;
                pMap2 = undefined;
            }
            if (game.global.preMapsActive && !game.global.mapsActive && mapbought3 && pMap3 != undefined && !prestraid) {
                debug("running map 3");
                selectMap(pMap3);
                runMap();
                repMap3 = pMap3;
                pMap3 = undefined;
            }
            if (game.global.preMapsActive && !game.global.mapsActive && mapbought4 && pMap4 != undefined && !prestraid) {
                debug("running map 4");
                selectMap(pMap4);
                runMap();
                repMap4 = pMap4;
                pMap4 = undefined;
            }
            if (game.global.preMapsActive && !game.global.mapsActive && mapbought5 && pMap5 != undefined && !prestraid) {
                debug("running map 5");
                selectMap(pMap5);
                runMap();
                repMap5 = pMap5;
                pMap5 = undefined;
            }
            if (!prestraid && !game.global.repeatMap) {
                repeatClicked();
            }
        }
    }
    if (game.global.preMapsActive && (mapbought1 || mapbought2 || mapbought3 || mapbought4 || mapbought5) && pMap1 == undefined && pMap2 == undefined && pMap3 == undefined && pMap4 == undefined && pMap5 == undefined && !prestraid && !failpraid) {
        prestraid = true;
        failpraid = false;
        mapbought1 = false;
        mapbought2 = false;
        mapbought3 = false;
        mapbought4 = false;
        mapbought5 = false;
    }
    if (getPageSetting('AutoMaps') == 0 && game.global.preMapsActive && prestraid && !failpraid && prestraidon) {
        praidDone = true;
        prestraidon = false;
        if (repMap1 != undefined) {
            recycleMap(getMapIndex(repMap1));
            repMap1 = undefined;
        }
        if (repMap2 != undefined) {
            recycleMap(getMapIndex(repMap2));
            repMap2 = undefined;
        }
        if (repMap3 != undefined) {
            recycleMap(getMapIndex(repMap3));
            repMap3 = undefined;
        }
        if (repMap4 != undefined) {
            recycleMap(getMapIndex(repMap4));
            repMap4 = undefined;
        }
        if (repMap5 != undefined) {
            recycleMap(getMapIndex(repMap5));
            repMap5 = undefined;
        }
        autoTrimpSettings["AutoMaps"].value = 1;
        game.options.menu.repeatUntil.enabled = 0;
        pMap1 = undefined;
        pMap2 = undefined;
        pMap3 = undefined;
        pMap4 = undefined;
        pMap5 = undefined;
        debug("Prestige raiding successful!");
        debug("Turning AutoMaps back on");
    }
    if (getPageSetting('Praidingzone').every(isBelowThreshold)) {
        prestraid = false;
        failpraid = false;
        prestraidon = false;
        mapbought1 = false;
        mapbought2 = false;
        mapbought3 = false;
        mapbought4 = false;
        mapbought5 = false;
        pMap1 = undefined;
        pMap2 = undefined;
        pMap3 = undefined;
        pMap4 = undefined;
        pMap5 = undefined;
        repMap1 = undefined;
        repMap2 = undefined;
        repMap3 = undefined;
        repMap4 = undefined;
        repMap5 = undefined;
        praidDone = false;
    }
}

function PraidHarder() {
    var maxPlusZones;
    var mapModifiers = ["p", "fa", "0"];
    var farmFragments;
    var praidBeforeFarm;
    var pRaidIndex;
    var maxPraidZSetting;
    var cell;

    // Determine whether to use daily or normal run settings
    if (game.global.challengeActive == "Daily") {
        praidSetting = 'dPraidingzone';
        maxPraidZSetting = 'dMaxPraidZone';
        farmFragments = getPageSetting('dPraidFarmFragsZ').includes(game.global.world);
        praidBeforeFarm = getPageSetting('dPraidBeforeFarmZ').includes(game.global.world);
        cell = ((getPageSetting('dPraidingcell') > 0) ? getPageSetting('dPraidingcell') : 0);
    } else {
        praidSetting = 'Praidingzone';
        maxPraidZSetting = 'MaxPraidZone';
        farmFragments = getPageSetting('PraidFarmFragsZ').includes(game.global.world);
        praidBeforeFarm = getPageSetting('PraidBeforeFarmZ').includes(game.global.world);
        cell = ((getPageSetting('Praidingcell') > 0) ? getPageSetting('Praidingcell') : 0);
    }

    pRaidIndex = getPageSetting(praidSetting).indexOf(game.global.world);
    if (pRaidIndex == -1 || typeof(getPageSetting(maxPraidZSetting)[pRaidIndex]) === "undefined") maxPlusZones = plusMapToRun(game.global.world);
    else maxPlusZones = getPageSetting(maxPraidZSetting)[pRaidIndex] - game.global.world;

    // Check we have a valid number for maxPlusZones
    maxPlusZones = maxPlusZones > 10 ? 10 : (maxPlusZones < 0 ? 10 : maxPlusZones);

    // Work out the max number of +map zones it's worth farming for prestige.
    if ((game.global.world + maxPlusZones) % 10 > 5)
        maxPlusZones = Math.max(maxPlusZones + (5 - (game.global.world + maxPlusZones) % 10), 0);
    else if ((game.global.world + maxPlusZones) % 10 == 0)
        maxPlusZones = Math.min(5, maxPlusZones);

    // If we have any Praiding zones defined...
    if (getPageSetting(praidSetting).length) {
        if (getPageSetting(praidSetting).includes(game.global.world) && ((game.global.lastClearedCell + 1) >= cell) && !prestraid && !failpraid && !shouldFarmFrags) {
            debug('Beginning Praiding');
            // Initialise shouldFarmFrags to false
            shouldFarmFrags = false;
            // Mark that we are prestige raiding and turn off automaps to stop it interfering
            prestraidon = true;
            autoTrimpSettings["AutoMaps"].value = 0;
            // Get into the preMaps screen
            if (!game.global.preMapsActive && !game.global.mapsActive) {
                mapsClicked();
                if (!game.global.preMapsActive) {
                    mapsClicked();
                }
            }
            // Set repeat for items
            game.options.menu.repeatUntil.enabled = 2;
            toggleSetting("repeatUntil", null, false, true);
            // if we can farm for fragments, work out the minimum number we need to get all available prestiges
            if (farmFragments) {
                plusPres();
                document.getElementById('advExtraLevelSelect').value = maxPlusZones;
                document.getElementById('sizeAdvMapsRange').value = 0;
                document.getElementById('difficultyAdvMapsRange').value = 0;
                document.getElementById('advSpecialSelect').value = "0";
                minMaxMapCost = updateMapCost(true);
                // If we are not Praiding before farming, and cannot afford a max plus map, set flags for farming
                if (!praidBeforeFarm && game.resources.fragments.owned < minMaxMapCost) {
                    prestraid = true;
                    failpraid = false;
                    shouldFarmFrags = true;
                }
            }
            // Set map settings to the best map for Praiding (even if we can't afford it)
            plusPres();
            document.getElementById('advExtraLevelSelect').value = maxPlusZones;
            // Iterate down through plusMaps setting until we find one we can afford
            for (var curPlusZones = maxPlusZones; curPlusZones >= 0; curPlusZones--) {
                // If the current targeted zone has no prestiges, decrement the number of plusZones and continue
                if ((game.global.world + curPlusZones) % 10 == 0 || (game.global.world + curPlusZones) % 10 > 5) continue;
                // Otherwise check to see if we can afford a map at the current plusZones setting
                document.getElementById('advExtraLevelSelect').value = curPlusZones;
                // If we find a map we can afford, break out of the loop
                if (relaxMapReqs(mapModifiers)) break;
                // conserve fragments if going to farm after by selecting only maps with no special modifier
                else if (farmFragments) mapModifiers = ["0"];
            }
            // If the map is not at the highest level with prestiges possible, set shouldFarmFrags to true
            if (maxPlusZones > curPlusZones) shouldFarmFrags = true;

            // If we found a suitable map...
            if (curPlusZones >= 0 && (praidBeforeFarm || shouldFarmFrags == false)) {
                // ...buy it
                buyMap();
                pMap = game.global.mapsOwnedArray[game.global.mapsOwnedArray.length - 1].id;
                selectMap(pMap);
                // Set flags to avoid rerunning this step
                prestraid = true;
                // prestraidon = false;
                failpraid = false;
                // Set repeat on and run the map
                game.global.repeatMap = true;
                runMap();
                repeatClicked(true);
            }
            // If we can't afford a map, and can't farm fragments, fail and turn automaps back on
            else if (!farmFragments) {
                failpraid = true;
                prestraidon = false;
                praidDone = true;
                debug("Failed to prestige raid. Looks like you can't afford to.");
            } else {
                debug("Turning AutoMaps back on");
                autoTrimpSettings['AutoMaps'].value = 1;
                game.options.menu.repeatUntil.enabled = 0;
            }
            return;
        }
    }
    if (farmFragments && shouldFarmFrags && game.global.preMapsActive && prestraid && !fMap) {
        if (pMap) recycleMap(getMapIndex(pMap));
        pMap = null;
        // Choose a fragment farming map
        document.getElementById("biomeAdvMapsSelect").value = "Depths";
        document.getElementById('advExtraLevelSelect').value = 0;
        document.getElementById('advSpecialSelect').value = "fa";
        document.getElementById("lootAdvMapsRange").value = 9;
        document.getElementById("difficultyAdvMapsRange").value = 9;
        document.getElementById("sizeAdvMapsRange").value = 9;
        document.getElementById('advPerfectCheckbox').checked = true;
        document.getElementById("mapLevelInput").value = game.global.world - 1;
        game.options.menu.repeatUntil.enabled = 0;
        toggleSetting("repeatUntil", null, false, true);
        if (updateMapCost(true) <= game.resources.fragments.owned) {
            debug("Buying perfect sliders fragment farming map");
            buyMap();
            fMap = game.global.mapsOwnedArray[game.global.mapsOwnedArray.length - 1].id;
            selectMap(fMap);
            game.global.repeatMap = true;
            runMap();
            repeatClicked(true);
        } else {
            document.getElementById('advPerfectCheckbox').checked = false;
            if (updateMapCost(true) <= game.resources.fragments.owned) {
                debug("Buying imperfect sliders fragment farming map");
                buyMap();
                fMap = game.global.mapsOwnedArray[game.global.mapsOwnedArray.length - 1].id;
                selectMap(fMap);
                game.global.repeatMap = true;
                runMap();
                repeatClicked(true);
            }
            // if we can't buy a map, wait until the next main loop iteration and try again
            else debug("Can't afford fragment farming map yet");
        }
    }

    if ((game.global.mapsActive || game.global.preMapsActive) && minMaxMapCost <= game.resources.fragments.owned && shouldFarmFrags) {
        game.global.repeatMap = false;
        repeatClicked(true);
        if (game.global.preMapsActive) {
            minMaxMapCost = null;
            shouldFarmFrags = false;
            prestraid = false;
            failpraid = false;
        }
    }
    if (game.global.preMapsActive && prestraid && !failpraid && !shouldFarmFrags && prestraidon) {
        prestraidon = false;
        praidDone = true;
        debug("Prestige raiding successful! - recycling Praid map");
        if (pMap) recycleMap(getMapIndex(pMap));
        if (fMap) recycleMap(getMapIndex(fMap));
        pMap = null;
        fMap = null;
        debug("Turning AutoMaps back on");
        game.options.menu.repeatUntil.enabled = 0;
        autoTrimpSettings['AutoMaps'].value = 1;
    }

    if (!getPageSetting(praidSetting).includes(game.global.world)) {
        prestraid = false;
        failpraid = false;
        prestraidon = false;
        shouldFarmFrags = false;
        praidDone = false;
    }
}

function relaxMapReqs(mapModifiers) {
    for (var j = 0; j < mapModifiers.length; j++) {
        document.getElementById('sizeAdvMapsRange').value = 9;
        document.getElementById('advSpecialSelect').value = mapModifiers[j];
        for (var i = 9; i >= 0; i--) {
            document.getElementById('difficultyAdvMapsRange').value = i;
            if (updateMapCost(true) <= game.resources.fragments.owned) return true;
        }
        for (i = 9; i >= 0; i--) {
            document.getElementById('sizeAdvMapsRange').value = i;
            if (updateMapCost(true) <= game.resources.fragments.owned) return true;
        }
    }
    return false;
}

function BWraiding() {
    var bwraidZ;
    var bwraidSetting;
    var bwraidMax;
    var isBWRaidZ;
    var targetBW;
    var bwIndex;
    var cell;

    if (game.global.challengeActive == "Daily") {
        bwraidZ = 'dBWraidingz';
        bwraidSetting = 'Dailybwraid';
        bwraidMax = 'dBWraidingmax';
        cell = ((getPageSetting('dbwraidcell') > 0) ? getPageSetting('dbwraidcell') : 1);
    } else {
        bwraidZ = 'BWraidingz';
        bwraidSetting = 'BWraid';
        bwraidMax = 'BWraidingmax';
        cell = ((getPageSetting('bwraidcell') > 0) ? getPageSetting('bwraidcell') : 1);
    }

    isBWRaidZ = getPageSetting(bwraidZ).includes(game.global.world) && ((game.global.lastClearedCell + 1) >= cell);
    bwIndex = getPageSetting(bwraidZ).indexOf(game.global.world);
    if (bwIndex == -1 || typeof(getPageSetting(bwraidMax)[bwIndex]) === "undefined") targetBW = -1;
    else targetBW = getPageSetting(bwraidMax)[bwIndex];

    if (isBWRaidZ && !bwraided && !failbwraid && getPageSetting(bwraidSetting)) {
        if (getPageSetting('AutoMaps') == 1 && !bwraided && !failbwraid) {
            autoTrimpSettings["AutoMaps"].value = 0;
        }
        
        game.options.menu.climbBw.enabled = 0;

        while (!game.global.preMapsActive && !bwraidon) mapsClicked();

        if (game.options.menu.repeatUntil.enabled != 2 && !bwraided && !failbwraid) {
            game.options.menu.repeatUntil.enabled = 2;
        }

        if (game.global.preMapsActive && !bwraided && !failbwraid && findLastBionic()) {
            selectMap(findLastBionic().id);
            failbwraid = false;
            debug("Beginning BW Raiding...");
        } else if (game.global.preMapsActive && !bwraided && !failbwraid) {
            if (getPageSetting('AutoMaps') == 0 && isBWRaidZ && !bwraided) {
                autoTrimpSettings["AutoMaps"].value = 1;
                failbwraid = true;
                debug("Failed to BW raid. Looks like you don't have a BW to raid...");
            }
        }

        if (findLastBionic().level <= targetBW && !bwraided && !failbwraid && game.global.preMapsActive) {
            runMap();
            bwraidon = true;
        }

        if (!game.global.repeatMap && !bwraided && !failbwraid && game.global.mapsActive) {
            repeatClicked();
        }

        if (findLastBionic().level > targetBW && !bwraided && !failbwraid) {
            bwraided = true;
            failbwraid = false;
            bwraidon = false;
            debug("...Successfully BW raided!");
        }
    }

    if (getPageSetting('AutoMaps') == 0 && game.global.preMapsActive && bwraided && !failbwraid) {
        autoTrimpSettings["AutoMaps"].value = 1;
        debug("Turning AutoMaps back on");
    }

    if (!isBWRaidZ) {
        bwraided = false;
        failbwraid = false;
        bwraidon = false;
    }
}

var dpMap1 = undefined;
var dpMap2 = undefined;
var dpMap3 = undefined;
var dpMap4 = undefined;
var dpMap5 = undefined;
var drepMap1 = undefined;
var drepMap2 = undefined;
var drepMap3 = undefined;
var drepMap4 = undefined;
var drepMap5 = undefined;
var dmapbought1 = false;
var dmapbought2 = false;
var dmapbought3 = false;
var dmapbought4 = false;
var dmapbought5 = false;
var dpraidDone = false;

function dailyPraiding() {
    var cell;
    cell = ((getPageSetting('dPraidingcell') > 0) ? getPageSetting('dPraidingcell') : 0);
    if (getPageSetting('dPraidingzone').length) {
        if (getPageSetting('dPraidingzone').includes(game.global.world) && ((cell <= 1) || (cell > 1 && (game.global.lastClearedCell + 1) >= cell)) && !dprestraid && !dfailpraid) {
            dprestraidon = true;
            if (getPageSetting('AutoMaps') == 1 && !dprestraid && !dfailpraid) {
                autoTrimpSettings["AutoMaps"].value = 0;
            }
            if (!game.global.preMapsActive && !game.global.mapsActive && !dprestraid) {
                mapsClicked();
                if (!game.global.preMapsActive) {
                    mapsClicked();
                }
                debug("Beginning Prestige Raiding...");
            }
            if (game.options.menu.repeatUntil.enabled != 2 && !dprestraid) {
                game.options.menu.repeatUntil.enabled = 2;
            }
            if (game.global.preMapsActive && !game.global.mapsActive && !dprestraid) {
                debug("Map Loop");
                if (pcheckmap5() == true && pcheck5() == true && dpMap5 == undefined && !dmapbought5 && game.global.preMapsActive && !dprestraid) {
                    debug("Check complete for 5th map");
                    plusPres5();
                    if ((updateMapCost(true) <= game.resources.fragments.owned)) {
                        buyMap();
                        dmapbought5 = true;
                        if (dmapbought5) {
                            dpMap5 = game.global.mapsOwnedArray[game.global.mapsOwnedArray.length - 1].id;
                            debug("5th map bought");
                        }
                    }
                }
                if (pcheckmap4() == true && pcheck4() == true && dpMap4 == undefined && !dmapbought4 && game.global.preMapsActive && !dprestraid) {
                    debug("Check complete for 4th map");
                    plusPres4();
                    if ((updateMapCost(true) <= game.resources.fragments.owned)) {
                        buyMap();
                        dmapbought4 = true;
                        if (dmapbought4) {
                            dpMap4 = game.global.mapsOwnedArray[game.global.mapsOwnedArray.length - 1].id;
                            debug("4th map bought");
                        }
                    }
                }
                if (pcheckmap3() == true && pcheck3() == true && dpMap3 == undefined && !dmapbought3 && game.global.preMapsActive && !dprestraid) {
                    debug("Check complete for 3rd map");
                    plusPres3();
                    if ((updateMapCost(true) <= game.resources.fragments.owned)) {
                        buyMap();
                        dmapbought3 = true;
                        if (dmapbought3) {
                            dpMap3 = game.global.mapsOwnedArray[game.global.mapsOwnedArray.length - 1].id;
                            debug("3rd map bought");
                        }
                    }
                }
                if (pcheckmap2() == true && pcheck2() == true && dpMap2 == undefined && !dmapbought2 && game.global.preMapsActive && !dprestraid) {
                    debug("Check complete for 2nd map");
                    plusPres2();
                    if ((updateMapCost(true) <= game.resources.fragments.owned)) {
                        buyMap();
                        dmapbought2 = true;
                        if (dmapbought2) {
                            dpMap2 = game.global.mapsOwnedArray[game.global.mapsOwnedArray.length - 1].id;
                            debug("2nd map bought");
                        }
                    }
                }
                if (pcheckmap1() == true && pcheck1() == true && dpMap1 == undefined && !dmapbought1 && game.global.preMapsActive && !dprestraid) {
                    debug("Check complete for 1st map");
                    plusPres1();
                    if ((updateMapCost(true) <= game.resources.fragments.owned)) {
                        buyMap();
                        dmapbought1 = true;
                        if (dmapbought1) {
                            dpMap1 = game.global.mapsOwnedArray[game.global.mapsOwnedArray.length - 1].id;
                            debug("1st map bought");
                        }
                    }
                }
                if (!dmapbought1 && !dmapbought2 && !dmapbought3 && !dmapbought4 && !dmapbought5) {
                    if (getPageSetting('AutoMaps') == 0 && !dprestraid) {
                        autoTrimpSettings["AutoMaps"].value = 1;
                        game.options.menu.repeatUntil.enabled = 0;
                        dprestraidon = false;
                        dfailpraid = true;
                        dpraidDone = true;
                        dpMap1 = undefined;
                        dpMap2 = undefined;
                        dpMap3 = undefined;
                        dpMap4 = undefined;
                        dpMap5 = undefined;
                        debug("Failed to Prestige Raid. Looks like you can't afford to or you are too weak or you have limited yourself in a P/I zone. ");
                    }
                    return;
                }
            }
            if (game.global.preMapsActive && !game.global.mapsActive && dmapbought1 && dpMap1 != undefined && !dprestraid) {
                debug("running map 1");
                selectMap(dpMap1);
                runMap();
                drepMap1 = dpMap1;
                dpMap1 = undefined;
            }
            if (game.global.preMapsActive && !game.global.mapsActive && dmapbought2 && dpMap2 != undefined && !dprestraid) {
                debug("running map 2");
                selectMap(dpMap2);
                runMap();
                drepMap2 = dpMap2;
                dpMap2 = undefined;
            }
            if (game.global.preMapsActive && !game.global.mapsActive && dmapbought3 && dpMap3 != undefined && !dprestraid) {
                debug("running map 3");
                selectMap(dpMap3);
                runMap();
                drepMap3 = dpMap3;
                dpMap3 = undefined;
            }
            if (game.global.preMapsActive && !game.global.mapsActive && dmapbought4 && dpMap4 != undefined && !dprestraid) {
                debug("running map 4");
                selectMap(dpMap4);
                runMap();
                drepMap4 = dpMap4;
                dpMap4 = undefined;
            }
            if (game.global.preMapsActive && !game.global.mapsActive && dmapbought5 && dpMap5 != undefined && !dprestraid) {
                debug("running map 5");
                selectMap(dpMap5);
                runMap();
                drepMap5 = dpMap5;
                dpMap5 = undefined;
            }
            if (!dprestraid && !game.global.repeatMap) {
                repeatClicked();
            }
        }
    }
    if (game.global.preMapsActive && (dmapbought1 || dmapbought2 || dmapbought3 || dmapbought4 || dmapbought5) && pMap1 == undefined && dpMap2 == undefined && dpMap3 == undefined && dpMap4 == undefined && dpMap5 == undefined && !dprestraid && !dfailpraid) {
        dprestraid = true;
        dfailpraid = false;
        dmapbought1 = false;
        dmapbought2 = false;
        dmapbought3 = false;
        dmapbought4 = false;
        dmapbought5 = false;
    }
    if (getPageSetting('AutoMaps') == 0 && game.global.preMapsActive && dprestraid && !dfailpraid && dprestraidon) {
        dpraidDone = true;
        dprestraidon = false;
        if (drepMap1 != undefined) {
            recycleMap(getMapIndex(drepMap1));
            drepMap1 = undefined;
        }
        if (drepMap2 != undefined) {
            recycleMap(getMapIndex(drepMap2));
            drepMap2 = undefined;
        }
        if (drepMap3 != undefined) {
            recycleMap(getMapIndex(drepMap3));
            drepMap3 = undefined;
        }
        if (drepMap4 != undefined) {
            recycleMap(getMapIndex(drepMap4));
            drepMap4 = undefined;
        }
        if (drepMap5 != undefined) {
            recycleMap(getMapIndex(drepMap5));
            drepMap5 = undefined;
        }
        autoTrimpSettings["AutoMaps"].value = 1;
        game.options.menu.repeatUntil.enabled = 0;
        pMap1 = undefined;
        dpMap2 = undefined;
        dpMap3 = undefined;
        dpMap4 = undefined;
        dpMap5 = undefined;
        debug("Prestige raiding successful!");
        debug("Turning AutoMaps back on");
    }
    if (getPageSetting('dPraidingzone').every(isBelowThreshold)) {
        dprestraid = false;
        dfailpraid = false;
        dprestraidon = false;
        dmapbought1 = false;
        dmapbought2 = false;
        dmapbought3 = false;
        dmapbought4 = false;
        dmapbought5 = false;
        pMap1 = undefined;
        dpMap2 = undefined;
        dpMap3 = undefined;
        dpMap4 = undefined;
        dpMap5 = undefined;
        repMap1 = undefined;
        repMap2 = undefined;
        repMap3 = undefined;
        repMap4 = undefined;
        repMap5 = undefined;
        dpraidDone = false;
    }
}

function dailyBWraiding() {
    var cell;
    cell = ((getPageSetting('dbwraidcell') > 0) ? getPageSetting('dbwraidcell') : 1);
    if (!dprestraidon && game.global.world == getPageSetting('dBWraidingz') && ((game.global.lastClearedCell + 1) >= cell) && !dbwraided && !dfailbwraid && getPageSetting('Dailybwraid')) {
        if (getPageSetting('AutoMaps') == 1 && !dbwraided && !dfailbwraid) {
            autoTrimpSettings["AutoMaps"].value = 0;
        }
        if (!game.global.preMapsActive && !game.global.mapsActive && !dbwraided && !dfailbwraid) {
            mapsClicked();
            if (!game.global.preMapsActive) {
                mapsClicked();
            }
        }
        if (game.options.menu.repeatUntil.enabled != 2 && !dbwraided && !dfailbwraid) {
            game.options.menu.repeatUntil.enabled = 2;
        }
        
        game.options.menu.climbBw.enabled = 0;
        
        if (game.global.preMapsActive && !dbwraided && !dfailbwraid) {
            selectMap(findLastBionic().id);
            dfailbwraid = false;
            debug("Beginning Daily BW Raiding...");
        } else if (game.global.preMapsActive && !dbwraided && !dfailbwraid) {
            if (getPageSetting('AutoMaps') == 0 && game.global.world == getPageSetting('dBWraidingz') && !dbwraided) {
                autoTrimpSettings["AutoMaps"].value = 1;
                dfailbwraid = true;
                debug("Failed to Daily BW raid. Looks like you don't have a BW to raid...");
            }
        }
        if (findLastBionic().level <= getPageSetting('dBWraidingmax') && !dbwraided && !dfailbwraid && game.global.preMapsActive) {
            runMap();
            dbwraidon = true;
        }
        if (!game.global.repeatMap && !dbwraided && !dfailbwraid && game.global.mapsActive) {
            repeatClicked();
        }
        if (findLastBionic().level > getPageSetting('dBWraidingmax') && !dbwraided && !dfailbwraid) {
            dbwraided = true;
            dfailbwraid = false;
            dbwraidon = false;
            debug("...Successfully Daily BW raided!");
        }
        if (getPageSetting('AutoMaps') == 0 && game.global.preMapsActive && game.global.world == getPageSetting('dBWraidingz') && dbwraided && !dfailbwraid) {
            autoTrimpSettings["AutoMaps"].value = 1;
            debug("Turning AutoMaps back on");
        }
    }
    if (getPageSetting('AutoMaps') == 0 && game.global.preMapsActive && dbwraided && !dfailbwraid) {
        autoTrimpSettings["AutoMaps"].value = 1;
        debug("Turning AutoMaps back on");
    }
    if (dbwraided && !dfailbwraid && game.global.world !== getPageSetting('dBWraidingz')) {
        dbwraided = false;
        dfailbwraid = false;
        dbwraidon = false;
    }
}

function trimpcide() {
    if (game.portal.Anticipation.level > 0) {
        var antistacklimit = (game.talents.patience.purchased) ? 45 : 30;
        if (game.global.fighting && ((game.jobs.Amalgamator.owned > 0) ? Math.floor((new Date().getTime() - game.global.lastSoldierSentAt) / 1000) : Math.floor(game.global.lastBreedTime / 1000)) >= antistacklimit && (game.global.antiStacks < antistacklimit || antistacklimit == 0 && game.global.antiStacks >= 1) && !game.global.spireActive)
            forceAbandonTrimps();
        if (game.global.fighting && ((game.jobs.Amalgamator.owned > 0) ? Math.floor((new Date().getTime() - game.global.lastSoldierSentAt) / 1000) : Math.floor(game.global.lastBreedTime / 1000)) >= antistacklimit && game.global.antiStacks < antistacklimit && game.global.mapsActive) {
            if (getCurrentMapObject().location == "Void") {
                abandonVoidMap();
            }
        }
    }
}

function avoidempower() {
    if (armydeath()) {
        if (typeof game.global.dailyChallenge.bogged === 'undefined' && typeof game.global.dailyChallenge.plague === 'undefined') {
            mapsClicked(true);
            return;
        }
    }
}

var spirebreeding = false;

function ATspirebreed() {
    if (!spirebreeding && getPageSetting('SpireBreedTimer') > 0 && getPageSetting('IgnoreSpiresUntil') <= game.global.world && game.global.spireActive)
        var prespiretimer = game.global.GeneticistassistSetting;
    if (getPageSetting('SpireBreedTimer') > 0 && getPageSetting('IgnoreSpiresUntil') <= game.global.world && game.global.spireActive && game.global.GeneticistassistSetting != getPageSetting('SpireBreedTimer')) {
        spirebreeding = true;
        if (game.global.GeneticistassistSetting != getPageSetting('SpireBreedTimer'))
            game.global.GeneticistassistSetting = getPageSetting('SpireBreedTimer');
    }
    if (getPageSetting('SpireBreedTimer') > 0 && getPageSetting('IgnoreSpiresUntil') <= game.global.world && !game.global.spireActive && game.global.GeneticistassistSetting == getPageSetting('SpireBreedTimer')) {
        spirebreeding = false;
        if (game.global.GeneticistassistSetting == getPageSetting('SpireBreedTimer')) {
            game.global.GeneticistassistSetting = prespiretimer;
            toggleGeneticistassist();
            toggleGeneticistassist();
            toggleGeneticistassist();
            toggleGeneticistassist();
        }
    }
}

function fightalways() {
    if (game.global.gridArray.length === 0 || game.global.preMapsActive || !game.upgrades.Battle.done || game.global.fighting || (game.global.spireActive && game.global.world >= getPageSetting('IgnoreSpiresUntil')))
        return;
    if (!game.global.fighting)
        fightManual();
}

function armourmagic() {
    var armourmagicworld = Math.floor((game.global.highestLevelCleared + 1) * 0.8);
    if (((getPageSetting('carmourmagic') == 1 || getPageSetting('darmourmagic') == 1) && game.global.world >= armourmagicworld && (game.global.soldierHealth <= game.global.soldierHealthMax * 0.4)) || ((getPageSetting('carmourmagic') == 2 || getPageSetting('darmourmagic') == 2) && calcHDratio() >= MODULES["maps"].enoughDamageCutoff && (game.global.soldierHealth <= game.global.soldierHealthMax * 0.4)) || ((getPageSetting('carmourmagic') == 3 || getPageSetting('darmourmagic') == 3) && (game.global.soldierHealth <= game.global.soldierHealthMax * 0.4)))
        buyArms();
}

trapIndexs = ["", "Fire", "Frost", "Poison", "Lightning", "Strength", "Condenser", "Knowledge"];

function tdStringCode2() {
    var thestring = document.getElementById('importBox').value.replace(/\s/g, '');
    var s = new String(thestring);
    var index = s.indexOf("+", 0);
    s = s.slice(0, index);
    var length = s.length;

    var saveLayout = [];
    for (var i = 0; i < length; i++) {
        saveLayout.push(trapIndexs[s.charAt(i)]);
    }
    playerSpire['savedLayout' + -1] = saveLayout;

    if ((playerSpire.runestones + playerSpire.getCurrentLayoutPrice()) < playerSpire.getSavedLayoutPrice(-1)) return false;
    playerSpire.resetTraps();
    for (var x = 0; x < saveLayout.length; x++) {
        if (!saveLayout[x]) continue;
        playerSpire.buildTrap(x, saveLayout[x]);
    }
}

var oldPlayerSpireDrawInfo = playerSpire.drawInfo;
playerSpire.drawInfo = function(arguments) {
    var ret = oldPlayerSpireDrawInfo.apply(this, arguments);
    var elem = document.getElementById('spireTrapsWindow');
    if (!elem) return arguments;
    var importBtn = "<div onclick='ImportExportTooltip(\"spireImport\")' class='spireControlBox'>Import</div>";
    elem.innerHTML = importBtn + elem.innerHTML;
    return arguments;
}

//Radon
function RbuyWeps() {
    if (!((getPageSetting('RBuyWeaponsNew') == 1) || (getPageSetting('RBuyWeaponsNew') == 3))) return;
    preBuy(), game.global.buyAmt = getPageSetting('Rgearamounttobuy'), game.equipment.Dagger.level < getPageSetting('RCapEquip2') && canAffordBuilding('Dagger', null, null, !0) && buyEquipment('Dagger', !0, !0), game.equipment.Mace.level < getPageSetting('RCapEquip2') && canAffordBuilding('Mace', null, null, !0) && buyEquipment('Mace', !0, !0), game.equipment.Polearm.level < getPageSetting('RCapEquip2') && canAffordBuilding('Polearm', null, null, !0) && buyEquipment('Polearm', !0, !0), game.equipment.Battleaxe.level < getPageSetting('RCapEquip2') && canAffordBuilding('Battleaxe', null, null, !0) && buyEquipment('Battleaxe', !0, !0), game.equipment.Greatsword.level < getPageSetting('RCapEquip2') && canAffordBuilding('Greatsword', null, null, !0) && buyEquipment('Greatsword', !0, !0), !game.equipment.Arbalest.locked && game.equipment.Arbalest.level < getPageSetting('RCapEquip2') && canAffordBuilding('Arbalest', null, null, !0) && buyEquipment('Arbalest', !0, !0), postBuy()
}

function RbuyArms() {
    if (!((getPageSetting('RBuyArmourNew') == 1) || (getPageSetting('RBuyArmourNew') == 3))) return;
    preBuy(), game.global.buyAmt = 10, game.equipment.Shield.level < getPageSetting('RCapEquiparm') && canAffordBuilding('Shield', null, null, !0) && buyEquipment('Shield', !0, !0), game.equipment.Boots.level < getPageSetting('RCapEquiparm') && canAffordBuilding('Boots', null, null, !0) && buyEquipment('Boots', !0, !0), game.equipment.Helmet.level < getPageSetting('RCapEquiparm') && canAffordBuilding('Helmet', null, null, !0) && buyEquipment('Helmet', !0, !0), game.equipment.Pants.level < getPageSetting('RCapEquiparm') && canAffordBuilding('Pants', null, null, !0) && buyEquipment('Pants', !0, !0), game.equipment.Shoulderguards.level < getPageSetting('RCapEquiparm') && canAffordBuilding('Shoulderguards', null, null, !0) && buyEquipment('Shoulderguards', !0, !0), game.equipment.Breastplate.level < getPageSetting('RCapEquiparm') && canAffordBuilding('Breastplate', null, null, !0) && buyEquipment('Breastplate', !0, !0), !game.equipment.Gambeson.locked && game.equipment.Gambeson.level < getPageSetting('RCapEquiparm') && canAffordBuilding('Gambeson', null, null, !0) && buyEquipment('Gambeson', !0, !0), postBuy()
}

function Rhelptrimpsnotdie() {
    if (!game.global.preMapsActive && !game.global.fighting) RbuyArms();
}

var Rprestraid = !1,
    Rdprestraid = !1,
    Rfailpraid = !1,
    Rdfailpraid = !1,
    Rbwraided = !1,
    Rdbwraided = !1,
    Rfailbwraid = !1,
    Rdfailbwraid = !1,
    Rprestraidon = !1,
    Rdprestraidon = !1,
    Rmapbought = !1,
    Rdmapbought = !1,
    Rbwraidon = !1,
    Rdbwraidon = !1,
    Rpresteps = null,
    RminMaxMapCost, RfMap, RpMap, RshouldFarmFrags = !1,
    RpraidDone = !1;

function Rfightalways() {
    if (game.global.gridArray.length === 0 || game.global.preMapsActive || !game.upgrades.Battle.done || game.global.fighting)
        return;
    if (!game.global.fighting)
        fightManual();
}

function Rarmourmagic() {
    var armourmagicworld = Math.floor((game.global.highestLevelCleared + 1) * 0.8);
    if (((getPageSetting('Rcarmourmagic') == 1 || getPageSetting('Rdarmourmagic') == 1) && game.global.world >= armourmagicworld && (game.global.soldierHealth <= game.global.soldierHealthMax * 0.4)) || ((getPageSetting('Rcarmourmagic') == 2 || getPageSetting('Rdarmourmagic') == 2) && RcalcHDratio() >= MODULES["maps"].RenoughDamageCutoff && (game.global.soldierHealth <= game.global.soldierHealthMax * 0.4)) || ((getPageSetting('Rcarmourmagic') == 3 || getPageSetting('Rdarmourmagic') == 3) && (game.global.soldierHealth <= game.global.soldierHealthMax * 0.4)))
        RbuyArms();
}

function questcheck() {
    if (game.global.world < game.challenges.Quest.getQuestStartZone()) {
        return 0;
    }
    //x5 resource
    if (game.challenges.Quest.getQuestDescription() == "Quintuple (x5) your food" && game.challenges.Quest.getQuestProgress() != "Quest Complete!" && game.challenges.Quest.getQuestProgress() != "Failed!")
        return 10;
    else if (game.challenges.Quest.getQuestDescription() == "Quintuple (x5) your wood" && game.challenges.Quest.getQuestProgress() != "Quest Complete!" && game.challenges.Quest.getQuestProgress() != "Failed!")
        return 11;
    else if (game.challenges.Quest.getQuestDescription() == "Quintuple (x5) your metal" && game.challenges.Quest.getQuestProgress() != "Quest Complete!" && game.challenges.Quest.getQuestProgress() != "Failed!")
        return 12;
    else if (game.challenges.Quest.getQuestDescription() == "Quintuple (x5) your gems" && game.challenges.Quest.getQuestProgress() != "Quest Complete!" && game.challenges.Quest.getQuestProgress() != "Failed!")
        return 13;
    else if (game.challenges.Quest.getQuestDescription() == "Quintuple (x5) your science" && game.challenges.Quest.getQuestProgress() != "Quest Complete!" && game.challenges.Quest.getQuestProgress() != "Failed!")
        return 14;
    //x2 resource
    else if (game.challenges.Quest.getQuestDescription() == "Double your food" && game.challenges.Quest.getQuestProgress() != "Quest Complete!" && game.challenges.Quest.getQuestProgress() != "Failed!")
        return 20;
    else if (game.challenges.Quest.getQuestDescription() == "Double your wood" && game.challenges.Quest.getQuestProgress() != "Quest Complete!" && game.challenges.Quest.getQuestProgress() != "Failed!")
        return 21;
    else if (game.challenges.Quest.getQuestDescription() == "Double your metal" && game.challenges.Quest.getQuestProgress() != "Quest Complete!" && game.challenges.Quest.getQuestProgress() != "Failed!")
        return 22;
    else if (game.challenges.Quest.getQuestDescription() == "Double your gems" && game.challenges.Quest.getQuestProgress() != "Quest Complete!" && game.challenges.Quest.getQuestProgress() != "Failed!")
        return 23;
    else if (game.challenges.Quest.getQuestDescription() == "Double your science" && game.challenges.Quest.getQuestProgress() != "Quest Complete!" && game.challenges.Quest.getQuestProgress() != "Failed!")
        return 24;
    //Everything else
    else if (game.challenges.Quest.getQuestDescription() == "Complete 5 Maps at Zone level" && game.challenges.Quest.getQuestProgress() != "Quest Complete!" && game.challenges.Quest.getQuestProgress() != "Failed!")
        return 3;
    else if (game.challenges.Quest.getQuestDescription() == "One-shot 5 world enemies" && game.challenges.Quest.getQuestProgress() != "Quest Complete!" && game.challenges.Quest.getQuestProgress() != "Failed!")
        return 4;
    else if (game.challenges.Quest.getQuestDescription() == "Don't let your shield break before Cell 100" && game.challenges.Quest.getQuestProgress() != "Quest Complete!" && game.challenges.Quest.getQuestProgress() != "Failed!")
        return 5;
    else if (game.challenges.Quest.getQuestDescription() == "Don't run a map before Cell 100" && game.challenges.Quest.getQuestProgress() != "Quest Complete!" && game.challenges.Quest.getQuestProgress() != "Failed!")
        return 6;
    else if (game.challenges.Quest.getQuestDescription() == "Buy a Smithy" && game.challenges.Quest.getQuestProgress() != "Quest Complete!" && game.challenges.Quest.getQuestProgress() != "Failed!")
        return 7;
    else
        return 0;
}

function Rgetequipcost(equip, resource, amt) {
    var cost = Math.ceil(getBuildingItemPrice(game.equipment[equip], resource, true, amt) * (Math.pow(amt - game.portal.Artisanistry.modifier, game.portal.Artisanistry.radLevel)));
    return cost;
}

//smithylogic('Shield', 'wood', true)
function smithylogic(name, resource, equip) {

    var go = true;

    //Checks

    if (getPageSetting('Rsmithylogic') == false || getPageSetting('Rsmithynumber') <= 0 || getPageSetting('Rsmithypercent') <= 0 || getPageSetting('Rsmithyseconds') <= 0) {
        return go;
    }
    if (getPageSetting('Rsmithynumber') > 0 && getPageSetting('Rsmithynumber') >= game.buildings.Smithy.owned) {
        return go;
    }
    if (name == undefined) {
        return go;
    }

    //Vars

    var amt = (getPageSetting('Rgearamounttobuy') > 0) ? getPageSetting('Rgearamounttobuy') : 1;
    var percent = (getPageSetting('Rsmithypercent') / 100);
    var seconds = getPageSetting('Rsmithyseconds');
    var resourcesecwood = getPsString("wood", true);
    var resourcesecmetal = getPsString("metal", true);
    var resourcesecgems = getPsString("gems", true);
    var smithywood = getBuildingItemPrice(game.buildings.Smithy, "wood", false, 1);
    var smithymetal = getBuildingItemPrice(game.buildings.Smithy, "metal", false, 1);
    var smithygems = getBuildingItemPrice(game.buildings.Smithy, "gems", false, 1);
    var smithypercentwood = smithywood * percent;
    var smithypercentmetal = smithymetal * percent;
    var smithypercentgems = smithygems * percent;
    var smithyclosewood = ((smithywood / resourcesecwood) <= seconds);
    var smithyclosemetal = ((smithymetal / resourcesecmetal) <= seconds);
    var smithyclosegems = ((smithygems / resourcesecgems) <= seconds);

    var itemwood = null;
    var itemmetal = null;
    var itemgems = null;

    if (!equip) {
        if (name == "Hut") {
            itemwood = getBuildingItemPrice(game.buildings[name], "wood", false, amt);
        } else if (name == "House") {
            itemwood = getBuildingItemPrice(game.buildings[name], "wood", false, amt);
            itemmetal = getBuildingItemPrice(game.buildings[name], "metal", false, amt);
        } else if (name == "Mansion") {
            itemwood = getBuildingItemPrice(game.buildings[name], "wood", false, amt);
            itemmetal = getBuildingItemPrice(game.buildings[name], "metal", false, amt);
            itemgems = getBuildingItemPrice(game.buildings[name], "gems", false, amt);
        } else if (name == "Hotel") {
            itemwood = getBuildingItemPrice(game.buildings[name], "wood", false, amt);
            itemmetal = getBuildingItemPrice(game.buildings[name], "metal", false, amt);
            itemgems = getBuildingItemPrice(game.buildings[name], "gems", false, amt);
        } else if (name == "Resort") {
            itemwood = getBuildingItemPrice(game.buildings[name], "wood", false, amt);
            itemmetal = getBuildingItemPrice(game.buildings[name], "metal", false, amt);
            itemgems = getBuildingItemPrice(game.buildings[name], "gems", false, amt);
        } else if (name == "Gateway") {
            itemmetal = getBuildingItemPrice(game.buildings[name], "metal", false, amt);
            itemgems = getBuildingItemPrice(game.buildings[name], "gems", false, amt);
        } else if (name == "Collector") {
            itemgems = getBuildingItemPrice(game.buildings[name], "gems", false, amt);
        }
    } else if (equip && name == "Shield") {
        itemwood = Rgetequipcost("Shield", "wood", amt);
    } else if (equip && name != "Shield") {
        itemmetal = Rgetequipcost(name, resource, amt);
    }

    if (itemwood == null && itemmetal == null && itemgems == null) {
        return go;
    }
    if (!smithyclosewood && !smithyclosemetal && !smithyclosegems) {
        return go;
    } else if (smithyclosewood && itemwood > smithypercentwood && (name == "Shield" || name == "Hut" || name == "House" || name == "Mansion" || name == "Hotel" || name == "Resort")) {
        go = false;
        return go;
    } else if (smithyclosemetal && itemmetal > smithypercentmetal && ((equip && name != "Shield") || name == "House" || name == "Mansion" || name == "Hotel" || name == "Resort" || name == "Gateway")) {
        go = false;
        return go;
    } else if (smithyclosegems && itemgems > smithypercentgems && (name == "Mansion" || name == "Hotel" || name == "Resort" || name == "Gateway" || name == "Collector")) {
        go = false;
        return go;
    } else if (smithyclosewood && itemwood <= smithypercentwood && (name == "Shield" || name == "Hut" || name == "House" || name == "Mansion" || name == "Hotel" || name == "Resort")) {
        go = true;
        return go;
    } else if (smithyclosemetal && itemmetal <= smithypercentmetal && ((equip && name != "Shield") || name == "House" || name == "Mansion" || name == "Hotel" || name == "Resort" || name == "Gateway")) {
        go = true;
        return go;
    } else if (smithyclosegems && itemgems <= smithypercentgems && (name == "Mansion" || name == "Hotel" || name == "Resort" || name == "Gateway" || name == "Collector")) {
        go = true;
        return go;
    }
}

function archstring() {
    if (getPageSetting('Rarchon') == false) return;
    if (getPageSetting('Rarchstring1') != "undefined" && getPageSetting('Rarchstring2') != "undefined" && getPageSetting('Rarchstring3') != "undefined") {
        var string1 = getPageSetting('Rarchstring1'),
            string2 = getPageSetting('Rarchstring2'),
            string3 = getPageSetting('Rarchstring3');
        var string1z = string1.split(',')[0],
            string2z = string2.split(',')[0];
        var string1split = string1.split(',').slice(1).toString(),
            string2split = string2.split(',').slice(1).toString();
        if (game.global.world <= string1z && game.global.archString != string1split) {
            game.global.archString = string1split;
        }
        if (game.global.world > string1z && game.global.world <= string2z && game.global.archString != string2split) {
            game.global.archString = string2split;
        }
        if (game.global.world > string2z && game.global.archString != string3) {
            game.global.archString = string3;
        }
    }
}

var fastimps = [
    "Snimp",
    "Kittimp",
    "Gorillimp",
    "Squimp",
    "Shrimp",
    "Chickimp",
    "Frimp",
    "Slagimp",
    "Lavimp",
    "Kangarimp",
    "Entimp",
    "Fusimp",
    "Carbimp",
    "Shadimp",
    "Voidsnimp",
    "Prismimp",
    "Sweltimp",
    "Indianimp",
    "Improbability",
    "Neutrimp",
    "Cthulimp",
    "Omnipotrimp",
    "Mutimp",
    "Hulking_Mutimp",
    "Liquimp",
    "Poseidimp",
    "Darknimp",
    "Horrimp",
    "Arachnimp",
    "Beetlimp",
    "Mantimp",
    "Butterflimp",
    "Frosnimp",
    "Turkimp",
    "Ubersmith"
];

function Rmanageequality() {

    if (!(game.global.challengeActive == "Exterminate" && getPageSetting('Rexterminateon') == true && getPageSetting('Rexterminateeq') == true && !game.global.mapsActive)) {
        if (
            (game.global.challengeActive == "Glass") || 
            (fastimps.includes(getCurrentEnemy().name)) || 
            (game.global.mapsActive && getCurrentMapObject().location == "Void" && game.global.voidBuff == 'doubleAttack') || 
            (!game.global.mapsActive && game.global.gridArray[game.global.lastClearedCell+1].u2Mutation.length > 0) ||
            (game.global.mapsActive && game.global.challengeActive == "Desolation")
        ) {
            if (!game.portal.Equality.scalingActive) {
                game.portal.Equality.scalingActive = true;
                manageEqualityStacks();
                updateEqualityScaling();
            }
        } else {
            if (game.portal.Equality.scalingActive) {
                game.portal.Equality.scalingActive = false;
                game.portal.Equality.disabledStackCount = "0";
                manageEqualityStacks();
                updateEqualityScaling();
            }
        }
    } else if (game.global.challengeActive == "Exterminate" && getPageSetting('Rexterminateon') == true && getPageSetting('Rexterminateeq') == true && !game.global.mapsActive) {
        if ((getCurrentEnemy().name == "Arachnimp" || getCurrentEnemy().name == "Beetlimp" || getCurrentEnemy().name == "Mantimp" || getCurrentEnemy().name == "Butterflimp") && !game.challenges.Exterminate.experienced) {
            if (!game.portal.Equality.scalingActive) {
                game.portal.Equality.scalingActive = true;
                manageEqualityStacks();
                updateEqualityScaling();
            }
        } else if ((getCurrentEnemy().name == "Arachnimp" || getCurrentEnemy().name == "Beetlimp" || getCurrentEnemy().name == "Mantimp" || getCurrentEnemy().name == "Butterflimp") && game.challenges.Exterminate.experienced) {
            if (game.portal.Equality.scalingActive) {
                game.portal.Equality.scalingActive = false;
                game.portal.Equality.disabledStackCount = "0";
                manageEqualityStacks();
                updateEqualityScaling();
            }
        }
    }
}

function autoshrine() {
    var universe;
    var mode = game.global.challengeActive == "Daily" ? "Daily" : "Standard";
  
    switch (game.global.universe) {
      case 1:
        universe = "Helium";
        break;
      case 2:
        universe = "Radon";
        break;
    }

    var shrineSettings = {
      Helium: {
        Standard: {
          core: "Hshrine",
          zone: "Hshrinezone",
          amount: "Hshrineamount",
          cell: "Hshrinecell",
          charge: "Hshrinecharge",
        },
        Daily: {
          core: "Hdshrine",
          zone: "Hdshrinezone",
          amount: "Hdshrineamount",
          cell: "Hdshrinecell",
          charge: "Hshrinecharge",
        },
      },
      Radon: {
        Standard: {
          core: "Rshrine",
          zone: "Rshrinezone",
          amount: "Rshrineamount",
          cell: "Rshrinecell",
          charge: "Rshrinecharge",
        },
        Daily: {
          core: "Rdshrine",
          zone: "Rdshrinezone",
          amount: "Rdshrineamount",
          cell: "Rdshrinecell",
          charge: "Rshrinecharge",
        },
      },
    };

    if (getPageSetting(shrineSettings[universe][mode].core) && game.permaBoneBonuses.boosts.charges > 0) {
      var shrinezone = getPageSetting(shrineSettings[universe][mode].zone);
        if (shrinezone.includes(game.global.world)) {
            var shrineamount = getPageSetting(shrineSettings[universe][mode].amount);
            var shrineindex = shrinezone.indexOf(game.global.world);
            var shrinecell = getPageSetting(shrineSettings[universe][mode].cell)[shrineindex];
            var shrinezones = shrineamount[shrineindex];

            shrinezones = shrinezones - autoTrimpSettings[shrineSettings[universe][mode].charge].value;

            if (game.global.lastClearedCell + 2 >= shrinecell && shrinezones > 0) {
                game.permaBoneBonuses.boosts.consume();
                autoTrimpSettings[shrineSettings[universe][mode].charge].value += 1;
            }
        }
    }
}

var old_nextWorld = nextWorld;
nextWorld = function() {
    var retVal = old_nextWorld(...arguments);
    autoTrimpSettings.Hshrinecharge.value = 0;
    autoTrimpSettings.Rshrinecharge.value = 0;
    return retVal;
}

function autoBoneChargeWhenMax() {
  // Uses bone charges when they are at max charges automatically.

  // If "Daily Only" was chosen and we're not on a daily challenge, exit.
  if (
    getPageSetting("AutoBoneChargeMax") === 2 &&
    !(game.global.challengeActive == "Daily")
  ) {
    return;
  }

  // If the option is enabled but no zone is specified, set a default value to
  // the highest zone cleared - 10% or 60 (broken planet equipment discount)
  // if the HZC value would be less than 60. Otherwise use the user value.
  const autoBoneChargeEnabled =
    getPageSetting("AutoBoneChargeMax") > 0 ? true : false;
  const autoBoneChargeZoneSet =
    getPageSetting("AutoBoneChargeMaxStartZone") > 0 ? true : false;
  const highestZoneCleared = game.global.highestLevelCleared;
  const percentOfHZC = Math.round((10 / 100) * highestZoneCleared);
  const optimalChargeZone =
    highestZoneCleared - percentOfHZC > 60
      ? highestZoneCleared - percentOfHZC
      : 60;
  const chargeZone = !autoBoneChargeZoneSet
    ? optimalChargeZone
    : autoTrimpSettings.AutoBoneChargeMaxStartZone.value;
  const boneChargesAvailable = game.permaBoneBonuses.boosts.charges;
  const currentZone = game.global.world;

  // If we have more than 10 bone charges and our current world zone is
  // greater than or equal to the charge zone set; use a bone charge.
  if (boneChargesAvailable === 10 && currentZone >= chargeZone) {
    game.permaBoneBonuses.boosts.consume();
    debug("Max bone charges reached! Used a bone charge.", "general", "*bolt");
  }
}

function Rarmydeath() {
    if (game.global.mapsActive) return false;
    var cell = game.global.lastClearedCell + 1;
    var attack = game.global.gridArray[cell].attack * dailyModifiers.empower.getMult(game.global.dailyChallenge.empower.strength, game.global.dailyChallenge.empower.stacks) * Math.pow(game.portal.Equality.modifier, game.portal.Equality.scalingCount);
    var health = game.global.soldierHealth + game.global.soldierEnergyShield;
    var healthmax = game.global.soldierHealthMax * (Fluffy.isRewardActive('shieldlayer') ? 1 + (getEnergyShieldMult() * (1 + Fluffy.isRewardActive('shieldlayer'))) : 1 + getEnergyShieldMult());

    if (attack >= healthmax && game.portal.Equality.getActiveLevels() < game.portal.Equality.radLevel) return false;
    else if (attack >= health) return true;
    else return false;
}

function Ravoidempower() {
    if (Rarmydeath()) {
        if (typeof game.global.dailyChallenge.bogged === 'undefined' && typeof game.global.dailyChallenge.plague === 'undefined') {
            mapsClicked(true);
            return;
        }
    }
}
