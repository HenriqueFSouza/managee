#!/bin/bash

# Verifique se houve mudanças na pasta mf-admin
if git diff --quiet HEAD^ HEAD ./mf-admin; then
  echo "🛑 - Build ignorado, sem mudanças no mf-admin"
  exit 0
else
  echo "✅ - Mudanças detectadas no mf-admin, build necessário"
  exit 1
fi
