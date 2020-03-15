import { getAPIURL } from 'config.js'

export const fetchMobileArticles = async () => {

	let url = getAPIURL('articles');

	return fetch(url, {
    	headers: {
      	Accept: 'application/json'
    	}
  	})
  	.then(data => data.json())
  	.catch(error => console.log(error))
}