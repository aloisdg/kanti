// fetch api
// https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
// https://blog.hospodarets.com/fetch_in_action

// async/await
// https://ponyfoo.com/articles/understanding-javascript-async-await

const venigi = (() => {
    let get = async function (source) {
        return await fetch(source)
            .then(response => response.text())
            .catch(err => console.error(err.message));
    }

    let getJson = async function (source) {
        return await fetch(source)
            .then(response => response.json())
            .catch(err => console.error(err.message));
    }

	return {
        get: get,
        getJson: getJson
  };
})();