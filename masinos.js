"use strict";
var fuelTypes = {
    benzinas: "benzinas",
    dyzelinas: "dyzelinas",
};
//  function enumToString(enumType:any): any {
//      if (enumType === fuelTypes.benzinas) {
//          return "benzinas"
//      }
//      if (enumType === fuelTypes.dyzelinas) {
//          return "dyzelinas"
//      }
//  }
var formSaveDOM = document.getElementById('add_car');
var formUpdateDOM = document.getElementById('update_car');
var listDOM = document.getElementById('list');
var modelInputUpdate = formUpdateDOM.querySelector('model');
var dateInputUpdate = formUpdateDOM.querySelector('date');
var colorInputUpdate = formUpdateDOM.querySelector('color');
var fuelInputUpdate = formUpdateDOM.querySelector('fuel');
function renderAddForm() {
    return formSaveDOM.innerHTML = "<form>\n                <input id=\"model\" type=\"text\" placeholder=\"Modelis\">\n                <input id=\"date\" type=\"date\" placeholder=\"Pagaminimo data\">\n                <input id=\"color\" type=\"text\" placeholder=\"Spalva\">\n                <select id=\"fuel\">\n                <option value=\"\" disabled selected>Kuro tipas</option>\n                    <option value=\"" + fuelTypes.benzinas + "\">Benzinas</option>\n                    <option value=\"" + fuelTypes.dyzelinas + "\">Dyzelinas</option>\n                </select>\n\n                <button id=\"save\" type=\"button\">Prideti</button>\n            </form>";
}
renderAddForm();
var DOMs = {
    modelInput: document.getElementById('model'),
    dateInput: document.getElementById('date'),
    colorInput: document.getElementById('color'),
    fuelInput: document.getElementById('fuel'),
    saveFormButton: formSaveDOM.querySelector('button'),
    editFormButton: formUpdateDOM.querySelector('button'),
    allFilter: document.getElementById('all'),
    dyzelFilter: document.getElementById('dyzel'),
    benzFilter: document.getElementById('benz'),
};
var Cars = /** @class */ (function () {
    function Cars(model, date, color, fuel, id) {
        if (fuel === void 0) { fuel = fuelTypes.benzinas; }
        this.model = model;
        this.date = date;
        this.color = color;
        this.fuel = fuel;
        this.id = id || Math.round(Math.random() * 10000);
    }
    Cars.prototype.generateID = function () {
        return this.id;
    };
    Cars.prototype.printEntry = function (element) {
        if (element) {
            element.innerHTML += "<div id=\"" + this.generateID() + "\" class=\"entry\">\n                <div class=\"entry_parameter\">" + this.model + "</div>\n                <div class=\"entry_parameter\">" + this.date + "</div>\n                <div class=\"entry_parameter\">" + this.color + "</div>\n                <div class=\"entry_parameter\">" + this.fuel + "</div>\n                <div class=\"actions\">\n                    <img onclick=\"editEntry(" + this.id + ")\" class=\"edit\" src=\"./img/edit.png\" alt=\"Atnaujinti\">\n                    <img onclick=\"deleteEntry(" + this.id + ")\" class=\"delete\" src=\"./img/delete.png\" alt=\"Istrinti\">\n                </div>\n            </div>";
        }
    };
    Cars.prototype.renderUpdateForm = function () {
        formUpdateDOM.innerHTML = " <form>\n                <input id=\"model\" type=\"text\" placeholder=\"" + this.model + "\">\n                <input id=\"date\" type=\"date\" placeholder=\"" + this.date + "\">\n                <input id=\"color\" type=\"text\" placeholder=\"" + this.color + "\">\n                 <select id=\"fuel\">\n                <option value=\"\" disabled selected>Kuro tipas</option>\n                    <option value=\"" + fuelTypes.benzinas + "\">Benzinas</option>\n                    <option value=\"" + fuelTypes.dyzelinas + "\">Dyzelinas</option>\n                </select>\n\n                <button onclick=\"updateEntry(" + this.id + ")\" class=\"save\" type=\"button\">Atnaujinti</button>\n            </form>";
    };
    return Cars;
}());
var cars = [];
DOMs.saveFormButton.addEventListener("click", function () {
    var model = DOMs.modelInput.value;
    var date = DOMs.dateInput.value;
    var color = DOMs.colorInput.value;
    var fuel = DOMs.fuelInput.value;
    var newCar = new Cars(model, date, color, fuel);
    cars.push(newCar);
    console.log(cars);
    display();
    newCar.renderUpdateForm();
});
function display() {
    listDOM.innerHTML = "";
    for (var _i = 0, cars_1 = cars; _i < cars_1.length; _i++) {
        var car = cars_1[_i];
        car.printEntry(listDOM);
    }
}
function editEntry(id) {
    formSaveDOM.classList.add('hide');
    formUpdateDOM.classList.remove('hide');
}
function deleteEntry(id) {
    cars = cars.filter(function (car) { return car.id !== id; });
    display();
}
function updateEntry(id) {
    var model = modelInputUpdate.value;
    var date = dateInputUpdate.value;
    var color = colorInputUpdate.value;
    var fuel = fuelInputUpdate.value;
    var newCar = new Cars(model, date, color, fuel);
    cars.push(newCar);
    console.log(cars);
    formSaveDOM.classList.remove('hide');
    formUpdateDOM.classList.add('hide');
    display();
}
function filterAll() {
    display();
}
function filterDyzel() {
    var dyzel = [];
    dyzel = cars.filter(function (car) { return car.fuel === 'dyzelinas'; });
    listDOM.innerHTML = "";
    for (var _i = 0, dyzel_1 = dyzel; _i < dyzel_1.length; _i++) {
        var car = dyzel_1[_i];
        car.printEntry(listDOM);
    }
}
function filterBenz() {
    var benz = [];
    benz = cars.filter(function (car) { return car.fuel === 'benzinas'; });
    listDOM.innerHTML = "";
    for (var _i = 0, benz_1 = benz; _i < benz_1.length; _i++) {
        var car = benz_1[_i];
        car.printEntry(listDOM);
    }
}
