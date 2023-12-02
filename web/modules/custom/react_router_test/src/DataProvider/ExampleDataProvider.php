<?php

namespace Drupal\react_router_test\DataProvider;

use Drupal\js_component\JsComponentDataProviderBase;

class ExampleDataProvider extends JsComponentDataProviderBase {

  /**
   * {@inheritDoc}
   */
  public function fetch() {
    return [
      'item' => 'test',
      'item2' => 'test2'
    ];
  }
}
