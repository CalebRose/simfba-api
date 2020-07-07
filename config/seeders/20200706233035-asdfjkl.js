'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Player", [{
      team: 124,
        fname: "stringy",
        lname: "stringy",
        age: 124,
        height: 124,
        weight: 124,
        position: "stringy",
        hometown: "stringy",
        homestate: "stringy",
        highschool: "stringy",
        college: "stringy",
        stars: 124,
        archetype: "stringy",
        year: 124,
        redshirt: TRUE,
        progression: 124,
        potential: "stringy",
        overall: 124,
        footballIQ: 124,
        runBlock: 124,
        passBlock: 124,
        strength: 124,
        runDefense: 124,
        passRush: 124,
        carrying: 124,
        routeRunning: 124,
        catching: 124,
        speed: 124,
        puntPower: 124,
        puntAcc: 124,
        kickPower: 124,
        kickAcc: 124,
        agility: 124,
        manCoverage: 124,
        zoneCoverage: 124,
        throwPower: 124,
        throwAcc: 124,
        injury: 124,
        stamina: 124,
        discipline: 124,
        isInjured: TRUE,
        injuryType: "stringy",
        injuryLeft: 124,
        injuryQtrs: 124,
        recruiting: "stringy",
        academic: "stringy",
        personality: "stringy",
        workEthic: "stringy",
        freeAgent: "stringy"
    }], {});
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
