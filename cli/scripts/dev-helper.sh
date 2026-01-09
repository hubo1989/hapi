#!/bin/bash

# HAPI CLI 开发辅助脚本
# 用于快速测试本地开发版本

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
CLI_DIR="$(dirname "$SCRIPT_DIR")"

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  HAPI CLI 开发版本"
echo "  路径: $CLI_DIR"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# 运行开发版本
cd "$CLI_DIR" && bun src/index.ts "$@"
