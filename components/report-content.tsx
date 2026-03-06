"use client"
import { useState } from "react"
import { Download, Filter, RefreshCw, BarChart2 } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

const reportData = {
  "Last 7 Days": {
    "All Countries": {
      "All Devices": [
        { date: "Feb 28, 2026", impressions: "4129", clicks: "348", ctr: "3.2%", ecpm: "$27.23", revenue: "$27.38" },
        { date: "Mar 01, 2026", impressions: "4231", clicks: "351", ctr: "1.8%", ecpm: "$29.38", revenue: "$28.66" },
        { date: "Mar 02, 2026", impressions: "4123", clicks: "349", ctr: "1.2%", ecpm: "$30.44", revenue: "$30.11" },
        { date: "Mar 03, 2026", impressions: "4187", clicks: "332", ctr: "1.5%", ecpm: "$31.38", revenue: "$32.22" },
        { date: "Mar 04, 2026", impressions: "4562", clicks: "450", ctr: "9.86%", ecpm: "$31.33", revenue: "$31.33" },
        { date: "Mar 05, 2026", impressions: "2100", clicks: "287", ctr: "13.67%", ecpm: "$35.90", revenue: "$15.44" },
        { date: "Mar 06, 2026", impressions: "1988", clicks: "278", ctr: "13.98%", ecpm: "$36.66", revenue: "$14.24" },
      ],
      Desktop: [
        { date: "Feb 28, 2026", impressions: "4129", clicks: "348", ctr: "3.2%", ecpm: "$27.23", revenue: "$27.38" },
        { date: "Mar 01, 2026", impressions: "4231", clicks: "351", ctr: "1.8%", ecpm: "$29.38", revenue: "$28.66" },
        { date: "Mar 02, 2026", impressions: "4123", clicks: "349", ctr: "1.2%", ecpm: "$30.44", revenue: "$30.11" },
        { date: "Mar 03, 2026", impressions: "4187", clicks: "332", ctr: "1.5%", ecpm: "$31.38", revenue: "$32.22" },
        { date: "Mar 04, 2026", impressions: "4562", clicks: "450", ctr: "9.86%", ecpm: "$31.33", revenue: "$31.33" },
        { date: "Mar 05, 2026", impressions: "2100", clicks: "287", ctr: "13.67%", ecpm: "$35.90", revenue: "$15.44" },
        { date: "Mar 06, 2026", impressions: "1988", clicks: "278", ctr: "13.98%", ecpm: "$36.66", revenue: "$14.24" },
      ],
      Mobile: [
        { date: "Feb 28, 2026", impressions: "4129", clicks: "348", ctr: "3.2%", ecpm: "$27.23", revenue: "$27.38" },
        { date: "Mar 01, 2026", impressions: "4231", clicks: "351", ctr: "1.8%", ecpm: "$29.38", revenue: "$28.66" },
        { date: "Mar 02, 2026", impressions: "4123", clicks: "349", ctr: "1.2%", ecpm: "$30.44", revenue: "$30.11" },
        { date: "Mar 03, 2026", impressions: "4187", clicks: "332", ctr: "1.5%", ecpm: "$31.38", revenue: "$32.22" },
        { date: "Mar 04, 2026", impressions: "4562", clicks: "450", ctr: "9.86%", ecpm: "$31.33", revenue: "$31.33" },
        { date: "Mar 05, 2026", impressions: "2100", clicks: "287", ctr: "13.67%", ecpm: "$35.90", revenue: "$15.44" },
        { date: "Mar 06, 2026", impressions: "1988", clicks: "278", ctr: "13.98%", ecpm: "$36.66", revenue: "$14.24" },
      ],
    },
  },
  "Last 30 Days": {
    "All Countries": {
      "All Devices": [
        { date: "Feb 27, 2026", impressions: "4329", clicks: "342", ctr: "1.6%", ecpm: "$26.33", revenue: "$26.88" },
        { date: "Feb 28, 2026", impressions: "4129", clicks: "348", ctr: "3.2%", ecpm: "$27.23", revenue: "$27.38" },
        { date: "Mar 01, 2026", impressions: "4231", clicks: "351", ctr: "1.8%", ecpm: "$29.38", revenue: "$28.66" },
        { date: "Mar 02, 2026", impressions: "4123", clicks: "349", ctr: "1.2%", ecpm: "$30.44", revenue: "$30.11" },
        { date: "Mar 03, 2026", impressions: "4187", clicks: "332", ctr: "1.5%", ecpm: "$31.38", revenue: "$32.22" },
        { date: "Mar 04, 2026", impressions: "2324", clicks: "198", ctr: "2.9%", ecpm: "$32.67", revenue: "$14.88" },
      ],
      Desktop: [
        { date: "Feb 27, 2026", impressions: "4329", clicks: "342", ctr: "1.6%", ecpm: "$26.33", revenue: "$26.88" },
        { date: "Feb 28, 2026", impressions: "4129", clicks: "348", ctr: "3.2%", ecpm: "$27.23", revenue: "$27.38" },
        { date: "Mar 01, 2026", impressions: "4231", clicks: "351", ctr: "1.8%", ecpm: "$29.38", revenue: "$28.66" },
        { date: "Mar 02, 2026", impressions: "4123", clicks: "349", ctr: "1.2%", ecpm: "$30.44", revenue: "$30.11" },
        { date: "Mar 03, 2026", impressions: "4187", clicks: "332", ctr: "1.5%", ecpm: "$31.38", revenue: "$32.22" },
        { date: "Mar 04, 2026", impressions: "2324", clicks: "198", ctr: "2.9%", ecpm: "$32.67", revenue: "$14.88" },
      ],
      Mobile: [
        { date: "Feb 27, 2026", impressions: "4329", clicks: "342", ctr: "1.6%", ecpm: "$26.33", revenue: "$26.88" },
        { date: "Feb 28, 2026", impressions: "4129", clicks: "348", ctr: "3.2%", ecpm: "$27.23", revenue: "$27.38" },
        { date: "Mar 01, 2026", impressions: "4231", clicks: "351", ctr: "1.8%", ecpm: "$29.38", revenue: "$28.66" },
        { date: "Mar 02, 2026", impressions: "4123", clicks: "349", ctr: "1.2%", ecpm: "$30.44", revenue: "$30.11" },
        { date: "Mar 03, 2026", impressions: "4187", clicks: "332", ctr: "1.5%", ecpm: "$31.38", revenue: "$32.22" },
        { date: "Mar 04, 2026", impressions: "2324", clicks: "198", ctr: "2.9%", ecpm: "$32.67", revenue: "$14.88" },
      ],
    },
  },
  "Last 3 Months": {
    "All Countries": {
      "All Devices": [
        { date: "Feb 27, 2026", impressions: "4329", clicks: "342", ctr: "1.6%", ecpm: "$26.33", revenue: "$26.88" },
        { date: "Feb 28, 2026", impressions: "4129", clicks: "348", ctr: "3.2%", ecpm: "$27.23", revenue: "$27.38" },
        { date: "Mar 01, 2026", impressions: "4231", clicks: "351", ctr: "1.8%", ecpm: "$29.38", revenue: "$28.66" },
        { date: "Mar 02, 2026", impressions: "4123", clicks: "349", ctr: "1.2%", ecpm: "$30.44", revenue: "$30.11" },
        { date: "Mar 03, 2026", impressions: "4187", clicks: "332", ctr: "1.5%", ecpm: "$31.38", revenue: "$32.22" },
        { date: "Mar 04, 2026", impressions: "2324", clicks: "198", ctr: "2.9%", ecpm: "$32.67", revenue: "$14.88" },
      ],
      Desktop: [
        { date: "Feb 27, 2026", impressions: "4329", clicks: "342", ctr: "1.6%", ecpm: "$26.33", revenue: "$26.88" },
        { date: "Feb 28, 2026", impressions: "4129", clicks: "348", ctr: "3.2%", ecpm: "$27.23", revenue: "$27.38" },
        { date: "Mar 01, 2026", impressions: "4231", clicks: "351", ctr: "1.8%", ecpm: "$29.38", revenue: "$28.66" },
        { date: "Mar 02, 2026", impressions: "4123", clicks: "349", ctr: "1.2%", ecpm: "$30.44", revenue: "$30.11" },
        { date: "Mar 03, 2026", impressions: "4187", clicks: "332", ctr: "1.5%", ecpm: "$31.38", revenue: "$32.22" },
        { date: "Mar 04, 2026", impressions: "2324", clicks: "198", ctr: "2.9%", ecpm: "$32.67", revenue: "$14.88" },
      ],
      Mobile: [
        { date: "Feb 27, 2026", impressions: "4329", clicks: "342", ctr: "1.6%", ecpm: "$26.33", revenue: "$26.88" },
        { date: "Feb 28, 2026", impressions: "4129", clicks: "348", ctr: "3.2%", ecpm: "$27.23", revenue: "$27.38" },
        { date: "Mar 01, 2026", impressions: "4231", clicks: "351", ctr: "1.8%", ecpm: "$29.38", revenue: "$28.66" },
        { date: "Mar 02, 2026", impressions: "4123", clicks: "349", ctr: "1.2%", ecpm: "$30.44", revenue: "$30.11" },
        { date: "Mar 03, 2026", impressions: "4187", clicks: "332", ctr: "1.5%", ecpm: "$31.38", revenue: "$32.22" },
        { date: "Mar 04, 2026", impressions: "2324", clicks: "198", ctr: "2.9%", ecpm: "$32.67", revenue: "$14.88" },
      ],
    },
  },
  "Last 6 Months": {
    "All Countries": {
      "All Devices": [
        { date: "Feb 27, 2026", impressions: "4329", clicks: "342", ctr: "1.6%", ecpm: "$26.33", revenue: "$26.88" },
        { date: "Feb 28, 2026", impressions: "4129", clicks: "348", ctr: "3.2%", ecpm: "$27.23", revenue: "$27.38" },
        { date: "Mar 01, 2026", impressions: "4231", clicks: "351", ctr: "1.8%", ecpm: "$29.38", revenue: "$28.66" },
        { date: "Mar 02, 2026", impressions: "4123", clicks: "349", ctr: "1.2%", ecpm: "$30.44", revenue: "$30.11" },
        { date: "Mar 03, 2026", impressions: "4187", clicks: "332", ctr: "1.5%", ecpm: "$31.38", revenue: "$32.22" },
        { date: "Mar 04, 2026", impressions: "2324", clicks: "198", ctr: "2.9%", ecpm: "$32.67", revenue: "$14.88" },
      ],
      Desktop: [
        { date: "Feb 27, 2026", impressions: "4329", clicks: "342", ctr: "1.6%", ecpm: "$26.33", revenue: "$26.88" },
        { date: "Feb 28, 2026", impressions: "4129", clicks: "348", ctr: "3.2%", ecpm: "$27.23", revenue: "$27.38" },
        { date: "Mar 01, 2026", impressions: "4231", clicks: "351", ctr: "1.8%", ecpm: "$29.38", revenue: "$28.66" },
        { date: "Mar 02, 2026", impressions: "4123", clicks: "349", ctr: "1.2%", ecpm: "$30.44", revenue: "$30.11" },
        { date: "Mar 03, 2026", impressions: "4187", clicks: "332", ctr: "1.5%", ecpm: "$31.38", revenue: "$32.22" },
        { date: "Mar 04, 2026", impressions: "2324", clicks: "198", ctr: "2.9%", ecpm: "$32.67", revenue: "$14.88" },
      ],
      Mobile: [
        { date: "Feb 27, 2026", impressions: "4329", clicks: "342", ctr: "1.6%", ecpm: "$26.33", revenue: "$26.88" },
        { date: "Feb 28, 2026", impressions: "4129", clicks: "348", ctr: "3.2%", ecpm: "$27.23", revenue: "$27.38" },
        { date: "Mar 01, 2026", impressions: "4231", clicks: "351", ctr: "1.8%", ecpm: "$29.38", revenue: "$28.66" },
        { date: "Mar 02, 2026", impressions: "4123", clicks: "349", ctr: "1.2%", ecpm: "$30.44", revenue: "$30.11" },
        { date: "Mar 03, 2026", impressions: "4187", clicks: "332", ctr: "1.5%", ecpm: "$31.38", revenue: "$32.22" },
        { date: "Mar 04, 2026", impressions: "2324", clicks: "198", ctr: "2.9%", ecpm: "$32.67", revenue: "$14.88" },
      ],
    },
  },
  "This Year": {
    "All Countries": {
      "All Devices": [
        { date: "Feb 27, 2026", impressions: "4329", clicks: "342", ctr: "1.6%", ecpm: "$26.33", revenue: "$26.88" },
        { date: "Feb 28, 2026", impressions: "4129", clicks: "348", ctr: "3.2%", ecpm: "$27.23", revenue: "$27.38" },
        { date: "Mar 01, 2026", impressions: "4231", clicks: "351", ctr: "1.8%", ecpm: "$29.38", revenue: "$28.66" },
        { date: "Mar 02, 2026", impressions: "4123", clicks: "349", ctr: "1.2%", ecpm: "$30.44", revenue: "$30.11" },
        { date: "Mar 03, 2026", impressions: "4187", clicks: "332", ctr: "1.5%", ecpm: "$31.38", revenue: "$32.22" },
        { date: "Mar 04, 2026", impressions: "2324", clicks: "198", ctr: "2.9%", ecpm: "$32.67", revenue: "$14.88" },
      ],
      Desktop: [
        { date: "Feb 27, 2026", impressions: "4329", clicks: "342", ctr: "1.6%", ecpm: "$26.33", revenue: "$26.88" },
        { date: "Feb 28, 2026", impressions: "4129", clicks: "348", ctr: "3.2%", ecpm: "$27.23", revenue: "$27.38" },
        { date: "Mar 01, 2026", impressions: "4231", clicks: "351", ctr: "1.8%", ecpm: "$29.38", revenue: "$28.66" },
        { date: "Mar 02, 2026", impressions: "4123", clicks: "349", ctr: "1.2%", ecpm: "$30.44", revenue: "$30.11" },
        { date: "Mar 03, 2026", impressions: "4187", clicks: "332", ctr: "1.5%", ecpm: "$31.38", revenue: "$32.22" },
        { date: "Mar 04, 2026", impressions: "2324", clicks: "198", ctr: "2.9%", ecpm: "$32.67", revenue: "$14.88" },
      ],
      Mobile: [
        { date: "Feb 27, 2026", impressions: "4329", clicks: "342", ctr: "1.6%", ecpm: "$26.33", revenue: "$26.88" },
        { date: "Feb 28, 2026", impressions: "4129", clicks: "348", ctr: "3.2%", ecpm: "$27.23", revenue: "$27.38" },
        { date: "Mar 01, 2026", impressions: "4231", clicks: "351", ctr: "1.8%", ecpm: "$29.38", revenue: "$28.66" },
        { date: "Mar 02, 2026", impressions: "4123", clicks: "349", ctr: "1.2%", ecpm: "$30.44", revenue: "$30.11" },
        { date: "Mar 03, 2026", impressions: "4187", clicks: "332", ctr: "1.5%", ecpm: "$31.38", revenue: "$32.22" },
        { date: "Mar 04, 2026", impressions: "2324", clicks: "198", ctr: "2.9%", ecpm: "$32.67", revenue: "$14.88" },
      ],
    },
  },
  "Custom Range": {
    "All Countries": {
      "All Devices": [
        { date: "Feb 27, 2026", impressions: "4329", clicks: "342", ctr: "1.6%", ecpm: "$26.33", revenue: "$26.88" },
        { date: "Feb 28, 2026", impressions: "4129", clicks: "348", ctr: "3.2%", ecpm: "$27.23", revenue: "$27.38" },
        { date: "Mar 01, 2026", impressions: "4231", clicks: "351", ctr: "1.8%", ecpm: "$29.38", revenue: "$28.66" },
        { date: "Mar 02, 2026", impressions: "4123", clicks: "349", ctr: "1.2%", ecpm: "$30.44", revenue: "$30.11" },
        { date: "Mar 03, 2026", impressions: "4187", clicks: "332", ctr: "1.5%", ecpm: "$31.38", revenue: "$32.22" },
        { date: "Mar 04, 2026", impressions: "2324", clicks: "198", ctr: "2.9%", ecpm: "$32.67", revenue: "$14.88" },
      ],
      Desktop: [
        { date: "Feb 27, 2026", impressions: "4329", clicks: "342", ctr: "1.6%", ecpm: "$26.33", revenue: "$26.88" },
        { date: "Feb 28, 2026", impressions: "4129", clicks: "348", ctr: "3.2%", ecpm: "$27.23", revenue: "$27.38" },
        { date: "Mar 01, 2026", impressions: "4231", clicks: "351", ctr: "1.8%", ecpm: "$29.38", revenue: "$28.66" },
        { date: "Mar 02, 2026", impressions: "4123", clicks: "349", ctr: "1.2%", ecpm: "$30.44", revenue: "$30.11" },
        { date: "Mar 03, 2026", impressions: "4187", clicks: "332", ctr: "1.5%", ecpm: "$31.38", revenue: "$32.22" },
        { date: "Mar 04, 2026", impressions: "2324", clicks: "198", ctr: "2.9%", ecpm: "$32.67", revenue: "$14.88" },
      ],
      Mobile: [
        { date: "Feb 27, 2026", impressions: "4329", clicks: "342", ctr: "1.6%", ecpm: "$26.33", revenue: "$26.88" },
        { date: "Feb 28, 2026", impressions: "4129", clicks: "348", ctr: "3.2%", ecpm: "$27.23", revenue: "$27.38" },
        { date: "Mar 01, 2026", impressions: "4231", clicks: "351", ctr: "1.8%", ecpm: "$29.38", revenue: "$28.66" },
        { date: "Mar 02, 2026", impressions: "4123", clicks: "349", ctr: "1.2%", ecpm: "$30.44", revenue: "$30.11" },
        { date: "Mar 03, 2026", impressions: "4187", clicks: "332", ctr: "1.5%", ecpm: "$31.38", revenue: "$32.22" },
        { date: "Mar 04, 2026", impressions: "2324", clicks: "198", ctr: "2.9%", ecpm: "$32.67", revenue: "$14.88" },
      ],
    },
  },
}

