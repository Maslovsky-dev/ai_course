class User {
    constructor(id, firstName, lastName, age, email, password, roles) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = age;
        this.email = email;
        this.password = password;
        this.roles = roles;
    }
}

const url = 'http://localhost:8080/users/';

function showCreateError(message) {
    const errorBlock = document.getElementById('newUserErrors');
    if (!errorBlock) {
        alert(message);
        return;
    }
    errorBlock.textContent = message;
    errorBlock.classList.remove('d-none');
}

function clearCreateError() {
    const errorBlock = document.getElementById('newUserErrors');
    if (errorBlock) {
        errorBlock.textContent = '';
        errorBlock.classList.add('d-none');
    }
}

function getAllUsers() {
    fetch(url)
        .then(response => response.json())
        .then(users => {
            const tbody = document.getElementById('usersTable');
            tbody.innerHTML = '';
            users.forEach(user => {
                const row = document.createElement('tr');
                const rolesStr = user.roles.map(role => role.roleName).join(', ');
                row.innerHTML = `
                    <td>${user.id}</td>
                    <td>${user.firstName}</td>
                    <td>${user.lastName}</td>
                    <td>${user.age}</td>
                    <td>${user.email}</td>
                    <td>${rolesStr}</td>
                    <td><button class="btn btn-info btn-sm edit-btn">Edit</button></td>
                    <td><button class="btn btn-danger btn-sm delete-btn">Delete</button></td>
                `;
                tbody.appendChild(row);
            });
        })
        .catch(error => console.error(error));
}

function getUser(id, callback) {
    fetch(url + id)
        .then(response => response.json())
        .then(user => callback(user, id))
        .catch(error => console.error(error));
}

function newUser(event) {
    event.preventDefault();
    clearCreateError();
    const roleSelect = document.getElementById('roleSelect');
    const roles = Array.from(roleSelect.selectedOptions).map(option => ({roleName: option.value}));
    const user = {
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        age: document.getElementById('age').value === '' ? null : Number(document.getElementById('age').value),
        email: document.getElementById('email').value,
        password: document.getElementById('Password').value,
        roles: roles
    };
    fetch(url, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(user)
    })
        .then(response => {
            if (response.ok) {
                console.log('New user created!');
                getAllUsers();
                document.getElementById('tab1-tab').click();
                document.getElementById('newUserForm').reset();
                clearCreateError();
            } else {
                return response.json()
                    .then(error => {
                        console.error('Error creating user:', error);
                        showCreateError(error.message || 'Error creating user');
                    });
            }
        })
        .catch(error => {
            console.error('Error creating user:', error);
            showCreateError('Error creating user');
        });
}

function editProcessing(user, id) {
    document.getElementById('editId').value = user.id;
    document.getElementById('editfirstName').value = user.firstName;
    document.getElementById('editlastName').value = user.lastName;
    document.getElementById('editage').value = user.age;
    document.getElementById('editemail').value = user.email;
    document.getElementById('editpassword').value = user.password;

    const roleSelect = document.getElementById('editroleSelect');
    Array.from(roleSelect.options).forEach(option => option.selected = false);
    user.roles.forEach(role => {
        Array.from(roleSelect.options).forEach(option => {
            if (option.value === role.roleName) {
                option.selected = true;
            }
        });
    });
}

function deleteProcessing(user, id) {
    document.getElementById('deleteId').value = user.id;
    document.getElementById('deletefirstName').value = user.firstName;
    document.getElementById('deletelastName').value = user.lastName;
    document.getElementById('deleteage').value = user.age;
    document.getElementById('deleteemail').value = user.email;
    document.getElementById('deletepassword').value = user.password;

    const roleSelect = document.getElementById('deleteroleSelect');
    Array.from(roleSelect.options).forEach(option => option.selected = false);
    user.roles.forEach(role => {
        Array.from(roleSelect.options).forEach(option => {
            if (option.value === role.roleName) {
                option.selected = true;
            }
        });
    });
}

document.addEventListener('DOMContentLoaded', function() {
    getAllUsers();

    const newUserForm = document.getElementById('newUserForm');
    if (newUserForm) {
        newUserForm.addEventListener('submit', newUser);
    }

    const usersTable = document.getElementById('usersTable');
    if (usersTable) {
        usersTable.addEventListener('click', function(event) {
            if (event.target.classList.contains('edit-btn') || event.target.classList.contains('delete-btn')) {
                const row = event.target.closest('tr');
                const id = Number(row.cells[0].textContent);
                if (event.target.classList.contains('edit-btn')) {
                    getUser(id, function(user, userId) {
                        editProcessing(user, userId);
                        $('#editModal').modal('show');
                    });
                } else if (event.target.classList.contains('delete-btn')) {
                    getUser(id, function(user, userId) {
                        deleteProcessing(user, userId);
                        $('#deleteModal').modal('show');
                    });
                }
            }
        });
    }

    const editBtn = document.getElementById('editBtn');
    if (editBtn) {
        editBtn.addEventListener('click', function() {
            const id = document.getElementById('editId').value;
            const roleSelect = document.getElementById('editroleSelect');
            const roles = Array.from(roleSelect.selectedOptions).map(option => ({roleName: option.value}));
            const updatedUser = {
                id: Number(id),
                firstName: document.getElementById('editfirstName').value,
                lastName: document.getElementById('editlastName').value,
                age: Number(document.getElementById('editage').value),
                email: document.getElementById('editemail').value,
                password: document.getElementById('editpassword').value,
                roles: roles
            };
            fetch(url + id, {
                method: 'PATCH',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(updatedUser)
            })
                .then(response => {
                    if (response.ok) {
                        $('#editModal').modal('hide');
                        getAllUsers();
                    } else {
                        console.error('Error updating user:', response);
                        alert('Error updating user');
                    }
                })
                .catch(error => {
                    console.error('Error updating user:', error);
                    alert('Error updating user');
                });
        });
    }

    const deleteBtn = document.getElementById('deleteBtn');
    if (deleteBtn) {
        deleteBtn.addEventListener('click', function() {
            const id = document.getElementById('deleteId').value;
            fetch(url + id, {
                method: 'DELETE'
            })
                .then(response => {
                    if (response.ok) {
                        $('#deleteModal').modal('hide');
                        getAllUsers();
                    } else {
                        console.error('Error updating user:', response);
                        alert('Error updating user');
                    }
                })
                .catch(error => {
                    console.error('Error updating user:', error);
                    alert('Error updating user');
                });
        });
    }
});
