export const colors = {
  bg: '#fbf5ec',
  surface: '#ffffff',
  track: '#f3e8da',
  border: '#ecdcc8',
  text: '#2b211a',
  muted: '#6b5f56',
  primary: '#b8501c',
  primaryDark: '#7a3210',
  primarySoft: '#fce4d2',
  onPrimary: '#ffffff',
  inverse: '#2b211a',
  onInverse: '#ffffff',
  accentOnInverse: '#ffb98a',
};

export const tones = {
  ok: { bg: '#e3efe7', fg: '#1f5c3e' },
  warn: { bg: '#fdf0d9', fg: '#8a4f00' },
  danger: { bg: '#fbe7e5', fg: '#a3221a' },
};

export const space = { xs: 4, sm: 8, md: 12, lg: 16, xl: 24 };
export const radius = { md: 16, lg: 24, pill: 999 };
export const shadow = { boxShadow: '0 3px 12px rgba(122, 50, 16, 0.08)' };

export const type = {
  title: { fontSize: 28, fontWeight: '800', letterSpacing: -0.5, color: colors.text },
  label: { fontSize: 13, fontWeight: '700', letterSpacing: 0.8, textTransform: 'uppercase', color: colors.muted },
  body: { fontSize: 16, color: colors.text },
  small: { fontSize: 13, color: colors.muted },
};

export const pressable = (...base) => ({ pressed }) => [...base, pressed && { opacity: 0.6 }];
