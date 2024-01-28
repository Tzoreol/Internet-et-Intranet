class Id {
    constructor(firstname, lastname, dateOfBirth, gender, country) {
        this._firstname = firstname;
        this._lastname = lastname;
        this._dateOfBirth = dateOfBirth;
        this._gender = gender;
        this._country = country;
    }

    get firstname() {
        return this._firstname
    }

    get lastname() {
        return this._lastname
    }

    get dateOfBirth() {
        let ts = Date.parse(this._dateOfBirth)
        let date = new Date(ts)
        return date.getUTCDate() + "/" + date.getMonth() + "/" + date.getFullYear();
    }

    get gender() {
        return this._gender
    }

    get country() {
        return this._country
    }
}