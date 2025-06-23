<?php

namespace Drupal\labs_custom_blocks\Plugin\views\filter;

use Drupal\Core\Session\AccountProxyInterface;
use Drupal\views\Plugin\views\filter\FilterPluginBase;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Drupal\Core\Routing\RouteMatchInterface;


/**
 * Filter by current user's sites term
 *
 * @ingroup views_filter_handlers
 * @ViewsFilter("restrict_term_from_current_node_display")
 */
class RestrictTermFromCurrentNodeDisplay extends FilterPluginBase {

  protected AccountProxyInterface $currentUser;

  /**
   *
   * @var object $userSitesInfo
   */
  protected object $userSitesInfo;

  protected RouteMatchInterface $routeMatch;

  public function __construct(array $configuration, $plugin_id, $plugin_definition, AccountProxyInterface $currentUser, $userSitesInfo, RouteMatchInterface $route_match) {
    parent::__construct($configuration, $plugin_id, $plugin_definition);
    $this->currentUser = $currentUser;
    $this->userSitesInfo = $userSitesInfo;
    $this->routeMatch = $route_match;
  }

  public static function create(ContainerInterface $container, array $configuration, $plugin_id, $plugin_definition) {
    return new static(
      $configuration,
      $plugin_id,
      $plugin_definition,
      $container->get('current_user'),
      $container->get('labs_custom_blocks.get_user_site_info'),
      $container->get('current_route_match')
    );
  }

  /**
   * {@inheritdoc}
   */
  public function query() : void {
    if ($this->_get_labId_from_currentNode()) {
      $this->ensureMyTable();
      $this->query->addWhere($this->options['group'], 'node__field_sites.field_sites_target_id', $this->_get_labId_from_currentNode(), 'IN');
    }
  }

  private function _get_labId_from_currentNode() {
    $node = $this->routeMatch->getParameter('node');
    return $this->userSitesInfo->getCurrentEntityTermIds($node);
  }
}
