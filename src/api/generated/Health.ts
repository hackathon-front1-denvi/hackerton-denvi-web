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
import { HttpClient, RequestParams } from "./http-client";

export class Health<SecurityDataType = unknown> {
  http: HttpClient<SecurityDataType>;

  constructor(http: HttpClient<SecurityDataType>) {
    this.http = http;
  }

  /**
   * @description 서버 상태를 확인합니다.
   *
   * @tags Health
   * @name AppControllerHealth
   * @summary 헬스체크
   * @request GET:/health
   * @response `200` `AppControllerHealthData` 서버가 정상 작동 중입니다.
   */
  appControllerHealth = (params: RequestParams = {}) =>
    this.http.request<AppControllerHealthData, any>({
      path: `/health`,
      method: "GET",
      format: "json",
      ...params,
    });
}
