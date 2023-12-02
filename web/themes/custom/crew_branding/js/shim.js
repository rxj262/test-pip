window.onload = function() {
  // CWRU logos height fix
  var bottomLogo = document.querySelector('.footer__logo');
  bottomLogo.style.height = "60px";
  // There are two top logos (one is mobile only)
  var topLogo = document.querySelectorAll('.logo-default');
  for (var i = 0; i < topLogo.length; i++) {
    topLogo[i].style.height = "60px";
  }

  // subfeature image height fix
  var subimages = document.querySelectorAll('.field--name-field-sf-section-image-ref img, .field--name-field-subfeature-image-ref img');

  function resetHeight() {
    for (var i = 0; i < subimages.length; i++) {
      subimages[i].style.height = '';
      subimages[i].style.removeProperty('height');
    }
  }

  function setHeight() {
    for (var i = 0; i < subimages.length; i++) {
      var getHeight = subimages[i].height;
      subimages[i].style.height = getHeight + "px";
    }
  }

  setHeight();

  // vertical subfeature - remove flex
  var subfeatureFlex = document.querySelectorAll('.paragraph--type--vertical-subfeature .flex');

  for (var i = 0; i < subfeatureFlex.length; i++) {
    removeClass(subfeatureFlex[i], 'flex');
  }

  function removeClass(el, className) {
    if (el.classList.contains(className)) {
      el.classList.remove(className);
    }
  }

  // On resize events, recalculate height
  window.addEventListener('resize', function() {
    resetHeight();
    setHeight();
  }, false);
};