const statisticsTotals = {
  impressions: 27649,
  clicks: 2755,
  revenue: 209.54,
  ecpm: 30.79,
  ctr: 9.97,
}

export function ReportContent() {
  const [showReport] = useState(true)
  const [selectedDateRange, setSelectedDateRange] = useState("Last 7 Days")
  const [selectedGroupBy, setSelectedGroupBy] = useState("Day")
  const [selectedMetrics, setSelectedMetrics] = useState("All Metrics")
  const [selectedSite, setSelectedSite] = useState("All Sites")
  const [selectedCountry, setSelectedCountry] = useState("All Countries")
  const [selectedDevice, setSelectedDevice] = useState("All Devices")
  const [currentReportData, setCurrentReportData] = useState(reportData["Last 7 Days"]["All Countries"]["All Devices"])
  const [isFiltered, setIsFiltered] = useState(false)

  const handleGenerateReport = () => {
    // Data already rendered, no action needed
  }

  const handleRefresh = () => {
    // Data already current, no action needed
  }

  const handleApplyFilters = () => {
    const dateData = reportData[selectedDateRange as keyof typeof reportData]
    const countryData = dateData?.[selectedCountry as keyof typeof dateData]
    const deviceData = countryData?.[selectedDevice as keyof typeof countryData]

    if (deviceData) {
      setCurrentReportData(deviceData)
      setIsFiltered(true)
    } else {
      setCurrentReportData(reportData["Last 7 Days"]["All Countries"]["All Devices"])
      setIsFiltered(false)
    }
  }

  const handleReset = () => {
    setSelectedDateRange("Last 7 Days")
    setSelectedGroupBy("Day")
    setSelectedMetrics("All Metrics")
    setSelectedSite("All Sites")
    setSelectedCountry("All Countries")
    setSelectedDevice("All Devices")

    setCurrentReportData(reportData["Last 7 Days"]["All Countries"]["All Devices"])
    setIsFiltered(false)
  }

  const calculateTotals = () => {
    if (currentReportData.length === 0) {
      return {
        totalRevenue: statisticsTotals.revenue.toFixed(3),
        totalImpressions: statisticsTotals.impressions.toLocaleString(),
        totalClicks: statisticsTotals.clicks.toLocaleString(),
        avgCTR: `${statisticsTotals.ctr.toFixed(2)}%`,
        avgECPM: `$${statisticsTotals.ecpm.toFixed(2)}`,
      }
    }

    const totalRevenue = currentReportData.reduce((sum, row) => {
      const revenue = Number.parseFloat(row.revenue.replace("$", "").replace(",", ""))
      return sum + revenue
    }, 0)

    const totalImpressions = currentReportData.reduce((sum, row) => {
      const impressions = Number.parseInt(row.impressions.replace(",", ""))
      return sum + impressions
    }, 0)

    const totalClicks = currentReportData.reduce((sum, row) => {
      const clicks = Number.parseInt(row.clicks.replace(",", ""))
      return sum + clicks
    }, 0)

    const avgCTR = totalImpressions > 0 ? ((totalClicks / totalImpressions) * 100).toFixed(2) : "0.00"
    const avgECPM = totalImpressions > 0 ? ((totalRevenue / totalImpressions) * 1000).toFixed(2) : "0.00"

    return {
      totalRevenue: totalRevenue.toFixed(3),
      totalImpressions: totalImpressions.toLocaleString(),
      totalClicks: totalClicks.toLocaleString(),
      avgCTR: `${avgCTR}%`,
      avgECPM: `$${avgECPM}`,
    }
  }

  const totals = calculateTotals()

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <h1 className="text-2xl font-bold">Reports</h1>
        <div className="flex items-center space-x-2 flex-wrap gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" className="flex items-center bg-transparent" onClick={handleRefresh}>
                  <RefreshCw size={16} className="mr-2" />
                  Refresh
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Refresh report data</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" className="flex items-center bg-transparent">
                  <Download size={16} className="mr-2" />
                  Export
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Export report as CSV</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      <Card className="p-6">
        <div className="flex items-center mb-4">
          <Filter size={18} className="mr-2" />
          <h3 className="font-medium">Report Filters</h3>
          {isFiltered && (
            <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Filters Applied</span>
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="text-sm font-medium mb-1 block">Date Range</label>
            <select
              className="w-full p-2 border rounded-md bg-white"
              value={selectedDateRange}
              onChange={(e) => setSelectedDateRange(e.target.value)}
            >
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
              <option>Last 3 Months</option>
              <option>Last 6 Months</option>
              <option>This Year</option>
              <option>Custom Range</option>
            </select>
          </div>
          <div>
            <label className="text-sm font-medium mb-1 block">Group By</label>
            <select
              className="w-full p-2 border rounded-md bg-white"
              value={selectedGroupBy}
              onChange={(e) => setSelectedGroupBy(e.target.value)}
            >
              <option>Hour</option>
              <option>Day</option>
              <option>Week</option>
              <option>Month</option>
            </select>
          </div>
          <div>
            <label className="text-sm font-medium mb-1 block">Metrics</label>
            <select
              className="w-full p-2 border rounded-md bg-white"
              value={selectedMetrics}
              onChange={(e) => setSelectedMetrics(e.target.value)}
            >
              <option>All Metrics</option>
              <option>Revenue Only</option>
              <option>Traffic Only</option>
              <option>Performance Only</option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          <div>
            <label className="text-sm font-medium mb-1 block">Sites</label>
            <select
              className="w-full p-2 border rounded-md bg-white"
              value={selectedSite}
              onChange={(e) => setSelectedSite(e.target.value)}
            >
              <option>https://jistyler.com</option>
              <option>All Sites</option>
            </select>
          </div>
          <div>
            <label className="text-sm font-medium mb-1 block">Countries</label>
            <select
              className="w-full p-2 border rounded-md bg-white"
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
            >
              <option>All Countries</option>
              <option>United States</option>
              <option>United Kingdom</option>
              <option>Canada</option>
              <option>Australia</option>
            </select>
          </div>
          <div>
            <label className="text-sm font-medium mb-1 block">Device</label>
            <select
              className="w-full p-2 border rounded-md bg-white"
              value={selectedDevice}
              onChange={(e) => setSelectedDevice(e.target.value)}
            >
              <option>All Devices</option>
              <option>Desktop</option>
              <option>Mobile</option>
              <option>Tablet</option>
            </select>
          </div>
          <div className="flex items-end gap-2">
            <Button className="bg-green-500 hover:bg-green-600 flex-1" onClick={handleApplyFilters}>
              Apply Filters
            </Button>
            <Button variant="outline" onClick={handleReset} className="bg-transparent">
              Reset
            </Button>
          </div>
        </div>

        {/* Filter Summary */}
        <div className="mt-4 p-3 bg-gray-50 rounded-lg">
          <div className="text-sm text-gray-600">
            <strong>Current Filters:</strong> {selectedDateRange} • {selectedGroupBy} • {selectedSite} •{" "}
            {selectedCountry} • {selectedDevice} • {selectedMetrics}
          </div>
        </div>
      </Card>

      {/* Statistics Summary - Always visible */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="bg-green-50 p-4 rounded-lg text-center">
          <div className="text-sm text-gray-600 mb-1">Total Revenue</div>
          <div className="text-xl font-bold text-gray-800">{totals.totalRevenue}</div>
        </div>
        <div className="bg-blue-50 p-4 rounded-lg text-center">
          <div className="text-sm text-gray-600 mb-1">Total Impressions</div>
          <div className="text-xl font-bold text-gray-800">{totals.totalImpressions}</div>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg text-center">
          <div className="text-sm text-gray-600 mb-1">Total Clicks</div>
          <div className="text-xl font-bold text-gray-800">{totals.totalClicks}</div>
        </div>
        <div className="bg-orange-50 p-4 rounded-lg text-center">
          <div className="text-sm text-gray-600 mb-1">Average CTR</div>
          <div className="text-xl font-bold text-gray-800">{totals.avgCTR}</div>
        </div>
        <div className="bg-indigo-50 p-4 rounded-lg text-center">
          <div className="text-sm text-gray-600 mb-1">Average eCPM</div>
          <div className="text-xl font-bold text-gray-800">{totals.avgECPM}</div>
        </div>
      </div>

      {/* Report Table */}
      {showReport && (
        <Card className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">Report Results</h3>
            <div className="text-sm text-gray-500">
              Generated on {new Date().toLocaleDateString()} at {new Date().toLocaleTimeString()}
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium text-sm">Date</th>
                  <th className="text-left py-3 px-4 font-medium text-sm">Impressions</th>
                  <th className="text-left py-3 px-4 font-medium text-sm">Clicks</th>
                  <th className="text-left py-3 px-4 font-medium text-sm">CTR</th>
                  <th className="text-left py-3 px-4 font-medium text-sm">eCPM</th>
                  <th className="text-left py-3 px-4 font-medium text-sm">Revenue</th>
                </tr>
              </thead>
              <tbody>
                {currentReportData.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-12 text-center">
                      <div className="text-gray-400">
                        <BarChart2 className="h-12 w-12 mx-auto mb-2" />
                        <p className="text-sm font-medium">No records available</p>
                        <p className="text-xs mt-1">Reports will be visible after data is added</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  currentReportData.map((row, index) => (
                    <ReportRow
                      key={index}
                      date={row.date}
                      impressions={row.impressions}
                      clicks={row.clicks}
                      ctr={row.ctr}
                      ecpm={row.ecpm}
                      revenue={row.revenue}
                    />
                  ))
                )}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </div>
  )
}

interface ReportRowProps {
  date: string
  impressions: string
  clicks: string
  ctr: string
  ecpm: string
  revenue: string
}

function ReportRow({ date, impressions, clicks, ctr, ecpm, revenue }: ReportRowProps) {
  return (
    <tr className="border-b hover:bg-gray-50">
      <td className="py-3 px-4 text-sm">{date}</td>
      <td className="py-3 px-4 text-sm">{impressions}</td>
      <td className="py-3 px-4 text-sm">{clicks}</td>
      <td className="py-3 px-4 text-sm">{ctr}</td>
      <td className="py-3 px-4 text-sm">{ecpm}</td>
      <td className="py-3 px-4 text-sm font-medium">{revenue}</td>
    </tr>
  )
}
