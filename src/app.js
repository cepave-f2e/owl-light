import s from './app.scss'
import Nav from '~coms/nav'

module.exports = {
  name: 'App',
  render(h) {
    return (
      <div id="app" class={s.app}>
        <Nav />
        <div class={[s.main]}>
          <router-view />
        </div>
      </div>
    )
  }
}
