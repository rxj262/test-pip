<?php

namespace Drupal\quikpay_handler\Controller;

use Drupal\Core\Controller\ControllerBase;
use Drupal\webform\Entity\WebformSubmission;
use Symfony\Component\HttpFoundation\Request;

/**
 * Class ResponseActionController.
 */
class ResponseActionController extends ControllerBase {

  /**
   * Update Submission records with transaction related data
   *
   * @return
   *   Return a confirmation page via template.
   */
  public function update($webform_id) {

    $request = Request::createFromGlobals();
    $query = $request->query->all();

    $order_number = $query['userChoice3'];
    $transaction_id = $query['transactionId'];
    $transaction_status = $query['transactionStatus'];
    $transaction_type = $query['transactionType'];
    $transaction_accounttype = $query['transactionAcountType'];
    $transaction_accountholdername = $query['accountHolderName'];
    $transaction_amount = $query['transactionTotalAmount'];

    $payment_clear = FALSE;

    $temp_store_factory = \Drupal::service('session_based_temp_store');
    $ts = $temp_store_factory->get('qp'); 
    $session = $ts->get($order_number);

    if ($session == $order_number) {

      $submission_id = \Drupal::service('database')
        ->select('webform_submission_data', 'wsd')
        ->fields('wsd', ['sid'])
        ->condition('wsd.webform_id', $webform_id, '=')
        ->condition('wsd.name', 'order_number', '=')
        ->condition('wsd.value', $order_number, '=')
        ->execute()
        ->fetchAssoc();
      //  use submission update to update the value

      $sid = $submission_id['sid'];

      $webform_submission = WebformSubmission::load($sid);

      $webform = $webform_submission->getWebform();

      $twig_var = [];

      $twig_var['payment_type'] = $transaction_type;
      $twig_var['transaction_id'] = $transaction_id;
      $twig_var['confirmation_message'] = $webform->getSettings()['confirmation_message'];

      if ((($transaction_type == 1 or $transaction_type == 2) && $transaction_status == 1) or ($transaction_type == 3 && in_array($transaction_status, [
            5,
            6,
            8,
          ]))) {
        $payment_clear = TRUE;
        $twig_var['payment_clear'] = $payment_clear;
      }

      $webform_submission->setElementData('transaction_id', $transaction_id);
      $webform_submission->setElementData('transaction_status', $transaction_status);
      $webform_submission->setElementData('transaction_type', $transaction_type);
      $webform_submission->setElementData('transaction_accounttype', $transaction_accounttype);
      $webform_submission->setElementData('transaction_accountholdername', $transaction_accountholdername);
      $webform_submission->setElementData('transaction_amount', $transaction_amount / 100);
      $webform_submission->save();
      $ts->delete($order_number);
      return [
        '#theme' => 'quikpay_confirmation',
        '#payment_var' => $twig_var,
      ];
    }
    else {
      $ts->delete($order_number);
      return [
        '#theme' => 'quikpay_confirmation_session_expire',
      ];

    }
  }
}
