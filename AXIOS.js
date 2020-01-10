//Não funciona... error URL contains XSS injection attempt

axios.get('https://api.github.com/users/gamaandrade')
    .then(function(response) {
        console.log(response);
    })
    .catch(function(error) {
        console.warn(error);
    });

