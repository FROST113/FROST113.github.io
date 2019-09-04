lightbox.option({
    'alwaysShowNavOnTouchDevices	': true,
     'disableScrolling': true,
     'showImageNumberLabel': false,
     'wrapAround': true,
   });

$('.search-filter').keyup(function(){
  let userSearch = $('.search-filter').val();
	userSearch = userSearch.toLowerCase();

    $('.anchor').each(function(){

    let caption = $(this).attr('data-title');
    caption = caption.toLowerCase();

    if ( caption.includes(userSearch) === true ){
      $(this).show();
    } else {
      $(this).hide();
    }
  });
});