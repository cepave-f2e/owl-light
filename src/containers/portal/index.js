// Portal container
import { Tab } from 'vue-owl-ui'
import HostList from './host-list'

const Portal = {
  name: 'Portal',


  render(h) {
    return (
      <div>
        <Tab>
          <Tab.Head slot="tabHead" isSelected={true} name="1">HostGroups</Tab.Head>
          <Tab.Head slot="tabHead" name="2">Hosts</Tab.Head>

          <Tab.Content slot="tabContent" name="1">
          </Tab.Content>
          <Tab.Content slot="tabContent" name="2">
            <HostList />
          </Tab.Content>
        </Tab>

      </div>
    )
  }
}

module.exports = Portal
