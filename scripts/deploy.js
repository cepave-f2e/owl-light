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

      exec('git tag --list | sort -V', { silent: true }, async (er, tags) => {
        if (er) {
          throw er
        }

        tags = (tags.split('\n'))
        const lastTag = tags[tags.length - 3]
        await new Promise((done) => {
          setTimeout(done, 1000 * 20)
        })

        axios({
          url: `https://hooks.slack.com/services/${SLACK_TOKEN}`,
          method: 'post',
          data: {
            username: 'Mike',
            icon_emoji: ':mikesay:',
            channel: '#notify-owl-light',
            text: `
              <!channel>
              \`${tag}\` 上版拉~
              <https://gitlab.com/Cepave/owl-light/tags/${tag}|:spiral_note_pad: Release Note>
              <https://gitlab.com/Cepave/owl-light/compare/${lastTag}...${tag}|:bug: Compare Changes>
              `.replace(/^\s*/mg, ''),
          },
        })
        .then((res)=> {
          console.log(res.statusText)
        })
        .catch((er)=> {
          console.log(er.response.status)
        })
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
