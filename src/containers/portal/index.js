// Portal container
import { Tab } from 'vue-owl-ui'
import HostGroups from './host-groups'

const Portal = {
  name: 'Portal',


  render(h) {
    return (
      <div>
        <Tab>
          <Tab.Head slot="tabHead" isSelected={true} name="1">HostGroups</Tab.Head>

          <Tab.Content slot="tabContent" name="1">
            <HostGroups />
          </Tab.Content>
        </Tab>

      </div>
    )
  }
}

module.exports = Portal
