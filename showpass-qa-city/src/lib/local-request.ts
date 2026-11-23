export function isLocalCityRequest(request: Request) {
  const host = request.headers.get("host") ?? "";
  const origin = request.headers.get("origin");
  return /^(localhost|127\.0\.0\.1)(:\d{1,5})?$/.test(host) &&
    (origin === `http://${host}` || (request.method === "GET" && origin === null)) &&
    request.headers.get("sec-fetch-site") !== "cross-site";
}
