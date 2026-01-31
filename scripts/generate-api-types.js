#!/usr/bin/env node

// .env 파일 로드
require('dotenv').config()

const { generateApi } = require('swagger-typescript-api')
const path = require('path')
const fs = require('fs')

const API_DOCS_URL = process.env.API_DOCS_URL
const OUTPUT_DIR = path.resolve(process.cwd(), 'src/api/generated')

console.log('🚀 Generating API types from Swagger...')
console.log(`📡 Fetching from: ${API_DOCS_URL}`)
console.log(`📁 Output directory: ${OUTPUT_DIR}`)

// Output 디렉토리 생성
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true })
  console.log('✅ Created output directory')
}

generateApi({
  name: 'Api.ts',
  url: API_DOCS_URL,
  output: OUTPUT_DIR,
  httpClientType: 'axios',

  // 모듈 형태로 생성 (태그별 파일 분리)
  modular: true,

  generateClient: true,
  generateRouteTypes: true,
  generateResponses: true,
  toJS: false,
  extractRequestParams: true,
  extractRequestBody: true,
  extractEnums: true,
  extractResponseBody: true,
  extractResponseError: true,
  unwrapResponseData: false,
  singleHttpClient: true,
  cleanOutput: true,
  enumNamesAsValues: true,
  moduleNameFirstTag: true,
  generateUnionEnums: true,
  sortTypes: true,
  sortRoutes: true,

  hooks: {
    onFormatRouteName: (routeInfo, templateRouteName) => {
      return templateRouteName
    },
  },

  prettier: {
    printWidth: 120,
    tabWidth: 2,
    trailingComma: 'all',
    semi: false,
    singleQuote: true,
  },

  defaultResponseAsSuccess: false,
})
  .then(({ files }) => {
    console.log('✅ API types generated successfully!')
    console.log(`📄 Generated ${files.length} file(s)`)
    files.forEach((file) => {
      console.log(`   - ${file.fileName}`)
    })
    console.log('\n📦 Modular structure generated:')
    console.log('   - data-contracts.ts  (모든 DTO/타입 정의)')
    console.log('   - http-client.ts     (HTTP 클라이언트)')
    console.log('   - [Tag].ts           (태그별 API 클래스)')
    console.log('\n💡 Import example:')
    console.log('   import { Api } from "@/api/generated/Api"')
    console.log('   import { CreateOrderDto } from "@/api/generated/data-contracts"')
  })
  .catch((error) => {
    console.error('❌ Error generating API types:', error)
    process.exit(1)
  })
