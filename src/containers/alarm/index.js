import { Tab, Grid, Checkbox } from 'vue-owl-ui'
import s from './alarm.scss'

const AlarmPage = {
  name: 'AlarmPage',
  data() {
    return {
      alarmData: {
        heads: [
          {
            render: (h, head) => {
              return <Checkbox></Checkbox>
            },
            width: '5%'
          },
          {
            col: 'Description',
            width: '30%',
            sort: -1
          },
          {
            col: 'Counters',
            width: '30%',
            sort: -1
          },
          {
            col: 'Duration',
            width: '15%',
            sort: -1
          },
          {
            col: 'Operation',
            width: '25%'
          }
        ],
        rows: [
          { description: 'owl_agent没有上报数据;可能已宕机', counters: '[P0 #3/3] aaa-bb-111-444-777-222/agent.alive', duration: '12 days ago ' },
          { description: 'owl_agent没有上报数据;可能已宕机', counters: '[P0 #3/3] ccc-dd-333-555-888-999/agent.alive ', duration: '12 days ago ' }
        ]
      }
    }
  },
  created() {
    this.alarmData.rowsRender = (h, { row, index }) => {
      return [
        <Grid.Col><Checkbox></Checkbox></Grid.Col>,
        <Grid.Col>{row.description}</Grid.Col>,
        <Grid.Col>{row.counters}</Grid.Col>,
        <Grid.Col>{row.duration}</Grid.Col>,
        <Grid.Col>
          <div class={[s.opeartionInline]}>
            <a class={[s.opeartions]}>Config</a>
            <a class={[s.opeartions]}>Solved</a>
          </div>
        </Grid.Col>
      ]
    }
  },
  render(h) {
    const { alarmData } = this
    const props = { ...alarmData }
    return (
      <div class={[s.alarmPage]}>
        <Tab>
          <Tab.Head slot="tabHead" name="profile" isSelected={true}>Alarm</Tab.Head>
          <Tab.Content slot="tabContent" name="profile">
            <div>
              <div class={[s.wrapper]}></div>
              <Grid { ...{ props } } />
            </div>
          </Tab.Content>
        </Tab>
      </div>
    )
  }
}

module.exports = AlarmPage
