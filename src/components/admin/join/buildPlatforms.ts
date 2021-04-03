export const buildPlatforms = (platforms: {
  pc: boolean;
  xbox: boolean;
  ps: boolean;
}) => {
  const pc = platforms.pc ? 'PC,' : '';
  const xbox = platforms.xbox ? 'Xbox,' : '';
  const ps = platforms.ps ? 'PlayStation' : '';
  return `${pc}${xbox}${ps}`;
};
