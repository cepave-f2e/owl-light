import $ from 'jquery'
import 'select2'
import s from '../template.scss'
import './select2.css'
import 'select2/dist/css/select2.min.css'
import _ from 'lodash'

const Select2 =  {
  name: 'Select2',
  props: {
    setMetric: { tyep: Function },
    options: { type: Array, default: [] },
    value: {},
    class: { type: String, default: 'myselect' },
    setclass: { type: String, default: 'myselect_back' },
    accpetTag: { type: Boolean, default: false }
  },
  data() {
    return {
      select2Base: {
        tags: this.accpetTag,
        placeholder: '请选择',
        allowClear: true
      }
    }
  },
  mounted() {
    const tt = this
    $(this.$el)
      .select2({ data: this.options, ...this.select2Base })
    // $(`.${this.setclass}`).val(_.first(_.keys(this.options))).trigger('change')
  },
  watch: {
    value(value) {
      if (!_.includes(_.keys(this.options), this.value)) {
        $(this.$el).select2({ data: [{ id: this.id, text: this.value }] })
      }
      // update value
      $(this.$el).val(this.value).trigger('change')
    },
    options(options) {
      // update options
      $(this.$el)
        .select2({ data: this.options, ...this.select2Base })
      $(this.$el).on('change', function (e) {
        if (this.value === 0 || this.value === '0') {
          $(`.${this.getAttribute('back')}`).val('')
        } else {
          $(`.${this.getAttribute('back')}`).val(this.value)
        }
      })
    }
  },
  destroyed() {
    $(this.$el).off().select2('destroy')
  },
  render(h) {
    return (
      <select class={this.class} back={this.setclass}>
        <option value="0" selected="selected" disabled> 请选择 </option>
        {this.options.map((option) => {
          return (<option value={option.id}> { option.text } </option>)
        })}
      </select>
    )
  }
}

module.exports = Select2
