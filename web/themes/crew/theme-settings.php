<?php

use Drupal\Core\Form\FormStateInterface as FormStateInterface;
use Drupal\Core\Theme\ThemeSettings;
use Drupal\system\Form\ThemeSettingsForm;
use Drupal\Core\Form;

function crew_form_system_theme_settings_alter(&$form, FormStateInterface $form_state) {
  $form['department_header'] = array(
    '#type' => 'textfield',
    '#title' => t('School Name'),
    '#description' => t("Places department header in a gray box and school name above it."),
    '#default_value' => theme_get_setting('department_header', 'crew'),
  );

  $form['department_header_url'] = array(
    '#type' => 'url',
    '#title' => t('Absolute URL for the school website'),
    '#description' => t("Places department header in a gray box and school name above it."),
    '#default_value' => theme_get_setting('department_header_url', 'crew'),
  );

  $form['additional_school'] = array(
    '#type' => 'details',
    '#title' => t('Additional School Name and URL'),
    '#description' => t('To Display multiple school names in the header region'),
  );

  $form['additional_school']['school_name'] = array(
    '#type' => 'textfield',
    '#title' => t('School Name'),
    '#default_value' => theme_get_setting('school_name', 'crew'),
  );

  $form['additional_school']['school_url'] = array(
    '#type' => 'url',
    '#title' => t('Absolute URL for the school website'),
    '#default_value' => theme_get_setting('school_url', 'crew'),
  );

  $footeroptions = array(
    'campus_location' => t('Campus Location'),
    'social_media' => t('Social Media'),
    'secondary_footer' => t('Secondary Footer'),
  );

  $form['footer_options'] = array(
    '#type' => 'checkboxes',
    '#options' => $footeroptions,
    '#title' => t('Footer Options'),
    '#description'   => t("Choose which sections of the footer should display."),
    '#default_value' => theme_get_setting('footer_options','crew'),
  );

  $titleoptions = array(
    'longer_site_title' => t('Longer Site Title'),
    'button_right' => t('Nav Item Right'),
    'hide_biographies' => t('Hide Biographies'),
    'header_move_nav' => t('Move Nav Inside Header')
  );

  $form['header_options'] = array(
    '#type' => 'checkboxes',
    '#options' => $titleoptions,
    '#title' => t('Header Settings'),
    '#description'   => t("Use for longer site titles, pulling the last nav item to the right, and hiding biographies."),
    '#default_value' => theme_get_setting('header_options','crew'),
  );
}
