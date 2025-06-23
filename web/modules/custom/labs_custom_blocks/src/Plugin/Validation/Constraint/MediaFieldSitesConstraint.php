<?php

namespace Drupal\labs_custom_blocks\Plugin\Validation\Constraint;

use Symfony\Component\Validator\Constraint;

/**
 * Makes sure homepage is at the top of the menu
 *
 * @Constraint(
 *   id = "MediaFieldSites",
 *   label = @Translation("Media Field Sites Required", context = "Validation"),
 * )
 */
class MediaFieldSitesConstraint extends Constraint {

  // The message that will be shown if the format is incorrect.
  public $missingFieldSitesValue = 'Error: To save the media file, please select a Sites option.';

}
