(function($){
  "use strict";

  var FADE_DURATION = 200;

  var climateIllo = {

    init: function(){
      this.$signupBtn = $(".signup-btn");
      this.$cover = $(".signup-cover");
      this.$coverCloseBtn = this.$cover.find(".close");
      this.$form = $(".signup-form");
      this.$emailInput = this.$form.find(".email");
      this.$submitBtn = $(".signup-form-submit");

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

      this.$form.on("submit", function(){
        self.submitHandler();

        //submitted via AJAX
        return false;
      });
    },

    showOverlay: function(){
      var self = this;
      this.$cover.removeClass("success").fadeIn({
        duration: FADE_DURATION,
        complete: function(){
          self.$emailInput.focus();
        }
      });
    },

    hideOverlay: function(){
      this.$cover.fadeOut({
        duration: FADE_DURATION
      });
    },

    submitHandler: function(){

      //AJAX in progress
      if(this.active){return;}

      var self = this;
      var email = this.$emailInput.val();

      if(this.validateEmail(email)){
        var data = {};
        data[ this.$emailInput.attr("name") ] = this.$emailInput.val();

        this.$emailInput.removeClass("error");

        // AJAX seems to "fail", even though the signup is successful. No `done`, `fail`, or `always`
        // is ever triggered. Need to fix this, but for now, always assume the POST is successful
        // and call success function.
        $.ajax({
          url: this.$form.attr("action") + "?callback=?",
          method: "POST",
          data: data,
          crossDomain: true,
          dataType: "jsonp"
        });
        this.submitSuccess();
      } else {
        this.$emailInput.addClass("error").on("input", function(){
          self.$emailInput.off("input").removeClass("error");
        });
      }
    },

    submitSuccess: function(){
      var self = this;
      var oldVal = this.$submitBtn.val();

      this.$submitBtn.val("Sending...");
      this.active = true;

      // Fix this when AJAX response issue is fixed, but for now give it a second to go through...
      setTimeout(function(){
        self.active = false;
        self.$cover.addClass("success");
        self.$emailInput.val("");
        self.$submitBtn.val(oldVal);
      }, 1000);
    },

    validateEmail: function (email) {
      return /^.+@.+\..+$/.test(email);
    }

  };

  $(function(){
    climateIllo.init();
  });

})(jQuery);
