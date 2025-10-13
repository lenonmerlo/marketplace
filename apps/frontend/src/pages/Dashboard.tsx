import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import IconTag from "../assets/icons/icon-sell.svg";
import IconStore from "../assets/icons/icon-store.svg";
import IconUsers from "../assets/icons/icon-user.png";

import { fetchVisitorsLast30d } from "../api/metrics";
import type { VisitorsPoint } from "../data/visitors";
import StatCard from "../components/StatCard";

import AppHeader from "../components/AppHeader";

export default function Dashboard() {
  const [data, setData] = useState<VisitorsPoint[]>([]);

  useEffect(() => {
    fetchVisitorsLast30d().then(setData);
  }, []);

  return (
    <main className="min-h-screen bg-[var(--color-background)]">
      <AppHeader active="dashboard" />

      <section className="mx-auto w-full max-w-none px-4 lg:px-[168px] pb-12">
        <div className="mb-10">
          <h1 className="text-[28px] font-bold leading-[120%]">
            Últimos 30 dias
          </h1>
          <p className="text-[14px] text-[#7A7A7A]">
            Confira as estatísticas da sua loja no último mês
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[272px_minmax(0,1fr)] gap-6">
          <div className="flex flex-col gap-6">
            <StatCard
              icon={IconTag}
              value="24"
              labelA="Produtos"
              labelB="vendidos"
            />
            <StatCard
              icon={IconStore}
              value="56"
              labelA="Produtos"
              labelB="anunciados"
            />
            <StatCard
              icon={IconUsers}
              value="1.238"
              labelA="Pessoas"
              labelB="visitantes"
            />
          </div>

          <div className="rounded-[20px] bg-white shadow-[0_20px_60px_rgba(0,0,0,0.08)] overflow-hidden">
            <div className="px-6 pt-4 pb-2 flex items-center justify-between">
              <h3 className="font-semibold">Visitantes</h3>
              <span className="text-sm text-[#7A7A7A]">
                26 de junho – 25 de julho
              </span>
            </div>

            <div className="px-6 pb-6">
              <div className="mx-auto w-full max-w-[1030px]">
                <div className="h-[360px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={data}
                      margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                    >
                      <XAxis
                        dataKey="d"
                        tickLine={false}
                        axisLine={{ stroke: "#eee" }}
                      />
                      <YAxis tickLine={false} axisLine={{ stroke: "#eee" }} />
                      <Tooltip
                        contentStyle={{
                          borderRadius: 12,
                          border: "1px solid #eee",
                        }}
                        labelFormatter={(v) => `${v} de julho`}
                        formatter={(v) =>
                          [`${v} visitantes`, "👥"] as [string, string]
                        }
                      />
                      <Line
                        type="monotone"
                        dataKey="v"
                        stroke="#4BA3FF"
                        strokeWidth={3}
                        dot={{ r: 3 }}
                        activeDot={{ r: 5 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
