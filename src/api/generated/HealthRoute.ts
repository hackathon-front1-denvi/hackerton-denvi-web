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

import { AppControllerHealthData } from "./data-contracts";

export namespace Health {
  /**
   * @description 서버 상태를 확인합니다.
   * @tags Health
   * @name AppControllerHealth
   * @summary 헬스체크
   * @request GET:/health
   * @response `200` `AppControllerHealthData` 서버가 정상 작동 중입니다.
   */
  export namespace AppControllerHealth {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = AppControllerHealthData;
  }
}
