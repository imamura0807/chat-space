$(function(){

  function buildMessage(message){
    var img = ''
    if (message.image !== null) {
        img = `<img src="${message.image}">`
    }
    var html = 
              `<div class="message">
                <div class="upper-message">
                  <div class="upper-message__user-name">
                      ${message.username}
                  </div>
                  <div class="upper-message__date">
                      ${message.created_at}
                  </div>
                </div>
                <div class="lower-message">
                    <p class="lower-message__content">
                    ${message.content}
                    </p>
                </div>
                    ${img}
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
      var html = buildMessage(message);
      $('.messages').append(html)
      $('#message_content').val('')
      $('#message_image').val('')
      $('.messages').animate({scrollTop:$('.messages')[0].scrollHeight});
      $('.form__submit').removeAttr('disabled');
    })
    .fail(function(){
      alert('メッセージを入力してください');
      $('.form__submit').prop('disabled', false);
    })
  })
});