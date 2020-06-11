module.exports = function(sequelize, DataTypes) {
    var Team = sequelize.define("Team", {
        name: DataTypes.STRING,
        mascot: DataTypes.STRING,
        state: DataTypes.STRING,
        city: DataTypes.STRING,
        level: DataTypes.STRING,
        conference: DataTypes.STRING,
        teamPref: DataTypes.INTEGER,
        coach: DataTypes.INTEGER
    });
    return Team;
}