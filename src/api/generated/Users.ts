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
  UpdateProfileReqDto,
  UserControllerDetailData,
  UserControllerUpdateProfileData,
  UserControllerWithdrawData,
} from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class Users<SecurityDataType = unknown> {
  http: HttpClient<SecurityDataType>;

  constructor(http: HttpClient<SecurityDataType>) {
    this.http = http;
  }

  /**
   * @description 로그인한 사용자의 상세 정보를 조회합니다.
   *
   * @tags Users
   * @name UserControllerDetail
   * @summary 내 정보 조회
   * @request GET:/users/me
   * @secure
   * @response `200` `UserControllerDetailData` 사용자 상세 조회 성공
   * @response `404` `void` 사용자를 찾을 수 없음
   */
  userControllerDetail = (params: RequestParams = {}) =>
    this.http.request<UserControllerDetailData, void>({
      path: `/users/me`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * @description 로그인한 사용자의 프로필을 수정합니다.
   *
   * @tags Users
   * @name UserControllerUpdateProfile
   * @summary 내 정보 수정
   * @request PUT:/users/me
   * @secure
   * @response `200` `UserControllerUpdateProfileData` 사용자 정보 수정 성공
   * @response `400` `void` 이메일로 가입한 계정은 이메일 변경 불가
   * @response `404` `void` 사용자를 찾을 수 없음
   */
  userControllerUpdateProfile = (
    data: UpdateProfileReqDto,
    params: RequestParams = {},
  ) =>
    this.http.request<UserControllerUpdateProfileData, void>({
      path: `/users/me`,
      method: "PUT",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description 로그인한 사용자를 탈퇴 처리합니다.
   *
   * @tags Users
   * @name UserControllerWithdraw
   * @summary 회원 탈퇴
   * @request DELETE:/users/me
   * @secure
   * @response `200` `UserControllerWithdrawData` 사용자 탈퇴 성공
   * @response `404` `void` 사용자를 찾을 수 없음
   */
  userControllerWithdraw = (params: RequestParams = {}) =>
    this.http.request<UserControllerWithdrawData, void>({
      path: `/users/me`,
      method: "DELETE",
      secure: true,
      ...params,
    });
}
