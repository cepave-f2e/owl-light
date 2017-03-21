import { Flex, Grid, Select, Button, Input, LightBox, Page, Switch, Icon, MultiSelect, Tab } from '@cepave/owl-ui'
import Link from '~coms/link'
import s from '../nqm-mng/nqm-mng.scss'

module.exports = {
  name: 'NqmPingTask',

  mounted() {
    this.getIsp()
    this.getPingTasks()
    this.$store.dispatch('nqmPingTask/getIsp')
    this.$store.dispatch('nqmPingTask/getProvince')
    this.$store.dispatch('nqmPingTask/getCities')
    this.$store.dispatch('nqmPingTask/getNameTags')
    this.$store.dispatch('nqmPingTask/getGroupTags')
  },

  data() {
    const h = this.$createElement
    return {
      gridData: {
        heads: [
          {
            name: '任务名称',
            key: 'name',
            width: '15%',
          },
          {
            name: '周期',
            key: 'period',
            width: '3%',
          },
          {
            name: '探测设备',
            key: 'numOfEnabledAgents',
            width: '3%',
          },
          {
            name: '省份',
            key: 'provinces',
            width: '11%',
          },
          {
            name: '城市',
            key: 'cities',
            width: '11%',
          },
          {
            name: 'ISP',
            key: 'isp',
            width: '11%',
          },
          {
            name: '标签',
            key: 'nameTag',
            width: '9%',
          },
          {
            name: '组织签',
            key: 'groupTags',
            width: '10%',
          },
          {
            name: '备注',
            key: 'comment',
            width: '13%',
          },
          {
            name: '启用',
            key: 'laaaaaaa',
            width: '5%',
          },
          {
            name: '操作',
            key: 'operation',
            width: '10%',
          } 
        ],
        rowsRender: ({ row, index }) => {
          const enable = (row.enable) ? 'normal' : 'disable'
          return [
            <Grid.Col>{row.name}</Grid.Col>,
            <Grid.Col>{row.period}</Grid.Col>,
            <Grid.Col>{row.num_of_enabled_agents}</Grid.Col>,
            <Grid.Col>{row.NamesOfProvinceFilter}</Grid.Col>,
            <Grid.Col>{row.NamesOfCityFilter}</Grid.Col>,
            <Grid.Col>{row.NamesOfIspFilter}</Grid.Col>,
            <Grid.Col>{row.NamesOfNameTagFilter}</Grid.Col>,
            <Grid.Col>{row.NamesOfGroupTagFilter}</Grid.Col>,
            <Grid.Col>{row.comment}</Grid.Col>,
            <Grid.Col>
              <div class={s[`${enable}Circle`]}></div>
            </Grid.Col>,
            <Grid.Col>
              <div class={s.opeartionInline}>
                <span class={s.opeartions} on-click={(e) => this.openEditLb(e, row.id)}>編輯</span>
                <span><Link to={`/nqm-ping-task/${row.id}`} class={s.opeartions}>指派</Link></span>
              </div>
            </Grid.Col>
          ]
        }
      },
      pingTaskParams: {
        enable: true
      },
      pingTaskHeaders: {
        'Page-Pos': '1',
        'Order-By': 'period#desc'
      },
      currentPingTaskId: -1
    }
  },

  methods: {
    getIsp() {
      this.$store.dispatch('nqmPingTask/getIsp')
    },
    getPingTasks() {
      this.$store.dispatch('nqmPingTask/getPingTasks', {
        params: this.pingTaskParams,
        headers: this.pingTaskHeaders
      })
    },
    openCreateLb(e) {
      this.$refs.createPingTask.open(e)
    },
    openEditLb(e, id) {
      this.$refs.editPingTask.open(e)
      this.currentPingTaskId = id
      this.getSinglePingTask({
        pingTaskId: id,
      })
    },
    searchPingTaskName(e) {
      if ((e.type === 'keypress' && e.charCode === 13) || e.type === 'click') {
        const input = this.$refs.searchPingTaskName.value
        if (input === '.+' || !input) {
          delete this.pingTaskParams.name

          this.pingTaskHeaders = {
            'Page-Pos': '1',
            'Order-By': 'period#desc'
          }
          this.getPingTasks()
        } else {
          this.pingTaskParams = {
            ...this.pingTaskParams,
            name: input
          }

          this.pingTaskHeaders = {
            'Page-Pos': '1',
            'Order-By': 'period#desc'
          }
          this.getPingTasks()
        }
      }
    },
    selectEnable(data) {
      this.pingTaskParams = {
        ...this.pingTaskParams,
        enable: data.value
      }
      this.pingTaskHeaders = {
        'Page-Pos': '1',
        'Order-By': 'period#desc'
      }
      this.getPingTasks()
    },
    createPingTask(e) {
      this.$store.dispatch('nqmPingTask/createPingTask', {
        createPingTask: {
          period: +this.$refs.createPingTaskPeriod.value || 1,
          name: this.$refs.createPingTaskName.value || null,
          comment: this.$refs.createPingTaskComment.value || null,
          enable: this.$refs.createPingTaskStatus.check,
          filter: {
            ids_of_isp: (!this.$refs.createPingTaskIsps.labels.length)
            ? []
            : this.$refs.createPingTaskIsps.labels.map((isp, idx) => {
              return isp.id
            }),
            ids_of_province: (!this.$refs.createPingTaskProvinces.labels.length)
            ? []
            : this.$refs.createPingTaskProvinces.labels.map((province, idx) => {
              return province.id
            }),
            ids_of_city: (!this.$refs.createPingTaskCities.labels.length)
            ? []
            : this.$refs.createPingTaskCities.labels.map((city, idx) => {
              return city.id
            }),
            ids_of_name_tag: (!this.$refs.createPingTaskNameTags.labels.length)
            ? []
            : this.$refs.createPingTaskNameTags.labels.map((nameTag, idx) => {
              return nameTag.id
            }),
            ids_of_group_tag: (!this.$refs.createPingTaskGroupTags.labels.length)
            ? []
            : this.$refs.createPingTaskGroupTags.labels.map((groupTag, idx) => {
              return groupTag.id
            })
          }
        }
      })
      .then(() => {
        this.getPingTasks()
      })
    },
    editPingTask(e) {
      this.$store.dispatch('nqmPingTask/editPingTask', {
        pingTaskId: this.currentPingTaskId,
        editPingTask: {
          period: +this.$refs.editPingTaskPeriod.value || 1,
          name: this.$refs.editPingTaskName.value || null,
          comment: this.$refs.editPingTaskComment.value || null,
          enable: this.$refs.editPingTaskStatus.check,
          filter: {
            ids_of_isp: (!this.$refs.editPingTaskIsps.labels.length)
            ? []
            : this.$refs.editPingTaskIsps.labels.map((isp, idx) => {
              return isp.id
            }),
            ids_of_province: (!this.$refs.editPingTaskProvinces.labels.length)
            ? []
            : this.$refs.editPingTaskProvinces.labels.map((province, idx) => {
              return province.id
            }),
            ids_of_city: (!this.$refs.editPingTaskCities.labels.length)
            ? []
            : this.$refs.editPingTaskCities.labels.map((city, idx) => {
              return city.id
            }),
            ids_of_name_tag: (!this.$refs.editPingTaskNameTags.labels.length)
            ? []
            : this.$refs.editPingTaskNameTags.labels.map((nameTag, idx) => {
              return nameTag.id
            }),
            ids_of_group_tag: (!this.$refs.editPingTaskGroupTags.labels.length)
            ? []
            : this.$refs.editPingTaskGroupTags.labels.map((groupTag, idx) => {
              return groupTag.id
            })
          }
        }
      })
      .then(() => {
        this.getPingTasks()
        this.currentPingTaskId = -1
      })
    },
    pageChange(data) {
      this.pingTaskHeaders['Page-Pos'] = data.page
      this.getPingTasks()
    },
    getSinglePingTask(opts) {
      this.$store.dispatch('nqmPingTask/getSinglePingTask', opts)
    }
  },

  render(h) {
    const { gridData } = this
    const { pingTasks, pagePos, totalCount, pageSize, 
            provinces, ispOptions, cities, nameTags, groupTags, 
            agents, enableOptions, currentPingTaskInfo 
          } = this.$store.state.nqmPingTask
    const props = {
      ...gridData,
      rows: pingTasks
    }

    return (
      <div class={s.nqmMngPage}>
        <Tab>
          <Tab.Head slot="tabHead" name="1">探測任務</Tab.Head>
          <Tab.Content slot="tabContent" name="1">
            <div class={s.optionWrapper}>
              <Flex split>
                <Flex.Col class={s.options}>
                  <Select options={enableOptions} 
                          onChange={this.selectEnable}
                  />
                </Flex.Col>
                <Flex.Col class={s.searchBar}>
                  <Input ref="searchPingTaskName" nativeOn-keypress={this.searchPingTaskName} placeholder="search PingTask name" />
                  <Button status="primary" class={s.searchButton} nativeOn-click={this.searchPingTaskName}>Search</Button>
                  <Button status="primary" class={s.buttonIcon} nativeOn-click={this.openCreateLb}>
                    <Icon typ="plus" size={16} class={s.plus} />
                    新增項目
                  </Button>
                </Flex.Col>
              </Flex>
            </div>
            <div class={s.nqmMngListWrapper}>
              <Grid class={s.nqmListGrid} {...{ props }} />
            </div>

            <LightBox ref="createPingTask" closeOnClickMask closeOnESC>
              <LightBox.View>
                <h2 class={s.lbTitle}>新增探測任務</h2>
                <div class={s.inputGroup}>
                  <div class={s.formTitleGroup}>
                    <p class={s.formTitle}>任務名稱</p>
                    <p class={s.formTitleInfo}>設備作為探測起點</p>
                  </div>
                  <Input class={s.lbInput} ref="createPingTaskName" required={true} placeholder="探測任務名稱" />
                </div>
                <div class={s.inputGroup}>
                  <div class={s.formTitleGroup}>
                    <p class={s.formTitle}>週期</p>
                    <p class={s.formTitleInfo}>任務週期時間</p>
                  </div>
                  <Input class={s.lbInput} required={true} ref="createPingTaskPeriod" />
                </div>
                <div class={s.inputGroup}>
                  <div class={s.formTitleGroup}>
                    <p class={s.formTitle}>ISP</p>
                    <p class={s.formTitleInfo}>設備的ISP</p>
                  </div>
                  <MultiSelect  ref="createPingTaskIsps"
                                class={s.lbInput} 
                                options={ispOptions}
                                selectedOpts={[]}
                                displayKey="name"
                  />
                </div>
                <div class={s.inputGroup}>
                  <div class={s.formTitleGroup}>
                    <p class={s.formTitle}>省份</p>
                    <p class={s.formTitleInfo}>設備所在的省份</p>
                  </div>
                  <MultiSelect  ref="createPingTaskProvinces"
                                class={s.lbInput} 
                                options={provinces}
                                selectedOpts={[]}
                                displayKey="name"
                  />
                </div>
                <div class={s.inputGroup}>
                  <div class={s.formTitleGroup}>
                    <p class={s.formTitle}>城市</p>
                    <p class={s.formTitleInfo}>設備所在的城市</p>
                  </div>
                  <MultiSelect  ref="createPingTaskCities"
                                class={s.lbInput} 
                                options={cities}
                                selectedOpts={[]}
                                displayKey="name"
                  />
                </div>
                <div class={s.inputGroup}>
                  <div class={s.formTitleGroup}>
                    <p class={s.formTitle}>標籤</p>
                    <p class={s.formTitleInfo}>設備的標籤</p>
                  </div>
                  <MultiSelect  ref="createPingTaskNameTags"
                                class={s.lbInput} 
                                options={nameTags}
                                selectedOpts={[]}
                                displayKey="value"
                  />
                </div>
                <div class={s.inputGroup}>
                  <div class={s.formTitleGroup}>
                    <p class={s.formTitle}>組標籤</p>
                    <p class={s.formTitleInfo}>設備的組標籤</p>
                  </div>
                  <MultiSelect  ref="createPingTaskGroupTags"
                                class={s.lbInput} 
                                options={groupTags}
                                selectedOpts={[]}
                                displayKey="name"
                  />
                </div>
                <div class={s.inputGroup}>
                  <div class={s.formTitleGroup}>
                    <p class={s.formTitle}>備註</p>
                    <p class={s.formTitleInfo}>為設備添加更多資訊</p>
                  </div>
                  <textarea class={s.lbInput} rows="5" ref="createPingTaskComment"></textarea>
                </div>
                <div class={s.inputGroup}>
                  <div class={s.formTitleGroup}>
                    <p class={s.formTitle}>啟用</p>
                    <p class={s.formTitleInfo}>控制設備探測任務的開關</p>
                  </div>
                  <Switch checked={true} name="createPingTaskStatus" ref="createPingTaskStatus" typ="special" class={s.lbSwitch}>
                    <Switch.Open>開</Switch.Open>
                    <Switch.Close>關</Switch.Close>
                  </Switch>
                </div>
                <div class={s.lightboxFooter}>
                  <LightBox.Close>
                    <Button status="primaryOutline">取消</Button>
                  </LightBox.Close>
                  <LightBox.Close>
                    <Button status="primary" class={s.submitBtn} nativeOn-click={this.createPingTask}>添加</Button>
                  </LightBox.Close>
                </div>
              </LightBox.View>
            </LightBox>

            <LightBox ref="editPingTask" closeOnClickMask closeOnESC>
              <LightBox.View>
                <h2 class={s.lbTitle}>編輯探測任務</h2>
                <div class={s.inputGroup}>
                  <div class={s.formTitleGroup}>
                    <p class={s.formTitle}>任務名稱</p>
                    <p class={s.formTitleInfo}>設備作為探測起點</p>
                  </div>
                  <Input  class={s.lbInput} 
                          ref="editPingTaskName" 
                          required={true} 
                          placeholder="" 
                          val={currentPingTaskInfo.name}
                          required
                  />
                </div>
                <div class={s.inputGroup}>
                  <div class={s.formTitleGroup}>
                    <p class={s.formTitle}>週期</p>
                    <p class={s.formTitleInfo}>任務週期時間</p>
                  </div>
                  <Input  class={s.lbInput} 
                          ref="editPingTaskPeriod"
                          val={currentPingTaskInfo.period}
                          required
                  />
                </div>
                <div class={s.inputGroup}>
                  <div class={s.formTitleGroup}>
                    <p class={s.formTitle}>ISP</p>
                    <p class={s.formTitleInfo}>設備的ISP</p>
                  </div>
                  <MultiSelect  ref="editPingTaskIsps"
                                class={s.lbInput} 
                                options={ispOptions}
                                selectedOpts={currentPingTaskInfo.selectedOpts.isps}
                                displayKey="name"
                  />
                </div>
                <div class={s.inputGroup}>
                  <div class={s.formTitleGroup}>
                    <p class={s.formTitle}>省份</p>
                    <p class={s.formTitleInfo}>設備所在的省份</p>
                  </div>
                  <MultiSelect  ref="editPingTaskProvinces"
                                class={s.lbInput} 
                                options={provinces}
                                selectedOpts={currentPingTaskInfo.selectedOpts.provinces}
                                displayKey="name"
                  />
                </div>
                <div class={s.inputGroup}>
                  <div class={s.formTitleGroup}>
                    <p class={s.formTitle}>城市</p>
                    <p class={s.formTitleInfo}>設備所在的城市</p>
                  </div>
                  <MultiSelect  ref="editPingTaskCities"
                                class={s.lbInput} 
                                options={cities}
                                selectedOpts={currentPingTaskInfo.selectedOpts.cities}
                                displayKey="name"
                  />
                </div>
                <div class={s.inputGroup}>
                  <div class={s.formTitleGroup}>
                    <p class={s.formTitle}>標籤</p>
                    <p class={s.formTitleInfo}>設備的標籤</p>
                  </div>
                  <MultiSelect  ref="editPingTaskNameTags"
                                class={s.lbInput} 
                                options={nameTags}
                                selectedOpts={currentPingTaskInfo.selectedOpts.nameTags}
                                displayKey="value"
                  />
                </div>
                <div class={s.inputGroup}>
                  <div class={s.formTitleGroup}>
                    <p class={s.formTitle}>組標籤</p>
                    <p class={s.formTitleInfo}>設備的組標籤</p>
                  </div>
                  <MultiSelect  ref="editPingTaskGroupTags"
                                class={s.lbInput} 
                                options={groupTags}
                                selectedOpts={currentPingTaskInfo.selectedOpts.groupTags}
                                displayKey="name"
                  />
                </div>
                <div class={s.inputGroup}>
                  <div class={s.formTitleGroup}>
                    <p class={s.formTitle}>備註</p>
                    <p class={s.formTitleInfo}>為設備添加更多資訊</p>
                  </div>
                  <textarea class={s.lbInput} rows="5" ref="editPingTaskComment">{currentPingTaskInfo.comment}</textarea>
                </div>
                <div class={s.inputGroup}>
                  <div class={s.formTitleGroup}>
                    <p class={s.formTitle}>啟用</p>
                    <p class={s.formTitleInfo}>控制設備探測任務的開關</p>
                  </div>
                  <Switch checked={currentPingTaskInfo.enable} name="editPingTaskStatus" ref="editPingTaskStatus" typ="special" class={s.lbSwitch}>
                    <Switch.Open>開</Switch.Open>
                    <Switch.Close>關</Switch.Close>
                  </Switch>
                </div>
                <div class={s.lightboxFooter}>
                  <LightBox.Close>
                    <Button status="primaryOutline">取消</Button>
                  </LightBox.Close>
                  <LightBox.Close>
                    <Button status="primary" class={s.submitBtn} nativeOn-click={this.editPingTask}>添加</Button>
                  </LightBox.Close>
                </div>
              </LightBox.View>
            </LightBox>

            <Page class={s.nqmMngApp}
                  ref="pager" 
                  limit={pageSize} 
                  total={totalCount} 
                  toPage={pagePos} 
                  on-page={this.pageChange}
            />
          </Tab.Content>
        </Tab>
      </div>
    )
  }
}