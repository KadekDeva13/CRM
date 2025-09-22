export type UserRole = "admin" | "super admin" | "pegawai";

export function routeByRole(role: UserRole): string {
  switch (role) {
    case "admin": return "/dashboard";
    case "super admin": return "/super-admin";
    case "pegawai": return "/user/pegawai/penitip";
    default: return "/dashboard";
  }
}
