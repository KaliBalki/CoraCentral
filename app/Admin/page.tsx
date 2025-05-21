"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGear,
  faUserPen,
  faHouse,
  faFutbol,
  faUsers,
  faUser,
  faTicket,
  faMap,
} from "@fortawesome/free-solid-svg-icons";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const pageVariants = {
  initial: { opacity: 0, scale: 0.97 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.97 },
  transition: { duration: 0.35, ease: "easeOut" },
};

const tabVariants = {
  initial: { opacity: 0, y: 15 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -15 },
  transition: { duration: 0.25, ease: "easeOut" },
};

interface StatCardProps {
  title: string;
  value: string;
  icon: any;
  color: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, color }) => (
  <div className="bg-[#161616] rounded-xl p-6 flex flex-col items-center justify-center shadow-lg">
    <div className="flex items-center space-x-4 mb-2">
      <FontAwesomeIcon icon={icon} className={`text-5xl ${color}`} />
      <p className="text-3xl font-black text-white">{value}</p>
    </div>
    <h2 className="text-lg font-light text-white">{title}</h2>
  </div>
);

interface ControlPanelProps {
  selectedTab: string;
  onChange: (t: "customers" | "players" | "tickets" | "velden") => void;
}
interface Stats {
  totalTickets: number;
  totalCustomers: number;
  totalAdmins: number;
}

const ControlPanel: React.FC<ControlPanelProps> = ({
  selectedTab,
  onChange,
}) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0, scale: 0.9 }}
    transition={{ duration: 0.25 }}
    className="flex space-x-6 bg-[#161616] p-4 rounded-xl shadow-md justify-center
               lg:fixed lg:ml-32 ml-44 z-10"
    style={{ x: "-50%" }}
  >
    {[
      { id: "customers", icon: faUsers },
      { id: "players", icon: faUser },
      { id: "tickets", icon: faTicket },
      { id: "velden", icon: faMap },
    ].map((btn) => (
      <button
        key={btn.id}
        onClick={() => onChange(btn.id as any)}
        className={selectedTab === btn.id ? "text-green-500" : "text-white"}
      >
        <FontAwesomeIcon icon={btn.icon} className="text-xl" />
      </button>
    ))}
  </motion.div>
);

interface Customer {
  klantID: number;
  naam: string;
  voornaam: string;
  email: string;
  admin: number;
}

