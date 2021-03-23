const { func } = require("prop-types");

describe("Bloglist app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3001/api/testing/reset");
    const user = {
      name: "Random User",
      username: "randomuser",
      password: "12345678",
    };
    cy.request("POST", "http://localhost:3001/api/users/", user);
    cy.visit("http://localhost:3000");
  });
  describe("when accesing the frontend page", function () {
    it("log in form is hided", function () {
      cy.contains("log in");
    });

    it("log in button can be press and the log in form is displayed", function () {
      cy.contains("log in").click();
      cy.get("input[name=username]");
      cy.get("input[name=password]");
      cy.get("button[type=submit]");
    });
  });
  describe("log in", function () {
    it("succedes with correct credentials", function () {
      cy.contains("log in").click();
      cy.get("input[name=username]").type("randomuser");
      cy.get("input[name=password]").type("12345678");
      cy.get("button[type=submit]").click();
      cy.contains("Welcome randomuser");
    });

    it("fails with wrong credentials", function () {
      cy.contains("log in").click();
      cy.get("input[name=username]").type("wronguser");
      cy.get("input[name=password]").type("wrongwrong");
      cy.get("button[type=submit]").click();
      cy.contains("wrong credentials");
    });
  });

  describe("when logged in", function () {
    beforeEach(function () {
      cy.login({ username: "randomuser", password: "!2345678" });
    });
    describe("and multiple blogs already exist", function () {
      beforeEach(function () {
        cy.createBlog({
          title: "Esto es todo",
          author: "Marcos",
          url: "something.com",
        });
        cy.createBlog({
          title: "Hasta nunca",
          author: "Marcos",
          url: "something.com",
        });
        cy.createBlog({
          title: "Mas o menos",
          author: "Marcos",
          url: "something.com",
        });
      });

      it("blogs can be liked", function () {
        cy.contains("Esto es todo Marcos").contains("show more").click();
        cy.contains("likes 0").get("button[name=like]").click();
        cy.contains("likes 1");
      });

      it("blogs can be deleted", function () {
        cy.contains("Esto es todo Marcos").contains("show more").click();
        cy.get("button[name=remove]").click();
        cy.contains("Esto es todo Marcos").should("not.exist");
      });
    });
    it("new blogs can be added", function () {
      cy.contains("add blog").click();
      cy.get("input[name=title]").type("Esto es todo");
      cy.get("input[name=author]").type("Marcos");
      cy.get("input[name=url]").type("something.com");
      cy.contains("add new blog").click();
      cy.contains("Esto es todo Marcos");
    });
  });
});
