## Table of contents
* [General info](#general-info)
* [Technologies](#technologies)
* [Setup](#setup)
* [Development server](#development-server)
* [Build](#build)
* [Running unit tests](#running-unit-tests)

## General info
This project is simple app using Angular Materials, Local Storage, API: http://ontariobeerapi.ca/ 
App consist of: 
- Three column layout, where each column is a list of beers.
Initially lists are empty, and there’s a drop-down on top of each one with all possible
brewers.
- After selecting brewer, list is being populated with 15 beers sorted by name. If there’s
more than 15 beers of given brewer, there’s right-arrow button in the bottom, which
loads another 15 and so on (until all beers are loaded).
- After clicking on beer picture, full size picture is visible on center of window.
- In navigate is button "Options". There are:
   - possibility to change layout theme from light to dark
   - specifying number of elements loaded in one go (from 15 to 30)
   - sorting by given field, selected from drop-down: name, price, type

- All from options and selection is persisted in Local Storage.
	
## Technologies
Project is created with:
* Angular CLI version: 11.2.4
* Angular version: 11
* Angular Material version: 11
	
## Setup
To run this project, install it locally using npm:

$ git clone https://github.com/paweell5808/WorldOfBeers.git
$ cd WorldOfBeers
$ npm install

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).
