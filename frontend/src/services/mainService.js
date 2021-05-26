import BaseService from './baseService';

class MainService extends BaseService {
    constructor(url) {
        super(url);
    }
    async getCollection() {
        try {
            const response = await fetch(`${this.backendURl}/getCollection`);
            const data = await response.json();
            return data
        } catch (err) {
            console.log(err)
        }

    }
    async getItemById(id) {
        try {
            const response = await fetch(`${this.backendURl}/getCollectionById/${id}`);
            const data = await response.json();
            return data;
        } catch (err) {
            console.log(err)
        }
    }
    async updateItem(id, item) {
        try {
            const collection=[];
           const local= localStorage.getItem('collection');
            if(!local){
                let objItem= {
                    id:id,
                    name:item.name,
                    description:item.description,
                    url:item.url,
                }
            collection.push(objItem);
            localStorage.setItem('collection',JSON.stringify(collection));
            }
           
        } catch (err) {
            console.log(err)
        }
    }
}
export default MainService;