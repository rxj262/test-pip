<?php

namespace Drupal\labs_custom_blocks\Plugin\Linkit\Matcher;

use Drupal\Core\Database\Connection;
use Drupal\Core\Entity\EntityRepositoryInterface;
use Drupal\Core\Entity\EntityTypeBundleInfoInterface;
use Drupal\Core\Entity\EntityTypeManagerInterface;
use Drupal\Core\Extension\ModuleHandlerInterface;
use Drupal\Core\Session\AccountInterface;
use Drupal\linkit\Plugin\Linkit\Matcher\NodeMatcher;
use Drupal\linkit\SubstitutionManagerInterface;
use Drupal\linkit\Suggestion\SuggestionCollection;
use Drupal\user\Entity\User;
use Symfony\Component\DependencyInjection\ContainerInterface;

/**
 * use the same id as NodeMatcher, with a different provider to override.
 *
 * @Matcher(
 *   id = "entity:node",
 *   target_entity = "node",
 *   provider = "labs_custom_blocks"
 * )
 */
class LabsCustomBlocksMatcher extends NodeMatcher {
  /**
   *
   * @var object $userSitesInfo
   */
  protected object $userSitesInfo;

  public function __construct(array $configuration, $plugin_id, $plugin_definition, Connection $database, EntityTypeManagerInterface $entity_type_manager, EntityTypeBundleInfoInterface $entity_type_bundle_info, EntityRepositoryInterface $entity_repository, ModuleHandlerInterface $module_handler, AccountInterface $current_user, SubstitutionManagerInterface $substitution_manager, $userSitesInfo) {
    parent::__construct($configuration, $plugin_id, $plugin_definition, $database, $entity_type_manager, $entity_type_bundle_info, $entity_repository, $module_handler, $current_user, $substitution_manager, $substitution_manager);
    $this->userSitesInfo = $userSitesInfo;
  }

  public static function create(ContainerInterface $container, array $configuration, $plugin_id, $plugin_definition) {
    return new static(
      $configuration,
      $plugin_id,
      $plugin_definition,
      $container->get('database'),
      $container->get('entity_type.manager'),
      $container->get('entity_type.bundle.info'),
      $container->get('entity.repository'),
      $container->get('module_handler'),
      $container->get('current_user'),
      $container->get('plugin.manager.linkit.substitution'),
      $container->get('labs_custom_blocks.get_user_site_info')
    );
  }

  /**
   * {@inheritdoc}
   */
  public function execute($string) {
    $suggestions = new SuggestionCollection();
    $query = $this->buildEntityQuery($string);
    $query->accessCheck(TRUE);
    $query_result = $query->execute();

    if (\Drupal::currentUser()->isAuthenticated() && !$this->currentUser->hasRole('administrator')) {
      $nodes_to_remove = array();
      // query results are basically node IDs, we can load field_site value and then compare to current user's value.
      foreach ($query_result as $node_id) {
        $node = $this->entityTypeManager->getStorage('node')->load($node_id);
        //$node_field_sites_value = $node->field_sites->target_id;

        $node_field_sites_value = $this->userSitesInfo->getCurrentEntityTermIds($node);

        $current_user_term_ids = $this->userSitesInfo->getCurrentUserTermIds();

        if (empty(array_intersect($node_field_sites_value, $current_user_term_ids))) {
          $nodes_to_remove[] = $node_id;
        }
      }
      $query_result = array_diff($query_result, $nodes_to_remove);
    }

    $url_results = $this->findEntityIdByUrl($string);
    $result = array_merge($query_result, $url_results);

    // If no results, return an empty suggestion collection.
    if (empty($result)) {
      return $suggestions;
    }

    $entities = $this->entityTypeManager->getStorage($this->targetType)->loadMultiple($result);

    foreach ($entities as $entity) {
      // Check the access against the defined entity access handler.
      /** @var \Drupal\Core\Access\AccessResultInterface $access */
      $access = $entity->access('view', $this->currentUser, TRUE);

      if (!$access->isAllowed()) {
        continue;
      }

      $entity = $this->entityRepository->getTranslationFromContext($entity);
      $suggestion = $this->createSuggestion($entity);
      $suggestions->addSuggestion($suggestion);
    }

    return $suggestions;
  }
}
