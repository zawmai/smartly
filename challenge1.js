async function getApiKey(name) {
    var mHeaders = new Headers({
        'Accept': 'application/json',
        'Accept-Encoding': 'gzip, deflate, br',
        'Content-Type': 'application/json',
        'Connection': 'keep-alive',
        'host': 'fasttrack-smartly.herokuapp.com'
    });

    var mBody = JSON.stringify({
        "candidate_name": name
    })

    var  options = {
        method: 'POST',
        headers: mHeaders,
        body: mBody,
    };

    var response = await fetch('/', options);
    var json = await response.json();
    console.log(json);

    return json.apikey_value;
}

async function postAuthenticate(name, key) {
    var mHeaders = new Headers({
        'Accept': 'application/json',
        'Accept-Encoding': 'gzip, deflate, br',
        'Content-Type': 'application/json',
        'Connection': 'keep-alive',
        'host': 'fasttrack-smartly.herokuapp.com',
        'authorization': 'Basic ' + btoa(name + ':' + key)
    });

    var  options = {
        method: 'POST',
        headers: mHeaders,
    };

    var response = await fetch('/authenticate', options);
    var json = await response.json();
    console.log(json);

    return json.status;
}

async function getAds(name, key, nextId) {
    var mHeaders = new Headers({
        'Accept': 'application/json',
        'Accept-Encoding': 'gzip, deflate, br',
        'Content-Type': 'application/json',
        'Connection': 'keep-alive',
        'host': 'fasttrack-smartly.herokuapp.com',
        'authorization': 'Basic ' + btoa(name + ':' + key)
    });

    var  options = {
        method: 'GET',
        headers: mHeaders,
    };
    
    var param = nextId ? "?next=" + nextId : '';
    var response = await fetch('/ads' + param, options);
    var json = await response.json();
    console.log(json);

    return json;
}

async function updateAd(name, key, targetAd) {
    var mHeaders = new Headers({
        'Accept': 'application/json',
        'Accept-Encoding': 'gzip, deflate, br',
        'Content-Type': 'application/json',
        'Connection': 'keep-alive',
        'host': 'fasttrack-smartly.herokuapp.com',
        'authorization': 'Basic ' + btoa(name + ':' + key)
    });

    var  options = {
        method: 'PUT',
        headers: mHeaders,
        body: JSON.stringify(targetAd)
    };
    
    // var param = nextId ? "?next=" + nextId : '';
    var response = await fetch('/ads', options);
    var json = await response.json();
    console.log(json);

    return json;
}



async function main() {
    var statusArr = ['ACTIVE', 'PAUSED', 'DELETED', 'ARCHIVED'];
    var name = 'zawmai';
    var key =  await getApiKey(name);
    var isSucess = (await postAuthenticate(name, key)).toLowerCase() == 'success';
    var payload = isSucess && await getAds(name, key);
    
    var invalidAds = [];
    while(payload.next) {
        payload = await getAds(name, key, payload.next);
        payload.ads && payload.ads.forEach(ad => {
           if(statusArr.indexOf(ad.status) < 0) {
               invalidAds.push({'target': ad, 'next': payload.next, 'original': payload});
           }
        });
    }
 
    console.log(invalidAds);
    invalidAds.forEach(async (invalid) => {
        invalid.target.status = 'ACTIVE';
        await updateAd(name, key, invalidAds[0].target);
    });
    
}

main();
