import { saveTask,
  onGetTasks,
  deleteTask,
  getTask,
  updateTask,
  signIn,
  signOutUser,
  getImageProfile,
  observerCount,
  getNameProfile,
  getUidProfile
 } from "./firebase.js"
const container = document.getElementById('task-container')
const imgProfile = document.getElementById('imgProfile')

let editStatus = false
let id = ''
let uid = ''

window.addEventListener('DOMContentLoaded', async () => {
  
})



const taskForm = document.getElementById('task-form')

taskForm.addEventListener('submit', (e) => {
  e.preventDefault()

  const title = taskForm['task-title']
  const description = taskForm['task-description']

  if(!editStatus){
    saveTask(title.value, description.value, uid)
  } else {
    updateTask(id, {
      title: title.value,
      description: description.value,
    })
    editStatus = false
  }
  
  taskForm.reset()
})

const btnSignIn = document.getElementById('btn-signIn')

btnSignIn.addEventListener('click', async (e) => {
  await signIn()
})

const btnSignOut = document.getElementById('btn-signOut')

btnSignOut.addEventListener('click', (e) => {
  signOutUser()
})

const btnViewPhoto = document.getElementById('btn-viewPhoto')

btnViewPhoto.addEventListener('click', async () => {
  console.log(getImageProfile())
})

observerCount((user) => {
  if(user) {
    imgProfile.innerHTML = `
      <img src=${getImageProfile()} style='border-radius : 50%; margin: 20px'>
      <h2>${getNameProfile()}</h2>
    `;
    uid = getUidProfile()
    onGetTasks(uid, (querySnapshot) => {
      let html = ''
      querySnapshot.forEach(element => {
        let task = element.data()
        html += `
          <h3>${task.title}</h3>
          <p>${task.description}</p>
          <button class='btn-delete' data-id="${element.id}">Delete</button>
          <button class='btn-edit' data-id="${element.id}">Edit</button>
        `
      });
      container.innerHTML = html
  
      const btnsDelete = container.querySelectorAll('.btn-delete')
      btnsDelete.forEach((btn) => {
        btn.addEventListener('click', (e) => {
          deleteTask(e.target.dataset.id)
          
        })
      })
  
      const btnEdit = document.querySelectorAll('.btn-edit')
      btnEdit.forEach(btn => {
        btn.addEventListener('click', async (e) => {
          const doc = await getTask(e.target.dataset.id)
          const task = doc.data()
  
          taskForm['task-title'].value = task.title
          taskForm['task-description'].value = task.description
  
          editStatus = true
          id = e.target.dataset.id
          taskForm['btn-task-save'].innerText = 'Update'
        })
      });
    })
  } else {
    imgProfile.innerHTML = ''
    uid = ''
    container.innerHTML = ''
  }
})
