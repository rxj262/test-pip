<?php declare(strict_types = 1);

namespace Drupal\labs_custom_blocks;

use Drupal\Core\Entity\EntityInterface;
use Drupal\Core\Session\AccountProxyInterface;
use Drupal\media\MediaInterface;
use Drupal\node\NodeInterface;
use Drupal\user\Entity\User;

/**
 * @todo Add class description.
 */
final class LabsCustomBlockCurrentUserSiteInfo {

  /**
   * Constructs a LabsCustomBlockGetClientSiteTerms object.
   */
  public function __construct(
    private readonly AccountProxyInterface $currentUser,
  ) {}

  public function getCurrentUserTermIds() : array {
    $current_user_term_ids = array();
    $current_user = User::load($this->currentUser->id());
    $field_sites = $current_user->get('field_sites')->getValue();
    foreach ($field_sites as $site_term) {
      $current_user_term_ids[] = $site_term['target_id'];
    }
    return $current_user_term_ids;
  }

  public function getCurrentEntityTermIds(EntityInterface $entity = null) : array {
    $entity_term_ids = array();
    if ($entity instanceof NodeInterface || $entity instanceof MediaInterface ) {
      if ($entity->hasField('field_sites')) {
        $field_sites = $entity->get('field_sites')->getValue();
        foreach ($field_sites as $site_term) {
          $entity_term_ids[] = $site_term['target_id'];
        }
      }
    }
    return $entity_term_ids;
  }

  public function canEdit($current_user_term_ids, $entity_term_ids) : bool {
    if (count(array_intersect($entity_term_ids, $current_user_term_ids)) > 0) {
      return TRUE;
    }
    return FALSE;
  }
}
