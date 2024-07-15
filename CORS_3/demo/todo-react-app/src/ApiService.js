import { API_BASE_URL } from "./api-config";


/**
 * API 호출을 위한 유틸리티 함수.
 * @param {string} api - 호출할 API의 엔드포인트 경로
 * @param {string} method - HTTP 메서드 (GET, POST, PUT, DELETE 등)
 * @param {object} request - HTTP 요청 시 전송할 데이터 (POST 요청일 때 사용)
 * @returns {Promise} - API 호출 결과를 처리하는 Promise 객체
 */

export function call(api, method, request) {
  let options = {
    headers: new Headers({
      "Content-Type": "application/json", //JSON 형식의 데이터를 전송
    }),
    url: API_BASE_URL + api, // API 호출할 주소
    method: method, // HTTP 메서드 설정
  };
  if (request) {
     // 만약 request 객체가 존재하면 (POST 요청일 경우)
    options.body = JSON.stringify(request); // 요청 데이터를 JSON 문자열로 변환하여 body에 설정
  }

   // fetch를 사용하여 API 호출 후, 응답을 JSON 형식으로 파싱하여 처리
  return fetch(options.url, options).then((response) =>
    response.json().then((json) => {
      if (!response.ok) {
        // response.ok가 true이면 정상적인 응답을 받은것, 아니면 에러 응답을 받은것.
        return Promise.reject(json);
      }
      return json; // HTTP 응답이 성공한 경우, JSON 데이터 반환
    })
  );
}