# TodoMatic - To Do list app

## App User Stories

As a user one can:

- read a list of tasks.
- add a task using the mouse or keyboard.
- mark any task as completed, using the mouse or keyboard.
- delete any task, using the mouse or keyboard.
- edit any task, using the mouse or keyboard.
- view a specific subset of tasks: All tasks, only the active task, or only the completed tasks.

## App Functionality

- Componentizing the App
- React Interactivity:
  - Events and State
  - Editing & Filtering tasks
    - Interactive filter options that filter the tasks in the UI
  - Conditional Rendering the UI
    - View Template
    - Editing Template

## Accessibility Features

```jsx
<button type="button" className="btn toggle-btn" aria-pressed="true">
  <span className="visually-hidden">Show </span>
  <span>all</span>
  <span className="visually-hidden"> tasks</span>
</button>
```

`aria-pressed` tells assistive technology (like screen readers) that the button can be in one of two states: `pressed` or `unpressed`. True booleans in JSX are enclosed in curly braces without string literals

With the `.visually-hidden` class, elements will be from sighted users and still available to screen reader users. They provide more information to screen reader users

### Focus Management

Implementing keyboard accessibility in React by ensuring the app is usable by `keyboard` and not just by `mouse`

Improve the User's experience managing the browser's `focus` in between templates by using the `useRef` hook

When a user toggles a `<Todo/>` template from viewing to editing, the focus should be on the `<input>` used to rename it; when they toggle back from editing to viewing, the focus should move back to the **"Edit"** button.

The ref constants are created in `Todo.js` for the:

- **Edit** button in the view template
- **edit field** in the editing template

```javascript
const editFieldFocusRef = useRef(null);
const editButtonFocusRef = useRef(null);
```

```jsx
<div className="form-group">
  <label className="todo-label" htmlFor={id}>
    New name for {name}
  </label>
  <input
    ref={editFieldFocusRef} // attach the ref attribute to the respective element
    id={id}
    className="todo-text"
    type="text"
    value={newName}
    onChange={handleChange}
  />
</div>

<button
  ref={editButtonFocusRef} // attach the ref attribute to the respective element
  type="button"
  className="btn todo-cancel"
  onClick={() => setIsEditing(false)}
>
```

Another ref constant is created in `App.js` for the:

- Focus to shift to the **list heading** whenever a user deletes a task

```javascript
const listHeadingFocusRef = useRef(null);
```

```jsx
<h2 id="list-heading" ref={listHeadingFocusRef} tabIndex="-1">
  {headingText}
</h2>
```

The `<h2>` element can become focusable by add the `tabindex="-1"` attribute to it [tabindex MDN web Docs](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex "Read docs")

---

## Caveats on using the tabIndex on non-interactive elements

**_This `-1` tabIndex value means the element is only focusable with JavaScript_**

**_That means the element will be skipped when the user tabs through the elements on the page using the `tab key` as it's not in the normal tab order_**

**_This is typically used for elements that should be focusable by scripts, but are not interactive components that users should be able to tab to directly._**

---

## Learning Objectives

- User stories
- Componentizing the App
- Handling Events
- Variables & Props
- Callback Props(Passing Functions as props from parent to child component)
- Hooks
- `useState` & `useRef` hooks
- Controlled Components

## Misc

Installed the tiny [nanoid library](https://github.com/ai/nanoid "Read Docs") in order to generate unique string IDs

Developed courtesy of [MDN Web docs React](https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks/React_getting_started "Read docs") tutorial with a few tweaks
