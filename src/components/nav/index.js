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
          <Link to="/alarm">
            <Icon typ="alarm" />
          </Link>
        </div>

        <div class={[s.linkIcon]}>
          <Link to="/graph">
            <Icon typ="graph" />
          </Link>
        </div>

        <div class={[s.navBottom]}>

          <div class={[s.linkIcon]}>
            <Link to="/profile">
              <Icon typ="user-group" />
            </Link>
          </div>

          <div class={[s.linkIcon]}>
            <Icon typ="gear" />
            <dl>
              <dt><Icon typ="fold" />Setting</dt>
              <dd><Link to="/portal">Host Group</Link></dd>
              <dd><Link to="/user">User Group</Link></dd>
            </dl>
          </div>

        </div>
      </nav>
    )
  }
}

module.exports = Nav
