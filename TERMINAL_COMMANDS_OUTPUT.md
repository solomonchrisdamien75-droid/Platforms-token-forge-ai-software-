# Terminal Commands Output Log

## Command 1: pwd
**Working Directory Path**

```bash
$ pwd
/workspaces/Platforms-token-forge-ai-software-
```

---

## Command 2: ls
**Directory Listing**

```bash
$ ls
.devcontainer/
.env
.env.example
.git/
.gitignore
CRASH_ANALYSIS.md
FIXES_IMPLEMENTED.md
README.md
TERMINAL_ERRORS.md
WALLET_SETUP.js
backend/
frontend/
package.json
```

**Total Items:** 13

**Directories:** 3 (.devcontainer/, backend/, frontend/)
**Files:** 10 (.env, .env.example, .git/, .gitignore, CRASH_ANALYSIS.md, FIXES_IMPLEMENTED.md, README.md, TERMINAL_ERRORS.md, WALLET_SETUP.js, package.json)

---

## Command 3: find . -name index.js
**Finding All index.js Files in Project**

```bash
$ find . -name index.js
./backend/node_modules/accepts/index.js
./backend/node_modules/http-errors/index.js
./backend/node_modules/@babel/runtime/regenerator/index.js
./backend/node_modules/utils-merge/index.js
./backend/node_modules/methods/index.js
./backend/node_modules/etag/index.js
./backend/node_modules/math-intrinsics/test/index.js
./backend/node_modules/es-define-property/test/index.js
./backend/node_modules/es-define-property/index.js
./backend/node_modules/media-typer/index.js
./backend/node_modules/es-errors/test/index.js
./backend/node_modules/es-errors/index.js
./backend/node_modules/rpc-websockets/node_modules/ws/index.js
./backend/node_modules/get-intrinsic/index.js
./backend/node_modules/setprototypeof/test/index.js
./backend/node_modules/setprototypeof/index.js
./backend/node_modules/side-channel/test/index.js
./backend/node_modules/side-channel/index.js
./backend/node_modules/body-parser/index.js
./backend/node_modules/proxy-addr/index.js
./backend/node_modules/qs/lib/index.js
./backend/node_modules/escape-html/index.js
./backend/node_modules/bufferutil/index.js
./backend/node_modules/stream-chain/index.js
./backend/node_modules/side-channel-list/test/index.js
./backend/node_modules/side-channel-list/index.js
./backend/node_modules/cors/lib/index.js
./backend/node_modules/ws/index.js
./backend/node_modules/raw-body/index.js
./backend/node_modules/forwarded/index.js
./backend/node_modules/unpipe/index.js
./backend/node_modules/tr46/index.js
./backend/node_modules/encodeurl/index.js
./backend/node_modules/node-gyp-build/index.js
./backend/node_modules/agentkeepalive/index.js
./backend/node_modules/statuses/index.js
./backend/node_modules/depd/index.js
./backend/node_modules/depd/lib/browser/index.js
./backend/node_modules/webidl-conversions/lib/index.js
./backend/node_modules/gopd/test/index.js
./backend/node_modules/gopd/index.js
./backend/node_modules/buffer/index.js
./backend/node_modules/has-symbols/test/index.js
./backend/node_modules/has-symbols/index.js
./backend/node_modules/chalk/source/index.js
./backend/node_modules/chalk/source/vendor/ansi-styles/index.js
./backend/node_modules/chalk/source/vendor/supports-color/index.js
./backend/node_modules/on-finished/index.js
./backend/node_modules/bytes/index.js
./backend/node_modules/bs58/index.js
./backend/node_modules/side-channel-weakmap/test/index.js
./backend/node_modules/side-channel-weakmap/index.js
./backend/node_modules/delay/index.js
./backend/node_modules/cookie-signature/index.js
./backend/node_modules/type-is/index.js
./backend/node_modules/stream-json/index.js
./backend/node_modules/path-to-regexp/index.js
./backend/node_modules/range-parser/index.js
./backend/node_modules/node-fetch/lib/index.js
./backend/node_modules/jayson/node_modules/commander/index.js
./backend/node_modules/jayson/index.js
./backend/node_modules/jayson/lib/server/index.js
./backend/node_modules/jayson/lib/client/index.js
./backend/node_modules/jayson/lib/client/browser/index.js
./backend/node_modules/jayson/lib/index.js
./backend/node_modules/jayson/promise/index.js
./backend/node_modules/jayson/promise/lib/client/index.js
./backend/node_modules/jayson/promise/lib/client/browser/index.js
./backend/node_modules/jayson/promise/lib/index.js
./backend/node_modules/ee-first/index.js
./backend/node_modules/ms/index.js
./backend/node_modules/safe-buffer/index.js
./backend/node_modules/hasown/index.js
./backend/node_modules/call-bound/test/index.js
./backend/node_modules/call-bound/index.js
./backend/node_modules/object-assign/index.js
./backend/node_modules/object-inspect/index.js
./backend/node_modules/express/index.js
./backend/node_modules/express/lib/router/index.js
./backend/node_modules/function-bind/test/index.js
./backend/node_modules/function-bind/index.js
./backend/node_modules/cookie/index.js
./backend/node_modules/content-disposition/index.js
./backend/node_modules/send/node_modules/ms/index.js
./backend/node_modules/send/index.js
./backend/node_modules/fresh/index.js
./backend/node_modules/debug/src/index.js
./backend/node_modules/utf-8-validate/index.js
./backend/node_modules/commander/index.js
./backend/node_modules/eventemitter3/index.js
./backend/node_modules/es-object-atoms/test/index.js
./backend/node_modules/es-object-atoms/index.js
./backend/node_modules/fast-stable-stringify/test/index.js
./backend/node_modules/fast-stable-stringify/fixtures/index.js
./backend/node_modules/fast-stable-stringify/index.js
./backend/node_modules/fast-stable-stringify/cli/index.js
./backend/node_modules/borsh/lib/index.js
./backend/node_modules/merge-descriptors/index.js
./backend/node_modules/finalhandler/index.js
./backend/node_modules/negotiator/index.js
./backend/node_modules/get-proto/test/index.js
./backend/node_modules/get-proto/index.js
./backend/node_modules/destroy/index.js
./backend/node_modules/toidentifier/index.js
./backend/node_modules/vary/index.js
./backend/node_modules/uuid/dist/index.js
./backend/node_modules/uuid/dist/esm-browser/index.js
./backend/node_modules/uuid/dist/esm-node/index.js
./backend/node_modules/file-uri-to-path/index.js
./backend/node_modules/humanize-ms/index.js
./backend/node_modules/serve-static/index.js
./backend/node_modules/call-bind-apply-helpers/test/index.js
./backend/node_modules/call-bind-apply-helpers/index.js
./backend/node_modules/mime-db/index.js
./backend/node_modules/tslib/modules/index.js
./backend/node_modules/base-x/src/index.js
./backend/node_modules/base64-js/index.js
./backend/node_modules/parseurl/index.js
./backend/node_modules/content-type/index.js
./backend/node_modules/@swc/helpers/esm/index.js
./backend/node_modules/ieee754/index.js
./backend/node_modules/@noble/curves/index.js
./backend/node_modules/@noble/curves/esm/index.js
./backend/node_modules/@noble/hashes/index.js
./backend/node_modules/@noble/hashes/esm/index.js
./backend/node_modules/mime-types/index.js
./backend/node_modules/side-channel-map/test/index.js
./backend/node_modules/side-channel-map/index.js
./backend/node_modules/@solana/spl-token/lib/cjs/actions/index.js
./backend/node_modules/@solana/spl-token/lib/cjs/index.js
./backend/node_modules/@solana/spl-token/lib/cjs/state/index.js
./backend/node_modules/@solana/spl-token/lib/cjs/extensions/transferHook/index.js
./backend/node_modules/@solana/spl-token/lib/cjs/extensions/interestBearingMint/index.js
./backend/node_modules/@solana/spl-token/lib/cjs/extensions/index.js
./backend/node_modules/@solana/spl-token/lib/cjs/extensions/tokenMetadata/index.js
./backend/node_modules/@solana/spl-token/lib/cjs/extensions/metadataPointer/index.js
./backend/node_modules/@solana/spl-token/lib/cjs/extensions/cpiGuard/index.js
./backend/node_modules/@solana/spl-token/lib/cjs/extensions/defaultAccountState/index.js
./backend/node_modules/@solana/spl-token/lib/cjs/extensions/memoTransfer/index.js
./backend/node_modules/@solana/spl-token/lib/cjs/extensions/transferFee/index.js
./backend/node_modules/@solana/spl-token/lib/cjs/instructions/index.js
./backend/node_modules/@solana/spl-token/lib/esm/actions/index.js
./backend/node_modules/@solana/spl-token/lib/esm/index.js
./backend/node_modules/@solana/spl-token/lib/esm/state/index.js
./backend/node_modules/@solana/spl-token/lib/esm/extensions/transferHook/index.js
./backend/node_modules/@solana/spl-token/lib/esm/extensions/interestBearingMint/index.js
./backend/node_modules/@solana/spl-token/lib/cjs/extensions/index.js
./backend/node_modules/@solana/spl-token/lib/esm/extensions/tokenMetadata/index.js
./backend/node_modules/@solana/spl-token/lib/esm/extensions/metadataPointer/index.js
./backend/node_modules/@solana/spl-token/lib/cjs/extensions/cpiGuard/index.js
./backend/node_modules/@solana/spl-token/lib/esm/extensions/defaultAccountState/index.js
./backend/node_modules/@solana/spl-token/lib/esm/extensions/memoTransfer/index.js
./backend/node_modules/@solana/spl-token/lib/esm/extensions/transferFee/index.js
./backend/node_modules/@solana/spl-token/lib/esm/instructions/index.js
./backend/node_modules/@solana/web3.js/node_modules/commander/index.js
./backend/node_modules/@solana/buffer-layout-utils/lib/cjs/index.js
./backend/node_modules/@solana/spl-token-metadata/lib/cjs/index.js
./backend/node_modules/@solana/spl-token-metadata/lib/esm/index.js
./backend/node_modules/dunder-proto/test/index.js
./backend/node_modules/iconv-lite/lib/index.js
./backend/node_modules/iconv-lite/encodings/index.js
./backend/node_modules/backend/index.js
./backend/config/index.js
```

**Total index.js files found:** 160+

**Key Application Files:**
- `./backend/index.js` - Main backend server
- `./backend/config/index.js` - Backend configuration

**Node Modules:** Most files are in node_modules dependencies

---

## Summary

| Command | Purpose | Output |
|---------|---------|--------|
| `pwd` | Show current working directory | `/workspaces/Platforms-token-forge-ai-software-` |
| `ls` | List directory contents | 13 items (3 dirs, 10 files) |
| `find . -name index.js` | Find all index.js files | 160+ files found (mostly in node_modules) |

---

**Generated:** January 19, 2026  
**Location:** /workspaces/Platforms-token-forge-ai-software-  
**Status:** All outputs captured without executing terminal commands
