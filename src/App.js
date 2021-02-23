import { isEmpty, size } from 'lodash'
import React, { useEffect, useState } from 'react'
import { addDocument, getCollection,updateDocument } from './actions';


function App() {
  const [task, setTask] = useState("")
  const [tasks, setTasks] = useState([])
  const [EditMode, setEditMode] = useState(false)
  const [id, setID] = useState("")
  const [error, setError] = useState(null)


  useEffect(() => {
    (async () => {
      const result = await getCollection("tasks")

      if (result.statusResponse) {
        setTasks(result.data)
      }
    })()
  }, [])



  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyD-FaqgZ25EknvcMFLsA2MXP3TWHT5Pvnw",
    authDomain: "crud-c4d71.firebaseapp.com",
    projectId: "crud-c4d71",
    storageBucket: "crud-c4d71.appspot.com",
    messagingSenderId: "732874891452",
    appId: "1:732874891452:web:0b3a26fc3fb1533cfd30b9",
    measurementId: "G-4VWDZJMJ0Z"
  };




  const validForm = () => {
    let isValid = true
    setError(null)

    if (isEmpty(task)) {
      setError("You must add a Task")
      isValid = false

    }
    return isValid
  }


  const addTask = async (e) => {
    e.preventDefault()

    if (!validForm()) {
      return
    }

    const result = await addDocument("tasks", { name: task })

    //const newTask = { id: shortid.generate(), name: task }

    if(!result.statusResponse){

      setError(result.error)
      return
    }  
    
    setTasks([...tasks, {id: result.data.id,name: task}])
    setTask("")

  }

  const saveTask = async (e) => {
    e.preventDefault()

    if (!validForm()) {
      return
    }

    if (isEmpty(task)) {
      console.log("Task Empty")
      return
    }


    const result = await updateDocument("tasks",id,{name: task})

    if(!result.statusResponse){
      setError(result.error)
      return
    }


   


    const editedTasks = tasks.map(item => item.id === id ? { id, name: task } : item)
    setTasks(editedTasks)
    setEditMode(false)
    setTask("")
    setID("")

  }



  const deleteTask = (id) => {
    const filteredTasks = tasks.filter(task => task.id !== id)
    setTasks(filteredTasks)
  }



  const editTask = (theTask) => {
    console.log(theTask.id)
    setTask(theTask.name)
    setEditMode(true)
    setID(theTask.id)

  }







  return (
    <div className="container mt-5">
      <h1>Task to Do</h1>
      <hr />
      <div className="row">
        <div className="col-8">
          <h4 className="text-center">List of Tasks</h4>
          {
            size(tasks) <= 0 ?
              (<li className="list-group-item">No scheduled Tasks</li>
              ) : (

                <ul className="list-group">
                  {
                    tasks.map((task) => (

                      <li className="list-group-item" key={task.id}>
                        <span className="lead">{task.name}</span>
                        <button className="btn btn-danger btn-sm float-right mx-2" onClick={() => deleteTask(task.id)}>Delete</button>
                        <button className="btn btn-warning btn-sm float-right" onClick={() => editTask(task)}>Edit</button>
                      </li>



                    ))

                  }

                </ul>
              )
          }
        </div>


        <div className="col-4">
          <h4 className="text-center">{EditMode ? "Edit Task" : "Adding Tasks"}</h4>
          <form onSubmit={EditMode ? saveTask : addTask}>
            <input type="text" className="form-control mb-2" placeholder="Ingrese la Tarea.." onChange={(text) => setTask(text.target.value)} value={task} />
            {
              error && <span className="text-danger">{error}</span>
            }
            <button className={EditMode ? "btn btn-warning btn-block" : "btn btn-dark btn-block"} type="submit">{EditMode ? "Save" : "Add"}</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default App;
