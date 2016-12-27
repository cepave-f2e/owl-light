import { Tab, Input, Button, Grid, Icon } from 'vue-owl-ui'
import s from '../template.scss'

const TemplatePage = {
  name: 'TemplatePage',
  data() {
    const { $store, $router } = this
    return {
      gridData: {
        heads: [
          {
            col: '模板名称',
            sort: -1,
            width: '25%',
            render(h, head) {
              return (
                <b>{head.col}</b>
              )
            }
          },
          {
            width: '25%',
            sort: -1,
            col: 'parent'
          },
          {
            width: '20%',
            sort: -1,
            col: '建立者'
          },
          {
            width: '30%',
            col: '操作'
          }
        ],
        rowsRender(h, { row, index }) {
          return [
            <Grid.Col>{row[0].col}</Grid.Col>,
            <Grid.Col>{row[1].col}</Grid.Col>,
            <Grid.Col>{row[2].col}</Grid.Col>,
            <Grid.Col>
              <a href={row[3].col[0]}>更新</a>
              <a href={row[3].col[1]}>删除</a>
            </Grid.Col>,
          ]
        },
      }
    }
  },
  created() {
    this.getTemplates('.+')
  },
  methods: {
    getTemplates(q) {
      const { $store, $refs } = this
      $store.dispatch('getTemplates', {
        q: '.+',
      })
    },
  },
  render(h) {
    const { $store, $refs, $slots, gridData } = this
    const props = {
      rows: $store.state.templateList.rows,
      ...gridData
    }

    return (
      <div>
        <Tab>
          <Tab.Head slot="tabHead" name="profile" isSelected={true}>告警模板</Tab.Head>
          <Tab.Content slot="tabContent" name="template">
            <div style="display: flex">
              <Input class={s.searchInput} name="q" icon={['search', '#919799']} status="normal" placeholder="输入关键字查询" ref="inputRef" />
              <Button class={s.submitButton}status="primary">Submit</Button>
              <Button status="primary" >
                <Icon typ="plus" size={16} />
                  新增模板
              </Button>
            </div>
            <div>
              { $slots.default }
              <Grid {...{ props }} />
            </div>
          </Tab.Content>
        </Tab>
      </div>
    )
  }
}

module.exports = TemplatePage
