// $(function(){
//   function buildHTML(message){
//     var content = message.content ? `${ message.content }` : "";
//     // var img = message.image ? `<img class = "Lower-message__image" src="${message.image}">` : "" ;
//     var img = message.image ? `<src="${message.image}">` : "" ;
//     var html = `<div class="Message" messageid="${message.id}">
//                   <div class="Upper-message">
//                     <div class="Upper-message__user-name">
//                       ${message.user_name}
//                     </div>
//                     <div class="Upper-message__date">
//                       ${message.created_at}
//                     </div>
//                   </div>
//                   <div class="Lower-message">
//                     <p class="Lower-message__content">
//                       ${content}
//                     </p>
//                       ${img}
//                     </div>
//                 </div>`
//   return html;
//   }

//   $('#new_message').on('submit', function(e){
//     e.preventDefault();
//     var formData = new FormData(this);
//     var url = $(this).attr('action');
//     $.ajax({
//       url: url,
//       type: "POST",
//       data: formData,
//       dataType: 'json',
//       processData: false,
//       contentType: false
//     })
//       .done(function(message){
//         var html = buildHTML(message);
//         $('.Messages').append(html);
//         $('#new_message')[0].reset();
//         $('.form__submit').prop('disabled', false);
//         $('.Messages').animate({scrollTop: $('.Messages')[0].scrollHeight}, 'fast');
//       })
//       .fail(function(){
//         alert('error');
//         $('.form__submit').prop('disabled', false);
//     })
//   })
     
//   function update () {
//     var url = window.location.href;
//     if (url.match(/\/groups\/\d+\/messages/)){
//       var last_message_id = $(".Message").last().data('id')
//       $.ajax({
//         url: 'api/messages',
//         type: "GET",
//         data: {id: last_message_id},
//         dataType: "json"
//       })
//       .done(function(messages) {
//         var insertHTML = '';
//           messages.forEach(function(message){
//             insertHTML = buildHTML(message)
//             $('.Messages').append(insertHTML);
//           })
//         $('.Messages').animate({scrollTop: $('.Messages')[0].scrollHeight}, 'fast');
//       })
//       .fail(function() {
//         alert('自動更新に失敗しました');
//       });
//     }
//   }

//     setInterval(update, 3000)
// });

$(function(){
  function buildHTML(message){
    var content = message.content ? `${message.content}` : "" ;
    var imgHTML = message.image.url ? `<img class="Lower-message__image" src="${message.image.url}" width="200" height="200">` : "" ;

    var html =`
                <div class='Message' data-message-id="${message.id}">
                  <div class='Upper-message'>
                    <div class='Upper-message__user-name'>
                      ${message.user_name}
                    </div>
                    <div class='Upper-message__date'>
                      ${message.created_at}
                    </div>
                  </div>
                  <div class='Lower-message'>
                    <p class='Lower-message__content'>
                      ${content}
                    </p>
                    ${imgHTML}
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
      type: 'POST',
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(message){
      var html = buildHTML(message);
      $('.Messages').append(html);
      $('#new_message')[0].reset();
      $('.form__submit').prop('disabled', false);
      $('.Messages').animate({scrollTop: $('.Messages')[0].scrollHeight}, 'fast');
      })
    .fail(function(){
      alert('エラー');
      $('.form__submit').prop('disabled', false);
    })
  });

  function reloadMessages(){
    var url = window.location.href;

    if (url.match(/\/groups\/\d+\/messages/)){
      var last_message_id = $('.Message:last').data("message-id")
      
      $.ajax({
        url: 'api/messages',
        type: 'GET',
        dataType: 'json',
        data: {id: last_message_id}
      })

      .done(function(messages) {
        var insertHTML = '';

        messages.forEach(function(message) {
          insertHTML = buildHTML(message);
          $('.Messages').append(insertHTML);
        })
        $('.Messages').animate({scrollTop: $('.Messages')[0].scrollHeight}, 'fast');
      })

      .fail(function () {
        alert('自動更新できない');
      });
    }
  };
  setInterval(reloadMessages, 3000);
});