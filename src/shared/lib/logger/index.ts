type LogPayload = Record<string, string | number | boolean | undefined | null | unknown>

class Logger {
  private readonly environment: string

  constructor(environment: string) {
    this.environment = environment
  }

  debug(message: LogPayload) {
    this.emit('debug', message)
  }

  info(message: LogPayload) {
    this.emit('info', message)
  }

  warn(message: LogPayload) {
    this.emit('warn', message)
  }

  error(message: LogPayload) {
    this.emit('error', message)
  }

  private emit(level: 'debug' | 'info' | 'warn' | 'error', message: LogPayload) {
    const text = `${JSON.stringify({ ...message, level, env: this.environment })}\n`
    if (this.environment === 'local') {
      if (level === 'error') console.error(text)
      else console.log(text)
    } else {
      if (level === 'error') {
        process.stderr.write(text)
      } else {
        process.stdout.write(text)
      }
    }
  }
}

import { env } from '@/shared/lib/env'

let loggerInstance: Logger | null = null
export function getLogger(): Logger {
  loggerInstance ??= new Logger(env.app.env)
  return loggerInstance
}

export type { Logger }
