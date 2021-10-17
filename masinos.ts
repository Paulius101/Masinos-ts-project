const fuelTypes = {
    benzinas: "benzinas",
    dyzelinas: "dyzelinas",
}

interface carsInterface {
    model: string;
    date: string;
    color: string;
    fuel: string;
    id: number;
}

const formSaveDOM = document.getElementById('add_car') as HTMLElement
const formUpdateDOM = document.getElementById('update_car') as HTMLElement
const listDOM = document.getElementById('list') as HTMLElement


function renderAddForm(): string {
    return formSaveDOM.innerHTML = `<form>
                <input id="model" type="text" placeholder="Modelis">
                <input id="date" type="date" placeholder="Pagaminimo data">
                <input id="color" type="text" placeholder="Spalva">
                <select id="fuel">
                <option value="" disabled selected>Kuro tipas</option>
                    <option value="${fuelTypes.benzinas}">Benzinas</option>
                    <option value="${fuelTypes.dyzelinas}">Dyzelinas</option>
                </select>

                <button id="save"  onclick="saveFormButton() "type="button">Prideti</button>
                <input type="reset"  id="reset" value="Atnaujinti forma">
            </form>`
}

renderAddForm()

const DOMs = {
    modelInput: document.getElementById('model') as HTMLInputElement,
    dateInput: document.getElementById('date') as HTMLInputElement,
    colorInput: document.getElementById('color') as HTMLInputElement,
    fuelInput: document.getElementById('fuel') as HTMLInputElement,
    saveFormButton: formSaveDOM.querySelector('button') as HTMLButtonElement,
    editFormButton: formUpdateDOM.querySelector('button') as HTMLButtonElement,
    allFilter: document.getElementById('all') as HTMLButtonElement,
    dyzelFilter: document.getElementById('dyzel') as HTMLButtonElement,
    benzFilter: document.getElementById('benz') as HTMLButtonElement,
}



class Cars {
    public model: string;
    public date: string;
    public color: string;
    public fuel: string;
    public id: number;

    constructor(model: string, date: string, color: string, fuel: string = fuelTypes.benzinas, id ? : number) {
        this.model = model;
        this.date = date;
        this.color = color;
        this.fuel = fuel;
        this.id = id || Math.round(Math.random() * 10000);
    }


    public generateID(): number {
        return this.id
    }

    public printEntry(element ? : HTMLElement): void {
        if (element) {
            element.innerHTML += `<div id="${this.generateID()}" class="entry">
                <div class="entry_parameter">${this.model}</div>
                <div class="entry_parameter">${this.date}</div>
                <div class="entry_parameter">${this.color}</div>
                <div class="entry_parameter">${this.fuel}</div>
                <div class="actions">
                    <img onclick="editEntry(${this.id})" class="edit" src="./img/edit.png" alt="Atnaujinti">
                    <img onclick="deleteEntry(${this.id})" class="delete" src="./img/delete.png" alt="Istrinti">
                </div>
            </div>`
        }
    }


    public renderUpdateForm(): void {
        formUpdateDOM.innerHTML = ` <form>
                <input id="model" type="text" placeholder="${this.model}">
                <input id="date" type="date" placeholder="${this.date}">
                <input id="color" type="text" placeholder="${this.color}">
                 <select id="fuel">
                <option value="" disabled selected>Kuro tipas</option>
                    <option value="${fuelTypes.benzinas}">Benzinas</option>
                    <option value="${fuelTypes.dyzelinas}">Dyzelinas</option>
                </select>

                <button onclick="updateEntry(${this.id})" class="save" type="button">Atnaujinti</button>
            </form>`

    }

}

const CARS_LOCAL_STORAGE_KEY = "vrumvrum";

let cars: Cars[] = [];

function saveFormButton() {
    formUpdateDOM.innerHTML = '';
    const model = DOMs.modelInput.value;
    const date = DOMs.dateInput.value;
    const color = DOMs.colorInput.value;
    const fuel = DOMs.fuelInput.value;

    const newCar = new Cars(model, date, color, fuel)

    cars.push(newCar)
    console.log(cars);

    display();
    saveCarsToStorage()
}

function display(): void {
    listDOM.innerHTML = "";
    for (const car of cars) {
        car.printEntry(listDOM)
    }
}

function deleteEntry(id: number): void {
    cars = cars.filter((car) => car.id !== id)
    saveCarsToStorage()
    display()
}

function editEntry(id: number): void {
    for (const car of cars) {
        if (car.id === id) {
            car.renderUpdateForm()
              formSaveDOM.innerHTML = '';
        }
    }
    formSaveDOM.classList.add('hide');
    formUpdateDOM.classList.remove('hide')
}

function updateEntry(id: number): void {
    for (const car of cars) {
        if (car.id === id) {
            console.log("Atnaujinu car");
            car.model = (document.getElementById('model') as HTMLInputElement).value
            car.color = (document.getElementById('color') as HTMLInputElement).value
            car.date = (document.getElementById('date') as HTMLInputElement).value
            car.fuel = (document.getElementById('fuel') as HTMLInputElement).value
        }
    }
    renderAddForm()
    formUpdateDOM.innerHTML = '';
    formSaveDOM.classList.remove('hide');
    formUpdateDOM.classList.add('hide')
    saveCarsToStorage()
    display();
}

function filterAll(): void {
    display()
}

function filterDyzel(): void {
    let dyzel = [];
    dyzel = cars.filter((car) => car.fuel === 'dyzelinas');
    listDOM.innerHTML = "";
    for (const car of dyzel) {
        car.printEntry(listDOM)
    }
}

function filterBenz(): void {
    let benz = [];
    benz = cars.filter((car) => car.fuel === 'benzinas');
    listDOM.innerHTML = "";
    for (const car of benz) {
        car.printEntry(listDOM)
    }
}

function saveCarsToStorage(): void {
    const carsString = JSON.stringify(cars);

    window.localStorage.setItem(CARS_LOCAL_STORAGE_KEY, carsString);
}

function loadCars(): void {
    const c = window.localStorage.getItem(CARS_LOCAL_STORAGE_KEY);

    if (!c) {
        return;
    }

    // !"" - true
    // !"{}" - false

    const carsWithoutMethods: carsInterface[] = JSON.parse(c);

    for (const car of carsWithoutMethods) {
        const newCar = new Cars(
            car.model,
            car.date,
            car.color,
            car.fuel,
            car.id,)

            cars.push(newCar);
        }
        display();
    }

    loadCars()