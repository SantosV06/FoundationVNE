import http from 'k6/http';
import { check, sleep } from 'k6';

/* global __ENV */

const BASE_URL = __ENV.TARGET_URL || 'https://foundationvne.com';
const MAX_VUS = Number(__ENV.MAX_VUS || 5);

export const options = {
  stages: [
    { duration: '15s', target: Math.max(1, Math.ceil(MAX_VUS / 2)) },
    { duration: '30s', target: MAX_VUS },
    { duration: '15s', target: 0 },
  ],
  thresholds: {
    http_req_failed: ['rate<0.01'],
    http_req_duration: ['p(95)<3000'],
    checks: ['rate>0.99'],
  },
};

const pages = [
  { name: 'homepage', url: `${BASE_URL}/?lang=en` },
  { name: 'leadership', url: `${BASE_URL}/liderazgo?lang=en` },
];

export default function () {
  for (const page of pages) {
    const response = http.get(page.url, {
      headers: { 'User-Agent': 'FoundationVNE-k6-performance-check/1.0' },
      tags: { page: page.name },
      timeout: '15s',
    });

    check(response, {
      [`${page.name}: HTTP 200`]: (r) => r.status === 200,
      [`${page.name}: response under 3s`]: (r) => r.timings.duration < 3000,
    });
  }

  sleep(1);
}
