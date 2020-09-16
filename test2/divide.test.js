const divide = require("../mocha_playground");
const chai = require("chai");
const expect = chai.expect;

it("should divide positive integers correctly", () => {
  // define inputs
  const a = 8;
  const b = 4;
  const expectedAnswer = 2;

  // invoke the function
  const actualAnswer = divide(a, b);

  // assert that expected === actual
  expect(actualAnswer).to.equal(expectedAnswer);
});
