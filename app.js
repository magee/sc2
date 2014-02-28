Router.configure({
  layoutTemplate: 'layout'
});

Router.map(function () {
  /**
   * The route's name is "home"
   * The route's template is also "home"
   * The default action will render the home template
   */
  this.route('home', {
    path: '/',
    template: 'home'
  });

  /**
   * The route's name is "guides"
   * The route's path is "/guides"
   * The route's template is inferred to be "guides"
   */
  this.route('guides', {
    path: '/guides'
  });

  this.route('guide', {
    path: '/guides/:_id',

    load: function () {
      // called on first load
    },

    // before hooks are run before your action
    before: [
      function () {
        this.subscribe('guide', this.params._id).wait();
        this.subscribe('guides'); // don't wait
      },

      function () {
        // we're done waiting on all subs
        if (this.ready()) {
          NProgress.done();
        } else {
          NProgress.start();
          this.stop(); // stop downstream funcs from running
        }
      }
    ],

    action: function () {
      var params = this.params; // including query params
      var hash = this.hash;
      var isFirstRun = this.isFirstRun;

      this.render(); // render all
      this.render('specificTemplate', {to: 'namedYield'});
    },

    unload: function () {
      // before a new route is run
    }
  });
});
