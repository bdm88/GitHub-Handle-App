'use strict';

function getHandleRepos(handle){
  fetch('https://api.github.com/users/' + handle + '/repos')
    .then(response => {
      if(response.ok){
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayRepos(responseJson))
    .catch(error => alert('Something went wrong.'));
}

function displayRepos(responseJson){
  console.log(responseJson);
  console.log(responseJson.length)

  var i;
  for(i = 0; i < responseJson.length; i++){
    $('.results').append(
      `<a href="${responseJson[i].html_url}" class="repoList">${responseJson[i].html_url}</a><br>`
    );
    $('.results').removeClass('hidden');
  }
}

function watchForm(){
  $('form').submit(event => {
    event.preventDefault();
    let handleSearch = $('input.searchHandle').val();
    $('.repoList').remove();
    console.log(handleSearch);
    getHandleRepos(handleSearch);
  })
}

$(function(){
  console.log('App loaded!');
  watchForm();
})