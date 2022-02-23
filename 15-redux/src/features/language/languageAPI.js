// A mock function to mimic making an async request for data
export async function fetchDictionary(language) {
    return await fetch(`https://kodbazis.hu/api/dictionary/${language}`).then(res => res.json());
}
