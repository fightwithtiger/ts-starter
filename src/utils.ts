import { exec } from 'child_process'
import type { ExecException } from 'child_process'

export function commonExec(commander: string, callback?: (err: ExecException, result: string) => void) {
  exec(commander, callback as (error: ExecException | null, stdout: string, stderr: string) => void)
}

export function commonHandleCallback(resolve: (value: any) => void, reject: (reason: any) => void) {
  return (err: ExecException, result: string) => {
    if (err)
      reject(new Error(result))
    else
      resolve(true)
  }
}
