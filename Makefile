default: beforecommit

deploy: vendor/autoload.php

	cd public &&	rm -R assets/
	php bin/console cache:clear
	php bin/console tailwind:build --minify
	php bin/console asset-map:compile

vendor/autoload.php: composer.lock composer.json
	composer install --no-dev --optimize-autoloader
	touch vendor/autoload.php


beforecommit :
	./vendor/bin/php-cs-fixer fix src
	vendor/bin/phpstan analyse src
	php bin/phpunit
	npm test