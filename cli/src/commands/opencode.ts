import chalk from 'chalk'
import { authAndSetupMachineIfNeeded } from '@/ui/auth'
import { initializeToken } from '@/ui/tokenInit'
import { maybeAutoStartServer } from '@/utils/autoStartServer'
import type { CommandDefinition } from './types'

export const opencodeCommand: CommandDefinition = {
    name: 'opencode',
    requiresRuntimeAssets: true,
    run: async ({ commandArgs }) => {
        try {
            let startedBy: 'daemon' | 'terminal' | undefined
            let yolo = false

            for (let i = 0; i < commandArgs.length; i++) {
                if (commandArgs[i] === '--started-by') {
                    startedBy = commandArgs[++i] as 'daemon' | 'terminal'
                } else if (commandArgs[i] === '--yolo') {
                    yolo = true
                }
            }

            const { registerOpencodeAgent } = await import('@/agent/runners/opencode')
            const { runAgentSession } = await import('@/agent/runners/runAgentSession')
            registerOpencodeAgent(yolo)

            await initializeToken()
            await maybeAutoStartServer()
            await authAndSetupMachineIfNeeded()
            await runAgentSession({ agentType: 'opencode', startedBy })
        } catch (error) {
            console.error(chalk.red('Error:'), error instanceof Error ? error.message : 'Unknown error')
            if (process.env.DEBUG) {
                console.error(error)
            }
            process.exit(1)
        }
    }
}
