class WeatherDayClass {
    constructor(minTemp, maxTemp, date, weatherCode, windGusts, windSpeed, windDirection) {
        this._minTemp = minTemp;
        this._maxTemp = maxTemp;
        this._date = new Date(date);
        this._weatherCode = weatherCode;
        this._windGusts = windGusts;
        this._windSpeed = windSpeed;
        this._windDirection = windDirection;
    }
 
 
    get minTemp() {
        return this._minTemp;
    }
 
 
    get maxTemp() {
        return this._maxTemp;
    }
 
 
    get date() {
        return this._date;
    }
 
 
    get weatherCode() {
        return this._weatherCode;
    }
 
 
    get windGusts() {
        return this._windGusts;
    }
 
 
    get windSpeed() {
        return this._windSpeed;
    }

    get windDirection() {
        if((this._windDirection > 22) && (this._windDirection < 67)) {
            return 'north_east';
        } else if((this._windDirection >= 67) && (this._windDirection < 112)) {
            return 'east';
        } else if((this._windDirection >= 112) && (this._windDirection < 157)) {
            return 'south_east';
        } else if((this._windDirection >= 157) && (this._windDirection < 192)) {
            return 'south';
        } else if((this._windDirection >= 192) && (this._windDirection < 237)) {
            return 'south_west';
        } else if((this._windDirection >= 237) && (this._windDirection < 282)) {
            return 'west';
        } else if((this._windDirection >= 282) && (this._windDirection < 327)) {
            return 'north_west';
        } else {
            return 'north'
        }
    }
 }
 