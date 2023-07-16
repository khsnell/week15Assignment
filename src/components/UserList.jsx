import React from 'react';

function updateSetup(user) {
    document.getElementById('createUser').style.display = 'none';
    document.getElementById('updateUser').style.display = 'inline';

    document.getElementById('id').value = user.id;
    document.getElementById('name').value = user.name;
    document.getElementById('jobTitle').value = user.jobTitle;
    document.getElementById('companyName').value = user.companyName;

    let buttons = document.querySelectorAll('table button');
    for (let b of buttons) {
        b.disabled = true;
    }

}

export default function UserList(props) {
    let output = [];
    
    for (let user of props.users) {
        output.push(
            <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.jobTitle}</td>
                <td>{user.companyName}</td>
                <td>
                    <button className="btn btn-primary" onClick={() => {updateSetup(user)}}>Update</button>
                </td>
                <td>
                    <button className="btn btn-danger" onClick={() => {props.deleteUser(user.id)}}>Delete</button>
                </td>
            </tr>    
        );
    }

    return (
        <table className="table table-striped mt-5">
            <thead>
                <tr className="table-info">
                    <th>Name:</th>
                    <th>Job Title:</th>
                    <th>Company Name:</th>
                    <th></th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {output}
            </tbody>
        </table>
    );
}