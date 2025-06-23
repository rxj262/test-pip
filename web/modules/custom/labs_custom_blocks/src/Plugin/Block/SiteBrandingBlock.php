<?php

namespace Drupal\labs_custom_blocks\Plugin\Block;

use Drupal\Core\Annotation\Translation;
use Drupal\Core\Block\BlockBase;
//use Drupal\Core\Menu\MenuActiveTrail;
use Drupal\Core\Plugin\ContainerFactoryPluginInterface;
use Drupal\Core\Security\TrustedCallbackInterface;
use Drupal\node\NodeInterface;
use GuzzleHttp\ClientInterface;
use PHPStan\Rules\TipRuleError;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\HttpFoundation\RequestStack;
//use Drupal\Core\Menu\MenuActiveTrailInterface;

/**
 * Provides site name and school name on the fly
 *
 * @Block(
 *   id = "school_lab_name",
 *   admin_label = @Translation("School and Lab name"),
 *   category = @Translation("Content")
 * )
 */

//#[\AllowDynamicProperties]

class SiteBrandingBlock extends BlockBase implements TrustedCallbackInterface, ContainerFactoryPluginInterface {

  protected RequestStack $requestStack;

  public function __construct(array $configuration, $plugin_id, $plugin_definition, RequestStack $requestStack) {
    parent::__construct($configuration, $plugin_id, $plugin_definition);
    $this->requestStack = $requestStack;
  }

  public static function create(ContainerInterface $container, array $configuration, $plugin_id, $plugin_definition) {
    return new static(
      $configuration,
      $plugin_id,
      $plugin_definition,
      $container->get('request_stack'),
    );
  }

  public function build(): array {
    $build = [];
    $build['dynamic_branding'] = [
      '#lazy_builder' => [
        self::class . '::brandingBuilder',
        [
          $this->requestStack->getCurrentRequest()->getSchemeAndHttpHost(),
          $this->requestStack->getCurrentRequest()->getBaseUrl(),
          $this->requestStack->getCurrentRequest()->getPathInfo(),
        ],
      ],
    ];
    return $build;
  }

  public static function brandingBuilder($host, $base_url, $pathinfo): array {
    $build = [];
    $is_admin = \Drupal::service('router.admin_context')->isAdminRoute();


    if ($is_admin !== True) {
      $node = \Drupal::routeMatch()->getParameter('node');

      if (!isset($node) || $node->hasField('field_sites') === False || !$node instanceof NodeInterface) {
        return $build;
      }

      $node_sites_term_id = $node->get('field_sites')->getValue()[0]['target_id'];

      if (isset($node_sites_term_id)) {
        $lab_term_label = \Drupal::entityTypeManager()
          ->getStorage('taxonomy_term')
          ->load($node_sites_term_id)->label();

        $lab_term_label = str_replace("sites - ", "", $lab_term_label);
        $lab_label = ucwords(str_replace('-', ' ', $lab_term_label));

        // Abort if node is assigned to an umbrella term
        if (str_contains($lab_label, 'Sites')) {
          return $build;
        }

        $build['lab_name'] = [
          '#theme' => 'schoolandlab',
          '#data' => ['label' => $lab_label, 'host' => $host, 'base_url' => $base_url, 'pathinfo' => $pathinfo],
        ];

        $build['#cache'] = [
          'contexts' => [
            'url',
          ],
        ];
      }
    }
    return $build;
  }

  public static function trustedCallbacks(): array {
    return [
      'brandingBuilder',
    ];
  }
}
