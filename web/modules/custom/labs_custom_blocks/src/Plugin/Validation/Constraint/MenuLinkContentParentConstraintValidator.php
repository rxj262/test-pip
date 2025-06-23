<?php

namespace Drupal\labs_custom_blocks\Plugin\Validation\Constraint;

use Drupal\node\Entity\Node;
use Symfony\Component\Validator\Constraint;
use Symfony\Component\Validator\ConstraintValidator;

class MenuLinkContentParentConstraintValidator extends ConstraintValidator {

  /**
   * @inheritDoc
   */
  public function validate(mixed $entity, Constraint $constraint) {
    // TODO: Implement validate() method.
    $node_id = $entity->getUrlObject()->getRouteParameters()['node'];
    $node_bundle = Node::load($node_id)->bundle();

    if (strpos($node_bundle, 'homepage') === FALSE) {
      // if node is not of a homepage contnet type, make sure parent id is not an empty string
      if (empty($entity->getParentId())) {
        $this->context->addViolation($constraint->incorrectMenuLinkContentParent);
      }
    }
  }
}

