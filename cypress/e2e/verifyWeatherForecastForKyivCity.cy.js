import WeatherPage from "../support/pages/weatherPage";
import WeatherTabsAssertions from "../support/assertions/weatherTabsAssertions";

describe('Verify 7 and 10 days weather forecasts for Kyiv', () => {
  const weatherPage = new WeatherPage();
  const tabsAssertions = new WeatherTabsAssertions();
  const city = 'Київ';

  beforeEach(() =>{
    weatherPage.visitHomePage();
    weatherPage.searchCity(city);
  })

  it('Verify 7 days weather forecast in Kyiv', () => {
    weatherPage.clickAllSevenDayTabs().then((tabs) => {
      tabsAssertions.assertForecastTabs(tabs);
    });
  });

  it('Verify 10 days weather forecast in Kyiv', () => {
    weatherPage.clickOnTenDayForecast();
    weatherPage.clickAllTenDayTabs().then((tabs) => {
      tabsAssertions.assertForecastTabs(tabs);
    });
  });
});
