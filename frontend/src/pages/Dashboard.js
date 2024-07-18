import React, { useEffect, useState } from 'react';
import axios from 'axios';
import GoalItem from '../components/GoalItem';
import { getAuthToken } from '../api';

const Dashboard = () => {
  const [goals, setGoals] = useState([]);
  const [text, setText] = useState('');

  useEffect(() => {
    const fetchGoals = async () => {
      const token = getAuthToken();
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      const res = await axios.get('http://localhost:4000/api/goals', config);
      setGoals(res.data);
    };
    fetchGoals();
  }, []);

  const addGoal = async (text) => {
    const token = localStorage.getItem('token');
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    try {
      const res = await axios.post('http://localhost:4000/api/goals', { text }, config);
      console.log(res.data);
    } catch (error) {
      console.error('Error adding goal:', error);
    }
  };

  const deleteGoal = async (id) => {
    const token = localStorage.getItem('token');
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    try {
      await axios.delete(`http://localhost:4000/api/goals/${id}`, config);
      console.log('Goal deleted');
    } catch (error) {
      console.error('Error deleting goal:', error);
    }
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <form onSubmit={addGoal}>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button type="submit">Add Goal</button>
      </form>
      <div>{goals}</div>
      <div>
        {goals.map((goal) => (
          <GoalItem key={goal._id} goal={goal} onDelete={deleteGoal} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
