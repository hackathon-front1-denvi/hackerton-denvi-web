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
  XrayControllerInferData,
  XrayControllerInferPayload,
} from "./data-contracts";

export namespace Xray {
  /**
   * No description
   * @tags Xray
   * @name XrayControllerInfer
   * @summary 치아 엑스레이 추론
   * @request POST:/xray/infer
   * @response `200` `XrayControllerInferData` 추론 결과
   */
  export namespace XrayControllerInfer {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = XrayControllerInferPayload;
    export type RequestHeaders = {};
    export type ResponseBody = XrayControllerInferData;
  }
}
