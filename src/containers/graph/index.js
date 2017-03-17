import {
  Tab, DualList, Loading, Button, Page, Icon, Select, Flex,
  ComplexQuery, DatePicker, Tip
} from '@cepave/owl-ui'
import LineChart from './line-chart/index.js'
import sortHosts from './sort-hosts'
import g from '~sass/global.scss'
import s from './graph.scss'
import delegate from 'delegate-to'
// import DatePicker from '~coms/date-picker'

const GraphView = {
  name: 'GraphView',

  data() {
    return {
      samplingOptions: [
        { title: 'AVERAGE', value: 'AVERAGE' },
        { title: 'MAX', value: 'MAX' },
        { title: 'MIN', value: 'MIN' },
      ]
    }
  },
  mounted() {

  },

  methods: {
    complexQuery(d) {
      const { $store, $refs } = this
      $store.dispatch('graph/complexQuery', d)
    },
    getEndpoints(q) {
      const { $store, $refs } = this
      $store.dispatch('graph/getEndpoints', {
        q,
      })
    },

    getCounters(metricQuery) {
      const { $store, $refs } = this

      $store.dispatch('graph/getCounters', {
        eid: Object.keys($refs.dualEndpoint.rightList).map((k)=>{
          return $refs.dualEndpoint.rightList[k].id
        }),
        metricQuery
      })
    },

    switchViewPoint(d) {
      const { $store } = this

      $store.commit('graph/switchViewPoint', {
        viewpoint: d.value
      })
    },

    viewGraph() {
      const { $store, $refs, goToPage } = this
      if ($store.state.graph.viewGraphBtnDisabled) {
        return
      }

      const endpoints = Object.keys($refs.dualEndpoint.rightList).map((k) => $refs.dualEndpoint.rightList[k].endpoint)
      const counters = Object.keys($refs.dualCounter.rightList).map((k) => $refs.dualCounter.rightList[k].counter)
      const vport = $store.state.graph.vport

      let totalCharts
      if (vport === 'combo') {
        totalCharts = [
          {
            title: 'Combo',
            endpoints,
            counters,
          }
        ]
      } else {
        const vports = sortHosts({
          endpoints,
          counters,
        })[vport]

        totalCharts = Object.keys(vports).map((k) => {
          return {
            title: k,
            endpoints: vports[k].endpoints,
            counters: vports[k].counters,
          }
        })
      }
      $store.commit('graph/viewGraph.start', { totalCharts })
      goToPage(1)
    },

    goToPage(page) {
      const { $store, $refs } = this
      const graph = $store.state.graph
      const vport = graph.vport

      const sliceStart = (page - 1) * graph.pageLimit
      const sliceEnd = page * graph.pageLimit

      let start = graph.startTime
      let end = graph.endTime

      if (start > end) {
        start = graph.endTime
        end = graph.startTime
      }

      const charts = graph.totalCharts
        .slice(sliceStart, sliceEnd)
        .map(({ title, endpoints, counters }, idx) => {
          $store.dispatch('graph/viewGraph', {
            endpoints,
            counters,
            idx, vport, page,
            sampling: $refs.sampling.value,
            start, end
          })
          return {
            title,
            loading: true,
            series: [],
          }
        })
      $store.commit('graph/viewGraph.page', { charts, page })
    },

    switchGrid: delegate('[data-grid]', function(ev) {
      const { $store, $refs } = this
      const grid = ev.delegateTarget.dataset.grid

      $store.commit('graph/switchGrid', { grid })

      this.$nextTick(() => {
        ;[...Array($store.state.graph.pageLimit)].forEach((ref, i) => {
          if ($refs[`chart${i}`].Chart) {
            $refs[`chart${i}`].Chart.resize()
          }
        })
      })
    }),

    checkBtnStatus(d) {
      const { $store, $refs } = this

      $store.commit('graph/checkViewGraphBtnStatus', {
        disabled: !(Object.keys($refs.dualEndpoint.rightList).length &&
          Object.keys($refs.dualCounter.rightList).length)
      })
    },

    onChangeStartTime({ unix }) {
      const { $store } = this

      $store.commit('graph/syncStartTime', { unix })
    },

    onChangeEndTime({ unix }) {
      const { $store } = this

      $store.commit('graph/syncEndTime', { unix })
    }
  },

  computed: {
    pageSum() {
      const { $store } = this
      const graph = $store.state.graph
      const start = graph.pageLimit * (graph.pageCurrent - 1) + 1
      const end = Math.min(graph.pageCurrent *  graph.pageLimit, graph.totalCharts.length)

      return `${start} - ${end}`
    }
  },

  render(h) {
    const { $store, $router, getEndpoints, getCounters, switchViewPoint, viewGraph, goToPage,
      pageSum, switchGrid, checkBtnStatus, samplingOptions, onChangeStartTime, onChangeEndTime,
    complexQuery } = this
    const { graph } = $store.state

    return (
      <div>
        <Tab class={[s.tab]}>
          <Tab.Head slot="tabHead" isSelected name="graph">Graph</Tab.Head>
          <Tab.Content slot="tabContent" name="graph" style={{ height: '100vh' }}>
            <section class={[s.section1]}>
              <Flex>
                <Flex.Col size={6}>
                  <ComplexQuery
                    onQuery={complexQuery}
                    items={graph.complexQueryItems}
                    loading={graph.complexQueryLoading}
                    categories={[
                      { name: 'Host', value: 'hostname', on: true },
                      { name: 'Platform', value: 'plaform' },
                      { name: 'ISP', value: 'isp' },
                      { name: 'IDC', value: 'idc' },
                      { name: 'Province', value: 'province' },
                    ]}
                  />
                </Flex.Col>
                <Flex.Col size="auto">
                  <Flex split>
                    <Flex.Col size="auto">
                      <ComplexQuery
                        items={[]}
                        categories={[]}
                      />
                    </Flex.Col>
                    <Flex.Col>
                      <Button disabled={graph.viewGraphBtnDisabled} status="primary" nativeOnClick={viewGraph}>Submit</Button>
                    </Flex.Col>
                  </Flex>
                </Flex.Col>
              </Flex>
            </section>

            <section class={[s.section2]}>
              <Flex>
                <Flex.Col>
                  <DatePicker /> - <DatePicker />
                </Flex.Col>
                <Flex.Col>
                  <Tip pos="up">
                    <Tip.Context> View Port</Tip.Context>
                    <Select style={{ width: '140px' }} options={[
                      { title: 'Endpoint', value: 'endpoint' },
                      { title: 'Counter', value: 'counter' },
                      { title: 'Combo', value: 'combo' },
                    ]} />
                  </Tip>
                </Flex.Col>
                <Flex.Col>
                  <Tip pos="up">
                    <Tip.Context> Layout </Tip.Context>
                    <Select style={{ width: '150px' }} options={[
                      { title: '1 Column', value: 'endpoint' },
                      { title: '2 Columns', value: 'counter', selected: true },
                      { title: '3 Columns', value: 'combo' },
                      { title: '4 Columns', value: 'combo' },
                    ]} />
                  </Tip>
                </Flex.Col>
                <Flex.Col>
                  <Tip pos="up">
                    <Tip.Context> Sorting </Tip.Context>
                    <Select style={{ width: '180px' }} options={[
                      { title: 'From A → Z', value: 'endpoint' },
                      { title: 'From Z → A', value: 'counter', },
                      { title: 'Descend by net.in', value: 'counter', },
                      { title: 'Ascend by net.in', value: 'counter', },
                      { title: 'Descend by net.out', value: 'counter', },
                      { title: 'Ascend by net.out', value: 'counter', },
                    ]} />
                  </Tip>
                </Flex.Col>
                <Flex.Col mid>
                  Y-axis
                </Flex.Col>
              </Flex>
            </section>

            <div class={[s.boxCharts]} data-grid={graph.grid}>
              {graph.charts.map((chart, i) => {
                return (
                  <div class={[s.chart]}>
                    <LineChart ref={`chart${i}`} title={chart.title} loading={chart.loading} series={chart.series} />
                  </div>
                )
              })}
            </div>
            { graph.totalCharts.length ? <Page class={[s.pager]} onPage={({ page }) => {
              goToPage(page)
            }} total={graph.totalCharts.length} limit={graph.pageLimit} /> : null }
          </Tab.Content>
        </Tab>
      </div>
    )
  }
}

module.exports = GraphView
