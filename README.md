# Scribbler
Scribbler is a single-page word game built using a Rails API on the backend and vanilla JS on the frontend. The game consists of three rounds, each with it's own rule that the user must follow. The rule defines which words the application will accept as valid words (e.g. words that start with "s" and end with "w"). The goal for the user is to guess as many words as possible in order to gain points. Guessing random words that the user might not know is encouraged, and at the end of the game, the user is able to hover over any word to see its definition, which is pulled from the [Merriam-Webster API](https://dictionaryapi.com/). Points awarded for each word are determined by [Scrabble rules](https://scrabble.hasbro.com/en-us/faq).

This application runs on Ruby 2.6.1.

## Installation
1. Clone this repo
2. `cd` to `scribbler/backend/`
3. Run `bundle install` to install any dependencies
4. Run `rails db:migrate` to set up the database
5. Run `rails s` to start the Rails server
6. Run `open ../frontend/index.html` to open the webpage in your browser

## Contributing
If you see an opportunity for improvement go ahead and use a typical git workflow to make it happen:

* Fork this curriculum repository
* Make the change on your fork, with descriptive commits in the standard format
* Open a Pull Request against this repo

The repo owner will review your change and approve or comment on it in due
course.
