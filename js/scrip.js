let arr = [];
let indexOfEdit, cardOfEdit;
$(document).ready(() => {
  $("#Add").click(() => {
    $("#AddBtn").text("Add");
    $("#grayOut").show();
  });

  $("#CancelBtn").click(() => {
    $("#grayOut").hide();
    $("#Subject").val("");
    $("#Time").val("");
    $("#Date").val("");
    $("#Note").val("");
  });

  $("#AddBtn").click(() => {
    if (!checkDate($("#Date").val(), $("#Time").val())) {
      if (
        $("#Subject").val() != "" &&
        $("#Time").val() != "" &&
        $("#Date").val() != "" &&
        $("#Note").val() != ""
      ) {
        if ($("#AddBtn").text() == "Add") {
          checkData();
        }
        if ($("#AddBtn").text() == "Edit") {
          arr.splice(indexOfEdit, 1);
          checkData();
          cardOfEdit.remove();
          saveData();
        }
      } else alert("Missing Data");
    } else alert("Invalid Date or time");
  });

  $("#clearBtn").click(() => {
    $("#Subject").val("");
    $("#Time").val("");
    $("#Date").val("");
    $("#Note").val("");
  });
});

function checkData() {
  let obj = {
    sub: $("#Subject").val(),
    Time: $("#Time").val(),
    Date: $("#Date").val(),
    Note: $("#Note").val(),
  };
  addData(obj);
  arr.push(obj);
  saveData();
  $("#Subject").val("");
  $("#Time").val("");
  $("#Date").val("");
  $("#Note").val("");
  $("#grayOut").hide();
}

function addData(obj) {
  let card = $("<div></div>").addClass("Card");
  let SubDiv = $(`<div><h3 class="subject">${obj.sub}</h3></div>`);
  let deleteBtn = $(`<button>&#88;</button>`).click(() => {
    let index = arr.indexOf(obj);
    arr.splice(index, 1);
    saveData();
    card.remove();
  });

  let editBtn = $(`<button>&#9998;</button>`).click(() => {
    $("#AddBtn").text("Edit");
    let index = arr.indexOf(obj);
    indexOfEdit = index;
    cardOfEdit = card;
    $("#grayOut").show();
    $("#Subject").val(obj.sub);
    $("#Time").val(obj.Time);
    $("#Date").val(obj.Date);
    $("#Note").val(obj.Note);
  });

  let btnDiv = $(`<div class="buttons"></div>`).append(editBtn, deleteBtn);

  let p = $(`<p>${obj.Note}</p>`);
  let dateLabel = $(`<label>${obj.Date}</label>`);
  let timeLabel = $(`<label>${obj.Time}</label>`);
  card.append(btnDiv, SubDiv, p, dateLabel, timeLabel);
  $("#Table").append(card);
}

function getData() {
  if (localStorage.getItem("TodoList")) {
    arr = JSON.parse(localStorage.getItem("TodoList"));
    for (let i of arr) {
      addData(i);
    }
  }
}
getData();

function saveData() {
  localStorage.setItem("TodoList", JSON.stringify(arr));
}

function checkDate(d1, t1) {
  let d = new Date();
  let sd = d1.split("-");
  let st = t1.split(":");
  console.log(sd);
  if (d.getFullYear() < sd[0]) return false;
  if (d.getMonth() + 1 < sd[1]) return false;
  if (d.getDate() <= sd[2]) return false;
  if (d.getHours() < st[0]) return false;
  if (d.getMinutes() < st[1]) return false;
  else return true;
}
