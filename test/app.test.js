const { expect } = require("chai");
const supertest = require("supertest");
const app = require("../app");

// describe("Express App", () => {
//   it("should return a message from GET /", () => {
//     return supertest(app).get("/").expect(200, "Hello Express!");
//   });
// });

describe("GET /apps", () => {
  it("should return an array of apps, like gaming apps", () => {
    return supertest(app)
      .get("/apps")
      .expect(200)
      .expect("Content-Type", /json/)
      .then((res) => {
        expect(res.body).to.be.an("array");
        expect(res.body).to.have.lengthOf.at.least(1);
        // expect(res.body[0]).to.include.all.keys(
        //   "Action",
        //   "Puzzle",
        //   "Strategy",
        //   "Casual",
        //   "Arcade",
        //   "Card",
        //   "Android Ver"
        // );
      });
  });
  //   -"Android Ver" -
  //     "App" -
  //     "Category" -
  //     "Content Rating" -
  //     "Current Ver" -
  //     "Genres" -
  //     "Installs" -
  //     "Last Updated" -
  //     "Price" -
  //     "Rating" -
  //     "Reviews" -
  //     "Size" -
  //     "Type";

  it("should return 400 if `sort` by rating query is invalid", () => {
    return supertest(app).get("/apps").query({ sort: "rating" }).expect(400, {
      message: `Sort must be a "rating" or a "app". Also, sort must exist!`
    });
  });

  it("should return 400 if `sort` by app query is invalid", () => {
    return supertest(app).get("/apps").query({ sort: "app" }).expect(400, {
      message: `Sort must be a "rating" or a "app". Also, sort must exist!`
    });
  });
  it("should return 400 if `sort` by genre query is invalid", () => {
    return supertest(app)
      .get("/apps")
      .query({ genres: "wrongGenre" })
      .expect(400, {
        message: `Genre must be one of the following: Action, Arcade, Card, Casual, Puzzle or Stategy`
      });
  });

  const validSorts = ["Rating", "App"];
  validSorts.forEach((sort) => {
    it(`should return array of games sorted by ${sort}`, () => {
      return supertest(app)
        .get("/apps")
        .query({ sort })
        .expect(200)
        .expect("Content-Type", /json/)
        .then((res) => {
          //   expect(res.body).to.be.an("array");
          let i = 0,
            sorted = true;
          while (sorted && i < res.body.length - 1) {
            sorted = res.body[i][sort] <= res.body[i + 1][sort];
            console.log("This is sort test", res.body[i][sort]);
            console.log("This is sort test with i+1", res.body[i + 1][sort]);
            i++;
            //console.log("This is sort test after i++", res.body[i][sort]);
          }
          expect(sorted).to.be.true;
        });
    });
  });
});
