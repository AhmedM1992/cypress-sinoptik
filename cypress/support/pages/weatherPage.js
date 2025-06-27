import dayjs from 'dayjs';
import 'dayjs/locale/uk';

class WeatherPage {
  searchInput = 'input[type="search"]';
  searchResultItem = 'menu a[href="/pohoda/kyiv"]';
  tenDaysLinkButton = 'a[href="/pohoda/kyiv/10-dniv"]'

  /**
   * Navigates to the home page (sinoptik.ua)
   */
  visitHomePage() {
    cy.visit('/');
  }

  /**
   * Searches for a city and assert the page request
   * @param {string} cityName - The name of the city to search
   */
  searchCity(cityName) {
    cy.intercept('GET', '**/pohoda/kyiv**').as('cityPage');
    cy.get(this.searchInput).type(cityName);
    cy.get(this.searchResultItem).click();
    cy.wait('@cityPage').its('response.statusCode').should('eq', 200);
  }

  /**
   * Clicks on the "10 days" tab and assert the page request
   */
  clickOnTenDayForecast() {
    cy.intercept('GET', '**/pohoda/kyiv/10-dniv**').as('tenDays');
    cy.get(this.tenDaysLinkButton).click();
    cy.wait('@tenDays').its('response.statusCode').should('eq', 200);
  }

  /**
   * Clicks through all forecast tabs (7 or 10 days) and collects their metadata
   * @param {number} numberOfDays - The number of forecast tabs to check (7 or 10)
   * @returns {Cypress.Chainable<Array>} - Wrapped array of tab metadata for assertions
   */
  clickAllForecastTabs(numberOfDays = 7) {
    dayjs.locale('uk');

    // Ukrainian month names in genitive case (used for text comparison)
    const ukrMonths = {
      січень: 'січня',
      лютий: 'лютого',
      березень: 'березня',
      квітень: 'квітня',
      травень: 'травня',
      червень: 'червня',
      липень: 'липня',
      серпень: 'серпня',
      вересень: 'вересня',
      жовтень: 'жовтня',
      листопад: 'листопада',
      грудень: 'грудня',
    };

    const tabData = [];

    // Select all forecast tabs and loop over them
    cy.get('div[class*="DMP0kolW"] > a[href^="/pohoda/kyiv"]')
      .should('have.length', Number(numberOfDays))
      .each(($tab, index) => {
        const href = $tab.attr('href');
        let expectedDate;

        // Parse expected date from href (only for 10-day, except first tab which is "today")
        if (numberOfDays === 10 && index !== 0) {
          const dateMatch = href.match(/\/pohoda\/kyiv\/(\d{4}-\d{2}-\d{2})/);
          expectedDate = dateMatch ? dayjs(dateMatch[1]) : null;
        } else {
          expectedDate = dayjs().add(index, 'day');
        }

        if (!expectedDate) {
          throw new Error(`Could not parse expected date for href: ${href}`);
        }

        // Format expected values for the day, date number, and month
        const expectedDay = expectedDate.format('dddd');
        const expectedDateNum = expectedDate.format('DD');
        const expectedMonth = ukrMonths[expectedDate.format('MMMM')];

        // Interact with the tab (scroll, click, assert navigation and status)
        cy.wrap($tab).click({ force: true });
        cy.location('pathname').should('eq', href);
        cy.request({ url: href, failOnStatusCode: false }).its('status').should('eq', 200);

        // Store tab metadata for later assertions
        tabData.push({
          index,
          href,
          expectedDay,
          expectedDateNum,
          expectedMonth,
          tabRef: $tab,
        });
      });

    // Return wrapped array for `.then(...)` usage in tests  
    return cy.wrap(tabData);
  }

  clickAllSevenDayTabs() {
    return this.clickAllForecastTabs(7);
  }

  clickAllTenDayTabs() {
    return this.clickAllForecastTabs(10);
  }
}
export default WeatherPage;
