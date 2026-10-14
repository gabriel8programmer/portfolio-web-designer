import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  createSessionToken,
  verifySessionToken,
  SESSION_DURATION_MS,
} from "./auth";

const COOKIE_NAME = "gb_admin_session";

export async function createAdminSession(email: string): Promise<void> {
  const token = createSessionToken(email);
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_DURATION_MS / 1000,
  });
}

export async function destroyAdminSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}

export async function getAdminSession(): Promise<{ email: string } | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return null;

  return verifySessionToken(token);
}

export async function requireAdminAuth(): Promise<{ email: string }> {
  const session = await getAdminSession();
  if (!session) {
    redirect("/admin/login");
  }
  return session;
}
