import s from './user.scss'
import { Grid, Input, Button, Icon, LightBox, Dual } from 'vue-owl-ui'

const UserGroup = {
  name: 'UserGroup',
  data() {
    return {
      userGroupData: {
        heads: [
          {
            col: 'User group name',
            width: '35.7%',
            sort: -1
          },
          {
            col: 'Users',
            width: '32.3%',
            sort: -1
          },
          {
            col: 'Creator',
            width: '16.6%',
            sort: -1
          },
          {
            col: 'Opeartions',
            width: '15.4%'
          }
        ],
        rows: [
          {
            groupName:'aaa', groupMember: 'myhung yao0505 hhlin', creator: 'myhung'
          },
          {
            groupName:'aaa', groupMember: 'myhung kordan', creator: 'myhung'
          }
        ]
      }
    }
  },
  created() {
    this.userGroupData.rowsRender = (h, { row, index }) => {
      return [
        <Grid.Col>{row.groupName}</Grid.Col>,
        <Grid.Col>{row.groupMember}</Grid.Col>,
        <Grid.Col>{row.creator}</Grid.Col>,
        <Grid.Col>
          <div class={[s.opeartionInline]}>
            <LightBox ref="editGroup" closeOnClickMask closeOnESC>
              <LightBox.Open>
                <a class={[s.opeartions]}>edit</a>
              </LightBox.Open>
              <LightBox.View>
                <p>Edit user group</p>
                <div class={[s.inputGroup]}>
                  <p>Name</p>
                  <Input placeholder="user group name" class={[s.input]} />
                </div>
                <div class={[s.userLists]}>
                  <p>Users</p>
                  <Dual.Group class={[s.groupSelect]} />
                </div>
                <div class={[s.lightboxFooter]}>
                  <LightBox.Close>
                    <Button status="primaryOutline">Cancel</Button>
                  </LightBox.Close>
                  <LightBox.Close>
                    <Button status="primary" class={[s.submitBtn]}>Submit</Button>
                  </LightBox.Close>
                </div>
              </LightBox.View>
            </LightBox>
            <LightBox closeOnClickMask closeOnESC>
              <LightBox.Open>
                <a class={[s.opeartions]}>Duplicate</a>
              </LightBox.Open>
              <LightBox.View>
                <p>Edit user group</p>
                <div class={[s.inputGroup]}>
                  <p>Name</p>
                  <Input placeholder="user group name" class={[s.input]} />
                </div>
                <div class={[s.userLists]}>
                  <p>Users</p>
                  <Dual.Group class={[s.groupSelect]} />
                </div>
                <div class={[s.lightboxFooter]}>
                  <LightBox.Close>
                    <Button status="primaryOutline">Cancel</Button>
                  </LightBox.Close>
                  <LightBox.Close>
                    <Button status="primary" class={[s.submitBtn]}>Submit</Button>
                  </LightBox.Close>
                </div>
              </LightBox.View>
            </LightBox>
            <LightBox closeOnClickMask closeOnESC>
              <LightBox.Open>
                <a class={[s.opeartions]}>Delete</a>
              </LightBox.Open>
              <LightBox.View>
                <p>Delete user group</p>
                <p class={[s.deleteDes]}>You will remove this user group. Are you sure？</p>
                <div class={[s.buttonGroup]}>
                  <LightBox.Close class={[s.btnWrapper]}>
                    <Button status="primary" class={[s.buttonBig]}>Yes</Button>
                  </LightBox.Close>
                  <LightBox.Close class={[s.btnWrapper]}>
                    <Button status="primaryOutline" class={[s.buttonBig]}>Cancel</Button>
                  </LightBox.Close>
                </div>
              </LightBox.View>
            </LightBox>
          </div>
        </Grid.Col>
      ]
    }
  },
  render(h) {
    const { userGroupData } = this
    const props = { ...userGroupData }
    return (
      <div>
        <div class={[s.contactSearchWrapper]}>
          <div class={[s.searchInputGroup]}>
            <Input icon={['search', '#b8bdbf']} placeholder="User group name..." class={[s.contactSearch]} />
            <Button status="primary">Search</Button>
          </div>
          <LightBox ref="createGroup" closeOnClickMask closeOnESC>
            <LightBox.Open>
              <Button status="primary" class={[s.buttonIcon]}>
                <Icon typ="plus" size={16} class={[s.plus]} />
                Add new user group
              </Button>
            </LightBox.Open>
            <LightBox.View>
              <p>Add user group</p>
              <div class={[s.inputGroup]}>
                <p>Name</p>
                <Input placeholder="user group name" class={[s.input]} />
              </div>
              <div class={[s.userLists]}>
                <p>Users</p>
                <Dual.Group class={[s.groupSelect]} />
              </div>
              <div class={[s.lightboxFooter]}>
                <LightBox.Close>
                  <Button status="primaryOutline">Cancel</Button>
                </LightBox.Close>
                <LightBox.Close>
                  <Button status="primary" class={[s.submitBtn]}>Submit</Button>
                </LightBox.Close>
              </div>
            </LightBox.View>
          </LightBox>
        </div>
        <div class={[s.contactWrapper]}>
          <Grid { ...{ props } } />
        </div>
      </div>
    )
  }
}
module.exports = UserGroup
