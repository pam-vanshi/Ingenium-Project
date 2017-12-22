$('.contact-form').on('submit',function(e) {
      e.preventDefault();
      $.post( 'https://powerful-atoll-14808.herokuapp.com/signup', $('.contact-form').serialize(), function( data ) {
           alert( "your request has been submitted" );
      } );
});
