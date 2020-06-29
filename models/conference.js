module.exports = function(sequelize, DataTypes) {
    var Conference = sequelize.define("Conference", {
        conferenceName: DataTypes.STRING,
        conferenceAbbrev: DataTypes.STRING,
        league: DataTypes.INTEGER
    });
    return Conference;
}