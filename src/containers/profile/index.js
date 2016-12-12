import s from './profile.scss'
import { Tab, Input, Button } from 'vue-owl-ui'

const ProfilePage = {
  name: 'ProfilePage',

  render(h) {
    return (
      <div class={[s.profilePage]}>
        <Tab>
          <Tab.Head slot="tabHead" name="profile" isSelected={true}>Profile</Tab.Head>
          <Tab.Content slot="tabContent" name="profile">
            <div class={[s.box]}>
              <div>
                <p>Nickname</p>
                <Input name="cnname" class={[s.input]} />
                <p>E-Mail</p>
                <Input name="email" class={[s.input]} />
                <p>Cellphone</p>
                <Input name="cellphone" class={[s.input]} />
                <p>QQ</p>
                <Input name="qq" class={[s.input]} />
                <p>IM</p>
                <Input name="im" class={[s.input]} />
                <Button status="primary" class={[s.submit]}>Apply</Button>
              </div>
            </div>
          </Tab.Content>
          <Tab.Head slot="tabHead" name="password">Password</Tab.Head>
          <Tab.Content slot="tabContent" name="password">
            <div class={[s.box]}>
              <div>
                <p>Current Password</p>
                <Input name="currentPassword" password={true} class={[s.input]} />
                <p>New Password</p>
                <Input name="newPassword" password={true} class={[s.input]} />
                <Button status="primary" class={[s.submit]}>Apply</Button>
              </div>
            </div>
          </Tab.Content>
        </Tab>
      </div>
    )
  }
}
module.exports = ProfilePage
