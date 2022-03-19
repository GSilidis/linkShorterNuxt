# link_shorter

Simple link shortener service (similar to bit.ly). App written using Nuxt.js framework (Vue.js)

**Front page**


**Form for submitting a link**
* After submitting a link, the user receives a shortened link
* Additionally the user receives a link to the statistics page for the shortened link
* Clicking a shortened link redirects the user directly to the original link

**Statistics page**
* Chart or table with link clicks per day
* Button for deleting the link

## Launch

Make sure that docker and docker-composed installed and configured (tested with `Docker version 20.10.13, build a224086` 
and `docker-compose version 1.27.4, build 40524192`)

Then, setup .env file with DB credentials, that will be used by MariaDB and App containers
```
# Example

MARIADB_ROOT_PASSWORD=example
MARIADB_DATABASE=links
MARIADB_USER=node
MARIADB_PASSWORD=password
```

After setting .env file you can launch app  

```shell
$ docker-compose up app
```

This will launch and setup two containers: one containing MariaDB for data storage and link_shorter_app with app itself.

## Build Setup

For local development use (make sure that latest Node.js LTS and Yarn are installed):

```bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn dev
```

For detailed explanation on how things work, check out the [documentation](https://nuxtjs.org).

## Special Directories

You can create the following extra directories, some of which have special behaviors. Only `pages` is required; you can delete them if you don't want to use their functionality.

### `assets`

The assets directory contains your uncompiled assets such as Stylus or Sass files, images, or fonts.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/assets).

### `components`

The components directory contains your Vue.js components. Components make up the different parts of your page and can be reused and imported into your pages, layouts and even other components.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/components).

### `layouts`

Layouts are a great help when you want to change the look and feel of your Nuxt app, whether you want to include a sidebar or have distinct layouts for mobile and desktop.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/layouts).


### `pages`

This directory contains your application views and routes. Nuxt will read all the `*.vue` files inside this directory and setup Vue Router automatically.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/get-started/routing).

### `plugins`

The plugins directory contains JavaScript plugins that you want to run before instantiating the root Vue.js Application. This is the place to add Vue plugins and to inject functions or constants. Every time you need to use `Vue.use()`, you should create a file in `plugins/` and add its path to plugins in `nuxt.config.js`.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/plugins).

### `static`

This directory contains your static files. Each file inside this directory is mapped to `/`.

Example: `/static/robots.txt` is mapped as `/robots.txt`.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/static).

### `store`

This directory contains your Vuex store files. Creating a file in this directory automatically activates Vuex.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/store).


## Unit testing

For unit testing use: 

```shell
$ yarn test
```

This will run both front-end and back-end unit tests
