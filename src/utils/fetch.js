import axios from 'axios'
import { isBrowser } from './is-env'

module.exports = (opts = {}) => {
  const hasSpin = isBrowser && opts.spin
  if (hasSpin) {
    if (typeof opts.spin === 'string') {
      opts.spin = Array.from(document.querySelectorAll(opts.spin))
    } else if (!Array.isArray(opts.spin)) {
      opts.spin = [opts.spin]
    }

    opts.spin.forEach((el) => {
      el.style.visibility = 'visible'
    })
  }

  return axios(opts)
    .then((res)=> {
      opts.spin.forEach((el) => {
        el.style.visibility = 'hidden'
      })

      return res
    })
    .catch((er) => {
      opts.spin.forEach((el) => {
        el.style.visibility = 'hidden'
      })

      return er
    })
}
