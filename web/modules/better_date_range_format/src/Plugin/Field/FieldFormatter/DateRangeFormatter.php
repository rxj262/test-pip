<?php
/**
 * Created by PhpStorm.
 * User: chulavista
 * Date: 3/11/19
 * Time: 11:28 AM
 */


namespace Drupal\better_date_range_format\Plugin\Field\FieldFormatter;

use Drupal\Core\Annotation\Translation;
use Drupal\Core\Field\Annotation\FieldFormatter;
use Drupal\Core\Field\FieldItemListInterface;
use Drupal\Core\Field\FormatterBase;
use Drupal\Component\Utility\Html;

/**
 * Class DateRangeFormatter
 *
 * @package Drupal\better_date_range_format\Plugin\Field\FieldFormatter
 *
 * @FieldFormatter(
 *   id = "better_date_range_format",
 *   label = @Translation("Flexible"),
 *   field_types={"daterange"}
 * )
 */
class DateRangeFormatter extends FormatterBase {

  public function viewElements(FieldItemListInterface $items, $langcode) {

    $elements = [];

    foreach ($items as $delta => $item) {
      if (!empty($item->start_date) && !empty($item->end_date)) {

        $drupal_timezone = date_default_timezone_get();
        // get start day in 'Ymd' format
        $startDay = $item->value;
        $startDay = new \DateTime( $startDay, new \DateTimeZone('UTC'));
        $startDay = $startDay->setTimezone( new \DateTimeZone($drupal_timezone));
        $startDay_datetime = $startDay->format('Y-m-d');

        $startDayComp = $startDay->format('Ymd');
        // get end day in 'Ymd' format
        $endDay = $item->end_value;
        $endDay = new \DateTime( $endDay, new \DateTimeZone('UTC'));
        $endDay->setTimezone( new \DateTimeZone($drupal_timezone));
        $endDayComp = $endDay->format('Ymd');

        $output = Html::escape($startDay->format('D, M jS g:i A')) . ' -- ' . Html::escape($endDay->format('D, M jS g:i A'));
        if ($startDayComp == $endDayComp) {
          $output = Html::escape($startDay->format('D, M jS g:i A')) . ' -- ' . Html::escape($endDay->format('g:i A'));
        }

        if (\Drupal::request()->getBasePath() == '/lifelonglearning') {

          // get start day in 'Ymd' format
          $startDay = $item->start_date;
          $startDay_datetime = $startDay->format('Y-m-d');
          $startDayComp = $startDay->format('Ymd');
          // get end day in 'Ymd' format
          $endDay = $item->end_date;
          $endDayComp = $endDay->format('Ymd');

          $diff = $startDay->diff($endDay)->d;
          if ($diff == 1) {
            $output = Html::escape($startDay->format('F Y'));
          }
          else {
            $output = Html::escape($startDay->format('l, F j, Y')) . ' - ' . Html::escape($endDay->format('l, F j, Y'));
          }
        }

        $elements[$delta] = ['#markup' => "<time datetime=$startDay_datetime>" . $output . "</time>"];
      }
    }
    return $elements;
  }

}
