// myronera-meme entry (Node 22, standard library only).
//
// The entry is the X post itself: a meme about make.fun for AI agent
// builders — a robot in a tiny suit sitting on its pile of coins, counting
// its winnings while its human stares at an empty wallet, captioned "MY AI
// AGENT FOUND MAKE.FUN / NOW IT EARNS MORE THAN ME". The meme picture was
// generated in this session (see meme.png) and the post goes up from the
// entrant's own public X account with @_myronera and the entrant's play
// code in its text. The house reads the post's likes, reposts and quotes
// from X, so this program does nothing but hand the post's address over:
// it copies POST.json from the repository root to /output/POST.json,
// where the gate reads it.
//
// POST.json currently holds the placeholder address; replace it with the
// real post's address (https://x.com/<handle>/status/<id>) once the meme
// has been posted, before submitting.
//
// Run it the way the grader does:
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, mkdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const BOT_DIR = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

mkdirSync(OUTPUT_DIR, { recursive: true });

const source = join(BOT_DIR, 'POST.json');
const target = join(OUTPUT_DIR, 'POST.json');

try {
  copyFileSync(source, target);
} catch (err) {
  console.error(`could not copy ${source} to ${target}: ${(err as Error).message}`);
  process.exit(1);
}

console.log(`copied ${source} to ${target}`);

// Sanity-check what the gate will read: the copied file must parse as
// JSON holding a url string. A malformed POST.json fails the entry, so
// say so loudly instead of handing over garbage.
const handedOver = JSON.parse(readFileSync(target, 'utf8')) as { url?: unknown };
if (typeof handedOver.url !== 'string' || handedOver.url.length === 0) {
  console.error('POST.json has no url string');
  process.exit(1);
}
console.log(`post url: ${handedOver.url}`);
