let initialStatus;

$(document).ready(function() {
  initialStatus = $("select[name*=status]").val();
});

function statusChanged() {
  const status = $('select[name*=status]').val();
  return (status !== initialStatus);
}

function emailIsSet() {
  const resourceType = getResourceType($('input[name*=notification_kind').val());
  const emailFieldName = STATUS_MESSAGES[resourceType].notification_field
  const el = $('input[name*=' + emailFieldName + ']');
  return el.length && el.val().length;
}

const STATUS_MESSAGES = {
  partner: {
    greetings: 'Olá',
    message: 'Sua inclusão de local',
    approved: " foi realizada com sucesso na Sampa+Rural.",
    refused: " não foi realizada. Isso aconteceu por não termos conseguido esclarecer algum ponto de dúvida com você por meio do contato fornecido, ou termos identificado alguma imprecisão ou incompatibilidade que não conseguimos sanar.",
    notification_field: 'registration_email',
  },
  suggestion: {
    greetings: 'Olá',
    message: 'Sua sugestão para o',
    approved: " foi realizada com sucesso na Sampa+Rural.",
    refused: " não foi realizada. Isso aconteceu por não termos conseguido esclarecer algum ponto de dúvida com você por meio do contato fornecido, ou termos identificado alguma imprecisão ou incompatibilidade que não conseguimos sanar.",
    notification_field: 'email',
  },
  comment: {
    greetings: 'Olá',
    message: 'Seu comentário para o',
    approved: " foi realizada com sucesso na Sampa+Rural.",
    refused: " não foi realizada. Isso aconteceu por não termos conseguido esclarecer algum ponto de dúvida com você por meio do contato fornecido, ou termos identificado alguma imprecisão ou incompatibilidade que não conseguimos sanar.",
    notification_field: 'email',
  }
}

function notifyResponsable() {
  const status = $('select[name*=status]').val();
  const resourceType = getResourceType($('input[name*=notification_kind').val());
  const resourceMessage = STATUS_MESSAGES[resourceType]
  return statusChanged() && !!resourceMessage[status];
}

function beforeSubmit() {
  if (notifyResponsable()) {
    showNotificationModal();
  } else  {
    submit();
  }
}

function showNotificationModal()  {
  const status = $('select[name*=status]').val();
  if (emailIsSet()) {
    const message = buildMessage();
    $('#status_message').val(message);
    $('.' + status + '-desc').css('display', 'block');
    showModal("modal-notification");
  } else {
    showModal("modal-no-email");
  }
}

function buildMessage() {
  const messageType = getResourceType($('input[name*=notification_kind').val());
  const status = $('select[name*=status]').val();
  const categoryName = $('input[name*=category_name]').val() || "";
  const notifiableName = $('input[name*=notifiable_name]').val();
  const message = STATUS_MESSAGES[messageType];
  const responsable = $('input[name*=responsable_name]').val() || $('input[name*=name]').val();
  console.log('responsable ', responsable)

  return (
    message.greetings +
    " " + responsable +"\n" +
    message.message +
    " " +
    (categoryName ? categoryName + " - " : "") +
    notifiableName
    + message[status]
  )
}

function getResourceType(resourceType) {
  let type;
  switch(resourceType) {
    case "suggestion":
      return 'suggestion';
    case "comment":
      return 'comment';
    default:
      return 'partner';
  }
}

function cancel() {
  window.location.href = '/' +  location.href.split('/')[3] + '/' + location.href.split('/')[4];
}

function submit() {
  const message = $("#status_message").val();
  $('input[name*=message]').val(message);
  $('form').submit();
}

function hideMessageModal() {
  $('.modal').modal('hide');
  $('.modal').css('display', 'none');
}

hideMessageModal();

function showModal(modalName) {
  $("#" + modalName).modal();
  $("#" + modalName + "-content").css("display", "block");
}
