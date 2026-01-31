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
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class Xray<SecurityDataType = unknown> {
  http: HttpClient<SecurityDataType>;

  constructor(http: HttpClient<SecurityDataType>) {
    this.http = http;
  }

  /**
   * No description
   *
   * @tags Xray
   * @name XrayControllerInfer
   * @summary 치아 엑스레이 추론
   * @request POST:/xray/infer
   * @response `200` `XrayControllerInferData` 추론 결과
   */
  xrayControllerInfer = (
    data: XrayControllerInferPayload,
    params: RequestParams = {},
  ) =>
    this.http.request<XrayControllerInferData, any>({
      path: `/xray/infer`,
      method: "POST",
      body: data,
      type: ContentType.FormData,
      format: "json",
      ...params,
    });
}
