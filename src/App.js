import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';
import UserList from './components/UserList';

function App() {
  const API_URL = 'https://64a89351dca581464b85e18b.mockapi.io/users';

  const [users, setUsers] = useState([]);

  async function getUsers() {
    const response = await fetch(API_URL);
    const userData = await response.json();

    return userData;
  }

  const deleteUser = async (userId) => {
    const response = await fetch(`${API_URL}/${userId}`, {
      method: 'DELETE'
    });

    getUsers().then((value) => setUsers(value));
  }

  const updateUser = async (e) => {
    e.preventDefault();

    let id = document.getElementById("id").value;
    let name = document.getElementById("name").value;
    let jobTitle = document.getElementById("jobTitle").value;
    let companyName = document.getElementById("companyName").value;

    let user = {
      'name': name,
      'jobTitle': jobTitle,
      'companyName': companyName
    }

    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user)
    });

    getUsers().then((value) => setUsers(value));

    document.getElementById("id").value = '';
    document.getElementById("name").value = '';
    document.getElementById("jobTitle").value = '';
    document.getElementById("companyName").value = '';

    document.getElementById('createUser').style.display = 'inline';
    document.getElementById('updateUser').style.display = 'none';

    let buttons = document.querySelectorAll('table button');
    for (let b of buttons) {
        b.disabled = false;
    }
  }

  const postNewUser = async (e) => {
    e.preventDefault();

    let name = document.getElementById("name").value;
    let jobTitle = document.getElementById("jobTitle").value;
    let companyName = document.getElementById("companyName").value;

    let user = {
      'name': name,
      'jobTitle': jobTitle,
      'companyName': companyName
    }

    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user)
    });

    getUsers().then((value) => setUsers(value));

    document.getElementById("name").value = '';
    document.getElementById("jobTitle").value = '';
    document.getElementById("companyName").value = '';
  }


  useEffect(() => {
    getUsers().then((value) => setUsers(value));
  }, []);
  

  return (
    <div className="App">
      <form>
        <input type="hidden" id="id" />
        <label className="form-label">Name:</label>
        <input className="form-control" type="text" id="name" />
        <label className="form-label">Job Title:</label>
        <input className="form-control" type="text" id="jobTitle" />
        <label className="form-label">Company Name:</label>
        <input className="form-control" type="text" id="companyName" />
        <button id="createUser" className="btn btn-primary mt-3" onClick={postNewUser}>Create</button>
        <button id="updateUser" className="btn btn-primary mt-3" onClick={updateUser}>Update</button>
      </form>
      <UserList users={users} deleteUser={deleteUser} />
    </div>
  );
}

export default App;
