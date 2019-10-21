// // your code goes here ...

var body = document.getElementsByTagName("body")[0]

body.onload = function () {
  // get add buutton and and trigger function

  var Add = document.querySelector("button.add");
  Add.addEventListener("click", addPerson);

  // get submit button and call server

  var Submit = document.querySelector("button[type=submit]");
  Submit.addEventListener("click", serializeList);
}




function getrelaitionship() {

  
  // get the select.
  var relationshipSelect = document.querySelector("select[name=rel]");

  // get the relationship.
  var relationship = relationshipSelect.value;
  return relationship;
}


// add person

function addPerson(event) {



  event.preventDefault();



  var age = getage();
  if (age <= 0 || isNaN(age)) {
    alert("Please enter valid age");
    return;
  }

  // relaitionship

  var relationship = getrelaitionship();
  if (relationship === "") {
    alert("Please select relationship");
    return;
  }

  // smocker value

  var smoker = isSmoker() ? "Smoker" : "Non-Smoker";

  // get the ordered list.
  var household = document.querySelector("ol.household");

  // create list.

  var person = document.createElement("li");
  person.textContent = relationship + " " + age + " " + smoker + " ";

  // Remove Button

  var button = document.createElement("button");
  button.textContent = "x";
  button.type = "button";

  button.addEventListener("click", function () { this.parentNode.remove(); });
  person.appendChild(button);
  household.appendChild(person);
}


function isSmoker() {


  var smokerInput = document.querySelector("input[name=smoker]");


  return smokerInput.checked;
}


function getage() {

  var ageInput = document.querySelector("input[name=age]");

  // geting Age.
  var age = Number(ageInput.value);
  return age;
}
function serializeList(event) {

  event.preventDefault();

  // get household
  var household = document.querySelector("ol.household");
  var members = { household: [] };
  for (var i = 0; i < household.children.length; ++i) {


    person = household.children[i].textContent.split(" ");

    member = {};
    member.relationship = person[0];
    member.age = Number(person[1]);
    member.smoker = person[2] === "smoker";
    members.household.push(member);

  }

  // get the debug element.
  var debug = document.querySelector("pre.debug");


  debug.style.display = "block";
  debug.textContent = JSON.stringify(members, null, 2);
}