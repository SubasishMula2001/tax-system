const panregex = /([A-Z]){5}([0-9]){4}([A-Z]){1}$/
// const { response } = require('express');
const fetch = require('node-fetch')
var RandExp = require('randexp');
const request = require('request')
const url = `http://localhost:${proccess.env.PORT}/api/v1`;
function getTestUser(role) {
    const payer = {
        username: (Math.floor(Math.random() * 100000) + 100).toString(),
        name: "Test Payer",
        password: "test",
        state: "UP",
        age: "25",
        panId: new RandExp(panregex).gen(),
        role: role
    }
    return payer;
}
async function addUserToDB(role) {
    const user = getTestUser(role);
    console.log('adding to db', user)
    let status;
    fetch(url + '/auth/new', { method: 'POST', body: JSON.stringify(user), headers: { 'Content-Type': 'application/json' } })
        .then(res => {
            status = res.status
            return res.json();
        })
        .then((jsonResponse) => {
            // console.log(jsonResponse);
            // console.log(status);
        })
        .catch((err) => {
            console.error(err);
        });
    return user;

}
async function getUserToken(user) {
    console.log('user obj',user)
    let status;
    fetch(url + '/auth/login', { method: 'POST', body: JSON.stringify(user), headers: { 'Content-Type': 'application/json' } })
        .then(res => {
            status = res.status
            console.log(res.json())
            return res.json();
        })
        .then((jsonResponse) => {
            // console.log(jsonResponse);
            // console.log(status);
        })
        .catch((err) => {
            // handle error
            console.error(err);
        });


}
// console.log(getTestUser('Accountant'))
module.exports = { getTestUser, getUserToken, addUserToDB }
