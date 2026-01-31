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

export type AppControllerHealthData = string;

export interface AuthControllerEmailLoginData {
  /** @example "jwt_access_token" */
  accessToken?: string;
  /** @example "홍길동" */
  name?: string;
  /** @example ["USER_READ"] */
  permissions?: string[];
  /** @example "jwt_refresh_token" */
  refreshToken?: string;
}

export type AuthControllerEmailRegisterData = any;

export type AuthControllerForgotPasswordData = any;

export interface AuthControllerRefreshData {
  /** @example "jwt_access_token" */
  accessToken?: string;
  /** @example "홍길동" */
  name?: string;
  /** @example ["USER_READ"] */
  permissions?: string[];
  /** @example "jwt_refresh_token" */
  refreshToken?: string;
}

export type AuthControllerResendEmailVerificationData = any;

export type AuthControllerResetPasswordData = any;

export type AuthControllerVerifyEmailData = any;

export interface AuthEmailLoginReqDto {
  /**
   * 이메일 주소
   * @example "user@example.com"
   */
  email: string;
  /**
   * 비밀번호
   * @example "password123"
   */
  password: string;
}

export interface AuthEmailRegisterReqDto {
  /**
   * 생일 (YYYY-MM-DD 형식)
   * @example "1990-01-15"
   */
  birthday?: string;
  /**
   * 이메일 주소
   * @example "user@example.com"
   */
  email: string;
  /**
   * 성별
   * @example "M"
   */
  gender?: AuthEmailRegisterReqDtoGenderEnum;
  /**
   * 이름
   * @example "홍길동"
   */
  name?: string;
  /**
   * 닉네임
   * @example "nickname"
   */
  nickname: string;
  /**
   * 비밀번호 (최소 8자)
   * @minLength 8
   * @example "password123"
   */
  password: string;
  /**
   * 전화번호
   * @example "phone"
   */
  phone: string;
  /**
   * 레퍼럴 코드 (친구 추천 코드)
   * @example "ABC12"
   */
  referredByCode?: string;
}

/**
 * 성별
 * @example "M"
 */
export type AuthEmailRegisterReqDtoGenderEnum = "M" | "F";

export interface AuthEmailVerifyReqDto {
  /**
   * 이메일 인증 토큰
   * @example "verification_token_string"
   */
  token: string;
}

export interface AuthForgotPasswordReqDto {
  /**
   * 이메일 주소
   * @example "user@example.com"
   */
  email: string;
}

export interface AuthRefreshReqDto {
  /**
   * 리프레시 토큰
   * @example "refresh_token_string"
   */
  refreshToken: string;
}

export interface AuthResendEmailVerifyReqDto {
  /**
   * 이메일 주소
   * @example "user@example.com"
   */
  email: string;
}

export interface AuthResetPasswordReqDto {
  /**
   * 새 비밀번호 (최소 8자)
   * @minLength 8
   * @example "newpassword123"
   */
  newPassword: string;
  /**
   * 비밀번호 재설정 토큰
   * @example "reset_token_string"
   */
  token: string;
}

export type KakaoAuthControllerKakaoCallbackData = any;

export interface KakaoAuthControllerKakaoCallbackParams {
  /** 인가 코드 */
  code?: string;
  /** 에러 코드 */
  error?: string;
  /** 에러 설명 */
  error_description?: string;
  /** 상태 값 */
  state?: string;
}

export type KakaoAuthControllerKakaoLoginData = any;

export interface KakaoAuthControllerKakaoLoginParams {
  /** 레퍼럴 코드 (친구 추천 코드) */
  referredByCode?: string;
  /** 상태 값 (CSRF 방지용) */
  state?: string;
}

export type MedicalControllerCreateDescriptionData =
  MedicalDescriptionResponseDto;

export type MedicalControllerGenerateImageData =
  MedicalGenerateImageResponseDto;

