const p = document.querySelector("p");
const post = document.querySelector("#post");
const put = document.querySelector("#put");
const del = document.querySelector("#delete");

const url = "http://172.24.235.82:8001/users";

post.addEventListener("click", (e) => {
  const user = {
    name: document.querySelector("#name").value,
    age: document.querySelector("#age").value,
    city: document.querySelector("#city").value
  };
  createNewUser(user);
});
put.addEventListener("click", (e) => {
  const body = {
    id: document.querySelector("#id_put").value,
    target: document.querySelector("#data").value,
    newValue: document.querySelector("#value").value
  }
  if (body.target == "age") {
    body.newValue = Number(body.newValue);
  }
  updateUserInfo(body);
});
del.addEventListener("click", (e) => {
  deleteUser(document.querySelector("#id_delete").value);
})

function createNewUser(user) {
  const options = {
    method: "POST",
    body: JSON.stringify(user),
    headers: { "Content-type": "application/json;charset=UTF-8" }
  };
  fetch(url, options)
  .then(result => result.text())
  .then(data => p.innerText = data)
  .catch(error => console.log(error));
}

function updateUserInfo(body) {
  const options = {
    method: "PUT",
    body: JSON.stringify(body),
    headers: { "Content-type": "application/json;charset=UTF-8" }
  };
  fetch(url, options)
    .then(result => result.text())
    .then(data => p.innerText = data)
    .catch(error => console.log(error));
}

function deleteUser(id) {
  const options = {
    method: "DELETE"
  };
  fetch(`${url}/${id}`, options)
    .then(result => result.text())
    .then(data => p.innerText = data)
    .catch(error => console.log(error));
}