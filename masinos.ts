const fuelTypes = {
    benzinas: "benzinas",
    dyzelinas: "dyzelinas",
}

const formSaveDOM = document.getElementById('add_car') as HTMLElement
const formUpdateDOM = document.getElementById('update_car') as HTMLElement
const listDOM = document.getElementById('list') as HTMLElement
const modelInputUpdate = formUpdateDOM.querySelector('model') as HTMLInputElement
const dateInputUpdate = formUpdateDOM.querySelector('date') as HTMLInputElement
const colorInputUpdate = formUpdateDOM.querySelector('color') as HTMLInputElement
const fuelInputUpdate = formUpdateDOM.querySelector('fuel') as HTMLInputElement

console.log(modelInputUpdate);


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

                <button id="save" type="button">Prideti</button>
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
    public readonly model: string;
    public readonly date: string;
    public readonly color: string;
    public readonly fuel: string;
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

let cars: Cars[] = [];

DOMs.saveFormButton.addEventListener("click", () => {
    const model = DOMs.modelInput.value;
    const date = DOMs.dateInput.value;
    const color = DOMs.colorInput.value;
    const fuel = DOMs.fuelInput.value;

    const newCar = new Cars(model, date, color, fuel)

    cars.push(newCar)
    console.log(cars);

    display();
    newCar.renderUpdateForm();
   
})

function display(): void {
    listDOM.innerHTML = "";
    for (const car of cars) {
        car.printEntry(listDOM)
    }
}

function editEntry(id: number): void {
    formSaveDOM.classList.add('hide');
    formUpdateDOM.classList.remove('hide')
}

function deleteEntry(id: number): void {
    cars = cars.filter((car) => car.id !== id)
    display()
}

function updateEntry(id: number): void {
    const model = modelInputUpdate.value;
    const date = dateInputUpdate.value;
    const color = colorInputUpdate.value;
    const fuel = fuelInputUpdate.value;

    const newCar = new Cars(model, date, color, fuel)

    cars.push(newCar)
    console.log(cars);

    formSaveDOM.classList.remove('hide');
    formUpdateDOM.classList.add('hide')
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