export interface MedicalDescriptionRequestDto {
  /**
   * annotation 텍스트
   * @example "좌측 하악 사랑니 매복 의심"
   */
  annotationText?: string;
  /**
   * 진료 이미지 파일
   * @format binary
   */
  file?: File;
  /**
   * 옵션(진료 항목) - JSON 배열 문자열 또는 콤마 구분 문자열
   * @example "["사랑니","잇몸치료"]"
   */
  options?: string;
  /**
   * 시나리오 세부정보 (예: 인접치 충치)
   * @example "인접치 충치"
   */
  scenarioDetail?: string;
  /**
   * 시나리오 타입 (예: 사랑니, 임플란트, 잇몸치료, 충치치료)
   * @example "사랑니"
   */
  scenarioType?: string;
}

export interface MedicalDescriptionResponseDto {
  /**
   * 실제사례(마크다운)
   * @example "### 사례
   * ...
   * ![](image-url)"
   */
  caseStudy?: string;
  /**
   * 설명
   * @example "현재 사랑니가 매복되어..."
   */
  desc?: string;
  /**
   * 제목
   * @example "사랑니 매복과 잇몸 상태 안내"
   */
  title?: string;
}

export interface MedicalGenerateImageRequestDto {
  /**
   * 이미지 파일
   * @format binary
   */
  file?: File;
  /**
   * 시나리오 세부정보 (예: 인접치 충치)
   * @example "인접치 충치"
   */
  scenarioDetail?: string;
  /**
   * 시나리오 타입 (예: 사랑니, 임플란트, 잇몸치료, 충치치료)
   * @example "사랑니"
   */
  scenarioType?: string;
}

export interface MedicalGenerateImageResponseDto {
  /**
   * 이미지 Base64(선택)
   * @example "data:image/png;base64,iVBORw0KGgoAAAANSUhEUg..."
   */
  imageBase64?: string;
  /**
   * 생성 이미지(단일 URL 또는 식별자)
   * @example "https://cdn.example.com/images/generated-1.png"
   */
  image?: string;
  /**
   * 생성 이미지 URL
   * @example "https://cdn.example.com/images/generated-1.png"
   */
  imageUrl?: string;
  /**
   * 생성 이미지 URL 목록
   * @example ["https://cdn.example.com/images/generated-1.png"]
   */
  images?: string[];
  /**
   * 사용된 프롬프트(선택)
   * @example "Dental panoramic X-ray style..."
   */
  prompt?: string;
  /**
   * n8n 원본 응답(선택)
   * @example {"imageUrl":"https://cdn.example.com/images/generated-1.png"}
   */
  result?: Record<string, any>;
}

export interface UpdateProfileReqDto {
  /**
   * 이메일
   * @example "example@email.com"
   */
  email?: string;
  /**
   * 이름 (1-50자)
   * @minLength 1
   * @maxLength 50
   * @example "홍길동"
   */
  name?: string;
  /**
   * 닉네임 (2-20자)
   * @minLength 2
   * @maxLength 20
   * @example "new_nickname"
   */
  nickname: string;
  /**
   * 연락처 (숫자만, 10-11자)
   * @example "01012345678"
   */
  phone?: string;
}

export type UserControllerDetailData = any;

export type UserControllerUpdateProfileData = any;

export type UserControllerWithdrawData = any;

export interface XrayControllerInferData {
  image?: {
    /** @example 1024 */
    height?: number;
    /** @example 1024 */
    width?: number;
  };
  predictions?: {
    /** @example "impacted_tooth" */
    class?: string;
    /** @example 0.91 */
    confidence?: number;
    points?: {
      /** @example 412 */
      x?: number;
      /** @example 355 */
      y?: number;
    }[];
  }[];
}

export interface XrayControllerInferPayload {
  /**
   * 최소 confidence (0-1)
   * @example 0.25
   */
  confidence?: number;
  /**
   * 엑스레이 이미지 파일
   * @format binary
   */
  file?: File;
  /**
   * 라벨 포함 여부
   * @example true
   */
  include_labels?: boolean;
  /**
   * NMS IoU 중복 임계값 (0-1)
   * @example 0.5
   */
  iou_threshold?: number;
  /**
   * 최대 detection 수
   * @example 100
   */
  max_detections?: number;
  /**
   * NMS IoU 중복 임계값 (0-1)
   * @example 0.5
   */
  overlap?: number;
  /**
   * 최소 confidence (0-1)
   * @example 0.25
   */
  threshold?: number;
}
