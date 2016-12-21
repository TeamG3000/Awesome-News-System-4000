/* globals require describe it beforeEach afterEach done */

const chai = require("chai");
const sinonModule = require("sinon");
const hashing = require("../utils/hashing");

let expect = chai.expect;

describe("Tests Users Data", () => {
    let sinon;

    beforeEach(() => {
        sinon = sinonModule.sandbox.create();
    });

    class User {
        constructor(params) {
            this.username = params.username;
            this.email = params.email;
            this.salt = params.salt;
            this.passHash = params.hashing;
            this.roles = params.roles || "user";
            this.favouriteArticles = params.favouriteArticles || [];
            this.selectedMedia = params.selectedMedia || [];
        }

        save(err) {

        }
        static find() { }
        static findOne() { }
    }

    let data = require("../data/users-data")({ user: User });


    describe("Test getAllUsers()", () => {

        it("Expext to return 3 users", done => {
            //arrange
            let users = ["John", "Maria", "Peter"];

            sinon.stub(User, "find", cb => {
                cb(null, users);
            });

            //act
            data.getAllUsers()
                .then(actualUsers => {
                    //assert
                    expect(actualUsers).to.eql(users);
                    done();
                });
        });

    });

    describe("Test getUserById(id) ", () => {
        let existingUserId = 1;
        let user = {
            _id: existingUserId,
            username: "John"
        };

        let users = [user];

        beforeEach(() => {
            sinon.stub(User, "findOne", (query, cb) => {
                let id = query._id;
                let foundUser = users.find(x => x._id === id);
                cb(null, foundUser);
            });
        });

        afterEach(() => {
            sinon.restore();
        });

        it("Expect to return the user", done => {

            data.getUserById(existingUserId)
                .then((actualUser => {
                    expect(actualUser).to.equal(user);
                    done();
                }));
        });

        it("Expect it to return null if no user is found", done => {
            data.getUserById(2)
                .then((actualUser => {
                    expect(actualUser).to.equal(null);
                    done();
                }));
        });
    });

    describe("Test createNewUser(user)", () => {
        beforeEach(() => {
            sinon.stub(User.prototype, "save", cb => {
                cb(null);
            });
        });

        afterEach(() => {
            sinon.restore();
        });

        it("Expect to save a new user", done => {

            let user = {
                username: "Peter",
                email: "peter@abv.bg",
                password: "pass123"
            };
            data.createNewUser(user)
                .then(actualUser => {
                    expect(actualUser.username).to.equal("Peter");
                    done();
                });
        });

        it("Expect to fail when username is empty", done => {

            let user = {
                username: "",
                email: "peter@abv.bg",
                password: "pass123"
            };
            data.createNewUser(user)
                .catch(error => {
                    expect(error.reason).to.include("Username must be between");
                    done();
                });
        });

        it("Expect to fail when password is empty", done => {

            let user = {
                username: "Peter",
                email: "peter@abv.bg",
                password: ""
            };
            data.createNewUser(user)
                .catch(error => {
                    expect(error.reason).to.include("Password must be between");
                    done();
                });
        });

    });

    describe("Test getUserByUsername(username)", () => {
        let existingUserId = 1;
        let existingUsername = "Peter";

        let user = {
            _id: existingUserId,
            username: existingUsername
        };

        let users = [user];

        beforeEach(() => {
            sinon.stub(User, "findOne", (query, cb) => {
                let username = query.username;
                let foundUser = users.find(x => x.username === username);
                cb(null, foundUser);
            });
        });

        afterEach(() => {
            sinon.restore();
        });

        it("Expect to return the user", done => {

            data.getUserByUsername(existingUsername)
                .then(actualUser => {
                    expect(actualUser).to.eql(user);
                    done();
                });
        });

        it("Expect it to return null if no user is found", done => {
            data.getUserByUsername("John")
                .then((actualUser => {
                    expect(actualUser).to.equal(null);
                    done();
                }));
        });
    });

    describe("Test updateUserWithSelectedMedia(userId, selectedMedia)", () => {
        let existingUserId = 1;
        let existingSelectedMedia = ["mtv news", "tech radar"];

        let user = {
            _id: existingUserId
        };

        let users = [user];


        beforeEach(() => {
            sinon.stub(User, "findOne", (query, cb) => {
                let id = query._id;
                let foundUser = users.find(x => x._id === existingUserId);
                cb(null, foundUser);
            });

            sinon.stub(User.prototype, "save", cb => {
                cb(null);
            });
        });

        afterEach(() => {
            sinon.restore();
        });

        it("Expects to save the selected media to the user", done => {
            data.updateUserWithSelectedMedia(existingUserId, existingSelectedMedia)
                .then(done());
        });
    });
});