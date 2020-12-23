<?php

function handler($event, $context) {
  $logger = $GLOBALS['fcLogger'];
  $logger->info("hello world");
  return "hello world";
}

?>

