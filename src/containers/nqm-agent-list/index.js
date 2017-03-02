import { Flex, Grid, Select, Button, Input, LightBox, Page, Switch, Icon, Label, Tab } from '@cepave/owl-ui'
import s from '../nqm-mng/nqm-mng.scss'

const { moment, validator } = window

module.exports = {
  name: 'NqmAgentList',

  mounted() {
    this.getIsp()
    this.getAgents()
    this.getProvince()
  },

  data() {
    const h = this.$createElement
    return {
      gridData: {
        heads: [
          {
            name: '設備名稱',
            key: 'name',
            width: '10%',
          },
          {
            name: '地理信息',
            key: 'location',
            width: '8%',
          },
          {
            name: 'ISP',
            key: 'isp',
            width: '8%',
          },
          {
            name: '辨識碼',
            key: 'connection_id',
            sort: 1,
            width: '17%',
          },
          {
            name: '所屬探測組',
            key: 'groupTags',
            width: '12%',
          },
          {
            name: '備註',
            key: 'comment',
            width: '18%',
          },
          {
            name: '狀態',
            key: 'status',
            width: '5%',
          },
          {
            name: '最後上報',
            key: 'lastHeartbeatTime',
            sort: -1,
            width: '13%',
          },
          {
            name: '操作',
            key: 'operation',
            width: '9%',
          } 
        ],
        rowsRender: ({ row, index }) => {
          const province = (row.province.id === -1) ? '' : row.province.name
          const city = (row.city.id === -1) ? '' : row.city.name
          const isp = (row.isp.id === -1) ? '' : row.isp.name
          const groupTags = row.group_tags.reduce((preVal, newVal, idx) => {
            return `${preVal} ${newVal.name}`
          }, '')
          const status = (row.status) ? 'normal' : 'disable'
          return [
            <Grid.Col>{row.name}</Grid.Col>,
            <Grid.Col>{province} {city}</Grid.Col>,
            <Grid.Col>{isp}</Grid.Col>,
            <Grid.Col>{row.connection_id}</Grid.Col>,
            <Grid.Col>{groupTags}</Grid.Col>,
            <Grid.Col>{row.comment}</Grid.Col>,
            <Grid.Col><div class={s[`${status}Circle`]}></div></Grid.Col>,
            <Grid.Col>{moment.unix(moment(row.last_heartbeat_time).unix()).format('YYYY-MM-DD HH:mm:ss')}</Grid.Col>,
            <Grid.Col>
              <div class={s.opeartionInline}>
                <span class={s.opeartions} on-click={(e) => this.openEditLb(e, row.id)}>編輯</span>
              </div>
            </Grid.Col>
          ]
        }
      },
      agentParams: {
        status: 1
      },
      agentHeaders: {
        'Page-Pos': '1',
        'Order-By': 'connection_id#asc'
      },
      currentAgentId: -1
    }
  },

  methods: {
    getIsp() {
      this.$store.dispatch('nqmAgentList/getIsp')
    },
    getAgents() {
      this.$store.dispatch('nqmAgentList/getAgentList', {
        params: this.agentParams,
        headers: this.agentHeaders
      })
    },
    getSingleAgent(opts) {
      this.$store.dispatch('nqmAgentList/getAgentInfo', opts)
      .then((data) => {
        if (data.province === -1) {
          this.$store.dispatch('nqmAgentList/getCityName', { cityId: data.city })
        } else {
          this.$store.dispatch('nqmAgentList/getCitiesByProvince', { provinceId: data.province, selected: data.city })
        }
      })
    },
    getProvince() {
      this.$store.dispatch('nqmAgentList/getProvince')
    },
    getCities(data) {
      this.$store.dispatch('nqmAgentList/getCitiesByProvince', {
        provinceId: data.value
      })
    },

    pageChange(data) {
      this.agentHeaders['Page-Pos'] = data.page
      this.getAgents()
    },

    openEditLb(e, id) {
      e.preventDefault()
      this.$refs.editAgentInfo.open(e)
      this.currentAgentId = id
      this.getSingleAgent({
        agentId: id,
      })
    },
    openCreateLb(e) {
      e.preventDefault()
      this.$refs.createAgent.open(e)
      this.getProvince()
    },

    createAgent(e) {
      this.$store.dispatch('nqmAgentList/createAgent', {
        createAgent: {
          name: this.$refs.createAgentName.value || null,
          hostname: this.$refs.createAgentConnectionId.value.split('@')[0],
          connection_id: this.$refs.createAgentConnectionId.value,
          status: this.$refs.createAgentStatus.check,
          comment: this.$refs.createAgentComment.value || null,
          isp_id: this.$refs.createAgentISP.value,
          province_id: this.$refs.createAgentProvince.value,
          city_id: this.$refs.createAgentCity.value,
          name_tag: this.$refs.createAgentNameTag.value || null,
          group_tags: (!this.$refs.createAgentGroupTags.labelData) 
          ? [] 
          : this.$refs.createAgentGroupTags.labelData.map((label, idx) => {
            return label.name
          }),
        }
      })
      .then(() => {
        this.getAgents()
      })
    },
    editAgentInfo(e) {
      const { currentAgentInfo } = this.$store.state.nqmAgentList

      //can improve to use compare function with axios
      const data = {
        status: this.$refs.editAgentStatus.check,
        name: (!this.$refs.editAgentName.value) ? null : this.$refs.editAgentName.value,
        comment: (!this.$refs.editAgentName.value) ? null : this.$refs.editAgentComment.value,
        isp_id: (!this.$refs.editAgentIsp.value) ? -1 : this.$refs.editAgentIsp.value,
        province_id: (!this.$refs.editAgentProvince.value) ? -1 : this.$refs.editAgentProvince.value,
        city_id: (!this.$refs.editAgentCity.value) ? -1 : this.$refs.editAgentCity.value,
        name_tag: (!this.$refs.editAgentNameTag.value) ? null : this.$refs.editAgentNameTag.value,
        group_tags: (!this.$refs.editAgentGroupTags.labelData) 
        ? [] 
        : this.$refs.editAgentGroupTags.labelData.map((label, idx) => {
          return label.name
        })
      }

      this.$store.dispatch('nqmAgentList/editAgent', {
        editAgent: {
          agentId: this.currentAgentId,
          data
        }
      })
      .then(() => {
        this.getAgents()
        this.currentAgentId = -1
      })
      
    },

    searchAgentName(e) {
      const { getAgents } = this
      if ((e.type === 'keypress' && e.charCode === 13) || e.type === 'click') {
        const input = this.$refs.searchAgentName.value

        //search ip first and then name
        // if (validator.isIP(input)) {
        //   this.agentParams = {
        //     ...this.agentParams,
        //     ip_address: input
        //   }
        //   this.agentHeaders = {
        //     'Page-Pos': '1',
        //     'Order-By': 'connection_id#asc'
        //   }
        //   getAgents()
        // } else if (input === '.+' || !input) {
        //   delete this.agentParams.name
        //   delete this.agentParams.ip_address

        //   this.agentHeaders = {
        //     'Page-Pos': '1',
        //     'Order-By': 'connection_id#asc'
        //   }
        //   getAgents()
        // } else {
        //   this.agentParams = {
        //     ...this.agentParams,
        //     name: input
        //   }

        //   this.agentHeaders = {
        //     'Page-Pos': '1',
        //     'Order-By': 'connection_id#asc'
        //   }
        //   getAgents()
        // }

        if (input === '.+' || !input) {
          delete this.agentParams.hostname

          this.agentHeaders = {
            'Page-Pos': '1',
            'Order-By': 'connection_id#asc'
          }
          getAgents()
        } else {
          this.agentParams = {
            ...this.agentParams,
            hostname: input
          }

          this.agentHeaders = {
            'Page-Pos': '1',
            'Order-By': 'connection_id#asc'
          }
          getAgents()
        }
      }
    },
    selectIsp(data) {
      if (data.value) {
        this.agentParams = {
          ...this.agentParams,
          isp_id: data.value
        }
        this.agentHeaders = {
          'Page-Pos': '1',
          'Order-By': 'connection_id#asc'
        }
      } else { //all isps
        delete this.agentParams.isp_id
      }
      this.getAgents()
    },
    selectStatus(data) {
      if (data.value) {
        this.agentParams = {
          ...this.agentParams,
          status: +data.value
        }
        this.agentHeaders = {
          'Page-Pos': '1',
          'Order-By': 'connection_id#asc'
        }
      }
      this.getAgents()
    },
    sortAgents(data) { //pending
      const dir = (!data.sort) ? 'asc' : 'desc'
      this.agentHeaders = {
        'Page-Pos': '1',
        'Order-By': 'connection_id#asc'
      }
      this.getAgents()
    }
  },

  render(h) {
    const { gridData, currentAgentId } = this
    const { agents, pagePos, totalCount, pageSize, orderBy, isps, ispOptions, currentAgentInfo,
            statusOptions, provinces, cities } = this.$store.state.nqmAgentList

    const props = {
      ...gridData,
      rows: agents
    }    
    return (
      <div class={s.nqmMngPage}>
        <Tab>
          <Tab.Head slot="tabHead" name="1">探測設備</Tab.Head>
          <Tab.Content slot="tabContent" name="1">
            <div class={s.optionWrapper}>
              <Flex split>
                <Flex.Col class={s.options}>
                  <Select class={s.selectIsp} 
                          ref="selectIsp" 
                          options={isps} 
                          nameKey="name" 
                          valueKey="id" 
                          onChange={this.selectIsp}
                  />
                  <Select options={statusOptions} 
                          onChange={this.selectStatus}
                  />
                </Flex.Col>
                <Flex.Col class={s.searchBar}>
                  <Input ref="searchAgentName" nativeOn-keypress={this.searchAgentName} placeholder="search hostname" />
                  <Button status="primary" class={s.searchButton} nativeOn-click={this.searchAgentName}>Search</Button>
                  <Button status="primary" class={s.buttonIcon} nativeOn-click={this.openCreateLb}>
                    <Icon typ="plus" size={16} class={s.plus} />
                    新增項目
                  </Button>
                </Flex.Col>
              </Flex>
            </div>
            <div class={s.nqmMngListWrapper}>
              <Grid class={s.nqmListGrid} {...{ props }} onSort={this.sortAgents} />
            </div>

            <LightBox ref="createAgent" closeOnClickMask closeOnESC>
              <LightBox.View>
                <h2 class={s.lbTitle}>新增探測設備</h2>
                <div class={s.inputGroup}>
                  <div class={s.formTitleGroup}>
                    <p class={s.formTitle}>設備名稱</p>
                    <p class={s.formTitleInfo}>設備作為探測起點</p>
                  </div>
                  <Input class={s.lbInput} ref="createAgentName" required={true} placeholder="" />
                </div>
                <div class={s.inputGroup}>
                  <div class={s.formTitleGroup}>
                    <p class={s.formTitle}>辨識碼</p>
                    <p class={s.formTitleInfo}>作為辨識設備的代碼</p>
                  </div>
                  <Input  class={s.lbInput} 
                          ref="createAgentConnectionId" 
                          required={true} 
                          placeholder="<hostname>@<ip>" 
                  />
                </div>
                <div class={s.inputGroup}>
                  <div class={s.formTitleGroup}>
                    <p class={s.formTitle}>ISP</p>
                    <p class={s.formTitleInfo}>設備的ISP</p>
                  </div>
                  <Select class={s.lbSelect}
                          options={ispOptions} 
                          nameKey="name" 
                          valueKey="id"  
                          ref="createAgentISP"
                  />
                </div>
                <div class={s.inputGroup}>
                  <div class={s.formTitleGroup}>
                    <p class={s.formTitle}>省份</p>
                    <p class={s.formTitleInfo}>設備所在的省份</p>
                  </div>
                  <Select class={s.lbSelect}
                          options={provinces} 
                          nameKey="name" 
                          valueKey="id"  
                          ref="createAgentProvince"
                          onChange={this.getCities}
                  />
                </div>
                <div class={s.inputGroup}>
                  <div class={s.formTitleGroup}>
                    <p class={s.formTitle}>城市</p>
                    <p class={s.formTitleInfo}>設備所在的城市</p>
                  </div>
                  <Select class={s.lbSelect}
                          options={cities} 
                          nameKey="name" 
                          valueKey="id"  
                          ref="createAgentCity"
                  />
                </div>
                <div class={s.inputGroup}>
                  <div class={s.formTitleGroup}>
                    <p class={s.formTitle}>標籤</p>
                    <p class={s.formTitleInfo}>設備的標籤</p>
                  </div>
                  <Input class={s.lbInput} ref="createAgentNameTag" />
                </div>
                <div class={s.inputGroup}>
                  <div class={s.formTitleGroup}>
                    <p class={s.formTitle}>組標籤</p>
                    <p class={s.formTitleInfo}>設備的組標籤</p>
                  </div>
                  <Label.Group  class={s.lbInput}
                                displayKey="name"
                                ref="createAgentGroupTags"
                                typ="outline"
                                x={true} 
                                badge={true} 
                                newTag={true}
                                options={[]}
                  />
                </div>
                <div class={s.inputGroup}>
                  <div class={s.formTitleGroup}>
                    <p class={s.formTitle}>探測設備狀態</p>
                    <p class={s.formTitleInfo}>屏蔽後將暫停顯示探測數據</p>
                  </div>
                  <Switch checked={true} name="createAgentStatus" ref="createAgentStatus" typ="special" class={s.lbSwitch}>
                    <Switch.Open>開</Switch.Open>
                    <Switch.Close>關</Switch.Close>
                  </Switch>
                </div>
                <div class={s.inputGroup}>
                  <div class={s.formTitleGroup}>
                    <p class={s.formTitle}>備註</p>
                    <p class={s.formTitleInfo}>為設備添加更多資訊</p>
                  </div>
                  <textarea class={s.lbInput} rows="5" ref="createAgentComment"></textarea>
                </div>
                <div class={s.lightboxFooter}>
                  <LightBox.Close>
                    <Button status="primaryOutline">取消</Button>
                  </LightBox.Close>
                  <LightBox.Close>
                    <Button status="primary" class={s.submitBtn} nativeOn-click={this.createAgent}>添加</Button>
                  </LightBox.Close>
                </div>
              </LightBox.View>
            </LightBox>

            <LightBox ref="editAgentInfo" closeOnClickMask closeOnESC>
              <LightBox.View>
                <h2 class={s.lbTitle}>編輯探測設備</h2>
                <div class={s.inputGroup}>
                  <div class={s.formTitleGroup}>
                    <p class={s.formTitle}>設備名稱</p>
                    <p class={s.formTitleInfo}>設備作為探測起點</p>
                  </div>
                  <Input class={s.lbInput} ref="editAgentName" val={currentAgentInfo.name} />
                </div>
                <div class={s.inputGroup}>
                  <div class={s.formTitleGroup}>
                    <p class={s.formTitle}>辨識碼</p>
                    <p class={s.formTitleInfo}>作為辨識設備的代碼</p>
                  </div>
                  <Input class={s.lbInput} ref="editAgentConnectionId" val={currentAgentInfo.connection_id} />
                </div>
                <div class={s.inputGroup}>
                  <div class={s.formTitleGroup}>
                    <p class={s.formTitle}>ISP</p>
                    <p class={s.formTitleInfo}>設備的ISP</p>
                  </div>
                  <Select class={s.lbSelect}
                          options={currentAgentInfo.ispOptions} 
                          nameKey="name" 
                          valueKey="id"  
                          ref="editAgentIsp"
                  />
                </div>
                <div class={s.inputGroup}>
                  <div class={s.formTitleGroup}>
                    <p class={s.formTitle}>省份</p>
                    <p class={s.formTitleInfo}>設備所在的省份</p>
                  </div>
                  <Select class={s.lbSelect}
                          options={currentAgentInfo.provincesOptions} 
                          nameKey="name" 
                          valueKey="id"  
                          ref="editAgentProvince"
                          onChange={this.getCities}
                  />
                </div>
                <div class={s.inputGroup}>
                  <div class={s.formTitleGroup}>
                    <p class={s.formTitle}>城市</p>
                    <p class={s.formTitleInfo}>設備所在的城市</p>
                  </div>
                  <Select class={s.lbSelect}
                          options={cities} 
                          nameKey="name" 
                          valueKey="id"  
                          ref="editAgentCity"
                  />
                </div>
                <div class={s.inputGroup}>
                  <div class={s.formTitleGroup}>
                    <p class={s.formTitle}>標籤</p>
                    <p class={s.formTitleInfo}>設備的標籤</p>
                  </div>
                  <Input class={s.lbInput} ref="editAgentNameTag" val={currentAgentInfo.nameTag} />
                </div>
                <div class={s.inputGroup}>
                  <div class={s.formTitleGroup}>
                    <p class={s.formTitle}>組標籤</p>
                    <p class={s.formTitleInfo}>設備的組標籤</p>
                  </div>
                  <Label.Group  class={s.lbInput}
                                displayKey="name"
                                ref="editAgentGroupTags"
                                typ="outline"
                                x={true} 
                                badge={true} 
                                newTag={true}
                                options={currentAgentInfo.groupTags}
                  />
                </div>
                <div class={s.inputGroup}>
                  <div class={s.formTitleGroup}>
                    <p class={s.formTitle}>探測設備狀態</p>
                    <p class={s.formTitleInfo}>屏蔽後將暫停顯示探測數據</p>
                  </div>
                  <Switch checked={currentAgentInfo.status} name="editAgentStatus" ref="editAgentStatus" typ="special" class={s.lbSwitch}>
                    <Switch.Open>開</Switch.Open>
                    <Switch.Close>關</Switch.Close>
                  </Switch>
                </div>
                <div class={s.inputGroup}>
                  <div class={s.formTitleGroup}>
                    <p class={s.formTitle}>備註</p>
                    <p class={s.formTitleInfo}>為設備添加更多資訊</p>
                  </div>
                  <textarea class={s.lbInput} rows="5" ref="editAgentComment">{currentAgentInfo.comment}</textarea>
                </div>
                <div class={s.lightboxFooter}>
                  <LightBox.Close>
                    <Button status="primaryOutline">取消</Button>
                  </LightBox.Close>
                  <LightBox.Close>
                    <Button status="primary" class={s.submitBtn} nativeOn-click={this.editAgentInfo}>修改</Button>
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