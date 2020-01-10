// --- Exercicio 1 ---
function ageCheck(idade) {
    return new Promise(function(resolve,reject) {
        if ( idade >= 18 ) {
            resolve();
        }
        else {
            reject();
        }
    });
}

ageCheck(17)
    .then(function() {
        console.log("Maior que 18");
    })
    .catch(function() {
        console.log("Menor que 18");
    });


// --- Exercicios 2 e 3---
var listElement = document.querySelector('#app ul');
var inputElement = document.querySelector('#app input');
var buttonElement = document.querySelector('#app button');

buttonElement.onclick = renderAll;

function getGitHubRepos( user ) {
    return new Promise(function(resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', 'https://api.github.com/users/' + user + '/repos');
        xhr.send(null);

        xhr.onreadystatechange = function() {
            if(xhr.readyState === 4) {
                if(xhr.status === 200) {
                    resolve(JSON.parse(xhr.responseText) || []);
                }
                if(xhr.status === 404) {
                    reject('usuario nao existe');
                }
                else {
                    reject('Erro na requisicao');
                }
            }
        }
    });
}

function renderLoading() {
    listElement.innerHTML = '';
    var repoElement = document.createElement('li');
    var repoText = document.createTextNode('Loading...');
    repoElement.appendChild(repoText);
    listElement.appendChild(repoElement);
}

function renderRepos() {

    getGitHubRepos(inputElement.value)
    .then(function(repos) {
        listElement.innerHTML = '';
        for ( var repo of repos) {
            var repoElement = document.createElement('li');
            var repoText = document.createTextNode(repo.full_name);
            repoElement.appendChild(repoText);
            listElement.appendChild(repoElement);
        }
        inputElement.value = '';
    })
    .catch(function(error) {
        listElement.innerHTML = '';
        alert(error);
        inputElement.value = '';        
    });

}

function renderAll() {
    renderLoading();
    setTimeout(renderRepos, 100);
}



