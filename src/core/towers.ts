import path from 'path';
import { TowerInfo } from './interfaces';


export async function getTowers(): Promise<Array<TowerInfo>> {
    const fs = require('fs').promises;
    //Find the absolute path of the json directory
    const jsonDirectory = path.join(process.cwd(), 'json');
    //Read the json data file data.json
    const fileContents = await fs.readFile(jsonDirectory + '/coordinates.json', 'utf8');

    const results: Array<TowerInfo> = [];
    const array: [any] = JSON.parse(fileContents);
    array.forEach(c => {
        let tower = results.find(t => t.coordinates.latitude == c.LATITUDE && t.coordinates.longitude == c.LONGITUDE);
        if (!tower) {
            tower = {
                coordinates: {
                    latitude: c.LATITUDE,
                    longitude: c.LONGITUDE,
                }
            }
            results.push(tower);
        }
    })
    return results;
}