import faker from "@faker-js/faker";

describe("smoke tests", () => {
  afterEach(() => {
    cy.cleanupUser();
  });

  it("should allow you to register and login", () => {
    const loginForm = {
      email: `${faker.internet.userName()}@example.com`,
      password: faker.internet.password(),
    };
    cy.then(() => ({ email: loginForm.email })).as("user");

    cy.visit("/");
    cy.findByRole("link", { name: /register/i }).click();

    cy.findByRole("textbox", { name: /email/i }).type(loginForm.email);
    cy.findByLabelText("Password *").type(loginForm.password);
    cy.findByLabelText("Confirm Password *").type(loginForm.password);
    cy.findByRole("button", { name: /sign up/i }).click();

    cy.findByText(`Hey there ${loginForm.email}`);
  });
});
