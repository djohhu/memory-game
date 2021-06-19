export default {
  state: {
    modal: {
      status: false,
      time: null,
    }
  },
  mutations: {
    setModal(state, payload = {}) {
      state.modal.status = payload.status;
      state.modal.time = payload.time || null;
    }
  },
  getters: {
    getModal(state) {
      return state.modal
    }
  },
}
