import { Tab, Tip, Input, Button, Grid, Checkbox, Page, Select, Flex, LightBox, DatePicker, TimePicker } from '@cepave/owl-ui'
import s from './alarm.scss'
const { moment } = window

const AlarmPage = {
  name: 'AlarmPage',
  data() {
    return {
      priorityOpts: [
        { value: -1, title: 'Select priority', selected: true },
        { value: 0, title: '0' },
        { value: 1, title: '1' },
        { value: 2, title: '2' },
        { value: 3, title: '3' }
      ],
      toPage: 1,
      event_id: '',
      isValidationMsgShow: false,
      alarmData: {
        heads: [
          {
            key: 'endpoint',
            width: '18%',
            sort: -1,
            name: 'Endpoint'
          },
          {
            key: 'metric',
            width: '18%',
            sort: -1,
            name: 'Metric'
          },
          {
            key: 'status',
            width: '8%',
            sort: -1,
            name: 'Status'
          },
          {
            key: 'description',
            width: '16%',
            sort: -1,
            name: 'Description'
          },
          {
            key: 'time',
            width: '15%',
            sort: -1,
            sortKey: 'timestamp',
            name: 'Time'
          },
          {
            key: 'steps',
            width: '5%',
            name: 'Steps'
          },
          {
            key: 'value',
            width: '10%',
            name: 'Value'
          },
          {
            key: 'progress',
            width: '10%',
            name: 'Progress'
          }
        ],
        rowsRender: ({ row, index }) => {
          return [
            <Grid.Col>
              <Tip pos="right">
                { row.endpoint }
                <Tip.Context>
                  { row.id }
                </Tip.Context>
              </Tip>
            </Grid.Col>,
            <Grid.Col>{row.metric}</Grid.Col>,
            <Grid.Col>{row.status}</Grid.Col>,
            <Grid.Col>{row.note}</Grid.Col>,
            <Grid.Col>
              { moment(row.timestamp).format('YY/MM/DD hh:mm:ss') } -
              { moment(row.update_at).format('YY/MM/DD hh:mm:ss') }
            </Grid.Col>,
            <Grid.Col>{ `${row.current_step}/${row.step}` }</Grid.Col>,
            <Grid.Col>{ `${row.func} - ${row.cond}` }</Grid.Col>,
            <Grid.Col>
              <div class={[s.opeartionInline]}>
                  <a class={[s.opeartions, s.capitalize]} on-click={(event) => {
                    event.preventDefault()
                    this.event_id = row.id
                    const q = {
                      startTime: '',
                      endTime: '',
                      status: '',
                      event_id: row.id
                    }
                    this.openLightBox(q)
                  }}>{ (row.process_status === 'ignored') ? 'Add note' : row.process_status }</a>
              </div>
            </Grid.Col>
          ]
        }
      }
    }
  },
  mounted() {
    this.getAlarms()
  },
  methods: {
    getAlarms() {
      const { $store, $refs, filterResult } = this
      const status = filterResult($refs.statusCheck.checkedDatum)
      const processStatus = filterResult($refs.process_statusCheck.checkedDatum)
      const priority = $refs.prioritySelect.value
      const q = {
        status,
        process_status: processStatus,
        startTime: new Date(`${$refs.startDate.value} ${$refs.startTime.value}`).getTime() / 1000,
        endTime: new Date(`${$refs.endDate.value} ${$refs.endTime.value}`).getTime() / 1000
      }
      if (status.length === 0) {
        q.status = 'N/A'
      }
      if (processStatus.length === 0) {
        q.process_status = 'N/A'
      }
      if (priority !== -1) {
        q.priority = priority
      }
      this.isValidationMsgShow = (!status.length || !processStatus)
      $store.dispatch('alarm/getAlarms', q)
      this.toPage = 1
    },
    changePage(p) {
      this.$store.commit('alarm/changePage', p)
      this.toPage = p
    },
    filterResult(data) {
      delete data.all
      return Object.keys(data).filter(function(key) {
        return data[key]
      }).join(',')
    },
    openLightBox(q) {
      this.$store.dispatch('alarm/getStatusNotes', q)
      this.$refs.commentBox.open()
    },
    closeLightBox() {
      this.resetNoteInfo()
    },
    addNote() {
      const { event_id, $store, $refs, resetNoteInfo, getAlarms } = this
      const q = {
        event_id,
        note: $refs.message.value,
        case_id: $refs.case_id.value,
        status: $refs.processSelect.value
      }
      $store.dispatch('alarm/addNote', q)
      .then(() => {
        $store.dispatch('alarm/getStatusNotes', { event_id })
      }).then(() => {
        if ($refs.processSelect.value !== 'comment') {
          getAlarms()
        }
      }).then(() => {
        resetNoteInfo()
      })
    },
    resetNoteInfo() {
      const { $refs, $store } = this
      $refs.message.value = ''
      $refs.case_id.setValue('')
      $store.commit('alarm/resetProcessOpts')
    }
  },
  render(h) {
    const { $store, alarmData, priorityOpts, changePage, toPage,
      processOpts, addNote, getAlarms, isValidationMsgShow } = this
    const props = {
      rows: $store.state.alarm.pageRows,
      loading: $store.state.alarm.loading,
      ...alarmData
    }
    const statusNotes = $store.state.alarm.statusNotes

    return (
      <div class={s.alarmPage}>
        <Tab>
          <Tab.Head slot="tabHead" name="profile" isSelected={true}>Alarm</Tab.Head>
          <Tab.Content slot="tabContent" name="template">
            <div class={[s.queryWrapper]}>
              <Flex>
                <Flex.Col size="10">
                  <Flex>
                    <Flex.Col size="4">
                      <Flex>
                        <span class={[s.vpoint]}>Priority</span>
                        <Select ref="prioritySelect" class={s.input} options={priorityOpts} />
                      </Flex>
                    </Flex.Col>
                    <Flex.Col size="8">
                      <Flex>
                        <span class={[s.vpoint]}>Start</span>
                        <DatePicker ref="startDate" class={s.datePicker} />
                        <TimePicker ref="startTime" start={'00:00'} end={'23:45'} defaultValue={'00:00'} class={s.timePicker} />
                        <span class={[s.vpoint]}>End</span>
                        <DatePicker ref="endDate" class={s.datePicker} />
                        <TimePicker ref="endTime" start={'00:00'} end={'23:45'} class={s.timePicker} />
                      </Flex>
                    </Flex.Col>
                  </Flex>
                  <Flex class={s.queryMargin}>
                    <Flex.Col size="4">
                      <Flex>
                        <span class={[s.vpoint]}>Status</span>
                        <Checkbox.Group ref="statusCheck">
                          <Checkbox name="all" class={s.checkboxMargin} checked={true}>All</Checkbox>
                          <Checkbox name="OK" class={s.checkboxMargin}>OK</Checkbox>
                          <Checkbox name="PROBLEM" class={s.checkboxMargin}>PROBLEM</Checkbox>
                        </Checkbox.Group>
                      </Flex>
                    </Flex.Col>
                    <Flex.Col size="8">
                      <Flex>
                        <span class={[s.vpoint]}>Process status</span>
                        <Checkbox.Group ref="process_statusCheck">
                          <Checkbox name="all" class={s.checkboxMargin} checked={true}>All</Checkbox>
                          <Checkbox name="ignored" class={s.checkboxMargin}>Ignored</Checkbox>
                          <Checkbox name="unresolved" class={s.checkboxMargin}>Unresolved</Checkbox>
                          <Checkbox name="in progress" class={s.checkboxMargin}>In Progress</Checkbox>
                          <Checkbox name="resolved" class={s.checkboxMargin}>Resolved</Checkbox>
                        </Checkbox.Group>
                      </Flex>
                    </Flex.Col>
                    {/*<Flex.Col size="auto">
                      <Flex mid>
                        Metric
                        <Input class={s.searchInput} icon={['search', '#919799']} />
                        <Button class={s.submitButton} status="primary" >Submit</Button>
                      </Flex>
                    </Flex.Col>*/}
                  </Flex>
                </Flex.Col>
                <Flex.Col size="2">
                  <Flex>
                    <Flex.Col offset="5">
                      <Button status="primary" nativeOn-click={getAlarms}>Search</Button>
                    </Flex.Col>
                  </Flex>
                  <Flex class={s.queryMargin}>
                    { (!isValidationMsgShow) || <span class={s.validationMsg}>Select at least one status</span> }
                  </Flex>
                </Flex.Col>
              </Flex>
            </div>
            <div class={[s.gridWrapper]}>
              <div class={[s.gridContent]}>
                <Grid {...{ props }} />
                <Page total={$store.state.alarm.rows.length} limit={10} toPage={toPage}
                  onPage={({ page }) => {
                    changePage(page)
                  }} />
              </div>
          </div>
          </Tab.Content>
        </Tab>
        <LightBox closeOnESC closeOnClickMask ref="commentBox" onClose={this.closeLightBox}>
          <LightBox.View>
            <div>
              <h3>Note</h3>
              <Flex split>
                <Flex.Col size="auto">
                  <textarea ref="message" rows="7" cols="46" placeholder="Leave your messages here..."></textarea>
                  <span class={s.required}>＊</span>
                </Flex.Col>
                <Flex.Col size="auto">
                  <Select ref="processSelect" options={$store.state.alarm.processOpts}></Select>
                  <Input ref="case_id" class={s.mTop} placeholder="Case ID" />
                  <Button status="primary" class={[s.w100, s.mTop]} nativeOn-click={addNote}>Submit</Button>
                </Flex.Col>
              </Flex>
              { (statusNotes.length)
                ? <div>
                    <h3>Note List</h3>
                    {
                      statusNotes.map((statusNote, index) => {
                        return (
                          <Flex class={s.noteInfo}>
                            <Flex.Col size="auto">
                              <Flex split>
                                <Flex.Col>
                                  <p>{ statusNote.timestamp }</p>
                                </Flex.Col>
                                <Flex.Col>
                                  <Flex mid>
                                    <strong>{ statusNote.user }</strong>
                                  </Flex>
                                </Flex.Col>
                              </Flex>
                              <p class={s.noteStatus}>Status: { statusNote.status }</p>
                              <p class={s.noteComment}>{ statusNote.note }</p>
                            </Flex.Col>
                          </Flex>
                        )
                      })
                    }
                  </div>
                : '' }
            </div>
          </LightBox.View>
        </LightBox>
      </div>
    )
  }
}

module.exports = AlarmPage