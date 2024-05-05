import React, { useState } from 'react';

function SetExample() {
  // Define a state variable to hold the set
  const [mySet, setMySet] = useState(new Set());

  // Function to add an item to the set
  const addItemToSet = (item) => {
    const updatedSet = new Set(mySet);
    updatedSet.add(item);
    setMySet(updatedSet);
  };

  // Function to remove an item from the set
  const removeItemFromSet = (item) => {
    const updatedSet = new Set(mySet);
    updatedSet.delete(item);
    setMySet(updatedSet);
  };

  return (
    <div>
      <h1>Set Example</h1>
      <button onClick={() => addItemToSet('Item 1')}>Add Item 1</button>
      <button onClick={() => addItemToSet('Item 2')}>Add Item 2</button>
      <button onClick={() => addItemToSet('Item 3')}>Add Item 3</button>
      <button onClick={() => removeItemFromSet('Item 1')}>Remove Item 1</button>
      <button onClick={() => removeItemFromSet('Item 2')}>Remove Item 2</button>
      <button onClick={() => removeItemFromSet('Item 3')}>Remove Item 3</button>
      <div>
        <h2>Set Content:</h2>
        <ul>
          {[...mySet].map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default SetExample;
