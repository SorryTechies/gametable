/**
 * Created by LastBerserk on 27.01.2019.
 */

const Attack = require("../parse/classes/Attack");

const unarmedH = new Attack();
unarmedH.name = 'unarmed';
unarmedH.description = '';
unarmedH.damageDice = 4;
unarmedH.damageStat = 'S';
unarmedH.hitStat = 'S';
unarmedH.save();

const boneKnife = new Attack();
boneKnife.name = 'Bone knife';
boneKnife.description = '';
boneKnife.damageDice = 6;
boneKnife.damageStat = 'S';
boneKnife.hitStat = 'S';
boneKnife.save();

const boneKnifeThrow = new Attack();
boneKnifeThrow.name = 'Bone knife (throw)';
boneKnifeThrow.description = 'Throw knife at the enemy.';
boneKnifeThrow.damageDice = 6;
boneKnifeThrow.damageStat = 'S';
boneKnifeThrow.hitStat = 'S';
boneKnifeThrow.save();

const bayonet = new Attack();
bayonet.name = 'Bayonet';
bayonet.description = '';
bayonet.damageDice = 6;
bayonet.damageStat = 'S';
bayonet.hitStat = 'S';
bayonet.save();

const bayonetThrow = new Attack();
bayonetThrow.name = 'Bayonet (throw)';
bayonetThrow.description = 'Throw bayonet';
bayonetThrow.damageDice = 6;
bayonetThrow.damageStat = 'S';
bayonetThrow.hitStat = 'S';
bayonetThrow.save();

const necronSpear = new Attack();
necronSpear.name = 'Necron spean';
necronSpear.description = '+1 range';
necronSpear.damageDice = 8;
necronSpear.damageStat = 'S';
necronSpear.hitStat = 'S';
necronSpear.save();

const necronSpearThrow = new Attack();
necronSpearThrow.name = 'Necron spean (throw)';
necronSpearThrow.description = 'Throw spear.';
necronSpearThrow.damageDice = 8;
necronSpearThrow.damageStat = 'S';
necronSpearThrow.hitStat = 'S';
necronSpearThrow.save();

const autogun = new Attack();
autogun.name = 'Autogun';
autogun.description = 'capacity 30';
autogun.damageDice = 8;
autogun.damageStat = '';
autogun.hitStat = '';
autogun.save();

const pistolS = new Attack();
pistolS.name = "Maltael's Pistol";
pistolS.description = 'capacity 10 + silencer';
pistolS.damageDice = 8;
pistolS.damageStat = '';
pistolS.hitStat = '';
pistolS.save();

const lasGun = new Attack();
lasGun.name = "LasGun";
lasGun.description = 'capacity 50';
lasGun.damageDice = 10;
lasGun.damageStat = '';
lasGun.hitStat = '';
lasGun.save();

const bolter = new Attack();
bolter.name = "Bolter";
bolter.description = 'capacity 10';
bolter.damageDice = 20;
bolter.damageStat = '';
bolter.hitStat = '';
bolter.save();

