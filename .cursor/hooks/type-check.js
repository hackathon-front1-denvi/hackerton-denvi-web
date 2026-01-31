#!/usr/bin/env node

/**
 * Cursor hook script for type checking after file edit
 * Reads JSON input from stdin and runs type check
 */

const { execSync } = require('child_process')
const path = require('path')

try {
  // Read JSON input from stdin
  let input = ''
  process.stdin.setEncoding('utf8')

  process.stdin.on('data', chunk => {
    input += chunk
  })

  process.stdin.on('end', () => {
    try {
      // Get the project root (parent of .cursor directory)
      const projectRoot = path.resolve(__dirname, '../..')

      // Change to project root
      process.chdir(projectRoot)

      // Run type check (non-blocking, errors are ignored)
      try {
        execSync('yarn type-check', {
          stdio: 'ignore',
          cwd: projectRoot,
          timeout: 30000, // 30초 타임아웃
        })
      } catch (error) {
        // 타입 에러가 있어도 hook은 성공으로 처리
        // 실제 에러는 터미널에서 확인 가능
      }
    } catch (error) {
      // Ignore all errors
    }

    process.exit(0)
  })
} catch (error) {
  // Ignore all errors and exit successfully
  process.exit(0)
}
