$(function(){

  $('.button').click(function(){
    var url = '/notify-spark?directive=' + $(this).data('val');
    $.ajax({
      url: url,
      success: function(){
        console.log('done');
      }
    });
  });

});
