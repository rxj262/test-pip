<?php
/**
 * Created by PhpStorm.
 * User: chulavista
 * Date: 3/22/19
 * Time: 3:37 PM
 */

namespace Drupal\utility\Form;

use Consolidation\AnnotatedCommand\AnnotatedCommand;
use Drupal\Core\Ajax\AjaxResponse;
use Drupal\Core\Ajax\HtmlCommand;
use Drush\Drush;
use Drush\Log\LogLevel;
use Symfony\Component\Process\ProcessBuilder;
use Unish\archiveDumpCase;
use Webmozart\PathUtil\Path;
use Consolidation\AnnotatedCommand\AnnotationData;
use Drush\Command\DrushInputAdapter;
use Consolidation\SiteAlias\SiteAlias;
use Consolidation\AnnotatedCommand\CommandData;
use Symfony\Component\Console\Output\ConsoleOutput;
use Symfony\Component\Process\Process;
use Symfony\Component\Process\Exception\ProcessFailedException;
use Drupal\Core\Form\FormBase;
use Drupal\Core\Form\FormStateInterface;
use Drupal\Component\Utility;





/** TODO:
 * 1. show user list for the desired sites
 * 2. add user
 * 3. block user
 * 4. generate user list for all sites and provide a way to download in csv format.
 **/




class AddUserForm extends FormBase {
  public function getFormId() {
    // TODO: Implement getFormId() method.
    return 'add_user';
  }
  public function buildForm(array $form, FormStateInterface $form_state) {
    // TODO: Implement buildForm() method.
    $form['uri'] = array(
      '#type' => 'textfield',
      '#title' => t('Site URL:'),
      '#field_prefix' => 'https://case.edu/',
      '#required' => TRUE,
      '#size' => 32,
    );
    $form['env'] = array(
      '#type' => 'select',
      '#title' => t('Environment: '),
      '#options' => [
        'prod' => $this->t('Production'),
        'stg' => $this->t('Staging'),
        'dev' => $this->t('Development'),
      ],
    );
    $form['user'] = array(
      '#type' => 'textfield',
      '#title' => 'Case NetID', // need validation and sql inject prevention
      '#maxlength' => 10,
      '#size' => 12,
    );
    $form['role'] = array(
      '#type' => 'checkboxes',
      '#title' => 'Role or roles to assign to this user', // need validation and sql inject prevention
      '#options' => [
        'department_admin' => $this->t("Department Administrater"),
        'school_developer' => $this->t("School Developer"),
      ]
    );



    // enable this section to use ajax to render result
    //    $form['actions'] = [
    //      '#type' => 'button',
    //      '#value' => $this->t('Submit'),
    //      '#ajax' => [
    //        'callback' => '::renderResult',
    //      ],
    //    ];
    //
    //    $form['result'] = [
    //      '#type' => 'markup',
    //      '#title' => $this->t('Result:'),
    //      '#description' => $this->t('should not be displaying before form submit'),
    //      '#markup' => '<div id="result"></div>',
    //    ];


    // enable this section to use non-ajax to render results
    $form['actions']['#type'] = 'actions';
    $form['actions']['submit'] = array(
      '#type' => 'submit',
      '#value' => $this->t('Save'),
      '#button_type' => 'primary',
    );

    return $form;
  }


  /**
   * Private function to convert drush result into a table render array
   */
  protected function _formatResult($process) {
    $output = $process->getOutput();
    $output = explode("\n", $output);
    $output = array_slice($output, 1, -1);
    foreach ($output as &$item) {
      $item = preg_split('/\s+/', $item);
    }
    $header = ['Name', 'Mail', 'Status'];
    $result[] = array(
      '#theme' => 'table',
      '#cache' => ['disabled' => TRUE],
      '#caption' => 'The table caption / Title',
      '#header' => $header,
      '#rows' => $output,
    );
    return $result;
  }


