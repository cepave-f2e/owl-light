import fetch from '~utils/fetch'

module.exports = {

  'get/agentList'(o = {}) {
    const opts = {
      method: 'GET',
      url: 'http://localhost:6040/api/v1/nqm/agents',
      params: {
        ...o.params
      },
      headers: {
        ...o.headers
      },
    }
    return fetch(opts)
  },

  'get/ispList'(o = {}) {
    const opts = {
      method: 'GET',
      url: 'http://localhost:6040/api/v1/owl/isps',
    }

    return fetch(opts)
  },

  'get/provinces'(o = {}) {
    const opts = {
      method: 'GET',
      url: 'http://localhost:6040/api/v1/owl/provinces',
    }

    return fetch(opts)
  },

  'get/citiesByProvince'(o = {}) {
    const opts = {
      method: 'GET',
      url: `http://localhost:6040/api/v1/owl/province/${o.provinceId}/cities`,
    }

    return fetch(opts)
  },

  'get/cityName'(o ={}) {
    const opts = {
      method: 'GET',
      url: `http://localhost:6040/api/v1/owl/city/${o.cityId}`
    }

    return fetch(opts)
  },

  'get/agentInfo'(o = {}) {
    const opts = {
      method: 'GET',
      url: `http://localhost:6040/api/v1/nqm/agent/${o.agentId}`,
    }

    return fetch(opts)
  },

  'post/newAgent'(o = {}) {
    const opts = {
      method: 'POST',
      url: 'http://localhost:6040/api/v1/nqm/agent',
      data: {
        ...o
      },
    }
    return fetch(opts)
  },

  'put/editAgent'(o = {}) {
    const data = {
      status: 1,
      name: null,
      comment: null,
      isp_id: -1,
      province_id: -1,
      city_id: -1,
      name_tag: null,
      group_tag: [],
      ...o.data
    }
    const opts = {
      method: 'PUT',
      url: `http://localhost:6040/api/v1/nqm/agent/${o.agentId}`,
      data,
    }
    return fetch(opts)
  }
}