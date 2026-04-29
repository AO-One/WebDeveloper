// 1. Configuration - Replace these with your actual keys from Supabase Settings
const supabaseUrl = 'https://txtoaydkpqlqhcwtiaye.supabase.co';
const supabaseKey = 'sb_publishable_2UbDbv2EUfHO5wbhRKfLfA_R5NErg3X'; // Find this in Project Settings > API

// 2. Initialize the Supabase Client
const _supabase = supabase.createClient(supabaseUrl, supabaseKey);

// 3. Function to fetch your business sites
async function loadOneOSData() {
    console.log("OneOS: Attempting to connect to the brain...");

    try {
        // This pulls from the 'sites' table we discussed creating
        const { data, error } = await _supabase
            .from('sites')
            .select('*');

        if (error) throw error;

        if (data) {
            console.log("OneOS: Data retrieved successfully!", data);
            displaySites(data);
        }
    } catch (err) {
        console.error("OneOS Connection Error:", err.message);
        document.getElementById('display-area').innerHTML = "Connection failed. Check console.";
    }
}

// 4. Function to display the data on your webpage
function displaySites(sites) {
    const container = document.getElementById('display-area');
    
    // Clear the loading message
    container.innerHTML = "";

    sites.forEach(site => {
        const siteElement = document.createElement('div');
        siteElement.className = 'site-card';
        siteElement.innerHTML = `
            <h3>${site.business_name}</h3>
            <p>${site.description || 'Global OneOS Branch'}</p>
            <a href="${site.url}" target="_blank">Visit Website</a>
            <hr>
        `;
        container.appendChild(siteElement);
    });
}

// 5. Run the function when the page loads
document.addEventListener('DOMContentLoaded', loadOneOSData);