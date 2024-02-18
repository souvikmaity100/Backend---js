require('dotenv').config()
const express = require('express')
const app = express()
// const port = 3000

const githubData = {
    "login": "souvikmaity100",
    "id": 87945067,
    "node_id": "MDQ6VXNlcjg3OTQ1MDY3",
    "avatar_url": "https://avatars.githubusercontent.com/u/87945067?v=4",
    "gravatar_id": "",
    "url": "https://api.github.com/users/souvikmaity100",
    "html_url": "https://github.com/souvikmaity100",
    "followers_url": "https://api.github.com/users/souvikmaity100/followers",
    "following_url": "https://api.github.com/users/souvikmaity100/following{/other_user}",
    "gists_url": "https://api.github.com/users/souvikmaity100/gists{/gist_id}",
    "starred_url": "https://api.github.com/users/souvikmaity100/starred{/owner}{/repo}",
    "subscriptions_url": "https://api.github.com/users/souvikmaity100/subscriptions",
    "organizations_url": "https://api.github.com/users/souvikmaity100/orgs",
    "repos_url": "https://api.github.com/users/souvikmaity100/repos",
    "events_url": "https://api.github.com/users/souvikmaity100/events{/privacy}",
    "received_events_url": "https://api.github.com/users/souvikmaity100/received_events",
    "type": "User",
    "site_admin": false,
    "name": "Souvik Maity",
    "company": null,
    "blog": "",
    "location": "india",
    "email": null,
    "hireable": null,
    "bio": "Web developer and coder weaving digital magic with lines of code.",
    "twitter_username": "souvikmaity100",
    "public_repos": 14,
    "public_gists": 0,
    "followers": 4,
    "following": 0,
    "created_at": "2021-07-25T17:23:51Z",
    "updated_at": "2024-01-30T17:04:47Z"
  }

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/login', (req, res) => {
    res.send('<h1>Welcome to login page</h1>')
})

app.get('/signup', (req, res) => {
    res.send('<h1><center>Welcome to signup page</center></h1>')
})

app.get('/github', (req, res) => {
    res.json(githubData)
})

app.listen(process.env.PORT, () => {
    console.log(`Example app listening on port ${process.env.PORT}`)
})