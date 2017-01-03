import { Input, Button, Grid, Icon, LightBox } from 'vue-owl-ui'
import g from 'sass/global.scss'
import s from './portal.scss'

const pluginsList = {
  name: 'PluginsList',
  data() {
    return {
      gridData: {
        heads: [
          {
            col: 'Plugin Name',
            width: '40%',
            sort: -1,
          },
          {
            col: 'Creator',
            width: '40%',
            sort: -1,
          },
          {
            col: 'Operation',
            width: '20%',
          },
        ],
        rows: [
          [
            {
              name: 'basic/sys'
            },
            {
              creator: 'Timmy'
            },
          ],
          [
            {
              name: 'basic/sys'
            },
            {
              creator: 'Timmy'
            },
          ]
        ]
      }
    }
  },

  created() {
    this.gridData.rowsRender = (h, { row, index }) => {
      return [
        <Grid.Col>
          {row[0].name}
        </Grid.Col>,
        <Grid.Col>
          {row[1].creator}
        </Grid.Col>,
        <Grid.Col>
          <ul>
            <li class={[s.operrationItem]}>
              <LightBox class={[g.inline]} closeOnClickMask closeOnESC>
                <LightBox.Open>
                  <a class={[s.operration]} href>Delete</a>
                </LightBox.Open>
                <LightBox.View>
                  <p>Delete this Host Group ?</p>
                  <div class={[s.lbViewBox]}>
                    <Button class={[g.col6]} status="primary">Yes</Button>
                    <Button class={[g.col6]} status="primaryOutline">NO</Button>
                  </div>
                </LightBox.View>
              </LightBox>
            </li>
          </ul>
        </Grid.Col>,
      ]
    }
  },

  methods: {

  },

  render(h) {
    const { gridData } = this
    const props = {
      ...gridData
    }

    return (
      <div class={[s.pluginsListWrapper]}>
        <Grid {...{ props }}></Grid>
      </div>
    )
  }
}

module.exports = pluginsList
