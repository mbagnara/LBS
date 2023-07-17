// Obtener la fecha actual
var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); // Enero es 0
var yyyy = today.getFullYear();

// Formatear la fecha en el formato YYYY-MM-DD
var formattedDate = yyyy + '-' + mm + '-' + dd;

// Establecer el valor por defecto en el campo de fecha
document.getElementById('dateInput').value = formattedDate;

// Cargar los datos almacenados en LocalStorage
window.onload = function() {
  var storedData = JSON.parse(localStorage.getItem('exerciseData'));

  if (storedData) {
    var exerciseTable = document.getElementById("exerciseTable").getElementsByTagName("tbody")[0];

    for (var i = 0; i < storedData.length; i++) {
      var row = exerciseTable.insertRow();
      var dateCell = row.insertCell(0);
      var weekCell = row.insertCell(1);
      var exerciseCell = row.insertCell(2);
      var weightCell = row.insertCell(3);
      var editCell = row.insertCell(4);
      var deleteCell = row.insertCell(5);

      dateCell.innerHTML = storedData[i].date;
      weekCell.innerHTML = storedData[i].week;
      exerciseCell.innerHTML = storedData[i].exercise;
      weightCell.innerHTML = storedData[i].weight;

      var editButton = document.createElement("button");
      editButton.innerHTML = "Edit";
      editButton.className = "edit-button";
      editButton.onclick = editExercise;

      var deleteButton = document.createElement("button");
      deleteButton.innerHTML = "Delete";
      deleteButton.className = "delete-button";
      deleteButton.onclick = deleteExercise;

      editCell.appendChild(editButton);
      deleteCell.appendChild(deleteButton);
    }
  }
};

function enableFields() {
  var weekSelect = document.getElementById("weekSelect");
  var exerciseSelect = document.getElementById("exerciseSelect");
  var weightInput = document.getElementById("weightInput");

  if (weekSelect.value !== "" && exerciseSelect.value !== "") {
    weightInput.disabled = false;
  } else {
    weightInput.disabled = true;
    weightInput.value = "";
  }
}

function addExercise() {
  var dateInput = document.getElementById("dateInput");
  var weekSelect = document.getElementById("weekSelect");
  var exerciseSelect = document.getElementById("exerciseSelect");
  var weightInput = document.getElementById("weightInput");
  var exerciseTable = document.getElementById("exerciseTable").getElementsByTagName("tbody")[0];

  var date = dateInput.value;
  var week = weekSelect.value;
  var exercise = exerciseSelect.value;
  var weight = weightInput.value;

  if (date && week && exercise && weight) {
    var row = exerciseTable.insertRow();
    var dateCell = row.insertCell(0);
    var weekCell = row.insertCell(1);
    var exerciseCell = row.insertCell(2);
    var weightCell = row.insertCell(3);
    var editCell = row.insertCell(4);
    var deleteCell = row.insertCell(5);

    dateCell.innerHTML = date;
    weekCell.innerHTML = week;
    exerciseCell.innerHTML = exercise;
    weightCell.innerHTML = weight;

    var editButton = document.createElement("button");
    editButton.innerHTML = "Edit";
    editButton.className = "edit-button";
    editButton.onclick = editExercise;

    var deleteButton = document.createElement("button");
    deleteButton.innerHTML = "Delete";
    deleteButton.className = "delete-button";
    deleteButton.onclick = deleteExercise;

    editCell.appendChild(editButton);
    deleteCell.appendChild(deleteButton);

    // Guardar datos en LocalStorage
    var storedData = JSON.parse(localStorage.getItem('exerciseData')) || [];
    storedData.push({ date: date, week: week, exercise: exercise, weight: weight });
    localStorage.setItem('exerciseData', JSON.stringify(storedData));

    dateInput.value = formattedDate; // Restaurar la fecha actual por defecto
    weekSelect.value = "";
    exerciseSelect.value = "";
    weightInput.value = "";
    weightInput.disabled = true;
  }
}

