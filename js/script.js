document.addEventListener('DOMContentLoaded', function () {
  const weatherContainer = document.querySelector('#weather-container');

  createWeatherModal();

  // Function to create and insert the modal into the DOM
  function createWeatherModal() {
    const modal = document.createElement('div');
    modal.setAttribute('id', 'weatherModal');
    modal.style.display = 'none';
    modal.style.position = 'fixed';
    modal.style.left = '50%';
    modal.style.top = '50%';
    modal.style.transform = 'translate(-50%, -50%)';
    modal.style.backgroundColor = 'white';
    modal.style.padding = '20px';
    modal.style.zIndex = '1000';
    modal.style.borderRadius = '5px';
    modal.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';

    const modalContent = document.createElement('div');
    modalContent.setAttribute('id', 'weatherModalContent');

    const closeButton = document.createElement('button');
    closeButton.textContent = 'Close';
    closeButton.onclick = function() {
        modal.style.display = 'none';
    };

    modal.appendChild(modalContent);
    modal.appendChild(closeButton);

    document.body.appendChild(modal);
  } 


  // Fetch countries data
  fetch('https://restcountries.com/v3.1/all')
      .then(response => response.json())
      .then(countries => {
          countries.forEach(country => {
              // Create card for each country's weather
              const col = document.createElement('div');
              col.className = 'col-sm-6 col-md-4 col-lg-4 col-xl-4';

              const card = document.createElement('div');
              card.className = 'card h-100';

              // Header with country name
              const cardHeader = document.createElement('div');
              cardHeader.className = 'card-header';
              cardHeader.textContent = country.name.common;

              // Image for country flag
              const images= document.createElement('img');
              images.className = 'card-img-top';
              images.src = country.flags.png;
              images.alt = 'Country flags';

              const cardBody = document.createElement('div');
              cardBody.className = 'card-body';
              const cardText = document.createElement('div')
              cardText.className = 'card-text';
                let details = [
                    `Capital: ${country.capital}`,
                    `Region: ${country.region}`,
                    `Population: ${country.population}`,
                ];
            
                // Add the content to the div with <br> tag
                cardText.innerHTML = details.join('<br>');
               // Button to click for weather
               const weatherButton = document.createElement('button');
               weatherButton.className = 'btn btn-primary';
               weatherButton.textContent = 'Click for Weather';
               weatherButton.onclick = function() {
                // Fetch weather data
              fetch(`https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&appid=f689f79f552c3026e9366d23ea0b222f`)
              .then(response => response.json())
              .then(weather => {
                const weatherData = {
                  location: country.name.common,
                  temperature: weather.main.temp,
                  humidity:  weather.main.humidity,
                  pressure:  weather.main.pressure
              };
                showWeatherModal(weatherData);

                
                
                // Function to show the modal with weather data
                function showWeatherModal(weatherData) {
                  const modal = document.querySelector('#weatherModal');
                  const modalContent = document.querySelector('#weatherModalContent');

                  modalContent.innerHTML = `
                      <h2>Weather Details</h2>
                      <p><strong>Location:</strong> ${weatherData.location}</p>
                      <p><strong>Temperature:</strong> ${weatherData.temperature} K</p>
                      <p><strong>Humidity:</strong> ${weatherData.humidity}%</p>
                      <p><strong>Pressure:</strong> ${weatherData.pressure} hPa</p>
                  `;

                  modal.style.display = 'block';
                }



              });
               
          
              };

              // Append all elements to the card body
              cardBody.appendChild(cardText);
              cardBody.appendChild(weatherButton);

              // Append card header and body to card
              card.appendChild(cardHeader);
              card.appendChild(images);
              card.appendChild(cardBody);

              // Append card to column and column to container
              col.appendChild(card);
              weatherContainer.appendChild(col);
          });
      });
});
