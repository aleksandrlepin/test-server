const select = (el) => {
  return document.querySelector(el);
}

// begin render function
const render = (what, where) => {
  if(Array.isArray(what) === false) {
    console.error('Render method expexted array');
    return;
  }

  let items = ``;
  let userList;

  for (let i = 0; i < what.length; i++) {
    const element = what[i];
    items = items + `
      <li>
        <span> id: ${element.id}, </span>
        <span> name: ${element.name}, </span>
        <span> score: ${element.score}</span>
      </li>
    `;
  }

  userList = `
    <h3>
      Userlist from http://localhost:3000/posts
    </h3>
    <ul>
      ${items}
    </ul>
  `;

  where.innerHTML = userList;
}
// end render function

// begin get users reques
let xhrGet = new XMLHttpRequest();

xhrGet.getUsers = function () {
  this.onreadystatechange = () => {
    if (this.readyState === 4) {
      render(JSON.parse(this.responseText), usersContainer);
    }
  }
  this.open('GET', 'http://localhost:3000/posts', true);
  this.send();
}
// end get users request


// begin add user request
let xhrPost = new XMLHttpRequest();

xhrPost.addUser = function () {
  let userName = userNameAdd.value.trim();
  let userScore = userScoreAdd.value.trim();

  if (userName === '' || userScore === '') {
    alert('Insert user name and user score.');
    return
  }

  this.onreadystatechange = () => {
    if(this.readyState === 4) {
      userNameAdd.value = '';
      userScoreAdd.value = '';
      xhrGet.getUsers();
    }
  }

  this.open('POST', `http://localhost:3000/posts`, true);
  this.setRequestHeader('Content-Type', 'application/json');
  this.send(JSON.stringify({ name: userName, score: userScore}));
}
// end add users request

// begin remove user request
let xhrDelete = new XMLHttpRequest();

xhrDelete.rmUser = function () {
  if (userIdDel.value === '') {
    alert('Insert user ID.');
    return;
  }
  let userId = userIdDel.value.trim();

  this.onreadystatechange = () => {
    if (this.readyState === 4) {
      userIdDel.value = '';
      xhrGet.getUsers();
    }
    if (this.readyState === 4 && this.status === 404) {
      alert(`User with id ${userId} doesn't exist.`);
    }
  }

  this.open('DELETE', `http://localhost:3000/posts/${userId}`, true);
  this.send();
}
// end remove users request

// begin update user request
let xhrUpdate = new XMLHttpRequest();

xhrUpdate.updUser = function () {
  let userId = userIdUpd.value.trim();
  let userName = userNameUpd.value.trim();
  let userScore = userScoreUpd.value.trim();

  if (userId === '' || userName === '' || userScore === '') {
    alert('Insert Id, name and score to update user.')
  }

  this.onreadystatechange = () => {
    if (this.readyState === 4) {
      userId = '';
      userName = '';
      userScore = '';
      xhrGet.getUsers();
    }
  }

  xhrUpdate.open('PUT', `http://localhost:3000/posts/${userId}`, true);
  xhrUpdate.setRequestHeader('Content-Type', 'application/json');
  xhrUpdate.send(JSON.stringify({ name: userName, score: userScore }));
}
// end update user request

// begin patch user request
let xhrPatch = new XMLHttpRequest();

xhrPatch.patchUser = function () {
  let userId = userIdUpd.value.trim();
  let userName = userNameUpd.value.trim();
  let userScore = userScoreUpd.value.trim();

  // if (userId === '' || userName === '' || userScore === '') {
  //   alert('Insert Id, name and score to update user.')
  // }

  this.onreadystatechange = () => {
    console.log('sssssssssssssssssssss', this.readyState);
    // console.log('headers', xhrPatch.getAllResponseHeaders());
    if (this.readyState === 4) {
      userId = '';
      userName = '';
      userScore = '';
      xhrGet.getUsers();
    }
  }

  xhrPatch.open('PATCH', `http://localhost:3000/posts/1`, true);
  xhrPatch.setRequestHeader('Content-Type', 'application/merge-patch+json');
  xhrPatch.send(JSON.stringify({ op: 'replace', path: '/name', value: 'rurururururu' }));
}
// end patch user request



const boundGetUsers = xhrGet.getUsers.bind(xhrGet);
addEventListener('DOMContentLoaded', boundGetUsers);

const boundAddUser = xhrPost.addUser.bind(xhrPost);
addUserBtn.addEventListener('click', boundAddUser);

const boundRmUser = xhrDelete.rmUser.bind(xhrDelete);
rmUserBtn.addEventListener('click', boundRmUser);

const boundUpdUser = xhrUpdate.updUser.bind(xhrUpdate);
updUserBtn.addEventListener('click', boundUpdUser);

const boundPatchUser = xhrPatch.patchUser.bind(xhrPatch);
patchUserBtn.addEventListener('click', boundPatchUser);