function clearTable() {
  var exerciseTable = document.getElementById("exerciseTable").getElementsByTagName("tbody")[0];
  exerciseTable.innerHTML = ""; // Eliminar el contenido de la tabla

  // Eliminar los datos de LocalStorage
  localStorage.removeItem('exerciseData');
}

function editExercise() {
  var row = this.parentNode.parentNode;
  var cells = row.cells;
  var rowIndex = row.rowIndex;

  for (var i = 0; i < cells.length - 2; i++) {
    var cell = cells[i];

    // Habilitar la edición de la celda
    cell.contentEditable = true;
    cell.classList.add("edit-mode");

    if (i === 0) {
      var dateValue = cell.innerHTML;
      cell.innerHTML = "<input type='date' value='" + dateValue + "'>";
    } else if (i === 1) {
      var weekValue = cell.innerHTML;
      cell.innerHTML = "<select>" +
        "<option value=''>Selecciona una semana</option>" +
        "<option value='Semana 1' " + (weekValue === "Semana 1" ? "selected" : "") + ">Semana 1</option>" +
        "<option value='Semana 2' " + (weekValue === "Semana 2" ? "selected" : "") + ">Semana 2</option>" +
        "<option value='Semana 3' " + (weekValue === "Semana 3" ? "selected" : "") + ">Semana 3</option>" +
        "<option value='Semana 4' " + (weekValue === "Semana 4" ? "selected" : "") + ">Semana 4</option>" +
        "<option value='Semana 5' " + (weekValue === "Semana 5" ? "selected" : "") + ">Semana 5</option>" +
        "<option value='Semana 6' " + (weekValue === "Semana 6" ? "selected" : "") + ">Semana 6</option>" +
        "<option value='Semana 7' " + (weekValue === "Semana 7" ? "selected" : "") + ">Semana 7</option>" +
        "<option value='Semana 8' " + (weekValue === "Semana 8" ? "selected" : "") + ">Semana 8</option>" +
        "</select>";
    } else if (i === 2) {
      var exerciseValue = cell.innerHTML;
      cell.innerHTML = "<select>" +
        "<option value=''>Selecciona un ejercicio</option>" +
        "<option value='Barbell Bench Press' " + (exerciseValue === "Barbell Bench Press" ? "selected" : "") + ">Barbell Bench Press</option>" +
        "<option value='Incline Barbell Bench Press' " + (exerciseValue === "Incline Barbell Bench Press" ? "selected" : "") + ">Incline Barbell Bench Press</option>" +
        "<option value='Dumbbell Bench Press' " + (exerciseValue === "Dumbbell Bench Press" ? "selected" : "") + ">Dumbbell Bench Press</option>" +
        "<option value='Triceps Pushdown' " + (exerciseValue === "Triceps Pushdown" ? "selected" : "") + ">Triceps Pushdown</option>" +
        "<option value='Barbell Deadlift' " + (exerciseValue === "Barbell Deadlift" ? "selected" : "") + ">Barbell Deadlift</option>" +
        "<option value='One-Arm Dumbbell' " + (exerciseValue === "One-Arm Dumbbell" ? "selected" : "") + ">One-Arm Dumbbell</option>" +
        "<option value='Lat Pulldown (Wide-Grip)' " + (exerciseValue === "Lat Pulldown (Wide-Grip)" ? "selected" : "") + ">Lat Pulldown (Wide-Grip)</option>" +
        "<option value='Leg Press Calf Raise' " + (exerciseValue === "Leg Press Calf Raise" ? "selected" : "") + ">Leg Press Calf Raise</option>" +
        "<option value='Seated Dumbbell Press' " + (exerciseValue === "Seated Dumbbell Press" ? "selected" : "") + ">Seated Dumbbell Press</option>" +
        "<option value='Dumbbell Side Lateral Raise' " + (exerciseValue === "Dumbbell Side Lateral Raise" ? "selected" : "") + ">Dumbbell Side Lateral Raise</option>" +
        "<option value='Dumbbell Rear Lateral Raise' " + (exerciseValue === "Dumbbell Rear Lateral Raise" ? "selected" : "") + ">Dumbbell Rear Lateral Raise</option>" +
        "<option value='Cable Crunch' " + (exerciseValue === "Cable Crunch" ? "selected" : "") + ">Cable Crunch</option>" +
        "<option value='Barbell Squat' " + (exerciseValue === "Barbell Squat" ? "selected" : "") + ">Barbell Squat</option>" +
        "<option value='Leg Press' " + (exerciseValue === "Leg Press" ? "selected" : "") + ">Leg Press</option>" +
        "<option value='Leg Curl (Lying or Seated)' " + (exerciseValue === "Leg Curl (Lying or Seated)" ? "selected" : "") + ">Leg Curl (Lying or Seated)</option>" +
        "<option value='Seated Calf Raise' " + (exerciseValue === "Seated Calf Raise" ? "selected" : "") + ">Seated Calf Raise</option>" +
        "<option value='Close-Grip Bench Press' " + (exerciseValue === "Close-Grip Bench Press" ? "selected" : "") + ">Close-Grip Bench Press</option>" +
        "<option value='Barbell Curl' " + (exerciseValue === "Barbell Curl" ? "selected" : "") + ">Barbell Curl</option>" +
        "<option value='Seated Triceps Press' " + (exerciseValue === "Seated Triceps Press" ? "selected" : "") + ">Seated Triceps Press</option>" +
        "<option value='Dumbbell Hammer Curl' " + (exerciseValue === "Dumbbell Hammer Curl" ? "selected" : "") + ">Dumbbell Hammer Curl</option>" +
        "<option value='Captain\'s Chair Leg Raise' " + (exerciseValue === "Captain's Chair Leg Raise" ? "selected" : "") + ">Captain's Chair Leg Raise</option>" +
        "</select>";
    }
  }

  var editButton = cells[4].getElementsByTagName("button")[0];
  editButton.innerHTML = "Save";
  editButton.onclick = saveExercise;

  var deleteButton = cells[5].getElementsByTagName("button")[0];
  deleteButton.disabled = true;
}

