function onUploadFile() {
  $('[type=file]').on('change', function(e) {
    const input = e.target;
    const files = input.files;
    if (fileSizeIsValid(input, files)) {
      showPreview(input, files);
    } else {
      alert('O tamanho do arquivo excede o limite de upload. Por favor, escolha um arquivo menor que 20MB');
      input.value = "";
    }
  });
}

function fileSizeIsValid(input, files) {
  const limit = 20; // 20MB
  let valid = true;
  for (let i =  0; i < files.length; i++) {
    const fsize = files[i].size;
    const size = Math.round(fsize / 1024/ 1024);
    valid = (size < limit);
  }
  return valid;
}

function showPreview(input, files) {
  if (files && files.length) {
    const fr = new FileReader();
    fr.onload = function () {
      const img = $(input).siblings('.inline-hints').children('img')[0];
      if (img) {
        img.src = fr.result;
      }
    }
    fr.readAsDataURL(files[0]);
  }
}

$(document).ready(function(){
  onUploadFile();
  $(document).on('has_many_add:after', function(e, fieldset){
    onUploadFile();
  });
});


