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
  KakaoAuthControllerKakaoCallbackParams,
  KakaoAuthControllerKakaoLoginData,
  KakaoAuthControllerKakaoLoginParams,
} from "./data-contracts";
import { HttpClient, RequestParams } from "./http-client";

export class AuthKakao<SecurityDataType = unknown> {
  http: HttpClient<SecurityDataType>;

  constructor(http: HttpClient<SecurityDataType>) {
    this.http = http;
  }

  /**
   * @description 카카오 OAuth 인증 후 콜백을 처리합니다.
   *
   * @tags Auth - Kakao
   * @name KakaoAuthControllerKakaoCallback
   * @summary 카카오 OAuth 콜백
   * @request GET:/auth/kakao/callback
   * @response `200` `KakaoAuthControllerKakaoCallbackData`
   */
  kakaoAuthControllerKakaoCallback = (
    query: KakaoAuthControllerKakaoCallbackParams,
    params: RequestParams = {},
  ) =>
    this.http.request<KakaoAuthControllerKakaoCallbackData, any>({
      path: `/auth/kakao/callback`,
      method: "GET",
      query: query,
      ...params,
    });
  /**
   * @description 카카오 OAuth 인가 URL로 리다이렉트합니다.
   *
   * @tags Auth - Kakao
   * @name KakaoAuthControllerKakaoLogin
   * @summary 카카오 OAuth 인가 시작
   * @request GET:/auth/kakao
   * @response `200` `KakaoAuthControllerKakaoLoginData`
   */
  kakaoAuthControllerKakaoLogin = (
    query: KakaoAuthControllerKakaoLoginParams,
    params: RequestParams = {},
  ) =>
    this.http.request<KakaoAuthControllerKakaoLoginData, any>({
      path: `/auth/kakao`,
      method: "GET",
      query: query,
      ...params,
    });
}
