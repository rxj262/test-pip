<?php

namespace Drupal\labs_custom_blocks\Plugin\Block;

use Drupal\Core\Block\BlockBase;
use Drupal\Core\Menu\MenuLinkTreeInterface;
use Drupal\Core\Plugin\ContainerFactoryPluginInterface;
use Drupal\Core\Routing\RouteMatchInterface;
use Drupal\taxonomy\Entity\Term;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Drupal\node\NodeInterface;


/**
 * Provides an example block.
 *
 * @Block(
 *   id = "labs_sidebar_menu",
 *   admin_label = @Translation("Labs Sidebar Menu"),
 *   category = @Translation("Menus")
 * )
 */

class LabsMenuSidebarBlock extends BlockBase implements ContainerFactoryPluginInterface {
  /**
   *
   * @var object $userSitesInfo
   */
  protected object $userSitesInfo;

  protected RouteMatchInterface $routeMatch;

  protected MenuLinkTreeInterface $menuLinkTree;

  public function __construct(array $configuration, $plugin_id, $plugin_definition, $userSitesInfo, RouteMatchInterface $routeMatch, MenuLinkTreeInterface $menuLinkTree) {
    parent::__construct($configuration, $plugin_id, $plugin_definition);
    $this->userSitesInfo = $userSitesInfo;
    $this->routeMatch = $routeMatch;
    $this->menuLinkTree = $menuLinkTree;
  }

  /**
   * {@inheritdoc}
   */
  public static function create(ContainerInterface $container, array $configuration, $plugin_id, $plugin_definition) {
    // TODO: Implement create() method.
    return new static(
      $configuration,
      $plugin_id,
      $plugin_definition,
      $container->get('labs_custom_blocks.get_user_site_info'),
      $container->get('current_route_match'),
      $container->get('menu.link_tree')
    );
  }


  /**
   * {@inheritdoc}
   */
  public function build() {
    $node = $this->routeMatch->getParameter('node');
    $term_name = '';
    if ($node instanceof NodeInterface) {
      if ($node->bundle() == 'error_page') {
        return;
      }

      // You can get nid and anything else you need from the node object.
      $tid = $node->get('field_sites')->getValue()[0]['target_id'];

      if (!empty($tid)) {
        $term = Term::load($tid);
        $term_name = $term->getName();
        $term_name = str_replace("sites - ", "", $term_name);
        $term_name = str_replace(" ", "-", $term_name);
        $term_name = strtolower($term_name);
      }
    }

    $menu_tree = $this->menuLinkTree;

    if (!empty($term_name)) {
      $menu_name = $term_name;
    } else {
      $menu_name = 'main';
    }

    // Build the typical default set of menu tree parameters.
    $parameters = $menu_tree->getCurrentRouteMenuTreeParameters($menu_name);

    // display different depth based on whether it's rendered in main nav or sidebar
    // get the region/block context and do if/else

    $parameters->setMinDepth(2);
    $parameters->setMaxDepth(6);

    // Load the tree based on this set of parameters.
    $tree = $menu_tree->load($menu_name, $parameters);

    // Transform the tree using the manipulators you want.
    $manipulators = [
      // Only show links that are accessible for the current user.
      ['callable' => 'menu.default_tree_manipulators:checkAccess'],
      // Use the default sorting of menu links.
      ['callable' => 'menu.default_tree_manipulators:generateIndexAndSort'],
      //      array('callable' => 'menu.default_tree_manipulators:flatten')
    ];
    $tree = $menu_tree->transform($tree, $manipulators);

    // Finally, build a renderable array from the transformed tree.
    $menu = $menu_tree->build($tree);

    $menu['#theme'] = 'menu__general_labssidebar';
    $menu['#cache']['contexts'][] = 'url.path';

    return $menu;
  }
}