function saveExercise() {
  var row = this.parentNode.parentNode;
  var cells = row.cells;
  var rowIndex = row.rowIndex;

  for (var i = 0; i < cells.length - 2; i++) {
    var cell = cells[i];

    // Deshabilitar la edición de la celda
    cell.contentEditable = false;
    cell.classList.remove("edit-mode");

    if (i === 0) {
      var dateInput = cell.getElementsByTagName("input")[0];
      cell.innerHTML = dateInput.value;
    } else if (i === 1) {
      var weekSelect = cell.getElementsByTagName("select")[0];
      cell.innerHTML = weekSelect.options[weekSelect.selectedIndex].text;
    } else if (i === 2) {
      var exerciseSelect = cell.getElementsByTagName("select")[0];
      cell.innerHTML = exerciseSelect.options[exerciseSelect.selectedIndex].text;
    }
  }

  var editButton = cells[4].getElementsByTagName("button")[0];
  editButton.innerHTML = "Edit";
  editButton.onclick = editExercise;

  var deleteButton = cells[5].getElementsByTagName("button")[0];
  deleteButton.disabled = false;

  // Actualizar datos en LocalStorage
  var storedData = JSON.parse(localStorage.getItem('exerciseData')) || [];
  storedData[rowIndex - 1] = {
    date: cells[0].innerHTML,
    week: cells[1].innerHTML,
    exercise: cells[2].innerHTML,
    weight: cells[3].innerHTML
  };
  localStorage.setItem('exerciseData', JSON.stringify(storedData));
}

function deleteExercise() {
  var row = this.parentNode.parentNode;
  var rowIndex = row.rowIndex;

  // Eliminar la fila de la tabla
  document.getElementById("exerciseTable").deleteRow(rowIndex);

  // Actualizar datos en LocalStorage
  var storedData = JSON.parse(localStorage.getItem('exerciseData')) || [];
  storedData.splice(rowIndex - 1, 1);
  localStorage.setItem('exerciseData', JSON.stringify(storedData));
}
