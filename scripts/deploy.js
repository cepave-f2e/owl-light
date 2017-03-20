const { version, repository } = require('../package.json')
const axios = require('axios')
require('shelljs/global')

const { TRAVIS_BRANCH, TRAVIS_MATRIX, TRAVIS_PULL_REQUEST_BRANCH,
  GH_TOKEN, GL_TOKEN, SLACK_TOKEN } = process.env

const github = repository.replace(/(github.com)/, `${GH_TOKEN}@$1`)
const gitlab = `https://gitlab-ci-token:${GL_TOKEN}@gitlab.com/Cepave/owl-light.git`

const tag = `v${version}`

console.log({ TRAVIS_BRANCH, TRAVIS_MATRIX, TRAVIS_PULL_REQUEST_BRANCH })

if (TRAVIS_MATRIX === 'test') {
  exec('curl -s https://codecov.io/bash | bash')
}

if (TRAVIS_MATRIX === 'build') {
  const targetBranch = ({
    master() {
      exec(`git push ${github} ${tag}`, {
        silent: true,
      })
    },
    owlemon() {
      exec(`git push ${gitlab} owlemon:master -f`, {
        silent: true
      })

      exec(`git push ${gitlab} ${tag}`, {
        silent: true,
      })

      axios({
        url: `https://hooks.slack.com/services/${SLACK_TOKEN}`,
        method: 'post',
        data: {
          username: 'Mike',
          icon_emoji: ':mikesay:',
          channel: '#notify-owl-light',
          text: `
@channel

:star: *owl-light* \`${tag}\` 上版拉~
:unicorn_face: https://gitlab.com/Cepave/owl-light/tags/${tag}
`,
        },
      })
      .then((res)=> {
        console.log(res.statusText)
      })
      .catch((er)=> {
        console.log(er.response.status)
      })
    }
  })[TRAVIS_BRANCH]

  if (targetBranch) {
    exec(`git config --global user.email 'auto_deploy@travis-ci.org'`)
    exec(`git config --global user.name 'TravisCI'`)

    // Add Tag
    exec(`git tag ${tag}`)
    targetBranch()
  }
}
