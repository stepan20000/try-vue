export default {
  methods: {
    search: function (tasks, query) {
      return Object.keys(tasks).filter(key => tasks[key].text.indexOf(query) > -1)
        .map(key => tasks[key]);
    }
  }
};
