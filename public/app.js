$(function(){

  $('.button').click(function(){
    var url = [
      '/notify-spark?directive=',
      $(this).data('val'),
      '&color=' + $(this).data('color')
    ].join('');

    $.ajax({
      url: url,
      success: function(){
        console.log('done');
      }
    });
  });

});
