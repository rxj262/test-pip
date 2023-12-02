<?php


/** cwru settings begin
 *
 */


$config_directories = array();
//$site_dir = 'case.edu.nutrition';
$settings['config_sync_directory'] =  $app_root . "/../config";
$settings['install_profile'] = 'cwrubaseconfigkit';


// Drupal 8 Memcache
$settings['memcache']['extension'] = 'Memcached';
$settings['memcache']['stampede_protection'] = TRUE;
if (isset($_ENV['AH_SITE_ENVIRONMENT'])) {
$settings['container_yamls'][] = $app_root . '/sites/default/memcache.yml';
}
if (isset($settings['memcache']['servers'])) {
// Memcache settings
$settings['cache']['bins']['bootstrap'] = 'cache.backend.memcache';
$settings['cache']['bins']['discovery'] = 'cache.backend.memcache';
$settings['cache']['bins']['config'] = 'cache.backend.memcache';
// Use memcache as the default bin
$settings['cache']['default'] = 'cache.backend.memcache';
}


// Disable all flows on non-prod environments to make sure CMS Content Sync core is only used by prod sites.
/*
if (!isset($_ENV['AH_SITE_ENVIRONMENT']) || $_ENV['AH_SITE_ENVIRONMENT'] != 'prod') {
  $config["cms_content_sync.flow.nutrition_filter_migrated"]["status"] = FALSE;
}
// Use CMS Content Sync test core backend URL for staging ENV sites.
if (isset($_ENV['AH_SITE_ENVIRONMENT']) && $_ENV['AH_SITE_ENVIRONMENT'] == 'test') {
  $settings["cms_content_sync"]["pools"]["content"]["backend_url"] = "https://stage:ndwRa0lFITBr@case-edu-stage.us1.saas.cms-content-sync.io/rest";
}
 */

/** cwru settings end
 *
 */




/**
 * Load services definition file.
 */
$settings['container_yamls'][] = __DIR__ . '/services.yml';

/**
 * Include the Pantheon-specific settings file.
 *
 * n.b. The settings.pantheon.php file makes some changes
 *      that affect all environments that this site
 *      exists in.  Always include this file, even in
 *      a local development environment, to ensure that
 *      the site settings remain consistent.
 */
include __DIR__ . "/settings.pantheon.php";

/**
 * Skipping permissions hardening will make scaffolding
 * work better, but will also raise a warning when you
 * install Drupal.
 *
 * https://www.drupal.org/project/drupal/issues/3091285
 */
// $settings['skip_permissions_hardening'] = TRUE;

/**
 * If there is a local settings file, then include it
 */
$local_settings = __DIR__ . "/settings.local.php";
if (file_exists($local_settings)) {
  include $local_settings;
}
