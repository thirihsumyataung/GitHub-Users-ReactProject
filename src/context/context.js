import React, { useContext, useState, useEffect } from 'react';
import mockUser from './mockData.js/mockUser';
import mockRepos from './mockData.js/mockRepos';
import mockFollowers from './mockData.js/mockFollowers';
import axios from 'axios';

const rootUrl = 'https://api.github.com';

const GithubContext = React.createContext();

// Provider , Consumer - GibhubContext.Provider 

const GithubProvider = ({ children }) => {
    const [githubUser, setGithubUser] = useState(mockUser);
    const [repos, setRepos] = useState(mockRepos);
    const [followers, setFollowers] = useState(mockFollowers);
    // request loading 
    const [requests, setRequests] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    // error 
    const [error, setError] = useState({ show: false, msg: '' });
    
    const searchGithubUser = async (user) => {
    //console.log(user); 
        toggleError(); 
        setIsLoading(true); 
        const response = await axios(`${rootUrl}/users/${user}`).catch(err => console.log(err));
        console.log(response); 
        if (response) {
            setGithubUser(response.data);
            const { login, followers_url } = response.data;
            await Promise.allSettled([axios(`${rootUrl}/users/${login}/repos?per_page=100`), axios(`${followers_url}?per_page=100`)]).then((results) => {
                console.log(results); 
                const [repos, followers] = results;
                const status = 'fulfilled';
                if (repos.status === status) {
                    setRepos(repos.value.data); 
                }
                if (followers.status === status) {
                    setFollowers(followers.value.data); 
                }
            }
            );
            //repos 
            //https://api.github.com/users/john-smilga/repos?per_page=100
        // await   .then(response => setRepos(response.data));
             // followers 
            // https://api.github.com/users/john-smilga/followers
        // await   .then(response => setFollowers(response.data));
            //either we will pass it in assign of variable or you can pass directly in the array           
        }
        else {
            toggleError(true, `Sorry: user with ${user} name is not found. `); 
        }
        checkRequest();
        setIsLoading(false); 
        
    }
    //check rate 
    const checkRequest = () => {
        axios(`${rootUrl}/rate_limit`).then(({ data }) => {
            let { rate: { remaining } } = data;
            //remaining = 0;
            setRequests(remaining);
            if (remaining === 0) {
                // throw an error   
                toggleError(true, 'Sorry, you have exceded your hourly rate limit!'); 
            }
            console.log(data);
            console.log(remaining); 
        }).catch((err) => console.log(err)); 
    }
    function toggleError(show = false, msg = " ") {
        setError({ show, msg }); 
    }
     // error 
    useEffect(checkRequest, [])
    return <GithubContext.Provider value={{githubUser, repos, followers, requests, error , searchGithubUser, isLoading}}>{children}</GithubContext.Provider>
}

export const useGlobalGithubContext = () => {
    return useContext(GithubContext); 
}
export { GithubProvider, GithubContext }; 