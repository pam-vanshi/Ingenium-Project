$('.contact-form').on('submit',function(e) {
      e.preventDefault();
      $.post( '/signup', $('.contact-form').serialize(),$(".contact-form")[0].reset(), function( data ) {
           alert( "your request has been submitted" );
      } );



});
