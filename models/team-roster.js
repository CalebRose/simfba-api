module.exports = function(sequelize, DataTypes) {
    var League = sequelize.define("League", {
        leageName: DataTypes.STRING,
        leageAbbrev: DataTypes.STRING
    });
    return League;
}