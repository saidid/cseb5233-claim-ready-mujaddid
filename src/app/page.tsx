"use client";

import React, { useState, useEffect } from "react";
import {
  FileText,
  Printer,
  CheckCircle2,
  Circle,
  Smartphone,
  Laptop,
  Camera,
  Car,
  Tv,
  ArrowRight,
  ShieldCheck,
  Check,
  Copy,
  Download,
  Share2,
  ExternalLink,
  ChevronRight,
  Info
} from "lucide-react";

interface StepItem {
  number: number;
  title: string;
  description: string;
}

interface Phase {
  id: string;
  phaseNumber: string;
  pill: string;
  headline: string;
  steps: StepItem[];
  bgStyle: "soft" | "white";
}

const PHASES_DATA: Phase[] = [
  {
    id: "phase-1",
    phaseNumber: "01",
    pill: "PHASE 01 • PREPARATION",
    headline: "BEFORE ANYTHING GOES WRONG",
    bgStyle: "soft",
    steps: [
      {
        number: 1,
        title: "Keep the invoice.",
        description:
          "Save the original bill and a photo or PDF copy. The warranty normally starts on the invoice date.",
      },
      {
        number: 2,
        title: "Register the product.",
        description:
          "Many brands ask you to register on their website or app; some add extra warranty when you do.",
      },
      {
        number: 3,
        title: "Read the warranty card once.",
        description:
          "Note how long it lasts, what it covers, and what it excludes.",
      },
      {
        number: 4,
        title: "Record the condition.",
        description:
          "Take a few dated photos of the product once it is installed or unboxed.",
      },
    ],
  },
  {
    id: "phase-2",
    phaseNumber: "02",
    pill: "PHASE 02 • INCIDENT LOGGING",
    headline: "WHEN THE FAULT APPEARS",
    bgStyle: "white",
    steps: [
      {
        number: 5,
        title: "Record the fault.",
        description:
          "Take a clear photo or short video of the problem as soon as you see it, with the date visible if you can.",
      },
      {
        number: 6,
        title: "Raise the complaint in writing.",
        description:
          "Use email, the brand's website or its app, not only a phone call, so there is a record.",
      },
      {
        number: 7,
        title: "Note every reference number.",
        description:
          "Write down the complaint or ticket number, the date and the name of anyone you speak to.",
      },
    ],
  },
  {
    id: "phase-3",
    phaseNumber: "03",
    pill: "PHASE 03 • ONSITE INSPECTION",
    headline: "WHEN A TECHNICIAN VISITS",
    bgStyle: "soft",
    steps: [
      {
        number: 8,
        title: "Ask for the job sheet.",
        description:
          "Ask the technician for a copy of the visit report or job sheet before they leave.",
      },
      {
        number: 9,
        title: "Ask what was tested.",
        description:
          "Ask which test or instrument was used to reach the diagnosis.",
      },
      {
        number: 10,
        title: "Take your own photos.",
        description:
          "Photograph the product and anything the technician points to, during the visit.",
      },
    ],
  },
  {
    id: "phase-4",
    phaseNumber: "04",
    pill: "PHASE 04 • DISPUTE RESOLUTION",
    headline: "IF THE CLAIM IS REFUSED",
    bgStyle: "white",
    steps: [
      {
        number: 11,
        title: "Ask for the reason in writing.",
        description:
          "Request a written explanation that names the exact cause and the evidence for it.",
      },
      {
        number: 12,
        title: "Ask for the technical report.",
        description:
          "If the refusal rests on an inspection, ask for that inspection report.",
      },
    ],
  },
];

