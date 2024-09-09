<?php

namespace App\Utils;

class UnwantedTags
{
    /**
     * strip_unwanted_tags.
     *
     * @param array<string> $unwanted_tags
     */
    public function strip_unwanted_tags(string $string, array $unwanted_tags = []): string
    {
        foreach ($unwanted_tags as $tag) {
            $string = preg_replace("/<\/?$tag\b[^>]*>/i", '', $string);
        }

        return $string;
    }
}
