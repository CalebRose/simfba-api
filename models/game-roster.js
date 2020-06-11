module.exports = function(sequelize, DataTypes) {
    var Roster = sequelize.define("Roster", {
        gameNumber: DataTypes.INTEGER,
        team: DataTypes.Integer,
        qb1: DataTypes.INTEGER,
        qb2: DataTypes.INTEGER
    });
    return Roster;
}