# About 

Dotnet C# client for solving Kattins problems.

## How to use

Client using yeoman for scaffolding the solution. To build and run locally node package manager is required.

## Dependencies

Generator requires:

* dotnet
* npm
* python
  * requests library `pip3 install requests`
* yeoman `npm install -g yo`

## Quick start

1. Get your `.kattisrc` file from Kattis [https://[ContestNAME].kattis.com/download/kattisrc](https://[ContestNAME].kattis.com/download/kattisrc)
2. Save it in home directory created for your contest e.g. `/home/kattis/contest2/.kattisrc`
3. Create directory for your problem `mkdir -p /home/kattis/contest2/hello`
4. Go to directory `cd /home/kattis/contest2/hello`
5. Run yeoman `yo kattisnet`
6. Run tests `npm run test` while you solve the problem
   1. [Optional] run format `npm run format`
7. Submit your solution `npm run submit`

### Build

Like any other node project - use commands in `package.json`. First `npm i` to install packages, then `npm run test` to test.

### Use local version

To use local version, vs. the one in [npm registry](https://www.npmjs.com/package/generator-kattisnet) use `npm link`.

See [Running the generator](https://yeoman.io/authoring/index.html) in yeoman docs.


