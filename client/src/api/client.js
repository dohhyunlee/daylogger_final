const defaultHeaders = {
    headers: {
        'Content-Type': 'application/json; charset=UTF-8'
    },
}

// More on the fetch method: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
export const getQAPIMethod = () => {
    return fetch(`/api/questions`, {
        ...defaultHeaders,
    }).then(checkStatus)
        .then(parseJSON);
}

export const getAllQAPIMethod = () => {
    return fetch(`/api/allquestions`, {
        ...defaultHeaders,
    }).then(checkStatus)
        .then(parseJSON);
}

export const getQByIdAPIMethod = (questionId) => {
    console.log("questionId in client.js: " + questionId);
    return fetch(`/api/questions/${questionId}`, {
        ...defaultHeaders,
    }).then(checkStatus)
        .then(parseJSON);
}

export const updateQAPIMethod = (question) => {
    return fetch(`/api/questions/${question._id}`, {
        ...defaultHeaders,
        method: 'PUT', // The method defaults to GET
        body: JSON.stringify(question),
    }).then(checkStatus);
}

export const deleteQByIdAPIMethod = (question) => {
    console.log("delete");
    console.log(`/api/questions/${question._id}`);
    return fetch(`/api/questions/${question._id}`, {
        ...defaultHeaders,
        method: 'DELETE',
    }).then(checkStatus)
        .then(parseJSON);
}

export const createQAPIMethod = (question) => {
    return fetch(`/api/questions`, {
        ...defaultHeaders,
        method: 'POST', // The method defaults to GET
        body: JSON.stringify(question),
    }).then(checkStatus)
        .then(parseJSON);
}

export const getUserAPIMethod = () => {
    return fetch(`/api/user`, {
        ...defaultHeaders,
    }).then(checkStatus)
        .then(parseJSON);
}

export const getUsersAPIMethod = () => {
    return fetch(`/api/users`, {
        ...defaultHeaders,
    }).then(checkStatus)
        .then(parseJSON);
}

export const getUserByIdAPIMethod = (userId) => {
    return fetch(`/api/users/${userId}`, {
        ...defaultHeaders,
    }).then(checkStatus)
        .then(parseJSON);
}

/* export const updateUserAPIMethod = (user) => {
    return fetch(`/api/users`, {
        ...defaultHeaders,
        method: 'PUT', // The method defaults to GET
        body: JSON.stringify(user),
    }).then(checkStatus);
} */

export const updateUserAPIMethod = (user) => {
    return fetch(`/api/users/${user._id}`, {
        ...defaultHeaders,
        method: 'PUT', // The method defaults to GET
        body: JSON.stringify(user),
    }).then(checkStatus);
}

export const deleteUserByIdAPIMethod = (user) => {
    console.log("delete");
    console.log(`/api/users/${user._id}`);
    return fetch(`/api/users/${user._id}`, {
        ...defaultHeaders,
        method: 'DELETE',
    }).then(checkStatus)
        .then(parseJSON);
}

export const createUsersAPIMethod = (user) => {
    return fetch(`/api/register`, {
        ...defaultHeaders,
        method: 'POST',
        body: JSON.stringify(user),
    }).then(checkStatus)
        .then(parseJSON);
}

export const loginUsersAPIMethod = (user) => {
    return fetch(`/api/login`, {
        ...defaultHeaders,
        method: 'POST',
        body: JSON.stringify(user),
    }).then(checkStatus);
}

export const logoutUsersAPIMethod = () => {
    return fetch(`/api/logout`, {
        ...defaultHeaders,
        method: 'POST',
    }).then(checkStatus);
}

export const uploadImageToCloudinaryAPIMethod = (formData) => {
    const cloudName = 'samuelhan'
    return fetch(`https://api.cloudinary.com/v1_1/${cloudName}/upload`, {
        method: 'POST',
        body: formData,
    }).then(checkStatus)
        .then(parseJSON);
}

export const getAnswersAPIMethod = () => {
    return fetch(`/api/answers`, {
        ...defaultHeaders,
    }).then(checkStatus)
        .then(parseJSON);
}

export const getAllAnswersAPIMethod = () => {
    return fetch(`/api/allanswers`, {
        ...defaultHeaders,
    }).then(checkStatus)
        .then(parseJSON);
}

export const createAnswerAPIMethod = (answer) => {
    return fetch(`/api/answers`, {
        ...defaultHeaders,
        method: 'POST', // The method defaults to GET
        body: JSON.stringify(answer),
    }).then(checkStatus)
        .then(parseJSON);
}

export const updateAnswersAPIMethod = (answer) => {
    return fetch(`/api/answers/${answer._id}`, {
        ...defaultHeaders,
        method: 'PUT', // The method defaults to GET
        body: JSON.stringify(answer),
    }).then(checkStatus);
}


export const getAnswersByDateAPIMethod = (date) => {
    return fetch(`/api/answers/${date}`, {
        ...defaultHeaders,
    }).then(checkStatus)
        .then(parseJSON);
}

export const getAnswersByQIDAPIMethod = (qid) => {
    return fetch(`/api/answers/qid/${qid}`, {
        ...defaultHeaders,
    }).then(checkStatus)
        .then(parseJSON);
}

export const deleteAnswersByQIDAPIMethod = (qid) => {
    return fetch(`/api/answers/${qid}`, {
        ...defaultHeaders,
        method: 'DELETE',
    }).then(checkStatus)
        .then(parseJSON);
}

export const getAdminAPIMethod = () => {
    return fetch(`/api/users/admin`, {
        ...defaultHeaders,
    }).then(checkStatus)
        .then(parseJSON);
}

function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return response;
    } else {
        const error = new Error(`${response.statusText}`);
        error.status = response.statusText;
        error.response = response;
        throw error;
    }
}

function parseJSON(response) {
    return response.json();
}