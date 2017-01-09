import { Button, LightBox, DualList } from '@cepave/owl-ui'
import g from 'sass/global.scss'
import s from './portal.scss'

const { _ } = window

const hostGroupEdit = {
  name: 'HostGroupEdit',

  props: {
    lbRef: {
      type: Object,
    }
  },

  methods: {
    closeLb(e) {
      this.lbRef.close(e)
    },

    getEndpoints(q) {
      const { $store } = this
      $store.dispatch('portal/getEndpoints', {
        q,
      })
    },

    newHostsListHandle(q) {
      this.$store.commit('portal/clearHosts')
      this.getEndpoints(q)
    },

    newHostsSelectHandle(hosts) {
      this.$store.commit('portal/updateEditHostGroup', hosts)
    },

    save(e) {
      const { state, dispatch } = this.$store
      const hosts = Object.keys(state.portal.editSelectedHosts).map((key) => {
        return state.portal.editSelectedHosts[key].endpoint
      })
      const data = {
        id: state.portal.hostList.hostGroupId,
        hosts,
      }

      dispatch('portal/addHostsIntoNewHostGroup', data)
      this.closeLb(e)
    }
  },

  render(h) {
    const { $store, newHostsListHandle, newHostsSelectHandle } = this
    const state = $store.state

    // Object key `hostname` rename to `endpoint`
    let newHostListItems = {}
    const hasBindHostListItems = state.portal.hostList.hostListItems.map((o, i) => {
      newHostListItems = {
        ...newHostListItems,
        endpoint: o.hostname
      }

      return newHostListItems
    })

    const hosts = _.differenceBy(state.portal.hosts, hasBindHostListItems, 'endpoint')

    return (
      <div class={[s.hostGroupEditWrapper]}>
        <h2>Host Group Edit</h2>
        <div class={[g.container]}>
          <div class={[g.col2, s.lbText]}>Group Name</div>
          <div class={[g.col10, s.lbText]}>
            <b>{state.portal.hostList.hostGroup}</b>
          </div>
        </div>
        <div class={[s.dualBox]}>
          <div class={[g.col2, s.lbText]}>Hosts</div>
          <div class={[g.col10]}>
            <DualList
              apiMode
              onInputchange={newHostsListHandle}
              onChange={newHostsSelectHandle}
              items={hosts}
              selectedItems={hasBindHostListItems}
              displayKey="endpoint"
              leftLoading={state.portal.hasEndpointLoading}
            />
          </div>
        </div>
        <div class={[s.lbViewBox]}>
          <Button class={[s.cancelBtn]} status="primaryOutline" nativeOnClick={this.closeLb}>Cancel</Button>
          <Button class={[g.col2]} status="primary" nativeOnClick={this.save}>Save</Button>
        </div>
      </div>
    )
  }
}

module.exports = hostGroupEdit
