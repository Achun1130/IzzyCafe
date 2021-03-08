export default ({
  namespaced: true,
  state: {
    messages: [],
  },
  actions: {
    updateMessage(context, { message, status = 'danger' }) {
      const timestamp = Math.floor(new Date() / 1000);
      context.commit('MESSAGESPUSH', {
        message,
        status,
        timestamp,
      });
      context.dispatch('removeMessageWithTiming', timestamp);
    },
    removeMessageWithTiming(context, timestamp) {
      setTimeout(() => {
        context.state.messages.forEach((item, i) => {
          if (item.timestamp === timestamp) {
            context.commit('MESSAGESSPLICE', i);
          }
        });
      }, 5000);
    },
  },
  mutations: {
    MESSAGESPUSH(state, payload) {
      state.messages.push(payload);
    },
    MESSAGESSPLICE(state, payload) {
      state.messages.splice(payload, 1);
    },
  },
  getters: {
    messages: (state) => state.messages,
  },
});
