Router.configure({
  layoutTemplate: 'layout'
});

Router.map(function () {
  this.route('home', {
    path: '/',
    template: 'home'
  });

  this.route('guides', {
    path: '/guides'
  });

  this.route('guideShow', {
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

  this.route('stylists', {
    path: '/stylists/*'
  });

  this.route('stylistShow', {
    path: '/stylists/:_id'
  });

  this.route('clients', {
    path: '/clients/*'
  });

  this.route('clientShow', {
    path: '/clients/:_id'
  });

  this.route('guideNotFound', {
    path: '/guides/*'
  });

  this.route('notFound', {
    path: '*'
  });
});
