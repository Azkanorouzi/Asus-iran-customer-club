// without defiend matcher, this one line appplied next auth
// to the entire project

export { default } from "next-auth/middleware";

export const config = { matcher: ["/transactions", "/customers"] };
