(function () {
  var form = document.querySelector('.form');

  var checkValue = function (evt) {
    var field = evt.target;
    if (field.value) {
      field.classList.add('form__field--filled');
    } else {
      field.classList.remove('form__field--filled');
    }
  };

  var checkValidity = function (evt) {
    var field = evt.target;
    if (field.validity.valueMissing || !field.value) {
      field.setCustomValidity('Это поле должно быть заполнено');
      field.classList.remove('form__field--filled');
    } else {
      field.setCustomValidity('');
      field.classList.add('form__field--filled');
    }
  };

  form.addEventListener('blur', checkValidity, true);

  form.addEventListener('invalid', checkValidity, true);

  form.addEventListener('submit', function () {
    form.reset();
  });

})();
