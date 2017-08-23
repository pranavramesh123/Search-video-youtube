(function() {
  new Vue({
    el: "#search_video",
    data: {
      endpoint: "https://www.googleapis.com/youtube/v3/search",
      api_key: "AIzaSyAw5j6ILgLrlTezlSJZJBC02FSGIufK7uQ",
      keyword: "",
      error: false,
      message_error: "",
      loading: false,
      items: []
    },
    methods: {
      onSubmit: function() {
        if (null !== this.keyword) {
          this.error = false;
          this.loading = true;
          this.$http.get(this.endpoint + "?q=" + this.keyword + "&maxResults=5&part=snippet&type=video&key=" +
            this.api_key)
          .then(function(res) {
              return res.json();
            })
          .then(function(res) {
            // sucess
            if (res.items != '') {
              var items_array = [];
              res.items.map(function(item) {
                 items_array.push(item);
              });
              this.items = items_array;
            } else {
              this.items = [];
              this.error = true;
              this.message_error = "Not found video!";
            }
            this.loading = false;
          }, function(res) {
            // error
            this.error = true;
            this.message_error = "Load timeout!";
          });
        } else {
          this.error = true;
          this.message_error = "Keyword null!";
        }
      }
    }
  })
})();