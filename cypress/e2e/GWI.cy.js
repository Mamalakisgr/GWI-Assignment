describe("template spec", () => {

	it('Verify that "Create a Chart" button redirects to Page2', () => {

		// Homepage
		cy.visit("/");
		cy.get(".createButton").click();

		// Page2
		cy.location("pathname").should("eq", "/Page2");
		cy.get(".MuiGrid-item").first().assertElementText("This is chart creation page - nothing to see here though");
		cy.get(".createButton").assertElementText("Go back");
		cy.get(".createButton").click();

		//Homepage
		cy.location("pathname").should("eq", "/");
	});


	it("Verify that charts are sorted by Name ascending when visiting Homepage", () => {

		cy.visit("/");

		// Get "Names" for each item from Chart
		cy.get(".root >  .MuiGrid-justify-content-xs-space-between:not(.header) > div:nth-child(1)").then(($items) => {
			const sortedNames = $items.toArray().map((items) => Cypress.$(items).text().trim());
			cy.log("Sorted Names:", sortedNames);
		});
	});


	it("Verify that charts are sorted by Date Created ascending when clicking the label", () => {
		cy.visit("/");
		const parseDate = (dateString) => new Date(Date.parse(dateString));
		let unsortedData;
		let sortedData;

		// Get unsorted "Date Created" data
		cy.get(".root > .MuiGrid-justify-content-xs-space-between:not(.header) > div:nth-child(2)").then(($items) => {
			unsortedData = $items.toArray().map((items) => Cypress.$(items).text().trim());
			unsortedData = unsortedData.map(parseDate);
			cy.log("Unsorted Data:", unsortedData);
			cy.get(".MuiButton-label").contains("Date created").click();

			// Get sorted "Date Created" data
			cy.get(".root >  .MuiGrid-justify-content-xs-space-between:not(.header) > div:nth-child(2)").then(($sortedItems) => {
				sortedData = $sortedItems.toArray().map((items) => Cypress.$(items).text().trim());
				sortedData = sortedData.map(parseDate);
				cy.log("Sorted Data:", sortedData);
				unsortedData = [...unsortedData].sort((a, b) => a - b);

				// Assert that Sorted Data has been sorted successfully
				expect(sortedData.map(d => d.toISOString())).to.deep.equal(unsortedData.map(d => d.toISOString()));
			});
		});
	});


	it("Verify that charts are sorted by Last Modified ascending when clicking the label (Failing Test Case, sorting is invalid)", () => {
		cy.visit("/");
		const parseDate = (dateString) => new Date(Date.parse(dateString));
		let unsortedData;
		let sortedData;

		// Get unsorted "Last modified" data
		cy.get(".root >  .MuiGrid-justify-content-xs-space-between:not(.header) > div:nth-child(3)").then(($items) => {
			unsortedData = $items.toArray().map((items) => Cypress.$(items).text().trim());
			unsortedData = unsortedData.map(parseDate);
			cy.log("Unsorted Data:", unsortedData);
			cy.get(".MuiButton-label").contains("Last modified").click();

			// Get sorted "Last Modified" data
			cy.get(".root >  .MuiGrid-justify-content-xs-space-between:not(.header) > div:nth-child(3)").then(($sortedItems) => {
				sortedData = $sortedItems.toArray().map((items) => Cypress.$(items).text().trim());
				sortedData = sortedData.map(parseDate);
				cy.log("Sorted Data:", sortedData);
				unsortedData = [...unsortedData].sort((a, b) => a - b);

				// Assert that Sorted Data has been sorted successfully
				expect(sortedData.map(d => d.toISOString())).to.deep.equal(unsortedData.map(d => d.toISOString()));
			});
		});
	});


	it("Verify that the correct charts are displayed based on search results ", () => {
		cy.visit("/");

		// Search with a single letter 
		cy.get('.MuiInputBase-input').type("e")
		cy.get(".root >  .MuiGrid-justify-content-xs-space-between:not(.header) > div:nth-child(1)").then(($items) => {
			const searchResults = $items.toArray().map((items) => Cypress.$(items).text().trim());
			cy.log("Sorted Names:", searchResults);
			searchResults.forEach((result) => {
				expect(result).to.include("e");
			});
		});

		// Search with exact Chart name
		cy.get('.MuiInputBase-input').clear().type("Chart 1")
		cy.get(".root >  .MuiGrid-justify-content-xs-space-between:not(.header) > div:nth-child(1)").then(($items) => {
			const searchResults = $items.toArray().map((items) => Cypress.$(items).text().trim());
			cy.log("Sorted Names:", searchResults);
			searchResults.forEach((result) => {
				expect(result).to.eql("Chart 1");
			});
		});
	});


	it("Verify that no results are displayed if there's no chart with the given search parameter ", () => {
		cy.visit("/");

		// Search with non-existing name
		cy.get('.MuiInputBase-input').type("test123")
		cy.get(".root > .MuiGrid-justify-content-xs-space-between:not(.header)").should('not.exist')

		// Search with existing name + symbol
		cy.get('.MuiInputBase-input').clear().type("Chart 1 #")
		cy.get(".root > .MuiGrid-justify-content-xs-space-between:not(.header)").should('not.exist')
	});


	it("Verify that sorting is persistent while searching (Date Created)", () => {
		cy.visit("/");
		const parseDate = (dateString) => new Date(Date.parse(dateString));
		let unsortedData;
		let sortedData;

		cy.get('.MuiInputBase-input').type("chart")
		// Get unsorted "Date Created" data in Search Results
		cy.get(".root >  .MuiGrid-justify-content-xs-space-between:not(.header) > div:nth-child(2)").then(($items) => {
			unsortedData = $items.toArray().map((items) => Cypress.$(items).text().trim());
			unsortedData = unsortedData.map(parseDate);
			cy.log("Unsorted Data:", unsortedData);
			cy.get('.MuiInputBase-input').clear()
			cy.get(".MuiButton-label").contains("Date created").click();

			// Get sorted "Date Created" data in Search Results
			cy.get('.MuiInputBase-input').type("chart")
			cy.get(".root >  .MuiGrid-justify-content-xs-space-between:not(.header) > div:nth-child(2)").then(($sortedItems) => {
				sortedData = $sortedItems.toArray().map((items) => Cypress.$(items).text().trim());
				sortedData = sortedData.map(parseDate);
				cy.log("Sorted Data:", sortedData);
				unsortedData = [...unsortedData].sort((a, b) => a - b);

				// Assert that Sorted Data has been sorted successfully
				expect(sortedData.map(d => d.toISOString())).to.deep.equal(unsortedData.map(d => d.toISOString()));
			});
		});


	})

	it("Verify that sorting is persistent while searching (Last Modified) (Failing Test Case, sorting is invalid)", () => {
		cy.visit("/");
		const parseDate = (dateString) => new Date(Date.parse(dateString));
		let unsortedData;
		let sortedData;

		cy.get('.MuiInputBase-input').type("chart")
		// Get unsorted "Last Modified" data in Search Results
		cy.get(".root >  .MuiGrid-justify-content-xs-space-between:not(.header) > div:nth-child(3)").then(($items) => {
			unsortedData = $items.toArray().map((items) => Cypress.$(items).text().trim());
			unsortedData = unsortedData.map(parseDate);
			cy.log("Unsorted Data:", unsortedData);
			cy.get('.MuiInputBase-input').clear()
			cy.get(".MuiButton-label").contains("Last modified").click();

			// Get sorted "Last Modified" data in Search Results
			cy.get('.MuiInputBase-input').type("chart")
			cy.get(".root >  .MuiGrid-justify-content-xs-space-between:not(.header) > div:nth-child(3)").then(($sortedItems) => {
				sortedData = $sortedItems.toArray().map((items) => Cypress.$(items).text().trim());
				sortedData = sortedData.map(parseDate);
				cy.log("Sorted Data:", sortedData);
				unsortedData = [...unsortedData].sort((a, b) => a - b);

				// Assert that Sorted Data has been sorted successfully
				expect(sortedData.map(d => d.toISOString())).to.deep.equal(unsortedData.map(d => d.toISOString()));
			});
		});
	});

	it("Verify that the correct message is displayed when navigating to an invalid url", () => {
		cy.visit("/Page3");
		cy.get('#root > div').invoke('text').should('equal', 'Not found')
	});



});
