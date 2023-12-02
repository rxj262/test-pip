<?php
namespace Drupal\React_Router_Test\Controller;

use Drupal\Core\Controller\ControllerBase;

/** 
 * Controller for My React App. 
*/
class ReactRouterTestController extends ControllerBase {

  /** 
   * Renders the react app. 
   * @return array 
   * The render array. 
  */ 
  public function overview() { 
    $build = [];

    // @TODO - do dev / prod here. (/react or /react-dev) 
    // Ideally, make this configurable somehow. 
    // $build['#attached']['library'][] = 'react_libraries/react-dev';
 
    // This is where you attach the additional library from your 
    // module that contains the non-React-libraries code
//    $build['#attached']['library'][] = '/modules/custom/react_router_test/components/react_router_test/build/static/js/main.js';
//    $build['#attached']['library'][] = '/modules/custom/react_router_test/components/react_router_test/build/static/js/0.chunck.js';
    $build['#attached']['library'][] = 'react_router_test/react_library';

 
    // Finally, drop your main mount point for React. 
    // This ID can be whatever you use in your app. 
    $build['#markup'] = '<div id="root-cebp"></div>'; 

    return $build; 
  } 
}
