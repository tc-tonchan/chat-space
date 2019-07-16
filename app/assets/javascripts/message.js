$(document).on('turbolinks:load', function() {
  $(function(){
    function buildHTML(message){
      var content = message.content ? `${ message.content }` : "";
      var img = message.image ? `<src="${message.image}">` : "" ;
      var html = `<div class="Message" messageid="${message.id}">
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

    // function autoScrollToBottom(){
    //   $('.Messages').animate({scrollTop: $('.Messages')[0].scrollHeight}, 'fast');
    // }

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

    function autoScrollToBottom(){
      $('.Messages').animate({scrollTop: $('.Messages')[0].scrollHeight}, 'fast');
    }
      
    function update () {
      if (window.location.href.match(/\/groups\/\d+\/messages/)){
        var last_message_id = $(".Message").last().data('message-id') || 0;
        $.ajax({
          url: 'api/messages',
          type: "GET",
          data: {id: last_message_id},
          dataType: "json"
        })
        .done(function(messages) {
          if (messages.length != 0) {
            messages.forEach(function(message){
              var insertHTML = buildHTML(message)
              $('.Messages').append(insertHTML);
              autoScrollToBottom();
            });
          }
        })
        .fail(function() {
          alert('自動更新に失敗しました');
        });
      }
    }
    $(function(){
      setInterval(update, 5000);
    })
  })
});