export default function Home() {
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("all");

  const toggleStep = (stepNumber: number) => {
    setCompletedSteps((prev) =>
      prev.includes(stepNumber)
        ? prev.filter((n) => n !== stepNumber)
        : [...prev, stepNumber]
    );
  };

  const handleDownload = () => {
    // Downloads the complete checklist as .txt file directly
    const link = document.createElement("a");
    link.href = "/content.txt";
    link.download = "abdullah-tech-warranty-guide.txt";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const completionPercentage = Math.round((completedSteps.length / 12) * 100);

  return (
    <div className="min-h-screen bg-white text-[#0D1117] flex flex-col font-sans">
      {/* Top Editorial Banner */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-[#BFDBFE] no-print">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="w-3 h-3 bg-[#1D4ED8] rounded-full inline-block"></span>
            <span className="font-mono text-xs sm:text-sm font-bold tracking-tight text-[#0D1117] uppercase">
              Abdullah Claim Ready
            </span>
            <span className="hidden sm:inline-block text-[#BFDBFE]">|</span>
            <span className="hidden sm:inline-block font-mono text-xs text-[#1E40AF] bg-[#EFF6FF] px-2 py-0.5 rounded border border-[#BFDBFE]">
              CSEB5233
            </span>
          </div>

          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Progress indicator badge */}
            <div className="hidden md:flex items-center space-x-2 bg-[#EFF6FF] border border-[#BFDBFE] px-3 py-1 rounded-full">
              <span className="font-mono text-xs text-[#1E3A8A] font-semibold">
                Progress: {completedSteps.length}/12
              </span>
              <div className="w-16 h-2 bg-[#DBEAFE] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#1D4ED8] transition-all duration-300"
                  style={{ width: `${completionPercentage}%` }}
                ></div>
              </div>
            </div>

            <button
              onClick={handleDownload}
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 bg-[#EFF6FF] hover:bg-[#DBEAFE] text-[#1D4ED8] border border-[#BFDBFE] rounded-md font-mono text-xs font-semibold transition-colors"
              title="Download complete checklist (.txt)"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden xs:inline">Checklist (.txt)</span>
            </button>

            <button
              onClick={handlePrint}
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 bg-[#1D4ED8] hover:bg-[#1E40AF] text-white rounded-md font-mono text-xs font-semibold transition-colors shadow-none"
              title="Print this page"
            >
              <Printer className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Print</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1">
        {/* ========================================================
            HERO SECTION (Light Editorial Canvas)
           ======================================================== */}
        <section className="bg-[#EFF6FF] border-b border-[#BFDBFE] pt-12 pb-16 sm:pt-20 sm:pb-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left">
            {/* Mono Pill Label */}
            <div className="inline-block mb-4">
              <span className="inline-flex items-center font-mono text-xs uppercase font-bold tracking-wider px-3 py-1 bg-white text-[#1D4ED8] border border-[#BFDBFE] rounded-full">
                WARRANTY GUIDE • MALAYSIA
              </span>
            </div>

            {/* Headline Display - 60px Plus Jakarta Sans 800 */}
            <h1 className="text-3xl sm:text-5xl lg:text-[60px] font-extrabold text-[#0D1117] leading-[1.08] tracking-tight mb-6">
              ABDULLAH&apos;S TECH WARRANTY GUIDE
            </h1>

            {/* Hero Subtitle / Lead Paragraph */}
            <p className="text-base sm:text-lg lg:text-xl text-[#1E3A8A] font-normal leading-relaxed max-w-3xl mb-8">
              Curated by Abdullah Mujaddid Adli Bin Abdul Halim (BSW01084329) — A
              free checklist for anyone in Malaysia about to file a device or EV
              warranty claim.
            </p>

            {/* Quick action bar inside hero */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="#phases-section"
                className="inline-flex items-center space-x-2 px-5 py-3 bg-[#1D4ED8] hover:bg-[#1E40AF] text-white font-mono text-xs sm:text-sm font-semibold rounded-md transition-colors"
              >
                <span>Explore The 12 Steps</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <button
                onClick={handleDownload}
                className="inline-flex items-center space-x-2 px-5 py-3 bg-white hover:bg-[#DBEAFE] text-[#1E3A8A] border border-[#BFDBFE] font-mono text-xs sm:text-sm font-semibold rounded-md transition-colors"
              >
                <Download className="w-4 h-4 text-[#1D4ED8]" />
                <span>Download .txt Checklist</span>
              </button>

              <button
                onClick={handleCopyLink}
                className="inline-flex items-center space-x-2 px-4 py-3 bg-white hover:bg-[#DBEAFE] text-[#0D1117] border border-[#BFDBFE] font-mono text-xs sm:text-sm font-medium rounded-md transition-colors"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-[#1D4ED8]" />
                    <span>Link Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-[#1D4ED8]" />
                    <span>Share Guide</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </section>

        {/* ========================================================
            WHO THIS IS FOR (Neutral White Canvas)
           ======================================================== */}
        <section className="bg-white border-b border-[#BFDBFE] py-14 sm:py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="border border-[#BFDBFE] rounded-lg p-6 sm:p-10 bg-white">
              {/* Mono Pill Label */}
              <div className="mb-3">
                <span className="inline-flex items-center font-mono text-xs uppercase font-bold tracking-wider px-3 py-1 bg-[#EFF6FF] text-[#1D4ED8] border border-[#BFDBFE] rounded-full">
                  AUDIENCE PROFILE
                </span>
              </div>

              {/* Section Headline */}
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0D1117] tracking-tight mb-4">
                WHO THIS IS FOR
              </h2>

              {/* Exact wording from content.txt */}
              <p className="text-base sm:text-lg text-[#0D1117] leading-relaxed mb-8">
                Anyone whose smartphone, camera, laptop, appliance, or vehicle
                component stopped working while it is still under warranty, and
                who wants the claim to be decided on facts, in writing.
              </p>

              {/* Contextual Device Matrix */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-4 border-t border-[#BFDBFE]">
                <div className="flex flex-col items-center p-3 rounded bg-[#EFF6FF] border border-[#BFDBFE] text-center">
                  <Smartphone className="w-5 h-5 text-[#1D4ED8] mb-1.5" />
                  <span className="font-mono text-xs font-semibold text-[#1E3A8A]">
                    Smartphones
                  </span>
                </div>
                <div className="flex flex-col items-center p-3 rounded bg-[#EFF6FF] border border-[#BFDBFE] text-center">
                  <Camera className="w-5 h-5 text-[#1D4ED8] mb-1.5" />
                  <span className="font-mono text-xs font-semibold text-[#1E3A8A]">
                    Cameras
                  </span>
                </div>
                <div className="flex flex-col items-center p-3 rounded bg-[#EFF6FF] border border-[#BFDBFE] text-center">
                  <Laptop className="w-5 h-5 text-[#1D4ED8] mb-1.5" />
                  <span className="font-mono text-xs font-semibold text-[#1E3A8A]">
                    Laptops
                  </span>
                </div>
                <div className="flex flex-col items-center p-3 rounded bg-[#EFF6FF] border border-[#BFDBFE] text-center">
                  <Tv className="w-5 h-5 text-[#1D4ED8] mb-1.5" />
                  <span className="font-mono text-xs font-semibold text-[#1E3A8A]">
                    Appliances
                  </span>
                </div>
                <div className="col-span-2 sm:col-span-1 flex flex-col items-center p-3 rounded bg-[#EFF6FF] border border-[#BFDBFE] text-center">
                  <Car className="w-5 h-5 text-[#1D4ED8] mb-1.5" />
                  <span className="font-mono text-xs font-semibold text-[#1E3A8A]">
                    EV / Vehicles
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================
            THE IDEA IN ONE LINE (Dark Ink Canvas - Single Dark Block)
            Per rule: "Don't stack two dark sections in a row."
            Surrounded by white sections above and below.
           ======================================================== */}
        <section className="bg-[#0D1117] text-white py-16 sm:py-24 border-b border-[#0D1117]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left">
            {/* Mono Pill Label */}
            <div className="inline-block mb-4">
              <span className="inline-flex items-center font-mono text-xs uppercase font-bold tracking-wider px-3 py-1 bg-[#1E3A8A] text-white border border-[#3B82F6] rounded-full">
                FOUNDATIONAL PRINCIPLE
              </span>
            </div>

            {/* Section Headline */}
            <h2 className="text-sm font-mono uppercase tracking-widest text-[#3B82F6] font-semibold mb-3">
              THE IDEA IN ONE LINE
            </h2>

            {/* Exact wording from content.txt */}
            <blockquote className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white leading-tight tracking-tight border-l-0 sm:border-l-4 sm:border-[#1D4ED8] sm:pl-6">
              &ldquo;A warranty claim is decided on records. Keep yours, and ask
              for theirs in writing.&rdquo;
            </blockquote>

            <div className="mt-8 flex flex-wrap items-center gap-4 text-xs font-mono text-[#BFDBFE] sm:pl-6">
              <span className="inline-flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#3B82F6]"></span>
                Factual Evidence Over Verbal Assurances
              </span>
              <span className="hidden sm:inline">•</span>
              <span className="inline-flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#1D4ED8]"></span>
                Audit Trail Guarantee
              </span>
            </div>
          </div>
        </section>

        {/* ========================================================
            KEY NUMBERS FOR THE PAGE (Light Canvas)
           ======================================================== */}
        <section className="bg-white border-b border-[#BFDBFE] py-14 sm:py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center sm:text-left mb-10">
              {/* Mono Pill Label */}
              <div className="inline-block mb-3">
                <span className="inline-flex items-center font-mono text-xs uppercase font-bold tracking-wider px-3 py-1 bg-[#EFF6FF] text-[#1D4ED8] border border-[#BFDBFE] rounded-full">
                  PAGE STATS &amp; STRUCTURE
                </span>
              </div>

              {/* Section Headline */}
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0D1117] tracking-tight">
                KEY NUMBERS FOR THE PAGE
              </h2>
            </div>

            {/* 3 Metric Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {/* Metric 1 */}
              <div className="bg-[#EFF6FF] border border-[#BFDBFE] rounded-lg p-6 sm:p-8 flex flex-col justify-between">
                <div>
                  <span className="font-mono text-xs uppercase tracking-wider text-[#1E40AF] font-semibold">
                    Sequential Workflow
                  </span>
                  <div className="text-4xl sm:text-5xl font-extrabold font-mono text-[#1D4ED8] mt-2 mb-1">
                    12
                  </div>
                </div>
                <div className="font-mono text-sm sm:text-base font-bold text-[#0D1117] border-t border-[#BFDBFE] pt-3 mt-3">
                  Essential Steps
                </div>
              </div>

              {/* Metric 2 */}
              <div className="bg-[#EFF6FF] border border-[#BFDBFE] rounded-lg p-6 sm:p-8 flex flex-col justify-between">
                <div>
                  <span className="font-mono text-xs uppercase tracking-wider text-[#1E40AF] font-semibold">
                    Lifecycle Journey
                  </span>
                  <div className="text-4xl sm:text-5xl font-extrabold font-mono text-[#1D4ED8] mt-2 mb-1">
                    4
                  </div>
                </div>
                <div className="font-mono text-sm sm:text-base font-bold text-[#0D1117] border-t border-[#BFDBFE] pt-3 mt-3">
                  Core Phases
                </div>
              </div>

              {/* Metric 3 */}
              <div className="bg-[#EFF6FF] border border-[#BFDBFE] rounded-lg p-6 sm:p-8 flex flex-col justify-between">
                <div>
                  <span className="font-mono text-xs uppercase tracking-wider text-[#1E40AF] font-semibold">
                    Standard of Record
                  </span>
                  <div className="text-4xl sm:text-5xl font-extrabold font-mono text-[#1D4ED8] mt-2 mb-1">
                    100%
                  </div>
                </div>
                <div className="font-mono text-sm sm:text-base font-bold text-[#0D1117] border-t border-[#BFDBFE] pt-3 mt-3">
                  Written Proof
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================
            THE 4 CORE PHASES (12 ESSENTIAL STEPS)
           ======================================================== */}
        <section id="phases-section" className="py-6 sm:py-10 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
            {/* Interactive Phase Filter / Progress summary */}
            <div className="bg-[#EFF6FF] border border-[#BFDBFE] rounded-lg p-4 sm:p-6 mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-[#1E3A8A]">
                  Interactive Claim Tracker
                </h3>
                <p className="text-xs sm:text-sm text-[#0D1117] mt-0.5">
                  Click any step checkbox to track your warranty filing progress.
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <span className="font-mono text-xs font-bold text-[#1D4ED8] bg-white px-2.5 py-1 rounded border border-[#BFDBFE]">
                  {completedSteps.length} of 12 Completed ({completionPercentage}%)
                </span>
                {completedSteps.length > 0 && (
                  <button
                    onClick={() => setCompletedSteps([])}
                    className="font-mono text-xs text-[#1E40AF] underline hover:text-[#1D4ED8]"
                  >
                    Reset
                  </button>
                )}
              </div>
            </div>

            {/* Quick jump pills */}
            <div className="flex flex-wrap gap-2 pb-2">
              <a
                href="#phase-1"
                className="px-3 py-1.5 font-mono text-xs font-semibold rounded-md border border-[#BFDBFE] bg-white hover:bg-[#DBEAFE] text-[#1E40AF] transition-colors"
              >
                1. Before Anything Goes Wrong
              </a>
              <a
                href="#phase-2"
                className="px-3 py-1.5 font-mono text-xs font-semibold rounded-md border border-[#BFDBFE] bg-white hover:bg-[#DBEAFE] text-[#1E40AF] transition-colors"
              >
                2. When The Fault Appears
              </a>
              <a
                href="#phase-3"
                className="px-3 py-1.5 font-mono text-xs font-semibold rounded-md border border-[#BFDBFE] bg-white hover:bg-[#DBEAFE] text-[#1E40AF] transition-colors"
              >
                3. When A Technician Visits
              </a>
              <a
                href="#phase-4"
                className="px-3 py-1.5 font-mono text-xs font-semibold rounded-md border border-[#BFDBFE] bg-white hover:bg-[#DBEAFE] text-[#1E40AF] transition-colors"
              >
                4. If The Claim Is Refused
              </a>
            </div>
          </div>

          {/* Phase Iterations */}
          {PHASES_DATA.map((phase) => {
            const isSoft = phase.bgStyle === "soft";
            return (
              <div
                key={phase.id}
                id={phase.id}
                className={`py-12 sm:py-16 border-b border-[#BFDBFE] scroll-mt-20 ${
                  isSoft ? "bg-[#EFF6FF]" : "bg-white"
                }`}
              >
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                  {/* Mono Pill Label above Section Headline */}
                  <div className="mb-3">
                    <span className="inline-flex items-center font-mono text-xs uppercase font-bold tracking-wider px-3 py-1 bg-white text-[#1D4ED8] border border-[#BFDBFE] rounded-full">
                      {phase.pill}
                    </span>
                  </div>

                  {/* Section Headline */}
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0D1117] tracking-tight mb-8 flex items-center justify-between">
                    <span>{phase.headline}</span>
                    <span className="font-mono text-sm text-[#1D4ED8] font-bold">
                      Phase {phase.phaseNumber}
                    </span>
                  </h2>

                  {/* Step List */}
                  <div className="space-y-4">
                    {phase.steps.map((step) => {
                      const isCompleted = completedSteps.includes(step.number);
                      return (
                        <div
                          key={step.number}
                          onClick={() => toggleStep(step.number)}
                          className={`cursor-pointer rounded-lg border p-5 sm:p-6 transition-all ${
                            isCompleted
                              ? "bg-white border-[#1D4ED8] ring-1 ring-[#1D4ED8]"
                              : "bg-white border-[#BFDBFE] hover:border-[#1D4ED8]"
                          }`}
                        >
                          <div className="flex items-start space-x-4">
                            {/* Step Badge & Checkbox */}
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleStep(step.number);
                              }}
                              className="mt-0.5 shrink-0 focus:outline-none"
                              aria-label={`Mark step ${step.number} as completed`}
                            >
                              {isCompleted ? (
                                <CheckCircle2 className="w-6 h-6 text-[#1D4ED8] fill-[#EFF6FF]" />
                              ) : (
                                <Circle className="w-6 h-6 text-[#BFDBFE] hover:text-[#1D4ED8]" />
                              )}
                            </button>

                            {/* Step Content */}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-baseline space-x-2">
                                <span className="font-mono text-sm font-bold text-[#1D4ED8]">
                                  {step.number}.
                                </span>
                                <h3
                                  className={`text-base sm:text-lg font-bold text-[#0D1117] ${
                                    isCompleted ? "line-through text-gray-500" : ""
                                  }`}
                                >
                                  {step.title}
                                </h3>
                              </div>
                              <p className="mt-1 text-sm sm:text-base text-[#0D1117] leading-relaxed">
                                {step.description}
                              </p>
                            </div>

                            {/* Mono Step tag */}
                            <span className="hidden sm:inline-block font-mono text-xs font-semibold text-[#1E40AF] bg-[#EFF6FF] px-2 py-0.5 rounded border border-[#BFDBFE]">
                              STEP {step.number < 10 ? `0${step.number}` : step.number}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </section>

        {/* ========================================================
            CALL TO ACTION (Dark Ink Canvas - Isolated Single Dark Block)
            Preceded by Phase 4 (white) and succeeded by Footer (soft light)
           ======================================================== */}
        <section className="bg-[#0D1117] text-white py-16 sm:py-24 border-b border-[#0D1117]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left">
            {/* Mono Pill Label above Section Headline */}
            <div className="inline-block mb-3">
              <span className="inline-flex items-center font-mono text-xs uppercase font-bold tracking-wider px-3 py-1 bg-[#1E3A8A] text-white border border-[#3B82F6] rounded-full">
                CLAIM READINESS TOOLKIT
              </span>
            </div>

            {/* Section Headline */}
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
              CALL TO ACTION
            </h2>

            {/* Exact wording from content.txt */}
            <p className="text-base sm:text-xl text-[#DBEAFE] font-normal leading-relaxed max-w-2xl mb-8">
              Download the complete checklist (.txt) or print this page for your
              records.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                onClick={handleDownload}
                className="inline-flex items-center justify-center space-x-2.5 px-6 py-4 bg-[#1D4ED8] hover:bg-[#1E40AF] text-white font-mono text-sm font-bold rounded-md transition-colors"
              >
                <Download className="w-5 h-5" />
                <span>Download the complete checklist (.txt)</span>
              </button>

              <button
                onClick={handlePrint}
                className="inline-flex items-center justify-center space-x-2.5 px-6 py-4 bg-[#EFF6FF] hover:bg-[#DBEAFE] text-[#0D1117] font-mono text-sm font-bold rounded-md border border-[#BFDBFE] transition-colors"
              >
                <Printer className="w-5 h-5 text-[#1D4ED8]" />
                <span>Print this page for your records</span>
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* ========================================================
          FOOTER NOTE (Crisp Light Neutral Canvas)
         ======================================================== */}
      <footer className="bg-[#EFF6FF] border-t border-[#BFDBFE] py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="border border-[#BFDBFE] bg-white rounded-lg p-6 sm:p-8">
            {/* Mono Pill Label above Section Headline */}
            <div className="mb-3">
              <span className="inline-flex items-center font-mono text-xs uppercase font-bold tracking-wider px-3 py-1 bg-[#EFF6FF] text-[#1D4ED8] border border-[#BFDBFE] rounded-full">
                OFFICIAL SUBMISSION SPECIFICATION
              </span>
            </div>

            {/* Section Headline */}
            <h3 className="text-lg sm:text-xl font-extrabold text-[#0D1117] tracking-tight mb-3">
              FOOTER NOTE
            </h3>

            {/* Exact wording from content.txt */}
            <p className="text-sm sm:text-base text-[#1E3A8A] font-medium leading-relaxed">
              Prepared by Abdullah Mujaddid Adli Bin Abdul Halim (BSW01084329)
              for CSEB5233 Designing Applications on Cloud at UNITEN.
            </p>

            <div className="mt-6 pt-4 border-t border-[#BFDBFE] flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs font-mono text-[#0D1117] gap-2">
              <span>Universiti Tenaga Nasional (UNITEN)</span>
              <span>CSEB5233 Designing Applications on Cloud</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
