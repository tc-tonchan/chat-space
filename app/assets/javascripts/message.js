$(function(){
  function buildHTML(message){
    var content = message.content ? `${ message.content }` : "";
    var img = message.image ? `<img class= "Lower-message__image" src= ${ message.image }>` : "";
    var html = `<div class="message" data-id="${message.id}">
                  <div class="Upper-message">
                    <div class="Upper-message__user-name">
                      ${message.user_name}
                    </div>
                    <div class="Upper-message__date">
                      ${message.created_at}
                    </div>
                  </div>
                  <div class="Lower-message">
                    <p class="Lower-message__content">
                      ${content}
                    </p>
                    ${img}
                  </div>
                </div>`
  return html;
  }
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
      .done(function(message){
        var html = buildHTML(message);
        $('.Messages').append(html);
        $('#new_message')[0].reset();
        $('.Messages').animate({ scrollTop: $('.Messages')[0].scrollHeight});
        return false
      })
      .fail(function(){
        alert('error');
      })
      .always(function(data){
        $('.form__submit').prop('disabled', false);
      })
  })
});