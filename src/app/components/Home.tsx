"use client";

import { useEffect, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  createColumnHelper,
} from "@tanstack/react-table";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";


type Stock = {
  symbol: string;
  exchange: string;
  sector: string;
  purchasePrice: number;
  quantity: number;
  investment: number;
  cmp: number;
  presentValue: number;
  gainLoss: number;
  gainLossPercent: string;
  peRatio: number | string;
  eps: number;
  latestNetIncome: string;
  portfolioPercent: string;
};

export default function Home() {
  const [portfolio, setPortfolio] = useState<Stock[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSector, setSelectedSector] = useState<string>("");

  const fetchPortfolio = async () => {
    try {
      const res = await fetch("/api/portfolio");
      const data = await res.json();
      setPortfolio(data.portfolio);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching portfolio:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPortfolio();
    const interval = setInterval(fetchPortfolio, 30000);
    return () => clearInterval(interval);
  }, []);

  const columnHelper = createColumnHelper<Stock>();
  const columns = [
    columnHelper.accessor("symbol", { header: "Symbol" }),
    columnHelper.accessor("exchange", { header: "Exchange" }),
    columnHelper.accessor("sector", { header: "Sector" }),
    columnHelper.accessor("quantity", { header: "Qty" }),
    columnHelper.accessor("purchasePrice", { header: "Purchase Price" }),
    columnHelper.accessor("investment", { header: "Investment" }),
    columnHelper.accessor("cmp", { header: "CMP" }),
    columnHelper.accessor("presentValue", { header: "Present Value" }),
    columnHelper.accessor("gainLoss", {
      header: "Gain/Loss",
      cell: (info) => (
        <span style={{ color: info.getValue() > 0 ? "#065f46" : "#991b1b", fontWeight: "600" }}>
          {info.getValue().toFixed(2)}
        </span>
      ),
    }),
    columnHelper.accessor("gainLossPercent", { header: "Gain %" }),
    columnHelper.accessor("peRatio", { header: "P/E" }),
    columnHelper.accessor("eps", { header: "EPS" }),
    columnHelper.accessor("latestNetIncome", { header: "Net Income" }),
    columnHelper.accessor("portfolioPercent", { header: "% Portfolio", cell: (info) => `${info.getValue()}%` }),
  ];

  const table = useReactTable({
    data: portfolio,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const sectorSummary = Object.values(
    portfolio.reduce((acc: any, stock) => {
      if (!acc[stock.sector]) acc[stock.sector] = { sector: stock.sector, investment: 0, presentValue: 0 };
      acc[stock.sector].investment += stock.investment;
      acc[stock.sector].presentValue += stock.presentValue;
      return acc;
    }, {})
  ).map((s: any) => ({
    ...s,
    gainLossPercent: s.investment ? (((s.presentValue - s.investment) / s.investment) * 100).toFixed(2) : "0.00",
  }));

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A020F0"];

  if (loading) return <p style={{ textAlign: "center", marginTop: "2rem" }}>Loading portfolio...</p>;

  return (
    <main>
      <h1 className="dashboard-title">Stock Analysis Dashboard</h1>

      {/* Sector Dropdown */}
      <h2>Sector Summary</h2>
      <select className="select-sector" value={selectedSector} onChange={(e) => setSelectedSector(e.target.value)}>
        <option value="">-- Select Sector --</option>
        {sectorSummary.map((s) => (
          <option key={s.sector} value={s.sector}>{s.sector}</option>
        ))}
      </select>

      {selectedSector && (
        <table className="sector-table">
          <thead>
            <tr>
              <th>Sector</th>
              <th>Total Investment</th>
              <th>Total Present Value</th>
              <th>Gain/Loss %</th>
            </tr>
          </thead>
          <tbody>
            {sectorSummary.filter((s) => s.sector === selectedSector).map((s) => (
              <tr key={s.sector} className={parseFloat(s.gainLossPercent) >= 0 ? "sector-positive" : "sector-negative"}>
                <td>{s.sector}</td>
                <td>{s.investment.toFixed(2)}</td>
                <td>{s.presentValue.toFixed(2)}</td>
                <td>{s.gainLossPercent}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Charts */}
      <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap", marginTop: "2rem" }}>
        <div className="chart-container" style={{ flex: "1 1 45%" }}>
          <h2>Sector Allocation</h2>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={sectorSummary} dataKey="presentValue" nameKey="sector" cx="50%" cy="50%" outerRadius={80} label>
                {sectorSummary.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-container" style={{ flex: "1 1 45%" }}>
          <h2>Sector Gain/Loss %</h2>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={sectorSummary}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="sector" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="gainLossPercent" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Stock Table */}
      <table className="stock-table">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>{flexRender(header.column.columnDef.header, header.getContext())}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className={row.original.gainLoss > 0 ? "stock-positive" : "stock-negative"}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
