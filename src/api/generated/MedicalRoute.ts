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

export namespace Medical {
  /**
   * No description
   * @tags Medical
   * @name MedicalControllerCreateDescription
   * @summary 진료 설명 생성
   * @request POST:/medical/description
   * @response `200` `MedicalControllerCreateDescriptionData` 진료 설명 결과
   */
  export namespace MedicalControllerCreateDescription {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = MedicalDescriptionRequestDto;
    export type RequestHeaders = {};
    export type ResponseBody = MedicalControllerCreateDescriptionData;
  }

  /**
   * No description
   * @tags Medical
   * @name MedicalControllerGenerateImage
   * @summary 이미지 생성
   * @request POST:/medical/generate-image
   * @response `200` `MedicalControllerGenerateImageData` 이미지 생성 결과
   */
  export namespace MedicalControllerGenerateImage {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = MedicalGenerateImageRequestDto;
    export type RequestHeaders = {};
    export type ResponseBody = MedicalControllerGenerateImageData;
  }
}
