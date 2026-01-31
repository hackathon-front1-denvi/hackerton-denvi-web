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

export namespace Users {
  /**
   * @description 로그인한 사용자의 상세 정보를 조회합니다.
   * @tags Users
   * @name UserControllerDetail
   * @summary 내 정보 조회
   * @request GET:/users/me
   * @secure
   * @response `200` `UserControllerDetailData` 사용자 상세 조회 성공
   * @response `404` `void` 사용자를 찾을 수 없음
   */
  export namespace UserControllerDetail {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = UserControllerDetailData;
  }

  /**
   * @description 로그인한 사용자의 프로필을 수정합니다.
   * @tags Users
   * @name UserControllerUpdateProfile
   * @summary 내 정보 수정
   * @request PUT:/users/me
   * @secure
   * @response `200` `UserControllerUpdateProfileData` 사용자 정보 수정 성공
   * @response `400` `void` 이메일로 가입한 계정은 이메일 변경 불가
   * @response `404` `void` 사용자를 찾을 수 없음
   */
  export namespace UserControllerUpdateProfile {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = UpdateProfileReqDto;
    export type RequestHeaders = {};
    export type ResponseBody = UserControllerUpdateProfileData;
  }

  /**
   * @description 로그인한 사용자를 탈퇴 처리합니다.
   * @tags Users
   * @name UserControllerWithdraw
   * @summary 회원 탈퇴
   * @request DELETE:/users/me
   * @secure
   * @response `200` `UserControllerWithdrawData` 사용자 탈퇴 성공
   * @response `404` `void` 사용자를 찾을 수 없음
   */
  export namespace UserControllerWithdraw {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = UserControllerWithdrawData;
  }
}
