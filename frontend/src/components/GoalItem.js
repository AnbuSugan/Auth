import React from 'react';

const GoalItem = ({ goal, onDelete }) => {
  return (
    <div>
      <h3>{goal.text}</h3>
      <button onClick={() => onDelete(goal._id)}>Delete</button>
    </div>
  );
};

export default GoalItem;
