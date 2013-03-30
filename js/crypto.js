var toggler = (function ($) {

  $(document).ready(function () {
    $('.paragrafi').hide();
    $('.paragrafi:first').show();
    $('.sottomenu a').prop ('href', '#').each (function (k, v) {
      $(v).click (function () { $('.sottomenu a').removeClass('clicked');console.log(v);$('#'+v.id).addClass('clicked').blur();toggler.show(v.id.slice(1)); } );
    });
    
  });
  var my = {};
  my.show = function (id) {
    $('.paragrafi').hide();
    $('#'+id).show();
  }

  return my;
  }($));