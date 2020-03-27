describe("Test our inputs and submit our form", function() {
  beforeEach(function() {
    cy.visit("http://localhost:3000/");
  });
  it("add text to input and submit form", function() {
    cy.get('input[name="name"]')
      .type("Natalia")
      .should("have.value", "Natalia");
    cy.get('input[name="email"]')
      .type("email@email.com")
      .should("have.value", "email@email.com");
    cy.get('input[name="password"]')
      .type("natalia")
      .should("have.value", "natalia");
    cy.get('[type="checkbox"]')
      .check()
      .should("be.checked");
    cy.get("button").click();
  });
});
