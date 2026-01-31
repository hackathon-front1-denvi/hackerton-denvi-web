/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

import {
  KakaoAuthControllerKakaoCallbackData,
  KakaoAuthControllerKakaoLoginData,
} from "./data-contracts";

export namespace AuthKakao {
  /**
   * @description 카카오 OAuth 인증 후 콜백을 처리합니다.
   * @tags Auth - Kakao
   * @name KakaoAuthControllerKakaoCallback
   * @summary 카카오 OAuth 콜백
   * @request GET:/auth/kakao/callback
   * @response `200` `KakaoAuthControllerKakaoCallbackData`
   */
  export namespace KakaoAuthControllerKakaoCallback {
    export type RequestParams = {};
    export type RequestQuery = {
      /** 인가 코드 */
      code?: string;
      /** 에러 코드 */
      error?: string;
      /** 에러 설명 */
      error_description?: string;
      /** 상태 값 */
      state?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = KakaoAuthControllerKakaoCallbackData;
  }

  /**
   * @description 카카오 OAuth 인가 URL로 리다이렉트합니다.
   * @tags Auth - Kakao
   * @name KakaoAuthControllerKakaoLogin
   * @summary 카카오 OAuth 인가 시작
   * @request GET:/auth/kakao
   * @response `200` `KakaoAuthControllerKakaoLoginData`
   */
  export namespace KakaoAuthControllerKakaoLogin {
    export type RequestParams = {};
    export type RequestQuery = {
      /** 레퍼럴 코드 (친구 추천 코드) */
      referredByCode?: string;
      /** 상태 값 (CSRF 방지용) */
      state?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = KakaoAuthControllerKakaoLoginData;
  }
}
