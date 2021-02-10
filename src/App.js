import { isEmpty, size } from 'lodash'
import React, { useState } from 'react'
import shortid from 'shortid'

function App() {
  const [task, setTask] = useState("")
  const [tasks, setTasks] = useState([])
  const [EditMode, setEditMode] = useState(false)
  const [id, setID] = useState("")

  const addTask = (e) => {
    e.preventDefault()

    if (isEmpty(task)) {
      console.log("Task Empty")
      return
    }

    const newTask = { id: shortid.generate(), name: task }

    setTasks([...tasks, newTask])
    setTask("")

  }

  const saveTask = (e) => {
    e.preventDefault()

    if (isEmpty(task)) {
      console.log("Task Empty")
      return
    }


    const editedTasks = tasks.map(item => item.id === id ? { id, name: task } : item)
    setTask(editedTasks)
    setEditMode(false)
    setTask("")
    setID("")

  }



  const deleteTask = (id) => {
    const filteredTasks = tasks.filter(task => task.id !== id)
    setTasks(filteredTasks)
  }



  const editTask = (theTask) => {
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
              (<h5 className="text-center">No scheduled Tasks</h5>
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
            <button className={EditMode ? "btn btn-warning btn-block" : "btn btn-dark btn-block"} type="submit">{EditMode ? "Save" : "Add"}</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default App;
