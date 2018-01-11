(function () {
  var educationBlock = document.querySelector('.education');
  var certificatesArea = educationBlock.querySelector('.education__certificates');
  var certificatesContainer = educationBlock.querySelector('.education__certificates-container');
  var showButton = certificatesArea.querySelector('.education__expand-button');

  var showCertificates = function () {
    certificatesArea.classList.toggle('education__certificates--expanded');

    if (certificatesArea.classList.contains('education__certificates--expanded')) {
      setTimeout(function () {
        certificatesContainer.classList.toggle('education__certificates-container--open');
      }, 700);
    } else {
      certificatesContainer.classList.toggle('education__certificates-container--open');
    }
  };

  showButton.addEventListener('click', showCertificates);
})();
