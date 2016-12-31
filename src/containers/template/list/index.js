import { Tab, Input, Button, Grid, Icon, LightBox } from 'vue-owl-ui'
import s from '../template.scss'
import u from '../../user/user.scss'
import _ from 'lodash'

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
        rowsRender() {},
      }
    }
  },
  created() {
    this.gridData.rowsRender = (h, { row, index }) => {
      return [
        <Grid.Col>{row[0].col}</Grid.Col>,
        <Grid.Col>{row[1].col}</Grid.Col>,
        <Grid.Col>{row[2].col}</Grid.Col>,
        <Grid.Col>
          <a href={row[3].col[0]}>更新</a>
          <a href={row[3].col[1]}>删除</a>
        </Grid.Col>,
      ]
    }
    this.getTemplates('.+')
  },
  methods: {
    getTemplates(q) {
      const { $store, $refs } = this
      $store.dispatch('getTemplates', {
        q,
      })
    },
    openNTemplate(e) {
      this.$refs.NTemplate.open(e)
    },
    submitQuery(e) {
      const queryString = this.$refs.inputRef.value || '.+'
      this.getTemplates(queryString)
    },
    createTemplate(e) {
      const name = this.$refs.tplName.value
      if (name !== '') {
        const { $store, $refs } = this
        $store.dispatch('createTemplate', {
          name,
          parent_id: 0,
        })
      } else {
        console.log('error name', name)
      }
    },
  },
  render(h) {
    const { $store, $refs, $slots, gridData } = this
    const props = {
      rows: $store.state.templateList.rows,
      ...gridData
    }
    //NewTemplateView
    const NewTemplateView = (
      <LightBox ref="NTemplate">
        <LightBox.View>
          <h3>新增模板</h3>
          <input class='newName' placeholder="name" ref="tplName"></input>
          <Button status="primary" nativeOn-click={(e) => this.createTemplate(e, this)}>
            储存
          </Button>
        </LightBox.View>
      </LightBox>
    )

    return (
      <div>
        <Tab>
          <Tab.Head slot="tabHead" name="profile" isSelected={true}>告警模板</Tab.Head>
          <Tab.Content slot="tabContent" name="template">
            <div>
              <div class={[u.contactSearchWrapper]}>
                <div style="display: flex;">
                  <Input class={s.searchInput} name="q" icon={['search', '#919799']} status="normal" placeholder="输入模板关键字查询" ref="inputRef" />
                  <Button class={s.submitButton} status="primary" nativeOn-click={(e) => this.submitQuery(e)} >Submit</Button>
                  <Button status="primary" class={u.buttonIcon} nativeOn-click={(e) => this.openNTemplate(e, this)}>
                    <Icon typ="plus" size={16} />
                      新增模板
                  </Button>
                </div>
              </div>
              <div class={[u.contactWrapper]}>
                { $slots.default }
                <Grid {...{ props }} />
              </div>
              {NewTemplateView}
            </div>
          </Tab.Content>
        </Tab>
      </div>
    )
  }
}

module.exports = TemplatePage
