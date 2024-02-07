class WeatherHour {
    constructor(hour, temperature, weatherCode, precipitationProbability, precipitationAmount, windGusts) {
        this._hour = hour;
        this._temperature = temperature;
        this._weatherCode = weatherCode;
        this._precipitationProbability = precipitationProbability;
        this._precipitationAmount = precipitationAmount;
        this._windGusts = windGusts;
    }

    get hour() {
        return this._hour;
    }
    
    get temperature() {
        return this._temperature;
    }

    get weatherCode() {
        return this._weatherCode;
    }

    get precipitationProbability() {
        return this._precipitationProbability;
    }

    get precipitationAmount() {
        return this._precipitationAmount;
    }

    get windGusts() {
        return this._windGusts;
    }
}