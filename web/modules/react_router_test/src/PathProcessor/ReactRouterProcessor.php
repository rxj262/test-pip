<?php
namespace Drupal\react_router_test\PathProcessor;

use Drupal\Core\PathProcessor\InboundPathProcessorInterface;
use Symfony\Component\HttpFoundation\Request;

class ReactRouterProcessor implements InboundPathProcessorInterface {

  public function processInbound($path, Request $request) {

    if (strpos($path, '/events/') === 0) {
      $names = preg_replace('|^\/events\/|', '', $path);
      $names = str_replace('/',':', $names);
      return "/events/$names";
    }

    return $path;
  }




} 
