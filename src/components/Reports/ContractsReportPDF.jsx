import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { format } from "date-fns";
import id from "date-fns/locale/id";

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
  center: { textAlign: "center" },
  right: { textAlign: "right" },

  cNum: { width: 110 },
  cTitle: { width: 200 },
  cParty: { width: 170 },
  cVal: { width: 110 },
  cStat: { width: 100 },
  cEnd: { width: 96 },

  footer: {
    position: "absolute",
    bottom: 20,
    left: 28,
    right: 28,
    fontSize: 9,
    color: "#666",
    textAlign: "right",
  },
});

function fmtMoney(v, cur = "IDR") {
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
const fmtDate = (d) =>
  d ? format(new Date(d), "dd MMM yyyy", { locale: id }) : "-";

export default function ContractsReportPDF({ data = [], filters = {} }) {
  const nowStr = format(new Date(), "dd MMM yyyy HH:mm", { locale: id });
  const rangeStr =
    filters.startDate || filters.endDate
      ? `${filters.startDate ? format(new Date(filters.startDate), "dd MMM yyyy", { locale: id }) : "—"}  →  ${
          filters.endDate
            ? format(new Date(filters.endDate), "dd MMM yyyy", { locale: id })
            : "—"
        }`
      : "All Dates";
  const statusStr =
    filters.status && filters.status !== "" ? filters.status : "All Statuses";

  const totalRevenue = data.reduce((sum, r) => sum + (r.value || 0), 0);
  const currency = data[0]?.currency || "IDR";
  const W =
    (styles.cNum.width || 0) +
    (styles.cTitle.width || 0) +
    (styles.cParty.width || 0) +
    (styles.cVal.width || 0);
  const WRight = (styles.cStat.width || 0) + (styles.cEnd.width || 0);

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
              Number
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
            <Text
              style={[styles.cell, styles.center, styles.cEnd]}
              wrap={false}
            >
              End Date
            </Text>
          </View>

          {data.length === 0 ? (
            <View style={styles.row} wrap={false}>
              <Text style={[styles.cell, { width: 786 }]}>No data</Text>
            </View>
          ) : (
            <>
              {data.map((r) => (
                <View key={r.id} style={styles.row} wrap={false}>
                  <Text style={[styles.cell, styles.cNum, styles.center]} wrap={false}>
                    {r.number}
                  </Text>
                  <Text style={[styles.cell, styles.cTitle]}>{r.title}</Text>
                  <Text
                    style={[styles.cell, styles.center, styles.cParty]}
                  >{r.counterparty || "-"}</Text>
                  <Text
                    style={[styles.cell, styles.cVal, styles.right]}
                    wrap={false}
                  >
                    {fmtMoney(r.value, r.currency)}
                  </Text>
                  <Text style={[styles.cell, styles.center, styles.cStat]}>
                    {r.status}
                  </Text>
                  <Text
                    style={[styles.cell, styles.cEnd, styles.center]}
                    wrap={false}
                  >
                    {fmtDate(r.end_date)}
                  </Text>
                </View>
              ))}

              <View
                style={[styles.row, { backgroundColor: "#fafafa" }]}
                wrap={false}
              >
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
                  Total Revenue
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
