module.exports = {
  'getTemplate'(state, u) {
    state.name = { id: u.tpl.id, name: u.tpl.tpl_name }
    state.parent = { id: u.tpl.parent_id, name: u.parentName }
    state.actionId = u.caction.id
    state.uics = u.caction.uic
    state.callback = {
      url: u.caction.url,
      before_callback_sms: u.caction.before_callback_sms,
      before_callback_mail: u.caction.before_callback_mail,
      after_callback_sms: u.caction.after_callback_sms,
      after_callback_mail: u.caction.after_callback_mail,
    }
    state.stratges = u.stratges
  }
}
