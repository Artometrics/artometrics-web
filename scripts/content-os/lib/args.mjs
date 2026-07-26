export function arg(name, argv = process.argv) {
  const i = argv.indexOf(`--${name}`);
  if (i === -1) return null;
  return argv[i + 1] ?? null;
}

export function flag(name, argv = process.argv) {
  return argv.includes(`--${name}`);
}
