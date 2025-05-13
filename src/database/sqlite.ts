import { Sequelize, DataTypes } from 'sequelize';

const sequelize = new Sequelize('sqlite::memory:');

const Solution = sequelize.define('Solution', {
  secretCode: DataTypes.STRING,
});

// Returns today's solution or else creates a new one
export async function getDailyChallenge() {
  // const solution = await Solution.create({
  //   secretCode: 'janedoe',

  // });

  const solutions = await Solution.findAll();

  return solutions;
}
