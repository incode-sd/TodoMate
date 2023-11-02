import React, { useState, useRef, useEffect } from 'react';
import usePreviousValue from '../hooks/usePreviousValue';

function Todo({ name, completed, id, toggleTaskCompleted, deleteTask, editTask }) {
  const[isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState('');

  const editFieldFocusRef = useRef(null);
  const editButtonFocusRef = useRef(null);

  
  /**
   * Getting the components previous state value since
   * without the below hook, focus works on the view
   * template on render however it points to the last 
   * task in state meaning tasks.at(-1).  We implement the following
   * hook so that the focus is dependent on isEditing changing
   * from one value to the next
   * https://legacy.reactjs.org/docs/hooks-faq.html#how-to-get-the-previous-props-or-state
   */

  // tracks the previous value of isEditing
  const wasEditing = usePreviousValue(isEditing);

  function handleChange(e) {
    setNewName(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    editTask(id, newName);
    // clear input field
    setNewName('');
    setIsEditing(false);
  }

  const editingTemplate = (
    <form 
      className="stack-small"
      onSubmit={handleSubmit}
    >
      <div className="form-group">
        <label className="todo-label" htmlFor={id}>
          New name for {name}
        </label>
        <input 
          ref={editFieldFocusRef}
          id={id} 
          className="todo-text" 
          type="text" 
          value={newName}
          onChange={handleChange}
        />
      </div>
      <div className="btn-group">
        <button 
          type="button" 
          className="btn todo-cancel"
          onClick={() => setIsEditing(false)}
        >
          Cancel
          <span className="visually-hidden">renaming {name}</span>
        </button>
        <button type="submit" className="btn btn__primary todo-edit">
          Save
          <span className="visually-hidden">new name for {name}</span>
        </button>
      </div>
    </form>
  );

  const viewTemplate = (
    <div className="stack-small">
      <div className="c-cb">
          <input
            id={id}
            type="checkbox"
            defaultChecked={completed}
            onChange={() => toggleTaskCompleted(id)}
          />
          <label className="todo-label" htmlFor={id}>
            {name}
          </label>
        </div>
        <div className="btn-group">
          <button 
            ref={editButtonFocusRef}
            type="button" 
            className="btn"
            onClick={() => setIsEditing(true)}
          >
            Edit <span className="visually-hidden">{name}</span>
          </button>
          <button
            type="button"
            className="btn btn__danger"
            onClick={() => deleteTask(id)}
          >
            Delete <span className="visually-hidden">{name}</span>
          </button>
        </div>
    </div>
  );
  
  useEffect(() => {
    // was not isEditing before and is isEditing now
    if(!wasEditing && isEditing) {
      // focus on the edit input field when switching to the editing template
      editFieldFocusRef.current.focus();
    }

    // was isEditing before and is not isEditing now
    if(wasEditing && !isEditing) {
      // focus on the Edit button when switching to the view template
      editButtonFocusRef.current.focus();
    }
  }, [wasEditing, isEditing]);

  return (
    <>
      <li className="todo stack-small">
        { isEditing ? editingTemplate : viewTemplate }
      </li>
    </>
  );
}

export default Todo;
