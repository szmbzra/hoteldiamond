"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CalendarDays, ChevronLeft, ChevronRight } from "lucide-react";

interface DatePickerProps {
  id: string;
  label: string;
  value?: string;
  onChange: (value: string) => void;
  min?: string;
  error?: string;
}

const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

/** Parses a "YYYY-MM-DD" string as a local-time Date (avoids the UTC shift of `new Date(str)`). */
function parseIso(value?: string): Date | null {
  if (!value) return null;
  const [year, month, day] = value.split("-").map(Number);
  if (!year || !month || !day) return null;
  return new Date(year, month - 1, day);
}

function toIso(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function isSameDay(a: Date | null, b: Date | null) {
  return (
    !!a &&
    !!b &&
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function startOfDay(date: Date) {
  const copy = new Date(date);
  copy.setHours(0, 0, 0, 0);
  return copy;
}

export function DatePicker({ id, label, value, onChange, min, error }: DatePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const selected = parseIso(value);
  const minDate = parseIso(min);
  const [viewDate, setViewDate] = useState(() => selected ?? minDate ?? new Date());
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setIsOpen(false);
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const startOffset = new Date(year, month, 1).getDay();

  const cells: (Date | null)[] = [
    ...Array.from({ length: startOffset }, () => null),
    ...Array.from({ length: daysInMonth }, (_, i) => new Date(year, month, i + 1)),
  ];

  const today = new Date();
  const minStart = minDate ? startOfDay(minDate) : null;

  return (
    <div ref={containerRef} className="relative">
      <label
        htmlFor={id}
        className="block text-[10px] uppercase tracking-[0.15em] mb-2"
        style={{ color: "var(--luxury-muted)" }}
      >
        {label}
      </label>

      <button
        id={id}
        type="button"
        onClick={() => {
          if (!isOpen) setViewDate(selected ?? minDate ?? new Date());
          setIsOpen((prev) => !prev);
        }}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        className="relative w-full flex items-center justify-between px-4 py-3.5 bg-white rounded-lg border transition-colors focus:outline-none focus-within:border-gold text-left text-sm font-light hover:cursor-pointer"
        style={{
          borderColor: "var(--luxury-border)",
          color: selected ? "var(--luxury-charcoal)" : "var(--luxury-muted)",
        }}
      >
        <span>
          {selected
            ? selected.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })
            : "Select date"}
        </span>
        <CalendarDays className="w-4 h-4" style={{ color: "var(--luxury-gold)" }} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            role="dialog"
            aria-label={`${label} calendar`}
            className="absolute z-50 mt-2 w-72 rounded-lg border bg-white p-4 shadow-xl"
            style={{ borderColor: "var(--luxury-border)" }}
          >
            <div className="flex items-center justify-between mb-3">
              <button
                type="button"
                onClick={() => setViewDate(new Date(year, month - 1, 1))}
                className="p-1 rounded hover:bg-black/5 hover:cursor-pointer"
                aria-label="Previous month"
              >
                <ChevronLeft className="w-4 h-4" style={{ color: "var(--luxury-gold-text)" }} />
              </button>
              <span
                className="text-xs uppercase tracking-widest"
                style={{ color: "var(--luxury-charcoal)" }}
              >
                {viewDate.toLocaleDateString("en-GB", { month: "long", year: "numeric" })}
              </span>
              <button
                type="button"
                onClick={() => setViewDate(new Date(year, month + 1, 1))}
                className="p-1 rounded hover:bg-black/5 hover:cursor-pointer"
                aria-label="Next month"
              >
                <ChevronRight className="w-4 h-4" style={{ color: "var(--luxury-gold-text)" }} />
              </button>
            </div>

            <div className="grid grid-cols-7 gap-1 mb-1">
              {WEEKDAYS.map((day) => (
                <div
                  key={day}
                  className="text-center text-[10px] uppercase"
                  style={{ color: "var(--luxury-muted)" }}
                >
                  {day}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-1">
              {cells.map((date, index) => {
                if (!date) return <div key={`blank-${index}`} />;

                const disabled = minStart ? startOfDay(date) < minStart : false;
                const isSelected = isSameDay(date, selected);
                const isToday = isSameDay(date, today);

                return (
                  <button
                    key={toIso(date)}
                    type="button"
                    disabled={disabled}
                    onClick={() => {
                      onChange(toIso(date));
                      setIsOpen(false);
                    }}
                    className="aspect-square rounded-full text-xs flex items-center justify-center transition-colors hover:cursor-pointer disabled:cursor-not-allowed disabled:opacity-30"
                    style={{
                      backgroundColor: isSelected ? "var(--luxury-gold)" : "transparent",
                      color: isSelected ? "var(--luxury-dark)" : "var(--luxury-charcoal)",
                      border: isToday && !isSelected ? "1px solid var(--luxury-gold)" : "1px solid transparent",
                    }}
                  >
                    {date.getDate()}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}
