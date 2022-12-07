export interface Coordinates {
    latitude: number;
    longitude: number;
}
export interface AntennaInfo {
    licensee?: string;
    tx_pwr?: string;
    transmit_bw?: string;
    transmit_freq?: string;
    site_elev?: string;
    tx_ant_azim?: string;
}

export interface TowerInfo {
    coordinates: Coordinates;
    antennas: [AntennaInfo]
}

export interface TowersResult {
    towersTotalCount: number,
    towers: Array<TowerInfo>
}