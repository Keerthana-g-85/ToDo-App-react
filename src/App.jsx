import { useState } from 'react'

import {
  TextField,
  Button,
  Checkbox,
  Typography,
  Container,
  Paper
} from '@mui/material'

export default function App() {

  // Stores current input value from the text field
  const [todo, setTodo] = useState('')

  // Stores all todo items as objects
  const [arrtodo, setArrtodo] = useState([])

  // Keeps track of how many tasks are completed
  const [completeTask, setComplted] = useState(0)

  // Keeps track of total number of tasks
  const [totaltask, setTotalTask] = useState(0)

  // Adds a new todo item
  function handleClick() {

    // Prevent adding empty tasks
    if (todo.trim() === '') {
      alert('dont leave it empty')
    }
    else {
      // Creating a todo object instead of storing plain text
      const newtodo = {
        text: todo,
        completed: false
      }

      // Add new task to existing list
      setArrtodo([...arrtodo, newtodo])

      // Increase total task count
      setTotalTask(prev => prev + 1)

      // Clear input after adding
      setTodo('')
    }
  }

  // Marks task as completed / uncompleted
  function handleCheck(index) {

    // Copy array to avoid directly mutating state
    const updated = [...arrtodo]

    // Toggle completed status
    updated[index].completed = !updated[index].completed

    setArrtodo(updated)

    // Update completed task counter
    if (updated[index].completed === true) {
      setComplted(prev => prev + 1)
    }
    else {
      setComplted(prev => prev - 1)
    }
  }

  // Deletes a single task
  function handleDelete(index) {
    const deleted = [...arrtodo]

    // If deleting a completed task, reduce completed count
    if (deleted[index].completed) {
      setComplted(prev => prev - 1)
    }

    // Remove selected task
    deleted.splice(index, 1)

    setArrtodo(deleted)

    // Reduce total task count
    setTotalTask(prev => prev - 1)
  }

  // Removes only completed tasks
  function handleDeleteAll() {

    const deleteall = [...arrtodo]

    // Store number of completed tasks before resetting
    const value = completeTask

    // Keep only incomplete tasks
    const remaining = deleteall.filter((data) => data.completed == false)

    setArrtodo(remaining)

    // Adjust total count after removing completed tasks
    setTotalTask(prev => prev - value)

    // Reset completed counter
    setComplted(0)
  }
  return(
    <Container maxWidth="sm">

      <Typography variant="h4" gutterBottom>Todo App</Typography>

      {/* Input field for entering task */}
      <TextField fullWidth type='text' value={todo} label='Enter Todo' onChange={e=>setTodo(e.target.value)}/>

      {/* Add task button */}
      <Button variant="contained" sx={{ marginTop:'15px' }} onClick={handleClick}>Add</Button>
      
      {/* Display all todo items */}
      {arrtodo.map((data,index)=> 
      <Paper key={index} sx={{
      padding:'10px',
      marginTop:'10px',
      display:'flex',
      justifyContent:'space-between',
      alignItems:'center' }}>
        
        {/* Checkbox to mark task completed */}
          <Checkbox checked={data.completed} onChange={()=>handleCheck(index)} />

          {/* Strike through completed task */}
          {data.completed ? <del>{data.text}</del> : data.text}

          {/* Delete individual task */}
          <Button color="error" onClick={()=>handleDelete(index)}>Delete</Button>
          </Paper>
      )}

      {/* Task progress */}
      <Typography variant="h6">Completed:{completeTask}/{totaltask}</Typography>

      {/* Delete all completed tasks */}
      <Button color="error" variant="contained" sx={{ marginTop:'10px' }} onClick={handleDeleteAll}>Delete Completed</Button>
    </Container>
  )
}