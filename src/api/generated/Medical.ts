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
  MedicalControllerCreateDescriptionData,
  MedicalControllerGenerateImageData,
  MedicalDescriptionRequestDto,
  MedicalGenerateImageRequestDto,
} from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class Medical<SecurityDataType = unknown> {
  http: HttpClient<SecurityDataType>;

  constructor(http: HttpClient<SecurityDataType>) {
    this.http = http;
  }

  /**
   * No description
   *
   * @tags Medical
   * @name MedicalControllerCreateDescription
   * @summary 진료 설명 생성
   * @request POST:/medical/description
   * @response `200` `MedicalControllerCreateDescriptionData` 진료 설명 결과
   */
  medicalControllerCreateDescription = (
    data: MedicalDescriptionRequestDto,
    params: RequestParams = {},
  ) =>
    this.http.request<MedicalControllerCreateDescriptionData, any>({
      path: `/medical/description`,
      method: "POST",
      body: data,
      type: ContentType.FormData,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Medical
   * @name MedicalControllerGenerateImage
   * @summary 이미지 생성
   * @request POST:/medical/generate-image
   * @response `200` `MedicalControllerGenerateImageData` 이미지 생성 결과
   */
  medicalControllerGenerateImage = (
    data: MedicalGenerateImageRequestDto,
    params: RequestParams = {},
  ) =>
    this.http.request<MedicalControllerGenerateImageData, any>({
      path: `/medical/generate-image`,
      method: "POST",
      body: data,
      type: ContentType.FormData,
      format: "json",
      ...params,
    });
}
