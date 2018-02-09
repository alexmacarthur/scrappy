# Scrappy

Scrappy is a sandbox test suite for performance testing on your local machine. It's intended to allow you to easily drop in your own pages/routes, serve them locally, and hit them with a tool like [Lighthouse](https://github.com/GoogleChrome/lighthouse).

## Installation
Clone this repo and run `yarn install` to install dependencies. To kick off a server, run `yarn run serve`. This will create routes for all scenarios that have been placed into the `scenarios` directory.

### Setting up SSL Locally
This project comes with an SSL certificate to run locally, but you'll need to set up your machine to trust it. Open up your Keychain Access, select "System" and "Certificates." Import the `rootCA.pem` file in this repo, double click it, and change the dropdown to 'Always Trust'.

!(https://cdn-images-1.medium.com/max/1600/1*NWwMb0yV9ClHDj87Kug9Ng.png)

You can find more information on how to do this [here](https://medium.freecodecamp.org/how-to-get-https-working-on-your-local-development-environment-in-5-minutes-7af615770eec). 

## Create a Scenario
Routes are dynamically generated based on on pug files that are placed into the `scenarios` directory. Adding new files and restarting the server will create a new scenario.

For example, if you add a new scenario at `/scenarios/my-scenario/one`, a new route will be available at `https://localhost:3000/my-scenario/one` after you restart the server.

## Testing Scenarios
After the server has started, you can run performance tests against each route using the tool of your choice. This suit is set up to run use [pwmetrics](https://github.com/paulirish/pwmetrics), which relies on Lighthouse. You can use this to run tests several times at once and get the average results.

To run a test, execute the following command. This will hit the specified route three times and then output results in your terminal.

`npm run test -- https://localhost:3000/scripts/load-at-top --runs=3`

Or, if you have `pwmetrics` installed globally, you can use this: 

`pwmetrics https://localhost:3000/scripts/load-at-top --runs=3`

