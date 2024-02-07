async function loadApplication() {
    let weatherData = await getWeatherDataByDay();
    let weatherByDay = getWeatherByDay(weatherData);

    drawTiles(weatherByDay);
}

async function getWeatherDataByDay() {
    let response = await fetch('https://api.open-meteo.com/v1/forecast?latitude=47.4125&longitude=0.9827&daily=weather_code,temperature_2m_max,temperature_2m_min,wind_direction_10m_dominant,wind_speed_10m_max,wind_gusts_10m_max&timezone=Europe%2FBerlin')


    return await response.json();
}

function getWeatherByDay(weatherData) {
    let daily = weatherData.daily
    let weatherByDay = [];


    for(let i = 0; i < 7; i++) {
        let weatherDay = new WeatherDayClass(daily.temperature_2m_min[i], daily.temperature_2m_max[i], daily.time[i], daily.weather_code[i], daily.wind_gusts_10m_max[i], daily.wind_speed_10m_max[i], daily.wind_direction_10m_dominant[i]);
        weatherByDay.push(weatherDay)
    }


    return weatherByDay
}

function drawTiles(weatherByDay) {
    $('#weatherCards').text('');
    weatherByDay.forEach(weatherDay => {
        let id = `${weatherDay.date.getFullYear()}-${(weatherDay.date.getMonth() + 1).toString().padStart(2,'0')}-${weatherDay.date.getDate().toString().padStart(2,'0')}`;
        let date = $('<div></div>').addClass('date').text(`${dayOfWeek[weatherDay.date.getDay()]} ${weatherDay.date.getDate()}`);
        let weatherText = $('<div></div>').addClass('description').text(weather[weatherDay.weatherCode].text);
        let weatherIcon = $('<div></div>').addClass('material-symbols-rounded').text(weather[weatherDay.weatherCode].icon);
        let temperatures = $('<div></div>').addClass('temperatures');
        let minTemp = $('<span></span>').addClass('minTemp').text(`${Math.round(weatherDay.minTemp)}°C`);
        let maxTemp = $('<span></span>').addClass('maxTemp').text(`${Math.round(weatherDay.maxTemp)}°C`);
        let wind = $('<div></div').addClass('wind');
        let windDirection = ($('<span></span>')).addClass('material-symbols-rounded').addClass('windDirection').text(weatherDay.windDirection);
        let windSpeed = $('<span></span>').addClass('windSpeed').text(Math.round(weatherDay.windSpeed));
        let windGusts = $('<span></span>').addClass('windGusts').text(`${Math.round(weatherDay.windGusts)} km/h`);
        let card = $('<div></div>').attr('id', id).addClass('card').on('click', function() {
            let date = $(this).attr('id');
            $('#hourlyWeather').fadeOut(500, function() {
                $('#hourlyWeather').empty();
                getHourlyWeather(date);
            })
        })


        date.appendTo(card);
        weatherText.appendTo(card);
        weatherIcon.appendTo(card);
        minTemp.appendTo(temperatures);
        maxTemp.appendTo(temperatures);
        temperatures.appendTo(card);
        windDirection.appendTo(wind);
        wind.appendTo(card);
        windSpeed.appendTo(wind);
        windGusts.appendTo(card);

        card.appendTo('#weatherCards');
    })
}

async function getHourlyWeather(date) {
    let url = `https://api.open-meteo.com/v1/forecast?latitude=47.4125&longitude=0.9827&hourly=temperature_2m,precipitation_probability,rain,weather_code,wind_gusts_10m&timezone=Europe%2FBerlin&start_date=${date}&end_date=${date}`;
    let response = await fetch(url);
    let data = await response.json()

    let weatherByHour = getWeatherByHour(data);
    drawDetail(weatherByHour, date);
}

function getWeatherByHour(data) {
    let weatherByHour = [];
    let hourlyData = data.hourly;

   for(i = 0; i < 24; i++) {
        let ts = new Date(hourlyData.time[i])
        let dateTime = new Date(ts);
        let hourlyWeather = new WeatherHour(dateTime.getHours(), hourlyData.temperature_2m[i], hourlyData.weather_code[i], hourlyData.precipitation_probability[i], hourlyData.rain[i], hourlyData.wind_gusts_10m[i]);
        weatherByHour.push(hourlyWeather)
   }

   return weatherByHour;
}

function drawDetail(weatherByHour, date) {
    let dayTS = new Date(date);
    let day = new Date(dayTS);
    let dateDiv = $('<div></div>').addClass('date').text(`${dayOfWeek[day.getDay()]} ${day.getDate()}`);

    dateDiv.appendTo($('#hourlyWeather'))

    weatherByHour.forEach(hour => {
        let hourDiv = $('<div></div>').addClass('hour');
        let hourText = $('<span></span').addClass('hourText').text(`${hour.hour.toString().padStart(2,'0')}h - `);
        let weatherText = $('<span></span>').addClass('material-symbols-rounded').text(weather[hour.weatherCode].icon);
        let temperature = $('<span></span>').addClass('hourTemperature').text(`${Math.round(hour.temperature)}°C`)
        let precipitation = $('<span></span>').addClass('precipitation');
        let precipitationIcon = $('<span></span>').addClass('material-symbols-rounded').text('water_drop');
        let precipitationProbability = $('<span></span>').addClass('precipitationProbability').text(`${hour.precipitationProbability} % | `);
        let precipitationAmount =  $('<span></span>').addClass('precipitationAmount').text(`${hour.precipitationAmount} mm`);
        let gusts = $('<span></span>').addClass('windGusts').text(`${hour.windGusts} km/h`)

        hourText.appendTo(hourDiv)
        weatherText.appendTo(hourDiv);
        temperature.appendTo(hourDiv);

        precipitationIcon.appendTo(precipitation)
        precipitationProbability.appendTo(precipitation);
        precipitationAmount.appendTo(precipitation);
        precipitation.appendTo(hourDiv);

        gusts.appendTo(hourDiv);

        hourDiv.appendTo($('#hourlyWeather'));
        $('#hourlyWeather').fadeIn();
    })

}

$(function() {
    $('#hourlyWeather').hide();
    loadApplication();
});