<?php
/**
 * @file
 * Enables modules and site configuration for a standard site installation.
 */

// Add any custom code here like hook implementations.

function cwrubaseconfigkit_form_install_configure_form_alter(&$form, \Drupal\Core\Form\FormStateInterface $form_state) {
#  echo '<pre>';
#  var_dump($form['admin_account']['account']['pass']);
#  echo '</pre>';

  // Site Information defaults
  $form['site_information']['site_mail']['#default_value'] = 'info@cwruwebteam.case.edu';

  // Account information defaults
  $form['admin_account']['account']['name']['#default_value'] = 'admin';
  $form['admin_account']['account']['mail']['#default_value'] = 'info@cwruwebteam.case.edu';
  $form['admin_account']['account']['pass']['#required'] = false;
  
  // Date/time settings
  $form['regional_settings']['site_default_country']['#default_value'] = 'US';
  $form['regional_settings']['date_default_timezone']['#default_value'] = 'America/New_York';
  
  // Update Notification 
  $form['update_notifications']['enable_update_status_emails']['#default_value'] = 0;
  $form['update_notifications']['enable_update_status_module']['#default_value'] = 0;
}

