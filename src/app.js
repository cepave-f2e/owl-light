import s from './app.scss'

module.exports = {
  name: 'App',
  render(h) {
    return (
      <div id="app" class={s.app}>
        <router-view />
      </div>
    )
  }
}
