#!/usr/bin/env python3
"""Use the installed read-only Sentry reader with Showpass's existing settings."""

import os
from pathlib import Path
import runpy
import shlex
import sys


def main():
    args = sys.argv[1:]
    if any(arg.split('=', 1)[0] in {'--no-redact', '--base-url'} for arg in args):
        raise ValueError('Redaction and the Sentry API host cannot be overridden.')

    settings = Path.home() / '.config/showpass/sentry.env'
    allowed = {'SENTRY_AUTH_TOKEN', 'SENTRY_ORG', 'SENTRY_PROJECT', 'SSL_CERT_FILE'}
    if settings.is_file():
        for line in settings.read_text().splitlines():
            line = line.strip()
            if line.startswith('export '):
                line = line[7:].lstrip()
            key, separator, value = line.partition('=')
            key = key.strip()
            if not separator or key not in allowed or os.environ.get(key):
                continue
            parts = shlex.split(value, comments=True)
            if len(parts) != 1 or any(char in parts[0] for char in ('$', '`', '\n', '\r')):
                raise ValueError(f'{key} must have a literal value in the local Sentry settings.')
            os.environ[key] = parts[0]

    if not os.environ.get('SENTRY_AUTH_TOKEN'):
        raise ValueError('No API credential is available in the environment or ~/.config/showpass/sentry.env. Do not paste a token into chat.')
    os.environ['SENTRY_BASE_URL'] = 'https://sentry.io'
    os.environ.setdefault('SENTRY_ORG', 'showpass')
    if not os.environ.get('SSL_CERT_FILE') and Path('/etc/ssl/cert.pem').is_file():
        os.environ['SSL_CERT_FILE'] = '/etc/ssl/cert.pem'

    codex_dir = Path(os.environ.get('CODEX_HOME') or Path.home() / '.codex')
    readers = list((codex_dir / 'plugins/cache/openai-curated-remote/sentry').glob('*/skills/sentry/scripts/sentry_api.py'))
    if not readers:
        raise ValueError('The installed Sentry plugin API reader was not found. Check current plugin availability; do not fall back to a desktop app.')
    reader = max(readers, key=lambda path: path.stat().st_mtime)
    sys.argv = [str(reader), *args]
    runpy.run_path(str(reader), run_name='__main__')


if __name__ == '__main__':
    try:
        main()
    except (OSError, ValueError) as error:
        print(f'Error: {error}', file=sys.stderr)
        sys.exit(1)
