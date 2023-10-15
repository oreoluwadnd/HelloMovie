/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const searchTerm = "The Matrix";
const API_URL = "http://127.0.0.1:8000/";
const CLIENT_URL = "http://localhost:5173/";

describe("Search for movies by keyword", () => {
  beforeEach(() => {
    cy.visit(`${CLIENT_URL}`);
  });

  it("should display the search input", () => {
    cy.get('[data-testid="search-bar"]').should("exist");
  });

  it("should display an error message for no results and no movie result", () => {
    cy.intercept("GET", `${API_URL}movies/search/?q=The%20Matrix&page=1`, {
      statusCode: 404,
    }).as("fetchData");
    const searchTerm = "The Matrix";
    cy.get('[data-testid="search-bar"]').type(searchTerm);
    cy.get('[data-testid="search-bar"]').type("{enter}");
    cy.url().should("include", `${CLIENT_URL}?q=The%20Matrix`);
    cy.wait("@fetchData");
    cy.get('[data-testid="error-box"]').should("exist");
    cy.contains('No results found for "The Matrix"').should("exist");
    cy.get('[data-testid="cards-layout-menu"]').should("not.exist");
  });

  it("display favorite movies", () => {
    // Intercept the API request and delay the response to simulate loading
    cy.intercept("GET", `${API_URL}movies/search/?q=a&page=1`).as("fetchData");
    // Trigger the action that initiates the API request (e.g., click a button)
    // Replace the selector with the appropriate one from your application
    const correctTerm = "a";
    cy.get('[data-testid="search-bar"]').type(correctTerm);
    cy.get('[data-testid="search-bar"]').type("{enter}");

    // Wait for the API request to be intercepted and display the preloader
    cy.wait("@fetchData");

    // Assert that the preloader and overlay are displayed
    cy.get('[data-testid="movie-card"]').should("be.visible");
    cy.get('[data-testid="movie-card"]').should("have.length.greaterThan", 0);
  });
  it("Movie Card Layout Selection", () => {
    cy.intercept("GET", `${API_URL}movies/search/?q=a&page=1`).as("fetchData");

    const correctTerm = "a";
    cy.get('[data-testid="search-bar"]').type(correctTerm);
    cy.get('[data-testid="search-bar"]').type("{enter}");

    cy.wait("@fetchData");

    cy.get('[data-testid="layout-option-horizontal"]').click();
    cy.get('[data-testid="movie-card"]').should("have.class", "horizontal");

    cy.get('[data-testid="layout-option-vertical"]').click();
    cy.get('[data-testid="movie-card"]').should("have.class", "vertical");
  });
  it("should navigate to the next page of movies", () => {
    // Intercept the API request and delay the response to simulate loading
    cy.intercept("GET", `${API_URL}movies/search/?q=a&page=1`).as("fetchData");
    // Trigger the action that initiates the API request (e.g., click a button)
    // Replace the selector with the appropriate one from your application
    const correctTerm = "a";
    cy.get('[data-testid="search-bar"]').type(correctTerm);
    cy.get('[data-testid="search-bar"]').type("{enter}");

    // Wait for the API request to be intercepted and display the preloader
    cy.wait("@fetchData");
    // Assuming that there are multiple pages and a "Next" button
    cy.get('[data-testid="next-page-button"]').click();

    // Check if the page number or content updates to the next page
    cy.get('[data-testid="page-number"]').should("contain", "11");
    cy.get('[data-testid="movie-card"]').should("exist");
    cy.get('[data-testid="previous-page-button"]').click();

    // Check if the page number or content updates to the previous page
    cy.get('[data-testid="page-number"]').should("contain", "1");
    cy.get('[data-testid="movie-card"]').should("exist");
  });
  it("should open the dedicated movie's view when a movie card is clicked and back button", () => {
    cy.intercept("GET", `${API_URL}/search/?q=a&page=1`).as("fetchData");
    const correctTerm = "a";
    cy.get('[data-testid="search-bar"]').type(correctTerm);
    cy.get('[data-testid="search-bar"]').type("{enter}");

    cy.wait("@fetchData");

    cy.get('[data-testid="movie-card"]').first().click();

    cy.url().should("include", "/14");

    cy.get('[data-testid="movie-details"]').should("exist");
    cy.visit(`${CLIENT_URL}14`);
    cy.get('[data-testid="movie-details"]').should("exist");
    cy.get('[data-testid="headerLogo"]').click();
    cy.url().should("include", "/");
  });
});
