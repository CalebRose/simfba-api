
        module.exports = function(sequelize, DataTypes) {
        var Team = sequelize.define("Team", {"Team":"VARCHAR(255)","Nickname":"VARCHAR(255)","City":"VARCHAR(255)","State":"VARCHAR(255)","Enrollment":"INTEGER","Current_Conference":"VARCHAR(255)","First_Played":"VARCHAR(255)","Coach":"VARCHAR(255)","createdAt":"VARCHAR(255)","updatedAt":"VARCHAR(255)"}); return Team;}
        