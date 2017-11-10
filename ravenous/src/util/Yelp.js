const clientId = '*';
const secret = '*';
const corsAnywhere = 'https://cors-anywhere.herokuapp.com/';


let accessToken = false;

const Yelp = {
    getAccessToken () {
        if (accessToken) {
            return new Promise(resolve => resolve(accessToken));
        } 
        return fetch(`${corsAnywhere}https://api.yelp.com/oauth2/token?grant_type=client_credentials&client_id=${clientId}&client_secret=${secret}`, { method: 'POST' }).then(response => {
                if (response.ok) {
                    return response.json();
                }
            }).then(jsonResponse => {
                // console.log('access token received:', jsonResponse);
                accessToken = jsonResponse.access_token;
            });
    },
    search (term, location, sortBy) {
        return Yelp.getAccessToken().then(() => {
            return fetch(`${corsAnywhere}https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}&sort_by=${sortBy}`, { headers: { Authorization: `Bearer ${accessToken}` }}).then(response => {
                    if (response.ok) {
                        console.log('response ok', response);
                        return response.json();
                    }
                }).then(jsonResponse => {
                    console.log('jsonresp', jsonResponse);
                    if (jsonResponse.businesses) {
                        return jsonResponse.businesses.map(business => {
                            return {
                                id: business.id,
                                imageSrc: business.image_url,
                                name: business.name,
                                address: (business.location.address1 || business.location.address2 || business.location.address3),
                                city: business.location.city,
                                state: business.location.state,
                                zipCode: business.location.zip_code,
                                category: business.categories[0].title,
                                rating: business.rating,
                                reviewCount: business.review_count
                            }
                        });
                    }
                });
        });
    }
};

export default Yelp;