  /**
   * @param array $form
   * @param \Drupal\Core\Form\FormStateInterface $form_state
   */
  public function submitForm(array &$form, FormStateInterface $form_state) {
    // TODO: Implement submitForm() method.
    $env = $form_state->getValue('env');
    $uri = $form_state->getValue('uri');

    if ($env === 'dev') {

      //      kint($_SERVER);exit;

      $process = new Process(["/mnt/www/html/cwrudev/docroot/vendor/drush/drush/drush.php", "@cwru.dev", "sqlq", "SELECT name, mail, status from users_field_data", "--uri=cwrudev.prod.acquia-sites.com/$uri"]);
    } elseif ($env === 'stg') {
//      $process = new Process(["/mnt/www/html/cwrustg/docroot/vendor/drush/drush/drush.php", "@self", "sqlq", "SELECT name, mail, status from users_field_data", "--uri=cwrustg.prod.acquia-sites.com/$uri"]);


      $caseid = $form_state->getValue('user');
      $roles = $form_state->getValue('role');

//      foreach ($roles as $key => $value) {
//        $key = Utility\Html::escape($key);
//      }


      $roles = array_keys($roles);

//      kint($roles); exit;


      $caseid = Utility\Html::escape($caseid);


      $user_add = \Drupal\user\Entity\User::create();
      $cas_user_manager = \Drupal::service('cas.user_manager');

      $user_add->setUsername($caseid);
      $user_add->setEmail("$caseid@case.edu");
      $user_add->enforceIsNew();
      $user_add->activate();

//      foreach ($roles as $role) {
//        $user_add->roles[] = $role;
//      }

//      $user_add->roles[] = 'school_developer';
//
      $user_add->roles[] = 'department_admin';

      $res = $user_add->save();
      if ($res == 1) {
        $account = user_load_by_name($caseid);
        $cas_user_manager->setCasUsernameForAccount($account, $caseid);
      }










    } elseif ($env === 'prod') {
      $process = new Process(["/mnt/www/html/cwruprod/docroot/vendor/drush/drush/drush.php", "@cwru.prod", "sqlq", "SELECT name, mail, status from users_field_data", "--uri=cwru.prod.acquia-sites.com/$uri"]);
    }

//    if ($process->getStatus() == 'ready') {
//
//      $process->run();
//
//      if (!$process->isSuccessful()) {
//        $error_log = new ProcessFailedException($process);
//        drupal_set_message($error_log->getMessage(), 'error');
//      } else {
//        $result = $this->_formatResult($process);
//        drupal_set_message($result);
//      }
//    } else {
//      drupal_set_message($process->getExitCode(), 'error');
//    }
  }

  public function renderResult(array &$form, FormStateInterface $form_state) {

    $env = $form_state->getValue('env');
    $uri = $form_state->getValue('uri');

    if ($env === 'dev' or $env === 'stg') {

      $process = new Process(["/mnt/www/html/cwru$env/docroot/vendor/drush/drush/drush.php","sqlq", "SELECT name, mail from users_field_data", "--uri=cwru$env.prod.acquia-sites.com/$uri"]);

      try {
        $process->run();

        $output = $process->getOutput();

        $lines = array_filter( explode("\r\n", $output), 'strlen');

        //        $lines = explode("\r\n", $output);

        $response = new AjaxResponse();
        $response->addCommand(
          new HtmlCommand(
            '#result', $output
          )
        );
        return $response;


      } catch (ProcessFailedException $exception) {
        $output = $exception->getMessage();
      }
      //
      //      $response = new AjaxResponse();
      //      $response->addCommand(
      //        new HtmlCommand(
      //          '#result', $lines
      //        )
      //      );
      //      return $response;
    }
    //    elseif ($env === 'prod') {
    //      $process = new Process(["/mnt/www/html/cwruprod/docroot/vendor/drush/drush/drush.php", "--uri=cwru.prod.acquia-sites.com/$uri", "status"]);
    //    } elseif ($env === 'default') {
    //      $process = new Process(["/Users/chulavista/Sites/devdesktop/cwru-dev/docroot/vendor/drush/drush/drush.php", "sqlq", "SELECT * from user_field_data"]);
    //    }


    //    $output = $process->getOutput();



    //    if ($process->getStatus() == 'ready') {
    //
    //      if (!$process->isSuccessful()) {
    //
    //        $output = $process->isSuccessful();
    //
    //        $response = new AjaxResponse();
    //        $response->addCommand(
    //          new HtmlCommand(
    //            '#result', $output
    //          )
    //        );
    //      }
    //      else {
    //        $response = new AjaxResponse();
    //        $response->addCommand(
    //          new HtmlCommand(
    //            '#result', 'okay'
    //          )
    //        );
    //      }
    //      return $response;
    //    }
  }
}