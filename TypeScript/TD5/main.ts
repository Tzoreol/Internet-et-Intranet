class Identifier {
    _firstname: string;
    _lastname: string;
    _dateOfBirth : string;
    _gender: string;
    _country: string

    constructor(firstname : string, lastname: string, dateOfBirth: string, gender: string, country: string) {
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

async function generateIdCard() : Promise<void> {
    let response : Response = await fetch("https://randomuser.me/api")
    let data : any = await response.json();
    console.log(data)

    let id : any = data.results[0];

    let firstname : string = id.name.first;
    let lastname : string = id.name.last;
    let dateOfBirth : string = id.dob.date;
    let gender : string = id.gender
    let country : string = id.nat

    let idData = new Identifier(firstname, lastname, dateOfBirth, gender, country)
    drawCard(idData);
}

function drawCard(idData : Identifier) : void{
    let card : HTMLElement | null = document.getElementById("card");

    let h3 : HTMLElement = document.createElement("h3");
    h3.innerText = idData.firstname + " " + idData.lastname.toUpperCase();

    let genderAndDob : HTMLElement = document.createElement("p")
    genderAndDob.innerHTML = idData.gender + " | DOB: " + idData.dateOfBirth;

    let countryP : HTMLElement = document.createElement("p");
    countryP.innerText = "Country: " + idData.country

    card?.appendChild(h3);
    card?.appendChild(genderAndDob)
    card?.appendChild(countryP)
}

let card : HTMLElement | null = document.getElementById("card")
let toPink  : HTMLElement | null = document.getElementById("toPink");
let toGreen  : HTMLElement | null = document.getElementById("toGreen");

toPink?.addEventListener("click", (event) => card?.setAttribute("class", "pink"));
toGreen?.addEventListener("click", (event) => card?.setAttribute("class", "green"));

generateIdCard();