export const CustomerTable: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchCustomers = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/klanten");
      const data = await res.json();
      setCustomers(data);
    } catch (err) {
      console.error("Failed to fetch customers:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const toggleAdmin = async (id: number, isAdmin: number) => {
    try {
      await fetch(`/api/klanten/${id}/admin`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ admin: isAdmin ? 0 : 1 }),
      });
      await fetchCustomers();
    } catch (err) {
      console.error("Failed to toggle admin:", err);
    }
  };

  const deleteCustomer = async (id: number) => {
    if (!confirm("Are you sure you want to delete this user?")) return;
    try {
      await fetch(`/api/klanten/${id}`, { method: "DELETE" });
      await fetchCustomers();
    } catch (err) {
      console.error("Failed to delete customer:", err);
    }
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Admin?</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {loading ? (
          <TableRow>
            <TableCell colSpan={5}>Loading…</TableCell>
          </TableRow>
        ) : customers.length === 0 ? (
          <TableRow>
            <TableCell colSpan={5}>No customers found.</TableCell>
          </TableRow>
        ) : (
          customers.map((c) => (
            <TableRow key={c.klantID}>
              <TableCell>{c.klantID}</TableCell>
              <TableCell>
                {c.voornaam} {c.naam}
              </TableCell>
              <TableCell>{c.email}</TableCell>
              <TableCell>{c.admin ? "Yes" : "No"}</TableCell>
              <TableCell className="space-x-2">
                <button
                  className="px-2 py-1 bg-blue-600 rounded text-white text-sm"
                  onClick={() => toggleAdmin(c.klantID, c.admin)}
                >
                  {c.admin ? "Revoke Admin" : "Make Admin"}
                </button>
                <button
                  className="px-2 py-1 bg-red-600 rounded text-white text-sm"
                  onClick={() => deleteCustomer(c.klantID)}
                >
                  Delete
                </button>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
};

interface Player {
  playerID: number;
  naam: string;
  geboortedatum: string;
  land: string;
  teamName: string | null;
}

export const PlayersTable: React.FC = () => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchPlayers = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/players");
      const data = (await res.json()) as Player[];
      setPlayers(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to load players:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlayers();
  }, []);

  const deletePlayer = async (id: number) => {
    if (!confirm("Weet je zeker dat je deze speler wilt verwijderen?")) return;
    try {
      await fetch(`/api/players/${id}`, { method: "DELETE" });
      fetchPlayers();
    } catch (err) {
      console.error("Failed to delete player:", err);
    }
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Birthdate</TableHead>
          <TableHead>Country</TableHead>
          <TableHead>Team</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {loading ? (
          <TableRow>
            <TableCell colSpan={6}>Loading…</TableCell>
          </TableRow>
        ) : players.length === 0 ? (
          <TableRow>
            <TableCell colSpan={6}>No players found.</TableCell>
          </TableRow>
        ) : (
          players.map((p) => (
            <TableRow key={p.playerID}>
              <TableCell>{p.playerID}</TableCell>
              <TableCell>{p.naam}</TableCell>
              <TableCell>{p.geboortedatum}</TableCell>
              <TableCell>{p.land}</TableCell>
              <TableCell>{p.teamName || "–"}</TableCell>
              <TableCell>
                <button
                  onClick={() => deletePlayer(p.playerID)}
                  className="px-2 py-1 bg-red-600 rounded text-white text-sm"
                >
                  Delete
                </button>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
};
interface Ticket {
  ticketID: number;
  naam: string;
  prijs: number;
  aantal: number;
  veldNaam: string | null;
}

export const TicketsTable: React.FC = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchTickets = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/tickets");
      const data = (await res.json()) as Ticket[];
      setTickets(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to load tickets:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  const deleteTicket = async (id: number) => {
    if (!confirm("Weet je zeker dat je dit ticket wilt verwijderen?")) return;
    try {
      await fetch(`/api/tickets/${id}`, { method: "DELETE" });
      fetchTickets();
    } catch (err) {
      console.error("Failed to delete ticket:", err);
    }
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Naam</TableHead>
          <TableHead>Prijs</TableHead>
          <TableHead>Aantal</TableHead>
          <TableHead>Veld</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {loading ? (
          <TableRow>
            <TableCell colSpan={6}>Loading…</TableCell>
          </TableRow>
        ) : tickets.length === 0 ? (
          <TableRow>
            <TableCell colSpan={6}>Geen tickets gevonden.</TableCell>
          </TableRow>
        ) : (
          tickets.map((t) => (
            <TableRow key={t.ticketID}>
              <TableCell>{t.ticketID}</TableCell>
              <TableCell>{t.naam}</TableCell>
              <TableCell>€{t.prijs.toFixed(2)}</TableCell>
              <TableCell>{t.aantal}</TableCell>
              <TableCell>{t.veldNaam || "–"}</TableCell>
              <TableCell>
                <button
                  onClick={() => deleteTicket(t.ticketID)}
                  className="px-2 py-1 bg-red-600 rounded text-white text-sm"
                >
                  Delete
                </button>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
};
interface Veld {
  veldID: number;
  fieldName: string;
}

export const VeldenTable: React.FC = () => {
  const [velden, setVelden] = useState<Veld[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchVelden = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/velden");
      const data = (await res.json()) as Veld[];
      setVelden(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to load velden:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVelden();
  }, []);

  const deleteVeld = async (id: number) => {
    if (!confirm("Weet je zeker dat je dit veld wilt verwijderen?")) return;
    try {
      await fetch(`/api/velden/${id}`, { method: "DELETE" });
      fetchVelden();
    } catch (err) {
      console.error("Failed to delete veld:", err);
    }
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Field</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {loading ? (
          <TableRow>
            <TableCell colSpan={3}>Loading…</TableCell>
          </TableRow>
        ) : velden.length === 0 ? (
          <TableRow>
            <TableCell colSpan={3}>Geen velden gevonden.</TableCell>
          </TableRow>
        ) : (
          velden.map((v) => (
            <TableRow key={v.veldID}>
              <TableCell>{v.veldID}</TableCell>
              <TableCell>{v.fieldName}</TableCell>
              <TableCell>
                <button
                  onClick={() => deleteVeld(v.veldID)}
                  className="px-2 py-1 bg-red-600 rounded text-white text-sm"
                >
                  Delete
                </button>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
};

export default function AdminPage() {
  const [view, setView] = useState<"home" | "user" | "field" | "settings">(
    "home"
  );
  const [tab, setTab] = useState<
    "customers" | "players" | "tickets" | "velden"
  >("customers");

  const [stats, setStats] = useState<Stats>({
    totalTickets: 0,
    totalCustomers: 0,
    totalAdmins: 0,
  });

  useEffect(() => {
    fetch("/api/stats")
      .then((res) => res.json())
      .then((data: Stats) => setStats(data))
      .catch((err) => console.error("Failed to load stats:", err));
  }, []);

  return (
    <div className="flex flex-col lg:flex-row lg:mb-32">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 2 }}
      >
        <div
          className="mt-12 lg:mt-5 mx-auto lg:mx-0 lg:ml-8
                   bg-[#161616] w-fit rounded-xl p-4 lg:p-6 lg:mb-20"
        >
          <div className="flex flex-row lg:flex-col items-center space-x-8 lg:space-x-0 lg:space-y-12 text-white">
            {[
              { id: "home", icon: faHouse },
              { id: "user", icon: faUserPen },
            ].map((btn) => (
              <button
                key={btn.id}
                onClick={() => setView(btn.id as any)}
                className={
                  "text-xl transition-colors " +
                  (view === btn.id ? "text-green-500" : "")
                }
              >
                <FontAwesomeIcon icon={btn.icon} />
              </button>
            ))}
          </div>
        </div>
      </motion.div>

      <div className="py-10 lg:px-0 px-4 flex-1 text-white flex justify-center">
        <AnimatePresence mode="wait">
          {view === "home" && (
            <motion.div
              key="home"
              {...pageVariants}
              className="bg-[#161616] w-full lg:w-3/4 rounded-2xl p-6 grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              <StatCard
                title="Total Tickets"
                value={stats.totalTickets.toString()}
                icon={faFutbol}
                color="text-green-400"
              />
              <StatCard
                title="Total Customers"
                value={stats.totalCustomers.toString()}
                icon={faUserPen}
                color="text-blue-400"
              />
              <StatCard
                title="Total Admins"
                value={stats.totalAdmins.toString()}
                icon={faGear}
                color="text-yellow-400"
              />
            </motion.div>
          )}

          {view === "user" && (
            <motion.div
              key="user"
              {...pageVariants}
              className="flex flex-col w-full items-center"
            >
              <ControlPanel selectedTab={tab} onChange={setTab} />

              <div className="w-full max-w-5xl mt-6 lg:mt-16 bg-[#161616] rounded-xl p-6">
                <AnimatePresence mode="wait">
                  {tab === "customers" && (
                    <motion.div key="customers" {...tabVariants}>
                      <CustomerTable />
                    </motion.div>
                  )}
                  {tab === "players" && (
                    <motion.div key="players" {...tabVariants}>
                      <PlayersTable />
                    </motion.div>
                  )}
                  {tab === "tickets" && (
                    <motion.div key="tickets" {...tabVariants}>
                      <TicketsTable />
                    </motion.div>
                  )}
                  {tab === "velden" && (
                    <motion.div key="velden" {...tabVariants}>
                      <VeldenTable />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )}

          {view === "field" && (
            <motion.div
              key="field"
              {...pageVariants}
              className="bg-[#161616] w-full lg:w-3/4 rounded-2xl p-10 flex items-center justify-center"
            >
              <p className="text-xl">Fasd</p>
            </motion.div>
          )}

          {view === "settings" && (
            <motion.div
              key="settings"
              {...pageVariants}
              className="bg-[#161616] w-full lg:w-3/4 rounded-2xl p-10 flex items-center justify-center"
            >
              <p className="text-xl">Seasd</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
