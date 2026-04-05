(function () {
  var footer = document.querySelector('footer[aria-label="Site footer"]');
  if (!footer) return;

  footer.innerHTML =
    '<span class="footer-name">Adam Stephenson</span>' +
    '<nav>' +
      '<ul>' +
        '<li><a href="murals.html">Murals</a></li>' +
        '<li><a href="digital.html">Digital &amp; Design</a></li>' +
        '<li><a href="fineart.html">Figurative</a></li>' +
        '<li><a href="about.html">About</a></li>' +
        '<li><a href="commission.html">Commission</a></li>' +
        '<li><a href="contact.html">Contact</a></li>' +
      '</ul>' +
    '</nav>';
})();
