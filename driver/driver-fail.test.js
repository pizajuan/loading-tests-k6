import http from 'k6/http';
import { sleep, check } from 'k6';

export let options = {
    vus: 1,
    duration: '10s',
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

const users = JSON.parse(open('./driver-fail.json'));

export default function () {
    let apiUrl = 'http://heraeveriliondev.cloudapp.net/ilionservices4/YPF_YER_INTEGRACION/api/TarjetaInfo/';
    let method = 'GetConductor/';
    let params = {
        headers: { 'Content-Type': 'application/json' },
        responseType: 'text',
    };
    for (let user of users) {
        let body = {
            "Email": user.Email
        };
        let res = http.post(apiUrl + method, JSON.stringify(body), params);
        // console.log(JSON.stringify(res));
        check(res, {
            'status was 200': r => r.status == 200,
            'transaction time OK': r => r.timings.duration < 30000,
            'body null': r => r.body == 'null'
        });
        sleep(1);
    }
}
