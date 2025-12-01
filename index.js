
//     const sidebarLinks = document.querySelectorAll('.sidebar-items a, .sidebar-buttons a');
// sidebarLinks.forEach(link => {
//     link.addEventListener('click', () => {
//         menuToggle.checked = false;
//         document.body.style.overflow = 'auto';
//     });
// });
        // Hero Swiper
        const heroSwiper = new Swiper('.heroSwiper', {
            loop: true,
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            effect: 'fade',
            fadeEffect: {
                crossFade: true
            },
            speed: 800,
        });

        // Weather API Integration
        const API_KEY = "eddbe7a0777b46a64365780ee1411fa8";
        const CITY = "Mysore,IN";
        const weatherWidget = document.getElementById('weather-widget');

        async function fetchWeather() {
            try {
                const response = await fetch(
                    `https://api.openweathermap.org/data/2.5/weather?q=${CITY}&appid=${API_KEY}&units=metric`
                );
                
                if (!response.ok) {
                    throw new Error('Weather data not available');
                }
                
                const data = await response.json();
                displayWeather(data);
            } catch (error) {
                displayError();
            }
        }

        function displayWeather(data) {
            const weatherHTML = `
                <div class="weather-content">
                    <div class="weather-city">${data.name}</div>
                    <div class="weather-main">
                        <div class="weather-icon">${getWeatherIcon(data.weather[0].main)}</div>
                        <div class="weather-temp">
                            <div class="weather-temp-value">${Math.round(data.main.temp)}°C</div>
                            <div class="weather-description">${data.weather[0].description}</div>
                        </div>
                    </div>
                    <div class="weather-details">
                        <div class="weather-detail-item">
                            <div class="weather-detail-label">Feels Like</div>
                            <div class="weather-detail-value">${Math.round(data.main.feels_like)}°C</div>
                        </div>
                        <div class="weather-detail-item">
                            <div class="weather-detail-label">Humidity</div>
                            <div class="weather-detail-value">${data.main.humidity}%</div>
                        </div>
                        <div class="weather-detail-item">
                            <div class="weather-detail-label">Wind Speed</div>
                            <div class="weather-detail-value">${Math.round(data.wind.speed * 3.6)} km/h</div>
                        </div>
                        <div class="weather-detail-item">
                            <div class="weather-detail-label">Pressure</div>
                            <div class="weather-detail-value">${data.main.pressure} hPa</div>
                        </div>
                    </div>
                </div>
            `;
            weatherWidget.innerHTML = weatherHTML;
        }

        function displayError() {
            weatherWidget.innerHTML = `
                <div class="weather-error">
                    <p>Unable to load weather data.</p>
                    <p>Please add your OpenWeatherMap API key to view live weather.</p>
                </div>
            `;
        }

        function getWeatherIcon(condition) {
            const icons = {
                'Clear': '☀️',
                'Clouds': '☁️',
                'Rain': '🌧️',
                'Drizzle': '🌦️',
                'Thunderstorm': '⛈️',
                'Snow': '❄️',
                'Mist': '🌫️',
                'Smoke': '🌫️',
                'Haze': '🌫️',
                'Dust': '🌫️',
                'Fog': '🌫️',
                'Sand': '🌫️',
                'Ash': '🌫️',
                'Squall': '💨',
                'Tornado': '🌪️'
            };
            return icons[condition] || '🌤️';
        }

        // Fetch weather on page load
        fetchWeather();

        // Refresh weather every 10 minutes
        setInterval(fetchWeather, 600000);

        // FAQ Accordion Functionality
        document.querySelectorAll('.faq-question').forEach(question => {
            question.addEventListener('click', () => {
                const faqItem = question.parentElement;
                const isActive = faqItem.classList.contains('active');
                
                // Close all FAQ items
                document.querySelectorAll('.faq-item').forEach(item => {
                    item.classList.remove('active');
                });
                
                // Open clicked item if it wasn't active
                if (!isActive) {
                    faqItem.classList.add('active');
                }
            });
        });

        // Review Form Submission
        const reviewForm = document.getElementById('reviewForm');

        reviewForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Thank you for your review! Your feedback has been submitted successfully.');
            reviewForm.reset();
        });