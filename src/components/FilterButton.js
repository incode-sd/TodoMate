import React from 'react';

function FilterButton({ filterOption, isPressed, setFilter}) {
  return (
    <>
      <button 
        type="button" 
        className="btn toggle-btn" 
        aria-pressed={isPressed}
        onClick={() => setFilter(filterOption)}
      >
        <span className="visually-hidden">Show </span>
        <span>{filterOption}</span>
        <span className="visually-hidden"> tasks</span>
      </button>
    </>
  );
}

export default FilterButton;

