import { Tab, Input, Button, Grid, Icon, Checkbox, Label, LightBox } from 'vue-owl-ui'
import s from '../template.scss'
import u from '../../user/user.scss'
import Select2 from '../common/select2'
import Select2Muti from '../common/select2_multi'

const gridBase = {
  heads: [
    {
      width: '30%',
      col: '监控项/标签/备忘',
      render(h, head) {
        return (
          <b>{head.col}</b>
        )
      }
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
  rowsRender() {},
}
const TemplatePage = {
  name: 'TemplatePage',
  data() {
    const { $store, $router } = this
    const action = $store.state.templateUpdate.action
    return {
      gridData: gridBase,
      metricMap: [],
      tplId: $store.state.templateUpdate.name.id,
      tplName: $store.state.templateUpdate.name.name,
      actionId: action.id || 0,
      callback: action.callback || 1,
      callbackActions: {
        1: action.before_callback_sms,
        2: action.before_callback_mail,
        3: action.after_callback_sms,
        4: action.after_callback_mail,
      }
    }
  },
  created() {
    this.getTemplate()
    this.getMetric()
    this.gridData.rowsRender = (h, { row, index }) => {
      return [
        <Grid.Col>{row[0].col}</Grid.Col>,
        <Grid.Col>{row[1].col}</Grid.Col>,
        <Grid.Col>{row[2].col}</Grid.Col>,
        <Grid.Col>{row[3].col}</Grid.Col>,
        <Grid.Col>{row[4].col}</Grid.Col>,
        <Grid.Col>
          <a href="" sid={row[5].col} saction="update" onClick={(e) => this.getStragtegy(e, this)}>更新</a>
          <a href="" sid={row[5].col} saction="delete" onClick={(e) => this.deleteStragtegy(e, this)}>删除</a>
        </Grid.Col>,
      ]
    }
  },
  mounted() {
    this.getSimpleTplList()
    this.getTeamList()
  },
  methods: {
    getSimpleTplList() {
      const { $store, $refs } = this
      $store.dispatch('getSimpleTplList', {})
    },
    getTeamList() {
      const { $store, $refs } = this
      $store.dispatch('getTeamList', {})
    },
    getTemplate() {
      const { $store, $refs } = this
      $store.dispatch('getTemplate', {
        id: parseInt(this.$route.params.id),
      })
    },
    getMetric() {
      const { $store, $refs } = this
      $store.dispatch('getMetric', {})
    },
    getCheckboxData(data) {
      this.callbackActions = data
    },
    getStragtegy(e) {
      e.preventDefault()
      const id = e.currentTarget.attributes.sid.value
      const { $store, $refs } = this
      $store.dispatch('getStrategy', {
        id,
      })
      this.getMetric()
      this.$refs.LStragtegy.open(e)
    },
    openNewStragtegy(e) {
      this.$refs.NStragtegy.open(e)
    },
    deleteStragtegy(e) {
      const id = e.currentTarget.attributes.sid.value
      this.$refs.DStragtegy.open(e)
    },
    urlOnChnage(data) {
      console.log(data)
    },
    changeMetric(metric) {
      // this.metric = metric
      console.log('got metric', metric)
    },
    updateMetric(e) {
      const { $store } = this
      const UpdateStrategy = {
        tags: this.$refs.updateTags.value,
        run_end: this.$refs.updateRunEnd.value,
        run_begin: this.$refs.updateRunBegin.value,
        right_value: this.$refs.updateRightValue.value,
        priority: parseInt(this.$refs.updatePriority.value) || 0,
        op: this.$refs.updateOp.value,
        note: this.$refs.updateNote.value,
        metric: this.$refs.updateMetric.value,
        max_step: parseInt(this.$refs.updateMaxStep.value) || 0,
        id: parseInt(this.$refs.updateId.value) || 0,
        func: this.$refs.updateFunc.value
      }
      console.log(UpdateStrategy)
      $store.dispatch('updateStrategy', {
        ...UpdateStrategy
      })
    },
    newMetric(e) {
      const { $store } = this
      const NewStrategy = {
        tpl_id: $store.state.templateUpdate.name.id,
        tags: this.$refs.newTags.value,
        run_end: this.$refs.newRunEnd.value,
        run_begin: this.$refs.newRunEnd.value,
        right_value: this.$refs.newRightValue.value,
        priority: parseInt(this.$refs.newPriority.value) || 0,
        op: this.$refs.newOp.value,
        note: this.$refs.newNote.value,
        metric: this.$refs.newMetric.value,
        max_step:  parseInt(this.$refs.newMaxStep.value) || 0,
        func: this.$refs.newFunc.value
      }
      console.log(NewStrategy)
      $store.dispatch('newStrategy', {
        ...NewStrategy
      })
    },
    setMetric(metric) {
      console.log(`metric ${metric} selected`)
    },
    SaveTemplate(m) {
      const { $store, $refs } = this
      const parentId = $refs.updateParent.value
      const postbody = {
        tpl_id: $store.state.templateUpdate.name.id,
        parent_id: parseInt(parentId || this.parentId),
        name: $store.state.templateUpdate.name.name,
      }
      console.log(postbody)
      $store.dispatch('updateTemplate', postbody)
    },
    SaveAction(m) {
      const { $store, $refs } = this
      const uic = $refs.updateTeam.value
      const action = {
        url: $refs['action.url'].value,
        uic,
        id: $store.state.templateUpdate.action.id || 0,
        tpl_id: $store.state.templateUpdate.name.id,
        callback: this.callback,
        before_callback_sms: (this.callbackActions['1']) ? 1 : 0,
        before_callback_mail:  (this.callbackActions['2']) ? 1 : 0,
        after_callback_sms:  (this.callbackActions['3']) ? 1 : 0,
        after_callback_mail:  (this.callbackActions['4']) ? 1 : 0,
      }
      console.log(action)
      if (action.id === 0) {
        //create a new action
        $store.dispatch('createAction', action)
      } else {
        //update a action
        $store.dispatch('updateAction', action)
      }
    },
  },
  render(h) {
    const { $store, $refs, $slots, gridData } = this
    const props = {
      rows: $store.state.templateUpdate.strategys,
      tname: $store.state.templateUpdate.name.name,
      pname: $store.state.templateUpdate.parent.name,
      action: $store.state.templateUpdate.action,
      uics: $store.state.templateUpdate.uics,
      metric: $store.state.templateUpdate.ustrategy.metric,
      ...gridData
    }
    const merticProps = {
      options: $store.state.templateUpdate.metrics,
      value: $store.state.templateUpdate.ustrategy.metric,
      class: s.inputMetric,
      accpetTag: true,
    }
    const { tags, priority, func, op, note, id, metric  } = $store.state.templateUpdate.ustrategy
    const maxStep = $store.state.templateUpdate.ustrategy.max_step
    const rightValue = $store.state.templateUpdate.ustrategy.right_value
    const runBegin = $store.state.templateUpdate.ustrategy.run_begin
    const runEnd = $store.state.templateUpdate.ustrategy.run_end
    //UpdateStrategyView
    const UpdateStrategyView = (
      <LightBox ref="LStragtegy">
        <LightBox.View>
          <input class={s.inputA} placeholder="id" type="hidden" value={id.toString()} ref="updateId" />
          <input class='updateInputMetric' type="hidden" value={metric} ref="updateMetric"></input>
          <Select2 {...{ props: { setclass: 'updateInputMetric', ...merticProps } } } />
          <div style="display: flex;">
            <input class={s.inputA} placeholder="tags" value={tags} ref="updateTags" />
            <input class={s.inputA} placeholder="max" value={maxStep.toString()} ref="updateMaxStep" />
            <input class={s.inputA} placeholder="p" value={priority.toString()} ref="updatePriority" />
          </div>
          <div style="display: flex;">
            <input class={s.inputA} placeholder="func" value={func} ref="updateFunc" />
            <input class={s.inputA} placeholder="op" value={op} ref="updateOp" />
            <input class={s.inputA} placeholder="reght value" value={rightValue} ref="updateRightValue" />
          </div>
          <div style="display: flex;">
            <input class={s.inputA} placeholder="run begin" value={runBegin} ref="updateRunBegin" />
            <input class={s.inputA} placeholder="run end" value={runEnd} ref="updateRunEnd" />
            <input class={s.inputA} placeholder="note" value={note} ref="updateNote" />
          </div>
          <Button status="primary" nativeOn-click={(e) => this.updateMetric(e, this)}>
            储存
          </Button>
        </LightBox.View>
      </LightBox>
    )
    const newMerticProps = {
      options: $store.state.templateUpdate.metrics,
      value: '',
      class: s.inputMetric,
      setclass: 'newInputMetric',
      accpetTag: true,
    }
    //NewStrategyView
    const NewStrategyView = (
      <LightBox ref="NStragtegy">
        <LightBox.View>
          <input class='newInputMetric' type="hidden" ref="newMetric"></input>
          <Select2 {...{ props: { ...newMerticProps } } }  />
          <div style="display: flex;">
            <input class={s.inputA} placeholder="tags" ref="newTags" />
            <input class={s.inputA} placeholder="max" ref="newMaxStep" />
            <input class={s.inputA} placeholder="p" ref="newPriority" />
          </div>
          <div style="display: flex;">
            <input class={s.inputA} placeholder="func" ref="newFunc" />
            <input class={s.inputA} placeholder="op" ref="newOp" />
            <input class={s.inputA} placeholder="reght value" ref="newRightValue" />
          </div>
          <div style="display: flex;">
            <input class={s.inputA} placeholder="run begin" ref="newRunBegin" />
            <input class={s.inputA} placeholder="run end" ref="newRunEnd" />
            <input class={s.inputA} placeholder="note" ref="newNote" />
          </div>
          <Button status="primary" nativeOn-click={(e) => this.newMetric(e, this)}>
            储存
          </Button>
        </LightBox.View>
      </LightBox>
    )
    //DeleteStrategyView
    const DeleteStrategyView = (
      <LightBox ref="DStragtegy">
        <LightBox.View>
          <div>刪我阿, 笨蛋!</div>
        </LightBox.View>
      </LightBox>
    )
    const tplProps = {
      options: $store.state.templateList.simpleTList,
      value: $store.state.templateUpdate.parent.name,
      pid: $store.state.templateUpdate.parent.id,
      class: 'newParentSelect',
      setclass: 'newParent',
      accpetTag: false,
    }
    const teamProps = {
      options: $store.state.templateUpdate.teamList,
      value: $store.state.templateUpdate.uics,
      // pid: $store.state.templateUpdate.parent.id,
      class: 'newTeamSelect',
      setclass: 'newTeam',
    }

    return (
      <div>
        <Tab>
          <Tab.Head slot="tabHead" name="profile" isSelected={true}>编辑告警模板</Tab.Head>
          <Tab.Content slot="tabContent" name="template">
            <div class={[u.contactWrapper, s.lightDivButtom]} style="top: 0px">
              <div style="display: flex">
                <div style="width: 150px;">
                  name: <Label  typ="tag">{props.tname}</Label>
                </div>
                <div style="display: flex;" class={s.newParentSelectDiv}>
                  parent: <input type="hidden" class='newParent' placeholder="请输入模板名称" ref="updateParent" value={tplProps.pid}></input>
                  <Select2 { ...{ props: tplProps } } />
                  <div class={s.updateTplButDiv}>
                    <Button status="primary" nativeOn-click={(m) => this.SaveTemplate(m, this)}>
                      储存
                    </Button>
                  </div>
                </div>
              </div>
              <div>
                <div>
                  <h4>def alarm(): #配置了UIC组才会发报警</h4>
                  报警接收组（在UIC中管理报警组，快捷入口）：
                  <input class='newTeam' type="hidden" placeholder="告警组" ref="updateTeam" value={props.uics}></input>
                  <Select2Muti { ...{ props: teamProps } } />
                </div>
                <div>
                  <h4>def callback(): #高级用法，配置了callback地址才会触发回调</h4>
                  callback地址（只支持http get方式回调）：
                  <input class={s.searchInput} name="q" placeholder="callback url" value={props.action.url} ref="action.url" />
                  <Checkbox.Group onChange={this.getCheckboxData}>
                    <Checkbox name="1" checked={props.action.before_callback_sms} >回调之前发提醒短信</Checkbox>
                    <Checkbox name="2" checked={props.action.before_callback_mail} >回调之前发提醒邮件</Checkbox>
                    <Checkbox name="3" checked={props.action.after_callback_sms} >回调之后发结果短信</Checkbox>
                    <Checkbox name="4" checked={props.action.after_callback_mail} >回调之后发结果邮件</Checkbox>
                  </Checkbox.Group>
                </div>
                <Button status="primary" nativeOn-click={(m) => this.SaveAction(m, this)}>
                  储存
                </Button>
              </div>
            </div>
          </Tab.Content>
          <Tab.Head slot="tabHead" name="profile">编辑告警策略</Tab.Head>
          <Tab.Content slot="tabContent" name="template">
            <div>
              <div class={[u.contactSearchWrapper]}>
                <a href="/#/template">
                  <Button class={s.submitButton}status="primary">回模板列表</Button>
                </a>
                <Button status="primary" class={u.buttonIcon} nativeOn-click={(e) => this.openNewStragtegy(e, this) }>
                  <Icon typ="plus" size={16} />
                    新增策略
                </Button>
                {UpdateStrategyView}
                {NewStrategyView}
                {DeleteStrategyView}
              </div>
              <div class={[u.contactWrapper, s.lightDivButtom]} style="top: 0px">
                <div>
                  <Label  typ="tag">{props.tname}</Label>
                </div>
                { $slots.default }
                <Grid {...{ props }} />
              </div>
            </div>
          </Tab.Content>
        </Tab>
      </div>
    )
  }
}

module.exports = TemplatePage
