# GitHub user : React Project

- We have to download some external libraries 


```
  npm install @auth0/auth0-react

```

```
    npm install styled-components

```

```
    npm install react-router-dom

```


```
    npm install react-icons --save

```

```
    npm install axios

```

```

    npm install fusioncharts react-fusioncharts --save

``` 
### React-Router-Dom 

- <SWITCH> renders the first child <Route> that matches A <Rout path ="*"> always matches

### Github API 
- root endpouint 
[github api root endpoint](https://api.github.com)
- get user 
[user] (https://api.github.com/user)
- user
 [repos] (https://api.github.com/users/john-smilga/repos?per_page=100)
- followers 
[followers](https://api.github.com/users/john-smilga/followers)
- rate limit 
[rate limit](https://api.github.com/rate_limit)

Fushion Charts
[react fushionchart](https://www.fusioncharts.com/dev/getting-started/react/your-first-chart-using-react)
[configurations of the chart](https://www.fusioncharts.com/dev/chart-guide/list-of-charts)

### Authorization 

- Make an account at Auth0 https://auth0.com/ 
- Application -> create an Application -> Choose Single Web App -> React 
- [Auth0 React SDK](https://auth0.com/docs/quickstart/spa/react)
  
- Note: When you deploy it on netlify , don't forget to update "build" in package.json 
  
```
    "build": "CI= react-scripts build",
```
  
- In public folder, create _redirects file and /* /index.html 200 
