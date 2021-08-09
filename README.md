# It's all about cats

This is a cat App that allows you to upload, view, and vote on cat images.

This app has basic error handling, validation, linting using prettier, and currently has no real state mechanism to update data based on user input.

App was built against the following requirements:

1. You should be able to upload a new cat image
2. You should be able to view the cat images you uploaded
3. You should be able to favourite and un-favourite a cat
4. You should be able to vote a cat up or down
5. You should see a score on each cat based on the votes

#
##

Future improvements:
- Use some state pattern, context or hooks, to allow the sharing of vote data and make votes update in real time
- Look at creating an API service over useFetch hook
- Improve type generics being passed into useFetch hook
- Improve styles usage to use css.modules over BEM classnames
- Add some logic to get favourite cat images and display accordingly
- Add api key as env variables for tests and prod build
- Componentise basic components such as buttons to create consistent look and feel without having to repeat CSS

#
## Running Locally

Install dependencies using `npm install`, then run the following commands to run app.

Run app in development mode:
```
npm run start
```


Test App:
```
npm run test
```


Build app for production:
```
npm run build
```
