import http from 'k6/http';
import { check, sleep } from 'k6';

/* global __ENV */

const BASE_URL = __ENV.TARGET_URL || 'https://foundationvne.com';

export const options = {
  // Progressive capacity test: 10 -> 25 -> 50 -> 100 virtual users.
  // The run stops early if sustained error/latency thresholds are breached.
  stages: [
    { duration: '30s', target: 10 },
    { duration: '45s', target: 10 },
    { duration: '30s', target: 25 },
    { duration: '45s', target: 25 },
    { duration: '30s', target: 50 },
    { duration: '45s', target: 50 },
    { duration: '30s', target: 100 },
    { duration: '45s', target: 100 },
    { duration: '30s', target: 0 },
  ],
  thresholds: {
    http_req_failed: [{ threshold: 'rate<0.01', abortOnFail: true, delayAbortEval: '30s' }],
    http_req_duration: [{ threshold: 'p(95)<3000', abortOnFail: true, delayAbortEval: '30s' }],
    checks: [{ threshold: 'rate>0.99', abortOnFail: true, delayAbortEval: '30s' }],
  },
  gracefulRampDown: '10s',
  gracefulStop: '15s',
};

const pages = [
  { name: 'homepage', url: `${BASE_URL}/?lang=en` },
  { name: 'leadership', url: `${BASE_URL}/liderazgo?lang=en` },
];

export default function () {
  for (const page of pages) {
    const response = http.get(page.url, {
      headers: { 'User-Agent': 'FoundationVNE-k6-capacity-test/1.0' },
      tags: { page: page.name },
      timeout: '15s',
    });

    check(response, {
      [`${page.name}: HTTP 200`]: (r) => r.status === 200,
      [`${page.name}: response under 3s`]: (r) => r.timings.duration < 3000,
    });
  }

  // Keep request rate bounded: roughly one iteration per VU per second.
  sleep(1);
}
