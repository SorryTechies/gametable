/**
 * Created by LastBerserk on 27.01.2019.
 */

const CombatObject = require("../parse/classes/CombatObject");

const vatan = new CombatObject();
vatan.x = 10;
vatan.y = 10;
vatan.img = "https://cdna.artstation.com/p/assets/images/images/001/168/964/large/agnieszka-belicka-ian.jpg?1441459569";
vatan.name = "Vatan";
vatan.backGroundColor = "";
vatan.color = "";
vatan.save();

const rur = new CombatObject();
rur.x = 10;
rur.y = 10;
rur.img = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpJzWEgHUJOzLRrdtgqf222Rkd0H6peqLO9X_zpeBpClsb3Xy4ow";
rur.name = "Rur";
rur.backGroundColor = "";
rur.color = "";
rur.save();

const milt = new CombatObject();
milt.x = 10;
milt.y = 10;
milt.img = "https://cdna.artstation.com/p/assets/images/images/011/816/822/large/johannes-helgeson-commissar01.jpg?1531563496";
milt.name = "Miltael";
milt.backGroundColor = "";
milt.color = "";
milt.save();
