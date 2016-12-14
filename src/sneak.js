import qs from './utils/qs'

const { Cookies } = window
const q = qs()
const isDev = process.env.NODE_ENV === 'development' || !process.env.NODE_ENV
const isSneak = isDev && ('--sneak' in q)

if (isSneak) {
  Cookies.set('name', 'root')
  Cookies.set('sig', 'dd81ea033c2d11e6a95d0242ac11000c')
}
