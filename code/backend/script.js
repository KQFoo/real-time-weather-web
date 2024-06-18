// fetch = Function used for making HTTP requests to fetch resources.
//              (JSON style data, images, files)
//              Simplifies asynchronous data fetching in JavaScript and
//              used for interacting with APIs to retrieve and send
//              data asynchronously over the web.
//              fetch(url, {options})



/*async function fetchdata()
{
    try
    {
        const response = await fetch("https://api.theirstack.com");
    }
    catch(error)
    {
        console.error(error);
    }
}*/

import { ApifyClient } from 'apify-client';

// Initialize the ApifyClient with your Apify API token
const client = new ApifyClient({
    token: '<YOUR_API_TOKEN>',
});

// Prepare Actor input
const input = {
    "companyName": [
        "Google",
        "Microsoft"
    ],
    "companyId": [
        "76987811",
        "1815218"
    ],
    "proxy": {
        "useApifyProxy": true,
        "apifyProxyGroups": [
            "RESIDENTIAL"
        ]
    }
};

(async () => {
    // Run the Actor and wait for it to finish
    const run = await client.actor("bebity/linkedin-jobs-scraper").call(input);

    // Fetch and print Actor results from the run's dataset (if any)
    console.log('Results from dataset');
    console.log(`💾 Check your data here: https://console.apify.com/storage/datasets/${run.defaultDatasetId}`);
    const { items } = await client.dataset(run.defaultDatasetId).listItems();
    items.forEach((item) => {
        console.dir(item);
    });
})();