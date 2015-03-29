(function($){
  "use strict";

  var FADE_DURATION = 200;

  var climateIllo = {

    init: function(){
      this.$signupBtn = $("#signup-btn");
      this.$cover = $("#signup-cover");
      this.$coverCloseBtn = this.$cover.find(".close");

      this.$form = $("#signup-form");
      this.$emailInput = this.$form.find("input[name='email']");
      this.$submitBtn = $("#signup-form-submit");

      this.bindEvents();
    },

    bindEvents: function(){
      var self = this;

      this.$signupBtn.on("click", function(e){
        e.preventDefault();
        self.showOverlay();
      });

      this.$coverCloseBtn.on("click", function(e){
        e.preventDefault();
        self.hideOverlay();
      });

      this.$form.on("submit", function(e){
        return self.submitHandler();
      });
    },

    showOverlay: function(){
      this.$cover.fadeIn({
        duration: FADE_DURATION
      });
    },

    hideOverlay: function(){
      this.$cover.fadeOut({
        duration: FADE_DURATION
      });
    },

    submitHandler: function(){
      var self = this;
      var email = this.$emailInput.val();

      console.log("email:", email);
      console.log("valid:", this.validateEmail(email));

      if(this.validateEmail(email)){
        this.$emailInput.removeClass("error");
        return true;
      } else {
        this.$emailInput.addClass("error").on("input", function(){
          self.$emailInput.off("input").removeClass("error");
        });
        return false;
      }

    },

    validateEmail: function (email) {
      return /^.+@.+\..+$/.test(email);
    }

  };

  $(function(){
    climateIllo.init();
  })

})(jQuery);
