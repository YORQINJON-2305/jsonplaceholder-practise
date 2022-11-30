// DOM
const elUserList = document.querySelector(".user-list");
const elPostList = document.querySelector(".post-list");
const elCommentList = document.querySelector(".comment-list");
const elUserTemplate = document.querySelector(".user-template").content;
const elPostTemplate = document.querySelector(".post-template").content;
const elCommentTemplate = document.querySelector(".comment-template").content;

// global fragment
const globalFragment = new DocumentFragment();

// render users
function renderUsers(arr, node){
  arr.forEach(item => {
    const templateClone = elUserTemplate.cloneNode(true);
    templateClone.querySelector(".user-post-btn").dataset.id = item.id;
    templateClone.querySelector(".user-name").textContent = item.username;
    templateClone.querySelector(".name").textContent = item.name;
    templateClone.querySelector(".gmail-link").href = `mailto:${item.email}`;
    templateClone.querySelector(".gmail-link").textContent = item.email;
    templateClone.querySelector(".user-location").href = `https://www.google.com/maps/place/${item.address.geo.lat},${item.address.geo.lng}`;
    templateClone.querySelector(".user-phone").href = `tel:${item.phone.split(" ")[0]}`;
    templateClone.querySelector(".user-website").textContent = item.website;
    templateClone.querySelector(".user-website").href = item.website;
    templateClone.querySelector(".company-name").textContent = item.company.name;
    templateClone.querySelector(".phrase-text").textContent = item.company.catchPhrase;
    templateClone.querySelector(".bs-text").textContent = item.company.bs;

    globalFragment.appendChild(templateClone);
  });

  node.appendChild(globalFragment)
}

// render posts
function renderPost(arr, node){
  node.innerHTML = "";
  arr.forEach(item => {
    const templateClone = elPostTemplate.cloneNode(true);
    templateClone.querySelector(".comment-btn").dataset.id = item.id;
    templateClone.querySelector(".post-title").textContent = item.title;
    templateClone.querySelector(".post-descr").textContent = item.body;

    globalFragment.appendChild(templateClone);
  });
  node.appendChild(globalFragment)
}

// render comments
function renderComment(arr, node){
  node.innerHTML = "";
  arr.forEach(item => {
    const templateClone = elCommentTemplate.cloneNode(true);
    templateClone.querySelector(".comment-title").textContent = item.name;
    templateClone.querySelector(".comment-descr").textContent = item.body;

    globalFragment.appendChild(templateClone);
  });
  node.appendChild(globalFragment)
}

// get users
async function getUsers(){
  try {
   const res = await fetch("https://jsonplaceholder.typicode.com/users");
   const data = await res.json();
   renderUsers(data, elUserList) 
  } catch (err) {
    console.log(err);
  }
}
getUsers();

// get posts
async function getPosts(id){
  try {
   const res = await fetch(`https://jsonplaceholder.typicode.com/posts/?userId=${id}`);
   const data = await res.json();
   renderPost(data, elPostList) 
  } catch (err) {
    console.log(err);
  }
}

// get comments
async function getComment(id){
  try {
   const res = await fetch(`https://jsonplaceholder.typicode.com/comments/?postId=${id}`);
   const data = await res.json();
   console.log(data);
   renderComment(data, elCommentList) 
  } catch (err) {
    console.log(err);
  }
}

// event delegation user list 
elUserList.addEventListener("click", (evt) => {
  if(evt.target.matches(".user-post-btn")){
    const btnId = evt.target.dataset.id;
    getPosts(btnId);
    elCommentList.innerHTML = "";
  }
});

// event delegation post list
elPostList.addEventListener("click", (evt) => {
  if(evt.target.matches(".comment-btn")){
    const btnId = evt.target.dataset.id;
    getComment(btnId)
  }
});