const h2 = document.querySelector("h2");

const url = "http://localhost:8001/users";

createNewUser();

function createNewUser() {
  const user = {
    name: "Mons Drago",
    age: 20,
    city: "New York"
  };
  const options = {
    method: "POST",
    body: JSON.stringify(user),
    headers: { "Content-type": "application/json; charset=UTF-8" }
  };

  //fetch(url, options)
  //  .then( result => h2.innerText = "hehehe");
  //  .catch( error => h2.innerText = error);

    fetch("https://api.github.com/users/moisesggomes")
    .then(result => result.json())
    .then(data => document.querySelector("h2").innerText = data.login)
}
