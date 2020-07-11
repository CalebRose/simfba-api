
        module.exports = function(sequelize, DataTypes) {
        var Team = sequelize.define("Team", {"name":"VARCHAR(255)","mascot":"VARCHAR(255)","state":"VARCHAR(255)","city":"VARCHAR(255)","level":"VARCHAR(255)","conference":"VARCHAR(255)","teamPref":"VARCHAR(255)","coach":"VARCHAR(255)","createdAt":"VARCHAR(255)","updatedAt":"VARCHAR(255)"}); return Team;}
        