const { getWeather, changeBackground } = require('./script'); // Import functions
global.fetch = jest.fn(); // Mock fetch globally

describe('getWeather function', () => {
  // Define a mock for changeBackground
  let changeBackgroundMock;

  beforeEach(() => {
    // Mock DOM elements
    document.body.innerHTML = `
      <input id="cityInput" />
      <div id="cityName"></div>
      <div id="temperature"></div>
      <div id="description"></div>
      <div id="humidity"></div>
      <div id="wind"></div>
      <img id="weatherIcon" />
    `;

    // Properly mock changeBackground function
    changeBackgroundMock = jest.fn();
    global.changeBackground = changeBackgroundMock; // Override the original function with the mock
  });

  // Test case 1: Test if alert is called when city input is empty
  test('should alert when city input is empty', () => {
    global.alert = jest.fn(); // Mock alert

    document.getElementById('cityInput').value = ''; // Set the input to empty

    getWeather(); // Call the function

    expect(global.alert).toHaveBeenCalledWith('Please enter a city name');
  });

  // Test case 2: Test if fetch is called with correct URL when city is entered
  test('should call fetch with correct URL when city is entered', async () => {
    global.alert = jest.fn(); // Mock alert

    document.getElementById('cityInput').value = 'London'; // Set a city value
    
    // Mock fetch response
    fetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue({
        cod: '200',
        name: 'London',
        main: { temp: 15, humidity: 80 },
        weather: [{ description: 'Clear sky', icon: '01d' }],
        wind: { speed: 5 },
      }),
    });

    await getWeather(); // Call the function

    // Correct the URL comparison
    expect(fetch).toHaveBeenCalledWith(
      'https://api.openweathermap.org/data/2.5/weather?q=London&units=metric&appid=2f5da59c46a7eea14a8062d183c9660a}'
    );
  });
  
});
