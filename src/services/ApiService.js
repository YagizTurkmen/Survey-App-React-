const appConfig = require('../appConfig.json');

const ApiService = {

    getSurveys: async function () {

        const result = await fetch(appConfig.apiURL + '/api/Survey/', {
            method: 'get',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + appConfig.auth_token
            })
        }).then(res => res.json())

        return result;
    },

    getSurvey: async function (ID) {

        const result = await fetch(appConfig.apiURL + '/api/Survey/' + ID, {
            method: 'get',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + appConfig.auth_token
            })
        }).then(res => res.json())

        return result;
    },

    createSurvey: async function (Name) {

        const result = await fetch(appConfig.apiURL + '/api/Survey/', {
            method: 'post',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + appConfig.auth_token
            }),
            body: JSON.stringify({ "Name": Name })
        }).then(res => res.json())

        return result;
    },

    updateSurvey: async function (ID, Name) {

        const result = await fetch(appConfig.apiURL + '/api/Survey/' + ID, {
            method: 'put',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + appConfig.auth_token
            }),
            body: JSON.stringify({ "ID": ID, "Name": Name })
        }).then(res => res.json())

        return result;
    },

    deleteSurvey: async function (ID) {

        const result = await fetch(appConfig.apiURL + '/api/Survey/' + ID, {
            method: 'delete',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + appConfig.auth_token
            }),
            body: JSON.stringify({ "ID": ID })
        }).then(res => res.json())

        return result;
    },

    getLanguages: async function () {

        const result = await fetch(appConfig.apiURL + '/api/Language/', {
            method: 'get',
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }).then(res => res.json())

        return result;
    }

};

export default ApiService;