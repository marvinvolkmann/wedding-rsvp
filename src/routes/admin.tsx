import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";

import { formatDateTime } from "#/i18n/format.ts";
import {
  getAdminOverview,
  login,
  logout,
  type AdminHousehold,
} from "#/server/admin.ts";

export const Route = createFileRoute("/admin")({
  loader: () => getAdminOverview(),
  head: () => ({ meta: [{ title: "RSVP Admin" }] }),
  component: AdminPage,
});

function AdminPage() {
  const overview = Route.useLoaderData();
  if (!overview.authorized) return <LoginForm />;
  return <Overview households={overview.households} />;
}

function LoginForm() {
  const router = useRouter();
  const doLogin = useServerFn(login);
  const [passwordType, setPasswordType] = useState(true);
  const [password, setPassword] = useState("");
  const [failed, setFailed] = useState(false);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const { ok } = await doLogin({ data: password });
    setFailed(!ok);
    if (ok) await router.invalidate();
  }

  return (
    <main className="admin">
      <h1>Admin</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Password
          <input
            type={passwordType ? "password" : "text"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoFocus
            required
          />
          <button
            className="toggle-button"
            type="button"
            onClick={() => setPasswordType(!passwordType)}
          >
            toggle
          </button>
        </label>
        <button type="submit">Log in</button>
        {failed && <p role="alert">Wrong password.</p>}
      </form>
    </main>
  );
}

function Overview({ households }: { households: AdminHousehold[] }) {
  const router = useRouter();
  const doLogout = useServerFn(logout);

  const count = (list: AdminHousehold[]) => ({
    households: list.length,
    guests: list.reduce((sum, h) => sum + h.names.length, 0),
  });
  const totals = [
    {
      label: "Attending",
      ...count(households.filter((h) => h.attending === true)),
    },
    {
      label: "Declined",
      ...count(households.filter((h) => h.attending === false)),
    },
    {
      label: "No answer yet",
      ...count(households.filter((h) => h.attending === null)),
    },
    { label: "Total invited", ...count(households) },
  ];

  return (
    <main className="admin">
      <header className="admin-header">
        <h1>RSVP overview</h1>
        <button
          type="button"
          onClick={async () => {
            await doLogout();
            await router.invalidate();
          }}
        >
          Log out
        </button>
      </header>

      <table>
        <thead>
          <tr>
            <th />
            <th>Households</th>
            <th>Guests</th>
          </tr>
        </thead>
        <tbody>
          {totals.map((row) => (
            <tr key={row.label}>
              <th scope="row">{row.label}</th>
              <td>{row.households}</td>
              <td>{row.guests}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Households</h2>
      <table>
        <thead>
          <tr>
            <th>Guests</th>
            <th>Answer</th>
            <th>Message</th>
            <th>Answered</th>
            <th>Invite link</th>
          </tr>
        </thead>
        <tbody>
          {households.map((h) => (
            <tr key={h.id}>
              <td>{h.names.join(", ")}</td>
              <td>{h.attending === null ? "–" : h.attending ? "Yes" : "No"}</td>
              <td className="message-cell">{h.message ?? ""}</td>
              <td>
                {h.respondedAt ? formatDateTime(h.respondedAt, "de") : ""}
              </td>
              <td>
                <a href={h.link}>{h.id}</a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
