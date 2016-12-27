import { Tab, Input, Button, Grid, Icon, Checkbox, Label, LightBox } from 'vue-owl-ui'
import s from '../template.scss'

const gridBase =  {
  heads: [
    {
      width: '30%',
      col: '监控项/标签/备忘'
    },
    {
      width: '15%',
      col: '条件'
    },
    {
      width: '10%',
      col: 'max'
    },
    {
      width: '10%',
      col: 'P'
    },
    {
      width: '10%',
      col: 'run'
    },
    {
      width: '25%',
      col: 'operation'
    }
  ],
  rowsRender(h, { row, index }) {
    return [
      <Grid.Col>{row[0].col}</Grid.Col>,
      <Grid.Col>{row[1].col}</Grid.Col>,
      <Grid.Col>{row[2].col}</Grid.Col>,
      <Grid.Col>{row[3].col}</Grid.Col>,
      <Grid.Col>{row[4].col}</Grid.Col>,
      <Grid.Col>
        <a href={row[5].col[0]}>更新</a>
        <a href={row[5].col[1]}>删除</a>
      </Grid.Col>,
    ]
  },
}
const TemplatePage = {
  name: 'TemplatePage',
  data() {
    const { $store, $router } = this
    return {
      gridData: gridBase,
    }
  },
  created() {
    this.getTemplate()
  },
  methods: {
    getTemplate() {
      const { $store, $refs } = this
      $store.dispatch('getTemplate', {
        id: parseInt(this.$route.params.id),
      })
    },
    getCheckboxData(data) {
      console.log(data)
    },
    urlOnChnage(data) {
      console.log(data)
    }
  },
  render(h) {
    const { $store, $refs, $slots, gridData } = this
    const props = {
      rows: $store.state.templateUpdate.stratges,
      tname: $store.state.templateUpdate.name.name,
      pname: $store.state.templateUpdate.parent.name,
      callback: $store.state.templateUpdate.callback,
      uics: $store.state.templateUpdate.uics,
      ...gridData
    }
    return (
      <div>
        <Tab>
          <Tab.Head slot="tabHead" name="profile">编辑告警模板</Tab.Head>
          <Tab.Content slot="tabContent" name="template">
            <div style="display: flex">
              name: <Label  typ="tag">{props.tname}</Label>
              parent:<Input class={s.searchInput} name="q" placeholder="请输入模板名称" val={props.pname} />
            </div>
            <div>
              <div>
                <h3>def alarm(): #配置了UIC组才会发报警</h3>
                报警接收组（在UIC中管理报警组，快捷入口）：<Input class={s.searchInput} name="q" placeholder="告警组" val={props.uics} nativeOn-keypress={this.urlOnChnage} />
              </div>
              <div>
                <h3>def callback(): #高级用法，配置了callback地址才会触发回调</h3>
                callback地址（只支持http get方式回调）：<Input class={s.searchInput} name="q" placeholder="callback url" ref="props.callback.url" />
                <Checkbox.Group onChange={this.getCheckboxData}>
                  <Checkbox name="1">回调之前发提醒短信</Checkbox>
                  <Checkbox name="2">回调之前发提醒邮件</Checkbox>
                  <Checkbox name="3">回调之后发结果短信</Checkbox>
                  <Checkbox name="4">回调之后发结果邮件</Checkbox>
                </Checkbox.Group>
              </div>
              <Button status="primary" >
                储存
              </Button>
            </div>
          </Tab.Content>
          <Tab.Head slot="tabHead" name="profile" isSelected={true}>编辑告警策略</Tab.Head>
          <Tab.Content slot="tabContent" name="template">
            <div class="lightDiv">
              <LightBox>
                <LightBox.Open>
                  <Button status="primary" >
                    <Icon typ="plus" size={16} />
                      新增策略
                  </Button>
                </LightBox.Open>
                <LightBox.View>
                  <div>
                    <h3>新增告警</h3>
                    <div>
                      <Input class={s.inputMetric} placeholder="metric" />
                    </div>
                    <div style="display: flex;">
                      <Input class={s.inputTags} placeholder="tags" />
                      <Input class={s.inputMax} placeholder="max" />
                      <Input class={s.inputP} placeholder="p" />
                    </div>
                    <div style="display: flex;">
                      <Input class={s.searchInput} placeholder="func" />
                      <Input class={s.searchInput} placeholder="op" />
                      <Input class={s.searchInput} placeholder="reght value" />
                    </div>
                    <div style="display: flex;">
                      <Input class={s.searchInput} placeholder="run begin" />
                      <Input class={s.searchInput} placeholder="run end" />
                      <Input class={s.inputNote} placeholder="note" />
                    </div>
                    <Button status="primary" >
                      储存
                    </Button>
                  </div>
                </LightBox.View>
              </LightBox>
            </div>
            <div class={s.lightDivButtom}>
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
