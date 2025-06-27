class WeatherTabsAssertions {
    /**
     * Normalizes apostrophes for consistent string comparison
     * @param {string} text
     * @returns {string}
    */
    normalize(text) {
        return text.replace(/[’ʼ']/g, "'");
    }

    /**
     * Generic forecast tab assertion (shared by 7- and 10-day checks)
     * @param {Array} tabs - Array of tab metadata objects
    */
    assertForecastTabs(tabs) {
        tabs.forEach(({ tabRef, expectedDay, expectedDateNum, expectedMonth }) => {
            cy.wrap(tabRef).within(() => {
                // Assert day name
                cy.get('p').eq(0).invoke('text').then((day) => {
                    expect(this.normalize(day.trim().toLowerCase())).to.eq(this.normalize(expectedDay));
                });

                // Assert date number
                cy.get('p').eq(1).invoke('text').should('eq', expectedDateNum);

                // Assert month name (genitive case)
                cy.get('p').eq(2).invoke('text').then((month) => {
                    expect(this.normalize(month.trim().toLowerCase())).to.eq(this.normalize(expectedMonth));
                });
            });
        });
    }
}
export default WeatherTabsAssertions;
