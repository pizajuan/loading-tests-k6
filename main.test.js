import { sleep, group } from 'k6';
import CardInfoSuccess from './card-info/card-info-success.test.js';
import CardInfoFail from './card-info/card-info-fail.test.js';
import DriverSuccess from './driver/driver-success.test.js';
import DriverFail from './driver/driver-fail.test.js';

export let options = {
    vus: 1,
    duration: '40s',
    // Se puede realizar la prueba por stages de la siguiente forma:
    // stages: [
    //     { duration: '2m', target: 100 }, // below normal load
    //     { duration: '5m', target: 100 },
    //     { duration: '2m', target: 200 }, // normal load
    //     { duration: '5m', target: 200 },
    //     { duration: '2m', target: 300 }, // around the breaking point
    //     { duration: '5m', target: 300 },
    //     { duration: '2m', target: 400 }, // beyond the breaking point
    //     { duration: '5m', target: 400 },
    //     { duration: '10m', target: 0 }, // scale down. Recovery stage.
    // ],
};

export default (data) => {
    group('CardInfoSuccess', () => {
        CardInfoSuccess();
    })
    group('CardInfoFail', () => {
        CardInfoFail();
    })
    group('DriverSuccess', () => {
        DriverSuccess();
    })
    group('DriverFail', () => {
        DriverFail();
    })
    sleep(1)
}