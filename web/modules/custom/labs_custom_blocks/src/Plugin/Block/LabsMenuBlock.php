<?php

namespace Drupal\labs_custom_blocks\Plugin\Block;

use Drupal\Core\Block\BlockBase;
use Drupal\Core\Plugin\ContainerFactoryPluginInterface;
use Drupal\node\NodeInterface;
use Drupal\taxonomy\Entity\Term;
use Drupal\Core\Routing\RouteMatchInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Drupal\Core\Menu\MenuLinkTreeInterface;

/**
 * Provides an example block.
 *
 * @Block(
 *   id = "labs_menu",
 *   admin_label = @Translation("Labs Menu"),
 *   category = @Translation("Menus")
 * )
 */
class LabsMenuBlock extends BlockBase implements ContainerFactoryPluginInterface {
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

    if ($node instanceof NodeInterface && $node->hasField('field_sites')) {
      $tid = $node->get('field_sites')->getValue()[0]['target_id'];

      if (!empty($tid)) {
        $term = Term::load($tid);
        $term_name = $term->getName();
        $term_name = str_replace("sites - ", "", $term_name);
        $term_name = strtolower(str_replace(" ", "-", $term_name));
      }
    }

    $menu_tree = $this->menuLinkTree; // $menu_tree = \Drupal::menuTree();

    if (!empty($term_name)) {
      $menu_name = $term_name;
    }
    else {
      $menu_name = 'main';
    }

    // Build the typical default set of menu tree parameters.
    // $parameters = $menu_tree->getCurrentRouteMenuTreeParameters($menu_name);
    // replaced above line because menu tree not loaded properly on latest revison node view (missing main nav)

    $parameters = new \Drupal\Core\Menu\MenuTreeParameters();


    // display different depth based on whether it's rendered in main nav or sidebar
    // get the region/block context and do if/else

    $parameters->setMinDepth(2);
    $parameters->setMaxDepth(3);
    //$parameters->setTopLevelOnly();

    // Load the tree based on this set of parameters.
    $tree = $menu_tree->load($menu_name, $parameters);

    // Transform the tree using the manipulators you want.
    $manipulators = [
      ['callable' => 'menu.default_tree_manipulators:checkNodeAccess'],
      // Only show links that are accessible for the current user.
      ['callable' => 'menu.default_tree_manipulators:checkAccess'],
      // Use the default sorting of menu links.
      ['callable' => 'menu.default_tree_manipulators:generateIndexAndSort'],
      //      array('callable' => 'menu.default_tree_manipulators:flatten')
    ];
    $tree = $menu_tree->transform($tree, $manipulators);

    // Finally, build a render array from the transformed tree.
    $menu = $menu_tree->build($tree);

    $menu['#theme'] = 'menu__general_labs';
    $menu['#cache']['contexts'][] = 'url.path';

    return $menu;
  }

}
