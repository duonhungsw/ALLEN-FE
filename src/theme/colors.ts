export const AppColors = {
  primaryColor: '#58CC05',
  secondaryColor: '#131F24',
  primaryLight: '#86efac',
  primaryDark: '#16a34a',
  secondaryLight: '#334155',
  secondaryDark: '#0f172a',
} as const;

export type AppColorType = keyof typeof AppColors;
