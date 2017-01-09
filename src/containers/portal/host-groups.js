import { Input, Button, Grid, Icon, LightBox, DualList } from '@cepave/owl-ui'
import Link from '~coms/link'
import g from 'sass/global.scss'
import s from './portal.scss'

import HostListInGroup from './host-list-in-group'
import HostGroupEdit from './host-group-edit'
import PluginsList from './plugins-list'

const hostGroups = {
  name: 'HostGroups',

  data() {
    return {
      hostGroupsData: {
        heads: [
          {
            col: 'Name',
            width: '30%',
            sort: -1
          },
          {
            col: 'Creator',
            width: '22%',
          },
          {
            col: 'Host',
            width: '22%',
          },
          {
            col: 'Operation',
            width: '48%',
          },
        ],
        rows: [],
      }
    }
  },

  created() {
    this.hostGroupsData.rowsRender = (h, { row, index }) => {
      return [
        <Grid.Col>
          {row.grp_name}
        </Grid.Col>,
        <Grid.Col>
          {row.create_user}
        </Grid.Col>,
        <Grid.Col>
          <a
            class={[s.operration]}
            href
            data-group-id={row.id}
            data-group-name={row.grp_name}
            onClick={(e) => this.openHostsLightBox(e, this)}
          >
            view hosts
          </a>
        </Grid.Col>,
        <Grid.Col>
          <ul>
            <li class={[s.operrationItem]}>
              <a
                class={[s.operration]}
                href
                data-index={index}
                data-group-id={row.id}
                data-group-name={row.grp_name}
                onClick={(e) => this.openDeleteLightBox(e, this)}
              >
                Delete
              </a>
            </li>
            <li class={[s.operrationItem]}>
              <a
                class={[s.operration]}
                href
                data-group-name={row.grp_name}
                data-group-id={row.id}
                onClick={(e) => this.openHostGroupEdit(e)}
              >
                Edit
              </a>
            </li>
            <li class={[s.operrationItem]}>
              <a class={[s.operration]} href>Templates</a>
            </li>
            <li class={[s.operrationItem]}>
              <a class={[s.operration]} href data-group-id={row.id} onClick={(e) => this.openPluginsListLightBox(e, this)}>Plugins</a>
            </li>
            <li class={[s.operrationItem]}>
              <Link class={[s.operration]} to={`aggregator/${row.id}`}>Aggregator</Link>
            </li>
          </ul>
        </Grid.Col>,
      ]
    }
  },

  methods: {
    getEndpoints(q) {
      const { $store } = this
      $store.dispatch('portal/getEndpoints', {
        q,
      })
    },

    searchInputHandler(e) {
      if (e.charCode === 13) {
        this.searchHostGroupNameHandler()
      }
    },

    searchHostGroupNameHandler() {
      let q = this.$refs.hostGroupSearchInput.value
      if (!q.length) {
        q = '.+'
      }
      this.$store.commit('portal/updateSearchHostGroupInput', q)

      this.$store.dispatch('portal/searchHostGroup', q)
    },

    createHostGroup() {
      const { $store, $refs } = this
      const name = $refs.newHostGroupName.value
      const hosts = Object.keys($store.state.portal.selectedHosts).map((key) => {
        return $store.state.portal.selectedHosts[key].endpoint
      })

      const data = {
        name,
        hosts,
      }

      $store.dispatch('portal/createHostGroupName', data)
    },

    newHostsListHandle(q) {
      this.$store.commit('portal/clearHosts')
      this.getEndpoints(q)
    },

    newHostsSelectHandle(hosts) {
      this.$store.commit('portal/updateNewHostGroup', hosts)
    },

    getHostGroupList() {
      this.$store.dispatch('portal/getHostGroupList')
    },

    submitDeleteHostGroupHandle(e) {
      const data = this.$store.state.portal.tempDeleteCandidate
      this.$store.dispatch('portal/deleteHostGroup', data)
      this.$refs.lbDeleteHostGroupList.close(e)
    },

    // LightBox methods
    openDeleteLightBox(e) {
      const { index, groupId, groupName } = e.target.dataset
      const data = {
        index,
        name: groupName,
        id: groupId,
      }

      this.$store.commit('portal/tempDeleteCandidate', data)
      this.$refs.lbDeleteHostGroupList.open(e)
    },

    openPluginsListLightBox(e) {
      this.$refs.lbPluginsList.open(e)
    },

    openHostsLightBox(e) {
      const data = e.target.dataset

      this.$store.dispatch('portal/getHostsList', data)
      this.$refs.lbHostsList.open(e)
    },

    openHostGroupEdit(e) {
      const data = e.target.dataset
      this.getEndpoints('.+')
      this.$store.dispatch('portal/getHostsList', data)
      this.$refs.lbHostGroupEdit.open(e)
    }
  },

  mounted() {
    this.getHostGroupList()
  },

  render(h) {
    const { hostGroupsData, $store } = this
    const props = {
      ...hostGroupsData,
      rows: $store.state.portal.hostGroupListItems
    }
    const state = $store.state
    const hosts = state.portal.hosts

    return (
      <div class={[s.hostGroupsContent]}>
        <div class={[s.searchInputWrapper]}>
          <div class={[s.searchInput]}>
            <div class={[s.inputGroups]}>
              <Input
                ref="hostGroupSearchInput"
                icon={['search', '#919799']}
                nativeOnKeypress={this.searchInputHandler}
                val={state.portal.searchHostGroupInput}
                placeholder="Enter Host Group Name..."
              />
              <span class={[s.btnAppend]}>
                <Button status="primary" nativeOnClick={this.searchHostGroupNameHandler}>Search</Button>
              </span>
            </div>
          </div>
          <LightBox class={[s.createBtn]} closeOnClickMask closeOnESC width="788">
            <LightBox.Open>
              <Button status="primary" nativeOnClick={() => this.getEndpoints('.+')}>
                <Icon class="create-icon" typ="plus" fill="#fff" size={18} />
                Create HostGroups
              </Button>
            </LightBox.Open>
            <LightBox.View>
              <h2>Create HostGroup</h2>
              <div class={[g.container]}>
                <div class={[g.col2, s.lbText]}>Group Name</div>
                <div class={[g.col10]}>
                  <Input ref="newHostGroupName"></Input>
                </div>
              </div>
              <div class={[s.dualBox]}>
                <div class={[g.col2, s.lbText]}>Hosts</div>
                <div class={[g.col10]}>
                  <DualList
                    apiMode
                    onInputchange={this.newHostsListHandle}
                    onChange={this.newHostsSelectHandle}
                    items={hosts}
                    displayKey="endpoint"
                    leftLoading={state.portal.hasEndpointLoading}
                  />
                </div>
              </div>
              <div class={[s.lbViewBox]}>
                <LightBox.Close class={[s.cancelBtn]}>
                  <Button status="primaryOutline">Cancel</Button>
                </LightBox.Close>
                <Button class={[g.col2]} status="primary" nativeOnClick={this.createHostGroup}>Save</Button>
              </div>
            </LightBox.View>
          </LightBox>
        </div>

        <div class={[s.gridWrapper]}>
          <div class={[s.gridWrapperBox]}>
            <Grid {...{ props }} />
          </div>
        </div>

        {/* LightBox Delete  */}
        <LightBox class={[g.inline]} ref="lbDeleteHostGroupList" closeOnClickMask closeOnESC>
          <LightBox.View>
            <p>You will remove this host group: <b>{state.portal.tempDeleteCandidate.name}</b>.</p>
            <p> Are you sure ?</p>
            <div class={[s.lbViewBox]}>
              <Button class={[g.col6]} status="primary" nativeOnClick={(e) => this.submitDeleteHostGroupHandle(e, this)}>Yes</Button>
              <Button class={[g.col6]} status="primaryOutline" nativeOnClick={(e) => this.$refs.lbDeleteHostGroupList.close(e)}>NO</Button>
            </div>
          </LightBox.View>
        </LightBox>

        {/* LightBox Hosts List */}
        <LightBox class={[g.inline]} ref="lbHostsList" closeOnClickMask closeOnESC>
          <LightBox.View>
            <h2>Group name: {state.portal.hostInGroupList.groupName}</h2>
            <div class={[s.lbViewBox]}>
              <div class={[s.searchInput]}>
                <div class={[s.inputGroups]}>
                  <Input icon={['search', '#919799']} />
                  <span class={[s.btnAppend]}>
                    <Button status="primary">Search</Button>
                  </span>
                </div>
              </div>
              <HostListInGroup />
            </div>
          </LightBox.View>
        </LightBox>

        {/* LightBox Host Group Edit */}
        <LightBox class={[g.inline]} ref="lbHostGroupEdit" width="788px" closeOnClickMask closeOnESC>
          <LightBox.View>
            <HostGroupEdit lbRef={this.$refs.lbHostGroupEdit} />
          </LightBox.View>
        </LightBox>

        {/* LightBox Plugins List */}
        <LightBox class={[g.inline]} ref="lbPluginsList" closeOnClickMask closeOnESC>
          <LightBox.View>
            <p>Plugins List</p>
            <div class={[s.lbViewBox]}>
              <div class={[s.searchInput]}>
                <div class={[s.inputGroups]}>
                  <Input icon={['search', '#919799']} />
                  <span class={[s.btnAppend]}>
                    <Button status="primary">Search</Button>
                  </span>
                </div>
              </div>
              <PluginsList />
            </div>
          </LightBox.View>
        </LightBox>
      </div>
    )
  }
}

module.exports = hostGroups
