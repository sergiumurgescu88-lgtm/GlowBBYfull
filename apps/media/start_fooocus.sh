#!/bin/bash
cd /var/www/media.glowbby.online/Fooocus
source venv/bin/activate
# --listen permite accesul din exterior, --port specifică portul
python entry_with_update.py --listen --port 7865
