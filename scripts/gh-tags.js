import 'shelljs/global'
import { tag, repo } from './deploy'

exec(`git tag ${tag}`)
exec(`git push ${repo} ${tag}`)
