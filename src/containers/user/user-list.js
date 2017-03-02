import { Grid, Input, Button, LightBox, Legacy } from '@cepave/owl-ui'
import s from './user.scss'
const UserList = {
  name: 'UserList',
  data() {
    return {
      userListData: {
        rowsRender() {},
      },
      heads: [
        {
          col: 'Name',
          width: '15.3%',
          sort: -1
        },
        {
          col: 'Nickname',
          width: '15.3%',
          sort: -1
        },
        {
          col: 'E-mail',
          width: '23%',
          sort: -1
        },
        {
          col: 'Cellphone',
          width: '15.3%',
          sort: -1
        },
        {
          col: 'IM',
          width: '15.3%',
          sort: -1
        },
        {
          col: 'QQ',
          width: '15.3%',
          sort: -1
        }
      ]
    }
  },
  created() {
    this.userListData.rowsRender = (h, { row, index }) => {
      const result = [
        <Legacy.Grid.Col>{row.name}</Legacy.Grid.Col>,
        <Legacy.Grid.Col>{row.cnname}</Legacy.Grid.Col>,
        <Legacy.Grid.Col>{row.email}</Legacy.Grid.Col>,
        <Legacy.Grid.Col>{row.phone}</Legacy.Grid.Col>,
        <Legacy.Grid.Col>{row.qq}</Legacy.Grid.Col>,
        <Legacy.Grid.Col>{row.im}</Legacy.Grid.Col>
      ]
      return result
    }
  },
  methods: {
    searchUser(e) {
      if ((e.type === 'keypress' && e.charCode === 13) || e.type === 'click') {
        this.$store.dispatch('userGroup/searchUser', {
          q: this.$refs.searchUser.value
        })
      }
    }
  },
  render(h) {
    const { userListData, searchUser, heads } = this
    const { userListRows } = this.$store.state.userGroup
    const props = { ...userListData, heads, rows: userListRows }
    return (
      <div>
        <div class={[s.contactSearchWrapper]}>
          <div class={[s.searchInputGroup]}>
            <Input icon={['search', '#b8bdbf']} placeholder="search user... search all: .+" ref="searchUser" nativeOn-keypress={searchUser} class={[s.contactSearch]}  />
            <Button status="primary" nativeOn-click={searchUser}>Search</Button>
          </div>
        </div>
        <div class={[s.contactWrapper]}>
          <div class={[s.gridWrapperBox]}>
            <Legacy.Grid { ...{ props } } />
          </div>
        </div>
      </div>
    )
  }
}
module.exports = UserList
