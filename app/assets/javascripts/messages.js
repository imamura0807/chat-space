$(function(){
  function buildMessage(message){
    var image = (message.image) ? `<img class= "lower-message__image" src=${message.image} >` : "";
    var html = `<div class="message" data-id="${message.id}"> 
                <div class="upper-message">
                  <div class="upper-message__user-name">
                    ${message.user_name}
                  </div>
                  <div class="upper-message__date">
                    ${message.created_at}
                  </div>
                </div>
                <div class="lower-meesage">
                  <p class="lower-message__content">
                    ${message.content}
                  </p>
                    ${image}
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
    .done(function(data){
      var html = buildMessage(data);
      $('.messages').append(html);
      $('.new_message')[0].reset();
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
      $('.form__submit').removeAttr('disabled');
    })
    .fail(function(){
      alert('メッセージを入力してください');
      $('.form__submit').prop('disabled', false);
    });
  })
    function reloadMessages(){
      
      var last_message_id = $('.message').last().attr('id');
      var href = 'api/messages'
        $.ajax({ 
          url: href,
          type: 'GET',
          dataType: 'json',
          data: {id: last_message_id}
        })
        .done(function (messages) {
          messages.forEach(function (message) {
              var insertHTML = buildMessage(message)
              $('.messages').append(insertHTML)
          });
              $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
          })
        .fail(function () {
          alert('自動更新に失敗しました');
        });
      
      };
  setInterval(reloadMessages, 5000);
})
