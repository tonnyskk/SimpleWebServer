# SimpleWebServer

## How to user the skelenton for develop.

1. Execute following command to setup the develop evn.

	```Shell
	$cd deploy
	$npm install
	$grunt develop
	```
	. The sources will be concat and copy into a new folder [/build].
	. The node server will be started from [/build/server] at port 8080.
	. Also a watcher will be started to keep updating if user modified any resources under [/webapps/js] and [/webapps/css].


## How to create deploy package.

1. Execute following command to generate a deploy package under [/build] and css/js will be uglified.

	```Shell
	$grunt default
	```

## Others

