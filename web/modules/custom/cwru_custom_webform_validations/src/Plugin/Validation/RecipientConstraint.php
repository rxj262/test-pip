<?php
/**
 * Created by PhpStorm.
 * User: chulavista
 * Date: 3/8/19
 * Time: 4:13 PM
 */

namespace Drupal\cwru_custom_webform_validations\Plugin\Validation;

use Drupal\Core\Field\FieldException;
use Drupal\Core\Form\FormStateInterface;

/**
 * Form API callback. Validate element value.
 */
class RecipientConstraint {
  /**
   * Validates given element.
   *
   * @param array              $element      The form element to process.
   * @param FormStateInterface $formState    The form state.
   * @param array              $form The complete form structure.
   */
  public static function countValidate(array &$element, FormStateInterface $formState, array &$form) {

    $webformKey = $element['#webform_key'];

    $value = $formState->getValue($webformKey);

    $count = sizeof($value);

    if ($count < 3) {
      $tArgs = array(
        '%name' => $element['#title'],
        '%count' => $count,
      );
      $formState->setError($element, t('Please choose at least 3 options from the %name field, you have only specified %count.', $tArgs));
    }

    // Skip empty unique fields or arrays (aka #multiple).
    if ($value === '' || is_array($value)) {
      return;
    }
  }
}