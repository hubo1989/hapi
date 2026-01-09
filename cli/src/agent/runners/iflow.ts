import { AgentRegistry } from '@/agent/AgentRegistry';
import { AcpSdkBackend } from '@/agent/backends/acp';

function buildEnv(): Record<string, string> {
    return Object.keys(process.env).reduce((acc, key) => {
        const value = process.env[key];
        if (typeof value === 'string') {
            acc[key] = value;
        }
        return acc;
    }, {} as Record<string, string>);
}

export function registerIflowAgent(yolo: boolean): void {
    const args = ['--experimental-acp'];
    if (yolo) args.push('--yolo');

    AgentRegistry.register('iflow', () => new AcpSdkBackend({
        command: 'iflow',
        args,
        env: buildEnv()
    }));
}
