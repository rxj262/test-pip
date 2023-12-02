<?php
/**
 * Created by PhpStorm.
 * User: chulavista
 * Date: 3/21/19
 * Time: 5:23 PM
 */

namespace Drupal\utility\Controller;

use Drupal\Core\Controller\ControllerBase;

class UtilityController extends ControllerBase {
  public function adminpage() {




    return array(
      '#type' => 'markup',
      '#markup' => $this->t('okay now'),
    );
  }
}