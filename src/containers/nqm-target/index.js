import { Flex, Grid, Select, Button, Input, LightBox, Page, Switch, Icon, Label, Tab } from '@cepave/owl-ui'
import s from '../nqm-mng/nqm-mng.scss'

module.exports = {
  name: 'NqmTarget',

  mounted() {
    this.getTargets()
    this.getIsp()
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
            width: '16%',
          },
          {
            name: 'IP',
            key: 'ip',
            width: '13%',
          },
          {
            name: '地理信息',
            key: 'location',
            width: '12%',
          },
          {
            name: 'ISP',
            key: 'isp',
            width: '8%',
          },
          {
            name: '備註',
            key: 'comment',
            width: '18%',
          },
          {
            name: '全探測',
            key: 'probedByAll',
            width: '5%',
          },
          {
            name: '啟用',
            key: 'available',
            width: '5%',
          },
          {
            name: '狀態',
            key: 'status',
            width: '5%',
          },
          {
            name: '創建時間',
            key: 'creationTime',
            width: '13%',
          },
          {
            name: '操作',
            key: 'operation',
            width: '5%',
          } 
        ],
        rowsRender: ({ row, index }) => {
          const province = (row.province.id === -1) ? '' : row.province.name
          const city = (row.city.id === -1) ? '' : row.city.name
          const isp = (row.isp.id === -1) ? '' : row.isp.name
          // const groupTags = row.group_tags.reduce((preVal, newVal, idx) => {
          //   return `${preVal} ${newVal.name}`
          // }, '')
          const status = (row.status) ? 'normal' : 'disable'
          const available = (row.available) ? 'normal' : 'disable'
          const probedByAll = (row.probed_by_all) ? 'normal' : 'disable'
          return [
            <Grid.Col>{row.name}</Grid.Col>,
            <Grid.Col>{row.host}</Grid.Col>,
            <Grid.Col>{province} {city}</Grid.Col>,
            <Grid.Col>{isp}</Grid.Col>,
            <Grid.Col>{row.comment}</Grid.Col>,
            <Grid.Col><div class={s[`${probedByAll}Circle`]}></div></Grid.Col>,
            <Grid.Col><div class={s[`${available}Circle`]}></div></Grid.Col>,
            <Grid.Col><div class={s[`${status}Circle`]}></div></Grid.Col>,
            <Grid.Col>{moment.unix(moment(row.creation_time).unix()).format('YYYY-MM-DD HH:mm:ss')}</Grid.Col>,
            <Grid.Col>
              <div class={s.opeartionInline}>
                <span class={s.opeartions} on-click={(e) => this.openEditLb(e, row.id)}>編輯</span>
              </div>
            </Grid.Col>
          ]
        }
      },
      targetParams: {
        status: 1
      },
      targetHeaders: {
        'Page-Pos': '1',
        'Order-By': 'host#asc'
      },
      currentTargetId: -1
    }
  },

  methods: {
    getIsp() {
      this.$store.dispatch('nqmTarget/getIsp')
    },
    getProvince() {
      this.$store.dispatch('nqmTarget/getProvince')
    },
    getCities(data, selected) {
      this.$store.dispatch('nqmTarget/getCitiesByProvince', {
        provinceId: data.value,
      })
    },
    getTargets() {
      this.$store.dispatch('nqmTarget/getTargets', {
        params: this.targetParams,
        headers: this.targetHeaders
      })
    },
    getSingleTarget(opts) {
      this.$store.dispatch('nqmTarget/getTargetInfo', opts)
      .then((data) => {
        if (data.province === -1) {
          this.$store.dispatch('nqmTarget/getCityName', { cityId: data.city })
        } else {
          this.$store.dispatch('nqmTarget/getCitiesByProvince', { provinceId: data.province, selected: data.city })
        }
      })
    },
    pageChange(data) {
      this.targetHeaders['Page-Pos'] = data.page
      this.getTargets()
    },
    openCreateLb(e) {
      e.preventDefault()
      this.$refs.createTarget.open(e)
      this.getProvince()
    },
    openEditLb(e, id) {
      const { ispOptions, provinces } = this.$store.state.nqmTarget
      e.preventDefault()
      this.$refs.editTargetInfo.open(e)
      this.currentTargetId = id
      this.getSingleTarget({
        targetId: id,
        // ispOptions,
        // provinces,
      })
    },
    createTarget(e) {
      this.$store.dispatch('nqmTarget/createTarget', {
        createTarget: {
          name: this.$refs.createTargetName.value || null,
          host: this.$refs.createTargetIp.value, //need verification?
          status: this.$refs.createTargetStatus.check,
          probed_by_all: this.$refs.createTargetProbedByAll.check,
          comment: this.$refs.createTargetComment.value || null,
          isp_id: this.$refs.createTargetISP.value,
          province_id: this.$refs.createTargetProvince.value,
          city_id: this.$refs.createTargetCity.value,
          name_tag: this.$refs.createTargetNameTag.value || null,
          group_tags: (!this.$refs.createTargetGroupTags.labelData) 
          ? [] 
          : this.$refs.createTargetGroupTags.labelData.map((label, idx) => {
            return label.name
          }),
        }
      })
      .then(() => {
        this.getTargets()
      })
    },
    editTargetInfo(e) {
      const { currentTargetInfo } = this.$store.state.nqmTarget

      //can improve to use compare function with axios
      const data = {
        status: this.$refs.editTargetStatus.check,
        probed_by_all: this.$refs.editTargetProbedByAll.check,
        host: (!this.$refs.editTargetIP.value) ? null : this.$refs.editTargetIP.value,
        name: (!this.$refs.editTargetName.value) ? null : this.$refs.editTargetName.value,
        comment: (!this.$refs.editTargetName.value) ? null : this.$refs.editTargetComment.value,
        isp_id: (!this.$refs.editTargetIsp.value) ? -1 : this.$refs.editTargetIsp.value,
        province_id: (!this.$refs.editTargetProvince.value) ? -1 : this.$refs.editTargetProvince.value,
        city_id: (!this.$refs.editTargetCity.value) ? -1 : this.$refs.editTargetCity.value,
        name_tag: (!this.$refs.editTargetNameTag.value) ? null : this.$refs.editTargetNameTag.value,
        group_tags: (!this.$refs.editTargetGroupTags.labelData) 
        ? [] 
        : this.$refs.editTargetGroupTags.labelData.map((label, idx) => {
          return label.name
        })
      }

      this.$store.dispatch('nqmTarget/editTarget', {
        editTarget: {
          targetId: this.currentTargetId,
          data
        }
      })
      .then(() => {
        this.getTargets()
        this.currentTargetId = -1
      })
    },
    selectIsp(data) {
      if (data.value) {
        this.targetParams = {
          ...this.targetParams,
          isp_id: data.value
        }
        this.targetHeaders = {
          'Page-Pos': '1',
          'Order-By': 'host#asc'
        }
      } else { //all isps
        delete this.targetParams.isp_id
      }
      this.getTargets()
    },
    selectStatus(data) {
      if (data.value) {
        this.targetParams = {
          ...this.targetParams,
          status: +data.value
        }
        this.targetHeaders = {
          'Page-Pos': '1',
          'Order-By': 'host#asc'
        }
      }
      this.getTargets()
    },
    searchTargetName(e) {
      const { getTargets } = this
      if ((e.type === 'keypress' && e.charCode === 13) || e.type === 'click') {
        const input = this.$refs.searchTargetName.value

        if (validator.isIP(input)) {
          this.targetParams = {
            ...this.targetParams,
            host: input
          }
          this.targetHeaders = {
            'Page-Pos': '1',
            'Order-By': 'host#asc'
          }
          getTatgets()
        } else if (input === '.+' || !input) {
          delete this.targetParams.name
          delete this.targetParams.ip_address

          this.targetHeaders = {
            'Page-Pos': '1',
            'Order-By': 'host#asc'
          }
          getTargets()
        } else {
          this.targetParams = {
            ...this.targetParams,
            name: input
          }

          this.targetHeaders = {
            'Page-Pos': '1',
            'Order-By': 'host#asc'
          }
          getTargets()
        }
      }
    },
    sortAgents() { //pending

    }
  },

  render(h) {
    const { gridData } = this
    const { targets, pageSize, totalCount, pagePos, orderBy, statusOptions, currentTargetInfo, 
            isps, provinces, cities, ispOptions 
          } = this.$store.state.nqmTarget
    const props = {
      ...gridData,
      rows: targets
    }

    return (
      <div class={s.nqmMngPage}>
        <Tab>
          <Tab.Head slot="tabHead" name="1">被探測設備</Tab.Head>
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
                  <Input ref="searchTargetName" nativeOn-keypress={this.searchTargetName} />
                  <Button status="primary" class={s.searchButton} nativeOn-click={this.searchTargetName}>Search</Button>
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

            <LightBox ref="createTarget" closeOnClickMask closeOnESC>
              <LightBox.View>
                <h2 class={s.lbTitle}>新增探測設備</h2>
                <div class={s.inputGroup}>
                  <div class={s.formTitleGroup}>
                    <p class={s.formTitle}>IP</p>
                    <p class={s.formTitleInfo}>被探測的IP</p>
                  </div>
                  <Input  class={s.lbInput} 
                          ref="createTargetIp" 
                          required={true} 
                          placeholder="填寫被探測的ip" 
                  />
                </div>
                <div class={s.inputGroup}>
                  <div class={s.formTitleGroup}>
                    <p class={s.formTitle}>設備名稱</p>
                    <p class={s.formTitleInfo}>設備作為探測起點</p>
                  </div>
                  <Input class={s.lbInput} ref="createTargetName" required={true} placeholder="創建被探測設備的名稱" />
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
                          ref="createTargetISP"
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
                          ref="createTargetProvince"
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
                          ref="createTargetCity"
                  />
                </div>
                <div class={s.inputGroup}>
                  <div class={s.formTitleGroup}>
                    <p class={s.formTitle}>標籤</p>
                    <p class={s.formTitleInfo}>設備的標籤</p>
                  </div>
                  <Input class={s.lbInput} ref="createTargetNameTag" />
                </div>
                <div class={s.inputGroup}>
                  <div class={s.formTitleGroup}>
                    <p class={s.formTitle}>組標籤</p>
                    <p class={s.formTitleInfo}>設備的組標籤</p>
                  </div>
                  {/*<Input class={s.lbInput} ref="createTargetGroupTags" placeholder="" />*/}
                  <Label.Group  class={s.lbInput}
                                displayKey="name"
                                ref="createTargetGroupTags"
                                typ="outline"
                                x={true} 
                                badge={true} 
                                newTag={true}
                                options={[]}
                  />
                </div>
                <div class={s.inputGroup}>
                  <div class={s.formTitleGroup}>
                    <p class={s.formTitle}>全探測</p>
                    <p class={s.formTitleInfo}>是否開放全任務探測該設備</p>
                  </div>
                  <Switch checked={true} name="createTargetProbedByAll" ref="createTargetProbedByAll" typ="special" class={s.lbSwitch}>
                    <Switch.Open>開</Switch.Open>
                    <Switch.Close>關</Switch.Close>
                  </Switch>
                </div>
                <div class={s.inputGroup}>
                  <div class={s.formTitleGroup}>
                    <p class={s.formTitle}>備註</p>
                    <p class={s.formTitleInfo}>為設備添加更多資訊</p>
                  </div>
                  <textarea class={s.lbInput} rows="5" ref="createTargetComment"></textarea>
                </div>
                <div class={s.inputGroup}>
                  <div class={s.formTitleGroup}>
                    <p class={s.formTitle}>啟用</p>
                    <p class={s.formTitleInfo}>啟用被探測點</p>
                  </div>
                  <Switch checked={true} name="createTargetStatus" ref="createTargetStatus" typ="special" class={s.lbSwitch}>
                    <Switch.Open>開</Switch.Open>
                    <Switch.Close>關</Switch.Close>
                  </Switch>
                </div>
                <div class={s.lightboxFooter}>
                  <LightBox.Close>
                    <Button status="primaryOutline">取消</Button>
                  </LightBox.Close>
                  <LightBox.Close>
                    <Button status="primary" class={s.submitBtn} nativeOn-click={this.createTarget}>添加</Button>
                  </LightBox.Close>
                </div>
              </LightBox.View>
            </LightBox>

            <LightBox ref="editTargetInfo" closeOnClickMask closeOnESC>
              <LightBox.View>
                <h2 class={s.lbTitle}>編輯被探測設備</h2>
                <div class={s.inputGroup}>
                  <div class={s.formTitleGroup}>
                    <p class={s.formTitle}>IP</p>
                    <p class={s.formTitleInfo}>被探測的IP</p>
                  </div>
                  <Input class={s.lbInput} ref="editTargetIP" val={currentTargetInfo.host} placeholder="填寫被探測的IP" />
                </div>
                <div class={s.inputGroup}>
                  <div class={s.formTitleGroup}>
                    <p class={s.formTitle}>設備名稱</p>
                    <p class={s.formTitleInfo}>設備作為探測終點</p>
                  </div>
                  <Input class={s.lbInput} ref="editTargetName" val={currentTargetInfo.name} placeholder="創建被探測設備的名稱" />
                </div>
                <div class={s.inputGroup}>
                  <div class={s.formTitleGroup}>
                    <p class={s.formTitle}>ISP</p>
                    <p class={s.formTitleInfo}>設備的ISP</p>
                  </div>
                  <Select class={s.lbSelect}
                          options={currentTargetInfo.ispOptions} 
                          nameKey="name" 
                          valueKey="id"  
                          ref="editTargetIsp"
                  />
                </div>
                <div class={s.inputGroup}>
                  <div class={s.formTitleGroup}>
                    <p class={s.formTitle}>省份</p>
                    <p class={s.formTitleInfo}>設備所在的省份</p>
                  </div>
                  <Select class={s.lbSelect}
                          options={currentTargetInfo.provincesOptions} 
                          nameKey="name" 
                          valueKey="id"  
                          ref="editTargetProvince"
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
                          ref="editTargetCity"
                  />
                </div>
                <div class={s.inputGroup}>
                  <div class={s.formTitleGroup}>
                    <p class={s.formTitle}>標籤</p>
                    <p class={s.formTitleInfo}>設備的標籤</p>
                  </div>
                  <Input class={s.lbInput} ref="editTargetNameTag" val={currentTargetInfo.nameTag} />
                </div>
                <div class={s.inputGroup}>
                  <div class={s.formTitleGroup}>
                    <p class={s.formTitle}>組標籤</p>
                    <p class={s.formTitleInfo}>設備的組標籤</p>
                  </div>
                  <Label.Group  class={s.lbInput}
                                displayKey="name"
                                ref="editTargetGroupTags"
                                typ="outline"
                                x={true} 
                                badge={true} 
                                newTag={true}
                                options={currentTargetInfo.groupTags}
                  />
                </div>
                <div class={s.inputGroup}>
                  <div class={s.formTitleGroup}>
                    <p class={s.formTitle}>全探測</p>
                    <p class={s.formTitleInfo}>是否開放全任務探測該設備</p>
                  </div>
                  <Switch checked={currentTargetInfo.probed_by_all} name="editTargetProbedByAll" ref="editTargetProbedByAll" typ="special" class={s.lbSwitch}>
                    <Switch.Open>開</Switch.Open>
                    <Switch.Close>關</Switch.Close>
                  </Switch>
                </div>
                <div class={s.inputGroup}>
                  <div class={s.formTitleGroup}>
                    <p class={s.formTitle}>備註</p>
                    <p class={s.formTitleInfo}>為設備添加更多資訊</p>
                  </div>
                  <textarea class={s.lbInput} rows="5" ref="editTargetComment">{currentTargetInfo.comment}</textarea>
                </div>
                <div class={s.inputGroup}>
                  <div class={s.formTitleGroup}>
                    <p class={s.formTitle}>啟用</p>
                    <p class={s.formTitleInfo}>啟用被探測點</p>
                  </div>
                  <Switch checked={currentTargetInfo.status} name="editTargetStatus" ref="editTargetStatus" typ="special" class={s.lbSwitch}>
                    <Switch.Open>開</Switch.Open>
                    <Switch.Close>關</Switch.Close>
                  </Switch>
                </div>
                <div class={s.lightboxFooter}>
                  <LightBox.Close>
                    <Button status="primaryOutline">取消</Button>
                  </LightBox.Close>
                  <LightBox.Close>
                    <Button status="primary" class={s.submitBtn} nativeOn-click={this.editTargetInfo}>修改</Button>
                  </LightBox.Close>
                </div>
              </LightBox.View>
            </LightBox>

            <Page ref="pager" 
                  limit={pageSize} 
                  total={totalCount} 
                  toPage={pagePos} 
                  on-page={this.pageChange}
                  class={s.nqmMngApp}
            />
          </Tab.Content>
        </Tab>
      </div>
    )
  }
}