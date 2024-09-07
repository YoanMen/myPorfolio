<?php

namespace App\Util;

class UnwantedTags
{
  function strip_unwanted_tags($string, $unwanted_tags = [])
  {
    foreach ($unwanted_tags as $tag) {
      $string = preg_replace("/<\/?$tag\b[^>]*>/i", '', $string);
    }

    return $string;
  }
}
