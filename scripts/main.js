const listeTaches = document.querySelector('#listeTaches')
const addTaskButton = document.querySelector('#ajouterTache')
const defautText = 'tache'
let taskList = []

init()
addTaskButton.addEventListener('click', function(e){
  createTask(defautText)
  saveTasks()
})


function createTask(text)
{
  const div = document.createElement('div')
  div.classList.add('tache')

  const divContent = document.createElement('div')
  divContent.classList.add('tacheContenu')
  divContent.setAttribute('contenteditable','true')
  divContent.innerHTML = text

  const resetButton = document.createElement('a')
  resetButton.classList.add('tacheInit')
  resetButton.setAttribute('href','#')
  resetButton.setAttribute('title','reset')
  resetButton.innerHTML = 'reset'

  const deleteButton = document.createElement('a')
  deleteButton.classList.add('tacheSupprimer')
  deleteButton.setAttribute('href','#')
  deleteButton.setAttribute('title','delete')
  deleteButton.innerHTML = 'delete'

  const clearBoth = document.createElement('div')
  clearBoth.classList.add('clearBoth')

  listeTaches.appendChild(div)
  div.appendChild(divContent)
  div.appendChild(resetButton)
  div.appendChild(deleteButton)
  div.appendChild(clearBoth)

  resetButton.addEventListener('click', function(){
    divContent.innerHTML = defautText
    saveTasks()
  })

  deleteButton.addEventListener('click', function(){
    listeTaches.removeChild(div)
    saveTasks()
  })

  divContent.addEventListener('blur',saveTasks)


}

function saveTasks(){
  let tasks = document.querySelectorAll(".tacheContenu")
  taskList = new Array()
  for (var i = 0; i < tasks.length; i++) {
    taskList.push(tasks[i].innerHTML)
  }
  console.log(taskList)
  let temp = JSON.stringify(taskList)
  localStorage.setItem('localTaskList', temp)
}

function init()
{
  if(localStorage.getItem('localTaskList')!=null)
  {
    taskList = localStorage.getItem('localTaskList')
    taskList = JSON.parse(taskList)
    for (var i = 0; i < taskList.length; i++) {
      createTask(taskList[i])
    }
  }
}
