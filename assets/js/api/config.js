let APIURL = 'https://api-bodblog.herokuapp.com/'

export const getAPIURL = (path) => {
	return APIURL.concat(path)
}