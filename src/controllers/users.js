const { readFileSync, writeFileSync } = require('fs');
const { resolve } = require('path');

function getData() {
  try {
    const data = readFileSync(resolve(__dirname, '..', 'data', 'users.json'));
    const usersData = JSON.parse(data);
    return usersData;
  } catch (error) {
    console.error(error);
    return { error: true, message: 'Unable to get users' };
  }
}

function saveData(usersData) {
  try {
    const data = JSON.stringify(usersData, null, 2);
    writeFileSync(resolve(__dirname, '..', 'data', 'users.json'), data);
    return { error: false, message: 'User saved' };
  } catch (error) {
    console.error(error);
    return { error: true, message: 'Unable to save' };
  }
}

class Users {
  createUser(name, email) {
    const usersData = getData();

    const exists = usersData.users.find((user) =>
      user.name === name || user.email === email
    ) ? true : false;

    if (exists)
      return JSON.stringify({
        error: true,
        message: 'User already exists'
      }, null, 2);

    const newUserData = {
      id: (Math.random()).toString(16).substr(2, 8),
      name: name,
      email: email
    }

    usersData.users.push(newUserData);

    const { error, message } = saveData(usersData);

    if (error === false)
      return JSON.stringify({ error, message, ...newUserData }, null, 2);

    return JSON.stringify({ error, message }, null, 2);
  }

  getUsers() {
    const usersData = getData();
    return JSON.stringify(usersData, null, 2);
  }

  updateUser(id, name) {
    const usersData = getData();

    const exists = usersData.users.find((user) =>
      user.id === id
    ) ? true : false;

    if (exists) {
      const user = usersData.users.find((user) => user.id === id);
      const position = usersData.users.indexOf(user);

      usersData.users[position].name = name;

      const { error, message } = saveData(usersData);

      if (error === false)
        return JSON.stringify({
          error: false,
          message: 'User updated',
          id: id,
          name: name
        }, null, 2);

      return JSON.stringify({
        error: true,
        message: message,
      }, null, 2);
    }

    return JSON.stringify({
      error: true,
      message: 'User doesn\'t exists',
    }, null, 2);
  }

  deleteUser(id) {
    const usersData = getData();

    const exists = usersData.users.find((user) =>
      user.id === id
    ) ? true : false;

    if (exists) {
      const user = usersData.users.find((user) => user.id === id);
      const position = usersData.users.indexOf(user);

      usersData.users.splice(position, 1);

      const { error, message } = saveData(usersData);

      if (error === false)
        return JSON.stringify({
          error: false,
          message: 'User deleted',
          id: id
        }, null, 2);

      return JSON.stringify({
        error: true,
        message: message,
      }, null, 2);
    }

    return JSON.stringify({
      error: true,
      message: 'User doesn\'t exists',
    }, null, 2);
  }
}

module.exports = new Users();