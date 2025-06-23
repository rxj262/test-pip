<?php

namespace Drupal\labs_custom_blocks\Plugin\Block;

use Drupal\Core\Annotation\Translation;
use Drupal\Core\Block\BlockBase;
use Drupal\Core\Plugin\ContainerFactoryPluginInterface;
use Drupal\Core\Security\TrustedCallbackInterface;
use Drupal\node\NodeInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\HttpFoundation\RequestStack;

/**
 * Provides footer information on the fly
 *
 * @Block(
 *   id = "lab_footer",
 *   admin_label = @Translation("Lab Footer"),
 *   category = @Translation("Content")
 * )
 */
class LabsFooterBlock extends BlockBase implements TrustedCallbackInterface, ContainerFactoryPluginInterface {

  protected RequestStack $requestStack;

  protected $entityTypeManager;

  public function __construct(array $configuration, $plugin_id, $plugin_definition, RequestStack $requestStack, $entityTypeManager) {
    parent::__construct($configuration, $plugin_id, $plugin_definition);
    $this->requestStack = $requestStack;
    $this->entityTypeManager = $entityTypeManager;
  }

  public static function create(ContainerInterface $container, array $configuration, $plugin_id, $plugin_definition) {
    return new static(
      $configuration,
      $plugin_id,
      $plugin_definition,
      $container->get('request_stack'),
      $container->get('entity_type.manager')
    );
  }

  public function build() {
    $build = [];

    $build['dynamic_footer'] = [
      '#lazy_builder' => [
        self::class . '::footerBuilder',
        [
          $this->requestStack->getCurrentRequest()->getSchemeAndHttpHost(),
          $this->requestStack->getCurrentRequest()->getBaseUrl(),
          $this->requestStack->getCurrentRequest()->getPathInfo(),
        ],
      ],
    ];

    return $build;
  }

  public static function footerBuilder($host, $base_url, $pathinfo) {
    $build = [];
    // @TODO add a default siteinfo node, could be one with an emtpy field_sites field and a non-empty drupal_sites field.

      $current_node = \Drupal::routeMatch()->getParameter('node');

      if ($current_node instanceof NodeInterface) {
          if ($current_node->hasField('field_sites')) {
            $current_sites_term_id = $current_node->get('field_sites')->getValue()[0]['target_id'];

            $siteinfo_node = \Drupal::entityTypeManager()
              ->getStorage('node')
              ->loadByProperties([
                'field_sites' => $current_sites_term_id,
                'type' => 'site_information',
              ]);

            $lab_term_name = \Drupal::entityTypeManager()
              ->getStorage('taxonomy_term')
              ->load($current_sites_term_id)->label();

            $build['lab_name'] = [
              '#theme' => 'labs_footer_block',
              '#data' => ['node' => $siteinfo_node, 'lab_name' => $lab_term_name, 'footer_options' => theme_get_setting('footer_options', 'crew')],
            ];
          } else {
            $ids = \Drupal::entityQuery('node')
                  ->accessCheck(TRUE)
                  ->condition('type', 'site_information', '=')
                  ->notExists('field_sites')
//                  ->condition('field_sites.entity:taxonomy_term.name', 'Sites', 'CONTAINS')
                  ->execute();

            if (count($ids) == 1) {
              $siteinfo_node_id = reset($ids);
              $siteinfo_node[] = \Drupal::entityTypeManager()->getStorage('node')->load($siteinfo_node_id);
            }

            $build['lab_name'] = [
              '#theme' => 'labs_footer_block',
              '#data' => ['node' => $siteinfo_node, 'lab_name' => '', 'footer_options' => theme_get_setting('footer_options', 'crew')],
            ];
          }

      }

    $build['#cache'] = [
      'contexts' => [
        'url',
      ],
    ];

    return $build;
  }

  public static function trustedCallbacks() {
    return [
      'footerBuilder',
    ];
  }
}
