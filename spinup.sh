#!/bin/bash

echo "What is the UUID?"
read newsiteUUID

dir_name="${PWD##*/}"
FlowMachineName=${dir_name//-/_}
FlowMachineName=${FlowMachineName//cwru_/}

makeconfig () {
  cd "spinup-template"
  cp "cms_content_sync.flow.default.yml" "cms_content_sync.flow.${FlowMachineName}_filter.yml"
  awk '{gsub(/NEW_DRUPAL_SITE_UUID/,"'$newsiteUUID'")}1' cms_content_sync.flow.${FlowMachineName}_filter.yml > temp.yml && mv temp.yml cms_content_sync.flow.${FlowMachineName}_filter.yml
  awk '{gsub(/NEW_SITE_NAME/,"'$FlowMachineName'")}1' cms_content_sync.flow.${FlowMachineName}_filter.yml > temp.php && mv temp.php cms_content_sync.flow.${FlowMachineName}_filter.yml
  cd ".."
}
makeconfig

lando drush si -y cwrubaseconfigkit --account-pass='H3@vms%wjs95yajgs!' --account-mail='webteam@case.edu' --site-mail='webteam@case.edu'

lando drush en -y basic_auth metatag_open_graph cms_content_sync_developer cms_content_sync_health cms_content_sync_views cms_content_sync cwru_default_media_bundles cwru_default_block_layout cwru_default_text_editors_formats cwru_default_user_roles cwru_default_cas_setting cwru_default_subfeature cwru_default_footer cwru_default_robust_3_column_page metatag_open_graph cwru_default_workflows

lando drush en -y cwru_default_biography
lando drush cr

#echo "deleting basic_page content type"
#lando drush ev '$content_type = \Drupal::entityTypeManager()->getStorage("node_type")->load("basic_page"); $content_type->delete();'

lando drush cex -y
mv spinup-template/cms_content_sync.flow.${FlowMachineName}_filter.yml config/
lando drush cim -y
