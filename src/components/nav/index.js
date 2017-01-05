import s from './nav.scss'
import { Icon } from 'vue-owl-ui'
import Link from '~coms/link'

const Nav = {
  name: 'Nav',
  render(h) {
    return (
      <nav class={[s.nav]}>
        <div class={s.brand}>
          <Icon typ="brand-circle" size={40} />
        </div>

        <div class={[s.linkIcon]}>
          <Icon typ="alarm" />
          <dl>
            <dt><Icon typ="fold" />Alarm</dt>
            <dd><Link to="/alarm">Alarm Overview</Link></dd>
            <dd><Link to="/alarm-latest">Alarm Latest</Link></dd>
            <dd><Link to="/alarm-history">Alarm History</Link></dd>
          </dl>
        </div>

        <div class={[s.linkIcon]}>
          <Link to="/graph">
            <Icon typ="graph" />
          </Link>
        </div>

        <div class={[s.navBottom]}>
          <div class={[s.linkIcon]}>
            <Icon typ="gear" />
          </div>
        </div>
      </nav>
    )
  }
}

module.exports = Nav
