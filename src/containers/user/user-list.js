import { Grid, Input, Button, LightBox, Dual } from 'vue-owl-ui'
import s from './user.scss'
const UserList = {
  name: 'UserList',
  data() {
    return {
      isAdmin: true,
      userListData: {
        heads: (this.isAdmin) ? [
          {
            col: 'Account',
            width: '15.3%',
            sort: -1
          },
          {
            col: 'Name',
            width: '15.3%',
            sort: -1
          },
          {
            col: 'E-mail',
            width: '23%',
            sort: -1
          },
          {
            col: 'Cellphone',
            width: '15.3%',
            sort: -1
          },
          {
            col: 'IM',
            width: '15.3%',
            sort: -1
          },
          {
            col: 'QQ',
            width: '15.3%',
            sort: -1
          },
        ]:
        [
          {
            col: 'Account',
            width: '12.3%',
            sort: -1
          },
          {
            col: 'Name',
            width: '12.3%',
            sort: -1
          },
          {
            col: 'E-mail',
            width: '20%',
            sort: -1
          },
          {
            col: 'Cellphone',
            width: '12.3%',
            sort: -1
          },
          {
            col: 'IM',
            width: '12.3%',
            sort: -1
          },
          {
            col: 'QQ',
            width: '12.3%',
            sort: -1
          },
          {
            col: 'Opreation',
            width: '18%'
          }
        ],
        rows: [
          {
            cnname: 'cheminlin', chinesename: 'tear', email: 'cheminlin@cepave.com', cellphone:'0912-123456', qq:'123456789', im: '123456'
          },
          {
            cnname: 'ethan', chinesename: '郝沖', email: 'ethan@fastweb.com.cn', cellphone:'13910503387', qq:'123456789', im: '123456'
          }
        ]
      }
    }
  },
  created() {
    this.userListData.rowsRender = (h, { row, index }) => {
      const result = [
        <Grid.Col>{row.cnname}</Grid.Col>,
        <Grid.Col>{row.chinesename}</Grid.Col>,
        <Grid.Col>{row.email}</Grid.Col>,
        <Grid.Col>{row.cellphone}</Grid.Col>,
        <Grid.Col>{row.qq}</Grid.Col>,
        <Grid.Col>{row.im}</Grid.Col>
      ]
      if (this.isAdmin) {
        result.push(
          <Grid.Col>
            <div class={[s.opeartionInline]}>
              <LightBox ref="editGroup" closeOnClickMask closeOnESC>
                <LightBox.Open>
                  <a class={[s.opeartions]}>edit</a>
                </LightBox.Open>
                <LightBox.View>
                  <p>Edit user profile</p>
                  <div class={[s.inputGroup]}>
                    <p class={[s.formTitle]}>Nickname</p>
                    <Input name="cname" class={[s.input]} />
                  </div>
                  <div class={[s.inputGroup]}>
                    <p class={[s.formTitle]}>E-Mail</p>
                    <Input name="email" class={[s.input]} />
                  </div>
                  <div class={[s.inputGroup]}>
                    <p class={[s.formTitle]}>Cellphone</p>
                    <Input name="cellphone" class={[s.input]} />
                  </div>
                  <div class={[s.inputGroup]}>
                    <p class={[s.formTitle]}>QQ</p>
                    <Input name="qq" class={[s.input]} />
                  </div>
                  <div class={[s.inputGroup]}>
                    <p class={[s.formTitle]}>IM</p>
                    <Input name="im" class={[s.input]} />
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
                  <a class={[s.opeartions]}>Set as Admin</a>
                </LightBox.Open>
                <LightBox.View>
                  <p>Set this user an admin</p>
                  <p class={[s.deleteDes]}>You will set this user admin. Are you sure？</p>
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
              <LightBox closeOnClickMask closeOnESC>
                <LightBox.Open>
                  <a class={[s.opeartions]}>Delete</a>
                </LightBox.Open>
                <LightBox.View>
                  <p>Delete user group</p>
                  <p class={[s.deleteDes]}>You will delete this user. Are you sure？</p>
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
        )
      }
      return result
    }
  },
  render(h) {
    const { userListData } = this
    const props = { ...userListData }
    return (
      <div>
        <div class={[s.contactSearchWrapper]}>
          <div class={[s.searchInputGroup]}>
            <Input icon={['search', '#b8bdbf']} class={[s.contactSearch]} />
            <Button status="primary">Search</Button>
          </div>
        </div>
        <div class={[s.contactWrapper]}>
          <Grid { ...{ props } } />
        </div>
      </div>
    )
  }
}
module.exports = UserList
