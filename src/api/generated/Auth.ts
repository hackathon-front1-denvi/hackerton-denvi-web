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
  AuthControllerEmailLoginData,
  AuthControllerEmailRegisterData,
  AuthControllerForgotPasswordData,
  AuthControllerRefreshData,
  AuthControllerResendEmailVerificationData,
  AuthControllerResetPasswordData,
  AuthControllerVerifyEmailData,
  AuthEmailLoginReqDto,
  AuthEmailRegisterReqDto,
  AuthEmailVerifyReqDto,
  AuthForgotPasswordReqDto,
  AuthRefreshReqDto,
  AuthResendEmailVerifyReqDto,
  AuthResetPasswordReqDto,
} from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class Auth<SecurityDataType = unknown> {
  http: HttpClient<SecurityDataType>;

  constructor(http: HttpClient<SecurityDataType>) {
    this.http = http;
  }

  /**
   * @description 이메일과 비밀번호로 로그인합니다.
   *
   * @tags Auth
   * @name AuthControllerEmailLogin
   * @summary 이메일 로그인
   * @request POST:/auth/login/email
   * @response `200` `AuthControllerEmailLoginData` 로그인 성공
   * @response `401` `void` 인증 실패
   */
  authControllerEmailLogin = (
    data: AuthEmailLoginReqDto,
    params: RequestParams = {},
  ) =>
    this.http.request<AuthControllerEmailLoginData, void>({
      path: `/auth/login/email`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description 이메일과 비밀번호로 회원가입합니다.
   *
   * @tags Auth
   * @name AuthControllerEmailRegister
   * @summary 이메일 회원가입
   * @request POST:/auth/register/email
   * @response `201` `AuthControllerEmailRegisterData` 회원가입 성공
   * @response `400` `void` 잘못된 요청
   */
  authControllerEmailRegister = (
    data: AuthEmailRegisterReqDto,
    params: RequestParams = {},
  ) =>
    this.http.request<AuthControllerEmailRegisterData, void>({
      path: `/auth/register/email`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description 이메일로 비밀번호 재설정 링크를 전송합니다.
   *
   * @tags Auth
   * @name AuthControllerForgotPassword
   * @summary 비밀번호 찾기
   * @request POST:/auth/forgot-password
   * @response `200` `AuthControllerForgotPasswordData` 비밀번호 재설정 링크 전송 성공
   * @response `404` `void` 사용자를 찾을 수 없음
   */
  authControllerForgotPassword = (
    data: AuthForgotPasswordReqDto,
    params: RequestParams = {},
  ) =>
    this.http.request<AuthControllerForgotPasswordData, void>({
      path: `/auth/forgot-password`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description 리프레시 토큰으로 액세스 토큰을 갱신합니다.
   *
   * @tags Auth
   * @name AuthControllerRefresh
   * @summary 토큰 갱신
   * @request POST:/auth/refresh
   * @response `200` `AuthControllerRefreshData` 토큰 갱신 성공
   * @response `401` `void` 토큰 만료 또는 잘못된 토큰
   */
  authControllerRefresh = (
    data: AuthRefreshReqDto,
    params: RequestParams = {},
  ) =>
    this.http.request<AuthControllerRefreshData, void>({
      path: `/auth/refresh`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description 이메일 인증 링크를 다시 전송합니다.
   *
   * @tags Auth
   * @name AuthControllerResendEmailVerification
   * @summary 이메일 인증 재발송
   * @request POST:/auth/resend-email-verification
   * @response `200` `AuthControllerResendEmailVerificationData` 인증 링크 재전송 성공
   * @response `404` `void` 사용자를 찾을 수 없음
   */
  authControllerResendEmailVerification = (
    data: AuthResendEmailVerifyReqDto,
    params: RequestParams = {},
  ) =>
    this.http.request<AuthControllerResendEmailVerificationData, void>({
      path: `/auth/resend-email-verification`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description 토큰을 사용하여 비밀번호를 재설정합니다.
   *
   * @tags Auth
   * @name AuthControllerResetPassword
   * @summary 비밀번호 재설정
   * @request POST:/auth/reset-password
   * @response `200` `AuthControllerResetPasswordData` 비밀번호 재설정 성공
   * @response `400` `void` 잘못된 토큰 또는 요청
   */
  authControllerResetPassword = (
    data: AuthResetPasswordReqDto,
    params: RequestParams = {},
  ) =>
    this.http.request<AuthControllerResetPasswordData, void>({
      path: `/auth/reset-password`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description 이메일 인증 토큰으로 계정을 인증합니다.
   *
   * @tags Auth
   * @name AuthControllerVerifyEmail
   * @summary 이메일 인증
   * @request POST:/auth/verify-email
   * @response `200` `AuthControllerVerifyEmailData` 이메일 인증 성공
   * @response `400` `void` 잘못된 토큰
   */
  authControllerVerifyEmail = (
    data: AuthEmailVerifyReqDto,
    params: RequestParams = {},
  ) =>
    this.http.request<AuthControllerVerifyEmailData, void>({
      path: `/auth/verify-email`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      ...params,
    });
}
