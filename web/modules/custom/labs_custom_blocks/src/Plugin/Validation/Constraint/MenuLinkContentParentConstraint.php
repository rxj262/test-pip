<?php

namespace Drupal\labs_custom_blocks\Plugin\Validation\Constraint;

use Symfony\Component\Validator\Constraint;

/**
* Makes sure homepage is at the top of the menu
*
* @Constraint(
*   id = "MenuLinkContentParent",
*   label = @Translation("Menu Link Content Parent", context = "Validation"),
* )
*/
class MenuLinkContentParentConstraint extends Constraint {

// The message that will be shown if the format is incorrect.
  public $incorrectMenuLinkContentParent = 'Regular pages must be nested under the homepage';
}
