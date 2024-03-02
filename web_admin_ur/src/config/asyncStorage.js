//those two functions are used to store and retrieve data from the async storage

export const setThemeInStorage = (key, value) => {
    const jsonValue = JSON.stringify(value);
    localStorage.setItem(key, jsonValue);

}
export const getThemeInStorage = (key) => {
    const jsonValue = localStorage.getItem(key);
    return JSON.parse(jsonValue);
}
