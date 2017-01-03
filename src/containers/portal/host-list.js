import { Input, Button, Grid, Icon } from 'vue-owl-ui'
import s from './portal.scss'


const hostList = {
  name: 'HostList',

  data() {
    return {
      gridData: {
        heads: [
          {
            col: 'Name',
            width: '50%',
            sort: -1
          },
          {
            col: 'HostGroup',
            width: '50%',
          },
        ],
        rows: [
          [
            {
              col: 11111111
            },
            {
              col: 222222222
            },
          ],
          [
            {
              col: 11111111
            },
            {
              col: 222222222
            },
          ]
        ]
      }
    }
  },

  created() {
    this.gridData.rowsRender = (h, { row, index }) => {
      return [
        <Grid.Col>
          {row[0].col}
        </Grid.Col>,
        <Grid.Col>
          {row[1].col}
        </Grid.Col>,
      ]
    }
  },

  render(h) {
    const { gridData } = this
    const props = {
      ...gridData
    }

    return (
      <div class={[s.hostGroupsContent]}>
        <div class={[s.searchInputWrapper]}>
          <div class={[s.searchInput]}>
            <div class={[s.inputGroups]}>
              <Input icon={['search', '#919799']} />
              <span class={[s.btnAppend]}>
                <Button status="primary">Search</Button>
              </span>
            </div>
          </div>
        </div>
        <div class={[s.gridWrapper]}>
          <div class={[s.gridWrapperBox]}>
            <Grid {...{ props }} />
          </div>
        </div>
      </div>
    )
  }
}

module.exports = hostList
