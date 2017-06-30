$(document).ready(function (){
  $('#searchButton').on('click', searchRepositories)
  $('#results').on('click', '.commitLink', showCommits)
});

function searchRepositories(event) {
  event.preventDefault()
  console.log('Search button pressed')
  let searchTerm = $('#searchTerms').val()
  $.get("https://api.github.com/search/repositories?q="+searchTerm, displayRepositories)
    .fail(displayError)
}

function displayRepositories(data) {
  $results = $('#results')
  $results.empty()
  data.items.forEach(item => {
    $results.append(renderRepo(item))
  })
}

function renderRepo(repo) {
  return `<a href="${repo.html_url}">${repo.name}</a> <br>` +
    `${repo.description} <br>` +
    `<img class="avatar" src="${repo.owner.avatar_url}"/> <br>` +
    `<a href="${repo.owner.html_url}">${repo.owner.login}</a> <br>` +
    `<a class="commitLink" href="" rel="${repo.commits_url}">Show Commits</a>` +
    `<br><br>`
}

function showCommits(event) {
  event.preventDefault()
  let commitUrl = $(this).attr('rel').replace(/({.+})/,"")
  $.get(commitUrl, displayCommits).fail(displayError)
}

function displayCommits(commits) {
  let $details = $('#details')
  $details.empty()
  commits.forEach(commit => {
    $details.append(renderCommit(commit))
  })
}

function renderCommit(commit) {
  let commitHTML = `${commit.sha} <br> ${commit.author.login} <br>` +
    `<img class="avatar" src="${commit.author.avatar_url}" /> <br>`
  return commitHTML
}

function displayError(error) {
  console.log("Ooops...something went wrong!")
  $('#errors').append("I'm sorry, there's been an error. Please try again.")
}
