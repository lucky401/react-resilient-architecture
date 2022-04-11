/* eslint-disable prefer-template */
/* eslint-disable vars-on-top */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-var */
/* eslint-disable no-console */

/* This is a JavaScript function that allows us to run a command in the terminal. */
var spawnSync = require('child_process').spawnSync;

var styles = {
  // got these from playing around with what I found from:
  // https://github.com/istanbuljs/istanbuljs/blob/0f328fd0896417ccb2085f4b7888dd8e167ba3fa/packages/istanbul-lib-report/lib/file-writer.js#L84-L96
  // they're the best I could find that works well for light or dark terminals
  success: { open: '\u001b[32;1m', close: '\u001b[0m' },
  danger: { open: '\u001b[31;1m', close: '\u001b[0m' },
  info: { open: '\u001b[36;1m', close: '\u001b[0m' },
  subtitle: { open: '\u001b[2;1m', close: '\u001b[0m' },
};

/**
 * @description Given a modifier and a string, return the string wrapped in the appropriate style
 * @param modifier - The style to apply to the string.
 * @param string - The string to be colored.
 * @returns The string "Hello, World!"
 */
function color(modifier, string) {
  return styles[modifier].open + string + styles[modifier].close;
}

console.log(color('info', '▶️  Starting Boilerplate setup...'));

var isNPXAvailable = spawnSync('npx --version', { shell: true })
  .stderr.toString()
  .trim();

if (isNPXAvailable) {
  console.error(
    color(
      'danger',
      '🚨  npx is not available on this computer. Please install npm@8.4.0 or greater'
    )
  );
  throw isNPXAvailable;
}

var command =
  'npx "https://gist.github.com/lucky401/cdd35cd15c0e17b3dfc21e6f09dba52b" -q';

console.log(
  color('subtitle', '      Running the following command: ' + command)
);

var result = spawnSync(command, { stdio: 'inherit', shell: true });

if (result.status === 0) {
  console.log(color('success', '✅  Boilerplate setup complete...'));
} else {
  process.exit(result.status);
}