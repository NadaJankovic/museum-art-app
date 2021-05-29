import BaseService from './baseService';

class MainService extends BaseService {
    constructor(url) {
        super(url);
    }
    async getCollection() {
        try {
            // check if tree data exists in local storage; if so, use data from local storage, if not call api;
            const treeData = localStorage.getItem('treeData');
            if (treeData) {
                const parsedData = JSON.parse(treeData);
                return parsedData;
            } else {
                const response = await fetch(`${this.backendURl}/getCollection`);
                const data = await response.json();
                const stringifiedData = localStorage.setItem('treeData', JSON.stringify(data))
                return JSON.parse(localStorage.getItem('treeData'))
            }
        } catch (err) {
            console.log(err)
        }

    }
    async getItemById(id) {
        try {
            // get item by id and save it to local storage
             
                const response = await fetch(`${this.backendURl}/getCollectionById/${id}`);
                const data = await response.json();
                const stringifiedData = localStorage.setItem('artItem', JSON.stringify(data))
                return JSON.parse(localStorage.getItem('artItem'))
        } catch (err) {
            console.log(err)
        }
    }
}
export default MainService;