import { Tab, Tip, Input, Button, Grid, Icon, LightBox, Checkbox, Flex, Legacy, Page } from '@cepave/owl-ui'
const { _ } = window
import s from './alarms.scss'
import u from '../user/user.scss'
const { moment } = window

const Alarm = {
  name: 'Alarm',
  data() {
    const { $store, $router } = this
    return {
      page: 1,
      limit: 20,
      gridData: {
        heads: [
          {
            col: 'endpoint',
            width: '15%',
          },
          {
            col: 'metric',
            width: '15%',
          },
          {
            col: 'status',
            width: '15%',
          },
          {
            col: 'note',
            width: '15%',
          },
          {
            col: 'time',
            width: '15%',
          },
          {
            col: 'steps',
            width: '5%',
          },
          {
            col: 'value',
            width: '20%',
          },
        ],
        rowsRender() {},
      }
    }
  },
  created() {
    const self = this
    self.gridData.rowsRender = (h, { row, index }) => {
      return [
        <Legacy.Grid.Col>
          <Tip pos="right">
            { row.endpoint }
            <Tip.Context>
            {row.id}
            </Tip.Context>
          </Tip>
        </Legacy.Grid.Col>,
        <Legacy.Grid.Col>{ row.metric }</Legacy.Grid.Col>,
        <Legacy.Grid.Col>{ row.status } [{ row.process_status }]</Legacy.Grid.Col>,
        <Legacy.Grid.Col>{ row.note }</Legacy.Grid.Col>,
        <Legacy.Grid.Col>
          { moment(row.timestamp).format('YY/MM/DD hh:mm:ss') } -
          { moment(row.update_at).format('YY/MM/DD hh:mm:ss') }
        </Legacy.Grid.Col>,
        <Legacy.Grid.Col>{ `${row.current_step}/${row.step}` }</Legacy.Grid.Col>,
        <Legacy.Grid.Col>{ `${row.func} - ${row.cond}` }</Legacy.Grid.Col>,
      ]
    }
    self.getAlarms({
      page: self.page,
      limit: self.limit,
    })
  },
  methods: {
    getAlarms(q) {
      const { $store, $refs } = this
      $store.dispatch('getAlarms', q)
    },
    changePage(p) {
      const self = this
      self.page = p
      self.getAlarms({
        page: self.page,
        limit: self.limit,
      })
    }
  },
  render(h) {
    const { $store, $refs, $slots, gridData } = this
    const props = {
      rows: $store.state.alarms.rows,
      ...gridData
    }
    return (
      <div class={s.alarmPage}>
        <Tab>
          <Tab.Head slot="tabHead" name="profile" isSelected={true}>Alarm</Tab.Head>
          <Tab.Content slot="tabContent" name="template">
            <div>
              <div class={[u.contactSearchWrapper]}>
              <Checkbox.Group>
                <Checkbox name="all" checked={true}>All</Checkbox>
                <Checkbox name="OK">OK</Checkbox>
                <Checkbox name="PROBLEM">PROBLEM</Checkbox>
              </Checkbox.Group>

                <Input class={s.searchInput} icon={['search', '#919799']} />
                <Button class={s.submitButton} status="primary" >Submit</Button>
              </div>
              <div class={[u.contactWrapper]}>
                <div class={[u.gridWrapperBox]}>
                  { $slots.default }
                  <Legacy.Grid {...{ props }} />
                  <Page total={100} limit={10} onPage={({ page }) => {
                    this.changePage(page)
                  }} />
                </div>
              </div>
            </div>
          </Tab.Content>
        </Tab>
      </div>
    )
  }
}

module.exports = Alarm
