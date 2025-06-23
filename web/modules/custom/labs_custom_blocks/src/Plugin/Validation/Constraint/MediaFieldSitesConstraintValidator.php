<?php

namespace Drupal\labs_custom_blocks\Plugin\Validation\Constraint;

use Drupal\media\MediaInterface;
use Drupal\node\Entity\Node;
use Symfony\Component\Validator\Constraint;
use Symfony\Component\Validator\ConstraintValidator;

class MediaFieldSitesConstraintValidator extends ConstraintValidator {

  /**
   * @inheritDoc
   */
  public function validate(mixed $entity, Constraint $constraint) {
    // TODO: Implement validate() method.

    if ($entity instanceof MediaInterface) {
      if (empty($entity->get('field_sites')->getValue())) {
        $this->context->addViolation($constraint->missingFieldSitesValue);
      }
    }

  }
}

