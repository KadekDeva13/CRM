import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import type { Contract } from "../../api/contract.mock";

type Filters = {
  startDate?: string; 
  endDate?: string;   
  status?: string;
};

type Props = {
  data?: Contract[];
  filters?: Filters;
};

const styles = StyleSheet.create({
  page: { padding: 28, fontSize: 10, color: "#111" },
  header: { marginBottom: 10 },
  title: { fontSize: 16, marginBottom: 2 },
  sub: { fontSize: 10, color: "#555" },

  table: { borderLeft: 1, borderTop: 1, borderColor: "#ccc", marginTop: 8 },
  row: { flexDirection: "row" },
  cell: {
    paddingVertical: 4,
    paddingHorizontal: 6,
    borderRight: 1,
    borderBottom: 1,
    borderColor: "#ccc",
  },
  headRow: { backgroundColor: "#f2f2f2", fontWeight: "bold" },
  center: { textAlign: "center" as const },
  right: { textAlign: "right" as const },

  cNum: { width: 110 },
  cTitle: { width: 200 },
  cParty: { width: 170 },
  cVal: { width: 110 },
  cStat: { width: 100 },
  cEnd: { width: 96 },

  footer: {
    position: "absolute" as const,
    bottom: 20,
    left: 28,
    right: 28,
    fontSize: 9,
    color: "#666",
    textAlign: "right" as const,
  },
});

function fmtMoney(v: number | undefined, cur: string = "IDR"): string {
  try {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: cur,
      maximumFractionDigits: cur === "IDR" ? 0 : 2,
    }).format(v ?? 0);
  } catch {
    return `${cur} ${v ?? 0}`;
  }
}

const fmtDate = (d?: string): string =>
  d ? format(new Date(d), "dd MMM yyyy", { locale: id }) : "-";

const getWidth = (style: { width?: number } | undefined): number =>
  (style?.width ?? 0) as number;

export default function ContractsReportPDF({
  data = [],
  filters = {},
}: Props): React.ReactElement {
  const nowStr = format(new Date(), "dd MMM yyyy HH:mm", { locale: id });

  const rangeStr =
    filters.startDate || filters.endDate
      ? `${filters.startDate ? format(new Date(filters.startDate), "dd MMM yyyy", { locale: id }) : "—"}  →  ${
          filters.endDate ? format(new Date(filters.endDate), "dd MMM yyyy", { locale: id }) : "—"
        }`
      : "All Dates";

  const statusStr =
    filters.status && filters.status !== "" ? filters.status : "All Status";

  const EXCLUDE = new Set<string>(["Declined", "Expired"]);
  const validData = data.filter((r) => !EXCLUDE.has(String(r.status)));

  const totalRevenue = validData.reduce<number>(
    (sum, r) => sum + (r.value || 0),
    0
  );

  const currency = data[0]?.currency || "IDR";

  const W =
    getWidth(styles.cNum) +
    getWidth(styles.cTitle) +
    getWidth(styles.cParty) +
    getWidth(styles.cVal);
  const WRight = getWidth(styles.cStat) + getWidth(styles.cEnd);
  const TABLE_WIDTH = W + WRight;

  return (
    <Document>
      <Page size="A4" orientation="landscape" style={styles.page} wrap>
        <View style={styles.header}>
          <Text style={styles.title}>Contracts Report</Text>
          <Text style={styles.sub}>Generated: {nowStr}</Text>
          <Text style={styles.sub}>
            Range: {rangeStr} • Status: {statusStr}
          </Text>
        </View>

        <View style={styles.table}>
          <View style={[styles.row, styles.headRow]}>
            <Text style={[styles.cell, styles.center, styles.cNum]} wrap={false}>
              Contract Number
            </Text>
            <Text style={[styles.cell, styles.center, styles.cTitle]}>
              Title
            </Text>
            <Text style={[styles.cell, styles.center, styles.cParty]}>
              Counterparty
            </Text>
            <Text style={[styles.cell, styles.center, styles.cVal]}>Value</Text>
            <Text style={[styles.cell, styles.center, styles.cStat]}>
              Status
            </Text>
            <Text style={[styles.cell, styles.center, styles.cEnd]} wrap={false}>
              End Date
            </Text>
          </View>

          {validData.length === 0 ? (
            <View style={styles.row} wrap={false}>
              <Text style={[styles.cell, { width: TABLE_WIDTH }]}>No data</Text>
            </View>
          ) : (
            <>
              {validData.map((r) => (
                <View key={r.id} style={styles.row} wrap={false}>
                  <Text style={[styles.cell, styles.cNum, styles.center]} wrap={false}>
                    {r.number}
                  </Text>
                  <Text style={[styles.cell, styles.cTitle]}>{r.title}</Text>
                  <Text style={[styles.cell, styles.center, styles.cParty]}>
                    {r.counterparty || "-"}
                  </Text>
                  <Text style={[styles.cell, styles.cVal, styles.right]} wrap={false}>
                    {fmtMoney(r.value, r.currency)}
                  </Text>
                  <Text style={[styles.cell, styles.center, styles.cStat]}>
                    {String(r.status)}
                  </Text>
                  <Text style={[styles.cell, styles.cEnd, styles.center]} wrap={false}>
                    {fmtDate(r.end_date)}
                  </Text>
                </View>
              ))}

              <View style={[styles.row, { backgroundColor: "#fafafa" }]} wrap={false}>
                <Text
                  style={[
                    styles.cell,
                    {
                      width: W,
                      fontWeight: "bold",
                      textAlign: "center",
                    },
                  ]}
                  wrap={false}
                >
                  Total Revenue ({currency})
                </Text>

                <Text
                  style={[
                    styles.cell,
                    {
                      width: WRight,
                      fontWeight: "bold",
                      textAlign: "right",
                    },
                  ]}
                  wrap={false}
                >
                  {fmtMoney(totalRevenue, currency)}
                </Text>
              </View>
            </>
          )}
        </View>

        <Text
          style={styles.footer}
          render={({ pageNumber, totalPages }) =>
            `Page ${pageNumber} of ${totalPages}`
          }
          fixed
        />
      </Page>
    </Document>
  );
}
