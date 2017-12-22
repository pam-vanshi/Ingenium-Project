$('.contact-form').on('submit',function(e) {
      e.preventDefault();
      $.post( '/signup', $('.contact-form').serialize(), function( data ) {
           alert( "your request has been submitted" );
      } );
});
