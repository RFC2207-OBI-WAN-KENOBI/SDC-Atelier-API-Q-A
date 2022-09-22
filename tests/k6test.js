import http from 'k6/http';
import {check} from 'k6';

export const options = {
  stages: [
    {duration: '10s', target: 50},
    {duration: '10s', target: 100},
    {duration: '10s', target: 250},
    {duration: '10s', target: 500},
    {duration: '10s', target: 750},
    {duration: '10s', target: 1000},
  ]
}


export default function () {
  var tempID = Math.floor(Math.random() * (1000000 - 1) + 1);
  var tempPage = Math.floor(Math.random() * (10 - 1) + 1);

  const res = http.get(`http://localhost:8080/qa/questions?count=5&page=1&product_id=${tempID}`);
  check(res, {
    'is status 200': (r) => r.status === 200
  })


  const res2 = http.get(`http://localhost:8080/qa/questions?count=5&page=1&question_id=${tempID}`);
  check(res2, {
    'is status 200': (r) => r.status === 200
  })

}