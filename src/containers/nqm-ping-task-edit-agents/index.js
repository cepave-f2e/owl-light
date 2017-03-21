import { Flex, Grid, Button, Input, LightBox, Page, Icon, Checkbox } from '@cepave/owl-ui'
import s from '../nqm-mng/nqm-mng.scss'
import Link from '~coms/link'

module.exports = {
  name: 'NqmPingTaskEditAgent',

  mounted() {
    this.getAgentsOfPingTask()
    this.getSinglePingTask()
  },

  data() {
    const h = this.$createElement
    return {
      gridData: {
        heads: [
          {
            name: '勾選',
            key: 'checkbox',
            width: '5%',
          },
          {
            name: 'PingTask id',
            key: 'id',
            width: '10%',
          },
          {
            name: 'PingTask Name',
            key: 'name',
            width: '10%',
          },
          {
            name: 'agent id',
            key: 'agentId',
            width: '20%'
          },
          {
            name: 'agent connection id',
            key: 'connectionId',
            width: '30%'
          },
          {
            name: 'agent name',
            key: 'agentName',
            width: '15%'
          },
          {
            name: 'agent status',
            key: 'agentStatus',
            width: '10%'
          }
        ],
        rowsRender: ({ row, index }) => {
          const { singlePingTaskInfo } = this.$store.state.nqmPingTask
          const status = (row.status) ? 'normal' : 'disable'
          return [
            <Grid.Col>
              <Checkbox name={`${row.id}`} checked={row.applying_ping_task} onChange={this.handleAgentChange} />
            </Grid.Col>,
            <Grid.Col>{this.$route.params.id}</Grid.Col>,
            <Grid.Col>{singlePingTaskInfo.name}</Grid.Col>,
            <Grid.Col>{row.id}</Grid.Col>,
            <Grid.Col>{row.connection_id}</Grid.Col>,
            <Grid.Col>{row.name}</Grid.Col>,
            <Grid.Col>
              <div class={s[`${status}Circle`]}></div>
            </Grid.Col>,
          ]
        }
      },
      agentsOfPingTaskParams: {
        
      },
      agentsOfPingTaskHeaders: {
        'Page-Pos': '1',
        'Order-By': 'applied#desc'
      },
    }
  },

  methods: {
    getAgentsOfPingTask() {
      this.$store.dispatch('nqmPingTask/getAgentsOfPingTask', {
        pingTaskId: this.$route.params.id,
        params: this.agentsOfPingTaskParams,
        headers: this.agentsOfPingTaskHeaders
      })
    },
    getSinglePingTask() {
      this.$store.dispatch('nqmPingTask/getSinglePingTask', { pingTaskId: this.$route.params.id })
    },
    pageChange(data) {
      this.agentsOfPingTaskHeaders['Page-Pos'] = data.page
      this.getAgentsOfPingTask()
    },
    handleAgentChange(data) {
      if (Object.values(data)[0]) {
        this.$store.dispatch('nqmPingTask/assignAgentToPingTask', {
          pingTaskId: this.$route.params.id,
          agentId: Object.keys(data)[0]
        })
      } else {
        this.$store.dispatch('nqmPingTask/deleteAgentFromPingTask', {
          pingTaskId: this.$route.params.id,
          agentId: Object.keys(data)[0]
        })
      }
    },
    searchAgent(e) {
      if ((e.type === 'keypress' && e.charCode === 13) || e.type === 'click') {
        const input = this.$refs.searchAgent.value
        if (input === '.+' || !input) {
          delete this.agentsOfPingTaskParams.hostname

          this.agentsOfPingTaskHeaders = {
            'Page-Pos': '1',
            'Order-By': 'applied#desc'
          }
          this.getAgentsOfPingTask()
        } else {
          this.agentsOfPingTaskParams = {
            ...this.agentsOfPingTaskParams,
            hostname: input
          }

          this.agentsOfPingTaskHeaders = {
            'Page-Pos': '1',
            'Order-By': 'applied#desc'
          }
          this.getAgentsOfPingTask()
        }
      }
    }
  },

  render(h) {
    const { gridData } = this
    const { agents, singlePingTaskInfo, agentPagePos, agentTotalCount, agentPageSize, agentPageMore } = this.$store.state.nqmPingTask
    const props = {
      ...gridData,
      rows: agents
    }
    return (
      <div class={s.nqmMngApp}>
        <div class={s.optionWrapper}>
          <Flex split>
            <Flex.Col class={s.options}>
              <Link to="/nqm-ping-task" class={s.buttonContent}>
                <Button status="primary" class={s.buttonBack}>
                  <Icon typ="fold" size={18} class={s.back} />
                  <span>Back to PingTask List</span>
                </Button>
              </Link>
            </Flex.Col>
            <Flex.Col class={s.searchBar}>
              <Input ref="searchAgent" nativeOn-keypress={this.searchAgent} placeholder="search hostname" />
              <Button status="primary" class={s.searchButton} nativeOn-click={this.searchAgent}>Search</Button>
            </Flex.Col>
          </Flex>
        </div>
        <div class={s.nqmMngListWrapper}>
          <Grid class={s.nqmListGrid} {...{ props }} />
        </div>
        <Page class={s.nqmMngApp}
              ref="pager" 
              limit={agentPageSize} 
              total={agentTotalCount} 
              toPage={agentPagePos} 
              on-page={this.pageChange}
        />
      </div>
    )
  }
}