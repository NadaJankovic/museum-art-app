import BaseService from './baseService';

class MainService extends BaseService {
    constructor(url) {
        super(url);
    }
    async getCollection() {
        try {
            const response = await fetch(`${this.backendURl}/getCollection`);
            const data = await response.json();
            const treeData = localStorage.setItem('treeData', JSON.stringify(data.tree));
            const departInfo = localStorage.setItem('departInfo', JSON.stringify(data.collection))
            return ({ tree: data.tree,depart:data.collection })
        } catch (err) {
            console.log(err)
        }

    }
    async getItemById(id) {
        try {
            // get item by id 
            const response = await fetch(`${this.backendURl}/getCollectionById/${id}`)
            const data = await response.json();
            /* localStorage.setItem('artItem', JSON.stringify(data)) */
            return data

        } catch (err) {
            console.log(err)
        }
    }
}
export default MainService;