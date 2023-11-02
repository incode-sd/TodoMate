import React, { useState, useEffect, useRef } from 'react';
import usePreviousValue from './hooks/usePreviousValue';
import { nanoid } from 'nanoid'

import Todo from './components/Todo';
import Form from './components/Form';
import FilterButton from './components/FilterButton';

// Defining these constants the App() function 
// If they were to be defined inside it, they would be recalculated 
// every time the <App /> component re-renders, which is unneccessary
// This information will never change no matter what the application does.
const FILTER_MAP = {
  All: () => true,
  Active: (task) => !task.completed,
  Completed: (task) => task.completed
};

const FILTER_OPTIONS = Object.keys(FILTER_MAP);

function App( { data }) {
  const [tasks, setTasks] = useState(data);
  const [filter, setFilter] = useState('All');

  const listHeadingFocusRef = useRef(null);
  
  function addTask(name) {
    const newTask = { id: `todo-${nanoid()}`, name, completed: false };
    setTasks([...tasks, newTask]);
  }

  // if(id === task.id && newName) {
  //   return { ...task, name:newName }
  // }

  function editTask(id, newName) {
    const editedTaskList = tasks.map(task => {
      if(id === task.id) {
        return { ...task, name:newName }
      }
      return task
    });
    // update state
    setTasks(editedTaskList);
  }

  function deleteTask(id) {
    const remainingTasks = tasks.filter(task => task.id !== id);
    // update state
    setTasks(remainingTasks);
  }

  function toggleTaskCompleted(id) {
    // checking for a'checked' task
    const updatedTasks = tasks.map(task => {
      if(id === task.id) {
        return { ...task, completed: !task.completed }
      }
      return task
    });
    // update state
    setTasks(updatedTasks);
  }

  // filter the task list to render appropriate UI of 
  // selected filter option
  const taskList = tasks
  .filter(FILTER_MAP[filter])
  .map(({id, name, completed }) => (
    <Todo
      id={id}
      name={name}
      completed={completed}
      key={id}
      toggleTaskCompleted={toggleTaskCompleted}
      deleteTask={deleteTask}
      editTask={editTask}
    />
  ));

  const filterList = FILTER_OPTIONS.map(filterOption => (
    <FilterButton 
      filterOption={filterOption}
      key={filterOption}
      isPressed={filterOption === filter}
      setFilter={setFilter}
    />
  ));

  const tasksNoun = tasks.length > 1 ? 'tasks' : 'task';
  const headingText = `${tasks.length} ${tasksNoun} remaining`;
  
  // tracking the length of the tasks
  // using the custom hook which keeps 
  // track of the previous tasks.length value
  const prevTaskLength = usePreviousValue(tasks.length);

  useEffect(() => {
    if(tasks.length - prevTaskLength === -1) {
      listHeadingFocusRef.current.focus();
    }
  }, [tasks.length, prevTaskLength]);

  return (
    <>
      <div className="todoapp stack-large">
        <h1>TodoMatic</h1>
        <Form addTask={addTask}/>
        <div className="filters btn-group stack-exception">
          {filterList}
        </div>
        <h2 
          id="list-heading"
          ref={listHeadingFocusRef}
          tabIndex="-1"
        >{headingText}</h2>
        <ul
          // redundant https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/main/docs/rules/no-redundant-roles.md
          // role="list"
          className="todo-list stack-large stack-exception"
          aria-labelledby="list-heading"
        >
          {taskList}
        </ul>
      </div>
    </>
  );
}

export default App;
